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
import { MapsCard } from "@/components/shared/maps-card";
import { BankAccountCard } from "@/components/shared/bank-account-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentGunungan, OrnamentBatikBorder, OrnamentGebyokPanel } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Marcellus', serif",
  "--font-body": "'Cormorant Garamond', serif",
});

/**
 * ============================================================
 * JAVA ETERNAL -- template "4D", terinspirasi estetika Jawa.
 * ============================================================
 * Ornamen (gunungan, batik, panel gebyok) terinspirasi estetika Jawa
 * secara umum -- desain ORIGINAL, bukan reproduksi pakem wayang/motif
 * batik adat tertentu, dan tidak diklaim sebagai representasi akurat
 * satu daerah/keraton spesifik.
 *
 * Ciri "4D": beberapa siluet gunungan pada kedalaman berbeda terus
 * bergeser perlahan (seperti panggung wayang yang tidak pernah diam),
 * masing-masing kecepatan berbeda -- bukan dekorasi statis.
 */
function GununganStage() {
  const layers = [
    { z: -60, scale: 0.7, duration: "10s", opacity: "text-[#d4af37]/15" },
    { z: -20, scale: 0.9, duration: "7s", opacity: "text-[#d4af37]/30" },
    { z: 10, scale: 1, duration: "5s", opacity: "text-[#3a2a1a]/50" },
  ];
  return (
    <div className="perspective-1600 pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden">
      <div className="preserve-3d relative h-full w-full">
        {layers.map((l, i) => (
          <div
            key={i}
            className="animate-drift-side absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{ transform: `translateX(-50%) translateZ(${l.z}px) scale(${l.scale})`, animationDuration: l.duration, animationDirection: i % 2 ? "reverse" : "normal" }}
          >
            <OrnamentGunungan className={cn("h-56 w-40", l.opacity)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function JavaEternalTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);
  const heroParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative bg-[#f5ecd8] font-[family-name:var(--font-body)] text-[#3a2a1a]">
      {/* ============ 1. OPENING -- panggung wayang hidup ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#1c1509] px-6 text-center">
          <GununganStage />
          <div
            className={
              "relative z-10 transition-all duration-1000 ease-in " + (phase === "closing" ? "scale-150 opacity-0" : "scale-100 opacity-100")
            }
          >
            <p className="text-xs uppercase tracking-[0.4em] text-[#d4af37]">Undangan Pernikahan</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-[#c9a86a]/70">terinspirasi estetika Jawa</p>
            <h1 className="text-gold-gradient mt-4 font-[family-name:var(--font-display)] text-5xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#e7d9b8]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-[#f5ecd8] hover:bg-[#d4af37] hover:text-[#1c1509]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4af37] bg-[#1c1509] text-[#d4af37] animate-pulse-glow" />

      {/* ============ 2. HERO -- foto di panggung gunungan bergerak ============ */}
      <section className="scene-h relative flex items-end overflow-hidden">
        <div ref={heroParallax} className="absolute inset-0 h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Potret mempelai" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5ecd8] via-[#f5ecd8]/10 to-transparent" />
        <GununganStage />
        <Reveal direction="split" className="relative z-10 w-full px-6 pb-14 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#3a2a1a] sm:text-5xl">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h1>
        </Reveal>
      </section>

      {/* ============ 3. QUOTE + DATE -- pita batik bergerak ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <OrnamentBatikBorder className="animate-drift-side pointer-events-none absolute inset-x-0 top-10 h-4 text-[#d4af37]/50" style={{ animationDuration: "9s" }} />
        <OrnamentBatikBorder className="animate-drift-side pointer-events-none absolute inset-x-0 bottom-10 h-4 rotate-180 text-[#d4af37]/50" style={{ animationDuration: "11s", animationDirection: "reverse" }} />
        <Reveal direction="up" className="mx-auto max-w-lg">
          <p className="text-base italic leading-relaxed text-[#5a3a20]">{data.quote.text}</p>
          {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#a8791f]">{data.quote.source}</p>}
        </Reveal>
        <Reveal direction="scale" delay={150} className="mt-14 border-y-2 border-[#3a2a1a] px-8 py-5">
          <p className="text-xs uppercase tracking-widest text-[#a8791f]">Tanggal Bahagia</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-xl text-[#3a2a1a]">{formatFullDate(data.events[0].date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#1c1509] px-6 text-center text-[#f5ecd8]">
        <GununganStage />
        <Reveal direction="scale" className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Menghitung Hari</p>
          <div className="mt-8">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="heritage-frame" pastLabelClassName="text-[#f0dcb0]" />
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
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-3xl text-[#a8791f]">{person.nickname}</h3>
              <p className="mt-1 text-lg">{person.fullName}</p>
              <p className="mt-2 text-sm text-[#5a3a20]">
                {person.childOrder} &middot; {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 7. LOVE STORY ============ */}
      <section className="relative bg-[#eddfc0] px-6 py-20">
        <Reveal direction="split" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#3a2a1a]">Perjalanan Kasih</h2>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-lg grid-cols-1 gap-6 sm:grid-cols-2">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="scale" delay={i * 100} className="border border-[#d4af37]/50 bg-[#f5ecd8] p-5 text-center">
              <p className="text-xs uppercase tracking-widest text-[#a8791f]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)] text-lg text-[#3a2a1a]">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#5a3a20]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. EVENT ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="split" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#3a2a1a]">Undangan Acara</h2>
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-6">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="up" delay={i * 150} className="relative overflow-hidden border border-[#d4af37]/50 p-7 text-center">
              <OrnamentGebyokPanel className="pointer-events-none absolute inset-0 h-full w-full text-[#3a2a1a]/5" />
              <h3 className="relative font-[family-name:var(--font-display)] text-xl text-[#a8791f]">{event.name}</h3>
              <p className="relative mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="relative text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="relative mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="relative text-xs text-[#5a3a20]">{event.address}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 9. GALLERY ============ */}
      <section className="relative bg-[#eddfc0] px-6 py-20">
        <Reveal direction="split" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#3a2a1a]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="heritage-frame" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ 10. LOCATION ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#1c1509] px-6 text-center text-[#f5ecd8]">
        <Reveal direction="scale" className="mx-auto w-full max-w-md">
          <OrnamentGunungan className="mx-auto mb-4 h-16 w-12 text-[#d4af37]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Lokasi Acara</h2>
          <p className="mt-2 text-sm text-[#e7d9b8]">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard event={data.events[data.events.length - 1]} className="mt-6" iframeClassName="sepia" buttonClassName="border border-[#d4af37] text-[#f5ecd8] hover:bg-[#d4af37] hover:text-[#1c1509]" />
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="split" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#3a2a1a]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#d4af37]/50 bg-white p-6",
              inputClassName: "border-[#d4af37]/60 focus:border-[#3a2a1a]",
              textareaClassName: "border-[#d4af37]/60 focus:border-[#3a2a1a]",
              buttonClassName: "bg-[#3a2a1a] text-white hover:bg-[#5a3a20]",
              radioClassName: "border-[#d4af37]/60 text-[#5a3a20]",
              radioActiveClassName: "bg-[#3a2a1a] text-white border-[#3a2a1a]",
              labelClassName: "text-[#5a3a20]",
              wishItemClassName: "border border-[#d4af37]/30 bg-white",
              wishMessageClassName: "text-[#5a3a20]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ 12. GIFT ============ */}
      <section className="relative bg-[#eddfc0] px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#3a2a1a]">Wedding Gift</h2>
          <p className="mt-2 text-sm text-[#5a3a20]">Doa restu Bapak/Ibu/Saudara/i merupakan karunia bagi kami. Bila hendak memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/50 bg-[#f5ecd8] text-left" buttonClassName="border border-[#3a2a1a] text-[#3a2a1a] hover:bg-[#3a2a1a] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#1c1509] px-6 text-center text-[#d4af37]">
        <GununganStage />
        <p className="text-gold-gradient relative font-[family-name:var(--font-display)] text-3xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="relative mt-3 text-xs text-[#e7d9b8]">Nuwun sewu, matur nuwun atas doa restu Anda</p>
      </footer>
    </div>
  );
}
