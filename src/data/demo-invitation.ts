import type { InvitationData } from "@/types/invitation";

/**
 * Data undangan demo yang dipakai semua template di katalog.
 * Ganti isi objek ini (atau ambil dari database/CMS nantinya) untuk
 * membuat undangan baru -- desain template TIDAK perlu diubah sama sekali.
 */
export const demoInvitation: InvitationData = {
  eventType: "wedding",
  metaTitle: "Undangan Pernikahan Aditya & Alya",
  groom: {
    fullName: "Aditya Pratama, S.T.",
    nickname: "Aditya",
    childOrder: "Putra pertama dari",
    parents: {
      father: "Bapak Hendra Wijaya",
      mother: "Ibu Siti Rahayu",
    },
    photoUrl: "https://images.unsplash.com/photo-1606216769783-a7dbe227a17f?w=600&h=800&fit=crop&crop=faces&auto=format&q=80",
    instagram: "@aditya.pratama",
  },
  bride: {
    fullName: "Alya Maharani, S.Psi.",
    nickname: "Alya",
    childOrder: "Putri kedua dari",
    parents: {
      father: "Bapak Budi Santoso",
      mother: "Ibu Ratna Kusuma",
    },
    photoUrl: "https://images.unsplash.com/photo-1532454781337-fc3edff34f91?w=600&h=800&fit=crop&crop=faces&auto=format&q=80",
    instagram: "@alya.maharani",
  },
  quote: {
    text:
      "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },
  coverPhotoUrl: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=900&h=1600&fit=crop&crop=faces&auto=format&q=80",
  heroPhotoUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&h=1400&fit=crop&crop=faces&auto=format&q=80",
  events: [
    {
      id: "akad",
      name: "Akad Nikah",
      date: "2026-12-20",
      startTime: "08:00",
      endTime: "10:00",
      venueName: "Kediaman Mempelai Wanita",
      address: "Jl. Kenanga Raya No. 12, Menteng, Jakarta Pusat, DKI Jakarta",
      mapsUrl: "https://maps.google.com/?q=Jakarta+Pusat",
      mapsEmbedSrc:
        "https://www.google.com/maps?q=Jakarta+Pusat&output=embed",
    },
    {
      id: "resepsi",
      name: "Resepsi Pernikahan",
      date: "2026-12-20",
      startTime: "11:00",
      endTime: "14:00",
      venueName: "Grand Ballroom, The Kensington Hotel",
      address: "Jl. Sudirman Kav. 45, Jakarta Selatan, DKI Jakarta",
      mapsUrl: "https://maps.google.com/?q=Jakarta+Selatan",
      mapsEmbedSrc:
        "https://www.google.com/maps?q=Jakarta+Selatan&output=embed",
    },
  ],
  loveStory: [
    {
      id: "story-1",
      date: "Januari 2019",
      title: "Pertama Bertemu",
      description:
        "Kami dipertemukan pertama kali di sebuah acara kampus. Obrolan singkat waktu itu ternyata jadi awal dari cerita panjang kami berdua.",
      photoUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop&crop=faces&auto=format&q=80",
    },
    {
      id: "story-2",
      date: "Agustus 2020",
      title: "Menjalin Hubungan",
      description:
        "Setelah beberapa bulan dekat dan saling mengenal, Aditya memberanikan diri untuk mengajak Alya menjalin hubungan yang lebih serius.",
      photoUrl: "https://images.unsplash.com/photo-1606216794079-73f85bbd57d5?w=800&h=800&fit=crop&crop=faces&auto=format&q=80",
    },
    {
      id: "story-3",
      date: "Maret 2025",
      title: "Lamaran",
      description:
        "Di depan keluarga besar kedua belah pihak, Aditya resmi melamar Alya. Air mata bahagia mewarnai momen sakral tersebut.",
      photoUrl: "https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?w=800&h=800&fit=crop&crop=faces&auto=format&q=80",
    },
    {
      id: "story-4",
      date: "20 Desember 2026",
      title: "Hari Bahagia",
      description:
        "Dengan restu kedua orang tua, kami memutuskan untuk melanjutkan hubungan ini ke jenjang pernikahan yang InsyaAllah penuh berkah.",
      photoUrl: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&h=800&fit=crop&crop=faces&auto=format&q=80",
    },
  ],
  gallery: [
    { id: "g1", url: "https://images.unsplash.com/photo-1621801306185-8c0ccf9c8eb8?w=700&h=900&fit=crop&crop=faces&auto=format&q=80" },
    { id: "g2", url: "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=900&h=700&fit=crop&crop=faces&auto=format&q=80" },
    { id: "g3", url: "https://images.unsplash.com/photo-1563808599481-34a342e44508?w=700&h=900&fit=crop&crop=faces&auto=format&q=80" },
    { id: "g4", url: "https://images.unsplash.com/photo-1599462616558-2b75fd26a283?w=700&h=700&fit=crop&crop=faces&auto=format&q=80" },
    { id: "g5", url: "https://images.unsplash.com/photo-1607357910286-1ff94ac13c24?w=900&h=700&fit=crop&crop=faces&auto=format&q=80" },
    { id: "g6", url: "https://images.unsplash.com/photo-1606216836537-eea72a939072?w=700&h=900&fit=crop&crop=faces&auto=format&q=80" },
  ],
  music: {
    title: "A Thousand Years",
    artist: "Christina Perri (instrumental cover)",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e70c5be0.mp3",
  },
  bankAccounts: [
    {
      id: "bca",
      bankName: "BCA",
      accountNumber: "1234567890",
      accountHolder: "Aditya Pratama",
    },
    {
      id: "mandiri",
      bankName: "Mandiri",
      accountNumber: "0987654321",
      accountHolder: "Alya Maharani",
    },
  ],
  rsvpEnabled: true,
  wishes: [
    {
      id: "wish-1",
      name: "Budi & Keluarga",
      attendance: "hadir",
      message: "Selamat menempuh hidup baru Aditya & Alya! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
      createdAt: "2026-11-01T08:00:00.000Z",
    },
    {
      id: "wish-2",
      name: "Sarah Amelia",
      attendance: "hadir",
      message: "Bahagia banget lihat kalian sampai di titik ini. Happy wedding, semoga langgeng sampai kakek nenek!",
      createdAt: "2026-11-03T10:30:00.000Z",
    },
    {
      id: "wish-3",
      name: "Rian Hidayat",
      attendance: "tidak_hadir",
      message: "Maaf ga bisa hadir karena ada acara di luar kota. Selamat menikah, semoga sakinah mawaddah warahmah ya!",
      createdAt: "2026-11-05T14:15:00.000Z",
    },
  ],
};
