import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import { createClient } from "@supabase/supabase-js";

/**
 * Webhook server-to-server dari Tripay ("Callback URL" -- diisi otomatis
 * per transaksi lewat `callback_url` saat create, dan sebaiknya juga
 * diisi sebagai default di Tripay Dashboard > Merchant > Pengaturan).
 * TIDAK PERNAH dipanggil dari browser, jadi aman memakai
 * SUPABASE_SERVICE_ROLE_KEY di sini -- satu-satunya tempat di seluruh
 * kode aplikasi yang memakainya. Key ini HARUS disimpan sebagai
 * server-only env var (TANPA prefix NEXT_PUBLIC_).
 *
 * Setiap callback WAJIB diverifikasi signature-nya (header
 * `X-Callback-Signature`) sebelum status pembayaran di database diubah --
 * ini satu-satunya penjaga supaya orang tidak bisa memalsukan "sudah
 * bayar" dengan mengirim POST palsu ke sini. Signature Tripay dihitung
 * dari BODY MENTAH (raw), jadi harus dibaca sebagai teks dulu sebelum
 * di-parse JSON -- kalau di-parse lalu di-stringify ulang, hasilnya bisa
 * beda karakter (spasi/urutan key) dan signature tidak akan cocok.
 */
function mapTripayStatus(status: string): "settlement" | "expired" | "failed" | "pending" | null {
  switch (status) {
    case "PAID":
      return "settlement";
    case "EXPIRED":
      return "expired";
    case "FAILED":
    case "REFUND":
      return "failed";
    case "UNPAID":
      return "pending";
    default:
      return null;
  }
}

export async function POST(req: Request) {
  const privateKey = process.env.TRIPAY_PRIVATE_KEY;
  if (!privateKey) {
    return NextResponse.json({ success: false, message: "TRIPAY_PRIVATE_KEY belum dikonfigurasi di server." }, { status: 500 });
  }

  const rawBody = await req.text();
  const signatureHeader = req.headers.get("x-callback-signature");
  const expectedSignature = createHmac("sha256", privateKey).update(rawBody).digest("hex");

  if (!signatureHeader || expectedSignature !== signatureHeader) {
    return NextResponse.json({ success: false, message: "Signature tidak valid." }, { status: 403 });
  }

  let body: { merchant_ref?: string; status?: string };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ success: false, message: "Body tidak valid." }, { status: 400 });
  }

  const orderId = body.merchant_ref;
  const newStatus = body.status ? mapTripayStatus(body.status) : null;
  if (!orderId || !newStatus) {
    // Event yang belum kita kenal/perlu diabaikan -- tetap balas sukses supaya Tripay tidak retry terus.
    return NextResponse.json({ success: true });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ success: false, message: "SUPABASE_SERVICE_ROLE_KEY belum dikonfigurasi di server." }, { status: 500 });
  }

  // Hanya di sini service_role dipakai -- lewati RLS secara sengaja untuk
  // menuliskan status yang sudah TERVERIFIKASI signature-nya di atas.
  const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

  // Jangan mundurkan status yang sudah final (mis. 'settlement' balik ke
  // 'pending' kalau Tripay kirim callback duplikat/telat).
  const { data: existing } = await admin.from("payments").select("status").eq("order_id", orderId).maybeSingle();
  if (existing?.status === "settlement" && newStatus !== "settlement") {
    return NextResponse.json({ success: true });
  }

  const { error } = await admin.from("payments").update({ status: newStatus }).eq("order_id", orderId);
  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
