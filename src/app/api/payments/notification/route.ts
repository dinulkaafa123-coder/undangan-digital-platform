import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import { createClient } from "@supabase/supabase-js";

/**
 * Webhook server-to-server dari Duitku ("Callback URL" -- dikirim per
 * transaksi lewat `callbackUrl` saat create, sebaiknya juga diisi sebagai
 * default di Duitku Merchant Portal). TIDAK PERNAH dipanggil dari
 * browser, jadi aman memakai SUPABASE_SERVICE_ROLE_KEY di sini --
 * satu-satunya tempat di seluruh kode aplikasi yang memakainya.
 *
 * Beda dengan Midtrans/Tripay: Duitku mengirim body sebagai
 * `application/x-www-form-urlencoded` (bukan JSON), dan signature-nya
 * adalah SALAH SATU FIELD di body itu sendiri (bukan header terpisah).
 * Formula-nya juga BEDA urutan dari signature saat create transaksi:
 * `HMAC_SHA256(merchantCode + amount + merchantOrderId, apiKey)`.
 */
function mapDuitkuResult(resultCode: string): "settlement" | "failed" | null {
  if (resultCode === "00") return "settlement";
  if (resultCode === "01") return "failed";
  return null;
}

export async function POST(req: Request) {
  const apiKey = process.env.DUITKU_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "DUITKU_API_KEY belum dikonfigurasi di server." }, { status: 500 });
  }

  const rawBody = await req.text();
  const fields = new URLSearchParams(rawBody);

  const merchantCode = fields.get("merchantCode") ?? "";
  const amount = fields.get("amount") ?? "";
  const orderId = fields.get("merchantOrderId") ?? "";
  const resultCode = fields.get("resultCode") ?? "";
  const signature = fields.get("signature") ?? "";

  if (!merchantCode || !amount || !orderId || !signature) {
    return NextResponse.json({ error: "Field callback tidak lengkap." }, { status: 400 });
  }

  const expectedSignature = createHmac("sha256", apiKey).update(`${merchantCode}${amount}${orderId}`).digest("hex");
  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Signature tidak valid." }, { status: 403 });
  }

  const newStatus = mapDuitkuResult(resultCode);
  if (!newStatus) {
    return new Response("OK", { status: 200 });
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
  // status lain kalau Duitku kirim callback duplikat/telat).
  const { data: existing } = await admin.from("payments").select("status").eq("order_id", orderId).maybeSingle();
  if (existing?.status === "settlement" && newStatus !== "settlement") {
    return new Response("OK", { status: 200 });
  }

  const { error } = await admin.from("payments").update({ status: newStatus }).eq("order_id", orderId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Duitku hanya mensyaratkan HTTP 200 OK sebagai balasan valid.
  return new Response("OK", { status: 200 });
}
