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
import { OrnamentRumahGadang, OrnamentSongketDiamond } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Cinzel', serif",
  "--font-body": "'Lora', serif",
});

/**
 * MINANG ROYAL -- "lapisan rumah gadang terbang melewati kamera".
 * Opening = tiga lapis siluet atap rumah gadang pada depth berbeda
 * (perspective + translateZ) yang bergerak menjauh dengan kecepatan
 * berbeda saat dibuka -- mekanisme "terbang menembus depth", bukan
 * pintu/gerbang yang membuka seperti template lain.
 */
export default function MinangRoyalTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#fff6ec] font-[family-name:var(--font-body)] text-[#4a1420]">
      {/* ============ OPENING: lapisan rumah gadang ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex items-end justify-center overflow-hidden bg-[#2a0a12] pb-0">
          <div
            className={cn("preserve-3d absolute inset-x-0 bottom-0 transition-all duration-[1000ms] ease-in", phase === "closing" ? "[transform:translateZ(-260px)] opacity-0" : "[transform:translateZ(-120px)] opacity-40")}
          >
            <OrnamentRumahGadang className="mx-auto h-40 w-[140%] text-[#d4af37]" />
          </div>
          <div
            className={cn("preserve-3d absolute inset-x-0 bottom-0 transition-all duration-[1000ms] ease-in", phase === "closing" ? "[transform:translateZ(-140px)] opacity-0" : "[transform:translateZ(-40px)] opacity-70")}
            style={{ transitionDelay: "60ms" }}
          >
            <OrnamentRumahGadang className="mx-auto h-52 w-[120%] text-[#d4af37]" />
          </div>
          <div
            className={cn("preserve-3d absolute inset-x-0 bottom-0 transition-all duration-[1000ms] ease-in", phase === "closing" ? "[transform:translateZ(200px)] opacity-0" : "[transform:translateZ(0px)] opacity-100")}
            style={{ transitionDelay: "120ms" }}
          >
            <OrnamentRumahGadang className="mx-auto h-64 w-full text-[#5c0f1c]" />
          </div>

          <div className={cn("absolute inset-x-0 top-16 z-10 px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.4em] text-[#d4af37]">Baralek Gadang</p>
            <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-display)] text-4xl sm:text-5xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#f0d9c6]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#2a0a12]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#4a1420] text-[#d4af37]" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative mx-auto flex max-w-lg flex-col items-center justify-center px-6 text-center">
        <Reveal direction="depth">
          <div className="relative border-4 border-[#d4af37] p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.heroPhotoUrl} alt="Pasangan" className="h-72 w-full object-cover" />
          </div>
        </Reveal>
      </section>

      <OrnamentSongketDiamond className="mx-auto mt-10 h-4 w-[85%] text-[#d4af37]" />

      {/* ============ COUPLE ============ */}
      <section className="mx-auto max-w-lg px-6 py-14">
        <div className="flex flex-col gap-12">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction={i % 2 === 0 ? "left" : "right"} delay={i * 150} className="flex flex-col items-center border border-[#d4af37]/50 p-8 text-center">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="h-32 w-32 rounded-full"
                frameClassName="border-4 border-[#d4af37]"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-5deg)]" : "[transform:rotateY(5deg)]"}
              />
              <p className="mt-5 text-xs uppercase tracking-widest text-[#a8791f]">{person.childOrder}</p>
              <p className="text-sm">
                {person.parents.father} &amp; {person.parents.mother}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[#4a1420]">{person.nickname}</h3>
              <p className="text-sm font-medium">{person.fullName}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#4a1420] px-6 text-center text-[#fff6ec]">
        <OrnamentSongketDiamond className="mx-auto mb-12 h-4 w-40 text-[#d4af37]" />
        <Reveal direction="scale">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Menghitung Hari</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="songket-frame" pastLabelClassName="text-[#f0d9c6]" />
          </div>
        </Reveal>
        <div className="mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="depth" delay={i * 150} className="border border-[#d4af37]/40 p-7">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#d4af37]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#f0d9c6]">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="sepia" buttonClassName="border border-[#d4af37] text-[#fff6ec] hover:bg-[#d4af37] hover:text-[#4a1420]" />
            </Reveal>
          ))}
        </div>
        <OrnamentSongketDiamond className="mx-auto mt-12 h-4 w-40 text-[#d4af37]" />
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#4a1420]">Perjalanan Kasih</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="scale" delay={i * 100} className="border border-[#d4af37]/40 p-5 text-center">
              <p className="text-xs uppercase tracking-widest text-[#a8791f]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)] text-lg">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#5a2a35]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#4a1420]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="heritage-frame" accentClassName="border-[#4a1420]" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#4a1420]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#d4af37]/50 bg-white p-6",
              inputClassName: "border-[#d4af37]/60 focus:border-[#4a1420]",
              textareaClassName: "border-[#d4af37]/60 focus:border-[#4a1420]",
              buttonClassName: "bg-[#4a1420] text-white hover:bg-[#6a1c2c]",
              radioClassName: "border-[#d4af37]/60 text-[#5a2a35]",
              radioActiveClassName: "bg-[#4a1420] text-white border-[#4a1420]",
              labelClassName: "text-[#5a2a35]",
              wishItemClassName: "border border-[#d4af37]/30 bg-white",
              wishMessageClassName: "text-[#5a2a35]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#f3e3c8] px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#4a1420]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#5a2a35]">Doa restu Bapak/Ibu/Saudara/i merupakan karunia bagi kami. Bila hendak memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/50 bg-[#fff6ec] text-left" buttonClassName="border border-[#4a1420] text-[#4a1420] hover:bg-[#4a1420] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="scene-h flex flex-col items-center justify-center bg-[#2a0a12] px-6 text-center text-[#d4af37]">
        <OrnamentSongketDiamond className="mx-auto mb-6 h-4 w-40" />
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-2xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs text-[#f0d9c6]">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
