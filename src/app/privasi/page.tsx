import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Undangan.id",
  description:
    "Bagaimana Undangan.id mengumpulkan, menyimpan, dan melindungi data acara serta data tamu Anda.",
};

const LAST_UPDATED = "26 September 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold text-black">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-black/70">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 pt-14 pb-6">
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
            Legal
          </span>
          <h1 className="mt-5 text-3xl font-bold text-black sm:text-4xl">Kebijakan Privasi</h1>
          <p className="mt-3 text-sm text-black/50">Terakhir diperbarui: {LAST_UPDATED}</p>
          <p className="mt-6 text-sm leading-relaxed text-black/70">
            Undangan.id ("kami") menyediakan layanan pembuatan undangan digital. Halaman ini menjelaskan
            data apa saja yang kami kumpulkan saat Anda membuat, mengaktifkan, dan membagikan undangan,
            serta bagaimana data tersebut disimpan dan digunakan. Dengan menggunakan Undangan.id, Anda
            menyetujui praktik yang dijelaskan di halaman ini.
          </p>

          <Section title="1. Tidak ada akun atau login">
            <p>
              Undangan.id tidak mewajibkan Anda membuat akun, username, atau kata sandi. Setiap undangan
              yang Anda buat diidentifikasi lewat tautan unik (slug) yang dihasilkan saat Anda menekan
              "Aktifkan Undangan" — siapa pun yang memegang tautan tersebut (termasuk Anda sendiri, di
              perangkat mana pun) dapat membukanya kembali untuk mengedit lewat menu "Edit Undangan".
              Karena itu, jagalah tautan edit Anda seperti Anda menjaga kata sandi.
            </p>
          </Section>

          <Section title="2. Data yang kami kumpulkan">
            <p><strong>a. Data draf (belum aktif).</strong> Selama Anda masih mengisi form di halaman "Buat Undangan" dan belum menekan "Aktifkan Undangan", seluruh data (nama mempelai/nama acara, tanggal, lokasi, foto, dsb.) hanya tersimpan di <em>localStorage</em> peramban Anda sendiri — belum terkirim ke server kami sama sekali.</p>
            <p><strong>b. Data undangan aktif.</strong> Saat Anda menekan "Aktifkan Undangan", data acara (nama, tanggal, lokasi, deskripsi, jadwal acara, nomor rekening jika diisi, dan tautan foto) disimpan di basis data kami (dihosting oleh Supabase) agar undangan dapat diakses lewat tautan publik.</p>
            <p><strong>c. Foto yang diunggah.</strong> Foto yang Anda unggah (foto sampul, galeri) disimpan di penyimpanan cloud (Supabase Storage) dan dilayani lewat URL publik agar dapat tampil di undangan. Foto ini dapat diakses oleh siapa pun yang mengetahui atau menebak URL-nya, sama seperti foto yang Anda unggah ke media sosial publik.</p>
            <p><strong>d. Data dari tamu Anda.</strong> Fitur buku tamu/RSVP mengumpulkan nama, ucapan, dan status kehadiran yang diisi oleh tamu yang membuka undangan Anda. Data ini bersifat <strong>publik</strong> — dapat dilihat oleh siapa pun yang membuka tautan undangan tersebut, karena memang itu fungsinya (menampilkan ucapan tamu di halaman undangan).</p>
            <p><strong>e. Data teknis.</strong> Kami mencatat jumlah kunjungan (page view) per undangan secara agregat untuk ditampilkan sebagai statistik sederhana kepada pemilik undangan. Kami tidak mengumpulkan alamat IP, fingerprint perangkat, atau data pelacakan iklan pihak ketiga.</p>
          </Section>

          <Section title="3. Bagaimana kami menggunakan data">
            <p>Data yang Anda kirim digunakan semata-mata untuk: (a) menampilkan undangan Anda di tautan publiknya, (b) mengizinkan Anda mengedit kembali undangan yang sama, dan (c) menghitung statistik kunjungan. Kami tidak menjual data Anda, tidak membagikannya ke pihak ketiga untuk keperluan pemasaran, dan tidak menggunakannya untuk tujuan selain menjalankan layanan ini.</p>
          </Section>

          <Section title="4. Pihak ketiga yang membantu kami">
            <p>Kami menggunakan penyedia layanan berikut untuk menjalankan Undangan.id — masing-masing hanya memproses data sejauh diperlukan untuk fungsinya:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Supabase</strong> — basis data dan penyimpanan foto.</li>
              <li><strong>Vercel</strong> — hosting aplikasi web.</li>
              <li><strong>Google Fonts</strong> — pemuatan font pada tampilan undangan.</li>
            </ul>
            <p>Kami tidak memasang piksel iklan, Google Analytics, atau pelacak pihak ketiga lain di halaman undangan Anda.</p>
          </Section>

          <Section title="5. Cookie dan penyimpanan lokal">
            <p>Undangan.id tidak menggunakan cookie pelacakan. Kami menggunakan <em>localStorage</em> peramban untuk dua hal: menyimpan draf undangan yang belum diaktifkan, dan menyimpan preferensi tampilan sederhana (misalnya status buku tamu di perangkat Anda). Data ini tersimpan lokal di perangkat Anda dan tidak otomatis terkirim ke server kami.</p>
          </Section>

          <Section title="6. Berapa lama data disimpan">
            <p>Undangan yang sudah diaktifkan disimpan selama Anda tidak meminta penghapusan. Kami belum menyediakan fitur hapus-mandiri di dalam aplikasi; jika Anda ingin undangan atau data tamu di dalamnya dihapus permanen, silakan hubungi kami (lihat bagian 8).</p>
          </Section>

          <Section title="7. Hak Anda atas data">
            <p>Sesuai semangat UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi, Anda berhak meminta salinan, koreksi, atau penghapusan data acara maupun data tamu yang tersimpan pada undangan yang Anda buat. Karena tidak ada sistem login, kami akan meminta Anda membuktikan kepemilikan undangan (misalnya lewat tautan edit atau detail acara yang hanya diketahui pembuatnya) sebelum memproses permintaan tersebut.</p>
          </Section>

          <Section title="8. Menghubungi kami">
            <p>Untuk pertanyaan privasi, permintaan akses, atau penghapusan data, hubungi kami melalui:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Email: <span className="font-medium text-black">dinulkaafa123@gmail.com</span></li>
              <li>
                WhatsApp:{" "}
                <a href="https://wa.me/6285883449331" className="font-medium text-black underline underline-offset-2">
                  0858-8344-9331
                </a>
              </li>
            </ul>
          </Section>

          <Section title="9. Perubahan kebijakan ini">
            <p>Kami dapat memperbarui halaman ini sewaktu-waktu mengikuti perkembangan fitur Undangan.id. Tanggal "Terakhir diperbarui" di atas akan selalu mencerminkan revisi terbaru. Penggunaan layanan setelah perubahan berlaku dianggap sebagai persetujuan atas kebijakan yang diperbarui.</p>
          </Section>

          <p className="mt-12 text-sm text-black/50">
            Lihat juga{" "}
            <Link href="/syarat-ketentuan" className="font-medium text-black underline underline-offset-2">
              Syarat &amp; Ketentuan
            </Link>{" "}
            layanan kami.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
