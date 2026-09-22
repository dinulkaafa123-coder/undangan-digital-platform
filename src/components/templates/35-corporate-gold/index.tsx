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
import { OrnamentArtDecoLines } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Cinzel', serif",
  "--font-body": "'Montserrat', sans-serif",
});

/**
 * ============================================================
 * CORPORATE GOLD -- template CORPORATE, konsep formal-elegan.
 * ============================================================
 * Krem-emas untuk annual gathering/anniversary perusahaan yang
 * ingin terasa mewah -- beda dari Corporate Black yang minimal
 * hitam-putih.
 */
export default function CorporateGoldTemplate({ data, templateSlug, guestName }: CorporateTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(950);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#f8e9c9] font-[family-name:var(--font-body)] text-[#3a1010]">
      {/* ============ OPENING ============ */}
      {phase !== "open" && (
        <div className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#1a1206] px-6 text-center transition-opacity duration-[950ms]", phase === "closing" && "opacity-0")}>
          <OrnamentArtDecoLines className="mx-auto h-6 w-56 text-[#c9a24b]" />
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-[#c9a24b]">{data.companyName}</p>
          <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl">{data.title}</h1>
          <p className="mt-6 text-sm text-[#f0dcb0]">Kepada Yth.</p>
          <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
          <div className="mt-9">
            <GoldButton onClick={openInvitation} className="border border-[#c9a24b] text-white hover:bg-[#c9a24b] hover:text-[#1a1206]">
              Buka Undangan
            </GoldButton>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#c9a24b] bg-[#1a1206] text-[#c9a24b]" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroImage} alt={data.companyName} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8e9c9] via-transparent to-transparent" />
      </section>

      {/* ============ CONTENT ============ */}
      <section className="mx-auto max-w-lg px-6 py-14 text-center">
        <Reveal direction="up">
          <OrnamentArtDecoLines className="mx-auto mb-4 h-5 w-40 text-[#8a1a1a]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#8a1a1a]">{data.title}</h2>
          <p className="mt-4 text-sm leading-relaxed">{data.description}</p>
        </Reveal>
      </section>

      {/* ============ SPEAKER ============ */}
      {data.speaker && (
        <section className="mx-auto max-w-sm px-6 pb-14 text-center">
          <Reveal direction="scale" className="border-2 border-[#c9a24b] p-6">
            {data.speaker.photoUrl && (
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-[#c9a24b]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.speaker.photoUrl} alt={data.speaker.name} className="h-full w-full object-cover" />
              </div>
            )}
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg text-[#8a1a1a]">{data.speaker.name}</h3>
            {data.speaker.title && <p className="mt-1 text-xs uppercase tracking-widest">{data.speaker.title}</p>}
          </Reveal>
        </section>
      )}

      {/* ============ COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#3a1010] px-6 text-center text-[#f8e9c9]">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c9a24b]">{formatFullDate(data.schedule.date)}</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="luxury-ring" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT + AGENDA ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="scale" className="border-2 border-[#c9a24b] p-7 text-center">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#8a1a1a]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" buttonClassName="border border-[#8a1a1a] text-[#8a1a1a] hover:bg-[#8a1a1a] hover:text-white" />
        </Reveal>
        <div className="mt-8 flex flex-col gap-3">
          {data.agenda.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-[#c9a24b]/40 pb-2 text-sm">
              <span className="font-semibold text-[#8a1a1a]">{item.time}</span>
              <span>{item.activity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- museum wall ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#8a1a1a]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="museum-wall" accentClassName="border-[#c9a24b]" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="bg-[#f0dcb0] px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#8a1a1a]">Konfirmasi Kehadiran</h2>
        </Reveal>
        <div className="mx-auto mt-8 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#c9a24b]/60 bg-white p-6",
              inputClassName: "border-[#c9a24b]/60 focus:border-[#8a1a1a]",
              textareaClassName: "border-[#c9a24b]/60 focus:border-[#8a1a1a]",
              buttonClassName: "bg-[#8a1a1a] text-white",
              radioClassName: "border-[#c9a24b]/60 text-[#5a2a20]",
              radioActiveClassName: "bg-[#8a1a1a] text-white border-[#8a1a1a]",
              wishItemClassName: "border border-[#c9a24b]/40 bg-white",
              wishMessageClassName: "text-[#5a2a20]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <footer className="scene-h flex flex-col items-center justify-center bg-[#1a1206] px-6 text-center text-[#c9a24b]">
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-xl">{data.companyName}</p>
      </footer>
    </div>
  );
}
