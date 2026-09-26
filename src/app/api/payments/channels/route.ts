import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import { templates } from "@/data/templates";

/** `yyyy-MM-dd HH:mm:ss` di zona waktu Asia/Jakarta -- format persis yang diminta Duitku untuk `datetime`. */
function duitkuDatetime(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`;
}

/**
 * Proxy tipis ke `getpaymentmethod` milik Duitku -- harus lewat server
 * karena butuh merchantCode+apiKey (rahasia) untuk signature. Biaya per
 * metode berbeda tergantung nominal, jadi wajib menyertakan `templateId`
 * supaya nominal yang dipakai adalah harga template ASLI dari
 * `data/templates.ts`, bukan nilai bebas dari client.
 */
export async function GET(req: Request) {
  const templateId = new URL(req.url).searchParams.get("templateId");
  if (!templateId) {
    return NextResponse.json({ error: "templateId wajib diisi." }, { status: 400 });
  }
  const template = templates.find((t) => t.slug === templateId);
  if (!template || !template.price || template.price <= 0) {
    return NextResponse.json({ error: "Template tidak ditemukan atau tidak memerlukan pembayaran." }, { status: 400 });
  }

  const merchantCode = process.env.DUITKU_MERCHANT_CODE;
  const apiKey = process.env.DUITKU_API_KEY;
  if (!merchantCode || !apiKey) {
    return NextResponse.json({ error: "Payment gateway belum dikonfigurasi di server (env Duitku kosong)." }, { status: 500 });
  }

  const isProduction = process.env.DUITKU_IS_PRODUCTION === "true";
  const base = isProduction ? "https://passport.duitku.com" : "https://sandbox.duitku.com";

  const amount = template.price;
  const datetime = duitkuDatetime();
  // Formula resmi Duitku (getpaymentmethod): HMAC_SHA256(merchantcode + amount + datetime, apiKey)
  const signature = createHmac("sha256", apiKey).update(`${merchantCode}${amount}${datetime}`).digest("hex");

  let res: Response;
  try {
    res = await fetch(`${base}/webapi/api/merchant/paymentmethod/getpaymentmethod`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ merchantcode: merchantCode, amount, datetime, signature }),
    });
  } catch {
    return NextResponse.json({ error: "Tidak bisa menghubungi Duitku." }, { status: 502 });
  }

  const json = await res.json().catch(() => null);
  if (!res.ok || !Array.isArray(json?.paymentFee)) {
    return NextResponse.json({ error: json?.responseMessage || "Gagal mengambil daftar metode pembayaran." }, { status: 502 });
  }

  const channels = (json.paymentFee as Array<Record<string, unknown>>).map((c) => ({
    code: c.paymentMethod as string,
    name: c.paymentName as string,
    iconUrl: c.paymentImage as string | undefined,
    fee: c.totalFee as string | undefined,
  }));

  return NextResponse.json({ channels });
}
