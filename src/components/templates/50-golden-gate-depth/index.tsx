"use client";

import type { KhitananTemplateProps } from "../types";
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
import { OrnamentIslamicArch, OrnamentLittleCrown } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";

const FONTS = fontVars({
  "--font-display": "'Amiri', serif",
  "--font-body": "'Poppins', sans-serif",
});

/**
 * ============================================================
 * GOLDEN GATE DEPTH -- template 3D KHITANAN, gerbang berlapis nyata.
 * ============================================================
 * Tiga lengkung gerbang pada translateZ berjenjang menciptakan lorong
 * yang benar-benar memanjang ke kedalaman -- foto anak muncul di ujung
 * lorong, dikelilingi lengkung yang semakin besar & tajam ke depan.
 */
function ArchTunnel({ children }: { children: React.ReactNode }) {
  return (
    <div className="perspective-1600 relative flex h-full w-full items-center justify-center">
      <div className="preserve-3d relative h-72 w-56">
        <OrnamentIslamicArch className="absolute inset-0 h-full w-full text-[#d4af37]/25" style={{ transform: "translateZ(-80px) scale(1.3)" }} />
        <OrnamentIslamicArch className="absolute inset-4 text-[#d4af37]/55" style={{ transform: "translateZ(-30px) scale(1.12)" }} />
        <OrnamentIslamicArch className="absolute inset-8 text-[#d4af37]" style={{ transform: "translateZ(30px)" }} />
        <div className="preserve-3d absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(50px)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function GoldenGateDepthTemplate({ data, templateSlug, guestName }: KhitananTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);
  const parallax = useParallax<HTMLDivElement>(0.08);

  return (
    <div style={FONTS} className="relative bg-[#f6f1e2] font-[family-name:var(--font-body)] text-[#1c3327]">
      {/* ============ 1. OPENING ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0f3d2e] px-6 text-center">
          <FloatingParticles count={12} particleClassName="bg-[#d4af37]/70" />
          <div
            className="preserve-3d relative transition-all duration-1000 ease-in"
            style={{ transform: phase === "closing" ? "translateZ(200px) scale(2)" : "translateZ(0px) scale(1)", opacity: phase === "closing" ? 0 : 1 }}
          >
            <ArchTunnel>
              <div className="h-32 w-24 overflow-hidden rounded-t-full border-2 border-[#d4af37]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.child.photoUrl} alt={data.child.fullName} className="h-full w-full object-cover" />
              </div>
            </ArchTunnel>
          </div>
          <div className="relative z-10 mt-4 transition-opacity duration-500" style={{ opacity: phase === "closing" ? 0 : 1 }}>
            <p className="text-xs uppercase tracking-[0.4em] text-[#d4af37]">Walimatul Khitan</p>
            <h1 className="text-gold-gradient mt-2 font-[family-name:var(--font-display)] text-4xl">{data.child.nickname}</h1>
            <p className="mt-6 text-sm text-[#e2d6b8]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#0f3d2e]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#0f3d2e] text-[#d4af37]" />

      {/* ============ 2. HERO -- lorong gerbang emas ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <ArchTunnel>
          <div ref={parallax} className="h-40 w-32 overflow-hidden rounded-t-full border-4 border-[#d4af37]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.child.photoUrl} alt={data.child.fullName} className="h-[130%] w-full object-cover" />
          </div>
        </ArchTunnel>
        <Reveal direction="wipe" className="relative z-10 mt-4">
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#0f3d2e]">{data.child.nickname}</h1>
        </Reveal>
      </section>

      {/* ============ 3. GREETING + DATE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <Reveal direction="wipe" className="mx-auto max-w-lg">
          <OrnamentLittleCrown className="mx-auto mb-4 h-10 w-12 text-[#d4af37]" />
          <p className="font-[family-name:var(--font-display)] text-lg italic leading-relaxed text-[#1c3327]">&ldquo;{data.greeting.text}&rdquo;</p>
          {data.greeting.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#a8791f]">{data.greeting.source}</p>}
        </Reveal>
        <Reveal direction="scale" delay={150} className="mt-14 border-y border-[#d4af37] px-8 py-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[#a8791f]">Insya Allah</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-xl">{formatFullDate(data.schedule.date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#0f3d2e] px-6 text-center text-[#f6f1e2]">
        <Reveal direction="scale" className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e2d6b8]">Menuju Hari Bahagia</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="geometric-badge" pastLabelClassName="text-[#e2d6b8]" />
          </div>
        </Reveal>
      </section>

      {/* ============ 5. FAMILY ============ */}
      {(data.familyName || data.child.parents.father) && (
        <section className="relative px-6 py-20 text-center">
          <Reveal direction="wipe">
            <p className="text-xs uppercase tracking-widest text-[#a8791f]">{data.child.childOrder}</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-lg text-[#0f3d2e]">
              {data.child.parents.father} &amp; {data.child.parents.mother}
            </p>
            {data.familyName && <p className="mt-2 text-xs text-[#4a5c50]">{data.familyName}</p>}
          </Reveal>
        </section>
      )}

      {/* ============ 6. EVENT ============ */}
      <section className="relative bg-[#eee3c4] px-6 py-20">
        <Reveal direction="scale" className="mx-auto max-w-md border-2 border-[#d4af37] p-8 text-center">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#0f3d2e]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-[#4a5c50]">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-[#0f3d2e] text-[#0f3d2e] hover:bg-[#0f3d2e] hover:text-white" />
        </Reveal>
      </section>

      {/* ============ 7. GALLERY ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="wipe" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#0f3d2e]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="arch-grid" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ 8. RSVP ============ */}
      <section className="relative bg-[#eee3c4] px-6 py-20">
        <Reveal direction="wipe" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#0f3d2e]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-lg border border-[#d4af37]/50 bg-white p-6",
              inputClassName: "border-[#d4af37]/60 focus:border-[#0f3d2e]",
              textareaClassName: "border-[#d4af37]/60 focus:border-[#0f3d2e]",
              buttonClassName: "bg-[#0f3d2e] text-white hover:bg-[#173f31]",
              radioClassName: "border-[#d4af37]/60 text-[#4a5c50]",
              radioActiveClassName: "bg-[#0f3d2e] text-white border-[#0f3d2e]",
              labelClassName: "text-[#4a5c50]",
              wishItemClassName: "border border-[#d4af37]/30 bg-white",
              wishMessageClassName: "text-[#4a5c50]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ 9. GIFT ============ */}
      <section className="relative px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#0f3d2e]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#4a5c50]">Doa restu adalah karunia bagi kami. Bila hendak memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/50 bg-[#f6f1e2] text-left" buttonClassName="border border-[#0f3d2e] text-[#0f3d2e] hover:bg-[#0f3d2e] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 10. CLOSING ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#0f3d2e] px-6 text-center text-[#d4af37]">
        <OrnamentLittleCrown className="mx-auto mb-4 h-10 w-12" />
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-3xl">{data.child.nickname}</p>
        <p className="mt-3 text-xs text-[#e2d6b8]">Jazakumullahu khairan atas doa restu Anda</p>
      </footer>
    </div>
  );
}
