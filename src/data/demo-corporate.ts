import type { CorporateEventData } from "@/types/event";

/** Data demo untuk acara CORPORATE, dipakai template Corporate Black, Corporate Gold, Modern Business. */
export const demoCorporate: CorporateEventData = {
  eventType: "corporate",
  title: "Annual Gathering & Company Anniversary 2026",
  companyName: "PT Cipta Nusantara Digital",
  speaker: {
    name: "Bapak Andra Wijaya",
    title: "Chief Executive Officer",
    photoUrl: "https://picsum.photos/seed/corporate-speaker/500/500",
  },
  description:
    "Merayakan 10 tahun perjalanan PT Cipta Nusantara Digital, kami mengundang seluruh karyawan dan mitra untuk hadir dalam Annual Gathering & Company Anniversary 2026.",
  coverImage: "https://picsum.photos/seed/corporate-cover/900/1600",
  heroImage: "https://picsum.photos/seed/corporate-hero/1200/1400",
  agenda: [
    { id: "c1", time: "09.00 - 09.30", activity: "Registrasi & Welcome Coffee" },
    { id: "c2", time: "09.30 - 10.00", activity: "Sambutan Direktur Utama" },
    { id: "c3", time: "10.00 - 11.30", activity: "Company Milestone & Awarding Night Preview" },
    { id: "c4", time: "11.30 - 13.00", activity: "Networking Session & Makan Siang" },
    { id: "c5", time: "13.00 - 15.00", activity: "Gala Dinner & Hiburan" },
  ],
  schedule: {
    id: "corporate-event",
    name: "Annual Gathering 2026",
    date: "2026-12-12",
    startTime: "09:00",
    endTime: "16:00",
    venueName: "Ballroom Hotel Mulia",
    address: "Jl. Asia Afrika No. 8, Jakarta Selatan, DKI Jakarta",
    mapsUrl: "https://maps.google.com/?q=Jakarta+Selatan",
    mapsEmbedSrc: "https://www.google.com/maps?q=Jakarta+Selatan&output=embed",
  },
  contactPerson: { name: "Divisi HR & GA", phone: "0812-3456-7890" },
  gallery: [
    { id: "cg1", url: "https://picsum.photos/seed/corp-1/700/900" },
    { id: "cg2", url: "https://picsum.photos/seed/corp-2/900/700" },
    { id: "cg3", url: "https://picsum.photos/seed/corp-3/700/900" },
    { id: "cg4", url: "https://picsum.photos/seed/corp-4/700/700" },
  ],
  music: {
    title: "Corporate Ambient",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e70c5be0.mp3",
  },
  bankAccounts: [],
  rsvpEnabled: true,
  wishes: [
    {
      id: "cw-1",
      name: "Divisi Marketing",
      attendance: "hadir",
      message: "Selamat ulang tahun perusahaan yang ke-10! Sukses terus untuk PT Cipta Nusantara Digital.",
      createdAt: "2026-11-08T08:00:00.000Z",
    },
  ],
};
