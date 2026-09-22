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
import { OrnamentLantern, OrnamentCrescentStar } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-heading": "'Amiri', serif",
  "--font-body": "'Quicksand', sans-serif",
});

/**
 * ============================================================
 * RAMADHAN GOLD -- template KEAGAMAAN, konsep "malam Ramadhan".
 * ============================================================
 * Emas hangat dengan lampion & bulan sabit -- suasana malam yang
 * berbeda dari Islamic Emerald (siang formal) & Tabligh Akbar (panggung).
 */
export default function RamadhanGoldTemplate({ data, templateSlug, guestName }: ReligiousTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(950);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#2a1f0a] font-[family-name:var(--font-body)] text-[#f5e2a8]">
      {/* ============ OPENING ============ */}
      {phase !== "open" && (
        <div className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#1a1206] px-6 text-center transition-opacity duration-[950ms]", phase === "closing" && "opacity-0")}>
          <FloatingParticles count={16} particleClassName="bg-[#f5e2a8]/70" />
          <OrnamentCrescentStar className="mx-auto h-16 w-16 text-[#f5e2a8]" />
          <OrnamentLantern className="mt-2 h-16 w-10 text-[#d4af37]" />
          {data.hostName && <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#d4af37]">{data.hostName}</p>}
          <h1 className="text-gold-gradient mt-2 font-[family-name:var(--font-heading)] text-3xl sm:text-4xl">{data.title}</h1>
          <p className="mt-6 text-sm text-[#e2d6b8]">Kepada Yth.</p>
          <p className="font-[family-name:var(--font-heading)] text-lg text-white">{guestName}</p>
          <div className="mt-9">
            <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#1a1206]">
              Buka Undangan
            </GoldButton>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4af37] bg-[#1a1206] text-[#d4af37]" />

      {/* ============ HERO ============ */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <FloatingParticles count={10} particleClassName="bg-[#f5e2a8]/60" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroImage} alt={data.title} className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f0a] via-transparent to-transparent" />
      </section>

      {/* ============ CONTENT ============ */}
      <section className="mx-auto max-w-lg px-6 py-14 text-center">
        <Reveal direction="up">
          <OrnamentLantern className="mx-auto h-14 w-9 text-[#d4af37]" />
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-2xl">{data.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#e2d6b8]">{data.description}</p>
        </Reveal>
      </section>

      {/* ============ SPEAKER ============ */}
      {data.speaker && (
        <section className="mx-auto max-w-sm px-6 pb-14 text-center">
          <Reveal direction="scale" className="rounded-full border border-[#d4af37]/60 p-6">
            {data.speaker.photoUrl && (
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-[#d4af37]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.speaker.photoUrl} alt={data.speaker.name} className="h-full w-full object-cover" />
              </div>
            )}
            <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg">{data.speaker.name}</h3>
            {data.speaker.title && <p className="mt-1 text-xs text-[#e2d6b8]">{data.speaker.title}</p>}
          </Reveal>
        </section>
      )}

      {/* ============ COUNTDOWN ============ */}
      <section className="relative overflow-hidden border-y border-[#d4af37]/20 px-6 py-16 text-center">
        <FloatingParticles count={12} particleClassName="bg-[#f5e2a8]/60" />
        <Reveal direction="scale" className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Menuju Hari Acara</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="lantern-glow" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT + AGENDA ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="scale" className="border border-[#d4af37]/50 p-7 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-xl text-[#d4af37]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-[#e2d6b8]">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-[#d4af37] text-[#f5e2a8] hover:bg-[#d4af37] hover:text-[#1a1206]" />
        </Reveal>
        <div className="mt-8 flex flex-col gap-3">
          {data.agenda.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-[#d4af37]/30 pb-2 text-sm">
              <span className="font-semibold text-[#d4af37]">{item.time}</span>
              <span className="text-[#e2d6b8]">{item.activity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- floating frames ============ */}
      <section className="px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#d4af37]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="floating-frames" accentClassName="border-[#d4af37]/60" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#d4af37]">Konfirmasi Kehadiran</h2>
        </Reveal>
        <div className="mt-8">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#d4af37]/40 p-6",
              inputClassName: "border-[#d4af37]/40 bg-transparent text-[#f5e2a8] focus:border-[#d4af37]",
              textareaClassName: "border-[#d4af37]/40 bg-transparent text-[#f5e2a8] focus:border-[#d4af37]",
              buttonClassName: "bg-[#d4af37] text-[#1a1206]",
              radioClassName: "border-[#d4af37]/40 text-[#e2d6b8]",
              radioActiveClassName: "bg-[#d4af37] text-[#1a1206] border-[#d4af37]",
              labelClassName: "text-[#e2d6b8]",
              wishItemClassName: "border border-[#d4af37]/30",
              wishNameClassName: "text-[#f5e2a8]",
              wishMessageClassName: "text-[#e2d6b8]",
              wishMetaClassName: "text-[#d4af37]",
            }}
          />
        </div>
      </section>

      {/* ============ INFAQ / GIFT ============ */}
      {data.bankAccounts.length > 0 && (
        <section className="border-t border-[#d4af37]/20 px-6 py-16 text-center">
          <Reveal direction="scale" className="mx-auto max-w-lg">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#d4af37]">Infaq &amp; Sedekah</h2>
            <div className="mt-8 flex flex-col gap-4">
              {data.bankAccounts.map((acc) => (
                <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/40 text-left text-[#f5e2a8]" buttonClassName="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a1206]" />
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ============ CLOSING ============ */}
      <footer className="px-6 py-14 text-center text-[#e2d6b8]">
        <OrnamentCrescentStar className="mx-auto mb-4 h-8 w-8 text-[#d4af37]" />
        <p className="text-gold-gradient font-[family-name:var(--font-heading)] text-xl">{data.title}</p>
      </footer>
    </div>
  );
}
