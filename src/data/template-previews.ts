/**
 * ============================================================
 * DIGITAL INVITATION PREVIEW -- konfigurasi visual per template
 * ============================================================
 *
 * Ini BUKAN duplikat/pengganti renderer asli di `src/components/templates/*`.
 * Renderer asli tetap satu-satunya sumber kebenaran untuk halaman demo penuh
 * (`/undangan/[slug]`). File ini murni data ringan (warna, font, ornamen,
 * salinan teks) yang dipakai `DigitalInvitationPreview` untuk menggambar
 * ULANG cover setiap template dalam ukuran mini -- memakai token desain
 * (warna & komponen ornamen SVG) YANG SAMA dengan renderer aslinya, supaya
 * preview terasa konsisten dengan demo, tanpa harus me-mount seluruh
 * renderer (countdown/peta/RSVP/audio) 30+ kali sekaligus di halaman katalog
 * -- itu yang bikin katalog jadi berat.
 *
 * Data demo di sini SENGAJA berbeda dari `demoInvitation` dsb (Arka & Alya,
 * bukan Aditya & Alya) -- ini "produk visual" katalog, bukan data undangan
 * sungguhan; struktur `eventType/templateId/eventData` di tempat lain tidak
 * disentuh sama sekali oleh file ini.
 */

export type PreviewLayout =
  | "frame-royal"
  | "frame-heritage"
  | "frame-academic"
  | "editorial-fullbleed"
  | "cinematic-dark"
  | "botanical-garden"
  | "islamic-arch"
  | "night-sky"
  | "paper-rustic"
  | "glass-crystal"
  | "luxury-ballroom"
  | "ocean-destination"
  | "cathedral-rose"
  | "storybook-clouds"
  | "playful-party";

export type PreviewOrnament =
  | "crest"
  | "little-crown"
  | "batik-gapura"
  | "songket-rumah"
  | "laurel"
  | "diamond-facet"
  | "deco-sunburst"
  | "spotlight"
  | "grid"
  | "garden-bloom"
  | "forest-layer"
  | "sakura-branch"
  | "islamic-arch"
  | "keyhole-arch"
  | "crescent-lantern"
  | "minbar"
  | "moon"
  | "constellation"
  | "twig"
  | "glass-petal"
  | "curtain"
  | "art-deco-lines"
  | "wave-pearl"
  | "candi-bentar"
  | "cathedral"
  | "cloud"
  | "balloon"
  | "confetti";

export type PreviewParticles = "none" | "gold" | "stars" | "petals" | "confetti";

export interface PreviewConfig {
  layout: PreviewLayout;
  ornament: PreviewOrnament;
  bg: string;
  panelBg?: string;
  accent: string;
  text: string;
  subtext: string;
  displayFont: string;
  bodyFont: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  date: string;
  photoUrl: string;
  particles: PreviewParticles;
}

const WEDDING = { eyebrow: "THE WEDDING OF", title: "ARKA & ALYA", date: "12 DECEMBER 2026" };
const KHITANAN = { eyebrow: "WALIMATUL KHITAN", title: "AHMAD RIZKY", subtitle: "Putra dari Bapak Ahmad & Ibu Siti", date: "12 DECEMBER 2026" };
const BIRTHDAY = { eyebrow: "YOU'RE INVITED", title: "NAZWA'S", subtitle: "17th BIRTHDAY", date: "12 DECEMBER 2026" };

function school(schoolName: string) {
  return { eyebrow: "GRADUATION CEREMONY", title: "CLASS OF 2026", subtitle: schoolName, date: "12 DECEMBER 2026" };
}
function corporate(company: string, eyebrow = "ANNUAL GATHERING 2026") {
  return { eyebrow, title: company, date: "12 DECEMBER 2026" };
}
function religious(title: string, subtitle: string) {
  return { eyebrow: "TABLIGH AKBAR", title, subtitle, date: "12 DECEMBER 2026" };
}

