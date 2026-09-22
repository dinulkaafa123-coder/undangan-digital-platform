"use client";

import { PhoneFrame } from "@/components/catalog/phone-frame";

/**
 * Preview hidup di dalam frame smartphone. Sengaja pakai `<iframe>` yang
 * membaca draft dari localStorage sendiri (`/pratinjau`, lihat file itu)
 * alih-alih me-mount renderer template langsung di halaman editor ini --
 * renderer asli mengunci scroll `document.body` selama fase cover
 * (`useInvitationCover`), yang kalau di-mount inline akan ikut mengunci
 * scroll HALAMAN EDITOR itu sendiri. Iframe mengisolasi dokumennya
 * sendiri sehingga kuncian itu tidak pernah bocor ke luar.
 *
 * Sinkronisasi live: setiap `saveDraft()` di editor menulis ke
 * localStorage, dan browser otomatis memicu event `storage` di iframe
 * (dokumen lain, origin sama) -- lihat listener di `/pratinjau/page.tsx`.
 * Tidak perlu refresh maupun postMessage manual.
 */
export function LivePreview({ className }: { className?: string }) {
  return (
    <PhoneFrame className={className}>
      <iframe src="/pratinjau" title="Preview Undangan" className="h-full w-full border-0" />
    </PhoneFrame>
  );
}
