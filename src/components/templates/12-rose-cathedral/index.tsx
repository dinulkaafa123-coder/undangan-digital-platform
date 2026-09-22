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
import { OrnamentCathedralArch, OrnamentRosetteWindow, OrnamentGardenBloom } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-heading": "'Cormorant Garamond', serif",
  "--font-body": "'Lora', serif",
});

/**
 * ROSE CATHEDRAL -- "melangkah masuk lewat gerbang katedral".
 * Opening = lengkung gotik raksasa dengan mawar berlapis di depan &
 * belakang serta cahaya jatuh dari jendela mawar; kamera terasa
 * bergerak masuk (scale zoom) melewati lengkung -- arsitektur jadi
 * bagian dari layout, bukan sekadar hiasan.
 */
export default function RoseCathedralTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#fdf4f0] font-[family-name:var(--font-body)] text-[#3a1420]">
      {/* ============ OPENING: gerbang katedral ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#2a0d16] px-6 text-center">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(212,175,106,0.15)_0%,transparent_50%)]" />
          <OrnamentRosetteWindow className="absolute left-1/2 top-6 h-32 w-32 -translate-x-1/2 text-[#d4af6a]/25" />
          <OrnamentGardenBloom className="absolute -left-8 bottom-10 h-36 w-36 text-[#7a1f35]/50" />
          <OrnamentGardenBloom className="absolute -right-10 top-1/3 h-40 w-40 text-[#7a1f35]/40" />

          <div
            className={cn(
              "relative transition-transform duration-[1000ms] ease-in [transform-origin:50%_60%]",
              phase === "closing" ? "scale-[6]" : "scale-100"
            )}
          >
            <OrnamentCathedralArch className="mx-auto h-56 w-44 text-[#d4af6a]" />
          </div>

          <div className={cn("relative z-10 mt-6 transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.4em] text-[#d4af6a]">Holy Matrimony</p>
            <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-heading)] text-5xl italic">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#e7c9c0]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-heading)] text-lg italic text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#d4af6a] text-white hover:bg-[#d4af6a] hover:text-[#2a0d16]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4af6a] bg-[#2a0d16] text-[#d4af6a]" />

      {/* ============ HERO ============ */}
      <section className="relative mx-auto max-w-lg px-6 pt-16 text-center">
        <Reveal direction="unfold">
          <div className="relative mx-auto w-fit">
            <OrnamentCathedralArch className="absolute inset-0 h-full w-full text-[#d4af6a]" />
            <div className="relative m-3 h-64 w-48 overflow-hidden rounded-t-[999px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-md px-6 py-14 text-center">
        <Reveal direction="editorial">
          <p className="text-sm italic leading-relaxed text-[#5a2a35]">{data.quote.text}</p>
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
                frameClassName="border-4 border-[#d4af6a]"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-5deg)]" : "[transform:rotateY(5deg)]"}
                ornament={<OrnamentGardenBloom className="absolute -bottom-5 -right-5 h-14 w-14 text-[#7a1f35]" />}
              />
              <h3 className="mt-6 font-[family-name:var(--font-heading)] text-4xl italic text-[#7a1f35]">{person.nickname}</h3>
              <p className="mt-1 font-medium">{person.fullName}</p>
              <p className="mt-2 text-sm text-[#5a2a35]">
                {person.childOrder}
                <br />
                {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="bg-[#2a0d16] px-6 py-20 text-center text-white">
        <Reveal direction="scale">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic">Menuju Hari Bahagia</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="arch-glow" />
          </div>
        </Reveal>
        <div className="mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="unfold" delay={i * 150} className="border border-[#d4af6a]/40 p-7">
              <h3 className="font-[family-name:var(--font-heading)] text-xl italic text-[#d4af6a]">{event.name}</h3>
              <p className="mt-2 text-sm text-[#e7c9c0]">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-[#e7c9c0]">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#e7c9c0]/80">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-[#d4af6a] text-white hover:bg-[#d4af6a] hover:text-[#2a0d16]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#7a1f35]">Kisah Kami</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="border-b border-[#e7c9c0] pb-6">
              <p className="text-xs uppercase tracking-wide text-[#a8791f]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-heading)] text-lg italic">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#5a2a35]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- cathedral arch ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#7a1f35]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="cathedral-arch" accentClassName="border-[#d4af6a]" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-md px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#7a1f35]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#e7c9c0] bg-white p-6",
              inputClassName: "border-[#e7c9c0] focus:border-[#7a1f35]",
              textareaClassName: "border-[#e7c9c0] focus:border-[#7a1f35]",
              buttonClassName: "bg-[#7a1f35] text-white hover:bg-[#5a1626]",
              radioClassName: "border-[#e7c9c0] text-[#5a2a35]",
              radioActiveClassName: "bg-[#7a1f35] text-white border-[#7a1f35]",
              labelClassName: "text-[#5a2a35]",
              wishItemClassName: "border border-[#e7c9c0] bg-white",
              wishMessageClassName: "text-[#5a2a35]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#f6e2d8] px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#7a1f35]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#5a2a35]">Kehadiran Anda sudah menjadi berkah. Bila hendak memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#e7c9c0] bg-white text-left" buttonClassName="border border-[#7a1f35] text-[#7a1f35] hover:bg-[#7a1f35] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="bg-[#2a0d16] px-6 py-14 text-center text-[#e7c9c0]">
        <p className="text-gold-gradient font-[family-name:var(--font-heading)] text-2xl italic">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
