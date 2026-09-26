import { NextResponse } from "next/server";

/**
 * Proxy tipis ke `GET /merchant/payment-channel` milik Tripay -- harus
 * lewat server karena butuh header Authorization dengan TRIPAY_API_KEY
 * (rahasia). Browser hanya menerima daftar channel yang sudah aktif,
 * sudah dipangkas ke field yang benar-benar dipakai UI.
 */
export async function GET() {
  const apiKey = process.env.TRIPAY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Payment gateway belum dikonfigurasi di server (TRIPAY_API_KEY kosong)." }, { status: 500 });
  }

  const isProduction = process.env.TRIPAY_IS_PRODUCTION === "true";
  const base = isProduction ? "https://tripay.co.id/api" : "https://tripay.co.id/api-sandbox";

  let res: Response;
  try {
    res = await fetch(`${base}/merchant/payment-channel`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ error: "Tidak bisa menghubungi Tripay." }, { status: 502 });
  }

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success || !Array.isArray(json.data)) {
    return NextResponse.json({ error: "Gagal mengambil daftar metode pembayaran." }, { status: 502 });
  }

  const channels = (json.data as Array<Record<string, unknown>>)
    .filter((c) => c.active)
    .map((c) => ({
      code: c.code as string,
      name: c.name as string,
      group: (c.group as string) ?? "Lainnya",
      iconUrl: c.icon_url as string | undefined,
      feeCustomer: c.fee_customer,
      minimumAmount: c.minimum_amount as number | undefined,
      maximumAmount: c.maximum_amount as number | undefined,
    }));

  return NextResponse.json({ channels });
}
