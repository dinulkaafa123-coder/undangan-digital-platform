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
import { OrnamentConfettiBurst, OrnamentBunting } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Poppins', sans-serif",
  "--font-body": "'Nunito', sans-serif",
});

/**
 * ============================================================
 * PARTY POP -- template ULANG TAHUN, konsep "pop-art energik".
 * ============================================================
 * Warna blok berani, bentuk miring, border tebal hitam ala komik/pop-art
 * -- benar-benar berbeda dari Sweet Celebration (pastel lembut) dan
 * Birthday Luxury (hitam-emas elegan).
 */
export default function PartyPopTemplate({ data, templateSlug, guestName }: BirthdayTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(900);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#fff3d6] font-[family-name:var(--font-body)] text-[#1a1a1a]">
      {/* ============ OPENING: ledakan konfeti ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#ff5c7a] px-6 text-center">
          <OrnamentConfettiBurst className={cn("absolute left-1/2 top-1/2 h-[140vw] w-[140vw] max-w-none -translate-x-1/2 -translate-y-1/2 text-white/40 transition-transform duration-[900ms] ease-out sm:h-[80vw] sm:w-[80vw]", phase === "closing" ? "scale-[3] opacity-0" : "scale-100 opacity-100")} />
          <div className={cn("relative z-10 transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <div className="-rotate-3 border-4 border-black bg-[#ffe14d] px-6 py-2 text-sm font-black uppercase tracking-wide shadow-[4px_4px_0_#000]">You&rsquo;re Invited!</div>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-6xl font-black text-white [text-shadow:3px_3px_0_#000]">{data.celebrant.nickname}</h1>
            <p className="mt-2 rotate-2 text-2xl font-black text-[#ffe14d] [text-shadow:2px_2px_0_#000]">Turning {data.celebrant.age}!</p>
            <p className="mt-6 text-sm text-white">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg font-bold text-white">{guestName}</p>
            <div className="mt-8">
              <GoldButton onClick={openInvitation} className="border-4 border-black bg-[#ffe14d] text-black shadow-[4px_4px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none">
                Buka Undangan 🎉
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border-4 border-black bg-[#ffe14d] text-black" />

      <OrnamentBunting className="mx-auto mt-6 h-8 w-[85%] text-[#ff5c7a]" />

      {/* ============ CELEBRANT ============ */}
      <section className="scene-h mx-auto flex max-w-sm flex-col items-center justify-center px-6 text-center">
        <Reveal direction="drop">
          <div className="-rotate-2 border-4 border-black bg-white p-2 shadow-[6px_6px_0_#000]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.celebrant.photoUrl} alt={data.celebrant.fullName} className="aspect-square w-full object-cover" />
          </div>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-black text-[#ff5c7a]">{data.celebrant.nickname}</h1>
          <p className="mt-1 text-sm font-bold">{data.celebrant.fullName}</p>
          <p className="mt-3 inline-block rotate-1 border-4 border-black bg-[#5cc9ff] px-4 py-1 text-lg font-black shadow-[3px_3px_0_#000]">{data.tagline}</p>
        </Reveal>
      </section>

      {/* ============ COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#5cc9ff] px-6 text-center">
        <Reveal direction="drop">
          <p className="text-sm font-black uppercase tracking-wide">{formatFullDate(data.schedule.date)}</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="confetti-burst" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT + MAPS ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="drop" className="-rotate-1 border-4 border-black bg-white p-8 text-center shadow-[6px_6px_0_#000]">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-black text-[#ff5c7a]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm font-semibold">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm font-semibold">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-bold">{data.schedule.venueName}</p>
          <p className="text-xs">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" buttonClassName="border-2 border-black bg-[#ffe14d] text-black shadow-[3px_3px_0_#000]" />
        </Reveal>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-black text-[#ff5c7a]">Momen Seru</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="confetti-mosaic" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-md px-6 py-16">
        <Reveal direction="drop" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-black text-[#ff5c7a]">Kirim Ucapan</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border-4 border-black bg-white p-6 shadow-[5px_5px_0_#000]",
              inputClassName: "border-2 border-black focus:border-[#ff5c7a]",
              textareaClassName: "border-2 border-black focus:border-[#ff5c7a]",
              buttonClassName: "border-2 border-black bg-[#ffe14d] text-black shadow-[3px_3px_0_#000]",
              radioClassName: "border-2 border-black text-black",
              radioActiveClassName: "bg-[#ff5c7a] text-white border-black",
              wishItemClassName: "border-2 border-black bg-[#fff3d6]",
              wishMessageClassName: "text-[#1a1a1a]",
              wishMetaClassName: "font-black text-[#ff5c7a]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#ffe14d] px-6 py-16 text-center">
        <Reveal direction="drop" className="mx-auto max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-black">Kado</h2>
          <p className="mt-2 text-sm font-semibold">Kehadiranmu udah paling seru. Tapi kalau mau kasih kado, boleh banget:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border-4 border-black bg-white text-left shadow-[4px_4px_0_#000]" buttonClassName="border-2 border-black bg-[#ff5c7a] text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ CLOSING ============ */}
      <footer className="border-t-4 border-black bg-[#ff5c7a] px-6 py-14 text-center text-white">
        <p className="font-[family-name:var(--font-display)] text-4xl font-black [text-shadow:2px_2px_0_#000]">{data.celebrant.nickname}</p>
        <p className="mt-2 text-xs font-semibold">Makasih udah dateng ke pestaku! 🎈</p>
      </footer>
    </div>
  );
}
