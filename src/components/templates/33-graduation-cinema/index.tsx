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
import { OrnamentGraduationCap, OrnamentSpotlightCone } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Bodoni Moda', serif",
  "--font-body": "'Montserrat', sans-serif",
});

/**
 * ============================================================
 * GRADUATION CINEMA -- template SEKOLAH/WISUDA, konsep "movie premiere".
 * ============================================================
 * Hitam-emas dramatis dengan spotlight & agenda dibingkai sebagai
 * "adegan" -- beda total dari Graduation Elegant (navy formal) dan
 * Academic Blue (biru-putih modern).
 */
export default function GraduationCinemaTemplate({ data, templateSlug, guestName }: SchoolTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#0a0a0a] font-[family-name:var(--font-body)] text-[#e9e2d0]">
      {/* ============ OPENING: spotlight premiere ============ */}
      {phase !== "open" && (
        <div className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black px-6 text-center transition-opacity duration-1000", phase === "closing" && "opacity-0")}>
          <OrnamentSpotlightCone className="absolute left-1/2 top-0 h-full w-[70vw] -translate-x-1/2 text-white" />
          <div className="absolute inset-x-0 top-0 h-[6%] bg-black" />
          <div className="absolute inset-x-0 bottom-0 h-[6%] bg-black" />
          <div className="relative z-10">
            <OrnamentGraduationCap className="mx-auto h-10 w-14 text-[#c9a24b]" />
            <p className="mt-4 text-xs uppercase tracking-[0.5em] text-[#c9a24b]">{data.schoolName}</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl">{data.title}</h1>
            <p className="mt-6 text-sm text-white/60">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#c9a24b] bg-black text-[#c9a24b]" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroImage} alt={data.schoolName} className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/60" />
      </section>

      {/* ============ CONTENT ============ */}
      <section className="mx-auto max-w-lg px-6 py-16 text-center">
        <Reveal direction="blur-scale">
          {data.batchYear && <p className="text-xs uppercase tracking-[0.4em] text-[#c9a24b]">{data.batchYear}</p>}
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-white">{data.title}</h2>
          <p className="mt-4 text-sm text-white/60">{data.description}</p>
        </Reveal>
      </section>

      {/* ============ COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center border-y border-white/10 px-6 text-center">
        <Reveal direction="scale">
          <div className="mt-2">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="film-reel" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT (adegan) ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="blur-scale" className="border border-white/10 bg-white/[0.03] p-7 text-center">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#c9a24b]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm text-white/80">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm text-white/80">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-white/50">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" iframeClassName="grayscale contrast-125" buttonClassName="border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black" />
        </Reveal>
        <div className="mt-8 flex flex-col gap-3">
          {data.agenda.map((item, i) => (
            <Reveal key={item.id} direction="blur-scale" delay={i * 80} className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase tracking-wide text-[#c9a24b]">{item.time}</span>
              <span className="text-sm text-white/80">{item.activity}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- film strip ============ */}
      <section className="py-16">
        <Reveal direction="up" className="px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="film-strip" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="blur-scale" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Konfirmasi Kehadiran</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-white/10 p-6",
              inputClassName: "border-white/20 bg-transparent text-white focus:border-[#c9a24b]",
              textareaClassName: "border-white/20 bg-transparent text-white focus:border-[#c9a24b]",
              buttonClassName: "bg-[#c9a24b] text-black hover:bg-[#b08e3f]",
              radioClassName: "border-white/20 text-white/70",
              radioActiveClassName: "bg-[#c9a24b] text-black border-[#c9a24b]",
              labelClassName: "text-white/70",
              wishItemClassName: "border border-white/10",
              wishNameClassName: "text-white",
              wishMessageClassName: "text-white/60",
              wishMetaClassName: "text-[#c9a24b]",
            }}
          />
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <footer className="scene-h flex flex-col items-center justify-center px-6 text-center text-white/50">
        <p className="font-[family-name:var(--font-display)] text-xl text-[#c9a24b]">{data.schoolName}</p>
        {data.committeeName && <p className="mt-2 text-xs">{data.committeeName}</p>}
      </footer>
    </div>
  );
}
