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
import { OrnamentDecoSunburst, OrnamentDecoChevron } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Bodoni Moda', serif",
  "--font-body": "'Poppins', sans-serif",
});

/**
 * ART DECO GATSBY -- "gerbang geometris art deco membuka kipas".
 * Opening = sunburst art deco yang berputar perlahan di belakang,
 * bingkai heksagonal berisi nama yang mengecil & memudar (bukan
 * hinge/tirai) mengungkap layout editorial 1920-an.
 */
export default function ArtDecoGatsbyTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(900);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#f2ead9] font-[family-name:var(--font-body)] text-[#0c0c0c]">
      {/* ============ OPENING: sunburst deco ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0c0c0c] px-6 text-center">
          <OrnamentDecoSunburst className="animate-spin-slow absolute left-1/2 top-1/2 h-[130vw] w-[130vw] max-w-none -translate-x-1/2 -translate-y-1/2 text-[#c9a24b]/15 sm:h-[70vw] sm:w-[70vw]" />

          <div
            className={cn(
              "relative z-10 border border-[#c9a24b] px-10 py-12 transition-all duration-[900ms] ease-in",
              phase === "closing" ? "scale-[4] opacity-0" : "scale-100 opacity-100"
            )}
            style={{ clipPath: "polygon(15% 0,85% 0,100% 15%,100% 85%,85% 100%,15% 100%,0 85%,0 15%)" }}
          >
            <OrnamentDecoChevron className="mx-auto mb-4 h-4 w-40 text-[#c9a24b]" />
            <p className="text-xs uppercase tracking-[0.5em] text-[#c9a24b]">A Roaring Celebration</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide text-[#f2ead9] sm:text-5xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <OrnamentDecoChevron className="mx-auto mt-4 h-4 w-40 rotate-180 text-[#c9a24b]" />
          </div>

          <div className={cn("relative z-10 mt-8 transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-sm text-[#e3d3ac]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-[#f2ead9]">{guestName}</p>
            <div className="mt-8">
              <GoldButton onClick={openInvitation} className="border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-[#0c0c0c]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#c9a24b] bg-[#0c0c0c] text-[#c9a24b]" />

      {/* ============ HERO -- editorial ============ */}
      <section className="scene-h mx-auto flex max-w-lg flex-col items-center justify-center px-6 text-center">
        <Reveal direction="drop">
          <OrnamentDecoChevron className="mx-auto mb-4 h-4 w-40 text-[#0c0c0c]" />
          <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h1>
          <p className="mt-4 text-sm italic text-[#4a4335]">{data.quote.text}</p>
        </Reveal>
      </section>

      {/* ============ COUPLE ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction="drop" delay={i * 150} className="border border-[#0c0c0c] p-6 text-center">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="mx-auto h-40 w-40"
                frameClassName="border-2 border-[#c9a24b]"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-4deg)]" : "[transform:rotateY(4deg)]"}
              />
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl">{person.nickname}</h3>
              <p className="mt-1 text-sm font-medium">{person.fullName}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#4a4335]">
                {person.childOrder}
                <br />
                {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#0c0c0c] px-6 text-center text-[#f2ead9]">
        <Reveal direction="scale">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Menuju Hari Bahagia</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="deco-frame" />
          </div>
        </Reveal>
        <div className="mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="drop" delay={i * 150} className="border border-[#c9a24b]/50 p-7">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#c9a24b]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#e3d3ac]">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-[#c9a24b] text-[#f2ead9] hover:bg-[#c9a24b] hover:text-[#0c0c0c]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Kisah Kami</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="grid grid-cols-[100px_1fr] gap-4 border-b border-[#0c0c0c]/20 pb-6">
              <span className="font-[family-name:var(--font-display)] text-sm text-[#c9a24b]">{moment.date}</span>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-base">{moment.title}</h3>
                <p className="mt-1 text-sm text-[#4a4335]">{moment.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- film strip ============ */}
      <section className="py-20">
        <Reveal direction="up" className="px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="film-strip" />
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
              cardClassName: "border border-[#0c0c0c] p-6",
              inputClassName: "rounded-none border-[#0c0c0c]/30 focus:border-[#0c0c0c]",
              textareaClassName: "rounded-none border-[#0c0c0c]/30 focus:border-[#0c0c0c]",
              buttonClassName: "bg-[#0c0c0c] text-[#c9a24b]",
              radioClassName: "rounded-none border-[#0c0c0c]/30 text-[#0c0c0c]/70",
              radioActiveClassName: "bg-[#0c0c0c] text-[#c9a24b] border-[#0c0c0c]",
              wishItemClassName: "border border-[#0c0c0c]/20",
              wishMessageClassName: "text-[#4a4335]",
              wishMetaClassName: "font-semibold text-[#c9a24b]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#0c0c0c] px-6 py-20 text-center text-[#f2ead9]">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#e3d3ac]">Doa restu Anda sudah lebih dari cukup. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#c9a24b]/40 text-left text-white" buttonClassName="bg-[#c9a24b] text-[#0c0c0c]" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="scene-h flex flex-col items-center justify-center border-t border-[#0c0c0c]/10 px-6 text-center text-[#4a4335]">
        <p className="font-[family-name:var(--font-display)] text-2xl text-[#0c0c0c]">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-2 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
