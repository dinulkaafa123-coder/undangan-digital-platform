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
import { OrnamentDiamondFacet, OrnamentGlassPetal } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";

const FONTS = fontVars({
  "--font-display": "'Bodoni Moda', serif",
  "--font-body": "'Tenor Sans', sans-serif",
});

/**
 * ============================================================
 * INFINITY MIRROR -- template "4D" -- lorong cermin tak berujung.
 * ============================================================
 * Ciri "4D" template ini: BUKAN cuma depth statis (perspective +
 * translateZ sekali render), tapi beberapa lapis bingkai yang terus
 * berputar/berdenyut TANPA HENTI di kecepatan berbeda-beda -- dimensi
 * keempat = waktu yang terus bergerak, bukan cuma kedalaman diam.
 * Setiap lapis pakai `animationDuration` inline berbeda di atas class
 * animasi yang sama (`animate-spin-slow`/`animate-pulse-glow`), teknik
 * yang sama seperti dipakai FloatingParticles.
 */

/** Lorong cermin: beberapa bingkai bersarang yang mengecil ke kedalaman, masing-masing berputar sendiri-sendiri -- dipakai di opening & hero. */
function MirrorTunnel({ layers = 4 }: { layers?: number }) {
  return (
    <div aria-hidden className="perspective-1600 pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="preserve-3d relative h-full w-full">
        {Array.from({ length: layers }).map((_, i) => {
          const depth = -(i + 1) * 90;
          const scale = 1 - i * 0.12;
          const duration = 14 + i * 6;
          return (
            <div
              key={i}
              className="animate-spin-slow absolute inset-0 flex items-center justify-center"
              style={{ transform: `translateZ(${depth}px) scale(${scale})`, animationDuration: `${duration}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
            >
              <div className="h-[70%] w-[55%] rounded-[3rem] border border-[#d4af37]/25" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function InfinityMirrorTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1100);
  const heroParallax = useParallax<HTMLDivElement>(0.12);
  const groomParallax = useParallax<HTMLDivElement>(0.1);
  const brideParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative bg-[#0d0d0f] font-[family-name:var(--font-body)] text-[#f0f0f0]">
      {/* ============ 1. OPENING -- pintu cermin terbuka ke lorong tak berujung ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050506] px-6 text-center">
          <MirrorTunnel layers={5} />
          <FloatingParticles count={14} particleClassName="bg-[#d4af37]/60" />
          <div
            className={
              "relative z-10 transition-all duration-[1100ms] ease-in " +
              (phase === "closing" ? "scale-[4] opacity-0 blur-sm" : "scale-100 opacity-100")
            }
          >
            <OrnamentDiamondFacet className="animate-pulse-glow mx-auto h-16 w-11 text-[#d4af37]" />
            <p className="mt-5 text-xs uppercase tracking-[0.5em] text-[#d4af37]">The Wedding Of</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-6xl italic text-white sm:text-7xl">
              {data.groom.nickname}
              <br />&amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#9a9a9a]">{formatFullDate(data.events[0].date)}</p>
            <p className="mt-8 text-xs tracking-wide text-[#c9c9c9]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#0d0d0f]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4af37] bg-[#0d0d0f] text-[#d4af37] animate-pulse-glow" />

      {/* ============ 2. HERO -- foto di tengah lorong cermin ============ */}
      <section className="scene-h relative flex items-center justify-center overflow-hidden">
        <div ref={heroParallax} className="absolute inset-0 h-[130%] w-full opacity-70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Potret mempelai" className="h-full w-full object-cover grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0f] via-[#0d0d0f]/40 to-[#0d0d0f]" />
        <MirrorTunnel layers={4} />
        <Reveal direction="blur-scale" className="relative z-10 px-6 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[#d4af37]">Reflected Forever</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl italic text-white">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h1>
        </Reveal>
      </section>

      {/* ============ 3. QUOTE + DATE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <Reveal direction="up" className="mx-auto max-w-lg">
          <OrnamentGlassPetal className="mx-auto mb-6 h-14 w-9 text-[#d4af37]/70" />
          <p className="font-[family-name:var(--font-display)] text-xl italic leading-relaxed text-[#e6e6e6]">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-4 text-xs uppercase tracking-widest text-[#d4af37]">{data.quote.source}</p>}
        </Reveal>
        <Reveal direction="scale" delay={150} className="mt-14 border-y border-[#d4af37]/40 px-8 py-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[#9a9a9a]">Save The Date</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl italic">{formatFullDate(data.events[0].date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#050506] px-6 text-center">
        <MirrorTunnel layers={3} />
        <Reveal direction="scale" className="relative z-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37]">Menuju Hari Bahagia</p>
          <div className="mt-8">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="wave-pulse" pastLabelClassName="text-white" />
          </div>
        </Reveal>
      </section>

      {/* ============ 5-6. COUPLE -- dua scene dengan cincin cermin berputar ============ */}
      {[
        { person: data.groom, parallax: groomParallax, label: "Mempelai Pria" },
        { person: data.bride, parallax: brideParallax, label: "Mempelai Wanita" },
      ].map(({ person, parallax, label }, i) => (
        <section key={person.fullName} className="scene-h relative flex flex-col items-center justify-center overflow-hidden px-6 text-center">
          <div className="perspective-1600 relative h-64 w-64">
            <div
              className="preserve-3d animate-spin-slow absolute inset-0 rounded-full border border-[#d4af37]/40"
              style={{ animationDuration: "16s", transform: "translateZ(20px)" }}
            />
            <div
              className="preserve-3d animate-spin-slow absolute inset-3 rounded-full border border-[#c9c9c9]/30"
              style={{ animationDuration: "24s", animationDirection: "reverse" }}
            />
            <div ref={parallax} className="absolute inset-6 overflow-hidden rounded-full border-2 border-[#d4af37]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={person.photoUrl} alt={person.fullName} className="h-[120%] w-full object-cover" />
            </div>
          </div>
          <Reveal direction={i % 2 === 0 ? "left" : "right"} className="mt-6">
            <p className="text-xs uppercase tracking-[0.4em] text-[#d4af37]">{label}</p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-4xl italic text-white">{person.nickname}</h3>
            <p className="mt-1 text-sm text-[#c9c9c9]">{person.fullName}</p>
            <p className="mt-2 text-xs text-[#9a9a9a]">
              {person.childOrder} &middot; {person.parents.father} &amp; {person.parents.mother}
            </p>
          </Reveal>
        </section>
      ))}

      {/* ============ 7. LOVE STORY ============ */}
      <section className="relative bg-[#050506] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-white">Kisah Cinta Kami</h2>
        </Reveal>
        <div className="mx-auto mt-12 flex max-w-lg flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="border border-[#d4af37]/20 p-6 text-center">
              <p className="text-xs uppercase tracking-widest text-[#d4af37]">{moment.date}</p>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg italic text-white">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#c9c9c9]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. EVENT ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-white">Undangan Acara</h2>
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-6">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="blur-scale" delay={i * 150} className="border border-[#d4af37]/30 bg-white/[0.03] p-7 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-xl italic text-[#d4af37]">{event.name}</h3>
              <p className="mt-2 text-sm text-[#c9c9c9]">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-[#c9c9c9]">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium text-white">{event.venueName}</p>
              <p className="text-xs text-[#9a9a9a]">{event.address}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 9. GALLERY ============ */}
      <section className="relative bg-[#050506] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-white">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="carousel-depth" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ 10. LOCATION ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <Reveal direction="scale" className="mx-auto w-full max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-white">Lokasi Acara</h2>
          <p className="mt-2 text-sm text-[#c9c9c9]">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard
            event={data.events[data.events.length - 1]}
            className="mt-6"
            iframeClassName="grayscale contrast-125"
            buttonClassName="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#0d0d0f]"
          />
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-white">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#d4af37]/25 p-6",
              inputClassName: "border-[#d4af37]/30 bg-transparent text-white focus:border-[#d4af37]",
              textareaClassName: "border-[#d4af37]/30 bg-transparent text-white focus:border-[#d4af37]",
              buttonClassName: "bg-[#d4af37] text-[#0d0d0f] hover:bg-[#c9a24b]",
              radioClassName: "border-[#d4af37]/30 text-[#c9c9c9]",
              radioActiveClassName: "bg-[#d4af37] text-[#0d0d0f] border-[#d4af37]",
              labelClassName: "text-[#c9c9c9]",
              wishItemClassName: "border border-[#d4af37]/20",
              wishNameClassName: "text-white",
              wishMessageClassName: "text-[#c9c9c9]",
              wishMetaClassName: "text-[#d4af37]",
            }}
          />
        </div>
      </section>

      {/* ============ 12. GIFT ============ */}
      <section className="relative bg-[#050506] px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-white">Wedding Gift</h2>
          <p className="mt-2 text-sm text-[#c9c9c9]">Doa restu Anda adalah karunia yang berarti. Namun jika ingin memberi tanda kasih:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/25 text-left text-white" buttonClassName="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0d0d0f]" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING -- lorong menyusut ke satu titik ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden px-6 text-center text-[#c9c9c9]">
        <MirrorTunnel layers={5} />
        <p className="text-gold-gradient relative font-[family-name:var(--font-display)] text-4xl italic">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="relative mt-3 text-xs tracking-widest">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
