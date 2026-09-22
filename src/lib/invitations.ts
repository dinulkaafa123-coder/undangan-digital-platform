import { getSupabase } from "@/lib/supabase";
import type { EventData, EventType } from "@/types/event";

export type InvitationStatus = "draft" | "active" | "expired";

export interface InvitationRecord {
  id: string;
  slug: string;
  event_type: EventType;
  template_id: string;
  event_data: EventData;
  status: InvitationStatus;
  views: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  expires_at: string | null;
}

/** Ubah teks bebas jadi slug URL-safe: huruf kecil, angka, strip. */
export function slugify(input: string): string {
  const slug = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "") // buang tanda diakritik hasil normalisasi NFKD
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug.slice(0, 60) || "undangan";
}

/** Saran slug dasar dari isi eventData -- akan dibuat unik oleh `create_invitation` di database (retry -2, -3, dst kalau bentrok). */
export function suggestSlugBase(data: EventData): string {
  switch (data.eventType) {
    case "wedding":
      return slugify(`${data.groom.nickname || data.groom.fullName}-${data.bride.nickname || data.bride.fullName}`);
    case "khitanan":
      return slugify(`khitan-${data.child.nickname || data.child.fullName}`);
    case "birthday":
      return slugify(`ultah-${data.celebrant.nickname || data.celebrant.fullName}`);
    case "school":
      return slugify(data.title || data.schoolName);
    case "corporate":
      return slugify(data.title || data.companyName);
    case "religious":
      return slugify(data.title);
    default:
      return slugify("undangan");
  }
}

/**
 * Semua fungsi di bawah lewat RPC (bukan query tabel langsung) --
 * lihat catatan keamanan di `supabase/migrations/0001_invitations.sql`.
 */

export async function createInvitation(baseSlug: string, eventType: EventType, templateId: string, eventData: EventData): Promise<InvitationRecord> {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc("create_invitation", {
    p_base_slug: baseSlug,
    p_event_type: eventType,
    p_template_id: templateId,
    p_event_data: eventData,
  });
  if (error) throw error;
  return data as InvitationRecord;
}

/**
 * PostgREST TIDAK mengembalikan `null` polos untuk fungsi SQL yang
 * `RETURNS <tabel>` (bukan SETOF) ketika query di dalamnya nol baris --
 * yang dikembalikan adalah objek dengan SEMUA kolom bernilai null (baris
 * komposit kosong). Jadi "tidak ketemu" harus dideteksi lewat `id` yang
 * null, bukan lewat truthiness objeknya sendiri.
 */
function firstRow(data: unknown): InvitationRecord | null {
  if (!data) return null;
  const row = (Array.isArray(data) ? data[0] : data) as InvitationRecord | undefined;
  if (!row || row.id == null) return null;
  return row;
}

export async function getInvitationBySlug(slug: string): Promise<InvitationRecord | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc("get_invitation_by_slug", { p_slug: slug });
  if (error) throw error;
  return firstRow(data);
}

export async function updateInvitation(slug: string, eventData: EventData, templateId?: string): Promise<InvitationRecord | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc("update_invitation", { p_slug: slug, p_event_data: eventData, p_template_id: templateId ?? null });
  if (error) throw error;
  return firstRow(data);
}

/** Fire-and-forget -- kegagalan tidak boleh mengganggu tampilan undangan. */
export async function incrementInvitationViews(slug: string): Promise<void> {
  try {
    const supabase = getSupabase();
    await supabase.rpc("increment_invitation_views", { p_slug: slug });
  } catch {
    // analytics ringan, boleh gagal diam-diam
  }
}
