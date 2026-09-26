-- ============================================================
-- Undangan.id -- ganti gateway pembayaran dari Tripay ke Duitku
-- ============================================================
-- Jalankan file ini SEKALI lewat Supabase Dashboard > SQL Editor > New query,
-- SETELAH 0001-0004 sudah dijalankan.
--
-- Tripay ternyata menutup pendaftaran partner baru saat proses setup.
-- Skema tabel `payments` dari 0003/0004 SUDAH generic (checkout_url,
-- pay_code, qr_url, provider_reference, payment_method -- tidak ada nama
-- kolom spesifik Tripay), jadi TIDAK ADA perubahan struktur/RPC sama
-- sekali di sini. Satu-satunya perubahan: nilai default kolom `provider`
-- diubah supaya order baru tercatat sebagai 'duitku', bukan 'tripay'.

alter table public.payments alter column provider set default 'duitku';
