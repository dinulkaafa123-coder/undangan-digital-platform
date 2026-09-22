-- ============================================================
-- Undangan.id -- tabel `invitations` + akses aman lewat RPC
-- ============================================================
-- Jalankan file ini SEKALI lewat Supabase Dashboard > SQL Editor > New query
-- (project ini hanya diberi anon/publishable key, yang tidak punya izin
-- membuat tabel -- jadi migration ini harus dijalankan manual oleh pemilik
-- project, bukan oleh aplikasi).

create extension if not exists pgcrypto;

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  event_type text not null,
  template_id text not null,
  event_data jsonb not null,
  status text not null default 'draft' check (status in ('draft', 'active', 'expired')),
  views integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  expires_at timestamptz
);

create index if not exists invitations_slug_idx on public.invitations (slug);
create index if not exists invitations_status_idx on public.invitations (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists invitations_set_updated_at on public.invitations;
create trigger invitations_set_updated_at
  before update on public.invitations
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
-- RLS diaktifkan TANPA policy select/update/insert langsung untuk role
-- `anon`/`authenticated` -- artinya tabel ini TIDAK BISA diakses langsung
-- lewat REST (mis. GET /rest/v1/invitations akan selalu kosong untuk
-- publik). Satu-satunya jalur akses yang sah adalah lewat fungsi
-- SECURITY DEFINER di bawah, supaya:
--   * publik tidak bisa list/scrape SEMUA undangan sekaligus
--     (get_invitation_by_slug cuma mengembalikan SATU baris utk slug persis)
--   * publik tidak bisa mengubah baris undangan orang lain
--     (update_invitation cuma menerima satu slug per panggilan, bukan
--     filter bebas seperti PATCH .../invitations?status=eq.active)
alter table public.invitations enable row level security;

-- ------------------------------------------------------------
-- RPC: ambil SATU undangan aktif berdasarkan slug persis.
-- Dipakai halaman publik /undangan/[slug] dan alur edit.
-- ------------------------------------------------------------
create or replace function public.get_invitation_by_slug(p_slug text)
returns public.invitations
language sql
security definer
set search_path = public
stable
as $$
  select * from public.invitations where slug = p_slug and status = 'active' limit 1;
$$;

revoke all on function public.get_invitation_by_slug(text) from public;
grant execute on function public.get_invitation_by_slug(text) to anon, authenticated;

-- ------------------------------------------------------------
-- RPC: buat undangan baru (status langsung 'active'), dengan slug unik
-- otomatis (retry -2, -3, dst kalau bentrok) -- atomik di sisi database
-- supaya aman dari race condition dua orang mengaktifkan slug yang mirip
-- bersamaan.
-- ------------------------------------------------------------
create or replace function public.create_invitation(
  p_base_slug text,
  p_event_type text,
  p_template_id text,
  p_event_data jsonb
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
begin
  loop
    begin
      insert into public.invitations (slug, event_type, template_id, event_data, status, published_at)
      values (v_slug, p_event_type, p_template_id, p_event_data, 'active', now())
      returning * into v_row;
      return v_row;
    exception when unique_violation then
      v_suffix := v_suffix + 1;
      v_slug := p_base_slug || '-' || v_suffix;
    end;
  end loop;
end;
$$;

revoke all on function public.create_invitation(text, text, text, jsonb) from public;
grant execute on function public.create_invitation(text, text, text, jsonb) to anon, authenticated;

-- ------------------------------------------------------------
-- RPC: update undangan yang sudah aktif (link/slug tetap sama). Ikut
-- mengizinkan ganti template_id, karena editor mengizinkan user berpindah
-- template kapan pun, termasuk setelah undangan aktif.
-- ------------------------------------------------------------
create or replace function public.update_invitation(
  p_slug text,
  p_event_data jsonb,
  p_template_id text default null
)
returns public.invitations
language sql
security definer
set search_path = public
as $$
  update public.invitations
  set event_data = p_event_data,
      template_id = coalesce(p_template_id, template_id)
  where slug = p_slug and status = 'active'
  returning *;
$$;

revoke all on function public.update_invitation(text, jsonb, text) from public;
grant execute on function public.update_invitation(text, jsonb, text) to anon, authenticated;

-- ------------------------------------------------------------
-- RPC: tambah 1 view count (best-effort, dipanggil dari halaman publik).
-- Disiapkan dari awal supaya struktur analytics sederhana sudah ada,
-- tanpa perlu sistem analytics kompleks.
-- ------------------------------------------------------------
create or replace function public.increment_invitation_views(p_slug text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.invitations set views = views + 1 where slug = p_slug and status = 'active';
$$;

revoke all on function public.increment_invitation_views(text) from public;
grant execute on function public.increment_invitation_views(text) to anon, authenticated;
