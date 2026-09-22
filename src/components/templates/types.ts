import type { InvitationData } from "@/types/invitation";
import type { BirthdayEventData, CorporateEventData, KhitananEventData, ReligiousEventData, SchoolEventData } from "@/types/event";

/**
 * Kontrak seragam per JENIS ACARA: eventType + templateId + eventData ->
 * template renderer. Setiap jenis acara punya bentuk data sendiri (lihat
 * `src/types/event.ts`), jadi setiap jenis acara juga punya kontrak props
 * renderer sendiri -- bukan satu prop generik yang dipaksakan ke semua
 * jenis acara (itu yang bikin semuanya terasa seperti "wedding yang
 * judulnya diganti").
 */

/** Kontrak untuk template PERNIKAHAN. Dipertahankan persis seperti semula. */
export interface InvitationTemplateProps {
  data: InvitationData;
  /** dipakai untuk namespacing localStorage ucapan per-template */
  templateSlug: string;
  /** nama tamu dari query string ?to=, default "Tamu Undangan" */
  guestName: string;
}

/** Kontrak untuk template KHITANAN. */
export interface KhitananTemplateProps {
  data: KhitananEventData;
  templateSlug: string;
  guestName: string;
}

/** Kontrak untuk template ULANG TAHUN. */
export interface BirthdayTemplateProps {
  data: BirthdayEventData;
  templateSlug: string;
  guestName: string;
}

/** Kontrak untuk template SEKOLAH / WISUDA. */
export interface SchoolTemplateProps {
  data: SchoolEventData;
  templateSlug: string;
  guestName: string;
}

/** Kontrak untuk template CORPORATE. */
export interface CorporateTemplateProps {
  data: CorporateEventData;
  templateSlug: string;
  guestName: string;
}

/** Kontrak untuk template KEAGAMAAN. */
export interface ReligiousTemplateProps {
  data: ReligiousEventData;
  templateSlug: string;
  guestName: string;
}
