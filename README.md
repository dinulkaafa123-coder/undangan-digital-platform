# Undangan.id — Platform Undangan Digital Pernikahan

Platform katalog & renderer undangan pernikahan digital multi-template, dibangun dengan Next.js (App Router) + TypeScript + Tailwind CSS.

## Arsitektur inti

```
templateId (slug)  ->  invitationData (satu struktur data)  ->  template renderer (komponen React)
```

- **`src/types/invitation.ts`** — kontrak `InvitationData`: nama & foto mempelai, orang tua, jadwal acara,
  lokasi & Google Maps, galeri, love story, musik, rekening, RSVP, dan ucapan. Semua template WAJIB
  membaca data dari sini — desain tidak boleh hard-code data pengantin.
- **`src/data/demo-invitation.ts`** — satu contoh `InvitationData` (Aditya & Alya) yang dipakai di semua
  demo template. Ganti isi file ini (atau sambungkan ke database/CMS) untuk membuat undangan baru; tidak
  ada template yang perlu diubah.
- **`src/data/templates.ts`** — katalog metadata template (nama, kategori, thumbnail, harga, dst).
- **`src/components/templates/*`** — satu folder per desain template. Setiap komponen menerima props
  `{ data, templateSlug, guestName }` (lihat `src/components/templates/types.ts`) dan bertanggung jawab
  penuh atas tampilannya sendiri.
- **`src/components/templates/registry.tsx`** — pusat pemetaan `slug -> komponen`. Menambah template baru
  cukup: buat folder baru + daftarkan satu baris di sini.
- **`src/components/shared/*`** — logic yang dipakai lintas template (countdown, RSVP/ucapan, galeri +
  lightbox, embed Google Maps, kartu rekening + salin nomor, toggle musik), masing-masing menerima prop
  `theme`/`className` supaya setiap template bisa mewarnainya sesuai desainnya sendiri tanpa duplikasi logic.

Saat ini ada **24 template** (lihat `src/data/templates.ts`), terbagi di 12 kategori katalog (Royal,
Luxury, Romantic, Floral, Modern, Cinematic, Islamic, Traditional, Destination, Elegant, Minimalist, dan
badge lintas-kategori **3D** untuk template yang depth CSS 3D-nya jadi ciri utama). Setiap template punya
opening/cover, komposisi section, gallery, dan gaya countdown yang berbeda satu sama lain -- lihat komentar
di bagian atas tiap `index.tsx` untuk ringkasan mekanisme openingnya.

## Menambah template baru

1. Buat folder `src/components/templates/25-nama-template/index.tsx` yang mengekspor komponen dengan
   signature `InvitationTemplateProps`.
2. Daftarkan di `src/components/templates/registry.tsx`.
3. Tambahkan entri metadata di `src/data/templates.ts` (kategori, tags, thumbnail, harga, `isThreeD`, dll).
4. Beri opening/cover yang benar-benar baru (bukan re-skin template lain) -- pakai `useInvitationCover` untuk
   state buka/tutupnya, tapi markup & animasinya ditulis khusus untuk template itu.
5. Untuk gallery & countdown, pakai komponen ber-`variant` di `src/components/shared/gallery.tsx` dan
   `src/components/shared/countdown.tsx` -- tambah variant baru di sana kalau varian yang ada belum cocok,
   supaya logic (lightbox, hitung mundur) tetap satu tempat sementara tampilannya tetap bisa berbeda total.

Template otomatis muncul di `/templates`, `/templates/[slug]`, dan bisa dirender di `/undangan/[slug]` —
tanpa mengubah halaman katalog atau struktur data.

## Halaman

- `/` — landing page platform.
- `/templates` — katalog template ala e-commerce (filter kategori + pencarian).
- `/templates/[slug]` — halaman detail/produk satu template.
- `/undangan/[slug]` — demo undangan lengkap (pakai `demoInvitation`), menerima `?to=Nama+Tamu`.
- `/buat` — halaman lanjutan setelah tombol "Pilih Template" (stub pembuatan undangan).

## Font

Semua font Google untuk 8 template dimuat lewat satu `<link rel="stylesheet">` di `app/layout.tsx`
(bukan `next/font/google` per komponen), supaya build/dev server tidak pernah gagal hanya karena koneksi
ke Google Fonts sedang lambat — unduhan font sepenuhnya ditangani browser secara asinkron dengan fallback
otomatis.

## Strategi aset (foto & ornamen)

- **Foto** (cover, hero, potret mempelai, galeri, love story) memakai placeholder dari `picsum.photos`
  dengan seed unik per gambar (lihat `src/data/demo-invitation.ts`). Ini murni pengganti sementara -- untuk
  pelanggan sungguhan, foto ini diganti dengan foto prewedding/dokumentasi milik pelanggan sendiri lewat
  form pembuatan undangan (`/buat`), jadi tidak ada isu lisensi karena tidak ada foto asli pihak ketiga yang
  dipakai di produk jadi.
- **Ornamen** (frame, crest, mandala, gapura, batik, dsb di `src/components/decorative/ornaments.tsx`)
  semuanya SVG yang digambar sendiri dari path/shape dasar -- bukan aset unduhan, sehingga bebas isu hak
  cipta dan ringan (tidak menambah request gambar).
- **Musik** memakai satu URL sample di `demo-invitation.ts` (`music.url`) yang bisa diganti pelanggan;
  pemutarannya sudah dibuat toleran kalau URL tidak bisa diakses (lihat `use-music-player.ts`).
- Kalau nanti butuh foto/ornamen premium asli (mis. ilustrasi bunga watercolor asli, motif batik/songket
  resmi berlisensi, foto arsitektur istana/katedral sungguhan untuk opening), simpan di `public/templates/
  <slug>/` per template dan referensikan dari `index.tsx` template itu -- jangan taruh di folder bersama
  supaya jelas aset itu milik template mana.

## Menjalankan

```bash
npm install
npm run dev     # development, http://localhost:3000
npm run build   # production build
npm run start   # menjalankan hasil build
npm run lint    # ESLint
```
