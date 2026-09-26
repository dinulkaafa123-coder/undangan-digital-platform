import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";

/**
 * Webhook server-to-server dari Midtrans ("Payment Notification URL" di
 * dashboard Midtrans harus diarahkan ke URL route ini). TIDAK PERNAH
 * dipanggil dari browser, jadi aman memakai SUPABASE_SERVICE_ROLE_KEY di
 * sini -- satu-satunya tempat di seluruh kode aplikasi yang memakainya.
 * Key ini HARUS disimpan sebagai server-only env var (TANPA prefix
 * NEXT_PUBLIC_) supaya tidak pernah ikut ter-bundle ke JS yang dikirim
 * ke browser.
 *
 * Setiap notifikasi WAJIB diverifikasi signature-nya sebelum status
 * pembayaran di database diubah -- ini satu-satunya penjaga supaya orang
 * tidak bisa memalsukan "sudah bayar" dengan mengirim POST palsu ke sini.
 */
function verifySignature(orderId: string, statusCode: string, grossAmount: string, serverKey: string, signatureKey: string): boolean {
  const expected = createHash("sha512").update(`${orderId}${statusCode}${grossAmount}${serverKey}`).digest("hex");
  return expected === signatureKey;
}

function mapMidtransStatus(transactionStatus: string, fraudStatus?: string): "settlement" | "pending" | "cancelled" | "expired" | "failed" | null {
  if (transactionStatus === "capture") {
    if (fraudStatus === "accept" || !fraudStatus) return "settlement";
    return null; // fraud_status 'challenge' -- tunggu review manual, jangan ubah status dulu
  }
  if (transactionStatus === "settlement") return "settlement";
  if (transactionStatus === "pending") return "pending";
  if (transactionStatus === "deny" || transactionStatus === "cancel") return "cancelled";
  if (transactionStatus === "expire") return "expired";
  if (transactionStatus === "failure") return "failed";
  return null;
}

export async function POST(req: Request) {
  let body: {
    order_id?: string;
    status_code?: string;
    gross_amount?: string;
    signature_key?: string;
    transaction_status?: string;
    fraud_status?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid." }, { status: 400 });
  }

  const { order_id, status_code, gross_amount, signature_key, transaction_status, fraud_status } = body;
  if (!order_id || !status_code || !gross_amount || !signature_key || !transaction_status) {
    return NextResponse.json({ error: "Field notifikasi tidak lengkap." }, { status: 400 });
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    return NextResponse.json({ error: "MIDTRANS_SERVER_KEY belum dikonfigurasi di server." }, { status: 500 });
  }

  if (!verifySignature(order_id, status_code, gross_amount, serverKey, signature_key)) {
    return NextResponse.json({ error: "Signature tidak valid." }, { status: 403 });
  }

  const newStatus = mapMidtransStatus(transaction_status, fraud_status);
  if (!newStatus) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY belum dikonfigurasi di server." }, { status: 500 });
  }

  // Hanya di sini service_role dipakai -- lewati RLS secara sengaja untuk
  // menuliskan status yang sudah TERVERIFIKASI signature-nya di atas.
  const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

  // Jangan mundurkan status yang sudah final (mis. 'settlement' balik ke
  // 'pending' kalau Midtrans kirim notifikasi duplikat/telat).
  const { data: existing } = await admin.from("payments").select("status").eq("order_id", order_id).maybeSingle();
  if (existing?.status === "settlement" && newStatus !== "settlement") {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const { error } = await admin.from("payments").update({ status: newStatus }).eq("order_id", order_id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
