import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase tunggal, dipakai baik dari Server Component (publik,
 * `/undangan/[slug]`) maupun dari komponen client (builder). Hanya pernah
 * memakai anon/publishable key -- key ini AMAN dipakai di frontend karena
 * semua akses ke tabel `invitations` diproteksi Row Level Security +
 * fungsi RPC yang membatasi apa yang bisa dibaca/diubah publik
 * (lihat `supabase/migrations/0001_invitations.sql`).
 *
 * TIDAK PERNAH memakai service_role key -- key itu tidak boleh ada di
 * kode aplikasi sama sekali.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

/** true kalau env Supabase sudah diisi -- dipakai untuk fallback yang jelas kalau belum dikonfigurasi. */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabase(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase belum dikonfigurasi: isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local"
    );
  }
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      // Tidak ada sistem login di aplikasi ini -- tidak perlu persist session.
      auth: { persistSession: false },
    });
  }
  return client;
}
