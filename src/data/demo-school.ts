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
  coverImage: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=900&h=1600&fit=crop&crop=faces&auto=format&q=80",
  heroImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=1400&fit=crop&crop=faces&auto=format&q=80",
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
    { id: "sg1", url: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=700&h=900&fit=crop&crop=faces&auto=format&q=80" },
    { id: "sg2", url: "https://images.unsplash.com/photo-1498079022511-d15614cb1c02?w=900&h=700&fit=crop&crop=faces&auto=format&q=80" },
    { id: "sg3", url: "https://images.unsplash.com/photo-1496469888073-80de7e952517?w=700&h=900&fit=crop&crop=faces&auto=format&q=80" },
    { id: "sg4", url: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=700&h=700&fit=crop&crop=faces&auto=format&q=80" },
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
