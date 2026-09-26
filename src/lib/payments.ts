import { getSupabase } from "@/lib/supabase";

export type PaymentStatus = "pending" | "settlement" | "expired" | "failed" | "cancelled";

export interface PaymentRecord {
  order_id: string;
  template_id: string;
  amount: number;
  status: PaymentStatus;
  invitation_slug: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Minta Snap token ke server kita sendiri (`/api/payments/create-transaction`),
 * yang lalu memanggil Midtrans pakai MIDTRANS_SERVER_KEY (rahasia, hanya di
 * server) -- browser tidak pernah menyentuh server key itu sama sekali.
 * Harga selalu dihitung ulang dari `data/templates.ts` di server, bukan
 * dari nilai yang dikirim browser.
 */
export async function createPaymentTransaction(templateId: string): Promise<{ token: string; orderId: string }> {
  const res = await fetch("/api/payments/create-transaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ templateId }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "Gagal membuat transaksi pembayaran.");
  }
  return json as { token: string; orderId: string };
}

/** Dipakai untuk polling status order pembayaran (mis. transfer VA yang settlement-nya tidak instan). */
export async function getPaymentStatus(orderId: string): Promise<PaymentRecord | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc("get_payment_status", { p_order_id: orderId });
  if (error) throw error;
  const row = (Array.isArray(data) ? data[0] : data) as PaymentRecord | undefined;
  if (!row || row.order_id == null) return null;
  return row;
}

let snapLoading: Promise<void> | null = null;

/** Muat script Snap.js Midtrans sekali saja, kembalikan promise yang selesai saat `window.snap` siap dipakai. */
export function loadMidtransSnap(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("Snap hanya bisa dimuat di browser."));
  if ((window as unknown as { snap?: unknown }).snap) return Promise.resolve();
  if (snapLoading) return snapLoading;

  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
  if (!clientKey) return Promise.reject(new Error("Payment gateway belum dikonfigurasi (client key kosong)."));

  const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";
  const src = isProduction ? "https://app.midtrans.com/snap/snap.js" : "https://app.sandbox.midtrans.com/snap/snap.js";

  snapLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Gagal memuat Snap.js.")));
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.setAttribute("data-client-key", clientKey);
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Gagal memuat Snap.js."));
    document.head.appendChild(script);
  });
  return snapLoading;
}

export interface SnapResult {
  order_id: string;
  transaction_status: string;
  [key: string]: unknown;
}

/** Wrapper tipis di atas `window.snap.pay` -- lihat dokumentasi Snap.js Midtrans. */
export function snapPay(
  token: string,
  handlers: {
    onSuccess?: (result: SnapResult) => void;
    onPending?: (result: SnapResult) => void;
    onError?: (result: SnapResult) => void;
    onClose?: () => void;
  }
) {
  const snap = (window as unknown as { snap: { pay: (token: string, handlers: unknown) => void } }).snap;
  snap.pay(token, handlers);
}
