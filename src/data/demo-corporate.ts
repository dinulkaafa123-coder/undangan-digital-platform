import type { CorporateEventData } from "@/types/event";

/** Data demo untuk acara CORPORATE, dipakai template Corporate Black, Corporate Gold, Modern Business. */
export const demoCorporate: CorporateEventData = {
  eventType: "corporate",
  title: "Annual Gathering & Company Anniversary 2026",
  companyName: "PT Cipta Nusantara Digital",
  speaker: {
    name: "Bapak Andra Wijaya",
    title: "Chief Executive Officer",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop&crop=faces&auto=format&q=80",
  },
  description:
    "Merayakan 10 tahun perjalanan PT Cipta Nusantara Digital, kami mengundang seluruh karyawan dan mitra untuk hadir dalam Annual Gathering & Company Anniversary 2026.",
  coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=1600&fit=crop&crop=faces&auto=format&q=80",
  heroImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=1400&fit=crop&crop=faces&auto=format&q=80",
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
    { id: "cg1", url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=700&h=900&fit=crop&crop=faces&auto=format&q=80" },
    { id: "cg2", url: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=900&h=700&fit=crop&crop=faces&auto=format&q=80" },
    { id: "cg3", url: "https://images.unsplash.com/photo-1561489404-42f13a2f09a2?w=700&h=900&fit=crop&crop=faces&auto=format&q=80" },
    { id: "cg4", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&h=700&fit=crop&crop=faces&auto=format&q=80" },
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
