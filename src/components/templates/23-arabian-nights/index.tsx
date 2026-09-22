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
import { OrnamentKeyholeArch, OrnamentLantern } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Amiri', serif",
  "--font-body": "'Montserrat', sans-serif",
});

/**
 * ARABIAN NIGHTS -- "melangkah lewat tiga lapis lengkung istana".
 * Opening = lengkung keyhole depan/tengah/latar pada depth berbeda
 * (perspective + translateZ), lampion tergantung, bintang & bulan --
 * saat dibuka, ketiga lapis melebar ke arah kamera dengan kecepatan
 * berbeda (bukan iris tunggal atau pintu ganda seperti template lain).
 */
export default function ArabianNightsTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1050);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#0d1a3a] font-[family-name:var(--font-body)] text-[#f3ede0]">
      {/* ============ OPENING: tiga lapis lengkung ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#070d22] px-6 text-center">
          <FloatingParticles count={20} particleClassName="bg-white/80" />
          <OrnamentLantern className="absolute left-8 top-4 h-20 w-12 text-[#d4af37]" />
          <OrnamentLantern className="absolute right-8 top-8 h-16 w-10 text-[#d4af37]/80" />

          <div className={cn("preserve-3d absolute transition-all duration-[1050ms] ease-in", phase === "closing" ? "[transform:translateZ(260px)] opacity-0" : "[transform:translateZ(-80px)] opacity-40")}>
            <OrnamentKeyholeArch className="h-72 w-56 text-[#d4af37]" />
          </div>
          <div
            className={cn("preserve-3d absolute transition-all duration-[1050ms] ease-in", phase === "closing" ? "[transform:translateZ(160px)] opacity-0" : "[transform:translateZ(-30px)] opacity-70")}
            style={{ transitionDelay: "60ms" }}
          >
            <OrnamentKeyholeArch className="h-64 w-48 text-[#d4af37]" />
          </div>
          <div className={cn("preserve-3d relative transition-all duration-[1050ms] ease-in", phase === "closing" ? "scale-[3] opacity-0" : "scale-100 opacity-100")} style={{ transitionDelay: "120ms" }}>
            <OrnamentKeyholeArch className="h-56 w-40 text-[#f5e2a8]" />
          </div>

          <div className={cn("absolute z-10 px-6 transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.4em] text-[#d4af37]">Seribu Satu Malam</p>
            <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-display)] text-4xl sm:text-5xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#cfd6e8]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#0d1a3a]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4af37] bg-[#0d1a3a] text-[#d4af37]" />

      {/* ============ HERO ============ */}
      <section className="relative mx-auto max-w-lg px-6 pt-16 text-center">
        <Reveal direction="scale">
          <div className="relative mx-auto w-fit">
            <OrnamentKeyholeArch className="absolute inset-0 h-full w-full text-[#d4af37]" />
            <div className="relative m-3 h-64 w-48 overflow-hidden rounded-t-[999px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-md px-6 py-14 text-center">
        <Reveal direction="up">
          <p className="text-sm italic leading-relaxed text-[#cfd6e8]">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#d4af37]">{data.quote.source}</p>}
        </Reveal>
      </section>

      {/* ============ COUPLE ============ */}
      <section className="mx-auto max-w-lg px-6 py-14">
        <div className="flex flex-col gap-16">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction={i % 2 === 0 ? "left" : "right"} delay={i * 120} className="flex flex-col items-center text-center">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="h-44 w-44 rounded-full"
                frameClassName="border-4 border-[#d4af37]"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-5deg)]" : "[transform:rotateY(5deg)]"}
              />
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-3xl text-[#d4af37]">{person.nickname}</h3>
              <p className="mt-1 font-medium">{person.fullName}</p>
              <p className="mt-2 text-sm text-[#cfd6e8]">
                {person.childOrder}
                <br />
                {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="relative overflow-hidden border-y border-white/10 px-6 py-20 text-center">
        <FloatingParticles count={12} particleClassName="bg-white/70" />
        <Reveal direction="scale" className="relative">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#d4af37]">Menuju Hari Bahagia</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="lantern-glow" />
          </div>
        </Reveal>
        <div className="relative mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="depth" delay={i * 150} className="border border-[#d4af37]/40 p-7">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#d4af37]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#cfd6e8]">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale invert-[0.9]" buttonClassName="border border-[#d4af37] text-[#f3ede0] hover:bg-[#d4af37] hover:text-[#0d1a3a]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#d4af37]">Kisah Kami</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="border-b border-white/10 pb-6">
              <p className="text-xs uppercase tracking-wide text-[#d4af37]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)] text-lg">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#cfd6e8]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#d4af37]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="arch-grid" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#d4af37]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-white/15 bg-white/5 p-6",
              inputClassName: "border-white/20 bg-transparent text-white focus:border-[#d4af37]",
              textareaClassName: "border-white/20 bg-transparent text-white focus:border-[#d4af37]",
              buttonClassName: "bg-[#d4af37] text-[#0d1a3a] hover:bg-[#c49a2c]",
              radioClassName: "border-white/20 text-white/70",
              radioActiveClassName: "bg-[#d4af37] text-[#0d1a3a] border-[#d4af37]",
              labelClassName: "text-white/70",
              wishItemClassName: "border border-white/10",
              wishNameClassName: "text-white",
              wishMessageClassName: "text-white/60",
              wishMetaClassName: "text-[#d4af37]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="border-y border-white/10 px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#d4af37]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#cfd6e8]">Doa restu Anda sudah lebih dari cukup. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-white/10 text-left text-white" buttonClassName="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0d1a3a]" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="px-6 py-14 text-center text-[#cfd6e8]">
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-2xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
