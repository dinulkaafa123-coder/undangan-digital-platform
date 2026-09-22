import type { BirthdayEventData } from "@/types/event";

/**
 * Data demo untuk acara ULANG TAHUN, dipakai semua template birthday
 * (Sweet Celebration, Birthday Luxury, Party Pop, dst).
 */
export const demoBirthday: BirthdayEventData = {
  eventType: "birthday",
  title: "Ulang Tahun ke-17 Kirana",
  tagline: "You're Invited to My Sweet Seventeen",
  hostName: "Keluarga Bapak Dedi Kurniawan",
  celebrant: {
    fullName: "Kirana Ayu Kurniawan",
    nickname: "Kirana",
    age: 17,
    photoUrl: "https://picsum.photos/seed/birthday-kirana/700/900",
  },
  coverImage: "https://picsum.photos/seed/birthday-cover/900/1600",
  heroImage: "https://picsum.photos/seed/birthday-hero/1200/1400",
  schedule: {
    id: "birthday-event",
    name: "Pesta Ulang Tahun",
    date: "2026-12-20",
    startTime: "16:00",
    endTime: "20:00",
    venueName: "The Grand Garden Function Hall",
    address: "Jl. Anggrek Raya No. 21, Bandung, Jawa Barat",
    mapsUrl: "https://maps.google.com/?q=Bandung",
    mapsEmbedSrc: "https://www.google.com/maps?q=Bandung&output=embed",
  },
  gallery: [
    { id: "bg1", url: "https://picsum.photos/seed/bday-1/700/900" },
    { id: "bg2", url: "https://picsum.photos/seed/bday-2/900/700" },
    { id: "bg3", url: "https://picsum.photos/seed/bday-3/700/900" },
    { id: "bg4", url: "https://picsum.photos/seed/bday-4/700/700" },
  ],
  music: {
    title: "Happy Birthday Instrumental",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e70c5be0.mp3",
  },
  bankAccounts: [
    { id: "bca-bday", bankName: "BCA", accountNumber: "7778889990", accountHolder: "Dedi Kurniawan" },
  ],
  rsvpEnabled: true,
  wishes: [
    {
      id: "bw-1",
      name: "Sahabat Kirana",
      attendance: "hadir",
      message: "Happy sweet seventeen Kirana! Semoga makin cantik, makin sukses, dan semua impianmu tercapai 🎉",
      createdAt: "2026-11-05T09:00:00.000Z",
    },
    {
      id: "bw-2",
      name: "Tante Rina",
      attendance: "hadir",
      message: "Selamat ulang tahun sayang, semoga panjang umur dan sehat selalu ya!",
      createdAt: "2026-11-06T12:00:00.000Z",
    },
  ],
};
