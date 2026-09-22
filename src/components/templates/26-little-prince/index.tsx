"use client";

import type { KhitananTemplateProps } from "../types";
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
import { OrnamentLittleCrown, OrnamentStarSparkle } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Comfortaa', sans-serif",
  "--font-body": "'Nunito', sans-serif",
});

/**
 * ============================================================
 * LITTLE PRINCE -- template KHITANAN, konsep "dongeng lembut".
 * ============================================================
 * Nuansa biru-krem storybook dengan awan & bintang, tipografi bulat
 * lembut (Comfortaa) -- kontras total dari Little Sultan yang formal
 * navy-emas dan Islamic Kids yang hijau-geometris.
 */
export default function LittlePrinceTemplate({ data, templateSlug, guestName }: KhitananTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(950);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#eef4fb] font-[family-name:var(--font-body)] text-[#2c3e5c]">
      {/* ============ OPENING: awan terbelah ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-b from-[#bcd6f2] to-[#eef4fb]">
          <div className={cn("absolute inset-x-0 top-0 h-1/2 rounded-b-[50%] bg-white transition-transform duration-[950ms] ease-in-out", phase === "closing" && "-translate-y-full")} />
          <div className={cn("absolute inset-x-0 bottom-0 h-1/2 rounded-t-[50%] bg-white transition-transform duration-[950ms] ease-in-out", phase === "closing" && "translate-y-full")} />
          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <OrnamentLittleCrown className="mx-auto h-14 w-16 text-[#5a7ab0]" />
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-[#5a7ab0]">Walimatul Khitan</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[#2c3e5c] sm:text-5xl">{data.child.nickname}</h1>
            <p className="mt-6 text-sm text-[#5a7ab0]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-[#2c3e5c]">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="bg-[#5a7ab0] text-white shadow-[0_15px_30px_-12px_rgba(90,122,176,0.5)]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-white text-[#5a7ab0] shadow-md" />

      {/* ============ CHILD PHOTO & NAME ============ */}
      <section className="mx-auto max-w-sm px-6 pt-16 text-center">
        <Reveal direction="scale">
          <div className="relative mx-auto h-56 w-56 overflow-hidden border-8 border-white bg-white shadow-[0_25px_50px_-15px_rgba(90,122,176,0.35)]" style={{ borderRadius: "45% 55% 60% 40% / 60% 50% 50% 40%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.child.photoUrl} alt={data.child.fullName} className="h-full w-full object-cover" />
          </div>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl text-[#2c3e5c]">{data.child.nickname}</h1>
          <p className="mt-1 text-sm font-medium">{data.child.fullName}</p>
        </Reveal>
      </section>

      {/* ============ GREETING ============ */}
      <section className="mx-auto max-w-md px-6 py-10 text-center">
        <Reveal direction="up">
          <OrnamentStarSparkle className="mx-auto h-6 w-6 text-[#5a7ab0]" />
          <p className="mt-3 text-sm leading-relaxed text-[#4a5c7c]">{data.greeting.text}</p>
          {data.greeting.source && <p className="mt-2 text-xs uppercase tracking-widest text-[#5a7ab0]">{data.greeting.source}</p>}
        </Reveal>
      </section>

      {/* ============ ANNOUNCEMENT ============ */}
      <section className="mx-auto max-w-md px-6 py-10 text-center">
        <Reveal direction="scale" className="rounded-[2.5rem] bg-white p-8 shadow-[0_20px_40px_-20px_rgba(90,122,176,0.3)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[#5a7ab0]">Telah dikhitankan putra kami</p>
          <p className="mt-4 text-xs uppercase tracking-widest text-[#7a8cae]">{data.child.childOrder}</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-lg text-[#2c3e5c]">
            {data.child.parents.father} &amp; {data.child.parents.mother}
          </p>
        </Reveal>
      </section>

      {/* ============ WEDDING DATE + COUNTDOWN ============ */}
      <section className="bg-[#5a7ab0] px-6 py-16 text-center text-white">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-[0.3em] text-white/80">Insya Allah Pada</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">{formatFullDate(data.schedule.date)}</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="cloud-badge" pastLabelClassName="text-white" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT + MAPS ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="scale" className="rounded-[2.5rem] bg-white p-8 text-center shadow-[0_20px_40px_-20px_rgba(90,122,176,0.3)]">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#2c3e5c]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-[#7a8cae]">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" iframeClassName="rounded-2xl" buttonClassName="rounded-full bg-[#5a7ab0] text-white" />
        </Reveal>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c3e5c]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="cloud-frame" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-md px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c3e5c]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-[2rem] bg-white p-6 shadow-sm",
              inputClassName: "rounded-full border-[#cdd9ef] focus:border-[#5a7ab0]",
              textareaClassName: "rounded-2xl border-[#cdd9ef] focus:border-[#5a7ab0]",
              buttonClassName: "rounded-full bg-[#5a7ab0] text-white",
              radioClassName: "rounded-full border-[#cdd9ef] text-[#4a5c7c]",
              radioActiveClassName: "bg-[#5a7ab0] text-white border-[#5a7ab0]",
              labelClassName: "text-[#4a5c7c]",
              wishItemClassName: "rounded-2xl bg-white shadow-sm",
              wishMessageClassName: "text-[#4a5c7c]",
              wishMetaClassName: "text-[#5a7ab0]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-white px-6 py-16 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c3e5c]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#4a5c7c]">Doa restu Anda sudah menjadi kebahagiaan bagi kami. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="rounded-2xl border border-[#cdd9ef] text-left" buttonClassName="rounded-full border border-[#5a7ab0] text-[#5a7ab0] hover:bg-[#5a7ab0] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ CLOSING ============ */}
      <footer className="px-6 py-14 text-center text-[#4a5c7c]">
        <OrnamentLittleCrown className="mx-auto mb-4 h-10 w-12 text-[#5a7ab0]" />
        <p className="font-[family-name:var(--font-display)] text-2xl text-[#2c3e5c]">{data.child.nickname}</p>
        <p className="mt-2 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
