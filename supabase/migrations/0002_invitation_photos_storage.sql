-- ============================================================
-- Undangan.id -- Supabase Storage untuk foto undangan
-- ============================================================
-- Jalankan file ini SEKALI lewat Supabase Dashboard > SQL Editor > New
-- query (sama seperti 0001_invitations.sql). Bucket storage BISA dibuat
-- lewat SQL biasa (insert ke storage.buckets), jadi tidak perlu klik
-- apa pun lagi di halaman Storage setelah ini dijalankan.
--
-- Kenapa perlu ini: sebelumnya foto upload disimpan sebagai base64
-- langsung di kolom event_data (JSONB) -- praktis di awal, tapi boros
-- ruang & lambat kalau banyak user upload foto besar. Sekarang foto
-- disimpan sebagai file asli di Storage, dan event_data cuma menyimpan
-- URL publiknya (string pendek), persis seperti field foto lain
-- (picsum.photos dsb) yang sudah dipakai template sejak awal.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'invitation-photos',
  'invitation-photos',
  true, -- publik: foto undangan memang harus bisa dilihat siapa pun yang buka linknya
  5242880, -- 5MB per file, sudah lebih dari cukup karena foto dikompres di browser dulu sebelum upload
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

-- ------------------------------------------------------------
-- RLS pada storage.objects, khusus bucket ini.
-- ------------------------------------------------------------
-- Baca: publik (siapa pun boleh melihat foto -- memang tujuannya).
drop policy if exists "Public can view invitation photos" on storage.objects;
create policy "Public can view invitation photos"
on storage.objects for select
using (bucket_id = 'invitation-photos');

-- Upload: siapa pun boleh upload (tidak ada sistem login/akun di app
-- ini, sama seperti create_invitation yang juga terbuka untuk anon).
drop policy if exists "Anyone can upload invitation photos" on storage.objects;
create policy "Anyone can upload invitation photos"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'invitation-photos');

-- Sengaja TIDAK ada policy update/delete untuk anon -- supaya orang
-- tidak bisa menghapus/menimpa foto yang sudah diupload orang lain.
-- Kalau user mengganti foto di editor, aplikasi upload file BARU
-- (bukan menimpa), file lama jadi tidak terpakai tapi tetap aman.
