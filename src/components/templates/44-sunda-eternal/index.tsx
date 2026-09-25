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
import { OrnamentBambooCluster, OrnamentGapura } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Cormorant Garamond', serif",
  "--font-body": "'Quicksand', sans-serif",
});

/**
 * ============================================================
 * SUNDA ETERNAL -- template "4D", terinspirasi estetika Sunda /
 * dataran tinggi Parahyangan.
 * ============================================================
 * Rumpun bambu & kabut pegunungan sebagai motif utama -- terinspirasi
 * lanskap & estetika Sunda secara umum, desain ORIGINAL, bukan
 * reproduksi adat/ritual tertentu.
 *
 * Ciri "4D": rumpun bambu bergoyang terus-menerus di kedalaman berbeda
 * (animasi berkelanjutan, bukan sekali reveal), lapisan kabut melayang
 * pelan di belakangnya seolah pegunungan itu benar-benar hidup.
 */
function BambooMist({ dense = false }: { dense?: boolean }) {
  const layers = [
    { z: -50, scale: 0.75, duration: "6s", opacity: "text-[#4a6b52]/20" },
    { z: -10, scale: 0.95, duration: "4.5s", opacity: "text-[#4a6b52]/40" },
  ];
  return (
    <div className="perspective-1600 pointer-events-none absolute inset-0 overflow-hidden">
      <div className="preserve-3d relative h-full w-full">
        {layers.slice(0, dense ? 2 : 1).map((l, i) => (
          <div
            key={i}
            className="animate-sway-leaf absolute -left-6 bottom-0"
            style={{ transform: `translateZ(${l.z}px) scale(${l.scale})`, animationDuration: l.duration, transformOrigin: "bottom center" }}
          >
            <OrnamentBambooCluster className={cn("h-56 w-40", l.opacity)} />
          </div>
        ))}
        <div className="animate-float-slower absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" style={{ animationDuration: "10s" }} />
      </div>
    </div>
  );
}

