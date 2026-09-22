import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Undangan.id — Undangan Digital untuk Setiap Momen",
  description:
    "Buat undangan digital elegan untuk pernikahan, ulang tahun, khitanan, sekolah, kantor, dan berbagai acara lainnya. 30+ template premium, cinematic, dan siap dibagikan dalam hitungan menit.",
};

// Semua font Google yang dipakai 8 template dimuat lewat satu stylesheet di
// <head>, bukan lewat next/font/google per komponen. Ini membuat build/dev
// server tidak pernah gagal hanya karena koneksi ke Google Fonts sedang
// lambat/terputus -- browser yang menangani unduhan (dan fallback-nya)
// sendiri secara asinkron, tanpa bisa membuat halaman error 500. Untuk
// alasan yang sama, halaman non-template (landing, katalog) memakai font
// sistem bawaan (lihat globals.css) alih-alih next/font/google.
const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?" +
  [
    "family=Playfair+Display:wght@500;600;700",
    "family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500;1,600",
    "family=Alex+Brush",
    "family=Italiana",
    "family=Jost:wght@300;400;500",
    "family=Poppins:wght@300;400;500;600;700",
    "family=Marcellus",
    "family=Yesteryear",
    "family=Quicksand:wght@400;500;600",
    "family=Amiri:wght@400;700",
    "family=Cinzel:wght@500;600;700",
    "family=Montserrat:wght@300;400;500",
    "family=Abril+Fatface",
    "family=Caveat:wght@500;700",
    "family=Nunito:wght@400;600;700",
    "family=Lora:wght@400;500;600",
    "family=Bodoni+Moda:wght@500;600;700",
    "family=Tenor+Sans",
    "family=Comfortaa:wght@400;500;700",
    "display=swap",
  ].join("&");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
      </head>
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
