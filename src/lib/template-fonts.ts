import type { CSSProperties } from "react";

/**
 * Membungkus CSS custom properties (mis. "--font-display") sebagai
 * `CSSProperties` yang valid untuk dipakai lewat prop `style` React.
 *
 * Font Google sendiri dimuat sekali lewat satu <link> stylesheet di
 * `app/layout.tsx` (lihat komentar di sana) -- helper ini hanya
 * menyediakan nama variabel CSS supaya tiap template bisa memetakan
 * `--font-display` / `--font-body` / dst ke family pilihannya sendiri.
 */
export function fontVars(vars: Record<string, string>): CSSProperties {
  return vars as CSSProperties;
}
