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
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Tenor Sans', sans-serif",
  "--font-body": "'Jost', sans-serif",
});

/**
 * ============================================================
 * MODERN BUSINESS -- template CORPORATE, konsep ultra-clean.
 * ============================================================
 * Putih lapang, tipografi sans editorial, tanpa ornamen sama sekali
 * -- fokus penuh pada konten & agenda. Beda total dari Corporate
 * Black (hitam grid) dan Corporate Gold (formal emas).
 */
export default function ModernBusinessTemplate({ data, templateSlug, guestName }: CorporateTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(850);

  return (
    <div style={FONTS} className="relative min-h-screen bg-white font-[family-name:var(--font-body)] text-[#1a1a1a]">
      {/* ============ OPENING ============ */}
      {phase !== "open" && (
        <div className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-6 text-center transition-opacity duration-[850ms]", phase === "closing" && "opacity-0")}>
          <span className="text-xs uppercase tracking-[0.4em] text-[#7a8ba8]">{data.companyName}</span>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[#1a1a1a] sm:text-4xl">{data.title}</h1>
          <div className="mx-auto mt-6 h-px w-24 bg-[#7a8ba8]" />
          <p className="mt-6 text-sm text-[#5a6a8a]">Kepada Yth.</p>
          <p className="font-[family-name:var(--font-display)] text-lg">{guestName}</p>
          <div className="mt-9">
            <GoldButton onClick={openInvitation} className="border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white">
              Buka Undangan
            </GoldButton>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#7a8ba8] bg-white text-[#7a8ba8]" />

      {/* ============ HERO ============ */}
      <section className="relative h-[45vh] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroImage} alt={data.companyName} className="h-full w-full object-cover" />
      </section>

      {/* ============ CONTENT ============ */}
      <section className="mx-auto max-w-lg px-6 py-14">
        <Reveal direction="editorial">
          <span className="text-xs uppercase tracking-[0.3em] text-[#7a8ba8]">{data.companyName}</span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl">{data.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#5a6a8a]">{data.description}</p>
        </Reveal>
      </section>

      {/* ============ SPEAKER ============ */}
      {data.speaker && (
        <section className="border-y border-[#e5e9f0] px-6 py-10">
          <Reveal direction="editorial" className="flex items-center gap-4">
            {data.speaker.photoUrl && (
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.speaker.photoUrl} alt={data.speaker.name} className="h-full w-full object-cover" />
              </div>
            )}
            <div>
              <p className="font-[family-name:var(--font-display)] text-lg">{data.speaker.name}</p>
              {data.speaker.title && <p className="text-xs uppercase tracking-widest text-[#7a8ba8]">{data.speaker.title}</p>}
            </div>
          </Reveal>
        </section>
      )}

      {/* ============ COUNTDOWN ============ */}
      <section className="px-6 py-14 text-center">
        <Reveal direction="editorial">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7a8ba8]">Menuju Acara</p>
          <div className="mt-6">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="editorial-inline" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT + AGENDA ============ */}
      <section className="border-y border-[#e5e9f0] px-6 py-14">
        <Reveal direction="editorial">
          <h3 className="font-[family-name:var(--font-display)] text-lg">{data.schedule.name}</h3>
          <p className="mt-2 text-sm text-[#5a6a8a]">{formatFullDateWithDay(data.schedule.date)} &middot; {formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="text-sm">{data.schedule.venueName}</p>
          <p className="text-xs text-[#5a6a8a]">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" buttonClassName="border-b border-[#1a1a1a] text-[#1a1a1a]" />
        </Reveal>
        <div className="mt-8 flex flex-col divide-y divide-[#e5e9f0]">
          {data.agenda.map((item) => (
            <div key={item.id} className="grid grid-cols-[100px_1fr] gap-6 py-3 text-sm">
              <span className="text-[#7a8ba8]">{item.time}</span>
              <span>{item.activity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="py-14">
        <div className="px-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#7a8ba8]">Gallery</span>
        </div>
        <div className="mt-6">
          <Gallery photos={data.gallery} variant="horizontal-scroll" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="px-6 py-14">
        <span className="text-xs uppercase tracking-[0.3em] text-[#7a8ba8]">RSVP</span>
        <div className="mt-6">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border-b border-[#e5e9f0] pb-6",
              inputClassName: "rounded-none border-x-0 border-t-0 border-b border-[#e5e9f0] px-0 focus:border-[#1a1a1a]",
              textareaClassName: "rounded-none border-x-0 border-t-0 border-b border-[#e5e9f0] px-0 focus:border-[#1a1a1a]",
              buttonClassName: "rounded-none bg-[#1a1a1a] text-white",
              radioClassName: "rounded-none border-b border-[#e5e9f0] text-[#5a6a8a]",
              radioActiveClassName: "bg-[#1a1a1a] text-white border-[#1a1a1a]",
              wishItemClassName: "border-b border-[#e5e9f0]",
              wishMessageClassName: "text-[#5a6a8a]",
              wishMetaClassName: "text-[#7a8ba8]",
            }}
          />
        </div>
        {data.contactPerson && (
          <p className="mt-8 text-xs text-[#5a6a8a]">Kontak: {data.contactPerson.name} &middot; {data.contactPerson.phone}</p>
        )}
      </section>

      {/* ============ CLOSING ============ */}
      <footer className="border-t border-[#e5e9f0] px-6 py-14 text-center text-[#5a6a8a]">
        <p className="font-[family-name:var(--font-display)] text-xl text-[#1a1a1a]">{data.companyName}</p>
      </footer>
    </div>
  );
}
