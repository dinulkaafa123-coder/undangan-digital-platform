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
import { OrnamentGebyokPanel, OrnamentGunungan, OrnamentBatikBorder } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Cormorant Garamond', serif",
  "--font-body": "'Lora', serif",
});

/**
 * ROYAL JAVANESE -- "gebyok terbuka, gunungan muncul".
 * Opening = dua panel gebyok ukir (hinge rotateY murni di tepi luar,
 * tanpa translateX) yang membuka, sementara siluet gunungan naik dari
 * bawah tengah layar -- modern luxury, bukan nuansa web pemerintahan.
 */
export default function RoyalJavaneseTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1050);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#fff8ec] font-[family-name:var(--font-body)] text-[#3a1414]">
      {/* ============ OPENING: gebyok & gunungan ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#2a1010]">
          <FloatingParticles count={12} particleClassName="bg-[#d4af37]/70" />
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 transition-transform duration-[1050ms] ease-out",
              phase === "closing" ? "translate-y-4 opacity-40" : "translate-y-0 opacity-100"
            )}
          >
            <OrnamentGunungan className="mx-auto h-[70vh] w-auto text-[#5c1a1a]/60" />
          </div>

          <div className={cn("preserve-3d absolute inset-y-0 left-0 w-1/2 origin-left bg-[#4a1c10] transition-transform duration-[1050ms] ease-in-out", phase === "closing" && "[transform:rotateY(-120deg)]")}>
            <OrnamentGebyokPanel className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] text-[#d4af37]/60" />
          </div>
          <div className={cn("preserve-3d absolute inset-y-0 right-0 w-1/2 origin-right bg-[#4a1c10] transition-transform duration-[1050ms] ease-in-out", phase === "closing" && "[transform:rotateY(120deg)]")}>
            <OrnamentGebyokPanel className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] text-[#d4af37]/60" />
          </div>

          <div className={cn("relative z-10 px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Tanpa mengurangi rasa hormat</p>
            <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-display)] text-4xl sm:text-5xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#f0dcb0]">Bapak/Ibu/Saudara/i</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-[#fff8ec]">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border-2 border-[#d4af37] text-[#fff8ec] hover:bg-[#d4af37] hover:text-[#2a1010]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#5c1a1a] text-[#d4af37]" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative mx-auto flex max-w-lg flex-col items-center justify-center px-6 text-center">
        <Reveal direction="unfold">
          <div className="relative border-[6px] border-double border-[#d4af37] p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.heroPhotoUrl} alt="Pasangan" className="h-72 w-full object-cover" />
          </div>
        </Reveal>
      </section>

      <OrnamentBatikBorder className="mx-auto mt-10 h-4 w-[85%] text-[#d4af37]" />

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
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[#5c1a1a]">{person.nickname}</h3>
              <p className="text-sm font-medium">{person.fullName}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#5c1a1a] px-6 text-[#fff8ec]">
        <OrnamentGunungan className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-auto -translate-x-1/2 text-[#d4af37]/10" />
        <OrnamentBatikBorder className="relative mx-auto mb-12 h-4 w-40 text-[#d4af37]" />
        <Reveal direction="scale" className="relative text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Menghitung Hari</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="gebyok-frame" pastLabelClassName="text-[#f0dcb0]" />
          </div>
        </Reveal>
        <div className="relative mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="depth" delay={i * 150} className="border border-[#d4af37]/40 p-7 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#d4af37]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#f0dcb0]">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="sepia" buttonClassName="border border-[#d4af37] text-[#fff8ec] hover:bg-[#d4af37] hover:text-[#5c1a1a]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5c1a1a]">Perjalanan Kasih</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="scale" delay={i * 100} className="border border-[#d4af37]/40 p-5 text-center">
              <p className="mt-1 text-xs uppercase tracking-widest text-[#a8791f]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)] text-lg text-[#5c1a1a]">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#5a3a3a]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5c1a1a]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="heritage-frame" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5c1a1a]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#d4af37]/50 bg-white p-6",
              inputClassName: "border-[#d4af37]/60 focus:border-[#5c1a1a]",
              textareaClassName: "border-[#d4af37]/60 focus:border-[#5c1a1a]",
              buttonClassName: "bg-[#5c1a1a] text-white hover:bg-[#7a2424]",
              radioClassName: "border-[#d4af37]/60 text-[#5a3a3a]",
              radioActiveClassName: "bg-[#5c1a1a] text-white border-[#5c1a1a]",
              labelClassName: "text-[#5a3a3a]",
              wishItemClassName: "border border-[#d4af37]/30 bg-white",
              wishMessageClassName: "text-[#5a3a3a]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#f3e6c8] px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5c1a1a]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#5a3a3a]">Doa restu Bapak/Ibu/Saudara/i merupakan karunia bagi kami. Bila hendak memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/50 bg-[#fff8ec] text-left" buttonClassName="border border-[#5c1a1a] text-[#5c1a1a] hover:bg-[#5c1a1a] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#5c1a1a] px-6 text-center text-[#d4af37]">
        <OrnamentBatikBorder className="mx-auto mb-6 h-4 w-40 text-[#d4af37]" />
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-2xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs text-[#f0dcb0]">Merupakan suatu kehormatan bila Bapak/Ibu/Saudara/i berkenan hadir</p>
      </footer>
    </div>
  );
}
