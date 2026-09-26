import { getSupabase } from "@/lib/supabase";

export type PaymentStatus = "pending" | "settlement" | "expired" | "failed" | "cancelled";

export interface PaymentRecord {
  order_id: string;
  template_id: string;
  amount: number;
  status: PaymentStatus;
  invitation_slug: string | null;
  provider: string;
  payment_method: string | null;
  checkout_url: string | null;
  pay_code: string | null;
  qr_url: string | null;
  provider_reference: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaymentChannel {
  code: string;
  name: string;
  group: string;
  iconUrl?: string;
  feeCustomer?: unknown;
  minimumAmount?: number;
  maximumAmount?: number;
}

/** Daftar metode pembayaran aktif dari Tripay (QRIS, VA bank, e-wallet, dst) -- diambil server-side lewat `/api/payments/channels` karena butuh API key rahasia. */
export async function getPaymentChannels(): Promise<PaymentChannel[]> {
  const res = await fetch("/api/payments/channels");
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Gagal mengambil daftar metode pembayaran.");
  return json.channels as PaymentChannel[];
}

/**
 * Minta transaksi baru ke server kita sendiri (`/api/payments/create-transaction`),
 * yang lalu memanggil Tripay pakai TRIPAY_API_KEY/TRIPAY_PRIVATE_KEY (rahasia,
 * hanya di server). Harga selalu dihitung ulang dari `data/templates.ts` di
 * server, bukan dari nilai yang dikirim browser. `checkoutUrl` adalah
 * halaman Tripay yang menampilkan instruksi bayar (QR/nomor VA/dsb) --
 * dibuka di tab baru, bukan popup JS seperti gateway lain.
 */
export async function createPaymentTransaction(
  templateId: string,
  method: string
): Promise<{ orderId: string; checkoutUrl: string; payCode: string | null; qrUrl: string | null }> {
  const res = await fetch("/api/payments/create-transaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ templateId, method }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "Gagal membuat transaksi pembayaran.");
  }
  return json as { orderId: string; checkoutUrl: string; payCode: string | null; qrUrl: string | null };
}

/** Dipakai untuk polling status order pembayaran -- semua metode Tripay bersifat async (pembeli menyelesaikan di halaman/apps terpisah), jadi selalu perlu di-poll sampai 'settlement'. */
export async function getPaymentStatus(orderId: string): Promise<PaymentRecord | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc("get_payment_status", { p_order_id: orderId });
  if (error) throw error;
  const row = (Array.isArray(data) ? data[0] : data) as PaymentRecord | undefined;
  if (!row || row.order_id == null) return null;
  return row;
}
