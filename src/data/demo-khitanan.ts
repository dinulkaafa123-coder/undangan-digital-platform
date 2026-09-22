import type { KhitananEventData } from "@/types/event";

/**
 * Data demo untuk acara KHITANAN, dipakai semua template khitanan
 * (Little Sultan, Little Prince, Islamic Kids, dst). Ganti isi objek
 * ini untuk membuat undangan khitanan baru -- template tidak perlu diubah.
 */
export const demoKhitanan: KhitananEventData = {
  eventType: "khitanan",
  title: "Walimatul Khitan Muhammad Fajar",
  familyName: "Keluarga Bapak Rizal Hidayat",
  greeting: {
    text: "Ya Allah, jadikanlah anak ini anak yang shalih, sehat, dan berbakti kepada kedua orang tuanya.",
    source: "Doa untuk anak yang dikhitan",
  },
  child: {
    fullName: "Muhammad Fajar Ramadhan",
    nickname: "Fajar",
    childOrder: "Putra kedua dari",
    photoUrl: "https://picsum.photos/seed/khitan-fajar/700/900",
    parents: {
      father: "Bapak Rizal Hidayat",
      mother: "Ibu Novi Andriani",
    },
  },
  coverImage: "https://picsum.photos/seed/khitan-cover/900/1600",
  heroImage: "https://picsum.photos/seed/khitan-hero/1200/1400",
  schedule: {
    id: "khitan-event",
    name: "Walimatul Khitan",
    date: "2026-12-20",
    startTime: "09:00",
    endTime: "13:00",
    venueName: "Kediaman Keluarga Bapak Rizal Hidayat",
    address: "Jl. Melati Indah No. 8, Bekasi, Jawa Barat",
    mapsUrl: "https://maps.google.com/?q=Bekasi",
    mapsEmbedSrc: "https://www.google.com/maps?q=Bekasi&output=embed",
  },
  gallery: [
    { id: "kg1", url: "https://picsum.photos/seed/khitan-1/700/900" },
    { id: "kg2", url: "https://picsum.photos/seed/khitan-2/900/700" },
    { id: "kg3", url: "https://picsum.photos/seed/khitan-3/700/900" },
    { id: "kg4", url: "https://picsum.photos/seed/khitan-4/700/700" },
  ],
  music: {
    title: "Sholawat Instrumental",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e70c5be0.mp3",
  },
  bankAccounts: [
    { id: "bca-khitan", bankName: "BCA", accountNumber: "5551112223", accountHolder: "Rizal Hidayat" },
  ],
  rsvpEnabled: true,
  wishes: [
    {
      id: "kw-1",
      name: "Keluarga Besar Hidayat",
      attendance: "hadir",
      message: "Selamat ya Fajar, semoga jadi anak sholih dan sehat selalu. Semoga acaranya lancar!",
      createdAt: "2026-11-02T08:00:00.000Z",
    },
    {
      id: "kw-2",
      name: "Bu Yanti",
      attendance: "hadir",
      message: "Barakallah Fajar, semangat ya nak! Semoga cepat sembuh dan makin sholih.",
      createdAt: "2026-11-04T10:00:00.000Z",
    },
  ],
};
