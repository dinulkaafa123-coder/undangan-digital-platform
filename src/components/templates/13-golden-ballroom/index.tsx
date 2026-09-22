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
import { OrnamentCurtainSwag, OrnamentChandelier } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Cinzel', serif",
  "--font-body": "'Poppins', sans-serif",
});

/**
 * GOLDEN BALLROOM -- "tirai beludru dibuka".
 * Opening = tirai beludru maroon-emas dengan valance di atas, bergeser
 * ke kiri & kanan (disertai sedikit "kibasan" scaleX) mengungkap
 * ballroom -- nama pasangan tampil seperti judul film mewah.
 */
export default function GoldenBallroomTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1050);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#f8e9c9] font-[family-name:var(--font-body)] text-[#3a1010]">
      {/* ============ OPENING: tirai beludru ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.coverPhotoUrl} alt="Ballroom" className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <FloatingParticles count={16} particleClassName="bg-[#d4af37]/80" />
          <OrnamentChandelier className="absolute left-1/2 top-0 h-20 w-36 -translate-x-1/2 text-[#d4af37]/70" />

          <div
            className={cn(
              "absolute inset-y-0 left-0 w-1/2 origin-right bg-gradient-to-r from-[#5c1010] to-[#3a1010] shadow-[10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-[1050ms] ease-[cubic-bezier(.7,0,.3,1)]",
              phase === "closing" && "-translate-x-full scale-x-95"
            )}
          >
            <OrnamentCurtainSwag className="absolute inset-x-0 top-0 h-10 text-[#d4af37]" />
          </div>
          <div
            className={cn(
              "absolute inset-y-0 right-0 w-1/2 origin-left bg-gradient-to-l from-[#5c1010] to-[#3a1010] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-[1050ms] ease-[cubic-bezier(.7,0,.3,1)]",
              phase === "closing" && "translate-x-full scale-x-95"
            )}
          >
            <OrnamentCurtainSwag className="absolute inset-x-0 top-0 h-10 scale-x-[-1] text-[#d4af37]" />
          </div>

          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.5em] text-[#d4af37]">A Grand Love Story</p>
            <h1 className="text-gold-gradient mt-4 font-[family-name:var(--font-display)] text-5xl tracking-wide sm:text-6xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#f0dcb0]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-[#f8e9c9] hover:bg-[#d4af37] hover:text-[#3a1010]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4af37] bg-[#3a1010] text-[#d4af37] animate-pulse-glow" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8e9c9] via-transparent to-transparent" />
        <OrnamentChandelier className="pointer-events-none absolute left-1/2 top-0 h-16 w-28 -translate-x-1/2 text-white/70" />
        <div className="absolute inset-x-0 bottom-6 text-center">
          <Reveal direction="unfold">
            <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[#3a1010]">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ============ COUPLE ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Kedua Mempelai</h2>
          <p className="mx-auto mt-3 max-w-xs text-sm italic">&ldquo;{data.quote.text}&rdquo;</p>
        </Reveal>
        <div className="mt-12 flex flex-col gap-16">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction={i % 2 === 0 ? "left" : "right"} delay={i * 120} className="flex flex-col items-center text-center">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="h-44 w-44 rounded-full"
                frameClassName="border-4 border-[#d4af37]"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-6deg)]" : "[transform:rotateY(6deg)]"}
              />
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl text-[#8a1a1a]">{person.nickname}</h3>
              <p className="mt-1 text-lg">{person.fullName}</p>
              <p className="mt-2 text-sm">
                {person.childOrder} <br /> {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#3a1010] px-6 text-center text-[#f8e9c9]">
        <Reveal direction="scale">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Menuju Hari Bahagia</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="marquee" pastLabelClassName="text-[#f5e2a8]" />
          </div>
        </Reveal>
        <div className="mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="depth" delay={i * 150} className="border-2 border-[#d4af37]/60 p-7">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#d4af37]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#f0dcb0]">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-[#d4af37] text-[#f8e9c9] hover:bg-[#d4af37] hover:text-[#3a1010]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#8a1a1a]">Kisah Cinta Kami</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="scale" delay={i * 100} className="border border-[#d4af37]/50 p-5 text-center">
              <p className="text-xs uppercase tracking-widest text-[#8a1a1a]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)] text-lg">{moment.title}</h3>
              <p className="mt-1 text-sm">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- cinematic strip ============ */}
      <section className="py-20">
        <Reveal direction="up" className="px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#8a1a1a]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="cinematic-strip" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#8a1a1a]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border-2 border-[#d4af37]/60 bg-white p-6",
              inputClassName: "border-[#e7d0a8] focus:border-[#8a1a1a]",
              textareaClassName: "border-[#e7d0a8] focus:border-[#8a1a1a]",
              buttonClassName: "bg-[#8a1a1a] text-white hover:bg-[#6a1212]",
              radioClassName: "border-[#e7d0a8] text-[#5a2a20]",
              radioActiveClassName: "bg-[#8a1a1a] text-white border-[#8a1a1a]",
              labelClassName: "text-[#5a2a20]",
              wishItemClassName: "border border-[#e7d0a8] bg-white",
              wishMessageClassName: "text-[#5a2a20]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#f0dcb0] px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#8a1a1a]">Tanda Kasih</h2>
          <p className="mt-2 text-sm">Doa restu Anda adalah karunia terbesar. Namun jika ingin memberi tanda kasih:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/50 bg-white text-left" buttonClassName="border border-[#8a1a1a] text-[#8a1a1a] hover:bg-[#8a1a1a] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="scene-h flex flex-col items-center justify-center bg-[#3a1010] px-6 text-center text-[#d4af37]">
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-2xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs text-[#f0dcb0]">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
