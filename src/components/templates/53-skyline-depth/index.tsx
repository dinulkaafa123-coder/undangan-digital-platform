"use client";

import type { CorporateTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { useParallax } from "@/hooks/use-parallax";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { GoldButton } from "@/components/shared/gold-button";
import { MapsCard } from "@/components/shared/maps-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentGridLines } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";

const FONTS = fontVars({
  "--font-display": "'Montserrat', sans-serif",
  "--font-body": "'Jost', sans-serif",
});

/**
 * ============================================================
 * SKYLINE DEPTH -- template 3D CORPORATE, gedung berlapis parallax.
 * ============================================================
 * Siluet gedung pada beberapa translateZ menciptakan cakrawala kota
 * yang benar-benar berkedalaman -- gedung jauh lebih kecil & gelap,
 * gedung dekat lebih besar & tajam, panel konten melayang di depannya.
 */
function SkylineDepth({ children }: { children: React.ReactNode }) {
  const buildings = [
    { z: -100, h: "h-24", opacity: "bg-[#1c2a3a]" },
    { z: -60, h: "h-36", opacity: "bg-[#28374a]" },
    { z: -20, h: "h-48", opacity: "bg-[#34455a]" },
  ];
  return (
    <div className="perspective-1600 relative flex h-full w-full items-end justify-center overflow-hidden">
      <div className="preserve-3d absolute inset-x-0 bottom-0 flex h-full items-end justify-center gap-1">
        {buildings.map((b, i) => (
          <div key={i} className="preserve-3d flex gap-1" style={{ transform: `translateZ(${b.z}px)` }}>
            {[0, 1, 2].map((j) => (
              <div key={j} className={`w-8 sm:w-12 ${b.h} ${b.opacity}`} style={{ height: `${40 + ((i + j) % 3) * 15}%` }} />
            ))}
          </div>
        ))}
      </div>
      <div className="preserve-3d relative z-10" style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </div>
  );
}

export default function SkylineDepthTemplate({ data, templateSlug, guestName }: CorporateTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(900);
  const heroParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative bg-white font-[family-name:var(--font-body)] text-[#111111]">
      {/* ============ 1. OPENING -- cakrawala berlapis ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 overflow-hidden bg-[#0f1620]">
          <SkylineDepth>
            <div
              className="px-6 text-center transition-all duration-900 ease-in"
              style={{ opacity: phase === "closing" ? 0 : 1, transform: phase === "closing" ? "translateZ(220px) scale(1.6)" : "translateZ(0px) scale(1)" }}
            >
              <span className="text-xs uppercase tracking-[0.5em] text-white/50">{data.companyName}</span>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">{data.title}</h1>
              <p className="mt-6 text-sm text-white/50">Kepada Yth.</p>
              <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
              <div className="mt-9">
                <GoldButton onClick={openInvitation} className="border border-white text-white hover:bg-white hover:text-[#0f1620]">
                  Buka Undangan
                </GoldButton>
              </div>
            </div>
          </SkylineDepth>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-black bg-white text-black" />

      {/* ============ 2. HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden bg-[#0f1620]">
        <div ref={heroParallax} className="absolute inset-0 h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroImage} alt={data.companyName} className="h-full w-full object-cover opacity-60 grayscale" />
        </div>
        <div className="absolute inset-x-0 bottom-8 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">{data.title}</h2>
        </div>
      </section>

      {/* ============ 3. CONTENT ============ */}
      <section className="mx-auto max-w-lg px-6 py-16 text-center">
        <Reveal direction="up">
          <OrnamentGridLines className="mx-auto mb-4 h-8 w-16 text-[#0f1620]/30" />
          <p className="text-sm leading-relaxed text-[#4a4a4a]">{data.description}</p>
        </Reveal>
      </section>

      {/* ============ 4. SPEAKER ============ */}
      {data.speaker && (
        <section className="border-y border-black/10 px-6 py-16 text-center">
          <Reveal direction="up">
            {data.speaker.photoUrl && (
              <div className="mx-auto h-28 w-28 overflow-hidden rounded-full grayscale">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.speaker.photoUrl} alt={data.speaker.name} className="h-full w-full object-cover" />
              </div>
            )}
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold">{data.speaker.name}</h3>
            {data.speaker.title && <p className="mt-1 text-xs uppercase tracking-widest text-[#4a4a4a]">{data.speaker.title}</p>}
          </Reveal>
        </section>
      )}

      {/* ============ 5. COUNTDOWN + AGENDA ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#0f1620] px-6 py-16 text-white">
        <Reveal direction="scale" className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Menuju Acara</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="mono-badge" />
          </div>
        </Reveal>
        <div className="mx-auto mt-14 max-w-lg">
          <Reveal direction="up" className="border border-white/15 p-7 text-center">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">{data.schedule.name}</h3>
            <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)} &middot; {formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
            <p className="mt-1 text-sm font-medium">{data.schedule.venueName}</p>
            <p className="text-xs text-white/60">{data.schedule.address}</p>
            <MapsCard event={data.schedule} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-white text-white hover:bg-white hover:text-[#0f1620]" />
          </Reveal>
          <div className="mt-8 flex flex-col divide-y divide-white/10 border-y border-white/10">
            {data.agenda.map((item) => (
              <div key={item.id} className="grid grid-cols-[100px_1fr] gap-4 py-3 text-sm">
                <span className="font-semibold">{item.time}</span>
                <span className="text-white/70">{item.activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. GALLERY ============ */}
      <section className="px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold">Galeri</h2>
        </Reveal>
        <div className="mt-8">
          <Gallery photos={data.gallery} variant="masonry" />
        </div>
      </section>

      {/* ============ 7. RSVP ============ */}
      <section className="border-t border-black/10 px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold">Konfirmasi Kehadiran</h2>
        </Reveal>
        <div className="mx-auto mt-8 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-black/10 p-6",
              inputClassName: "rounded-none border-black/20 focus:border-black",
              textareaClassName: "rounded-none border-black/20 focus:border-black",
              buttonClassName: "bg-black text-white",
              radioClassName: "rounded-none border-black/20 text-black/70",
              radioActiveClassName: "bg-black text-white border-black",
              wishItemClassName: "border border-black/10",
              wishMessageClassName: "text-[#4a4a4a]",
              wishMetaClassName: "font-semibold",
            }}
          />
        </div>
        {data.contactPerson && (
          <p className="mt-8 text-center text-xs text-[#4a4a4a]">
            Kontak: {data.contactPerson.name} &middot; {data.contactPerson.phone}
          </p>
        )}
      </section>

      {/* ============ 8. CLOSING ============ */}
      <footer className="scene-h flex flex-col items-center justify-center bg-[#0f1620] px-6 text-center text-white">
        <p className="font-[family-name:var(--font-display)] text-xl font-bold">{data.companyName}</p>
      </footer>
    </div>
  );
}
