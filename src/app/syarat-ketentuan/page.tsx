import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — Undangan.id",
  description: "Ketentuan penggunaan layanan pembuatan undangan digital Undangan.id.",
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

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 pt-14 pb-6">
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
            Legal
          </span>
          <h1 className="mt-5 text-3xl font-bold text-black sm:text-4xl">Syarat &amp; Ketentuan</h1>
          <p className="mt-3 text-sm text-black/50">Terakhir diperbarui: {LAST_UPDATED}</p>
          <p className="mt-6 text-sm leading-relaxed text-black/70">
            Dengan mengakses atau menggunakan Undangan.id ("Layanan"), Anda menyetujui syarat dan
            ketentuan berikut. Jika Anda tidak setuju dengan salah satu poin di bawah, mohon untuk
            tidak menggunakan Layanan ini.
          </p>

          <Section title="1. Tentang Layanan">
            <p>Undangan.id adalah platform yang memungkinkan siapa pun membuat undangan digital (pernikahan, khitanan, ulang tahun, wisuda, acara kantor, acara keagamaan, dan lainnya) menggunakan template yang tersedia, lalu membagikannya lewat tautan unik. Layanan tidak memerlukan pembuatan akun.</p>
          </Section>

          <Section title="2. Tanggung jawab pengguna">
            <ul className="list-disc space-y-1 pl-5">
              <li>Anda bertanggung jawab penuh atas kebenaran data yang Anda masukkan (nama, tanggal, lokasi, nomor rekening, dsb).</li>
              <li>Anda hanya boleh mengunggah foto yang Anda miliki hak untuk menggunakannya.</li>
              <li>Anda dilarang menggunakan Layanan untuk membuat undangan yang memuat konten ilegal, penipuan, ujaran kebencian, SARA yang merendahkan, pornografi, atau melanggar hak pihak lain.</li>
              <li>Anda bertanggung jawab menjaga kerahasiaan tautan edit undangan Anda — siapa pun yang memegang tautan tersebut dapat mengubah isinya.</li>
              <li>Konten buku tamu/RSVP yang ditulis oleh tamu Anda bersifat publik di tautan undangan; kami berhak menghapus ucapan yang melanggar ketentuan pada poin ini jika dilaporkan.</li>
            </ul>
          </Section>

          <Section title="3. Template, harga, dan pembayaran">
            <p>Template yang tersedia di katalog memiliki dua status:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Template premium</strong> — berbayar, dengan harga berkisar Rp30.000–Rp100.000 sekali pakai per undangan yang diaktifkan, sebagaimana tercantum pada halaman detail masing-masing template.</li>
            </ul>
            <p>Harga yang berlaku adalah harga yang tampil pada halaman template saat Anda mengaktifkan undangan. Sistem pembayaran otomatis di dalam aplikasi sedang dalam pengembangan; mekanisme pembayaran yang berlaku saat ini akan diinformasikan secara jelas pada alur "Aktifkan Undangan". Pembelian template hanya memberikan hak pakai untuk satu undangan yang diaktifkan pada slug tersebut — bukan hak kepemilikan atas kode atau desain template, dan tidak boleh dijual kembali atau didistribusikan ulang sebagai produk terpisah.</p>
          </Section>

          <Section title="4. Kebijakan pembatalan & pengembalian dana">
            <p>Karena aktivasi undangan langsung menghasilkan tautan yang dapat dibagikan, pembelian template premium bersifat final dan tidak dapat dikembalikan (non-refundable), kecuali jika terjadi kesalahan teknis yang murni dari pihak kami (misalnya undangan gagal aktif meski pembayaran berhasil). Pada kasus seperti itu, hubungi kami di email pada bagian 7 untuk penyelesaian.</p>
          </Section>

          <Section title="5. Ketersediaan layanan">
            <p>Kami berupaya menjaga Layanan tetap dapat diakses, namun tidak menjamin Layanan akan selalu bebas dari gangguan, downtime, atau kesalahan teknis. Kami tidak bertanggung jawab atas kerugian yang timbul akibat undangan tidak dapat diakses sementara karena gangguan pada penyedia hosting atau basis data pihak ketiga yang kami gunakan.</p>
          </Section>

          <Section title="6. Batasan tanggung jawab">
            <p>Layanan disediakan "sebagaimana adanya" (as is). Sejauh diizinkan oleh hukum yang berlaku, kami tidak bertanggung jawab atas kerugian tidak langsung, kehilangan data akibat kelalaian pengguna sendiri (misalnya kehilangan tautan edit), atau dampak dari kesalahan input data oleh pengguna.</p>
          </Section>

          <Section title="7. Menghubungi kami">
            <p>Untuk pertanyaan seputar Layanan, template, atau pembayaran, hubungi kami melalui email{" "}
              <span className="font-medium text-black">dinulkaafa123@gmail.com</span>.
            </p>
          </Section>

          <Section title="8. Perubahan ketentuan">
            <p>Kami dapat memperbarui Syarat &amp; Ketentuan ini sewaktu-waktu. Tanggal "Terakhir diperbarui" di atas mencerminkan revisi terbaru. Penggunaan Layanan setelah perubahan berlaku dianggap sebagai persetujuan Anda atas ketentuan yang diperbarui.</p>
          </Section>

          <p className="mt-12 text-sm text-black/50">
            Lihat juga{" "}
            <Link href="/privasi" className="font-medium text-black underline underline-offset-2">
              Kebijakan Privasi
            </Link>{" "}
            kami.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
