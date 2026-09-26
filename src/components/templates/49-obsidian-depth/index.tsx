"use client";

import type { InvitationTemplateProps } from "../types";
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
import { OrnamentDiamondFacet, OrnamentArtDecoLines } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";

const FONTS = fontVars({
  "--font-display": "'Cinzel', serif",
  "--font-body": "'Montserrat', sans-serif",
});

/**
 * ============================================================
 * OBSIDIAN DEPTH -- template 3D, panel kaca bersudut dalam ruang nyata.
 * ============================================================
 * Beberapa panel kaca DIMIRINGKAN ke sumbu berbeda (rotateY kiri,
 * rotateY kanan) dan ditumpuk pada translateZ berjenjang -- terasa
 * seperti pecahan kaca melayang di ruang 3D, bukan kartu datar biasa.
 */
function GlassShard({ src, alt, side }: { src: string; alt: string; side: "left" | "right" | "center" }) {
  const parallax = useParallax<HTMLDivElement>(0.09);
  const rotateY = side === "left" ? -18 : side === "right" ? 18 : 0;
  const z = side === "center" ? 40 : 0;
  return (
    <div className="perspective-1600 relative h-72 w-56">
      <div className="preserve-3d h-full w-full transition-transform duration-700" style={{ transform: `translateZ(${z}px) rotateY(${rotateY}deg)` }}>
        <div className="absolute inset-0 overflow-hidden border border-white/20 bg-white/5 shadow-[0_40px_80px_-25px_rgba(0,0,0,0.8)] backdrop-blur-sm">
          <div ref={parallax} className="h-[120%] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="h-full w-full object-cover opacity-90" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 border border-[#c9a24b]/40" />
      </div>
    </div>
  );
}

export default function ObsidianDepthTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative bg-[#050505] font-[family-name:var(--font-body)] text-[#e9e2d0]">
      {/* ============ 1. OPENING ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black px-6 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.coverPhotoUrl} alt="" className="animate-kenburns absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0.95)_65%)]" />
          <FloatingParticles count={10} particleClassName="bg-[#c9a24b]/70" />
          <div
            className="preserve-3d relative z-10 transition-all duration-1000 ease-in"
            style={{ transform: phase === "closing" ? "translateZ(150px) rotateY(90deg)" : "translateZ(0px) rotateY(0deg)", opacity: phase === "closing" ? 0 : 1 }}
          >
            <OrnamentDiamondFacet className="mx-auto h-20 w-14 text-[#c9a24b]" />
            <p className="mt-4 text-xs uppercase tracking-[0.5em] text-[#c9a24b]">The Wedding Of</p>
            <h1 className="text-gold-gradient mt-4 font-[family-name:var(--font-display)] text-5xl tracking-wide">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
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

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#c9a24b] bg-black text-[#c9a24b] animate-pulse-glow" />

      {/* ============ 2. HERO -- tiga panel kaca bersudut ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center gap-4 overflow-hidden px-6 text-center sm:flex-row">
        <GlassShard src={data.groom.photoUrl} alt={data.groom.fullName} side="left" />
        <GlassShard src={data.heroPhotoUrl} alt="Pasangan" side="center" />
        <GlassShard src={data.bride.photoUrl} alt={data.bride.fullName} side="right" />
      </section>

      {/* ============ 3. QUOTE + DATE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <Reveal direction="blur-scale" className="mx-auto max-w-lg">
          <OrnamentArtDecoLines className="mx-auto mb-6 h-6 w-44 text-[#c9a24b]" />
          <p className="font-[family-name:var(--font-display)] text-lg italic leading-relaxed text-white/90">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#c9a24b]">{data.quote.source}</p>}
        </Reveal>
        <Reveal direction="scale" delay={150} className="mt-14 border-y border-white/10 px-8 py-5">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c9a24b]">Save The Date</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">{formatFullDate(data.events[0].date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center border-y border-white/10 px-6 text-center">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c9a24b]">Menuju Hari Bahagia</p>
          <div className="mx-auto mt-10 max-w-sm">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="flip-glow" pastLabelClassName="text-white" />
          </div>
        </Reveal>
      </section>

      {/* ============ 5-6. COUPLE ============ */}
      {[data.groom, data.bride].map((person, i) => (
        <section key={person.fullName} className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
          <GlassShard src={person.photoUrl} alt={person.fullName} side={i % 2 === 0 ? "left" : "right"} />
          <Reveal direction="blur-scale" className="mt-8">
            <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#c9a24b]">{person.nickname}</h3>
            <p className="mt-1 text-sm text-white/80">{person.fullName}</p>
            <p className="mt-3 text-xs leading-relaxed text-white/50">
              {person.childOrder} &middot; {person.parents.father} &amp; {person.parents.mother}
            </p>
          </Reveal>
        </section>
      ))}

      {/* ============ 7. LOVE STORY ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="blur-scale" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Our Story</h2>
        </Reveal>
        <div className="mx-auto mt-12 flex max-w-lg flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="blur-scale" delay={i * 100} className="grid grid-cols-[100px_1fr] gap-4 border-b border-white/10 pb-8">
              <span className="font-[family-name:var(--font-display)] text-sm text-[#c9a24b]">{moment.date}</span>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-base text-white">{moment.title}</h3>
                <p className="mt-1 text-sm text-white/60">{moment.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. EVENT ============ */}
      <section className="relative bg-black px-6 py-20">
        <Reveal direction="blur-scale" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Undangan Acara</h2>
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="blur-scale" delay={i * 150} className="border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#c9a24b]">{event.name}</h3>
              <p className="mt-2 text-sm text-white/80">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-white/80">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium text-white">{event.venueName}</p>
              <p className="text-xs text-white/50">{event.address}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 9. GALLERY ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="blur-scale" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="masonry" />
        </div>
      </section>

      {/* ============ 10. LOCATION ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center border-y border-white/10 px-6 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Lokasi</h2>
          <p className="mt-2 text-sm text-white/70">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard event={data.events[data.events.length - 1]} className="mt-6" iframeClassName="grayscale contrast-125 invert-[0.9]" buttonClassName="border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black" />
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="relative bg-black px-6 py-20">
        <Reveal direction="blur-scale" className="mx-auto max-w-lg text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
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

      {/* ============ 12. GIFT ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="blur-scale" className="mx-auto max-w-lg text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Wedding Gift</h2>
          <p className="mt-2 text-sm text-white/60">Doa restu Anda adalah hadiah terindah. Namun bila berkenan memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-white/10 text-left text-white" buttonClassName="border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING ============ */}
      <footer className="scene-h flex flex-col items-center justify-center px-6 text-center text-white/50">
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-2xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
