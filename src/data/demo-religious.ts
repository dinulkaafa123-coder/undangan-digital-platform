import type { ReligiousEventData } from "@/types/event";

/** Data demo untuk acara KEAGAMAAN, dipakai template Islamic Emerald, Ramadhan Gold, Tabligh Akbar. */
export const demoReligious: ReligiousEventData = {
  eventType: "religious",
  title: "Tabligh Akbar Menyambut Tahun Baru Hijriah",
  hostName: "Masjid Agung Al-Ikhlas",
  speaker: {
    name: "Ustadz H. Ahmad Fauzi, Lc.",
    title: "Pendakwah & Pengasuh Majelis Taklim Nurul Hidayah",
    photoUrl: "https://picsum.photos/seed/religious-speaker/500/500",
  },
  description:
    "Marilah bersama-sama meraih keberkahan dalam kehidupan dengan menghadiri Tabligh Akbar dalam rangka menyambut Tahun Baru Hijriah, bersama Ustadz H. Ahmad Fauzi, Lc.",
  coverImage: "https://picsum.photos/seed/religious-cover/900/1600",
  heroImage: "https://picsum.photos/seed/religious-hero/1200/1400",
  agenda: [
    { id: "r1", time: "19.00 - 19.30", activity: "Registrasi & Sholat Isya Berjamaah" },
    { id: "r2", time: "19.30 - 20.00", activity: "Pembukaan & Pembacaan Ayat Suci Al-Qur'an" },
    { id: "r3", time: "20.00 - 21.30", activity: "Tausiyah Utama" },
    { id: "r4", time: "21.30 - 22.00", activity: "Doa Bersama & Penutup" },
  ],
  schedule: {
    id: "religious-event",
    name: "Tabligh Akbar",
    date: "2026-12-12",
    startTime: "19:00",
    endTime: "22:00",
    venueName: "Masjid Agung Al-Ikhlas",
    address: "Jl. Diponegoro No. 5, Bandung, Jawa Barat",
    mapsUrl: "https://maps.google.com/?q=Bandung",
    mapsEmbedSrc: "https://www.google.com/maps?q=Bandung&output=embed",
  },
  gallery: [
    { id: "rg1", url: "https://picsum.photos/seed/religious-1/700/900" },
    { id: "rg2", url: "https://picsum.photos/seed/religious-2/900/700" },
    { id: "rg3", url: "https://picsum.photos/seed/religious-3/700/900" },
    { id: "rg4", url: "https://picsum.photos/seed/religious-4/700/700" },
  ],
  music: {
    title: "Nasyid Instrumental",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e70c5be0.mp3",
  },
  bankAccounts: [{ id: "infaq", bankName: "BSI", accountNumber: "7001234567", accountHolder: "DKM Masjid Agung Al-Ikhlas" }],
  rsvpEnabled: true,
  wishes: [
    {
      id: "rw-1",
      name: "Jamaah Al-Ikhlas",
      attendance: "hadir",
      message: "Bismillah, semoga acaranya berkah dan dipenuhi ilmu yang bermanfaat.",
      createdAt: "2026-11-09T08:00:00.000Z",
    },
  ],
};
