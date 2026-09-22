import type { SchoolEventData } from "@/types/event";

/** Data demo untuk acara SEKOLAH/WISUDA, dipakai template Graduation Elegant, Academic Blue, Graduation Cinema. */
export const demoSchool: SchoolEventData = {
  eventType: "school",
  title: "Wisuda & Pelepasan Angkatan 2026",
  schoolName: "SMA Negeri 1 Harapan Bangsa",
  batchYear: "Angkatan 2026",
  principalName: "Dra. Hj. Siti Marlina, M.Pd.",
  committeeName: "Panitia Wisuda SMA Negeri 1 Harapan Bangsa",
  description:
    "Dengan penuh syukur, kami mengundang Bapak/Ibu/Wali Murid untuk hadir dalam acara Wisuda dan Pelepasan siswa-siswi kelas XII Angkatan 2026.",
  coverImage: "https://picsum.photos/seed/school-cover/900/1600",
  heroImage: "https://picsum.photos/seed/school-hero/1200/1400",
  agenda: [
    { id: "a1", time: "08.00 - 08.30", activity: "Registrasi Peserta" },
    { id: "a2", time: "08.30 - 09.00", activity: "Pembukaan & Menyanyikan Lagu Indonesia Raya" },
    { id: "a3", time: "09.00 - 10.00", activity: "Sambutan Kepala Sekolah & Ketua Panitia" },
    { id: "a4", time: "10.00 - 11.30", activity: "Prosesi Wisuda & Penyerahan Sertifikat" },
    { id: "a5", time: "11.30 - 12.30", activity: "Persembahan Angkatan & Sesi Foto Bersama" },
  ],
  schedule: {
    id: "school-event",
    name: "Wisuda Angkatan 2026",
    date: "2026-12-12",
    startTime: "08:00",
    endTime: "13:00",
    venueName: "Aula Serbaguna SMA Negeri 1 Harapan Bangsa",
    address: "Jl. Pendidikan No. 17, Yogyakarta, DI Yogyakarta",
    mapsUrl: "https://maps.google.com/?q=Yogyakarta",
    mapsEmbedSrc: "https://www.google.com/maps?q=Yogyakarta&output=embed",
  },
  gallery: [
    { id: "sg1", url: "https://picsum.photos/seed/school-1/700/900" },
    { id: "sg2", url: "https://picsum.photos/seed/school-2/900/700" },
    { id: "sg3", url: "https://picsum.photos/seed/school-3/700/900" },
    { id: "sg4", url: "https://picsum.photos/seed/school-4/700/700" },
  ],
  music: {
    title: "Graduation Theme Instrumental",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e70c5be0.mp3",
  },
  bankAccounts: [],
  rsvpEnabled: true,
  wishes: [
    {
      id: "sw-1",
      name: "Wali Kelas XII IPA 1",
      attendance: "hadir",
      message: "Selamat kepada seluruh siswa-siswi Angkatan 2026! Semoga sukses di jenjang berikutnya.",
      createdAt: "2026-11-10T08:00:00.000Z",
    },
  ],
};