export default function SundaEternalTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);
  const heroParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative bg-[#f4f7f2] font-[family-name:var(--font-body)] text-[#2f3d31]">
      {/* ============ 1. OPENING -- kabut pegunungan terbuka ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#2c3327]">
          <BambooMist dense />
          <FloatingParticles count={10} particleClassName="bg-white/40" />
          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.35em] text-[#bcd4c0]">Undangan Pernikahan</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-[#bcd4c0]/60">terinspirasi estetika Sunda</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-6xl italic text-white">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#dce8de]">Dengan bagja, kami ngondang</p>
            <p className="font-[family-name:var(--font-display)] text-lg italic text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="bg-white text-[#3f5a44] shadow-[0_15px_35px_-12px_rgba(0,0,0,0.4)]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#3f5a44] text-white" />

      {/* ============ 2. HERO ============ */}
      <section className="scene-h relative flex items-end overflow-hidden">
        <div ref={heroParallax} className="absolute inset-0 h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f7f2] via-transparent to-transparent" />
        <BambooMist />
        <Reveal direction="swing-left" className="relative z-10 w-full px-6 pb-16 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-5xl italic text-[#3f5a44]">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h2>
        </Reveal>
      </section>

      {/* ============ 3. QUOTE + DATE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#eef2e9] px-6 text-center">
        <BambooMist />
        <Reveal direction="depth" className="relative mx-auto max-w-md">
          <OrnamentGapura className="mx-auto mb-4 h-10 w-auto text-[#4a6b52]" />
          <p className="font-[family-name:var(--font-display)] text-lg italic leading-relaxed text-[#3a4a3c]">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#7a8f7d]">{data.quote.source}</p>}
        </Reveal>
        <Reveal direction="scale" delay={150} className="relative mt-12 rounded-full border-2 border-[#4a6b52]/30 px-8 py-5">
          <p className="text-xs uppercase tracking-widest text-[#7a8f7d]">Simpen Tanggalna</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-xl italic text-[#4a6b52]">{formatFullDate(data.events[0].date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#4a6b52] px-6 text-center text-white">
        <BambooMist dense />
        <Reveal direction="scale" className="relative">
          <p className="text-xs uppercase tracking-widest text-white/70">Hitung Mundur</p>
          <div className="mt-6">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="leaf-hex" pastLabelClassName="text-white" />
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
                frameClassName="border-4 border-[#4a6b52]"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-5deg)]" : "[transform:rotateY(5deg)]"}
              />
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-3xl italic text-[#3f5a44]">{person.nickname}</h3>
              <p className="mt-1 text-lg">{person.fullName}</p>
              <p className="mt-2 text-sm text-[#5a6b5c]">
                {person.childOrder} &middot; {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 7. LOVE STORY ============ */}
      <section className="relative bg-[#eef2e9] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#4a6b52]">Perjalanan Cinta Kami</h2>
        </Reveal>
        <div className="mx-auto mt-12 flex max-w-lg flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "swing-left" : "swing-right"} delay={i * 100} className="rounded-3xl bg-white p-5 text-center shadow-[0_15px_30px_-15px_rgba(74,107,82,0.25)]">
              <p className="text-xs uppercase tracking-wide text-[#a15b71]">{moment.date}</p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] italic">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#5a6b5c]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. EVENT ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#4a6b52]">Rangkaian Acara</h2>
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction={i % 2 === 0 ? "swing-left" : "swing-right"} delay={i * 100} className="rounded-[2rem] border-2 border-[#4a6b52]/20 bg-white p-8 text-center shadow-[0_25px_50px_-25px_rgba(74,107,82,0.3)]">
              <h3 className="font-[family-name:var(--font-display)] text-xl italic text-[#4a6b52]">{event.name}</h3>
              <p className="mt-2 text-sm text-[#5a6b5c]">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-[#5a6b5c]">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#5a6b5c]">{event.address}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 9. GALLERY ============ */}
      <section className="relative bg-[#eef2e9] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#4a6b52]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="polaroid-scatter" />
        </div>
      </section>

      {/* ============ 10. LOCATION ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#3f5a44] px-6 text-center text-white">
        <Reveal direction="scale" className="mx-auto max-w-md">
          <OrnamentGapura className="mx-auto mb-4 h-12 w-auto text-white" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic">Lokasi</h2>
          <p className="mt-2 text-sm text-white/80">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard event={data.events[data.events.length - 1]} className="mt-6" iframeClassName="rounded-2xl" buttonClassName="rounded-full bg-white text-[#3f5a44]" />
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#4a6b52]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-md">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-[2rem] bg-[#eef2e9] p-6",
              inputClassName: "rounded-xl border-[#dbe6dd] bg-white focus:border-[#3f5a44]",
              textareaClassName: "rounded-xl border-[#dbe6dd] bg-white focus:border-[#3f5a44]",
              buttonClassName: "rounded-full bg-[#3f5a44] text-white",
              radioClassName: "rounded-full border-[#dbe6dd] bg-white text-[#5a6b5c]",
              radioActiveClassName: "bg-[#3f5a44] text-white border-[#3f5a44]",
              labelClassName: "text-[#5a6b5c]",
              wishItemClassName: "rounded-2xl bg-white shadow-sm",
              wishMessageClassName: "text-[#5a6b5c]",
              wishMetaClassName: "text-[#a15b71]",
            }}
          />
        </div>
      </section>

      {/* ============ 12. GIFT ============ */}
      <section className="relative bg-[#eef2e9] px-6 py-20">
        <Reveal direction="scale" className="mx-auto max-w-md text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#4a6b52]">Wedding Gift</h2>
          <p className="mt-2 text-sm text-[#5a6b5c]">Doa restu kalian sudah sangat berarti. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="rounded-2xl bg-white text-left shadow-sm" buttonClassName="rounded-full bg-[#3f5a44] text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#2c3327] px-6 text-center text-white">
        <BambooMist dense />
        <p className="relative font-[family-name:var(--font-display)] text-4xl italic">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="relative mt-3 text-xs">Hatur nuhun kana do&apos;a restuna</p>
      </footer>
    </div>
  );
}
