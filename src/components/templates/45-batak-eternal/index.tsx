"use client";

import type { InvitationTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { useParallax } from "@/hooks/use-parallax";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { PhotoFrame3D } from "@/components/shared/photo-frame-3d";
import { GoldButton } from "@/components/shared/gold-button";
import { FloatingParticles } from "@/components/shared/floating-particles";
import { MapsCard } from "@/components/shared/maps-card";
import { BankAccountCard } from "@/components/shared/bank-account-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentWovenStripes, OrnamentRumahGadang } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Cinzel', serif",
  "--font-body": "'Montserrat', sans-serif",
});

/**
 * ============================================================
 * BATAK ETERNAL -- template "4D", terinspirasi estetika Batak.
 * ============================================================
 * Motif garis anyaman/tenun (lihat `OrnamentWovenStripes`) dan siluet
 * atap rumah panggung -- pola geometris ORIGINAL yang terinspirasi
 * tradisi menenun & arsitektur Nusantara secara umum, BUKAN reproduksi
 * kain/ukiran adat tertentu (mis. ulos/gorga) dan tidak diklaim sebagai
 * representasi akurat satu marga/daerah spesifik.
 *
 * Ciri "4D": beberapa pita anyaman pada kedalaman berbeda terus
 * bergeser secara berkelanjutan seperti kain yang mengalir, bukan
 * pola statis.
 */
function WeavingFlow({ dense = false }: { dense?: boolean }) {
  const layers = [
    { z: -40, duration: "12s", opacity: "text-[#d4af37]/25" },
    { z: -10, duration: "8s", opacity: "text-[#d4af37]/45" },
  ];
  return (
    <div className="perspective-1600 pointer-events-none absolute inset-0 overflow-hidden">
      <div className="preserve-3d relative h-full w-full">
        {layers.slice(0, dense ? 2 : 1).map((l, i) => (
          <div
            key={i}
            className="animate-drift-side absolute inset-x-0"
            style={{ top: `${20 + i * 55}%`, transform: `translateZ(${l.z}px)`, animationDuration: l.duration, animationDirection: i % 2 ? "reverse" : "normal" }}
          >
            <OrnamentWovenStripes className={cn("h-6 w-[140%] -translate-x-[10%]", l.opacity)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BatakEternalTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);
  const heroParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative bg-[#faf3ee] font-[family-name:var(--font-body)] text-[#2a1414]">
      {/* ============ 1. OPENING -- kain anyaman terbentang ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#3a1010] px-6 text-center">
          <WeavingFlow dense />
          <FloatingParticles count={10} particleClassName="bg-[#d4af37]/60" />
          <div
            className={
              "relative z-10 transition-all duration-1000 ease-in " + (phase === "closing" ? "scale-150 opacity-0" : "scale-100 opacity-100")
            }
          >
            <p className="text-xs uppercase tracking-[0.4em] text-[#d4af37]">Undangan Pernikahan</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-[#e7c9c0]/70">terinspirasi estetika Batak</p>
            <h1 className="text-gold-gradient mt-4 font-[family-name:var(--font-display)] text-5xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#f0dcd4]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#3a1010]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4af37] bg-[#3a1010] text-[#d4af37] animate-pulse-glow" />

      {/* ============ 2. HERO ============ */}
      <section className="scene-h relative flex items-end overflow-hidden">
        <div ref={heroParallax} className="absolute inset-0 h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Potret mempelai" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf3ee] via-[#faf3ee]/10 to-transparent" />
        <WeavingFlow />
        <Reveal direction="unfold" className="relative z-10 w-full px-6 pb-14 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#3a1010] sm:text-5xl">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h1>
        </Reveal>
      </section>

      {/* ============ 3. QUOTE + DATE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <WeavingFlow />
        <Reveal direction="up" className="relative mx-auto max-w-lg">
          <p className="font-[family-name:var(--font-display)] text-lg italic leading-relaxed text-[#5a2a2a]">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-4 text-xs uppercase tracking-widest text-[#a8791f]">{data.quote.source}</p>}
        </Reveal>
        <Reveal direction="scale" delay={150} className="relative mt-14 border-y-2 border-[#3a1010] px-8 py-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[#a8791f]">Save The Date</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">{formatFullDate(data.events[0].date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#3a1010] px-6 text-center text-white">
        <WeavingFlow dense />
        <Reveal direction="scale" className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Menuju Hari Bahagia</p>
          <div className="mt-8">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="mono-badge" pastLabelClassName="text-[#f0dcd4]" />
          </div>
        </Reveal>
      </section>

      {/* ============ 5-6. COUPLE ============ */}
      <section className="relative px-6 py-20">
        <div className="mx-auto flex max-w-lg flex-col gap-16">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction={i % 2 === 0 ? "left" : "right"} delay={i * 120} className="flex flex-col items-center text-center">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="h-44 w-44 rounded-full"
                frameClassName="border-4 border-[#d4af37]"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-5deg)]" : "[transform:rotateY(5deg)]"}
              />
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-3xl text-[#8a1a1a]">{person.nickname}</h3>
              <p className="mt-1 text-lg">{person.fullName}</p>
              <p className="mt-2 text-sm text-[#5a2a2a]">
                {person.childOrder} &middot; {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 7. LOVE STORY ============ */}
      <section className="relative bg-[#f3e2da] px-6 py-20">
        <Reveal direction="unfold" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#3a1010]">Perjalanan Kasih</h2>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-lg grid-cols-1 gap-6 sm:grid-cols-2">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="scale" delay={i * 100} className="border border-[#d4af37]/40 bg-white p-5 text-center">
              <p className="text-xs uppercase tracking-widest text-[#a8791f]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)] text-lg text-[#3a1010]">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#5a2a2a]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. EVENT ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="unfold" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#3a1010]">Undangan Acara</h2>
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-6">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="up" delay={i * 150} className="border border-[#d4af37]/50 bg-white p-7 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#8a1a1a]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#5a2a2a]">{event.address}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 9. GALLERY ============ */}
      <section className="relative bg-[#f3e2da] px-6 py-20">
        <Reveal direction="unfold" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#3a1010]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="museum-wall" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ 10. LOCATION ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#3a1010] px-6 text-center text-white">
        <Reveal direction="scale" className="mx-auto w-full max-w-md">
          <OrnamentRumahGadang className="mx-auto mb-4 h-10 w-32 text-[#d4af37]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Lokasi Acara</h2>
          <p className="mt-2 text-sm text-[#f0dcd4]">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard event={data.events[data.events.length - 1]} className="mt-6" iframeClassName="grayscale" buttonClassName="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#3a1010]" />
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="unfold" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#3a1010]">Ucapan &amp; Doa</h2>
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
              labelClassName: "text-[#5a2a2a]",
              wishItemClassName: "border border-[#d4af37]/30 bg-white",
              wishMessageClassName: "text-[#5a2a2a]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ 12. GIFT ============ */}
      <section className="relative bg-[#f3e2da] px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#3a1010]">Wedding Gift</h2>
          <p className="mt-2 text-sm text-[#5a2a2a]">Kehadiran & doa restu Anda adalah kebahagiaan bagi kami. Bila hendak memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/50 bg-white text-left" buttonClassName="border border-[#3a1010] text-[#3a1010] hover:bg-[#3a1010] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#3a1010] px-6 text-center text-[#d4af37]">
        <WeavingFlow dense />
        <p className="text-gold-gradient relative font-[family-name:var(--font-display)] text-3xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="relative mt-3 text-xs text-[#f0dcd4]">Mauliate, matur nuwun atas doa restu Anda</p>
      </footer>
    </div>
  );
}
