import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { templates } from "@/data/templates";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Route ini SELALU berjalan di server (Next.js Route Handler, bukan
 * "use client") -- MIDTRANS_SERVER_KEY tidak pernah dikirim ke browser.
 * Harga (`gross_amount`) SELALU diambil dari `data/templates.ts` lewat
 * `templateId`, TIDAK PERNAH dipercaya dari body request -- supaya
 * pengunjung tidak bisa mengubah harga jadi lebih murah lewat DevTools.
 */
export async function POST(req: Request) {
  let body: { templateId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body request tidak valid." }, { status: 400 });
  }

  const templateId = body.templateId;
  if (!templateId || typeof templateId !== "string") {
    return NextResponse.json({ error: "templateId wajib diisi." }, { status: 400 });
  }

  const template = templates.find((t) => t.slug === templateId);
  if (!template) {
    return NextResponse.json({ error: "Template tidak ditemukan." }, { status: 404 });
  }
  if (!template.price || template.price <= 0) {
    return NextResponse.json({ error: "Template ini tidak memerlukan pembayaran." }, { status: 400 });
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    return NextResponse.json({ error: "Payment gateway belum dikonfigurasi di server (MIDTRANS_SERVER_KEY kosong)." }, { status: 500 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database belum dikonfigurasi di server." }, { status: 500 });
  }

  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
  const snapUrl = isProduction ? "https://app.midtrans.com/snap/v1/transactions" : "https://app.sandbox.midtrans.com/snap/v1/transactions";

  const orderId = `INV-${Date.now()}-${randomBytes(3).toString("hex")}`;

  // Catat order 'pending' dulu di database kita sendiri -- ini yang nanti
  // dijadikan syarat wajib oleh RPC `create_invitation` (lihat 0003_payments.sql).
  const supabase = getSupabase();
  const { error: dbError } = await supabase.rpc("create_payment_order", {
    p_order_id: orderId,
    p_template_id: template.slug,
    p_amount: template.price,
  });
  if (dbError) {
    return NextResponse.json({ error: "Gagal mencatat order pembayaran: " + dbError.message }, { status: 500 });
  }

  let midtransRes: Response;
  try {
    midtransRes = await fetch(snapUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Basic " + Buffer.from(`${serverKey}:`).toString("base64"),
      },
      body: JSON.stringify({
        transaction_details: { order_id: orderId, gross_amount: template.price },
        item_details: [{ id: template.slug, price: template.price, quantity: 1, name: `Template ${template.name}`.slice(0, 50) }],
        credit_card: { secure: true },
      }),
    });
  } catch {
    return NextResponse.json({ error: "Tidak bisa menghubungi Midtrans." }, { status: 502 });
  }

  const midtransJson = await midtransRes.json().catch(() => null);
  if (!midtransRes.ok || !midtransJson?.token) {
    const message = midtransJson?.error_messages?.join(", ") || "Gagal membuat transaksi pembayaran.";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  return NextResponse.json({ token: midtransJson.token, orderId });
}
