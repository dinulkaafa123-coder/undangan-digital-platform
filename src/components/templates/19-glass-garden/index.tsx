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
import { OrnamentGlassPetal } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Comfortaa', sans-serif",
  "--font-body": "'Quicksand', sans-serif",
});

const PETAL_ANGLES = [0, 60, 120, 180, 240, 300];

/**
 * GLASS GARDEN -- "kelopak kaca membuka".
 * Opening = 6 kelopak kaca tersusun radial di sekitar titik pusat,
 * membuka/menyebar (rotate + scale keluar) seperti bunga mekar --
 * bukan pintu/tirai/iris seperti template lain -- tetap terasa
 * sebagai undangan lewat tipografi & ucapan, bukan dashboard kaca.
 */
export default function GlassGardenTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(950);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#eef6f2] font-[family-name:var(--font-body)] text-[#1f3d2c]">
      {/* ============ OPENING: kelopak kaca mekar ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#0c1f16] px-6">
          <div className="preserve-3d relative h-72 w-72">
            {PETAL_ANGLES.map((angle, i) => (
              <div
                key={angle}
                className="preserve-3d absolute left-1/2 top-1/2 h-36 w-24 origin-bottom transition-all ease-in"
                style={{
                  transform: `translate(-50%, -100%) rotate(${angle}deg) ${phase === "closing" ? "scale(3.2)" : "scale(1)"}`,
                  transitionDuration: "950ms",
                  transitionDelay: `${i * 40}ms`,
                  opacity: phase === "closing" ? 0 : 1,
                }}
              >
                <OrnamentGlassPetal className="h-full w-full text-[#bfe3d0]" />
              </div>
            ))}
          </div>

          <div className={cn("absolute z-10 px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.4em] text-[#bfe3d0]">Glass Garden</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#cfe8db]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#bfe3d0] text-white hover:bg-[#bfe3d0] hover:text-[#0c1f16]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#2f5a44] bg-white/70 text-[#2f5a44] backdrop-blur-md" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative mx-auto flex max-w-lg flex-col items-center justify-center px-6 text-center">
        <Reveal direction="blur-scale">
          <div className="mx-auto h-56 w-56 overflow-hidden rounded-full border border-white/60 bg-white/30 p-2 shadow-[0_25px_50px_-15px_rgba(47,90,68,0.25)] backdrop-blur-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full rounded-full object-cover" />
          </div>
          <h2 className="mt-6 font-[family-name:var(--font-display)] text-2xl text-[#2f5a44]">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h2>
          <p className="mt-3 text-sm text-[#3f5a44]">{data.quote.text}</p>
        </Reveal>
      </section>

      {/* ============ COUPLE ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction="blur-scale" delay={i * 150} className="border border-white/60 bg-white/40 p-6 text-center shadow-[0_20px_40px_-20px_rgba(47,90,68,0.25)] backdrop-blur-md">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="mx-auto h-32 w-32 rounded-full"
                frameClassName="border border-white"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-4deg)]" : "[transform:rotateY(4deg)]"}
              />
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl text-[#2f5a44]">{person.nickname}</h3>
              <p className="mt-1 text-sm font-medium">{person.fullName}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#3f5a44]">
                {person.childOrder}
                <br />
                {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#2f5a44] px-6 text-center text-white">
        <Reveal direction="scale">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Menuju Hari Bahagia</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="glass-leaf" />
          </div>
        </Reveal>
        <div className="mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="blur-scale" delay={i * 150} className="border border-white/30 bg-white/10 p-7 backdrop-blur-md">
              <h3 className="font-[family-name:var(--font-display)] text-lg">{event.name}</h3>
              <p className="mt-2 text-sm text-white/80">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-white/80">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-white/70">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-white text-white hover:bg-white hover:text-[#2f5a44]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2f5a44]">Kisah Kami</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="border border-white/60 bg-white/40 p-5 text-center backdrop-blur-sm">
              <p className="text-xs uppercase tracking-wide text-[#3f5a44]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)]">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#3f5a44]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- mosaic reveal ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2f5a44]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="mosaic-reveal" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-md px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2f5a44]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-white/60 bg-white/40 p-6 backdrop-blur-md",
              inputClassName: "border-white/70 bg-white/60 focus:border-[#2f5a44]",
              textareaClassName: "border-white/70 bg-white/60 focus:border-[#2f5a44]",
              buttonClassName: "bg-[#2f5a44] text-white",
              radioClassName: "border-white/70 bg-white/60 text-[#3f5a44]",
              radioActiveClassName: "bg-[#2f5a44] text-white border-[#2f5a44]",
              labelClassName: "text-[#3f5a44]",
              wishItemClassName: "border border-white/60 bg-white/40",
              wishMessageClassName: "text-[#3f5a44]",
              wishMetaClassName: "text-[#2f5a44]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#eef6f2] px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2f5a44]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#3f5a44]">Doa restu Anda sudah sangat berarti. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-white bg-white/60 text-left backdrop-blur-sm" buttonClassName="border border-[#2f5a44] text-[#2f5a44] hover:bg-[#2f5a44] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="bg-[#0c1f16] px-6 py-14 text-center text-[#bfe3d0]">
        <p className="font-[family-name:var(--font-display)] text-2xl text-white">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
