import type { EventData, EventType } from "@/types/event";

/**
 * Draft undangan yang sedang dibuat user. Untuk tahap ini (belum ada
 * Supabase) disimpan di localStorage supaya bertahan setelah refresh --
 * lihat `src/components/builder/builder-app.tsx` untuk alurnya, dan
 * `src/app/pratinjau/page.tsx` yang membaca draft yang sama untuk live
 * preview di dalam iframe (disinkronkan lewat event `storage` bawaan
 * browser setiap kali localStorage berubah).
 */
export interface Draft {
  eventType: EventType;
  templateId: string;
  eventData: EventData;
  updatedAt: string;
  /**
   * Diisi setelah "Aktifkan Undangan" berhasil -- slug publik yang sudah
   * tersimpan di database (`invitations.slug`). Kalau ada, builder pindah
   * ke mode edit ("Simpan Perubahan" langsung update baris yang sama,
   * bukan membuat undangan/link baru).
   */
  publishedSlug?: string;
  publishedId?: string;
}

export const DRAFT_STORAGE_KEY = "undangan:draft:v1";

export function loadDraft(): Draft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Draft;
    if (!parsed || !parsed.eventType || !parsed.templateId || !parsed.eventData) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveDraft(draft: Draft): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ ...draft, updatedAt: new Date().toISOString() }));
  } catch {
    // kuota localStorage penuh / private mode -- gagal diam-diam, form tetap jalan dari state React
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // ignore
  }
}
