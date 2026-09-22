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
import { OrnamentSpotlightCone } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Bodoni Moda', serif",
  "--font-body": "'Montserrat', sans-serif",
});

const CHAPTER_LABELS = ["Chapter I — First Meeting", "Chapter II — Our Journey", "Chapter III — The Proposal", "Final Chapter — The Wedding"];

/**
 * VINTAGE CINEMA -- "opening judul film klasik".
 * Opening = layar hitam dengan spotlight & grain sinema yang sangat
 * halus, judul tampil seperti title card film, lalu memudar seperti
 * transisi antar-adegan (bukan pintu/tirai fisik).
 */
export default function VintageCinemaTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#0a0a0a] font-[family-name:var(--font-body)] text-[#e9e2d0]">
      {/* ============ OPENING: title card film ============ */}
      {phase !== "open" && (
        <div className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black px-6 text-center transition-opacity duration-1000", phase === "closing" && "opacity-0")}>
          <OrnamentSpotlightCone className="absolute left-1/2 top-0 h-full w-[70vw] -translate-x-1/2 text-white" />
          <div aria-hidden className="animate-grain-flicker pointer-events-none absolute inset-0 bg-white mix-blend-overlay" />
          <div className="absolute inset-x-0 top-0 h-[6%] bg-black" />
          <div className="absolute inset-x-0 bottom-0 h-[6%] bg-black" />

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.5em] text-[#c9a24b]">A Motion Picture Presentation</p>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-5xl tracking-wide text-white sm:text-6xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-xs uppercase tracking-[0.35em] text-white/60">Starring</p>
            <p className="mt-6 text-sm text-white/70">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-10">
              <GoldButton onClick={openInvitation} className="border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#c9a24b] bg-black text-[#c9a24b]" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.coverPhotoUrl} alt="Sampul" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
        <div className="absolute inset-x-0 bottom-10 text-center">
          <Reveal direction="blur-scale">
            <p className="font-[family-name:var(--font-display)] text-lg italic text-white/90">&ldquo;{data.quote.text}&rdquo;</p>
            {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#c9a24b]">{data.quote.source}</p>}
          </Reveal>
        </div>
      </section>

      {/* ============ COUPLE -- cast list ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Pemeran Utama</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-16">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction={i % 2 === 0 ? "left" : "right"} delay={i * 150} className="flex flex-col items-center text-center">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="h-44 w-44 rounded-full"
                frameClassName="border border-[#c9a24b] grayscale"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-5deg)]" : "[transform:rotateY(5deg)]"}
              />
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#c9a24b]">{person.nickname}</h3>
              <p className="mt-1 text-sm text-white/80">{person.fullName}</p>
              <p className="mt-3 text-xs leading-relaxed text-white/50">
                {person.childOrder}
                <br />
                {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center border-y border-white/10 px-6 text-center">
        <Reveal direction="scale">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Menuju Hari Bahagia</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="film-reel" />
          </div>
        </Reveal>
        <div className="mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="blur-scale" delay={i * 150} className="border border-white/10 bg-white/[0.03] p-7">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#c9a24b]">{event.name}</h3>
              <p className="mt-2 text-sm text-white/80">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-white/80">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium text-white">{event.venueName}</p>
              <p className="text-xs text-white/50">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale contrast-125" buttonClassName="border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ LOVE STORY -- per babak ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Kisah Kami</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-12">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="blur-scale" delay={i * 100} className="border-t border-[#c9a24b]/30 pt-6 text-center">
              <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.3em] text-[#c9a24b]">
                {CHAPTER_LABELS[i] ?? `Chapter ${i + 1}`}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-white">{moment.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/40">{moment.date}</p>
              <p className="mt-2 text-sm text-white/60">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- film strip ============ */}
      <section className="py-20">
        <Reveal direction="up" className="px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="film-strip" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-white/10 p-6",
              inputClassName: "border-white/20 bg-transparent text-white focus:border-[#c9a24b]",
              textareaClassName: "border-white/20 bg-transparent text-white focus:border-[#c9a24b]",
              buttonClassName: "bg-[#c9a24b] text-black hover:bg-[#b08e3f]",
              radioClassName: "border-white/20 text-white/70",
              radioActiveClassName: "bg-[#c9a24b] text-black border-[#c9a24b]",
              labelClassName: "text-white/70",
              wishItemClassName: "border border-white/10",
              wishNameClassName: "text-white",
              wishMessageClassName: "text-white/60",
              wishMetaClassName: "text-[#c9a24b]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="border-y border-white/10 px-6 py-20">
        <Reveal direction="scale" className="mx-auto max-w-lg text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-white/60">Doa restu Anda adalah hadiah terindah. Namun bila berkenan memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-white/10 text-left text-white" buttonClassName="border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ CLOSING -- ending credits ============ */}
      <footer className="scene-h flex flex-col items-center justify-center px-6 text-center text-white/60">
        <p className="text-xs uppercase tracking-[0.4em] text-[#c9a24b]">The End</p>
        <p className="mt-4 font-[family-name:var(--font-display)] text-3xl text-white">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <div className="mx-auto mt-8 flex max-w-xs flex-col gap-2 text-xs uppercase tracking-widest">
          <p>Directed by Love</p>
          <p>Produced with Doa Restu Keluarga</p>
          <p>Starring {data.groom.fullName} &amp; {data.bride.fullName}</p>
        </div>
        <p className="mt-8 text-xs normal-case tracking-normal text-white/40">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
