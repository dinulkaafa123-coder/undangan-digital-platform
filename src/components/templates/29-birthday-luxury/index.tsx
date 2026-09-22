"use client";

import type { BirthdayTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { GoldButton } from "@/components/shared/gold-button";
import { MapsCard } from "@/components/shared/maps-card";
import { BankAccountCard } from "@/components/shared/bank-account-card";
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
 * BIRTHDAY LUXURY -- template ULANG TAHUN, konsep "milestone dewasa".
 * ============================================================
 * Hitam-emas elegan untuk ulang tahun besar (30/40/50), fokus pada
 * ANGKA USIA sebagai monumen -- kontras total dari Sweet Celebration
 * yang pastel-playful dan Party Pop yang neon-energik.
 */
export default function BirthdayLuxuryTemplate({ data, templateSlug, guestName }: BirthdayTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#0a0a0a] font-[family-name:var(--font-body)] text-[#e9e2d0]">
      {/* ============ OPENING: iris angka usia ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black">
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-[clip-path] duration-1000 ease-in",
              phase === "closing" ? "[clip-path:circle(150%_at_50%_50%)]" : "[clip-path:circle(0%_at_50%_50%)]"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.celebrant.photoUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          </div>
          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.5em] text-[#c9a24b]">Celebrating</p>
            <h1 className="text-gold-gradient font-[family-name:var(--font-display)] text-8xl leading-none sm:text-9xl">{data.celebrant.age}</h1>
            <p className="mt-2 text-lg tracking-[0.3em] text-white">{data.celebrant.nickname}</p>
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
        <img src={data.celebrant.photoUrl} alt={data.celebrant.fullName} className="h-full w-full object-cover opacity-80 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/50" />
        <div className="absolute inset-x-0 bottom-8 text-center">
          <OrnamentArtDecoLines className="mx-auto mb-3 h-5 w-44 text-[#c9a24b]" />
          <h2 className="text-gold-gradient font-[family-name:var(--font-display)] text-3xl">{data.celebrant.nickname}</h2>
        </div>
      </section>

      {/* ============ MILESTONE STATEMENT ============ */}
      <section className="px-6 py-16 text-center">
        <Reveal direction="blur-scale">
          <p className="text-xs uppercase tracking-[0.4em] text-[#c9a24b]">{data.tagline}</p>
          <h1 className="text-gold-gradient mt-4 font-[family-name:var(--font-display)] text-7xl">{data.celebrant.age}</h1>
          <p className="mt-4 text-sm text-white/60">{data.celebrant.fullName}</p>
        </Reveal>
      </section>

      {/* ============ COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center border-y border-white/10 px-6 text-center">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c9a24b]">{formatFullDate(data.schedule.date)}</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="luxury-ring" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT + MAPS ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="blur-scale" className="border border-white/10 bg-white/[0.03] p-8 text-center">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#c9a24b]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm text-white/80">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm text-white/80">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-white/50">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" iframeClassName="grayscale contrast-125" buttonClassName="border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black" />
        </Reveal>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="px-6 py-16">
        <Reveal direction="blur-scale" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="gold-line-grid" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="blur-scale" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Ucapan</h2>
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

      {/* ============ GIFT ============ */}
      <section className="border-t border-white/10 px-6 py-16">
        <Reveal direction="blur-scale" className="mx-auto max-w-lg text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Kado</h2>
          <p className="mt-2 text-sm text-white/60">Kehadiran Anda adalah hadiah terbaik. Namun bila berkenan memberi kado:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-white/10 text-left text-white" buttonClassName="border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ CLOSING ============ */}
      <footer className="px-6 py-14 text-center text-white/50">
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-2xl">{data.celebrant.nickname}</p>
        <p className="mt-3 text-xs">Terima kasih atas doa dan kehadiran Anda</p>
      </footer>
    </div>
  );
}
