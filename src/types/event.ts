import type { BankAccount, EventSchedule, GalleryPhoto, MusicTrack, WishEntry } from "./invitation";
import type { InvitationData } from "./invitation";

/**
 * ============================================================
 * EVENT INVITATION PLATFORM -- arsitektur data
 * ============================================================
 *
 *   eventType + templateId + eventData -> template renderer -> undangan digital
 *
 * Platform ini TIDAK LAGI cuma untuk pernikahan. `eventType` menentukan
 * bentuk `EventData` yang dipakai, dan `templateId` (slug template)
 * menentukan renderer mana yang menampilkannya. Menambah jenis acara
 * baru = menambah satu varian union di sini + satu set template baru,
 * TANPA mengubah jenis acara yang sudah ada.
 */
export type EventType =
  | "wedding"
  | "khitanan"
  | "birthday"
  | "school"
  | "graduation"
  | "corporate"
  | "religious"
  | "gathering"
  | "other";

export interface EventTypeMeta {
  id: EventType;
  label: string;
  emoji: string;
  description: string;
}

export const eventTypes: EventTypeMeta[] = [
  { id: "wedding", label: "Pernikahan", emoji: "💍", description: "Akad, resepsi, dan kisah cinta" },
  { id: "khitanan", label: "Khitanan", emoji: "👶", description: "Walimatul khitan putra tercinta" },
  { id: "birthday", label: "Ulang Tahun", emoji: "🎂", description: "Perayaan hari lahir & pesta" },
  { id: "school", label: "Sekolah", emoji: "🏫", description: "Perpisahan & acara sekolah" },
  { id: "graduation", label: "Wisuda", emoji: "🎓", description: "Wisuda sekolah & kampus" },
  { id: "corporate", label: "Corporate", emoji: "🏢", description: "Seminar, konferensi, acara korporat" },
  { id: "religious", label: "Keagamaan", emoji: "🕌", description: "Pengajian, tabligh akbar, tasyakuran" },
  { id: "gathering", label: "Gathering", emoji: "👨‍👩‍👧", description: "Reuni, family gathering, komunitas" },
  { id: "other", label: "Lainnya", emoji: "🎉", description: "Acara lainnya" },
];

export function getEventTypeMeta(eventType: EventType): EventTypeMeta {
  return eventTypes.find((e) => e.id === eventType) ?? eventTypes[eventTypes.length - 1];
}

/** Field yang secara konsep dipunyai semua jenis acara, dipakai sebagai referensi -- tidak semua eventData literally extends interface ini karena bentuk jadwal & tuan rumah beda-beda per jenis acara. */
export interface EventCommonFields {
  eventType: EventType;
  title: string;
  coverImage: string;
  heroImage: string;
  gallery: GalleryPhoto[];
  music: MusicTrack;
  bankAccounts: BankAccount[];
  rsvpEnabled: boolean;
  wishes: WishEntry[];
}

/** Satu baris agenda/susunan acara -- dipakai school, corporate, & religious. */
export interface AgendaItem {
  id: string;
  time: string;
  activity: string;
}

/** Narasumber/pembicara -- dipakai corporate & religious. */
export interface Speaker {
  name: string;
  title?: string;
  photoUrl?: string;
}

/** Wedding memakai struktur yang sudah ada (`InvitationData`) apa adanya -- tidak diubah sedikit pun demi backward compatibility 8+ template wedding yang sudah berjalan. */
export type WeddingEventData = InvitationData;

export interface KhitananChild {
  fullName: string;
  nickname: string;
  photoUrl: string;
  parents: { father: string; mother: string };
  /** mis. "Putra pertama dari" */
  childOrder: string;
}

export interface KhitananEventData extends EventCommonFields {
  eventType: "khitanan";
  familyName?: string;
  child: KhitananChild;
  greeting: { text: string; source?: string };
  schedule: EventSchedule;
}

export interface BirthdayCelebrant {
  fullName: string;
  nickname: string;
  photoUrl: string;
  age: number;
}

export interface BirthdayEventData extends EventCommonFields {
  eventType: "birthday";
  hostName?: string;
  celebrant: BirthdayCelebrant;
  tagline: string;
  schedule: EventSchedule;
}

export interface SchoolEventData extends EventCommonFields {
  eventType: "school";
  schoolName: string;
  /** mis. "Angkatan 2026" */
  batchYear?: string;
  principalName?: string;
  committeeName?: string;
  description: string;
  agenda: AgendaItem[];
  schedule: EventSchedule;
  /** opsional, ditambahkan untuk form builder -- template lama tidak wajib membacanya. */
  contactPerson?: { name: string; phone: string };
}

export interface CorporateEventData extends EventCommonFields {
  eventType: "corporate";
  companyName: string;
  speaker?: Speaker;
  description: string;
  agenda: AgendaItem[];
  schedule: EventSchedule;
  contactPerson?: { name: string; phone: string };
}

export interface ReligiousEventData extends EventCommonFields {
  eventType: "religious";
  hostName?: string;
  speaker?: Speaker;
  description: string;
  agenda: AgendaItem[];
  schedule: EventSchedule;
  /** opsional, ditambahkan untuk form builder -- template lama tidak wajib membacanya. */
  contactPerson?: { name: string; phone: string };
}

/**
 * Union data acara. Tambah varian baru di sini ketika menambah eventType
 * baru -- renderer template lama tidak perlu ikut berubah karena
 * masing-masing hanya membaca varian miliknya sendiri.
 */
export type EventData =
  | WeddingEventData
  | KhitananEventData
  | BirthdayEventData
  | SchoolEventData
  | CorporateEventData
  | ReligiousEventData;

export function isWeddingEvent(data: EventData): data is WeddingEventData {
  return data.eventType === "wedding";
}

export function isKhitananEvent(data: EventData): data is KhitananEventData {
  return data.eventType === "khitanan";
}

export function isBirthdayEvent(data: EventData): data is BirthdayEventData {
  return data.eventType === "birthday";
}

export function isSchoolEvent(data: EventData): data is SchoolEventData {
  return data.eventType === "school";
}

export function isCorporateEvent(data: EventData): data is CorporateEventData {
  return data.eventType === "corporate";
}

export function isReligiousEvent(data: EventData): data is ReligiousEventData {
  return data.eventType === "religious";
}
