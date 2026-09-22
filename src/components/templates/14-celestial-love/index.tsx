"use client";

import type { InvitationTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
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
import { OrnamentConstellationLines, OrnamentMoonGlow } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Marcellus', serif",
  "--font-body": "'Tenor Sans', sans-serif",
});

/**
 * CELESTIAL LOVE -- "rasi bintang membentuk inisial pasangan".
 * Opening = taburan bintang & bulan yang perlahan menyusun garis
 * penghubung (constellation) menjadi bentuk yang mengungkap nama --
 * transisi buka undangan berupa cahaya yang melebar dari titik pusat
 * rasi bintang, bukan iris polos.
 */
export default function CelestialLoveTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(950);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#0a1128] font-[family-name:var(--font-body)] text-[#f3ede0]">
      {/* ============ OPENING: rasi bintang ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#060a1c]">
          <FloatingParticles count={28} particleClassName="bg-white/80" />
          <OrnamentConstellationLines className="absolute left-1/2 top-1/4 h-32 w-56 -translate-x-1/2 text-[#7c9fd4]" />
          <OrnamentMoonGlow className="absolute -right-8 -top-8 h-40 w-40 text-[#c9c3b3]" />

          <div
            className={cn(
              "absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ffffff_0%,#7c9fd4_45%,transparent_72%)] transition-transform duration-[950ms] ease-in",
              phase === "closing" ? "scale-[26]" : "scale-100"
            )}
          />

          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.5em] text-[#7c9fd4]">Written in the Stars</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl text-white">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#c9c3b3]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#7c9fd4] text-white hover:bg-[#7c9fd4] hover:text-[#0a1128]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#7c9fd4] bg-[#0a1128] text-[#7c9fd4] animate-pulse-glow" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        <FloatingParticles count={18} particleClassName="bg-white/70" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-transparent to-[#0a1128]/40" />
        <div className="absolute inset-x-0 bottom-6 text-center">
          <Reveal direction="rise">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#f3ede0]">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-md px-6 py-14 text-center">
        <Reveal direction="rise">
          <p className="text-sm italic leading-relaxed text-[#c9c3b3]">{data.quote.text}</p>
          {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#7c9fd4]">{data.quote.source}</p>}
        </Reveal>
      </section>

      {/* ============ COUPLE ============ */}
      <section className="mx-auto max-w-lg px-6 py-14">
        <div className="flex flex-col gap-16">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction="rise" delay={i * 150} className="flex flex-col items-center text-center">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="h-44 w-44 rounded-full"
                frameClassName="border border-[#7c9fd4]/60 shadow-[0_0_45px_-8px_rgba(124,159,212,0.5)]"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-6deg)]" : "[transform:rotateY(6deg)]"}
              />
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-3xl text-[#7c9fd4]">{person.nickname}</h3>
              <p className="mt-1 font-medium">{person.fullName}</p>
              <p className="mt-2 text-sm text-[#c9c3b3]">
                {person.childOrder}
                <br />
                {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ORBITAL ============ */}
      <section className="scene-h flex flex-col items-center justify-center border-y border-white/10 px-6 text-center">
        <Reveal direction="scale">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#7c9fd4]">Menuju Hari Bahagia</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="orbital" />
          </div>
        </Reveal>
        <div className="mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="rise" delay={i * 150} className="border border-white/10 bg-white/[0.03] p-7">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#7c9fd4]">{event.name}</h3>
              <p className="mt-2 text-sm text-[#c9c3b3]">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-[#c9c3b3]">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#c9c3b3]">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale invert-[0.9] contrast-125" buttonClassName="border border-[#7c9fd4] text-[#7c9fd4] hover:bg-[#7c9fd4] hover:text-[#0a1128]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORY -- rasi bintang membentuk garis waktu ============ */}
      <section className="relative mx-auto max-w-lg overflow-hidden px-6 py-20">
        <OrnamentConstellationLines className="pointer-events-none absolute right-0 top-0 h-40 w-64 text-[#7c9fd4]/30" />
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#7c9fd4]">Garis Waktu Kami</h2>
        </Reveal>
        <div className="relative mt-12 flex flex-col gap-12 pl-7">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-[repeating-linear-gradient(180deg,#7c9fd4_0px,#7c9fd4_3px,transparent_3px,transparent_9px)] opacity-50" />
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="relative">
              <span className="absolute -left-7 top-1 h-3.5 w-3.5 rounded-full bg-[#7c9fd4] shadow-[0_0_10px_3px_rgba(124,159,212,0.5)]" />
              <p className="text-xs uppercase tracking-widest text-[#7c9fd4]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)] mt-1 text-lg">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#c9c3b3]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#7c9fd4]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="constellation" accentClassName="border-[#7c9fd4]/70" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#7c9fd4]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-white/15 p-6",
              inputClassName: "border-white/20 bg-transparent text-white focus:border-[#7c9fd4]",
              textareaClassName: "border-white/20 bg-transparent text-white focus:border-[#7c9fd4]",
              buttonClassName: "bg-[#7c9fd4] text-[#0a1128] hover:bg-[#96b3e0]",
              radioClassName: "border-white/20 text-white/70",
              radioActiveClassName: "bg-[#7c9fd4] text-[#0a1128] border-[#7c9fd4]",
              labelClassName: "text-white/70",
              wishItemClassName: "border border-white/10",
              wishNameClassName: "text-white",
              wishMessageClassName: "text-white/60",
              wishMetaClassName: "text-[#7c9fd4]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="border-y border-white/10 px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#7c9fd4]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#c9c3b3]">Doa restu Anda sudah lebih dari cukup. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-white/10 text-left text-white" buttonClassName="border border-[#7c9fd4] text-[#7c9fd4] hover:bg-[#7c9fd4] hover:text-[#0a1128]" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="px-6 py-14 text-center text-[#c9c3b3]">
        <p className="font-[family-name:var(--font-display)] text-2xl text-white">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
