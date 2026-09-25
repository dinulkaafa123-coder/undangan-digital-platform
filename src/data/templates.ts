import type { EventType } from "@/types/event";

export type TemplateCategory =
  | "elegant"
  | "modern"
  | "floral"
  | "islamic"
  | "traditional"
  | "luxury"
  | "minimalist"
  | "romantic"
  | "royal"
  | "cinematic"
  | "destination"
  | "3d"
  | "4d";

export interface CategoryMeta {
  id: TemplateCategory;
  label: string;
  description: string;
}

export const categories: CategoryMeta[] = [
  { id: "royal", label: "Royal", description: "Istana & kerajaan" },
  { id: "luxury", label: "Luxury", description: "Mewah & dramatis" },
  { id: "romantic", label: "Romantic", description: "Hangat & personal" },
  { id: "floral", label: "Floral", description: "Nuansa bunga romantis" },
  { id: "modern", label: "Modern", description: "Berani & sinematik" },
  { id: "cinematic", label: "Cinematic", description: "Seperti film layar lebar" },
  { id: "islamic", label: "Islamic", description: "Nuansa islami & syar'i" },
  { id: "traditional", label: "Adat Nusantara", description: "Terinspirasi estetika budaya Indonesia" },
  { id: "destination", label: "Destination", description: "Pernikahan di destinasi impian" },
  { id: "elegant", label: "Elegant", description: "Anggun & timeless" },
  { id: "minimalist", label: "Minimalist", description: "Bersih & clean luxury" },
  { id: "3d", label: "3D", description: "Depth & animasi sinematik nyata" },
  { id: "4d", label: "4D", description: "Depth berlapis yang bergerak terus-menerus, terasa hidup" },
];

export type TemplateBadge = "new" | "best-seller" | "exclusive";

export interface TemplateMeta {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  /**
   * Jenis acara (Event Invitation Platform). Opsional & default "wedding"
   * supaya 24 template pernikahan yang sudah ada TIDAK perlu diedit satu
   * per satu -- lihat `getTemplateEventType()`.
   */
  eventType?: EventType;
  category: TemplateCategory;
  /** kategori tambahan untuk filter, kategori utama tetap `category` */
  tags: TemplateCategory[];
  description: string;
  colors: string[];
  thumbnail: string;
  isPremium: boolean;
  /** ditandai saat depth/3D (perspective, rotateX/Y, translateZ) jadi ciri khas utama template */
  isThreeD: boolean;
  /**
   * "4D" -- bukan istilah CSS/web sungguhan, ini label pemasaran untuk
   * tingkat di atas 3D: bukan cuma depth statis, tapi BEBERAPA lapisan
   * depth yang terus bergerak tanpa henti (parallax kuat, rotasi/ayunan
   * berkelanjutan di kecepatan berbeda per lapisan) -- dimensi ke-4 =
   * waktu/gerak. Selalu dipasangkan dengan `isThreeD: true` karena
   * teknik dasarnya tetap CSS 3D biasa (perspective/translateZ/rotateX),
   * cuma animasinya jauh lebih hidup & terus-menerus.
   */
  isFourD?: boolean;
  /** badge tambahan di kartu katalog -- terpisah dari badge Premium/3D/4D/Gratis yang otomatis */
  badge?: TemplateBadge;
  price: number;
}

