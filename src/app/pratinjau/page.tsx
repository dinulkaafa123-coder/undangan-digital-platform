"use client";

import { useEffect, useState } from "react";
import { loadDraft, DRAFT_STORAGE_KEY, type Draft } from "@/lib/draft-storage";
import { getTemplateComponent } from "@/components/templates/registry";

/**
 * Halaman preview "hidup" untuk builder (`/buat`). Dipasang di dalam
 * `<iframe>` oleh `LivePreview` supaya renderer template beneran bisa
 * dipakai (bukan tiruan ringan seperti di katalog) tanpa mengunci scroll
 * halaman editor -- lihat catatan lengkap di `live-preview.tsx`.
 *
 * TIDAK dimaksudkan untuk dibuka langsung sebagai URL publik -- tombol
 * "Preview Undangan" di builder membuka halaman ini di tab baru untuk
 * pratinjau layar penuh, dan itu tetap valid karena membaca draft yang
 * sama dari localStorage (origin sama).
 */
export default function PratinjauPage() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Sinkronisasi wajib dengan localStorage (sumber eksternal yang tidak
    // tersedia saat SSR) -- state awal "belum ready" dipertahankan sama
    // persis antara server & client untuk menghindari hydration mismatch,
    // baru dibaca sungguhan di sini setelah mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(loadDraft());
    setReady(true);

    function handleStorage(e: StorageEvent) {
      if (e.key === DRAFT_STORAGE_KEY || e.key === null) {
        setDraft(loadDraft());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (!ready) return null;

  if (!draft) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black/5 p-6 text-center text-sm text-black/50">
        Preview akan muncul di sini setelah Anda mulai mengisi form.
      </div>
    );
  }

  const TemplateComponent = getTemplateComponent(draft.templateId);
  if (!TemplateComponent) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black/5 p-6 text-center text-sm text-black/50">
        Template tidak ditemukan.
      </div>
    );
  }

  // TemplateComponent berasal dari registry module-level yang stabil
  // (lihat `registry.tsx`), bukan komponen baru yang didefinisikan saat render.
  // eslint-disable-next-line react-hooks/static-components
  return <TemplateComponent data={draft.eventData} templateSlug={draft.templateId} guestName="Tamu Undangan" />;
}
