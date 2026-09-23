import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { makeId } from "@/lib/utils";

const STORAGE_BUCKET = "invitation-photos";

/** Kompres gambar lewat kanvas di browser, hasilnya Blob JPEG. */
function compressImageToBlob(file: File, maxDim: number, quality: number): Promise<{ blob: Blob; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error("Gagal membaca file"));
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const img = new window.Image();
      img.onerror = () => reject(new Error("Gagal memuat gambar"));
      img.onload = () => {
        const ratio = Math.min(1, maxDim / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * ratio));
        const height = Math.max(1, Math.round(img.height * ratio));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Kanvas tidak didukung"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Gagal membuat blob gambar"));
              return;
            }
            resolve({ blob, dataUrl: canvas.toDataURL("image/jpeg", quality) });
          },
          "image/jpeg",
          quality
        );
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Ubah file gambar yang diupload user jadi data URL (base64), lewat
 * kanvas di sisi klien. Dipertahankan sebagai fallback murni-lokal saat
 * Supabase Storage tidak tersedia (belum dikonfigurasi / upload gagal
 * karena jaringan) -- lihat `uploadImage()` di bawah untuk jalur utama.
 */
export function fileToCompressedDataUrl(file: File, maxDim = 1280, quality = 0.85): Promise<string> {
  return compressImageToBlob(file, maxDim, quality).then(({ dataUrl }) => dataUrl);
}

/**
 * Jalur utama untuk semua upload foto di builder: kompres di browser,
 * lalu upload ke Supabase Storage (bucket publik `invitation-photos`,
 * lihat `supabase/migrations/0002_invitation_photos_storage.sql`) dan
 * kembalikan URL publiknya -- bukan base64.
 *
 * Kenapa bukan base64 di database: foto base64 langsung di kolom
 * `event_data` (JSONB) membuat setiap baris undangan jadi besar (tiap
 * foto bisa ratusan KB sebagai teks), boros ruang & lambat diambil.
 * Menyimpan file asli di Storage dan cuma URL-nya di database jauh
 * lebih ringan -- sama seperti field foto lain (mis. dari picsum.photos)
 * yang dari awal memang cuma berupa URL pendek.
 *
 * Kalau Supabase belum dikonfigurasi ATAU upload gagal (mis. offline),
 * otomatis jatuh ke data URL lokal supaya form tetap bisa dipakai --
 * tidak pernah melempar error ke pemanggil.
 */
export async function uploadImage(file: File, maxDim = 1280, quality = 0.85): Promise<string> {
  let compressed: { blob: Blob; dataUrl: string };
  try {
    compressed = await compressImageToBlob(file, maxDim, quality);
  } catch {
    // Kompresi gagal total (jarang) -- fallback ke pembacaan data URL polos.
    return fileToCompressedDataUrl(file, maxDim, quality);
  }

  if (!isSupabaseConfigured()) {
    return compressed.dataUrl;
  }

  try {
    const path = `${makeId("img")}.jpg`;
    const supabase = getSupabase();
    const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, compressed.blob, {
      contentType: "image/jpeg",
      cacheControl: "31536000", // 1 tahun -- foto yang sudah diupload tidak pernah diubah, aman di-cache lama
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  } catch {
    // Upload gagal (jaringan, storage belum di-setup, dll) -- tetap
    // kembalikan data URL lokal supaya user tidak kehilangan fotonya.
    return compressed.dataUrl;
  }
}
