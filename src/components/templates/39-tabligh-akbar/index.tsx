"use client";

import type { ReligiousTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { GoldButton } from "@/components/shared/gold-button";
import { FloatingParticles } from "@/components/shared/floating-particles";
import { MapsCard } from "@/components/shared/maps-card";
import { BankAccountCard } from "@/components/shared/bank-account-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentMinbar } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-heading": "'Amiri', serif",
  "--font-body": "'Montserrat', sans-serif",
});

/**
 * ============================================================
 * TABLIGH AKBAR -- template KEAGAMAAN, konsep "panggung dakwah besar".
 * ============================================================
 * Maroon-emas dramatis dengan siluet mimbar sebagai motif utama --
 * untuk acara skala besar, beda dari Islamic Emerald (khidmat) &
 * Ramadhan Gold (malam hangat).
 */
export default function TablighAkbarTemplate({ data, templateSlug, guestName }: ReligiousTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#f6ece2] font-[family-name:var(--font-body)] text-[#3a1010]">
      {/* ============ OPENING ============ */}
      {phase !== "open" && (
        <div className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#3a1010] px-6 text-center transition-opacity duration-1000", phase === "closing" && "opacity-0")}>
          <FloatingParticles count={12} particleClassName="bg-[#d4af37]/60" />
          <OrnamentMinbar className="mx-auto h-24 w-20 text-[#d4af37]" />
          {data.hostName && <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#d4af37]">{data.hostName}</p>}
          <h1 className="text-gold-gradient mt-2 font-[family-name:var(--font-heading)] text-3xl sm:text-4xl">{data.title}</h1>
          <p className="mt-6 text-sm text-[#f0dcb0]">Kepada Yth.</p>
          <p className="font-[family-name:var(--font-heading)] text-lg text-white">{guestName}</p>
          <div className="mt-9">
            <GoldButton onClick={openInvitation} className="border-2 border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#3a1010]">
              Buka Undangan
            </GoldButton>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#3a1010] text-[#d4af37]" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroImage} alt={data.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f6ece2] via-transparent to-transparent" />
      </section>

      {/* ============ CONTENT ============ */}
      <section className="mx-auto max-w-lg px-6 py-14 text-center">
        <Reveal direction="up">
          <OrnamentMinbar className="mx-auto h-14 w-12 text-[#8a1a1a]" />
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-2xl text-[#8a1a1a]">{data.title}</h2>
          <p className="mt-4 text-sm leading-relaxed">{data.description}</p>
        </Reveal>
      </section>

      {/* ============ SPEAKER (besar, panggung utama) ============ */}
      {data.speaker && (
        <section className="bg-[#3a1010] px-6 py-16 text-center text-[#f6ece2]">
          <Reveal direction="scale">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Bersama Ustadz</p>
            {data.speaker.photoUrl && (
              <div className="mx-auto mt-4 h-32 w-32 overflow-hidden rounded-full border-4 border-[#d4af37]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.speaker.photoUrl} alt={data.speaker.name} className="h-full w-full object-cover" />
              </div>
            )}
            <h3 className="mt-4 font-[family-name:var(--font-heading)] text-2xl text-[#d4af37]">{data.speaker.name}</h3>
            {data.speaker.title && <p className="mt-1 text-sm text-[#f0dcb0]">{data.speaker.title}</p>}
          </Reveal>
        </section>
      )}

      {/* ============ COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center px-6 text-center">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8a1a1a]">Menuju Hari Acara</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="marquee" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT + AGENDA ============ */}
      <section className="mx-auto max-w-lg px-6 pb-16">
        <Reveal direction="scale" className="border-2 border-[#8a1a1a]/40 p-7 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-xl text-[#8a1a1a]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" buttonClassName="border border-[#8a1a1a] text-[#8a1a1a] hover:bg-[#8a1a1a] hover:text-white" />
        </Reveal>
        <div className="mt-8 flex flex-col gap-3">
          {data.agenda.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-[#8a1a1a]/20 pb-2 text-sm">
              <span className="font-semibold text-[#8a1a1a]">{item.time}</span>
              <span>{item.activity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- cinematic strip ============ */}
      <section className="py-16">
        <Reveal direction="up" className="px-6 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#8a1a1a]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="cinematic-strip" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="bg-[#f0dcb0] px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#8a1a1a]">Konfirmasi Kehadiran</h2>
        </Reveal>
        <div className="mx-auto mt-8 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#8a1a1a]/30 bg-white p-6",
              inputClassName: "border-[#8a1a1a]/30 focus:border-[#8a1a1a]",
              textareaClassName: "border-[#8a1a1a]/30 focus:border-[#8a1a1a]",
              buttonClassName: "bg-[#8a1a1a] text-white",
              radioClassName: "border-[#8a1a1a]/30 text-[#5a2a20]",
              radioActiveClassName: "bg-[#8a1a1a] text-white border-[#8a1a1a]",
              wishItemClassName: "border border-[#8a1a1a]/20 bg-white",
              wishMessageClassName: "text-[#5a2a20]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ INFAQ / GIFT ============ */}
      {data.bankAccounts.length > 0 && (
        <section className="mx-auto max-w-lg px-6 py-16 text-center">
          <Reveal direction="scale">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#8a1a1a]">Infaq &amp; Sedekah</h2>
            <div className="mt-8 flex flex-col gap-4">
              {data.bankAccounts.map((acc) => (
                <BankAccountCard key={acc.id} account={acc} className="border border-[#8a1a1a]/30 bg-white text-left" buttonClassName="border border-[#8a1a1a] text-[#8a1a1a] hover:bg-[#8a1a1a] hover:text-white" />
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ============ CLOSING ============ */}
      <footer className="scene-h flex flex-col items-center justify-center bg-[#3a1010] px-6 text-center text-[#d4af37]">
        <OrnamentMinbar className="mx-auto mb-4 h-12 w-10" />
        <p className="text-gold-gradient font-[family-name:var(--font-heading)] text-xl">{data.title}</p>
      </footer>
    </div>
  );
}
