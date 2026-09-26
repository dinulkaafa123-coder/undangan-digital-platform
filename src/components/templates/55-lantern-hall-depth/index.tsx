"use client";

import type { ReligiousTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { useParallax } from "@/hooks/use-parallax";
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

const FONTS = fontVars({
  "--font-display": "'Cinzel', serif",
  "--font-body": "'Poppins', sans-serif",
});

/**
 * ============================================================
 * LANTERN HALL DEPTH -- template 3D KEAGAMAAN, lentera berlapis kedalaman.
 * ============================================================
 * Lentera-lentera pada beberapa translateZ menciptakan aula malam yang
 * benar-benar berkedalaman -- lentera jauh kecil & buram, lentera dekat
 * besar & bercahaya, konten melayang di tengah ruang.
 */
function LanternHall({ children }: { children: React.ReactNode }) {
  return (
    <div className="perspective-1600 relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="preserve-3d absolute inset-0">
        <OrnamentLantern className="absolute left-[10%] top-[15%] h-16 w-10 text-[#d4af37]/25 blur-[2px]" style={{ transform: "translateZ(-90px)" }} />
        <OrnamentLantern className="absolute right-[12%] top-[20%] h-20 w-12 text-[#d4af37]/45 blur-[1px]" style={{ transform: "translateZ(-45px)" }} />
        <OrnamentLantern className="absolute left-[18%] bottom-[10%] h-24 w-14 text-[#d4af37]" style={{ transform: "translateZ(20px)" }} />
        <OrnamentLantern className="absolute right-[16%] bottom-[15%] h-28 w-16 text-[#d4af37]" style={{ transform: "translateZ(40px)" }} />
      </div>
      <div className="preserve-3d relative z-10" style={{ transform: "translateZ(10px)" }}>
        {children}
      </div>
    </div>
  );
}

export default function LanternHallDepthTemplate({ data, templateSlug, guestName }: ReligiousTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);
  const heroParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative bg-[#faf3ee] font-[family-name:var(--font-body)] text-[#2a1414]">
      {/* ============ 1. OPENING ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 overflow-hidden bg-[#3a1010]">
          <FloatingParticles count={10} particleClassName="bg-[#d4af37]/60" />
          <LanternHall>
            <div
              className="px-6 text-center transition-all duration-1000 ease-in"
              style={{ opacity: phase === "closing" ? 0 : 1, transform: phase === "closing" ? "translateZ(180px) scale(1.8)" : "translateZ(0px) scale(1)" }}
            >
              <OrnamentCrescentStar className="mx-auto h-10 w-10 text-[#d4af37]" />
              {data.hostName && <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[#e7c9c0]">{data.hostName}</p>}
              <h1 className="text-gold-gradient mt-2 font-[family-name:var(--font-display)] text-4xl">{data.title}</h1>
              <p className="mt-6 text-sm text-[#f0dcd4]">Kepada Yth.</p>
              <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
              <div className="mt-9">
                <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#3a1010]">
                  Buka Undangan
                </GoldButton>
              </div>
            </div>
          </LanternHall>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4af37] bg-[#3a1010] text-[#d4af37] animate-pulse-glow" />

      {/* ============ 2. HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        <div ref={heroParallax} className="absolute inset-0 h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroImage} alt={data.title} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf3ee] via-[#faf3ee]/10 to-transparent" />
        <Reveal direction="unfold" className="relative z-10 flex h-full items-end justify-center px-6 pb-14 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-[#3a1010]">{data.title}</h1>
        </Reveal>
      </section>

      {/* ============ 3. CONTENT + LANTERN DEPTH ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <LanternHall>
          <Reveal direction="up" className="mx-auto max-w-lg">
            <p className="text-sm leading-relaxed text-[#5a2a2a]">{data.description}</p>
          </Reveal>
        </LanternHall>
      </section>

      {/* ============ 4. SPEAKER ============ */}
      {data.speaker && (
        <section className="relative px-6 pb-14 text-center">
          <Reveal direction="scale" className="mx-auto max-w-sm border border-[#d4af37]/60 p-6">
            {data.speaker.photoUrl && (
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-[#d4af37]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.speaker.photoUrl} alt={data.speaker.name} className="h-full w-full object-cover" />
              </div>
            )}
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg text-[#3a1010]">{data.speaker.name}</h3>
            {data.speaker.title && <p className="mt-1 text-xs">{data.speaker.title}</p>}
          </Reveal>
        </section>
      )}

      {/* ============ 5. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#3a1010] px-6 text-center text-white">
        <Reveal direction="scale" className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Menuju Hari Acara</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="lantern-glow" pastLabelClassName="text-[#f0dcd4]" />
          </div>
        </Reveal>
      </section>

      {/* ============ 6. EVENT + AGENDA ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="unfold" className="mx-auto max-w-lg border border-[#d4af37]/50 bg-white p-7 text-center">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#8a1a1a]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-[#5a2a2a]">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-[#3a1010] text-[#3a1010] hover:bg-[#3a1010] hover:text-white" />
        </Reveal>
        <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3">
          {data.agenda.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-[#d4af37]/30 pb-2 text-sm">
              <span className="font-semibold text-[#3a1010]">{item.time}</span>
              <span className="text-[#5a2a2a]">{item.activity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 7. GALLERY ============ */}
      <section className="relative bg-[#f3e2da] px-6 py-20">
        <Reveal direction="unfold" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#3a1010]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="museum-wall" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ 8. RSVP ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="unfold" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#3a1010]">Konfirmasi Kehadiran</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#d4af37]/50 bg-white p-6",
              inputClassName: "border-[#d4af37]/60 focus:border-[#3a1010]",
              textareaClassName: "border-[#d4af37]/60 focus:border-[#3a1010]",
              buttonClassName: "bg-[#3a1010] text-white hover:bg-[#5a1a1a]",
              radioClassName: "border-[#d4af37]/60 text-[#5a2a2a]",
              radioActiveClassName: "bg-[#3a1010] text-white border-[#3a1010]",
              wishItemClassName: "border border-[#d4af37]/30 bg-white",
              wishMessageClassName: "text-[#5a2a2a]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
        {data.contactPerson && (
          <p className="mt-8 text-center text-xs text-[#5a2a2a]">
            Kontak: {data.contactPerson.name} &middot; {data.contactPerson.phone}
          </p>
        )}
      </section>

      {/* ============ 9. INFAQ ============ */}
      {data.bankAccounts.length > 0 && (
        <section className="relative bg-[#f3e2da] px-6 py-20 text-center">
          <Reveal direction="scale" className="mx-auto max-w-lg">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#3a1010]">Infaq &amp; Sedekah</h2>
            <div className="mt-8 flex flex-col gap-4">
              {data.bankAccounts.map((acc) => (
                <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/50 bg-white text-left" buttonClassName="border border-[#3a1010] text-[#3a1010] hover:bg-[#3a1010] hover:text-white" />
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ============ 10. CLOSING ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#3a1010] px-6 text-center text-[#d4af37]">
        <OrnamentLantern className="animate-float-slow absolute left-1/2 top-6 h-14 w-8 -translate-x-1/2 text-[#d4af37]/40" />
        <p className="text-gold-gradient relative font-[family-name:var(--font-display)] text-2xl">{data.title}</p>
        <p className="relative mt-3 text-xs text-[#f0dcd4]">Jazakumullahu khairan atas doa restu Anda</p>
      </footer>
    </div>
  );
}
