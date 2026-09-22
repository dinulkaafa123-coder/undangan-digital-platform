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
import { OrnamentPearlDrop, OrnamentWaveCrest } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Tenor Sans', sans-serif",
  "--font-body": "'Jost', sans-serif",
});

function WaveDivider({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-10 overflow-hidden", className)}>
      <OrnamentWaveCrest className="animate-float-slow absolute inset-x-0 top-0 h-10 w-full text-current" />
    </div>
  );
}

/**
 * OCEAN PEARL -- "cakrawala laut & mutiara".
 * Opening = horizon laut dengan pantulan cahaya matahari yang bergerak
 * lembut, mutiara yang membesar mengungkap nama; transisi antar-section
 * memakai garis gelombang, bukan garis lurus.
 */
export default function OceanPearlTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(950);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#f5f1ea] font-[family-name:var(--font-body)] text-[#2c5f73]">
      {/* ============ OPENING: horizon laut ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-b from-[#bfe0ea] via-[#7fb2c9] to-[#2c5f73]">
          <div className="absolute inset-x-0 top-[45%] h-px bg-white/40" />
          <div className="absolute inset-x-0 top-[45%] h-24 bg-gradient-to-b from-white/30 to-transparent" />
          <div className="text-[#f5f1ea]">
            <OrnamentWaveCrest className="animate-float-slow absolute bottom-24 left-0 h-8 w-full opacity-60" />
            <OrnamentWaveCrest className="animate-float-slower absolute bottom-16 left-0 h-10 w-full opacity-40" />
          </div>

          <div className={cn("absolute left-1/2 top-1/3 -translate-x-1/2 transition-transform duration-[950ms] ease-in text-[#f5f1ea]", phase === "closing" ? "scale-[10]" : "scale-100")}>
            <OrnamentPearlDrop className="h-16 w-14" />
          </div>

          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="mt-24 text-xs uppercase tracking-[0.5em] text-white/90">Destination Wedding</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl text-white">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-white/85">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-white text-white hover:bg-white hover:text-[#2c5f73]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#2c5f73] bg-white text-[#2c5f73]" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5f1ea] via-transparent to-transparent" />
      </section>
      <WaveDivider className="text-[#7fb2c9]" />

      <section className="mx-auto max-w-md px-6 py-14 text-center">
        <Reveal direction="editorial">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#2c5f73]">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#4a8399]">{data.quote.text}</p>
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
                frameClassName="border border-[#7fb2c9]"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-4deg)]" : "[transform:rotateY(4deg)]"}
              />
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl text-[#2c5f73]">{person.nickname}</h3>
              <p className="mt-1 text-sm font-medium">{person.fullName}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#4a8399]">
                {person.childOrder}
                <br />
                {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <WaveDivider className="text-[#c9a24b]" />

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#2c5f73] px-6 text-center text-white">
        <Reveal direction="scale">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Menuju Hari Bahagia</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="wave-pulse" pastLabelClassName="text-white" />
          </div>
        </Reveal>
        <div className="mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="up" delay={i * 150} className="rounded-t-3xl border border-white/30 bg-white/5 p-7">
              <h3 className="font-[family-name:var(--font-display)] text-xl">{event.name}</h3>
              <p className="mt-2 text-sm text-white/80">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-white/80">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-white/70">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale" buttonClassName="rounded-full border border-white text-white hover:bg-white hover:text-[#2c5f73]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c5f73]">Kisah Kami</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="border-b border-[#c7dbe2] pb-6">
              <p className="text-xs uppercase tracking-wide text-[#c9a24b]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)] text-lg">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#4a8399]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- carousel depth ============ */}
      <section className="py-20">
        <Reveal direction="up" className="px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c5f73]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="carousel-depth" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c5f73]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-t-3xl border border-[#c7dbe2] bg-white p-6",
              inputClassName: "rounded-full border-[#c7dbe2] focus:border-[#2c5f73]",
              textareaClassName: "rounded-2xl border-[#c7dbe2] focus:border-[#2c5f73]",
              buttonClassName: "rounded-full bg-[#2c5f73] text-white",
              radioClassName: "rounded-full border-[#c7dbe2] text-[#4a8399]",
              radioActiveClassName: "bg-[#2c5f73] text-white border-[#2c5f73]",
              labelClassName: "text-[#4a8399]",
              wishItemClassName: "rounded-2xl border border-[#c7dbe2] bg-white",
              wishMessageClassName: "text-[#4a8399]",
              wishMetaClassName: "text-[#c9a24b]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-white px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c5f73]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#4a8399]">Kehadiran Anda adalah kebahagiaan kami. Jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="rounded-t-2xl border border-[#c7dbe2] text-left" buttonClassName="rounded-full border border-[#2c5f73] text-[#2c5f73] hover:bg-[#2c5f73] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="scene-h flex flex-col items-center justify-center bg-[#2c5f73] px-6 text-center text-white/80">
        <p className="font-[family-name:var(--font-display)] text-2xl text-white">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
