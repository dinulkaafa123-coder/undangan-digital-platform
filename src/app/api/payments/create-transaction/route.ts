import { NextResponse } from "next/server";
import { createHmac, randomBytes } from "crypto";
import { templates } from "@/data/templates";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Route ini SELALU berjalan di server (Next.js Route Handler, bukan
 * "use client") -- DUITKU_API_KEY tidak pernah dikirim ke browser. Harga
 * (`paymentAmount`) SELALU diambil dari `data/templates.ts` lewat
 * `templateId`, TIDAK PERNAH dipercaya dari body request -- supaya
 * pengunjung tidak bisa mengubah harga jadi lebih murah lewat DevTools.
 */
export async function POST(req: Request) {
  let body: { templateId?: string; method?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body request tidak valid." }, { status: 400 });
  }

  const { templateId, method } = body;
  if (!templateId || typeof templateId !== "string") {
    return NextResponse.json({ error: "templateId wajib diisi." }, { status: 400 });
  }
  if (!method || typeof method !== "string") {
    return NextResponse.json({ error: "Pilih metode pembayaran terlebih dahulu." }, { status: 400 });
  }

  const template = templates.find((t) => t.slug === templateId);
  if (!template) {
    return NextResponse.json({ error: "Template tidak ditemukan." }, { status: 404 });
  }
  if (!template.price || template.price <= 0) {
    return NextResponse.json({ error: "Template ini tidak memerlukan pembayaran." }, { status: 400 });
  }

  const merchantCode = process.env.DUITKU_MERCHANT_CODE;
  const apiKey = process.env.DUITKU_API_KEY;
  if (!merchantCode || !apiKey) {
    return NextResponse.json({ error: "Payment gateway belum dikonfigurasi di server (env Duitku kosong)." }, { status: 500 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database belum dikonfigurasi di server." }, { status: 500 });
  }

  const isProduction = process.env.DUITKU_IS_PRODUCTION === "true";
  const base = isProduction ? "https://passport.duitku.com" : "https://sandbox.duitku.com";

  const orderId = `INV-${Date.now()}-${randomBytes(3).toString("hex")}`;
  const amount = template.price;

  // Formula resmi Duitku (Request Transaction): HMAC_SHA256(merchantCode + merchantOrderId + paymentAmount, apiKey)
  // Urutan concat BEDA dengan signature callback -- jangan disamakan.
  const signature = createHmac("sha256", apiKey).update(`${merchantCode}${orderId}${amount}`).digest("hex");

  const origin = new URL(req.url).origin;

  let duitkuRes: Response;
  try {
    duitkuRes = await fetch(`${base}/webapi/api/merchant/v2/inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchantCode,
        paymentAmount: amount,
        paymentMethod: method,
        merchantOrderId: orderId,
        productDetails: `Template ${template.name}`.slice(0, 255),
        email: "buyer@undangan.id",
        customerVaName: "Undangan.id",
        callbackUrl: `${origin}/api/payments/notification`,
        returnUrl: `${origin}/buat`,
        expiryPeriod: 60,
        signature,
      }),
    });
  } catch {
    return NextResponse.json({ error: "Tidak bisa menghubungi Duitku." }, { status: 502 });
  }

  const duitkuJson = await duitkuRes.json().catch(() => null);
  if (!duitkuRes.ok || duitkuJson?.statusCode !== "00") {
    const message = duitkuJson?.statusMessage || duitkuJson?.Message || "Gagal membuat transaksi pembayaran.";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const data = duitkuJson as {
    paymentUrl?: string;
    vaNumber?: string;
    qrString?: string;
    reference?: string;
  };

  if (!data.paymentUrl) {
    return NextResponse.json({ error: "Duitku tidak mengembalikan link pembayaran." }, { status: 502 });
  }

  // Catat order 'pending' di database kita sendiri -- ini yang nanti
  // dijadikan syarat wajib oleh RPC `create_invitation` (lihat 0003_payments.sql).
  const supabase = getSupabase();
  const { error: dbError } = await supabase.rpc("create_payment_order", {
    p_order_id: orderId,
    p_template_id: template.slug,
    p_amount: amount,
    p_payment_method: method,
    p_checkout_url: data.paymentUrl,
    p_pay_code: data.vaNumber ?? null,
    p_qr_url: data.qrString ?? null,
    p_provider_reference: data.reference ?? null,
  });
  if (dbError) {
    return NextResponse.json({ error: "Gagal mencatat order pembayaran: " + dbError.message }, { status: 500 });
  }

  return NextResponse.json({
    orderId,
    checkoutUrl: data.paymentUrl,
    payCode: data.vaNumber ?? null,
    qrUrl: data.qrString ?? null,
  });
}
