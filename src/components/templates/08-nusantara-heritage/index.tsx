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
import { OrnamentBatikBorder, OrnamentGapura } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Playfair Display', serif",
  "--font-body": "'Lora', serif",
});

/** Strip batik yang muncul di setiap batas section -- ciri khas berulang template ini. */
function BatikDivider({ flip }: { flip?: boolean }) {
  return <OrnamentBatikBorder className={cn("mx-auto my-1 h-3 w-[70%] text-[#d4af37]/70", flip && "rotate-180")} />;
}

/**
 * ============================================================
 * NUSANTARA HERITAGE -- "Modern Indonesian Heritage"
 * ============================================================
 * Strip batik jadi jahitan yang berulang di SETIAP batas section,
 * gapura jadi struktur gerbang pembuka & penutup (bukan cuma
 * ornamen sudut), dan setiap section utama jadi scene 100dvh.
 * Terinspirasi estetika Nusantara secara umum -- desain original,
 * bukan representasi akurat satu suku/daerah tertentu.
 */
export default function NusantaraHeritageTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(950);
  const heroParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative bg-[#fff8ec] font-[family-name:var(--font-body)] text-[#3a1414]">
      {/* ============ 1. TRADITIONAL GATEWAY OPENING ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#3a1010]">
          <div
            className={cn(
              "preserve-3d absolute inset-y-0 left-0 w-1/2 border-r-2 border-[#d4af37]/50 bg-[#5c1a1a] transition-all duration-[950ms] ease-in-out",
              phase === "closing" && "-translate-x-[55%] [transform:translateX(-55%)_rotateY(35deg)]"
            )}
          >
            <OrnamentBatikBorder className="absolute inset-x-4 top-6 h-4 text-[#d4af37]" />
            <OrnamentBatikBorder className="absolute inset-x-4 bottom-6 h-4 rotate-180 text-[#d4af37]" />
          </div>
          <div
            className={cn(
              "preserve-3d absolute inset-y-0 right-0 w-1/2 border-l-2 border-[#d4af37]/50 bg-[#5c1a1a] transition-all duration-[950ms] ease-in-out",
              phase === "closing" && "translate-x-[55%] [transform:translateX(55%)_rotateY(-35deg)]"
            )}
          >
            <OrnamentBatikBorder className="absolute inset-x-4 top-6 h-4 text-[#d4af37]" />
            <OrnamentBatikBorder className="absolute inset-x-4 bottom-6 h-4 rotate-180 text-[#d4af37]" />
          </div>
          <div className={cn("relative z-10 px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <OrnamentGapura className="mx-auto h-14 w-auto text-[#d4af37]" />
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#d4af37]">Undangan Pernikahan</p>
            <p className="mt-6 text-sm italic text-[#f0dcb0]">Tanpa mengurangi rasa hormat, kami mengundang</p>
            <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-display)] text-4xl sm:text-5xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#f0dcb0]">Bapak/Ibu/Saudara/i</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-[#fff8ec]">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border-2 border-[#d4af37] text-[#fff8ec] hover:bg-[#d4af37] hover:text-[#5c1a1a]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#5c1a1a] text-[#d4af37]" />

      {/* ============ 2. HERO -- foto penuh layar di bawah gapura ============ */}
      <section className="scene-h relative flex items-end overflow-hidden">
        <div ref={heroParallax} className="absolute inset-0 h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fff8ec] via-transparent to-transparent" />
        <OrnamentGapura className="pointer-events-none absolute left-1/2 top-8 h-16 w-auto -translate-x-1/2 text-[#fff8ec]" />
        <div className="relative z-10 w-full px-6 pb-14 text-center">
          <Reveal direction="split">
            <h1 className="font-[family-name:var(--font-display)] text-4xl text-[#5c1a1a] sm:text-5xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
          </Reveal>
        </div>
      </section>
      <BatikDivider />

      {/* ============ 3. CULTURAL QUOTE + DATE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <Reveal direction="up" className="mx-auto max-w-lg">
          <p className="text-base italic leading-relaxed text-[#5a3a3a]">{data.quote.text}</p>
          {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#a8791f]">{data.quote.source}</p>}
        </Reveal>
        <Reveal direction="scale" delay={150} className="mt-14 border-y-2 border-[#5c1a1a] px-8 py-5">
          <p className="text-xs uppercase tracking-widest text-[#a8791f]">Tanggal Bahagia</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-xl text-[#5c1a1a]">{formatFullDate(data.events[0].date)}</p>
        </Reveal>
      </section>
      <BatikDivider flip />

      {/* ============ 4-5. COUPLE -- dua scene terpisah ============ */}
      {[data.groom, data.bride].map((person, i) => (
        <section key={person.fullName} className="scene-h relative flex flex-col items-center justify-center border border-[#d4af37]/30 px-6 text-center">
          <Reveal direction={i % 2 === 0 ? "left" : "right"} delay={i * 150}>
            <PhotoFrame3D
              src={person.photoUrl}
              alt={person.fullName}
              shapeClassName="h-40 w-40 rounded-full"
              frameClassName="border-4 border-[#d4af37]"
              tiltClassName={i % 2 === 0 ? "[transform:rotateY(-5deg)]" : "[transform:rotateY(5deg)]"}
            />
            <p className="mt-5 text-xs uppercase tracking-widest text-[#a8791f]">{person.childOrder}</p>
            <p className="text-sm">
              {person.parents.father} &amp; {person.parents.mother}
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[#5c1a1a]">{person.nickname}</h3>
            <p className="text-sm font-medium">{person.fullName}</p>
          </Reveal>
        </section>
      ))}
      <BatikDivider />

      {/* ============ 6. COUNTDOWN + EVENT ============ */}
      <section className="relative overflow-hidden bg-[#5c1a1a] px-6 py-20 text-[#fff8ec]">
        <Reveal direction="scale" className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">Menghitung Hari</p>
          <div className="mt-8">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="heritage-frame" pastLabelClassName="text-[#f0dcb0]" />
          </div>
        </Reveal>
        <div className="mx-auto flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="split" delay={i * 150} className="border border-[#d4af37]/40 p-7 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#d4af37]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#f0dcb0]">{event.address}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <BatikDivider />

      {/* ============ 7. CULTURAL LOVE STORY ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="split" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5c1a1a]">Perjalanan Kasih</h2>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-lg grid-cols-1 gap-6 sm:grid-cols-2">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="scale" delay={i * 100} className="border border-[#d4af37]/40 p-5 text-center">
              {moment.photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={moment.photoUrl} alt={moment.title} className="h-32 w-full object-cover" />
              )}
              <p className="mt-3 text-xs uppercase tracking-widest text-[#a8791f]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-display)] text-lg text-[#5c1a1a]">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#5a3a3a]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <BatikDivider flip />

      {/* ============ 8. HERITAGE GALLERY ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="split" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5c1a1a]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="heritage-frame" accentClassName="border-[#d4af37]" />
        </div>
      </section>
      <BatikDivider />

      {/* ============ 9. LOCATION ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#f3e6c8] px-6 text-center">
        <Reveal direction="scale" className="mx-auto w-full max-w-lg">
          <OrnamentGapura className="mx-auto mb-4 h-12 w-auto text-[#5c1a1a]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5c1a1a]">Lokasi</h2>
          <p className="mt-2 text-sm text-[#5a3a3a]">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard event={data.events[data.events.length - 1]} className="mt-6" iframeClassName="sepia" buttonClassName="border border-[#5c1a1a] text-[#5c1a1a] hover:bg-[#5c1a1a] hover:text-white" />
        </Reveal>
      </section>

      {/* ============ 10. RSVP ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="split" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5c1a1a]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
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
      <BatikDivider flip />

      {/* ============ 11. GIFT ============ */}
      <section className="relative bg-[#f3e6c8] px-6 py-20 text-center">
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

      {/* ============ 12. CLOSING -- gerbang menutup ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#5c1a1a] px-6 text-center text-[#d4af37]">
        <OrnamentGapura className="pointer-events-none absolute left-1/2 top-10 h-20 w-auto -translate-x-1/2 text-[#d4af37]/20" />
        <OrnamentBatikBorder className="relative mx-auto mb-6 h-4 w-40 text-[#d4af37]" />
        <p className="text-gold-gradient relative font-[family-name:var(--font-display)] text-3xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="relative mt-3 text-xs text-[#f0dcb0]">Merupakan suatu kehormatan bila Bapak/Ibu/Saudara/i berkenan hadir</p>
      </footer>
    </div>
  );
}
