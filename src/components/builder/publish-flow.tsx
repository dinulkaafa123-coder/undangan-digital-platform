"use client";

import { useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import type { EventData, EventType } from "@/types/event";
import { getEventTypeMeta } from "@/types/event";
import { createInvitation, updateInvitation, suggestSlugBase, type InvitationRecord } from "@/lib/invitations";
import { copyToClipboard } from "@/lib/utils";

type Stage = "summary" | "working" | "success" | "error";

function getPublicUrl(slug: string): string {
  const base = typeof window !== "undefined" && window.location.origin ? window.location.origin : "http://localhost:3000";
  return `${base}/undangan/${slug}`;
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
  eventData,
  mode,
  existingSlug,
  onClose,
  onPublished,
}: {
  eventType: EventType;
  templateId: string;
  templateName: string;
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

  const eventTypeMeta = getEventTypeMeta(eventType);
  const rows = summarize(eventData);

  async function handleConfirm() {
    setStage("working");
    setError("");
    try {
      let result: InvitationRecord | null;
      if (mode === "update" && existingSlug) {
        result = await updateInvitation(existingSlug, eventData, templateId);
        if (!result) throw new Error("Undangan tidak ditemukan atau sudah tidak aktif di database.");
      } else {
        const base = suggestSlugBase(eventData);
        result = await createInvitation(base, eventType, templateId, eventData);
      }
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
      setError(e instanceof Error ? e.message : "Terjadi kesalahan saat menyimpan ke database. Coba lagi.");
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
            </div>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black/70 transition-colors hover:border-black/40">
                Batal
              </button>
              <button type="button" onClick={handleConfirm} className="flex-1 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black/80">
                {mode === "update" ? "Ya, Simpan" : "Ya, Aktifkan"}
              </button>
            </div>
          </>
        )}

        {stage === "working" && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-black" />
            <p className="text-sm text-black/60">{mode === "update" ? "Menyimpan perubahan..." : "Mengaktifkan undangan..."}</p>
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
              <button type="button" onClick={handleConfirm} className="flex-1 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-black/80">
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
