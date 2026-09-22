import type { ReactNode } from "react";

/**
 * Mockup smartphone premium, CSS murni (tanpa gambar eksternal): bezel
 * membulat, speaker, notch kamera, glass reflection tipis, dan bayangan
 * berlapis. Dipakai membingkai `DigitalInvitationPreview` di katalog &
 * halaman detail template.
 */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`perspective-1600 ${className ?? ""}`}>
      <div className="preserve-3d relative mx-auto aspect-[9/16] w-full max-w-[220px] transition-transform duration-500 ease-out [transform:rotateY(0deg)] group-hover:[transform:rotateY(-4deg)_translateY(-6px)_scale(1.02)]">
        {/* Bezel */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-[#2a2a2a] to-[#0d0d0d] p-[3px] shadow-[0_35px_60px_-20px_rgba(0,0,0,0.55)]">
          <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-black">
            {/* Speaker + camera notch */}
            <div className="absolute left-1/2 top-1.5 z-20 flex h-4 w-16 -translate-x-1/2 items-center justify-center gap-1.5 rounded-full bg-black">
              <span className="h-1 w-6 rounded-full bg-white/10" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
            </div>
            {/* Screen content */}
            <div className="absolute inset-0 overflow-hidden rounded-[1.8rem]">{children}</div>
            {/* Glass reflection */}
            <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] bg-gradient-to-br from-white/15 via-transparent to-transparent" />
            {/* Side highlight for depth */}
            <div className="pointer-events-none absolute inset-y-4 right-0 w-px bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
