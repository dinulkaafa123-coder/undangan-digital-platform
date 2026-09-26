"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import type { EventData, EventType } from "@/types/event";
import { getEventTypeMeta } from "@/types/event";
import { createInvitation, updateInvitation, suggestSlugBase, type InvitationRecord } from "@/lib/invitations";
import { createPaymentTransaction, getPaymentChannels, getPaymentStatus, type PaymentChannel } from "@/lib/payments";
import { copyToClipboard } from "@/lib/utils";

type Stage = "summary" | "choose-method" | "creating" | "pending" | "working" | "success" | "error";

const POLL_INTERVAL_MS = 4000;
const POLL_TIMEOUT_MS = 10 * 60 * 1000; // Tripay lebih sering async (VA/QR) -- kasih waktu lebih lama dari sekadar popup kartu.

function getPublicUrl(slug: string): string {
  const base = typeof window !== "undefined" && window.location.origin ? window.location.origin : "http://localhost:3000";
  return `${base}/undangan/${slug}`;
}

function formatRupiah(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID")}`;
}

/** Ringkasan singkat data acara sebelum publish -- beda per jenis acara, bukan label generik. */
function summarize(data: EventData): { label: string; value: string }[] {
  switch (data.eventType) {
    case "wedding": {
      const akad = data.events[0];
      return [
        { label: "Mempelai", value: `${data.groom.nickname || "-"} & ${data.bride.nickname || "-"}` },
        { label: "Tanggal Akad", value: akad?.date || "-" },
        { label: "Lokasi", value: akad?.venueName || "-" },
      ];
    }
    case "khitanan":
      return [
        { label: "Nama Anak", value: data.child.nickname || data.child.fullName || "-" },
        { label: "Tanggal", value: data.schedule.date || "-" },
        { label: "Lokasi", value: data.schedule.venueName || "-" },
      ];
    case "birthday":
      return [
        { label: "Nama", value: data.celebrant.nickname || data.celebrant.fullName || "-" },
        { label: "Usia", value: String(data.celebrant.age || "-") },
        { label: "Tanggal", value: data.schedule.date || "-" },
      ];
    case "school":
      return [
        { label: "Nama Acara", value: data.title || "-" },
        { label: "Sekolah", value: data.schoolName || "-" },
        { label: "Tanggal", value: data.schedule.date || "-" },
      ];
    case "corporate":
      return [
        { label: "Nama Acara", value: data.title || "-" },
        { label: "Perusahaan", value: data.companyName || "-" },
        { label: "Tanggal", value: data.schedule.date || "-" },
      ];
    case "religious":
      return [
        { label: "Nama Acara", value: data.title || "-" },
        { label: "Tanggal", value: data.schedule.date || "-" },
        { label: "Lokasi", value: data.schedule.venueName || "-" },
      ];
    default:
      return [];
  }
}

