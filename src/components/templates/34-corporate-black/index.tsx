"use client";

import type { CorporateTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { GoldButton } from "@/components/shared/gold-button";
import { MapsCard } from "@/components/shared/maps-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentGridLines } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Montserrat', sans-serif",
  "--font-body": "'Jost', sans-serif",
});

/**
 * ============================================================
 * CORPORATE BLACK -- template CORPORATE, konsep profesional-minimal.
 * ============================================================
 * Hitam-putih dengan garis grid sebagai motif, tanpa ornamen
 * dekoratif berlebihan -- layout benar-benar bukan turunan wedding.
 */
export default function CorporateBlackTemplate({ data, templateSlug, guestName }: CorporateTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(850);

  return (
    <div style={FONTS} className="relative min-h-screen bg-white font-[family-name:var(--font-body)] text-[#111111]">
      {/* ============ OPENING ============ */}
      {phase !== "open" && (
        <div className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black px-6 text-center transition-opacity duration-[850ms]", phase === "closing" && "opacity-0")}>
          <OrnamentGridLines className="absolute inset-0 h-full w-full text-white/10" />
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-[0.5em] text-white/50">{data.companyName}</span>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">{data.title}</h1>
            <p className="mt-6 text-sm text-white/50">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-white text-white hover:bg-white hover:text-black">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-black bg-white text-black" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroImage} alt={data.companyName} className="h-full w-full object-cover opacity-70 grayscale" />
        <div className="absolute inset-x-0 bottom-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">{data.title}</h2>
        </div>
      </section>

      {/* ============ CONTENT ============ */}
      <section className="mx-auto max-w-lg px-6 py-14 text-center">
        <Reveal direction="up">
          <p className="text-sm leading-relaxed text-[#4a4a4a]">{data.description}</p>
        </Reveal>
      </section>

      {/* ============ SPEAKER ============ */}
      {data.speaker && (
        <section className="border-y border-black/10 px-6 py-14 text-center">
          <Reveal direction="up">
            {data.speaker.photoUrl && (
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full grayscale">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.speaker.photoUrl} alt={data.speaker.name} className="h-full w-full object-cover" />
              </div>
            )}
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold">{data.speaker.name}</h3>
            {data.speaker.title && <p className="mt-1 text-xs uppercase tracking-widest text-[#4a4a4a]">{data.speaker.title}</p>}
          </Reveal>
        </section>
      )}

      {/* ============ COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-black px-6 text-center text-white">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Menuju Acara</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="mono-badge" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT + AGENDA ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="border border-black/10 p-7 text-center">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)} &middot; {formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-1 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-[#4a4a4a]">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-black text-black hover:bg-black hover:text-white" />
        </Reveal>
        <div className="mt-8 flex flex-col divide-y divide-black/10 border-y border-black/10">
          {data.agenda.map((item) => (
            <div key={item.id} className="grid grid-cols-[100px_1fr] gap-4 py-3 text-sm">
              <span className="font-semibold">{item.time}</span>
              <span className="text-[#4a4a4a]">{item.activity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold">Galeri</h2>
        </Reveal>
        <div className="mt-8">
          <Gallery photos={data.gallery} variant="masonry" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
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

      {/* ============ CLOSING ============ */}
      <footer className="scene-h flex flex-col items-center justify-center bg-black px-6 text-center text-white">
        <p className="font-[family-name:var(--font-display)] text-xl font-bold">{data.companyName}</p>
      </footer>
    </div>
  );
}
