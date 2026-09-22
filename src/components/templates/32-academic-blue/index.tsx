"use client";

import type { SchoolTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { GoldButton } from "@/components/shared/gold-button";
import { MapsCard } from "@/components/shared/maps-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentDiplomaScroll } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Poppins', sans-serif",
  "--font-body": "'Jost', sans-serif",
});

/**
 * ============================================================
 * ACADEMIC BLUE -- template SEKOLAH/WISUDA, konsep modern-akademik.
 * ============================================================
 * Biru-putih bersih dengan tipografi sans modern & agenda dalam
 * kartu bernomor -- beda total dari Graduation Elegant yang formal
 * navy-emas-serif.
 */
export default function AcademicBlueTemplate({ data, templateSlug, guestName }: SchoolTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(900);

  return (
    <div style={FONTS} className="relative min-h-screen bg-white font-[family-name:var(--font-body)] text-[#0d1b3a]">
      {/* ============ OPENING: panel biru terbuka ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#1c3d78]">
          <div className={cn("absolute inset-y-0 left-0 w-1/2 bg-white transition-transform duration-900 ease-in-out", phase === "closing" && "-translate-x-full")} />
          <div className={cn("absolute inset-y-0 right-0 w-1/2 bg-white transition-transform duration-900 ease-in-out", phase === "closing" && "translate-x-full")} />
          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white">{data.schoolName}</span>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">{data.title}</h1>
            <p className="mt-6 text-sm text-white/70">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="bg-white text-[#1c3d78]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#1c3d78] text-white" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroImage} alt={data.schoolName} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#1c3d78]/40" />
        <div className="absolute inset-x-0 bottom-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">{data.title}</h2>
        </div>
      </section>

      {/* ============ CONTENT ============ */}
      <section className="mx-auto max-w-lg px-6 py-14">
        <Reveal direction="up" className="text-center">
          <OrnamentDiplomaScroll className="mx-auto h-10 w-24 text-[#1c3d78]" />
          {data.batchYear && <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#1c3d78]">{data.batchYear}</p>}
          <p className="mt-4 text-sm leading-relaxed text-[#3a4a6a]">{data.description}</p>
        </Reveal>
      </section>

      {/* ============ COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#f0f4fb] px-6 text-center">
        <Reveal direction="scale">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1c3d78]">{formatFullDate(data.schedule.date)}</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="shield-badge" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT + AGENDA (bernomor) ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#1c3d78]">Susunan Acara</h2>
        </Reveal>
        <div className="mt-8 flex flex-col gap-4">
          {data.agenda.map((item, i) => (
            <Reveal key={item.id} direction="up" delay={i * 80} className="flex items-start gap-4 rounded-lg border border-[#dce6f7] p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1c3d78] text-xs font-bold text-white">{i + 1}</span>
              <div>
                <p className="text-xs font-semibold text-[#1c3d78]">{item.time}</p>
                <p className="text-sm">{item.activity}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-[#dce6f7] p-6 text-center">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#1c3d78]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)} &middot; {formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-1 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-[#5a6a8a]">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" buttonClassName="rounded-md bg-[#1c3d78] text-white" />
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#1c3d78]">Galeri</h2>
        </Reveal>
        <div className="mt-8">
          <Gallery photos={data.gallery} variant="mosaic-reveal" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="bg-[#f0f4fb] px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#1c3d78]">Konfirmasi Kehadiran</h2>
        </Reveal>
        <div className="mx-auto mt-8 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-lg border border-[#dce6f7] bg-white p-6",
              inputClassName: "rounded-md border-[#dce6f7] focus:border-[#1c3d78]",
              textareaClassName: "rounded-md border-[#dce6f7] focus:border-[#1c3d78]",
              buttonClassName: "rounded-md bg-[#1c3d78] text-white",
              radioClassName: "rounded-full border-[#dce6f7] text-[#3a4a6a]",
              radioActiveClassName: "bg-[#1c3d78] text-white border-[#1c3d78]",
              labelClassName: "text-[#3a4a6a]",
              wishItemClassName: "rounded-lg border border-[#dce6f7] bg-white",
              wishMessageClassName: "text-[#3a4a6a]",
              wishMetaClassName: "text-[#1c3d78]",
            }}
          />
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <footer className="scene-h flex flex-col items-center justify-center bg-[#1c3d78] px-6 text-center text-white">
        <p className="font-[family-name:var(--font-display)] text-xl font-bold">{data.schoolName}</p>
        {data.committeeName && <p className="mt-2 text-xs text-white/70">{data.committeeName}</p>}
      </footer>
    </div>
  );
}