export const templatePreviews: Record<string, PreviewConfig> = {
  "royal-gold": {
    layout: "frame-royal",
    ornament: "crest",
    bg: "#faf4e6",
    accent: "#a8791f",
    text: "#3a2e1a",
    subtext: "#5a4a2a",
    displayFont: "'Alex Brush', cursive",
    bodyFont: "'Playfair Display', serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-royal-gold/500/600",
    particles: "gold",
  },
  "white-palace": {
    layout: "editorial-fullbleed",
    ornament: "art-deco-lines",
    bg: "#ffffff",
    accent: "#c9a86a",
    text: "#2f2a22",
    subtext: "#6b6151",
    displayFont: "'Cormorant Garamond', serif",
    bodyFont: "'Jost', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-white-palace/500/700",
    particles: "none",
  },
  "black-diamond": {
    layout: "cinematic-dark",
    ornament: "diamond-facet",
    bg: "#050505",
    accent: "#c9a24b",
    text: "#f4ecd8",
    subtext: "#c9a24b",
    displayFont: "'Cinzel', serif",
    bodyFont: "'Montserrat', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-black-diamond/500/700",
    particles: "gold",
  },
  "secret-garden": {
    layout: "botanical-garden",
    ornament: "garden-bloom",
    bg: "#fbf8f2",
    accent: "#3f5a44",
    text: "#3a4a3c",
    subtext: "#7a4b5a",
    displayFont: "'Yesteryear', cursive",
    bodyFont: "'Quicksand', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-secret-garden/500/600",
    particles: "petals",
  },
  "islamic-majesty": {
    layout: "islamic-arch",
    ornament: "islamic-arch",
    bg: "#0f3d2e",
    accent: "#d4af37",
    text: "#f6f1e2",
    subtext: "#d4af37",
    displayFont: "'Amiri', serif",
    bodyFont: "'Poppins', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-islamic-majesty/500/600",
    particles: "gold",
  },
  "moonlight-romance": {
    layout: "night-sky",
    ornament: "moon",
    bg: "#0b1330",
    accent: "#d4b483",
    text: "#f3ede0",
    subtext: "#d4b483",
    displayFont: "'Cormorant Garamond', serif",
    bodyFont: "'Jost', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-moonlight-romance/500/600",
    particles: "stars",
  },
  "rustic-romance": {
    layout: "paper-rustic",
    ornament: "twig",
    bg: "#efe6d8",
    accent: "#8a5a3b",
    text: "#4a3b2a",
    subtext: "#6b5a45",
    displayFont: "'Caveat', cursive",
    bodyFont: "'Nunito', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-rustic-romance/500/600",
    particles: "none",
  },
  "nusantara-heritage": {
    layout: "frame-heritage",
    ornament: "batik-gapura",
    bg: "#fff8ec",
    accent: "#d4af37",
    text: "#3a1414",
    subtext: "#5a3a3a",
    displayFont: "'Playfair Display', serif",
    bodyFont: "'Lora', serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-nusantara-heritage/500/600",
    particles: "gold",
  },
  "diamond-palace-3d": {
    layout: "frame-royal",
    ornament: "crest",
    bg: "#faf4e6",
    accent: "#a8791f",
    text: "#3a2e1a",
    subtext: "#5a4a2a",
    displayFont: "'Cinzel', serif",
    bodyFont: "'Cormorant Garamond', serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-diamond-palace/500/600",
    particles: "gold",
  },
  "enchanted-forest": {
    layout: "botanical-garden",
    ornament: "forest-layer",
    bg: "#fbf8f2",
    accent: "#1f3d2c",
    text: "#1f3d2c",
    subtext: "#3f5a44",
    displayFont: "'Cormorant Garamond', serif",
    bodyFont: "'Quicksand', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-enchanted-forest/500/600",
    particles: "gold",
  },
  "crystal-wedding": {
    layout: "glass-crystal",
    ornament: "diamond-facet",
    bg: "#eef3f7",
    accent: "#9fb6c4",
    text: "#2c3e46",
    subtext: "#4a6a78",
    displayFont: "'Cormorant Garamond', serif",
    bodyFont: "'Comfortaa', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-crystal-wedding/500/600",
    particles: "none",
  },
  "rose-cathedral": {
    layout: "cathedral-rose",
    ornament: "cathedral",
    bg: "#fdf4f0",
    accent: "#d4af6a",
    text: "#3a1420",
    subtext: "#7a1f35",
    displayFont: "'Cormorant Garamond', serif",
    bodyFont: "'Lora', serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-rose-cathedral/500/600",
    particles: "none",
  },
  "golden-ballroom": {
    layout: "luxury-ballroom",
    ornament: "curtain",
    bg: "#f8e9c9",
    accent: "#d4af37",
    text: "#3a1010",
    subtext: "#8a1a1a",
    displayFont: "'Cinzel', serif",
    bodyFont: "'Poppins', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-golden-ballroom/500/600",
    particles: "gold",
  },
  "celestial-love": {
    layout: "night-sky",
    ornament: "constellation",
    bg: "#0a1128",
    accent: "#7c9fd4",
    text: "#f3ede0",
    subtext: "#7c9fd4",
    displayFont: "'Marcellus', serif",
    bodyFont: "'Tenor Sans', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-celestial-love/500/600",
    particles: "stars",
  },
  "sakura-dream": {
    layout: "botanical-garden",
    ornament: "sakura-branch",
    bg: "#fff7f5",
    accent: "#c98098",
    text: "#5a3a44",
    subtext: "#a15b71",
    displayFont: "'Cormorant Garamond', serif",
    bodyFont: "'Nunito', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-sakura-dream/500/600",
    particles: "petals",
  },
  "ocean-pearl": {
    layout: "ocean-destination",
    ornament: "wave-pearl",
    bg: "#f5f1ea",
    accent: "#4a8399",
    text: "#2c5f73",
    subtext: "#4a8399",
    displayFont: "'Tenor Sans', sans-serif",
    bodyFont: "'Jost', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-ocean-pearl/500/600",
    particles: "none",
  },
  "emerald-royal": {
    layout: "frame-royal",
    ornament: "crest",
    bg: "#f6f1e2",
    accent: "#d4af37",
    text: "#0d3b2e",
    subtext: "#1c4a3a",
    displayFont: "'Cinzel', serif",
    bodyFont: "'Lora', serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-emerald-royal/500/600",
    particles: "gold",
  },
  "art-deco-gatsby": {
    layout: "cinematic-dark",
    ornament: "deco-sunburst",
    bg: "#0c0c0c",
    accent: "#c9a24b",
    text: "#f2ead9",
    subtext: "#c9a24b",
    displayFont: "'Bodoni Moda', serif",
    bodyFont: "'Poppins', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-art-deco-gatsby/500/600",
    particles: "none",
  },
  "glass-garden": {
    layout: "glass-crystal",
    ornament: "glass-petal",
    bg: "#eef6f2",
    accent: "#2f5a44",
    text: "#1f3d2c",
    subtext: "#3f5a44",
    displayFont: "'Comfortaa', sans-serif",
    bodyFont: "'Quicksand', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-glass-garden/500/600",
    particles: "none",
  },
  "royal-javanese": {
    layout: "frame-heritage",
    ornament: "batik-gapura",
    bg: "#fff8ec",
    accent: "#d4af37",
    text: "#5c1a1a",
    subtext: "#5a3a3a",
    displayFont: "'Playfair Display', serif",
    bodyFont: "'Lora', serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-royal-javanese/500/600",
    particles: "gold",
  },
  "minang-royal": {
    layout: "frame-heritage",
    ornament: "songket-rumah",
    bg: "#fff6ec",
    accent: "#d4af37",
    text: "#4a1420",
    subtext: "#5a2a35",
    displayFont: "'Cinzel', serif",
    bodyFont: "'Lora', serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-minang-royal/500/600",
    particles: "gold",
  },
  "balinese-paradise": {
    layout: "ocean-destination",
    ornament: "candi-bentar",
    bg: "#f3ede0",
    accent: "#3f4a3a",
    text: "#2c3327",
    subtext: "#4a5540",
    displayFont: "'Italiana', serif",
    bodyFont: "'Quicksand', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-balinese-paradise/500/600",
    particles: "none",
  },
  "arabian-nights": {
    layout: "islamic-arch",
    ornament: "keyhole-arch",
    bg: "#0d1a3a",
    accent: "#d4af37",
    text: "#f3ede0",
    subtext: "#d4af37",
    displayFont: "'Amiri', serif",
    bodyFont: "'Montserrat', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-arabian-nights/500/600",
    particles: "stars",
  },
  "vintage-cinema": {
    layout: "cinematic-dark",
    ornament: "spotlight",
    bg: "#0a0a0a",
    accent: "#c9a24b",
    text: "#e9e2d0",
    subtext: "#c9a24b",
    displayFont: "'Bodoni Moda', serif",
    bodyFont: "'Montserrat', sans-serif",
    ...WEDDING,
    photoUrl: "https://picsum.photos/seed/prev-vintage-cinema/500/600",
    particles: "none",
  },

  "little-sultan": {
    layout: "frame-royal",
    ornament: "little-crown",
    bg: "#f4f1e6",
    accent: "#d4af37",
    text: "#1a2a5c",
    subtext: "#4a5a8a",
    displayFont: "'Cinzel', serif",
    bodyFont: "'Poppins', sans-serif",
    ...KHITANAN,
    photoUrl: "https://picsum.photos/seed/prev-little-sultan/500/600",
    particles: "gold",
  },
  "little-prince": {
    layout: "storybook-clouds",
    ornament: "cloud",
    bg: "#eef4fb",
    accent: "#5a7ab0",
    text: "#2c3e5c",
    subtext: "#5a7ab0",
    displayFont: "'Comfortaa', sans-serif",
    bodyFont: "'Nunito', sans-serif",
    ...KHITANAN,
    photoUrl: "https://picsum.photos/seed/prev-little-prince/500/600",
    particles: "stars",
  },
  "islamic-kids": {
    layout: "islamic-arch",
    ornament: "crescent-lantern",
    bg: "#f3f8f0",
    accent: "#f5d97a",
    text: "#0f5c3e",
    subtext: "#4a5c50",
    displayFont: "'Amiri', serif",
    bodyFont: "'Quicksand', sans-serif",
    ...KHITANAN,
    photoUrl: "https://picsum.photos/seed/prev-islamic-kids/500/600",
    particles: "gold",
  },

  "sweet-celebration": {
    layout: "playful-party",
    ornament: "balloon",
    bg: "#fff8f2",
    accent: "#c9789a",
    text: "#5a3a44",
    subtext: "#8a5a6a",
    displayFont: "'Caveat', cursive",
    bodyFont: "'Quicksand', sans-serif",
    ...BIRTHDAY,
    photoUrl: "https://picsum.photos/seed/prev-sweet-celebration/500/600",
    particles: "confetti",
  },
  "birthday-luxury": {
    layout: "cinematic-dark",
    ornament: "art-deco-lines",
    bg: "#0a0a0a",
    accent: "#c9a24b",
    text: "#e9e2d0",
    subtext: "#c9a24b",
    displayFont: "'Cinzel', serif",
    bodyFont: "'Montserrat', sans-serif",
    ...BIRTHDAY,
    photoUrl: "https://picsum.photos/seed/prev-birthday-luxury/500/600",
    particles: "gold",
  },
  "party-pop": {
    layout: "playful-party",
    ornament: "confetti",
    bg: "#fff3d6",
    accent: "#ff5c7a",
    text: "#1a1a1a",
    subtext: "#ff5c7a",
    displayFont: "'Poppins', sans-serif",
    bodyFont: "'Nunito', sans-serif",
    ...BIRTHDAY,
    photoUrl: "https://picsum.photos/seed/prev-party-pop/500/600",
    particles: "confetti",
  },

  "graduation-elegant": {
    layout: "frame-academic",
    ornament: "laurel",
    bg: "#f4f1e6",
    accent: "#c9a24b",
    text: "#0d1b3a",
    subtext: "#3a4a6a",
    displayFont: "'Playfair Display', serif",
    bodyFont: "'Lora', serif",
    ...school("SMA Negeri 1 Harapan Bangsa"),
    photoUrl: "https://picsum.photos/seed/prev-graduation-elegant/500/600",
    particles: "gold",
  },
  "academic-blue": {
    layout: "editorial-fullbleed",
    ornament: "grid",
    bg: "#ffffff",
    accent: "#1c3d78",
    text: "#0d1b3a",
    subtext: "#3a4a6a",
    displayFont: "'Poppins', sans-serif",
    bodyFont: "'Jost', sans-serif",
    ...school("SMA Negeri 1 Harapan Bangsa"),
    photoUrl: "https://picsum.photos/seed/prev-academic-blue/500/600",
    particles: "none",
  },
  "graduation-cinema": {
    layout: "cinematic-dark",
    ornament: "spotlight",
    bg: "#0a0a0a",
    accent: "#c9a24b",
    text: "#e9e2d0",
    subtext: "#c9a24b",
    displayFont: "'Bodoni Moda', serif",
    bodyFont: "'Montserrat', sans-serif",
    ...school("SMA Negeri 1 Harapan Bangsa"),
    photoUrl: "https://picsum.photos/seed/prev-graduation-cinema/500/600",
    particles: "none",
  },

  "corporate-black": {
    layout: "cinematic-dark",
    ornament: "grid",
    bg: "#000000",
    accent: "#ffffff",
    text: "#ffffff",
    subtext: "#a0a0a0",
    displayFont: "'Montserrat', sans-serif",
    bodyFont: "'Jost', sans-serif",
    ...corporate("PT CIPTA NUSANTARA DIGITAL"),
    photoUrl: "https://picsum.photos/seed/prev-corporate-black/500/600",
    particles: "none",
  },
  "corporate-gold": {
    layout: "luxury-ballroom",
    ornament: "art-deco-lines",
    bg: "#f8e9c9",
    accent: "#c9a24b",
    text: "#3a1010",
    subtext: "#8a1a1a",
    displayFont: "'Cinzel', serif",
    bodyFont: "'Montserrat', sans-serif",
    ...corporate("PT CIPTA NUSANTARA DIGITAL"),
    photoUrl: "https://picsum.photos/seed/prev-corporate-gold/500/600",
    particles: "gold",
  },
  "modern-business": {
    layout: "editorial-fullbleed",
    ornament: "grid",
    bg: "#ffffff",
    accent: "#7a8ba8",
    text: "#1a1a1a",
    subtext: "#5a6a8a",
    displayFont: "'Tenor Sans', sans-serif",
    bodyFont: "'Jost', sans-serif",
    ...corporate("PT CIPTA NUSANTARA DIGITAL"),
    photoUrl: "https://picsum.photos/seed/prev-modern-business/500/600",
    particles: "none",
  },

  "islamic-emerald": {
    layout: "islamic-arch",
    ornament: "islamic-arch",
    bg: "#f6f1e2",
    accent: "#d4af37",
    text: "#0f3d2e",
    subtext: "#4a5c50",
    displayFont: "'Amiri', serif",
    bodyFont: "'Lora', serif",
    ...religious("PENGAJIAN AKBAR", "Meraih Keberkahan dalam Kehidupan"),
    photoUrl: "https://picsum.photos/seed/prev-islamic-emerald/500/600",
    particles: "gold",
  },
  "ramadhan-gold": {
    layout: "islamic-arch",
    ornament: "crescent-lantern",
    bg: "#2a1f0a",
    accent: "#d4af37",
    text: "#f5e2a8",
    subtext: "#d4af37",
    displayFont: "'Amiri', serif",
    bodyFont: "'Quicksand', sans-serif",
    ...religious("RAMADHAN KAREEM", "Menyambut Bulan Penuh Berkah"),
    photoUrl: "https://picsum.photos/seed/prev-ramadhan-gold/500/600",
    particles: "gold",
  },
  "tabligh-akbar": {
    layout: "islamic-arch",
    ornament: "minbar",
    bg: "#3a1010",
    accent: "#d4af37",
    text: "#f6ece2",
    subtext: "#d4af37",
    displayFont: "'Amiri', serif",
    bodyFont: "'Montserrat', sans-serif",
    ...religious("TABLIGH AKBAR", "Menjaga Hati, Menjaga Iman"),
    photoUrl: "https://picsum.photos/seed/prev-tabligh-akbar/500/600",
    particles: "gold",
  },
};

/** Fallback aman jika suatu slug belum sempat didaftarkan di atas -- supaya katalog tidak pernah menampilkan preview kosong/rusak. */
const FALLBACK_PREVIEW: PreviewConfig = {
  layout: "editorial-fullbleed",
  ornament: "crest",
  bg: "#111111",
  accent: "#d4af37",
  text: "#f5f0e6",
  subtext: "#c9c2b4",
  displayFont: "'Playfair Display', serif",
  bodyFont: "'Jost', sans-serif",
  ...WEDDING,
  photoUrl: "https://picsum.photos/seed/prev-fallback/500/600",
  particles: "none",
};

export function getTemplatePreview(slug: string): PreviewConfig {
  return templatePreviews[slug] ?? FALLBACK_PREVIEW;
}
