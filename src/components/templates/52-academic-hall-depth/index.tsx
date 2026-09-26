"use client";

import type { SchoolTemplateProps } from "../types";
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
import { OrnamentGraduationCap, OrnamentLaurelWreath, OrnamentDiplomaScroll } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";

const FONTS = fontVars({
  "--font-display": "'Playfair Display', serif",
  "--font-body": "'Lora', serif",
});

/**
 * ============================================================
 * ACADEMIC HALL DEPTH -- template 3D SEKOLAH/WISUDA, aula pilar berlapis.
 * ============================================================
 * Deretan pilar pada beberapa translateZ menciptakan aula wisuda yang
 * benar-benar memanjang ke kedalaman, dengan laurel wreath & topi toga
 * melayang di lapisan terdepan.
 */
function PillarHall({ children }: { children: React.ReactNode }) {
  const depths = [-100, -55, -10];
  return (
    <div className="perspective-1600 relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="preserve-3d absolute inset-0">
        {depths.map((z, i) => (
          <div key={i} className="preserve-3d absolute inset-0 flex items-center justify-between px-2" style={{ transform: `translateZ(${z}px) scale(${1 - Math.abs(z) / 400})` }}>
            <div className="h-full w-2.5 bg-gradient-to-b from-[#c9a24b] via-[#0d1b3a]/40 to-[#c9a24b] opacity-60" />
            <div className="h-full w-2.5 bg-gradient-to-b from-[#c9a24b] via-[#0d1b3a]/40 to-[#c9a24b] opacity-60" />
          </div>
        ))}
      </div>
      <div className="preserve-3d relative z-10" style={{ transform: "translateZ(40px)" }}>
        {children}
      </div>
    </div>
  );
}

export default function AcademicHallDepthTemplate({ data, templateSlug, guestName }: SchoolTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);
  const heroParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative bg-[#f4f1e6] font-[family-name:var(--font-body)] text-[#0d1b3a]">
      {/* ============ 1. OPENING -- aula pilar berlapis ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 overflow-hidden bg-[#0d1b3a]">
          <PillarHall>
            <div
              className="px-6 text-center transition-all duration-1000 ease-in"
              style={{ opacity: phase === "closing" ? 0 : 1, transform: phase === "closing" ? "translateZ(200px) scale(1.6)" : "translateZ(0px) scale(1)" }}
            >
              <div className="relative">
                <OrnamentLaurelWreath className="h-24 w-52 text-[#c9a24b]" />
                <OrnamentGraduationCap className="absolute left-1/2 top-1/2 h-10 w-14 -translate-x-1/2 -translate-y-1/2 text-[#c9a24b]" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.4em] text-[#c9a24b]">{data.schoolName}</p>
              <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl">{data.title}</h1>
              <p className="mt-6 text-sm text-[#cdd6f0]">Kepada Yth.</p>
              <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
              <div className="mt-9">
                <GoldButton onClick={openInvitation} className="border border-[#c9a24b] text-white hover:bg-[#c9a24b] hover:text-[#0d1b3a]">
                  Buka Undangan
                </GoldButton>
              </div>
            </div>
          </PillarHall>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#c9a24b] bg-[#0d1b3a] text-[#c9a24b]" />

      {/* ============ 2. HERO ============ */}
      <section className="scene-h relative flex items-end overflow-hidden">
        <div ref={heroParallax} className="absolute inset-0 h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroImage} alt={data.schoolName} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f1e6] via-transparent to-transparent" />
        <Reveal direction="up" className="relative z-10 w-full px-6 pb-14 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#0d1b3a]">{data.title}</h2>
        </Reveal>
      </section>

      {/* ============ 3. CONTENT + DIPLOMA ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <Reveal direction="up" className="mx-auto max-w-lg">
          <OrnamentDiplomaScroll className="mx-auto h-16 w-20 text-[#c9a24b]" />
          {data.batchYear && <p className="mt-3 text-sm uppercase tracking-widest text-[#a8791f]">{data.batchYear}</p>}
          <p className="mt-4 text-sm leading-relaxed text-[#3a4a6a]">{data.description}</p>
          {data.principalName && <p className="mt-4 text-xs text-[#3a4a6a]">Kepala Sekolah: {data.principalName}</p>}
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN + AGENDA ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#0d1b3a] px-6 py-16 text-[#f4f1e6]">
        <Reveal direction="scale" className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c9a24b]">{formatFullDate(data.schedule.date)}</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="laurel-badge" />
          </div>
        </Reveal>
        <div className="mx-auto mt-14 max-w-lg">
          <Reveal direction="scale" className="border border-[#c9a24b]/50 p-6 text-center">
            <h3 className="font-[family-name:var(--font-display)] text-lg text-[#c9a24b]">{data.schedule.name}</h3>
            <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
            <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
            <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
            <p className="text-xs text-[#cdd6f0]">{data.schedule.address}</p>
          </Reveal>
          <div className="mt-8 flex flex-col divide-y divide-[#c9a24b]/20 border-y border-[#c9a24b]/20">
            {data.agenda.map((item) => (
              <div key={item.id} className="grid grid-cols-[100px_1fr] gap-4 py-3 text-sm">
                <span className="text-[#c9a24b]">{item.time}</span>
                <span>{item.activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. GALLERY ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#0d1b3a]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="gold-line-grid" />
        </div>
      </section>

      {/* ============ 6. MAPS ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <Reveal direction="scale">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#0d1b3a]">Lokasi</h2>
          <MapsCard event={data.schedule} className="mt-6" buttonClassName="border border-[#0d1b3a] text-[#0d1b3a] hover:bg-[#0d1b3a] hover:text-white" />
        </Reveal>
      </section>

      {/* ============ 7. RSVP ============ */}
      <section className="relative bg-[#eee3c4] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#0d1b3a]">Konfirmasi Kehadiran</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#c9a24b]/50 bg-white p-6",
              inputClassName: "border-[#c9a24b]/60 focus:border-[#0d1b3a]",
              textareaClassName: "border-[#c9a24b]/60 focus:border-[#0d1b3a]",
              buttonClassName: "bg-[#0d1b3a] text-white hover:bg-[#1c3d78]",
              radioClassName: "border-[#c9a24b]/60 text-[#0d1b3a]",
              radioActiveClassName: "bg-[#0d1b3a] text-white border-[#0d1b3a]",
              labelClassName: "text-[#0d1b3a]",
              wishItemClassName: "border border-[#c9a24b]/30 bg-white",
              wishMessageClassName: "text-[#3a4a6a]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
        {data.contactPerson && (
          <p className="mt-8 text-center text-xs text-[#3a4a6a]">
            Kontak: {data.contactPerson.name} &middot; {data.contactPerson.phone}
          </p>
        )}
      </section>

      {/* ============ 8. CLOSING ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center bg-[#0d1b3a] px-6 text-center text-[#c9a24b]">
        <OrnamentGraduationCap className="mx-auto mb-4 h-10 w-14" />
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-xl">{data.schoolName}</p>
        {data.committeeName && <p className="mt-2 text-xs text-[#cdd6f0]">{data.committeeName}</p>}
      </footer>
    </div>
  );
}
