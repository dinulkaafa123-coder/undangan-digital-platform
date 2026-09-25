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
import { OrnamentMoonGlow, OrnamentConstellationLines } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";

const FONTS = fontVars({
  "--font-display": "'Cinzel', serif",
  "--font-body": "'Cormorant Garamond', serif",
});

/**
 * ============================================================
 * ETERNAL ORBIT -- template "4D" -- cincin cahaya mengorbit tanpa henti.
 * ============================================================
 * Ciri "4D": beberapa cincin cahaya di kedalaman (translateZ) BERBEDA,
 * masing-masing berputar TERUS-MENERUS dengan arah & kecepatan sendiri
 * mengelilingi potret -- bukan cuma dekorasi statis. Dimensi keempat =
 * waktu yang divisualkan sebagai gerak orbit yang tidak pernah berhenti.
 */
function OrbitRings({ size = "h-72 w-72" }: { size?: string }) {
  const rings = [
    { z: 30, duration: 14, reverse: false, inset: "inset-0", opacity: "border-[#e8cb84]/60" },
    { z: -10, duration: 22, reverse: true, inset: "inset-6", opacity: "border-[#9fb6c4]/40" },
    { z: -40, duration: 30, reverse: false, inset: "inset-12", opacity: "border-[#e8cb84]/25" },
  ];
  return (
    <div className={`perspective-1600 relative ${size}`}>
      <div className="preserve-3d relative h-full w-full">
        {rings.map((ring, i) => (
          <div
            key={i}
            className={`animate-spin-slow preserve-3d absolute ${ring.inset} rounded-full border ${ring.opacity}`}
            style={{ transform: `translateZ(${ring.z}px)`, animationDuration: `${ring.duration}s`, animationDirection: ring.reverse ? "reverse" : "normal" }}
          >
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#e8cb84] shadow-[0_0_10px_3px_rgba(232,203,132,0.6)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EternalOrbitTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1100);
  const heroParallax = useParallax<HTMLDivElement>(0.12);

  return (
    <div style={FONTS} className="relative bg-[#0a0a2e] font-[family-name:var(--font-body)] text-[#f3ede0]">
      {/* ============ 1. OPENING -- cincin cahaya konvergen dari kejauhan ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#050518] px-6 text-center">
          <FloatingParticles count={24} particleClassName="bg-white/70" />
          <div
            className={
              "relative transition-all duration-[1100ms] ease-in " +
              (phase === "closing" ? "scale-[3] opacity-0" : "scale-100 opacity-100")
            }
          >
            <OrbitRings size="h-52 w-52" />
          </div>
          <div className={"relative z-10 -mt-10 transition-opacity duration-500 " + (phase === "closing" ? "opacity-0" : "opacity-100")}>
            <p className="text-xs uppercase tracking-[0.5em] text-[#e8cb84]">Written in Eternal Motion</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-6xl text-white sm:text-7xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#9fb6c4]">{formatFullDate(data.events[0].date)}</p>
            <p className="mt-8 text-xs tracking-wide text-[#c9c3b3]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#e8cb84] text-[#f3ede0] shadow-[0_0_40px_-10px_rgba(232,203,132,0.6)] hover:bg-[#e8cb84] hover:text-[#0a0a2e]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#e8cb84] bg-[#0a0a2e] text-[#e8cb84] animate-pulse-glow" />

      {/* ============ 2. HERO -- potret dikelilingi orbit ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <FloatingParticles count={18} particleClassName="bg-white/60" />
        <div className="relative">
          <OrbitRings />
          <div ref={heroParallax} className="absolute inset-16 overflow-hidden rounded-full border-2 border-[#e8cb84]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.heroPhotoUrl} alt="Potret mempelai" className="h-[130%] w-full object-cover" />
          </div>
        </div>
        <Reveal direction="rise" className="relative z-10 mt-8">
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#e8cb84]">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h1>
        </Reveal>
      </section>

      {/* ============ 3. QUOTE + DATE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <OrnamentConstellationLines className="pointer-events-none absolute -right-10 top-10 h-32 w-56 text-[#9fb6c4]/30" />
        <Reveal direction="rise" className="mx-auto max-w-lg">
          <p className="font-[family-name:var(--font-display)] text-xl italic leading-relaxed text-[#f3ede0]">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-4 text-xs uppercase tracking-widest text-[#e8cb84]">{data.quote.source}</p>}
        </Reveal>
        <Reveal direction="scale" delay={150} className="mt-14 border-y border-[#e8cb84]/40 px-8 py-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[#9fb6c4]">Save The Date</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">{formatFullDate(data.events[0].date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center border-y border-white/10 px-6 text-center">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-[0.35em] text-[#e8cb84]">Menghitung Waktu Menuju Bahagia</p>
          <div className="mt-8">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="crown-badge" pastLabelClassName="text-white" />
          </div>
        </Reveal>
      </section>

      {/* ============ 5-6. COUPLE -- dua scene dengan orbit terpisah ============ */}
      {[data.groom, data.bride].map((person, i) => (
        <section key={person.fullName} className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
          <div className="relative">
            <OrbitRings size="h-64 w-64" />
            <div className="absolute inset-14 overflow-hidden rounded-full border-2 border-[#e8cb84]/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={person.photoUrl} alt={person.fullName} className="h-full w-full object-cover" />
            </div>
          </div>
          <Reveal direction={i % 2 === 0 ? "left" : "right"} className="mt-8">
            <h3 className="font-[family-name:var(--font-display)] text-4xl text-[#e8cb84]">{person.nickname}</h3>
            <p className="mt-1 text-sm text-[#f3ede0]">{person.fullName}</p>
            <p className="mt-2 text-xs text-[#9fb6c4]">
              {person.childOrder} &middot; {person.parents.father} &amp; {person.parents.mother}
            </p>
          </Reveal>
        </section>
      ))}

      {/* ============ 7. LOVE STORY ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#e8cb84]">Perputaran Waktu Kami</h2>
        </Reveal>
        <div className="relative mx-auto mt-12 flex max-w-lg flex-col gap-10 pl-7">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-[repeating-linear-gradient(180deg,#e8cb84_0px,#e8cb84_3px,transparent_3px,transparent_9px)] opacity-40" />
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="relative">
              <span className="absolute -left-7 top-1 h-3.5 w-3.5 rounded-full bg-[#e8cb84] shadow-[0_0_10px_3px_rgba(232,203,132,0.4)]" />
              <p className="text-xs uppercase tracking-widest text-[#e8cb84]">{moment.date}</p>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg text-white">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#c9c3b3]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. EVENT ============ */}
      <section className="relative bg-[#050518] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#e8cb84]">Undangan Acara</h2>
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-6">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="depth" delay={i * 150} className="border border-[#e8cb84]/25 p-7 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#e8cb84]">{event.name}</h3>
              <p className="mt-2 text-sm text-[#c9c3b3]">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-[#c9c3b3]">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium text-white">{event.venueName}</p>
              <p className="text-xs text-[#9fb6c4]">{event.address}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 9. GALLERY ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#e8cb84]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="floating-frames" accentClassName="border-[#e8cb84]/60" />
        </div>
      </section>

      {/* ============ 10. LOCATION ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center border-y border-white/10 px-6 text-center">
        <Reveal direction="scale" className="mx-auto max-w-md">
          <OrnamentMoonGlow className="mx-auto mb-4 h-12 w-12 text-[#e8cb84]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#e8cb84]">Lokasi Acara</h2>
          <p className="mt-2 text-sm text-[#c9c3b3]">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard
            event={data.events[data.events.length - 1]}
            className="mt-6"
            iframeClassName="grayscale invert-[0.9] contrast-125"
            buttonClassName="border border-[#e8cb84] text-[#e8cb84] hover:bg-[#e8cb84] hover:text-[#0a0a2e]"
          />
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#e8cb84]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-white/15 p-6",
              inputClassName: "border-white/20 bg-transparent text-white focus:border-[#e8cb84]",
              textareaClassName: "border-white/20 bg-transparent text-white focus:border-[#e8cb84]",
              buttonClassName: "bg-[#e8cb84] text-[#0a0a2e] hover:bg-[#d4b56a]",
              radioClassName: "border-white/20 text-white/70",
              radioActiveClassName: "bg-[#e8cb84] text-[#0a0a2e] border-[#e8cb84]",
              labelClassName: "text-white/70",
              wishItemClassName: "border border-white/10",
              wishNameClassName: "text-white",
              wishMessageClassName: "text-white/60",
              wishMetaClassName: "text-[#e8cb84]",
            }}
          />
        </div>
      </section>

      {/* ============ 12. GIFT ============ */}
      <section className="relative border-y border-white/10 px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#e8cb84]">Wedding Gift</h2>
          <p className="mt-2 text-sm text-[#c9c3b3]">Doa restu Anda sudah lebih dari cukup. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-white/10 text-left text-white" buttonClassName="border border-[#e8cb84] text-[#e8cb84] hover:bg-[#e8cb84] hover:text-[#0a0a2e]" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING -- orbit menyatu kembali ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center px-6 text-center text-[#c9c3b3]">
        <div className="relative">
          <OrbitRings size="h-40 w-40" />
        </div>
        <p className="text-gold-gradient relative -mt-6 font-[family-name:var(--font-display)] text-3xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="relative mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
