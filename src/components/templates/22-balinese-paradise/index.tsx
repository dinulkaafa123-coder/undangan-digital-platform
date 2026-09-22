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
import { OrnamentCandiBentar } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Italiana', serif",
  "--font-body": "'Quicksand', sans-serif",
});

/**
 * BALINESE PARADISE -- "candi bentar terbuka".
 * Opening = dua separuh gapura belah (candi bentar) yang bergeser lurus
 * menjauh dari tengah (bukan hinge berputar) diiringi kabut lembut &
 * cahaya matahari -- gerbang batu, bukan pintu kayu/kain.
 */
export default function BalinesePardiseTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#f3ede0] font-[family-name:var(--font-body)] text-[#3f4a3a]">
      {/* ============ OPENING: candi bentar ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-b from-[#cfe0c8] to-[#3f4a3a]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,244,214,0.5),transparent_60%)]" />
          <div className="animate-float-slow absolute inset-0 bg-white/10" />

          <div className={cn("absolute inset-y-0 left-1/2 -translate-x-full text-[#5c5346] transition-transform duration-1000 ease-in-out", phase === "closing" && "-translate-x-[220%]")}>
            <OrnamentCandiBentar className="h-full w-32 scale-x-[-1] sm:w-40" />
          </div>
          <div className={cn("absolute inset-y-0 left-1/2 text-[#5c5346] transition-transform duration-1000 ease-in-out", phase === "closing" && "translate-x-[120%]")}>
            <OrnamentCandiBentar className="h-full w-32 sm:w-40" />
          </div>

          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.4em] text-[#3f4a3a]">Bali Destination Wedding</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl text-[#2c3327]">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#4a5540]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-[#2c3327]">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#2c3327] text-[#2c3327] hover:bg-[#2c3327] hover:text-white">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#3f4a3a] bg-white/80 text-[#3f4a3a]" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f3ede0] via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-6 text-center">
          <Reveal direction="editorial">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#2c3327]">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-md px-6 py-14 text-center">
        <Reveal direction="editorial">
          <p className="text-sm leading-relaxed text-[#4a5540]">{data.quote.text}</p>
          {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#a8791f]">{data.quote.source}</p>}
        </Reveal>
      </section>

      {/* ============ COUPLE ============ */}
      <section className="mx-auto max-w-lg px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction="up" delay={i * 150} className="text-center">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="mx-auto h-32 w-32 rounded-full"
                frameClassName="border border-[#d4af37]"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-4deg)]" : "[transform:rotateY(4deg)]"}
              />
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl text-[#2c3327]">{person.nickname}</h3>
              <p className="mt-1 text-sm font-medium">{person.fullName}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#4a5540]">
                {person.childOrder}
                <br />
                {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#3f4a3a] px-6 text-center text-[#f3ede0]">
        <Reveal direction="scale">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Menuju Hari Bahagia</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="gate-frame" />
          </div>
        </Reveal>
        <div className="mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="up" delay={i * 150} className="border border-[#d4af37]/40 p-7">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#d4af37]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#cfe0c8]">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-[#d4af37] text-[#f3ede0] hover:bg-[#d4af37] hover:text-[#3f4a3a]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c3327]">Kisah Kami</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="border-b border-[#d9d0bd] pb-6">
              <p className="text-xs uppercase tracking-wide text-[#a8791f]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)] text-lg">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#4a5540]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="py-20">
        <Reveal direction="up" className="px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c3327]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="carousel-depth" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c3327]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#d9d0bd] bg-white p-6",
              inputClassName: "border-[#d9d0bd] focus:border-[#3f4a3a]",
              textareaClassName: "border-[#d9d0bd] focus:border-[#3f4a3a]",
              buttonClassName: "bg-[#3f4a3a] text-white hover:bg-[#2c3327]",
              radioClassName: "border-[#d9d0bd] text-[#4a5540]",
              radioActiveClassName: "bg-[#3f4a3a] text-white border-[#3f4a3a]",
              labelClassName: "text-[#4a5540]",
              wishItemClassName: "border border-[#d9d0bd] bg-white",
              wishMessageClassName: "text-[#4a5540]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-white px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c3327]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#4a5540]">Kehadiran Anda adalah kebahagiaan kami. Jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d9d0bd] text-left" buttonClassName="border border-[#3f4a3a] text-[#3f4a3a] hover:bg-[#3f4a3a] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="scene-h flex flex-col items-center justify-center bg-[#2c3327] px-6 text-center text-[#cfe0c8]">
        <p className="font-[family-name:var(--font-display)] text-2xl text-white">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
