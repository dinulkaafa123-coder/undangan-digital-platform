"use client";

import type { InvitationTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { PhotoFrame3D } from "@/components/shared/photo-frame-3d";
import { GoldButton } from "@/components/shared/gold-button";
import { MapsCard } from "@/components/shared/maps-card";
import { BankAccountCard } from "@/components/shared/bank-account-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentCrest, OrnamentCornerFrame } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Cinzel', serif",
  "--font-body": "'Lora', serif",
});

/**
 * EMERALD ROYAL -- "pintu zamrud berbingkai emas terbuka".
 * Opening = dua daun pintu zamrud solid berbingkai emas ornamental
 * (bukan kain beludru seperti Golden Ballroom) yang bergeser membuka
 * dari tengah, dengan crest kerajaan di atasnya.
 */
export default function EmeraldRoyalTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#f6f1e2] font-[family-name:var(--font-body)] text-[#0d3b2e]">
      {/* ============ OPENING: pintu zamrud ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#06140f]">
          <OrnamentCrest className="absolute left-1/2 top-6 h-14 w-14 -translate-x-1/2 text-[#d4af37]" />

          <div className={cn("absolute inset-y-0 left-0 w-1/2 border-r-4 border-[#d4af37] bg-[#0d3b2e] transition-transform duration-1000 ease-in-out", phase === "closing" && "-translate-x-full")}>
            <OrnamentCornerFrame className="absolute left-4 top-24 h-10 w-10 text-[#d4af37]" />
            <OrnamentCornerFrame className="absolute bottom-4 right-4 h-10 w-10 rotate-180 text-[#d4af37]" />
          </div>
          <div className={cn("absolute inset-y-0 right-0 w-1/2 border-l-4 border-[#d4af37] bg-[#0d3b2e] transition-transform duration-1000 ease-in-out", phase === "closing" && "translate-x-full")}>
            <OrnamentCornerFrame className="absolute right-4 top-24 h-10 w-10 rotate-90 text-[#d4af37]" />
            <OrnamentCornerFrame className="absolute bottom-4 left-4 h-10 w-10 -rotate-90 text-[#d4af37]" />
          </div>

          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="mt-16 text-xs uppercase tracking-[0.4em] text-[#d4af37]">Istana Zamrud</p>
            <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-display)] text-5xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#cfe3d8]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-[#f6f1e2]">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-[#f6f1e2] hover:bg-[#d4af37] hover:text-[#0d3b2e]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4af37] bg-[#0d3b2e] text-[#d4af37]" />

      {/* ============ HERO -- royal portrait ============ */}
      <section className="scene-h relative mx-auto flex max-w-lg flex-col items-center justify-center px-6 text-center">
        <Reveal direction="unfold">
          <div className="relative mx-auto w-fit border-[10px] border-double border-[#d4af37] bg-[#0d3b2e] p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.heroPhotoUrl} alt="Potret pasangan" className="aspect-[4/5] w-64 object-cover sm:w-80" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-md px-6 py-14 text-center">
        <Reveal direction="up">
          <p className="text-sm italic leading-relaxed text-[#1c4a3a]">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#a8791f]">{data.quote.source}</p>}
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
                ornament={<OrnamentCrest className="absolute -bottom-5 -right-5 h-12 w-12 text-[#d4af37]" />}
              />
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl text-[#a8791f]">{person.nickname}</h3>
              <p className="mt-1 text-lg">{person.fullName}</p>
              <p className="mt-2 text-sm">
                {person.childOrder} <br /> {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#0d3b2e] px-6 text-center text-[#f6f1e2]">
        <Reveal direction="scale">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Menuju Hari Bahagia</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="emerald-frame" pastLabelClassName="text-[#cfe3d8]" />
          </div>
        </Reveal>
        <div className="mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="depth" delay={i * 150} className="border-2 border-[#d4af37]/60 p-7">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#d4af37]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#cfe3d8]">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-[#d4af37] text-[#f6f1e2] hover:bg-[#d4af37] hover:text-[#0d3b2e]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Kisah Cinta Kami</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="scale" delay={i * 100} className="border border-[#d4af37]/40 p-5 text-center">
              <p className="text-xs uppercase tracking-widest text-[#a8791f]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)] text-lg">{moment.title}</h3>
              <p className="mt-1 text-sm">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="salon-frame" accentClassName="border-[#d4af37]" />
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
              cardClassName: "border-2 border-[#d4af37]/60 bg-white p-6",
              inputClassName: "border-[#cfe3d8] focus:border-[#0d3b2e]",
              textareaClassName: "border-[#cfe3d8] focus:border-[#0d3b2e]",
              buttonClassName: "bg-[#0d3b2e] text-white hover:bg-[#173f31]",
              radioClassName: "border-[#cfe3d8] text-[#1c4a3a]",
              radioActiveClassName: "bg-[#0d3b2e] text-white border-[#0d3b2e]",
              labelClassName: "text-[#1c4a3a]",
              wishItemClassName: "border border-[#cfe3d8] bg-white",
              wishMessageClassName: "text-[#1c4a3a]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#eee3c4] px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Tanda Kasih</h2>
          <p className="mt-2 text-sm">Doa restu Anda adalah karunia yang berarti. Namun jika ingin memberi tanda kasih:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/50 bg-white text-left" buttonClassName="border border-[#0d3b2e] text-[#0d3b2e] hover:bg-[#0d3b2e] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="scene-h flex flex-col items-center justify-center bg-[#06140f] px-6 text-center text-[#d4af37]">
        <OrnamentCrest className="mx-auto mb-4 h-10 w-10" />
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-2xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs text-[#cfe3d8]">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
