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
import { OrnamentPalaceGate, OrnamentChandelier, OrnamentCrest } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Cinzel', serif",
  "--font-body": "'Cormorant Garamond', serif",
});

/**
 * DIAMOND PALACE 3D -- "pintu istana terbuka".
 * Opening = dua pintu istana beromamen (hinge rotateY di tepi luar,
 * lebih lebar & lebih lambat dari template gerbang lain) dengan kristal
 * berkelip, mengungkap lorong istana berperspektif nyata di baliknya.
 */
export default function DiamondPalace3DTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1200);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#faf4e6] font-[family-name:var(--font-body)] text-[#3a2e1a]">
      {/* ============ OPENING: pintu istana ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 overflow-hidden bg-[#140f08]">
          <FloatingParticles count={18} particleClassName="bg-[#e8cb84]/80" />
          <OrnamentChandelier className="absolute left-1/2 top-4 h-24 w-40 -translate-x-1/2 text-[#e8cb84]/70" />

          <div
            className={cn(
              "preserve-3d absolute inset-y-0 left-0 w-1/2 origin-left border-r border-[#d4af6a]/40 bg-gradient-to-br from-[#3a2e1a] to-[#1c1509] transition-transform duration-[1200ms] ease-in-out",
              phase === "closing" && "[transform:rotateY(-115deg)]"
            )}
          >
            <OrnamentPalaceGate className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] text-[#d4af6a]/50" />
          </div>
          <div
            className={cn(
              "preserve-3d absolute inset-y-0 right-0 w-1/2 origin-right border-l border-[#d4af6a]/40 bg-gradient-to-bl from-[#3a2e1a] to-[#1c1509] transition-transform duration-[1200ms] ease-in-out",
              phase === "closing" && "[transform:rotateY(115deg)]"
            )}
          >
            <OrnamentPalaceGate className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] scale-x-[-1] text-[#d4af6a]/50" />
          </div>

          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <OrnamentCrest className="mx-auto h-14 w-14 text-[#d4af6a]" />
            <p className="mt-4 text-xs uppercase tracking-[0.5em] text-[#d4af6a]">Istana Cinta</p>
            <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-display)] text-5xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#e7d9b8]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-[#f4ecd8]">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#d4af6a] text-[#f4ecd8] hover:bg-[#d4af6a] hover:text-[#1c1509]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4af6a] bg-[#2c2417] text-[#d4af6a] animate-pulse-glow" />

      {/* ============ HERO -- royal painting ============ */}
      <section className="scene-h perspective-1600 relative mx-auto flex max-w-lg flex-col items-center justify-center px-6 text-center">
        <FloatingParticles count={10} particleClassName="bg-[#d4af6a]/50" />
        <Reveal direction="depth">
          <div className="preserve-3d relative mx-auto w-full max-w-sm border-[10px] border-double border-[#d4af6a] bg-[#241c10] p-2 shadow-[0_35px_70px_-25px_rgba(0,0,0,0.6)] [transform:rotateX(2deg)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.heroPhotoUrl} alt="Potret pasangan" className="aspect-[4/5] w-full object-cover sepia-[0.15]" />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#a8791f]">Potret Kerajaan</p>
        </Reveal>
      </section>

      {/* ============ COUPLE ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide">Kedua Mempelai</h2>
          <p className="mx-auto mt-3 max-w-xs text-sm italic text-[#5a4a2a]">&ldquo;{data.quote.text}&rdquo;</p>
        </Reveal>
        <div className="mt-12 flex flex-col gap-16">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction={i % 2 === 0 ? "left" : "right"} delay={i * 120} className="flex flex-col items-center text-center">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="h-48 w-40 rounded-t-full"
                frameClassName="border-4 border-[#d4af6a]"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-6deg)_rotateX(3deg)]" : "[transform:rotateY(6deg)_rotateX(3deg)]"}
                ornament={<OrnamentCrest className="absolute -bottom-5 -right-5 h-12 w-12 text-[#d4af6a]" />}
              />
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl text-[#a8791f]">{person.nickname}</h3>
              <p className="mt-1 text-lg">{person.fullName}</p>
              <p className="mt-2 text-sm text-[#5a4a2a]">
                {person.childOrder} <br /> {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#241c10] px-6 py-20 text-[#f4ecd8]">
        <OrnamentChandelier className="pointer-events-none absolute left-1/2 top-2 h-20 w-32 -translate-x-1/2 text-[#d4af6a]/30" />
        <FloatingParticles count={10} particleClassName="bg-[#d4af6a]/60" />
        <Reveal direction="scale" className="relative text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Menuju Hari Bahagia</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="palace-plaque" pastLabelClassName="text-[#e8cb84]" />
          </div>
        </Reveal>
        <div className="relative mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="depth" delay={i * 150} className="border-2 border-double border-[#d4af6a]/60 p-7 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#e8cb84]">{event.name}</h3>
              <p className="mt-2 text-sm text-[#c9a86a]">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-[#c9a86a]">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm">{event.venueName}</p>
              <p className="text-xs text-[#e7d9b8]/80">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale contrast-125" buttonClassName="border border-[#d4af6a] text-[#f4ecd8] hover:bg-[#d4af6a] hover:text-[#241c10]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ LOVE STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Kisah Cinta Kami</h2>
        </Reveal>
        <div className="relative mt-12 flex flex-col gap-12 pl-7">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-transparent via-[#c9a86a] to-transparent" />
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="relative">
              <span className="absolute -left-7 top-1 h-3.5 w-3.5 rounded-full bg-[#a8791f]" />
              <p className="text-xs uppercase tracking-widest text-[#a8791f]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)] mt-1 text-lg">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#5a4a2a]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- museum wall ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Galeri Istana</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="museum-wall" accentClassName="border-[#d4af6a]" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-xl border-2 border-double border-[#d4af6a]/60 bg-white p-5",
              inputClassName: "border-[#c9a86a]/60 focus:border-[#a8791f]",
              textareaClassName: "border-[#c9a86a]/60 focus:border-[#a8791f]",
              buttonClassName: "bg-[#a8791f] text-white hover:bg-[#8a6d1f]",
              radioClassName: "border-[#c9a86a]/60 text-[#5a4a2a]",
              radioActiveClassName: "bg-[#a8791f] text-white border-[#a8791f]",
              labelClassName: "text-[#5a4a2a]",
              wishItemClassName: "border border-[#c9a86a]/30",
              wishMessageClassName: "text-[#5a4a2a]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#f0e5c8] px-6 py-20">
        <Reveal direction="scale" className="mx-auto max-w-lg text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#5a4a2a]">Doa restu Anda adalah karunia yang berarti. Namun jika ingin memberi tanda kasih:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af6a]/50 bg-white text-left" buttonClassName="border border-[#a8791f] text-[#a8791f] hover:bg-[#a8791f] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="scene-h flex flex-col items-center justify-center bg-[#1c1509] px-6 text-center text-[#c9a86a]">
        <OrnamentCrest className="mx-auto mb-4 h-10 w-10 text-[#d4af6a]" />
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-2xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
