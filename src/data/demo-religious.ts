import type { ReligiousEventData } from "@/types/event";

/** Data demo untuk acara KEAGAMAAN, dipakai template Islamic Emerald, Ramadhan Gold, Tabligh Akbar. */
export const demoReligious: ReligiousEventData = {
  eventType: "religious",
  title: "Tabligh Akbar Menyambut Tahun Baru Hijriah",
  hostName: "Masjid Agung Al-Ikhlas",
  speaker: {
    name: "Ustadz H. Ahmad Fauzi, Lc.",
    title: "Pendakwah & Pengasuh Majelis Taklim Nurul Hidayah",
    photoUrl: "https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?w=500&h=500&fit=crop&crop=faces&auto=format&q=80",
  },
  description:
    "Marilah bersama-sama meraih keberkahan dalam kehidupan dengan menghadiri Tabligh Akbar dalam rangka menyambut Tahun Baru Hijriah, bersama Ustadz H. Ahmad Fauzi, Lc.",
  coverImage: "https://images.unsplash.com/photo-1606981693736-62d6c4954ba5?w=900&h=1600&fit=crop&auto=format&q=80",
  heroImage: "https://images.unsplash.com/photo-1540567736792-f78f6242e4e0?w=1200&h=1400&fit=crop&auto=format&q=80",
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
    { id: "rg1", url: "https://images.unsplash.com/photo-1670514862391-df20ad00b330?w=700&h=900&fit=crop&auto=format&q=80" },
    { id: "rg2", url: "https://images.unsplash.com/photo-1681073126033-8d89682e10be?w=900&h=700&fit=crop&auto=format&q=80" },
    { id: "rg3", url: "https://images.unsplash.com/photo-1569924259120-22d9307489cf?w=700&h=900&fit=crop&auto=format&q=80" },
    { id: "rg4", url: "https://images.unsplash.com/photo-1606981693736-62d6c4954ba5?w=700&h=700&fit=crop&auto=format&q=80" },
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
