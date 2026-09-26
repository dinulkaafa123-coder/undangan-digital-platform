-- ============================================================
-- Undangan.id -- pembayaran (Midtrans Snap) untuk template premium
-- ============================================================
-- Jalankan file ini SEKALI lewat Supabase Dashboard > SQL Editor > New query,
-- SETELAH 0001_invitations.sql dan 0002_invitation_photos_storage.sql.
--
-- Alur singkat:
--   1. Server (Next.js API route) membuat order pembayaran lewat
--      create_payment_order() -- status awal 'pending'.
--   2. Server minta Snap token ke Midtrans, dikembalikan ke browser.
--   3. Browser membuka popup Snap; setelah pengunjung membayar, Midtrans
--      mengirim notifikasi server-to-server ke /api/payments/notification.
--   4. Route webhook itu MEMVERIFIKASI signature dari Midtrans, lalu
--      menulis status 'settlement' langsung ke tabel ini memakai
--      SUPABASE_SERVICE_ROLE_KEY (lihat catatan keamanan di bawah).
--   5. Browser memanggil create_invitation() dengan p_order_id -- fungsi
--      ini menolak membuat undangan kalau order belum 'settlement', sudah
--      dipakai, atau template_id tidak cocok. Jadi endpoint create_invitation
--      TETAP tidak bisa dipakai gratis meski dipanggil langsung lewat REST.

create table if not exists public.payments (
  order_id text primary key,
  template_id text not null,
  amount integer not null,
  status text not null default 'pending' check (status in ('pending', 'settlement', 'expired', 'failed', 'cancelled')),
  invitation_slug text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payments_status_idx on public.payments (status);

drop trigger if exists payments_set_updated_at on public.payments;
create trigger payments_set_updated_at
  before update on public.payments
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security -- sama seperti `invitations`: TIDAK ADA policy
-- select/insert/update langsung untuk anon/authenticated. Satu-satunya
-- jalur baca/tulis publik adalah RPC di bawah, dan satu-satunya jalur yang
-- boleh menandai 'settlement' adalah service_role dari webhook (RLS tidak
-- berlaku untuk service_role, tapi service_role TIDAK PERNAH dipakai di
-- kode yang berjalan di browser -- hanya di route.ts server-only yang
-- memverifikasi signature Midtrans dulu).
-- ------------------------------------------------------------
alter table public.payments enable row level security;

-- ------------------------------------------------------------
-- RPC: buat order pembayaran baru (status 'pending'). Dipanggil dari
-- /api/payments/create-transaction (server-side), dengan p_amount yang
-- SELALU dihitung dari harga template asli (data/templates.ts), bukan
-- dari input pengguna -- jadi tidak bisa dimanipulasi jadi lebih murah.
-- ------------------------------------------------------------
create or replace function public.create_payment_order(p_order_id text, p_template_id text, p_amount integer)
returns public.payments
language sql
security definer
set search_path = public
as $$
  insert into public.payments (order_id, template_id, amount)
  values (p_order_id, p_template_id, p_amount)
  returning *;
$$;

revoke all on function public.create_payment_order(text, text, integer) from public;
grant execute on function public.create_payment_order(text, text, integer) to anon, authenticated;

-- ------------------------------------------------------------
-- RPC: cek status SATU order (dipakai browser untuk polling saat metode
-- bayar async seperti transfer VA, sebelum settlement masuk).
-- ------------------------------------------------------------
create or replace function public.get_payment_status(p_order_id text)
returns public.payments
language sql
security definer
set search_path = public
stable
as $$
  select * from public.payments where order_id = p_order_id limit 1;
$$;

revoke all on function public.get_payment_status(text) from public;
grant execute on function public.get_payment_status(text) to anon, authenticated;

-- ------------------------------------------------------------
-- create_invitation diganti total: sekarang WAJIB menyertakan p_order_id
-- yang sudah 'settlement', belum pernah dipakai, dan template_id-nya
-- cocok dengan yang mau diaktifkan. Dikunci pakai `for update` supaya
-- satu order tidak bisa dipakai dua kali sekaligus (race condition).
-- ------------------------------------------------------------
drop function if exists public.create_invitation(text, text, text, jsonb);

create or replace function public.create_invitation(
  p_base_slug text,
  p_event_type text,
  p_template_id text,
  p_event_data jsonb,
  p_order_id text
)
returns public.invitations
language plpgsql
security definer
set search_path = public
as $$
declare
  v_slug text := p_base_slug;
  v_suffix int := 1;
  v_row public.invitations;
  v_payment public.payments;
begin
  select * into v_payment from public.payments where order_id = p_order_id for update;

  if v_payment.order_id is null then
    raise exception 'payment_not_found';
  end if;
  if v_payment.status <> 'settlement' then
    raise exception 'payment_not_settled';
  end if;
  if v_payment.template_id <> p_template_id then
    raise exception 'payment_template_mismatch';
  end if;
  if v_payment.invitation_slug is not null then
    raise exception 'payment_already_used';
  end if;

  loop
    begin
      insert into public.invitations (slug, event_type, template_id, event_data, status, published_at)
      values (v_slug, p_event_type, p_template_id, p_event_data, 'active', now())
      returning * into v_row;
      exit;
    exception when unique_violation then
      v_suffix := v_suffix + 1;
      v_slug := p_base_slug || '-' || v_suffix;
    end;
  end loop;

  update public.payments set invitation_slug = v_row.slug where order_id = p_order_id;

  return v_row;
end;
$$;

revoke all on function public.create_invitation(text, text, text, jsonb, text) from public;
grant execute on function public.create_invitation(text, text, text, jsonb, text) to anon, authenticated;
