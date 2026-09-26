-- ============================================================
-- Undangan.id -- ganti gateway pembayaran dari Midtrans ke Tripay
-- ============================================================
-- Jalankan file ini SEKALI lewat Supabase Dashboard > SQL Editor > New query,
-- SETELAH 0001, 0002, dan 0003 sudah dijalankan.
--
-- Tabel `payments`, RPC `get_payment_status`, dan RPC `create_invitation`
-- dari 0003 TIDAK BERUBAH sama sekali -- keduanya sudah gateway-agnostic
-- (cuma peduli kolom `status` = 'settlement', tidak peduli gateway mana
-- yang menuliskannya). Migration ini HANYA menambah kolom info provider
-- (untuk dukungan/debugging) dan mengganti ulang `create_payment_order`
-- supaya bisa menyimpan info tambahan dari Tripay (checkout_url, pay_code,
-- qr_url, nomor referensi Tripay, metode yang dipilih pembeli).

alter table public.payments add column if not exists provider text not null default 'tripay';
alter table public.payments add column if not exists payment_method text;
alter table public.payments add column if not exists checkout_url text;
alter table public.payments add column if not exists pay_code text;
alter table public.payments add column if not exists qr_url text;
alter table public.payments add column if not exists provider_reference text;

drop function if exists public.create_payment_order(text, text, integer);

create or replace function public.create_payment_order(
  p_order_id text,
  p_template_id text,
  p_amount integer,
  p_payment_method text default null,
  p_checkout_url text default null,
  p_pay_code text default null,
  p_qr_url text default null,
  p_provider_reference text default null
)
returns public.payments
language sql
security definer
set search_path = public
as $$
  insert into public.payments (order_id, template_id, amount, payment_method, checkout_url, pay_code, qr_url, provider_reference)
  values (p_order_id, p_template_id, p_amount, p_payment_method, p_checkout_url, p_pay_code, p_qr_url, p_provider_reference)
  returning *;
$$;

revoke all on function public.create_payment_order(text, text, integer, text, text, text, text, text) from public;
grant execute on function public.create_payment_order(text, text, integer, text, text, text, text, text) to anon, authenticated;
