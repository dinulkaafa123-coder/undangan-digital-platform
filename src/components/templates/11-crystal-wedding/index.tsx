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
import { OrnamentDiamondFacet } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Cormorant Garamond', serif",
  "--font-body": "'Comfortaa', sans-serif",
});

/**
 * CRYSTAL WEDDING -- "kristal terbentuk, lalu pecah mengungkap nama".
 * Opening = facet berlian yang berputar pelan seolah "terbentuk", lalu
 * saat dibuka ia membesar tajam (scale + rotate cepat) dan memudar --
 * berbeda dari iris bundar Black Diamond maupun pintu istana.
 */
export default function CrystalWeddingTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(850);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#eef3f7] font-[family-name:var(--font-body)] text-[#2c3e46]">
      {/* ============ OPENING: kristal terbentuk lalu pecah ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0f1b22] px-6 text-center">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(159,182,196,0.15),transparent_40%,rgba(255,255,255,0.08)_60%,transparent)]" />
          <div
            className={cn(
              "preserve-3d relative transition-all ease-in",
              phase === "closing" ? "duration-[850ms] scale-[6] rotate-[25deg] opacity-0" : "duration-[2000ms] animate-float-slower scale-100 rotate-0 opacity-100"
            )}
          >
            <OrnamentDiamondFacet className="mx-auto h-32 w-24 text-[#c7d6de]" />
          </div>
          <div className={cn("relative z-10 mt-6 transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.5em] text-[#9fb6c4]">Crystal Wedding</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl text-white">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#c7d6de]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#c7d6de] text-white hover:bg-[#c7d6de] hover:text-[#0f1b22]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#9fb6c4] bg-white text-[#4a6a78]" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#eef3f7] via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-6 text-center">
          <Reveal direction="blur-scale">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#2c3e46]">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-md px-6 py-14 text-center">
        <Reveal direction="editorial">
          <p className="text-sm leading-relaxed text-[#4a6a78]">{data.quote.text}</p>
          {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#9fb6c4]">{data.quote.source}</p>}
        </Reveal>
      </section>

      {/* ============ COUPLE ============ */}
      <section className="mx-auto max-w-lg px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction="blur-scale" delay={i * 150} className="border border-white bg-white/50 p-6 text-center shadow-[0_25px_50px_-25px_rgba(80,110,130,0.4)] backdrop-blur-sm">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="mx-auto h-32 w-32 rounded-full"
                frameClassName="border border-[#9fb6c4]"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-5deg)]" : "[transform:rotateY(5deg)]"}
              />
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl text-[#2c3e46]">{person.nickname}</h3>
              <p className="mt-1 text-sm font-medium">{person.fullName}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#4a6a78]">
                {person.childOrder}
                <br />
                {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT -- crystal cards ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#0f1b22] px-6 text-white">
        <Reveal direction="scale" className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#9fb6c4]">Menuju Hari Bahagia</p>
          <div className="mt-8">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="glass-panel" pastLabelClassName="text-white" />
          </div>
        </Reveal>
        <div className="perspective-1600 mx-auto flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal
              key={event.id}
              direction="blur-scale"
              delay={i * 150}
              className={cn("preserve-3d border border-white/30 bg-white/5 p-7 text-center backdrop-blur-md", i % 2 === 0 ? "[transform:rotateX(2deg)]" : "[transform:rotateX(-2deg)]")}
            >
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#c7d6de]">{event.name}</h3>
              <p className="mt-2 text-sm text-white/80">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-white/80">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-white/60">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale contrast-125 invert-[0.9]" buttonClassName="border border-[#c7d6de] text-[#c7d6de] hover:bg-[#c7d6de] hover:text-[#0f1b22]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c3e46]">Kisah Kami</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="border-b border-[#c7d6de] pb-6">
              <p className="text-xs uppercase tracking-wide text-[#9fb6c4]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)] text-lg">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#4a6a78]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- 3D card stack ============ */}
      <section className="px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c3e46]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="card-stack-3d" accentClassName="border-[#9fb6c4]" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c3e46]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#c7d6de] bg-white/60 p-6 backdrop-blur-sm",
              inputClassName: "border-[#c7d6de] focus:border-[#4a6a78]",
              textareaClassName: "border-[#c7d6de] focus:border-[#4a6a78]",
              buttonClassName: "bg-[#4a6a78] text-white hover:bg-[#2c3e46]",
              radioClassName: "border-[#c7d6de] text-[#4a6a78]",
              radioActiveClassName: "bg-[#4a6a78] text-white border-[#4a6a78]",
              labelClassName: "text-[#4a6a78]",
              wishItemClassName: "border border-[#c7d6de] bg-white/60",
              wishMessageClassName: "text-[#4a6a78]",
              wishMetaClassName: "text-[#9fb6c4]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-white px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#2c3e46]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#4a6a78]">Doa restu Anda sudah lebih dari cukup. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#c7d6de] text-left" buttonClassName="border border-[#4a6a78] text-[#4a6a78] hover:bg-[#4a6a78] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="scene-h flex flex-col items-center justify-center bg-[#0f1b22] px-6 text-center text-[#c7d6de]">
        <p className="font-[family-name:var(--font-display)] text-2xl text-white">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
