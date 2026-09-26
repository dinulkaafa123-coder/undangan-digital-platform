import { NextResponse } from "next/server";
import { createHmac, randomBytes } from "crypto";
import { templates } from "@/data/templates";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Route ini SELALU berjalan di server (Next.js Route Handler, bukan
 * "use client") -- TRIPAY_API_KEY/TRIPAY_PRIVATE_KEY tidak pernah dikirim
 * ke browser. Harga (`amount`) SELALU diambil dari `data/templates.ts`
 * lewat `templateId`, TIDAK PERNAH dipercaya dari body request -- supaya
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

  const apiKey = process.env.TRIPAY_API_KEY;
  const privateKey = process.env.TRIPAY_PRIVATE_KEY;
  const merchantCode = process.env.TRIPAY_MERCHANT_CODE;
  if (!apiKey || !privateKey || !merchantCode) {
    return NextResponse.json({ error: "Payment gateway belum dikonfigurasi di server (env Tripay kosong)." }, { status: 500 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database belum dikonfigurasi di server." }, { status: 500 });
  }

  const isProduction = process.env.TRIPAY_IS_PRODUCTION === "true";
  const base = isProduction ? "https://tripay.co.id/api" : "https://tripay.co.id/api-sandbox";

  const orderId = `INV-${Date.now()}-${randomBytes(3).toString("hex")}`;
  const amount = template.price;

  // Formula resmi Tripay: hash_hmac('sha256', merchantCode + merchantRef + amount, privateKey)
  const signature = createHmac("sha256", privateKey).update(`${merchantCode}${orderId}${amount}`).digest("hex");

  const origin = new URL(req.url).origin;

  let tripayRes: Response;
  try {
    tripayRes = await fetch(`${base}/transaction/create`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        method,
        merchant_ref: orderId,
        amount,
        customer_name: "Pengguna Undangan.id",
        customer_email: "buyer@undangan.id",
        customer_phone: "0800000000",
        order_items: [{ sku: template.slug, name: `Template ${template.name}`.slice(0, 50), price: amount, quantity: 1 }],
        callback_url: `${origin}/api/payments/notification`,
        return_url: `${origin}/buat`,
        expired_time: Math.floor(Date.now() / 1000) + 60 * 60, // 1 jam
        signature,
      }),
    });
  } catch {
    return NextResponse.json({ error: "Tidak bisa menghubungi Tripay." }, { status: 502 });
  }

  const tripayJson = await tripayRes.json().catch(() => null);
  if (!tripayRes.ok || !tripayJson?.success) {
    const message = tripayJson?.message || "Gagal membuat transaksi pembayaran.";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const data = tripayJson.data as {
    checkout_url?: string;
    pay_code?: string;
    qr_url?: string;
    reference?: string;
  };

  // Catat order 'pending' di database kita sendiri -- ini yang nanti
  // dijadikan syarat wajib oleh RPC `create_invitation` (lihat 0003/0004_payments.sql).
  const supabase = getSupabase();
  const { error: dbError } = await supabase.rpc("create_payment_order", {
    p_order_id: orderId,
    p_template_id: template.slug,
    p_amount: amount,
    p_payment_method: method,
    p_checkout_url: data.checkout_url ?? null,
    p_pay_code: data.pay_code ?? null,
    p_qr_url: data.qr_url ?? null,
    p_provider_reference: data.reference ?? null,
  });
  if (dbError) {
    return NextResponse.json({ error: "Gagal mencatat order pembayaran: " + dbError.message }, { status: 500 });
  }

  if (!data.checkout_url) {
    return NextResponse.json({ error: "Tripay tidak mengembalikan link pembayaran." }, { status: 502 });
  }

  return NextResponse.json({
    orderId,
    checkoutUrl: data.checkout_url,
    payCode: data.pay_code ?? null,
    qrUrl: data.qr_url ?? null,
  });
}