export const templates: TemplateMeta[] = [
  {
    id: "01",
    slug: "royal-gold",
    name: "Royal Gold",
    tagline: "Nuansa kerajaan, ornamental, dan gold berlapis",
    category: "elegant",
    tags: ["elegant", "luxury"],
    description:
      "Bingkai emas 3D berlapis, crest monogram, dan tipografi serif klasik di atas ivory hangat -- terasa seperti undangan kerajaan.",
    colors: ["#8a6d1f", "#f4ecd8", "#2c2417"],
    thumbnail: "https://picsum.photos/seed/tpl-royal-gold/600/900",
    isPremium: true,
    isThreeD: false,
    badge: "best-seller",
    price: 149000,
  },
  {
    id: "02",
    slug: "white-palace",
    name: "White Palace",
    tagline: "Putih, champagne, clean luxury yang sangat elegan",
    category: "minimalist",
    tags: ["minimalist", "elegant"],
    description:
      "Ruang putih lapang dengan garis emas tipis, tipografi Italiana yang tenang, dan foto besar bergaya editorial -- mewah lewat kesederhanaan.",
    colors: ["#ffffff", "#e7d9b8", "#2f2a22"],
    thumbnail: "https://picsum.photos/seed/tpl-white-palace/600/900",
    isPremium: true,
    isThreeD: false,
    price: 79000,
  },
  {
    id: "03",
    slug: "black-diamond",
    name: "Black Diamond",
    tagline: "Hitam, gold, dramatic & cinematic",
    category: "modern",
    tags: ["modern", "luxury"],
    description:
      "Latar hitam pekat dengan facet berlian 3D, spotlight vignette, dan tipografi Cinzel yang tajam -- sinematik dan penuh drama.",
    colors: ["#050505", "#c9a24b", "#ffffff"],
    thumbnail: "https://picsum.photos/seed/tpl-black-diamond/600/900",
    isPremium: true,
    isThreeD: true,
    price: 109000,
  },
  {
    id: "04",
    slug: "secret-garden",
    name: "Secret Garden",
    tagline: "Taman rahasia dengan bunga 3D berlapis",
    category: "floral",
    tags: ["floral", "romantic"],
    description:
      "Ilustrasi bunga berlapis dengan depth, partikel kelopak melayang, dan bingkai foto organik -- seperti melangkah ke taman rahasia.",
    colors: ["#3f5a44", "#f7d9e3", "#fff7f5"],
    thumbnail: "https://picsum.photos/seed/tpl-secret-garden/600/900",
    isPremium: true,
    isThreeD: false,
    price: 129000,
  },
  {
    id: "05",
    slug: "islamic-majesty",
    name: "Islamic Majesty",
    tagline: "Ornamen geometris islami yang megah",
    category: "islamic",
    tags: ["islamic", "elegant"],
    description:
      "Mandala geometris berputar lembut, lengkungan mihrab berlapis, dan palet zamrud-emas yang agung untuk pernikahan syar'i.",
    colors: ["#0f3d2e", "#d4af37", "#f6f1e2"],
    thumbnail: "https://picsum.photos/seed/tpl-islamic-majesty/600/900",
    isPremium: true,
    isThreeD: false,
    price: 149000,
  },
  {
    id: "06",
    slug: "moonlight-romance",
    name: "Moonlight Romance",
    tagline: "Navy gelap, gold champagne, cahaya rembulan",
    category: "luxury",
    tags: ["luxury", "romantic"],
    description:
      "Langit navy dengan bintang berkelip, cahaya bulan keemasan di balik foto, dan tipografi lembut -- romantis di bawah cahaya malam.",
    colors: ["#0b1330", "#d4b483", "#f3ede0"],
    thumbnail: "https://picsum.photos/seed/tpl-moonlight-romance/600/900",
    isPremium: true,
    isThreeD: false,
    price: 99000,
  },
  {
    id: "07",
    slug: "rustic-romance",
    name: "Rustic Romance",
    tagline: "Hangat, kayu, dan depth yang natural",
    category: "romantic",
    tags: ["romantic", "floral"],
    description:
      "Tekstur kayu & kraft yang hangat, bingkai foto polaroid dengan bayangan berlapis, dan sentuhan ranting -- personal dan mengalir.",
    colors: ["#8a5a3b", "#efe6d8", "#5e6e52"],
    thumbnail: "https://picsum.photos/seed/tpl-rustic-romance/600/900",
    isPremium: true,
    isThreeD: false,
    price: 79000,
  },
  {
    id: "08",
    slug: "nusantara-heritage",
    name: "Nusantara Heritage",
    tagline: "Warisan budaya dengan sentuhan luxury modern",
    category: "traditional",
    tags: ["traditional", "luxury"],
    description:
      "Terinspirasi estetika Nusantara: siluet gapura berlapis, motif geometris terinspirasi batik (desain original), dan palet merah marun-emas dipadu tata letak modern yang tetap berkelas.",
    colors: ["#5c1a1a", "#d4af37", "#fff8ec"],
    thumbnail: "https://picsum.photos/seed/tpl-nusantara-heritage/600/900",
    isPremium: true,
    isThreeD: false,
    price: 149000,
  },
  {
    id: "09",
    slug: "diamond-palace-3d",
    name: "Diamond Palace 3D",
    tagline: "Pintu istana 3D dengan kristal berlapis",
    category: "royal",
    tags: ["royal", "luxury", "3d"],
    description:
      "Pintu istana terbuka dalam perspektif nyata, lorong bertabur kristal melayang, dan galeri bergaya museum -- kemewahan kerajaan dengan depth CSS 3D sungguhan.",
    colors: ["#f4ecd8", "#d4af6a", "#2c2417"],
    thumbnail: "https://picsum.photos/seed/tpl-diamond-palace-3d/600/900",
    isPremium: true,
    isThreeD: true,
    badge: "exclusive",
    price: 149000,
  },
  {
    id: "10",
    slug: "enchanted-forest",
    name: "Enchanted Forest",
    tagline: "Hutan ajaib berlapis dengan kunang-kunang",
    category: "floral",
    tags: ["floral", "romantic", "3d"],
    description:
      "Kamera terasa melangkah melewati dedaunan berlapis dengan parallax multi-kecepatan, kunang-kunang melayang, dan kabut lembut -- kedalaman hutan yang sesungguhnya.",
    colors: ["#1f3d2c", "#e8cb84", "#f3ede0"],
    thumbnail: "https://picsum.photos/seed/tpl-enchanted-forest/600/900",
    isPremium: true,
    isThreeD: true,
    price: 129000,
  },
  {
    id: "11",
    slug: "crystal-wedding",
    name: "Crystal Wedding",
    tagline: "Kristal modern dengan refleksi kaca",
    category: "luxury",
    tags: ["luxury", "modern", "3d"],
    description:
      "Kristal berlian yang terbentuk lalu pecah mengungkap nama pengantin, kartu acara tembus pandang berdepth, dan galeri panel kaca melayang.",
    colors: ["#eef3f7", "#c7d6de", "#9fb6c4"],
    thumbnail: "https://picsum.photos/seed/tpl-crystal-wedding/600/900",
    isPremium: true,
    isThreeD: true,
    price: 139000,
  },
  {
    id: "12",
    slug: "rose-cathedral",
    name: "Rose Cathedral",
    tagline: "Katedral Eropa dengan lengkung mawar",
    category: "romantic",
    tags: ["romantic", "luxury"],
    description:
      "Gerbang katedral raksasa, mawar berlapis di depan & belakang, serta cahaya jatuh dari jendela mawar -- arsitektur menjadi bagian dari layout itu sendiri.",
    colors: ["#5a1f2e", "#d4af6a", "#fdf4f0"],
    thumbnail: "https://picsum.photos/seed/tpl-rose-cathedral/600/900",
    isPremium: true,
    isThreeD: false,
    price: 119000,
  },
  {
    id: "13",
    slug: "golden-ballroom",
    name: "Golden Ballroom",
    tagline: "Tirai beludru & lampu kristal ballroom",
    category: "cinematic",
    tags: ["cinematic", "luxury"],
    description:
      "Tirai beludru emas terbuka ke kiri & kanan mengungkap ballroom megah, nama pasangan tampil seperti judul film pernikahan, galeri sinematik horizontal.",
    colors: ["#3a1010", "#d4af37", "#f8e9c9"],
    thumbnail: "https://picsum.photos/seed/tpl-golden-ballroom/600/900",
    isPremium: true,
    isThreeD: false,
    price: 129000,
  },
  {
    id: "14",
    slug: "celestial-love",
    name: "Celestial Love",
    tagline: "Rasi bintang membentuk kisah cinta",
    category: "romantic",
    tags: ["romantic", "3d", "cinematic"],
    description:
      "Bintang, bulan, dan inisial pasangan yang bersinar; rasi bintang perlahan membentuk garis waktu love story; hitung mundur berputar orbital.",
    colors: ["#0a1128", "#f3ede0", "#7c9fd4"],
    thumbnail: "https://picsum.photos/seed/tpl-celestial-love/600/900",
    isPremium: true,
    isThreeD: true,
    price: 129000,
  },
  {
    id: "15",
    slug: "sakura-dream",
    name: "Sakura Dream",
    tagline: "Musim semi Jepang dengan kelopak berguguran",
    category: "floral",
    tags: ["floral", "romantic"],
    description:
      "Dahan sakura berlapis, kelopak berguguran dengan depth blur, dan galeri kartu foto melayang -- suasana taman Jepang yang tenang di pagi hari.",
    colors: ["#fbe4ea", "#fff7f5", "#5a3a44"],
    thumbnail: "https://picsum.photos/seed/tpl-sakura-dream/600/900",
    isPremium: true,
    isThreeD: false,
    price: 109000,
  },
  {
    id: "16",
    slug: "ocean-pearl",
    name: "Ocean Pearl",
    tagline: "Destination wedding tepi pantai nan mewah",
    category: "destination",
    tags: ["destination", "luxury"],
    description:
      "Horizon laut, mutiara, dan pantulan matahari lembut; transisi antar-section mengalir seperti gelombang; galeri editorial tepi pantai.",
    colors: ["#f5f1ea", "#c9a24b", "#4a8399"],
    thumbnail: "https://picsum.photos/seed/tpl-ocean-pearl/600/900",
    isPremium: true,
    isThreeD: false,
    price: 119000,
  },
  {
    id: "17",
    slug: "emerald-royal",
    name: "Emerald Royal",
    tagline: "Istana zamrud dengan emas antik",
    category: "royal",
    tags: ["royal", "luxury"],
    description:
      "Pintu zamrud dengan bingkai emas ornamental, crest kerajaan, dan potret pasangan dalam bingkai lukisan istana -- deep emerald dipadu antique gold.",
    colors: ["#0d3b2e", "#d4af37", "#f6f1e2"],
    thumbnail: "https://picsum.photos/seed/tpl-emerald-royal/600/900",
    isPremium: true,
    isThreeD: false,
    price: 129000,
  },
  {
    id: "18",
    slug: "art-deco-gatsby",
    name: "Art Deco Gatsby",
    tagline: "Kemewahan tahun 1920-an yang editorial",
    category: "luxury",
    tags: ["luxury", "cinematic"],
    description:
      "Gerbang geometris art deco, tipografi editorial bergaya Gatsby, dan galeri film-strip -- hitam, emas, dan krem dengan layout yang benar-benar berbeda.",
    colors: ["#0c0c0c", "#c9a24b", "#f2ead9"],
    thumbnail: "https://picsum.photos/seed/tpl-art-deco-gatsby/600/900",
    isPremium: true,
    isThreeD: false,
    price: 129000,
  },
  {
    id: "19",
    slug: "glass-garden",
    name: "Glass Garden",
    tagline: "Botanical futuristik dengan kaca tembus pandang",
    category: "modern",
    tags: ["modern", "floral", "3d"],
    description:
      "Bunga kaca yang membuka seperti kelopak, panel transparan berlapis, dan daun melayang dengan refraksi cahaya -- tetap terasa sebagai undangan, bukan dashboard.",
    colors: ["#eef6f2", "#bfe3d0", "#2f5a44"],
    thumbnail: "https://picsum.photos/seed/tpl-glass-garden/600/900",
    isPremium: true,
    isThreeD: true,
    price: 139000,
  },
  {
    id: "20",
    slug: "royal-javanese",
    name: "Royal Javanese",
    tagline: "Gebyok & gunungan bergaya modern luxury",
    category: "traditional",
    tags: ["traditional", "royal"],
    description:
      "Terinspirasi estetika Jawa: siluet gebyok sebagai gerbang utama, motif gunungan, dan ornamen geometris bermotif batik (desain original) berpadu partikel emas modern.",
    colors: ["#5c1a1a", "#d4af37", "#fff8ec"],
    thumbnail: "https://picsum.photos/seed/tpl-royal-javanese/600/900",
    isPremium: true,
    isThreeD: false,
    price: 129000,
  },
  {
    id: "21",
    slug: "minang-royal",
    name: "Minang Royal",
    tagline: "Rumah gadang & pola songket keemasan",
    category: "traditional",
    tags: ["traditional", "royal"],
    description:
      "Terinspirasi estetika Minangkabau: siluet atap rumah gadang berlapis depth dan motif geometris bergaya songket (desain original), dipadu deep maroon yang berkelas.",
    colors: ["#4a1420", "#d4af37", "#fff6ec"],
    thumbnail: "https://picsum.photos/seed/tpl-minang-royal/600/900",
    isPremium: true,
    isThreeD: false,
    price: 129000,
  },
  {
    id: "22",
    slug: "balinese-paradise",
    name: "Balinese Paradise",
    tagline: "Gerbang belah & taman tropis destinasi Bali",
    category: "destination",
    tags: ["destination", "traditional"],
    description:
      "Candi bentar (gerbang belah) terbuka saat undangan dibuka, dedaunan tropis, kabut lembut, dan cahaya matahari -- galeri editorial resor mewah Bali.",
    colors: ["#3f4a3a", "#d4af37", "#f3ede0"],
    thumbnail: "https://picsum.photos/seed/tpl-balinese-paradise/600/900",
    isPremium: true,
    isThreeD: false,
    price: 129000,
  },
  {
    id: "23",
    slug: "arabian-nights",
    name: "Arabian Nights",
    tagline: "Istana Timur Tengah di bawah bintang",
    category: "royal",
    tags: ["royal", "islamic", "luxury"],
    description:
      "Lengkung istana berlapis (depan, tengah, latar), lampion tergantung, bintang & bulan, pola ornamental Timur Tengah -- midnight blue dipadu emas.",
    colors: ["#0d1a3a", "#d4af37", "#f3ede0"],
    thumbnail: "https://picsum.photos/seed/tpl-arabian-nights/600/900",
    isPremium: true,
    isThreeD: false,
    price: 129000,
  },
  {
    id: "24",
    slug: "vintage-cinema",
    name: "Vintage Cinema",
    tagline: "Undangan bergaya opening film klasik",
    category: "cinematic",
    tags: ["cinematic", "luxury"],
    description:
      "Dibuka seperti opening sebuah film dengan spotlight & grain sinema halus, love story dibagi per babak, galeri film-strip, dan closing ala credit title.",
    colors: ["#0a0a0a", "#c9a24b", "#f2ead9"],
    thumbnail: "https://picsum.photos/seed/tpl-vintage-cinema/600/900",
    isPremium: true,
    isThreeD: false,
    price: 129000,
  },

  // ===================== KHITANAN =====================
  {
    id: "25",
    slug: "little-sultan",
    name: "Little Sultan",
    tagline: "Istana kecil nan gagah untuk sang jagoan",
    eventType: "khitanan",
    category: "royal",
    tags: ["royal", "islamic"],
    description: "Nuansa navy-emas playful-regal dengan mahkota kecil dan gerbang istana mini -- untuk walimatul khitan yang berkesan mewah namun tetap ceria.",
    colors: ["#1a2a5c", "#d4af37", "#f4f1e6"],
    thumbnail: "https://picsum.photos/seed/tpl-little-sultan/600/900",
    isPremium: true,
    isThreeD: false,
    price: 99000,
  },
  {
    id: "26",
    slug: "little-prince",
    name: "Little Prince",
    tagline: "Dongeng lembut biru & awan",
    eventType: "khitanan",
    category: "romantic",
    tags: ["romantic"],
    description: "Nuansa biru-krem storybook dengan awan, bintang, dan tipografi bulat lembut -- untuk khitanan bernuansa dongeng yang menenangkan.",
    colors: ["#5a7ab0", "#eef4fb", "#2c3e5c"],
    thumbnail: "https://picsum.photos/seed/tpl-little-prince/600/900",
    isPremium: true,
    isThreeD: false,
    price: 79000,
  },
  {
    id: "27",
    slug: "islamic-kids",
    name: "Islamic Kids",
    tagline: "Islami, hijau-emas, dan ceria",
    eventType: "khitanan",
    category: "islamic",
    tags: ["islamic"],
    description: "Bulan-bintang playful dan lengkung masjid mini dengan palet hijau-emas -- islami namun lebih ceria dibanding template pernikahan islami.",
    colors: ["#0f5c3e", "#f5d97a", "#f3f8f0"],
    thumbnail: "https://picsum.photos/seed/tpl-islamic-kids/600/900",
    isPremium: true,
    isThreeD: false,
    price: 99000,
  },

  // ===================== BIRTHDAY =====================
  {
    id: "28",
    slug: "sweet-celebration",
    name: "Sweet Celebration",
    tagline: "Pesta pastel, balon, dan confetti",
    eventType: "birthday",
    category: "romantic",
    tags: ["romantic", "floral"],
    description: "Balon, confetti, dan bunting jadi bagian layout -- untuk ulang tahun anak/remaja bernuansa pastel yang ceria dan personal.",
    colors: ["#c9789a", "#fff8f2", "#fde9ef"],
    thumbnail: "https://picsum.photos/seed/tpl-sweet-celebration/600/900",
    isPremium: true,
    isThreeD: false,
    price: 79000,
  },
  {
    id: "29",
    slug: "birthday-luxury",
    name: "Birthday Luxury",
    tagline: "Hitam-emas untuk milestone bermakna",
    eventType: "birthday",
    category: "luxury",
    tags: ["luxury", "cinematic"],
    description: "Hitam-emas elegan dengan angka usia sebagai focal point -- untuk ulang tahun milestone dewasa (30/40/50) yang berkelas.",
    colors: ["#0a0a0a", "#c9a24b", "#f2ead9"],
    thumbnail: "https://picsum.photos/seed/tpl-birthday-luxury/600/900",
    isPremium: true,
    isThreeD: false,
    price: 129000,
  },
  {
    id: "30",
    slug: "party-pop",
    name: "Party Pop",
    tagline: "Pop-art warna berani & energik",
    eventType: "birthday",
    category: "modern",
    tags: ["modern"],
    description: "Warna blok berani, bentuk miring, dan border tebal ala komik/pop-art -- untuk ulang tahun yang seru dan penuh energi.",
    colors: ["#ff5c7a", "#ffe14d", "#5cc9ff"],
    thumbnail: "https://picsum.photos/seed/tpl-party-pop/600/900",
    isPremium: true,
    isThreeD: false,
    price: 79000,
  },

  // ===================== SEKOLAH / WISUDA =====================
  {
    id: "31",
    slug: "graduation-elegant",
    name: "Graduation Elegant",
    tagline: "Navy-emas formal dengan laurel wreath",
    eventType: "school",
    category: "elegant",
    tags: ["elegant"],
    description: "Laurel wreath & topi toga sebagai motif utama, agenda tersusun formal -- untuk wisuda/pelepasan yang khidmat dan berkelas.",
    colors: ["#0d1b3a", "#c9a24b", "#f4f1e6"],
    thumbnail: "https://picsum.photos/seed/tpl-graduation-elegant/600/900",
    isPremium: true,
    isThreeD: false,
    badge: "new",
    price: 99000,
  },
  {
    id: "32",
    slug: "academic-blue",
    name: "Academic Blue",
    tagline: "Biru-putih modern dengan agenda bernomor",
    eventType: "school",
    category: "modern",
    tags: ["modern", "minimalist"],
    description: "Tipografi sans modern, agenda dalam kartu bernomor -- untuk acara sekolah yang ingin terasa segar dan kekinian.",
    colors: ["#1c3d78", "#ffffff", "#f0f4fb"],
    thumbnail: "https://picsum.photos/seed/tpl-academic-blue/600/900",
    isPremium: true,
    isThreeD: false,
    badge: "new",
    price: 79000,
  },
  {
    id: "33",
    slug: "graduation-cinema",
    name: "Graduation Cinema",
    tagline: "Hitam-emas gaya movie premiere",
    eventType: "school",
    category: "cinematic",
    tags: ["cinematic", "luxury"],
    description: "Spotlight dramatis & galeri film-strip -- untuk wisuda yang ingin dirayakan seperti malam premiere film.",
    colors: ["#0a0a0a", "#c9a24b", "#f2ead9"],
    thumbnail: "https://picsum.photos/seed/tpl-graduation-cinema/600/900",
    isPremium: true,
    isThreeD: false,
    badge: "new",
    price: 99000,
  },

  // ===================== CORPORATE =====================
  {
    id: "34",
    slug: "corporate-black",
    name: "Corporate Black",
    tagline: "Hitam-putih profesional & minimal",
    eventType: "corporate",
    category: "modern",
    tags: ["modern", "minimalist"],
    description: "Garis grid minimal tanpa ornamen dekoratif -- untuk seminar, konferensi, atau acara korporat yang serius dan efisien.",
    colors: ["#000000", "#ffffff", "#f4f4f4"],
    thumbnail: "https://picsum.photos/seed/tpl-corporate-black/600/900",
    isPremium: true,
    isThreeD: false,
    badge: "new",
    price: 79000,
  },
  {
    id: "35",
    slug: "corporate-gold",
    name: "Corporate Gold",
    tagline: "Krem-emas untuk gathering & anniversary",
    eventType: "corporate",
    category: "luxury",
    tags: ["luxury"],
    description: "Formal & mewah dengan garis art-deco -- untuk annual gathering, company anniversary, atau grand opening yang berkelas.",
    colors: ["#3a1010", "#c9a24b", "#f8e9c9"],
    thumbnail: "https://picsum.photos/seed/tpl-corporate-gold/600/900",
    isPremium: true,
    isThreeD: false,
    badge: "new",
    price: 129000,
  },
  {
    id: "36",
    slug: "modern-business",
    name: "Modern Business",
    tagline: "Putih bersih, tipografi editorial",
    eventType: "corporate",
    category: "minimalist",
    tags: ["minimalist", "modern"],
    description: "Tanpa ornamen sama sekali, fokus penuh pada konten & agenda -- untuk workshop, seminar, dan acara bisnis modern.",
    colors: ["#ffffff", "#1a1a1a", "#7a8ba8"],
    thumbnail: "https://picsum.photos/seed/tpl-modern-business/600/900",
    isPremium: true,
    isThreeD: false,
    badge: "new",
    price: 79000,
  },

  // ===================== KEAGAMAAN =====================
  {
    id: "37",
    slug: "islamic-emerald",
    name: "Islamic Emerald",
    tagline: "Zamrud-emas, khidmat & formal",
    eventType: "religious",
    category: "islamic",
    tags: ["islamic"],
    description: "Lengkung mihrab dengan palet zamrud-emas -- untuk pengajian, tasyakuran, atau aqiqah yang ingin terasa agung dan tenang.",
    colors: ["#0f3d2e", "#d4af37", "#f6f1e2"],
    thumbnail: "https://picsum.photos/seed/tpl-islamic-emerald/600/900",
    isPremium: true,
    isThreeD: false,
    badge: "new",
    price: 99000,
  },
  {
    id: "38",
    slug: "ramadhan-gold",
    name: "Ramadhan Gold",
    tagline: "Emas hangat, lampion & bulan sabit",
    eventType: "religious",
    category: "islamic",
    tags: ["islamic", "luxury"],
    description: "Suasana malam Ramadhan dengan lampion & bulan sabit -- untuk buka bersama, tarawih, atau acara keagamaan bernuansa malam.",
    colors: ["#2a1f0a", "#d4af37", "#f5e2a8"],
    thumbnail: "https://picsum.photos/seed/tpl-ramadhan-gold/600/900",
    isPremium: true,
    isThreeD: false,
    badge: "new",
    price: 99000,
  },
  {
    id: "39",
    slug: "tabligh-akbar",
    name: "Tabligh Akbar",
    tagline: "Maroon-emas untuk panggung dakwah besar",
    eventType: "religious",
    category: "islamic",
    tags: ["islamic", "cinematic"],
    description: "Siluet mimbar & panggung penceramah sebagai fokus utama -- untuk tabligh akbar dan acara keagamaan skala besar.",
    colors: ["#3a1010", "#d4af37", "#f6ece2"],
    thumbnail: "https://picsum.photos/seed/tpl-tabligh-akbar/600/900",
    isPremium: true,
    isThreeD: false,
    badge: "new",
    price: 99000,
  },
  {
    id: "40",
    slug: "infinity-mirror",
    name: "Infinity Mirror",
    tagline: "Lorong cermin tak berujung, berlapis dan terus bergerak",
    category: "4d",
    tags: ["4d", "3d", "luxury"],
    description:
      "Potret mempelai dipantulkan berlapis-lapis menuju kedalaman tanpa akhir, tiap lapisan berputar pelan dengan kecepatan berbeda -- undangan yang benar-benar terasa hidup, bukan gambar diam.",
    colors: ["#0d0d0f", "#c9c9c9", "#d4af37"],
    thumbnail: "https://picsum.photos/seed/tpl-infinity-mirror/600/900",
    isPremium: true,
    isThreeD: true,
    isFourD: true,
    badge: "exclusive",
    price: 149000,
  },
  {
    id: "41",
    slug: "eternal-orbit",
    name: "Eternal Orbit",
    tagline: "Cincin cahaya mengorbit tanpa henti mengelilingi kalian",
    category: "4d",
    tags: ["4d", "3d", "cinematic"],
    description:
      "Tiga cincin cahaya melayang di kedalaman berbeda, masing-masing berputar dengan arah & kecepatannya sendiri mengelilingi potret mempelai -- dimensi keempat: waktu yang terus berjalan.",
    colors: ["#0a0a2e", "#e8cb84", "#9fb6c4"],
    thumbnail: "https://picsum.photos/seed/tpl-eternal-orbit/600/900",
    isPremium: true,
    isThreeD: true,
    isFourD: true,
    badge: "exclusive",
    price: 149000,
  },
  {
    id: "42",
    slug: "living-bloom",
    name: "Living Bloom",
    tagline: "Taman berlapis yang daun & kelopaknya tidak pernah diam",
    category: "4d",
    tags: ["4d", "3d", "floral"],
    description:
      "Empat lapisan dedaunan dan kelopak bergoyang di kedalamannya masing-masing sepanjang waktu, seolah taman itu benar-benar hidup di sekitar kisah cinta kalian.",
    colors: ["#4a6b52", "#e8b4c8", "#faf6ef"],
    thumbnail: "https://picsum.photos/seed/tpl-living-bloom/600/900",
    isPremium: true,
    isThreeD: true,
    isFourD: true,
    badge: "exclusive",
    price: 139000,
  },
  {
    id: "43",
    slug: "java-eternal",
    name: "Java Eternal",
    tagline: "Panggung gunungan yang bergerak, terinspirasi estetika Jawa",
    category: "4d",
    tags: ["4d", "3d", "traditional"],
    description:
      "Siluet gunungan berlapis yang bergeser perlahan tanpa henti di belakang potret mempelai, terinspirasi estetika Jawa secara umum -- desain original, bukan reproduksi pakem adat tertentu.",
    colors: ["#3a2a1a", "#d4af37", "#f5ecd8"],
    thumbnail: "https://picsum.photos/seed/tpl-java-eternal/600/900",
    isPremium: true,
    isThreeD: true,
    isFourD: true,
    badge: "exclusive",
    price: 149000,
  },
  {
    id: "44",
    slug: "sunda-eternal",
    name: "Sunda Eternal",
    tagline: "Rumpun bambu & kabut pegunungan yang tak pernah diam",
    category: "4d",
    tags: ["4d", "3d", "traditional"],
    description:
      "Rumpun bambu bergoyang berkelanjutan di balik kabut pegunungan Parahyangan, terinspirasi estetika Sunda secara umum -- desain original, bukan representasi ritual/adat tertentu.",
    colors: ["#4a6b52", "#f4f7f2", "#2c3327"],
    thumbnail: "https://picsum.photos/seed/tpl-sunda-eternal/600/900",
    isPremium: true,
    isThreeD: true,
    isFourD: true,
    badge: "exclusive",
    price: 139000,
  },
  {
    id: "45",
    slug: "batak-eternal",
    name: "Batak Eternal",
    tagline: "Pita anyaman yang mengalir tanpa henti, terinspirasi estetika Batak",
    category: "4d",
    tags: ["4d", "3d", "traditional"],
    description:
      "Motif garis anyaman geometris mengalir berlapis di kedalaman berbeda, terinspirasi tradisi menenun & estetika Batak secara umum -- pola original, bukan reproduksi kain adat tertentu.",
    colors: ["#3a1010", "#d4af37", "#faf3ee"],
    thumbnail: "https://picsum.photos/seed/tpl-batak-eternal/600/900",
    isPremium: true,
    isThreeD: true,
    isFourD: true,
    badge: "exclusive",
    price: 149000,
  },
];

/** `eventType` opsional di data lama -- fallback ke "wedding" supaya 24 template pernikahan lama tidak perlu diedit satu per satu. */
export function getTemplateEventType(template: TemplateMeta): EventType {
  return template.eventType ?? "wedding";
}

export function getTemplateBySlug(slug: string): TemplateMeta | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getTemplatesByEventType(eventType: EventType | "all"): TemplateMeta[] {
  if (eventType === "all") return templates;
  return templates.filter((t) => getTemplateEventType(t) === eventType);
}

export function getTemplatesByCategory(category: TemplateCategory | "all"): TemplateMeta[] {
  if (category === "all") return templates;
  return templates.filter((t) => t.category === category);
}
