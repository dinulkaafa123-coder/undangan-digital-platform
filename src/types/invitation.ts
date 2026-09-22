/**
 * Struktur data undangan yang dipakai oleh SEMUA template.
 *
 * Prinsip arsitektur:
 *   templateId -> invitationData -> template renderer
 *
 * Artinya satu objek `InvitationData` yang sama bisa dirender oleh
 * template manapun (Elegant Gold, Modern Minimalist, dst) tanpa perlu
 * mengubah data. Desain template tidak boleh menyimpan data pengantin
 * secara hard-code, semua wajib datang dari sini.
 */

export type AttendanceStatus = "hadir" | "tidak_hadir" | "ragu";

export interface Parents {
  father: string;
  mother: string;
}

export interface CoupleProfile {
  /** Nama lengkap (dengan gelar jika ada) */
  fullName: string;
  /** Nama panggilan, ditampilkan besar di cover */
  nickname: string;
  /** Anak ke berapa, mis. "Putra pertama dari" */
  childOrder: string;
  parents: Parents;
  photoUrl: string;
  instagram?: string;
}

export interface EventSchedule {
  id: string;
  /** contoh: "Akad Nikah", "Resepsi" */
  name: string;
  /** ISO date string, contoh "2026-12-20" */
  date: string;
  startTime: string;
  endTime?: string;
  venueName: string;
  address: string;
  mapsUrl: string;
  mapsEmbedSrc: string;
}

export interface LoveStoryMoment {
  id: string;
  date: string;
  title: string;
  description: string;
  photoUrl?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface MusicTrack {
  title: string;
  artist?: string;
  url: string;
}

export interface WishEntry {
  id: string;
  name: string;
  attendance: AttendanceStatus;
  message: string;
  createdAt: string;
}

export interface InvitationData {
  /**
   * Penanda jenis acara untuk sistem Event Invitation Platform
   * (lihat `src/types/event.ts`). Selalu "wedding" di sini -- struktur
   * `InvitationData` ini sendiri TIDAK diubah demi backward compatibility
   * seluruh template pernikahan yang sudah ada.
   */
  eventType: "wedding";
  /** Judul singkat, dipakai untuk <title> & metadata */
  metaTitle: string;
  groom: CoupleProfile;
  bride: CoupleProfile;
  /** Kutipan pembuka, mis. ayat Al-Qur'an / puisi cinta */
  quote: {
    text: string;
    source?: string;
  };
  coverPhotoUrl: string;
  heroPhotoUrl: string;
  events: EventSchedule[];
  loveStory: LoveStoryMoment[];
  gallery: GalleryPhoto[];
  music: MusicTrack;
  bankAccounts: BankAccount[];
  rsvpEnabled: boolean;
  /** Nomor WhatsApp konfirmasi kehadiran, opsional -- ditambahkan untuk form builder, template lama tidak wajib membacanya. */
  rsvpWhatsapp?: string;
  wishes: WishEntry[];
}