export function PublishFlow({
  eventType,
  templateId,
  templateName,
  templatePrice,
  eventData,
  mode,
  existingSlug,
  onClose,
  onPublished,
}: {
  eventType: EventType;
  templateId: string;
  templateName: string;
  /** Harga template (Rp). Wajib > 0 untuk mode "activate" -- tidak ada template gratis. */
  templatePrice: number;
  eventData: EventData;
  mode: "activate" | "update";
  existingSlug?: string;
  onClose: () => void;
  onPublished: (record: InvitationRecord) => void;
}) {
  const [stage, setStage] = useState<Stage>("summary");
  const [error, setError] = useState("");
  const [record, setRecord] = useState<InvitationRecord | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [channels, setChannels] = useState<PaymentChannel[]>([]);
  const [channelsLoading, setChannelsLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const pollRef = useRef<{ interval: number; timeout: number } | null>(null);

  const eventTypeMeta = getEventTypeMeta(eventType);
  const rows = summarize(eventData);

  useEffect(() => {
    return () => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current.interval);
        window.clearTimeout(pollRef.current.timeout);
      }
    };
  }, []);

  async function finalizeWithOrder(orderId: string) {
    setStage("working");
    setError("");
    try {
      const base = suggestSlugBase(eventData);
      const result = await createInvitation(base, eventType, templateId, eventData, orderId);
      setRecord(result);
      const url = getPublicUrl(result.slug);
      try {
        const qr = await QRCode.toDataURL(url, { width: 400, margin: 1 });
        setQrDataUrl(qr);
      } catch {
        // QR gagal dibuat -- bukan blocker, link tetap valid tanpa QR
      }
      setStage("success");
      onPublished(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Pembayaran berhasil, tapi terjadi kesalahan saat menyimpan undangan. Coba lagi atau hubungi kami.");
      setStage("error");
    }
  }

  function startPolling(orderId: string) {
    const startedAt = Date.now();
    const interval = window.setInterval(async () => {
      try {
        const payment = await getPaymentStatus(orderId);
        if (!payment) return;
        if (payment.status === "settlement") {
          window.clearInterval(interval);
          window.clearTimeout(timeout);
          finalizeWithOrder(orderId);
          return;
        }
        if (payment.status === "expired" || payment.status === "failed" || payment.status === "cancelled") {
          window.clearInterval(interval);
          window.clearTimeout(timeout);
          setError("Pembayaran tidak berhasil diselesaikan (dibatalkan/kedaluwarsa). Silakan coba lagi.");
          setStage("error");
        }
      } catch {
        // Jaringan sempat gagal saat poll -- coba lagi di interval berikutnya, jangan langsung error.
      }
      if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
        window.clearInterval(interval);
        setError("Menunggu konfirmasi pembayaran terlalu lama. Jika Anda sudah membayar, buka kembali menu ini beberapa saat lagi.");
        setStage("error");
      }
    }, POLL_INTERVAL_MS);
    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
    }, POLL_TIMEOUT_MS + POLL_INTERVAL_MS);
    pollRef.current = { interval, timeout };
  }

  async function handleUpdateOnly() {
    setStage("working");
    setError("");
    try {
      if (!existingSlug) throw new Error("Slug undangan tidak ditemukan.");
      const result = await updateInvitation(existingSlug, eventData, templateId);
      if (!result) throw new Error("Undangan tidak ditemukan atau sudah tidak aktif di database.");
      setRecord(result);
      const url = getPublicUrl(result.slug);
      try {
        const qr = await QRCode.toDataURL(url, { width: 400, margin: 1 });
        setQrDataUrl(qr);
      } catch {
        // bukan blocker
      }
      setStage("success");
      onPublished(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan saat menyimpan ke database. Coba lagi.");
      setStage("error");
    }
  }

  async function handleConfirm() {
    if (mode === "update") {
      await handleUpdateOnly();
      return;
    }

    // mode "activate": tidak ada template gratis -- selalu pilih metode bayar dulu lewat Tripay.
    if (!templatePrice || templatePrice <= 0) {
      setError("Template ini belum memiliki harga yang valid. Hubungi kami sebelum mengaktifkan undangan ini.");
      setStage("error");
      return;
    }

    setStage("choose-method");
    setChannelsLoading(true);
    setError("");
    try {
      const list = await getPaymentChannels();
      setChannels(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal mengambil daftar metode pembayaran.");
      setStage("error");
    } finally {
      setChannelsLoading(false);
    }
  }

  async function handleChooseMethod(method: string) {
    setStage("creating");
    setError("");
    try {
      const result = await createPaymentTransaction(templateId, method);
      setCheckoutUrl(result.checkoutUrl);
      window.open(result.checkoutUrl, "_blank", "noopener,noreferrer");
      setStage("pending");
      startPolling(result.orderId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal membuat transaksi pembayaran.");
      setStage("error");
    }
  }

  async function handleCopy(url: string) {
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleDownloadQr() {
    if (!qrDataUrl || !record) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `qr-undangan-${record.slug}.png`;
    a.click();
  }

  const whatsappMessage = record
    ? `Halo, kami mengundang Anda untuk hadir di acara kami.\n\nLihat undangan:\n${getPublicUrl(record.slug)}`
    : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        {stage === "summary" && (
          <>
            <h2 className="text-lg font-bold text-black">{mode === "update" ? "Simpan Perubahan?" : "Aktifkan Undangan?"}</h2>
            <p className="mt-1 text-sm text-black/60">
              {mode === "update"
                ? "Perubahan akan langsung tersimpan ke database. Link undangan tetap sama."
                : `Undangan ${eventTypeMeta.label.toLowerCase()} ini akan dipublikasikan dan bisa dibuka siapa pun lewat link publik.`}
            </p>
            <div className="mt-4 space-y-2 rounded-xl bg-black/[0.03] p-4">
              {rows.map((row) => (
                <div key={row.label} className="flex justify-between gap-3 text-sm">
                  <span className="text-black/50">{row.label}</span>
                  <span className="text-right font-medium text-black">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-black/50">Template</span>
                <span className="text-right font-medium text-black">{templateName}</span>
              </div>
              {mode === "activate" && (
                <div className="flex justify-between gap-3 border-t border-black/10 pt-2 text-sm">
                  <span className="font-semibold text-black/70">Harga</span>
                  <span className="text-right font-bold text-black">{formatRupiah(templatePrice)}</span>
                </div>
              )}
            </div>
            {mode === "activate" && (
              <p className="mt-3 text-xs text-black/40">
                Pembayaran diproses aman lewat Tripay (QRIS, e-wallet, transfer bank, minimarket). Undangan aktif otomatis setelah pembayaran terverifikasi.
              </p>
            )}
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black/70 transition-colors hover:border-black/40">
                Batal
              </button>
              <button type="button" onClick={handleConfirm} className="flex-1 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black/80">
                {mode === "update" ? "Ya, Simpan" : `Pilih Metode Bayar`}
              </button>
            </div>
          </>
        )}

        {stage === "choose-method" && (
          <>
            <h2 className="text-lg font-bold text-black">Pilih Metode Pembayaran</h2>
            <p className="mt-1 text-sm text-black/60">Total: <span className="font-bold text-black">{formatRupiah(templatePrice)}</span></p>
            <div className="mt-4 max-h-80 space-y-2 overflow-y-auto">
              {channelsLoading && (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/15 border-t-black" />
                  <p className="text-xs text-black/50">Memuat metode pembayaran...</p>
                </div>
              )}
              {!channelsLoading && channels.length === 0 && (
                <p className="py-6 text-center text-sm text-black/50">Belum ada metode pembayaran yang tersedia saat ini.</p>
              )}
              {!channelsLoading &&
                channels.map((ch) => (
                  <button
                    key={ch.code}
                    type="button"
                    onClick={() => handleChooseMethod(ch.code)}
                    className="flex w-full items-center gap-3 rounded-xl border border-black/10 px-4 py-3 text-left transition-colors hover:border-black/30 hover:bg-black/[0.02]"
                  >
                    {ch.iconUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={ch.iconUrl} alt={ch.name} className="h-6 w-10 object-contain" />
                    )}
                    <span className="flex-1 text-sm font-medium text-black">{ch.name}</span>
                    <span className="text-xs text-black/40">{ch.group}</span>
                  </button>
                ))}
            </div>
            <button type="button" onClick={onClose} className="mt-4 w-full rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black/70 transition-colors hover:border-black/40">
              Batal
            </button>
          </>
        )}

        {stage === "creating" && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-black" />
            <p className="text-sm text-black/60">Membuat transaksi pembayaran...</p>
          </div>
        )}

        {stage === "pending" && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-black" />
            <p className="text-sm font-medium text-black">Menunggu konfirmasi pembayaran...</p>
            <p className="max-w-xs text-xs text-black/50">
              Selesaikan pembayaran di tab yang baru terbuka (QR/nomor VA/instruksi lainnya). Halaman ini akan otomatis lanjut begitu pembayaran Anda terkonfirmasi -- jangan tutup halaman ini.
            </p>
            {checkoutUrl && (
              <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-xs font-semibold text-black underline underline-offset-2">
                Buka lagi halaman pembayaran
              </a>
            )}
          </div>
        )}

        {stage === "working" && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-black" />
            <p className="text-sm text-black/60">{mode === "update" ? "Menyimpan perubahan..." : "Pembayaran berhasil, mengaktifkan undangan..."}</p>
          </div>
        )}

        {stage === "error" && (
          <div className="text-center">
            <p className="text-3xl">⚠️</p>
            <h2 className="mt-3 text-lg font-bold text-black">Gagal {mode === "update" ? "menyimpan" : "mengaktifkan"}</h2>
            <p className="mt-2 text-sm text-red-600">{error}</p>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black/70 hover:border-black/40">
                Tutup
              </button>
              <button type="button" onClick={() => setStage("summary")} className="flex-1 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-black/80">
                Coba Lagi
              </button>
            </div>
          </div>
        )}

        {stage === "success" && record && (
          <div className="text-center">
            <p className="text-3xl">🎉</p>
            <h2 className="mt-3 text-lg font-bold text-black">
              {mode === "update" ? "Perubahan berhasil disimpan!" : "Undangan Anda sudah aktif!"}
            </h2>
            <p className="mt-2 break-all rounded-lg bg-black/[0.03] px-3 py-2 text-sm font-medium text-black">{getPublicUrl(record.slug)}</p>

            {qrDataUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrDataUrl} alt="QR Code undangan" className="mx-auto mt-4 h-36 w-36 rounded-lg border border-black/10" />
            )}

            <div className="mt-5 flex flex-col gap-2.5">
              <button type="button" onClick={() => handleCopy(getPublicUrl(record.slug))} className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:border-black/40">
                {copied ? "Tersalin ✓" : "Salin Link"}
              </button>
              <Link href={`/undangan/${record.slug}`} target="_blank" className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:border-black/40">
                Buka Undangan
              </Link>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Bagikan WhatsApp
              </a>
              {qrDataUrl && (
                <button type="button" onClick={handleDownloadQr} className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:border-black/40">
                  Download QR Code
                </button>
              )}
              <button type="button" onClick={onClose} className="mt-1 text-xs font-medium text-black/40 hover:text-black/70">
                Tutup & Lanjut Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
