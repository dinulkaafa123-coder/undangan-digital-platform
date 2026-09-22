/**
 * Ubah file gambar yang diupload user jadi data URL (base64) berukuran
 * wajar, lewat kanvas di sisi klien.
 *
 * Sengaja TIDAK memakai `URL.createObjectURL`: object URL hanya valid
 * selama sesi/dokumen yang membuatnya, jadi tidak bertahan setelah
 * refresh -- padahal draft builder wajib bertahan di localStorage
 * setelah refresh. Data URL disimpan sebagai string biasa, jadi otomatis
 * ikut tersimpan & tidak perlu di-revoke (tidak ada memory leak seperti
 * object URL yang lupa di-revoke).
 */
export function fileToCompressedDataUrl(file: File, maxDim = 1280, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error("Gagal membaca file"));
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const img = new window.Image();
      img.onerror = () => resolve(dataUrl); // fallback: pakai data URL asli tanpa dikompresi
      img.onload = () => {
        const ratio = Math.min(1, maxDim / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * ratio));
        const height = Math.max(1, Math.round(img.height * ratio));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}
