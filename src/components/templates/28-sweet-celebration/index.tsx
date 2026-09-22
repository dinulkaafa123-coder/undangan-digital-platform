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
import { OrnamentBalloon, OrnamentConfettiBurst, OrnamentBunting } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Caveat', cursive",
  "--font-body": "'Quicksand', sans-serif",
});

/**
 * ============================================================
 * SWEET CELEBRATION -- template ULANG TAHUN, konsep "pesta pastel".
 * ============================================================
 * Balon, konfeti, dan bunting jadi bagian layout (bukan cuma cover),
 * angka usia jadi focal point besar -- beda total dari wedding manapun
 * (tidak ada pasangan, tidak ada akad/resepsi/love story).
 */
export default function SweetCelebrationTemplate({ data, templateSlug, guestName }: BirthdayTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(950);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#fff8f2] font-[family-name:var(--font-body)] text-[#5a3a44]">
      {/* ============ OPENING: balon naik ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#fde9ef]">
          <div className="absolute inset-0 flex items-end justify-around px-4">
            {["#f7b6c8", "#b6d8f7", "#fde08a", "#c8f0c0"].map((color, i) => (
              <div
                key={i}
                className={cn("transition-transform ease-out", phase === "closing" ? "translate-y-[-120vh]" : "translate-y-0")}
                style={{ transitionDuration: `${900 + i * 150}ms`, color }}
              >
                <OrnamentBalloon className="h-32 w-16 sm:h-40 sm:w-20" />
              </div>
            ))}
          </div>
          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.4em] text-[#c9789a]">You&rsquo;re Invited</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-7xl text-[#c9789a]">{data.celebrant.nickname}</h1>
            <p className="mt-2 text-xl font-semibold text-[#5a3a44]">Sweet {data.celebrant.age}</p>
            <p className="mt-6 text-sm text-[#8a5a6a]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-[#5a3a44]">{guestName}</p>
            <div className="mt-8">
              <GoldButton onClick={openInvitation} className="bg-[#c9789a] text-white shadow-[0_15px_30px_-12px_rgba(201,120,154,0.5)]">
                Buka Undangan 🎉
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#c9789a] text-white" />

      <OrnamentBunting className="mx-auto mt-6 h-8 w-[85%] text-[#c9789a]" />

      {/* ============ CELEBRANT + AGE ============ */}
      <section className="scene-h mx-auto flex max-w-sm flex-col items-center justify-center px-6 text-center">
        <Reveal direction="scale">
          <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full border-8 border-white shadow-[0_25px_50px_-15px_rgba(201,120,154,0.4)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.celebrant.photoUrl} alt={data.celebrant.fullName} className="h-full w-full object-cover" />
          </div>
          <p className="mt-6 font-[family-name:var(--font-display)] text-3xl text-[#c9789a]">{data.tagline}</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-6xl text-[#5a3a44]">{data.celebrant.nickname}</h1>
          <p className="mt-1 text-sm font-medium">{data.celebrant.fullName}</p>
        </Reveal>
      </section>

      {/* ============ COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#fde9ef] px-6 text-center">
        <OrnamentConfettiBurst className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 text-[#c9789a]/30" />
        <Reveal direction="scale" className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8a5a6a]">Menuju Hari Bahagia</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[#5a3a44]">{formatFullDate(data.schedule.date)}</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="balloon-badge" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT + MAPS ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="scale" className="rounded-[2rem] border-2 border-[#f7cfe0] bg-white p-8 text-center shadow-[0_20px_40px_-20px_rgba(201,120,154,0.3)]">
          <h3 className="font-[family-name:var(--font-display)] text-2xl text-[#c9789a]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-[#8a5a6a]">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" iframeClassName="rounded-2xl" buttonClassName="rounded-full bg-[#c9789a] text-white" />
        </Reveal>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#c9789a]">Momen Seru</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="balloon-scatter" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-md px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#c9789a]">Ucapan Untukku</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-[2rem] bg-white p-6 shadow-sm",
              inputClassName: "rounded-full border-[#f7cfe0] focus:border-[#c9789a]",
              textareaClassName: "rounded-2xl border-[#f7cfe0] focus:border-[#c9789a]",
              buttonClassName: "rounded-full bg-[#c9789a] text-white",
              radioClassName: "rounded-full border-[#f7cfe0] text-[#8a5a6a]",
              radioActiveClassName: "bg-[#c9789a] text-white border-[#c9789a]",
              labelClassName: "text-[#8a5a6a]",
              wishItemClassName: "rounded-2xl bg-white shadow-sm",
              wishMessageClassName: "text-[#8a5a6a]",
              wishMetaClassName: "text-[#c9789a]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#fde9ef] px-6 py-16 text-center">
        <Reveal direction="scale" className="mx-auto max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#c9789a]">Kado Untukku</h2>
          <p className="mt-2 text-sm text-[#8a5a6a]">Kehadiranmu sudah jadi kado terbaik. Tapi kalau mau kasih hadiah, boleh banget:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="rounded-2xl bg-white text-left shadow-sm" buttonClassName="rounded-full bg-[#c9789a] text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ CLOSING ============ */}
      <footer className="px-6 py-14 text-center text-[#8a5a6a]">
        <p className="font-[family-name:var(--font-display)] text-4xl text-[#c9789a]">{data.celebrant.nickname}</p>
        <p className="mt-2 text-xs">Terima kasih sudah merayakan hari spesialku 🎂</p>
      </footer>
    </div>
  );
}
