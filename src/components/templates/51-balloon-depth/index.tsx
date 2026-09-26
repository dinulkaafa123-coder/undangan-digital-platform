"use client";

import type { BirthdayTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { useParallax } from "@/hooks/use-parallax";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { GoldButton } from "@/components/shared/gold-button";
import { MapsCard } from "@/components/shared/maps-card";
import { BankAccountCard } from "@/components/shared/bank-account-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentBalloon, OrnamentConfettiBurst } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";

const FONTS = fontVars({
  "--font-display": "'Baloo 2', 'Quicksand', sans-serif",
  "--font-body": "'Nunito', sans-serif",
});

/**
 * ============================================================
 * BALLOON DEPTH -- template 3D ULANG TAHUN, balon berlapis kedalaman.
 * ============================================================
 * Balon-balon di beberapa translateZ berbeda -- yang jauh lebih kecil &
 * buram, yang dekat lebih besar & tajam -- menciptakan ruang 3D yang
 * benar-benar terasa, foto ulang tahun jadi pusatnya.
 */
function BalloonDepthFrame({ src, alt }: { src: string; alt: string }) {
  const parallax = useParallax<HTMLDivElement>(0.1);
  return (
    <div className="perspective-1600 relative mx-auto h-80 w-64">
      <div className="preserve-3d relative h-full w-full">
        <OrnamentBalloon className="absolute -left-8 top-0 h-20 w-16 text-[#ff8fab] opacity-50 blur-[2px]" style={{ transform: "translateZ(-70px)" }} />
        <OrnamentBalloon className="absolute -right-6 top-8 h-16 w-14 text-[#5cc9ff] opacity-60 blur-[1px]" style={{ transform: "translateZ(-40px)" }} />
        <div className="absolute inset-4 overflow-hidden rounded-full border-8 border-white shadow-[0_35px_60px_-20px_rgba(0,0,0,0.35)]" style={{ transform: "translateZ(30px)" }}>
          <div ref={parallax} className="h-[120%] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="h-full w-full object-cover" />
          </div>
        </div>
        <OrnamentBalloon className="absolute -bottom-6 -left-6 h-24 w-20 text-[#ffd15c]" style={{ transform: "translateZ(65px)" }} />
        <OrnamentConfettiBurst className="absolute -right-8 -bottom-4 h-20 w-20 text-[#5cc9ff]" style={{ transform: "translateZ(80px)" }} />
      </div>
    </div>
  );
}

export default function BalloonDepthTemplate({ data, templateSlug, guestName }: BirthdayTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(950);

  return (
    <div style={FONTS} className="relative bg-[#fff7ec] font-[family-name:var(--font-body)] text-[#3a2a1a]">
      {/* ============ 1. OPENING ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#ffe1ea] px-6 text-center">
          <div
            className="preserve-3d relative transition-all duration-[950ms] ease-in"
            style={{ transform: phase === "closing" ? "translateZ(260px) scale(2.2)" : "translateZ(0px) scale(1)", opacity: phase === "closing" ? 0 : 1 }}
          >
            <BalloonDepthFrame src={data.celebrant.photoUrl} alt={data.celebrant.fullName} />
          </div>
          <div className="relative z-10 mt-4 transition-opacity duration-500" style={{ opacity: phase === "closing" ? 0 : 1 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-[#ff6f91]">You&apos;re Invited</p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl text-[#ff6f91]">{data.celebrant.nickname}</h1>
            <p className="mt-1 text-lg text-[#5cc9ff]">{data.tagline}</p>
            <p className="mt-6 text-sm text-[#7a5a3a]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-[#3a2a1a]">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="bg-[#ff6f91] text-white shadow-[0_15px_35px_-12px_rgba(255,111,145,0.5)]">
                Buka Undangan 🎈
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#ff6f91] text-white" />

      {/* ============ 2. HERO ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <BalloonDepthFrame src={data.celebrant.photoUrl} alt={data.celebrant.fullName} />
        <Reveal direction="scale" className="mt-8">
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-[#ff6f91]">{data.celebrant.nickname}</h2>
          <p className="mt-1 text-sm text-[#5cc9ff]">{data.tagline}</p>
        </Reveal>
      </section>

      {/* ============ 3. MILESTONE + DATE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#fff0f4] px-6 text-center">
        <Reveal direction="blur-scale">
          <p className="text-xs uppercase tracking-[0.3em] text-[#ff6f91]">Usia yang Dirayakan</p>
          <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-display)] text-8xl">{data.celebrant.age}</h1>
          <p className="mt-3 text-sm text-[#7a5a3a]">{data.celebrant.fullName}</p>
        </Reveal>
        <Reveal direction="scale" delay={150} className="mt-10 rounded-full border-2 border-[#5cc9ff]/50 px-8 py-5">
          <p className="text-xs uppercase tracking-widest text-[#5cc9ff]">Tanggal Pesta</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-xl text-[#3a2a1a]">{formatFullDate(data.schedule.date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#5cc9ff] px-6 text-center text-white">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-widest text-white/80">Hitung Mundur</p>
          <div className="mt-6">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="balloon-badge" pastLabelClassName="text-white" />
          </div>
        </Reveal>
      </section>

      {/* ============ 5. EVENT ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="scale" className="mx-auto max-w-lg border-4 border-[#ffd15c] bg-white p-8 text-center shadow-[0_25px_50px_-25px_rgba(255,209,92,0.5)]">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#ff6f91]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-[#7a5a3a]">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" buttonClassName="rounded-full bg-[#ff6f91] text-white" />
        </Reveal>
      </section>

      {/* ============ 6. GALLERY ============ */}
      <section className="relative bg-[#fff0f4] px-6 py-20">
        <Reveal direction="scale" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#ff6f91]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="balloon-scatter" />
        </div>
      </section>

      {/* ============ 7. RSVP ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="scale" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#ff6f91]">Ucapan</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-3xl border-2 border-[#ffd15c] bg-white p-6",
              inputClassName: "rounded-full border-[#ffe1ea] focus:border-[#ff6f91]",
              textareaClassName: "rounded-2xl border-[#ffe1ea] focus:border-[#ff6f91]",
              buttonClassName: "rounded-full bg-[#ff6f91] text-white",
              radioClassName: "rounded-full border-[#ffe1ea] text-[#7a5a3a]",
              radioActiveClassName: "bg-[#ff6f91] text-white border-[#ff6f91]",
              labelClassName: "text-[#7a5a3a]",
              wishItemClassName: "rounded-2xl border border-[#ffe1ea]",
              wishMessageClassName: "text-[#7a5a3a]",
              wishMetaClassName: "text-[#ff6f91]",
            }}
          />
        </div>
      </section>

      {/* ============ 8. GIFT ============ */}
      <section className="relative bg-[#fff0f4] px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#ff6f91]">Kado</h2>
          <p className="mt-2 text-sm text-[#7a5a3a]">Kehadiranmu adalah hadiah terbaik. Tapi kalau mau kasih kado:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="rounded-2xl border border-[#ffe1ea] bg-white text-left" buttonClassName="rounded-full bg-[#ff6f91] text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 9. CLOSING ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#ff6f91] px-6 text-center text-white">
        <OrnamentConfettiBurst className="pointer-events-none absolute inset-0 h-full w-full opacity-20" />
        <p className="relative font-[family-name:var(--font-display)] text-4xl">{data.celebrant.nickname}</p>
        <p className="relative mt-3 text-xs">Terima kasih atas doa dan kehadiran Anda 🎉</p>
      </footer>
    </div>
  );
}
