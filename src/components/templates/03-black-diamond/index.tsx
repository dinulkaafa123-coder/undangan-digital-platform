"use client";

import type { InvitationTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { useParallax } from "@/hooks/use-parallax";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { GoldButton } from "@/components/shared/gold-button";
import { BankAccountCard } from "@/components/shared/bank-account-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { MapsCard } from "@/components/shared/maps-card";
import { OrnamentDiamondFacet, OrnamentArtDecoLines } from "@/components/decorative/ornaments";
import { FloatingParticles } from "@/components/shared/floating-particles";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Cinzel', serif",
  "--font-body": "'Montserrat', sans-serif",
});

const DIAMOND_CLIP = "[clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]";

/**
 * ============================================================
 * BLACK DIAMOND -- "Dark Cinematic Wedding"
 * ============================================================
 * Layout khusus: full-bleed hitam edge-to-edge, tipografi nama
 * RAKSASA sebagai section tersendiri (bukan disatukan dengan foto
 * seperti Royal Gold), event mengambang sebagai kartu kaca miring
 * (rotateX), dan love story sinematik dua-kolom -- tidak ada satu pun
 * bingkai emas ganda / ornamen simetris seperti template royal.
 */
export default function BlackDiamondTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);
  const heroParallax = useParallax<HTMLDivElement>(0.12);

  return (
    <div style={FONTS} className="relative bg-[#050505] font-[family-name:var(--font-body)] text-[#e9e2d0]">
      {/* ============ 1. CINEMATIC BLACK OPENING ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black px-6 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.coverPhotoUrl} alt="Sampul" className="animate-kenburns absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.92)_65%)]" />
          <FloatingParticles count={10} particleClassName="bg-[#c9a24b]/70" />
          <div className="preserve-3d relative z-10">
            <div className="[transform:translateZ(60px)] animate-float-slower">
              <OrnamentDiamondFacet className="mx-auto h-24 w-16 text-[#c9a24b]" />
            </div>
            <Reveal direction="depth" delay={150}>
              <span className="mt-4 block text-xs uppercase tracking-[0.55em] text-[#c9a24b]">The Wedding Of</span>
              <h1 className="text-gold-gradient mt-5 font-[family-name:var(--font-display)] text-5xl tracking-wide sm:text-6xl">{data.groom.nickname}</h1>
              <p className="my-1 text-2xl text-[#c9a24b]">&amp;</p>
              <h1 className="text-gold-gradient font-[family-name:var(--font-display)] text-5xl tracking-wide sm:text-6xl">{data.bride.nickname}</h1>
            </Reveal>
            <Reveal direction="up" delay={400}>
              <OrnamentArtDecoLines className="mx-auto mt-7 h-6 w-56 text-[#c9a24b]" />
              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/60">Kepada Yth.</p>
              <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            </Reveal>
            <Reveal direction="scale" delay={650}>
              <div className="mt-10">
                <GoldButton onClick={openInvitation} className="border border-[#c9a24b] text-[#c9a24b] shadow-[0_0_40px_-10px_rgba(201,162,75,0.6)] hover:bg-[#c9a24b] hover:text-black">
                  Buka Undangan
                </GoldButton>
              </div>
            </Reveal>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#c9a24b] bg-black text-[#c9a24b] animate-pulse-glow" />

      {/* ============ 2. FULLSCREEN COUPLE PHOTO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        <div ref={heroParallax} className="h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover opacity-80" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
        <div className="absolute inset-x-0 bottom-10 text-center text-xs uppercase tracking-[0.4em] text-[#c9a24b]">Scroll</div>
      </section>

      {/* ============ 3. HUGE COUPLE NAMES ============ */}
      <section className="px-6 py-16 text-center">
        <Reveal direction="blur-scale">
          <h1 className="text-gold-gradient font-[family-name:var(--font-display)] text-6xl leading-[0.95] tracking-tight sm:text-8xl">
            {data.groom.nickname}
          </h1>
          <p className="my-2 text-3xl text-[#c9a24b] sm:text-4xl">&amp;</p>
          <h1 className="text-gold-gradient font-[family-name:var(--font-display)] text-6xl leading-[0.95] tracking-tight sm:text-8xl">
            {data.bride.nickname}
          </h1>
        </Reveal>
      </section>

      {/* ============ 4. CINEMATIC QUOTE ============ */}
      <section className="mx-auto max-w-lg px-6 pb-16 text-center">
        <Reveal direction="blur-scale">
          <OrnamentArtDecoLines className="mx-auto mb-6 h-6 w-44 text-[#c9a24b]" />
          <p className="font-[family-name:var(--font-display)] text-lg italic leading-relaxed text-white/90">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#c9a24b]">{data.quote.source}</p>}
        </Reveal>
      </section>

      {/* ============ 5. SPLIT BRIDE / GROOM ============ */}
      <section className="grid grid-cols-1 sm:grid-cols-2">
        {[data.groom, data.bride].map((person, i) => (
          <Reveal key={person.fullName} direction="blur-scale" delay={i * 150} className="relative overflow-hidden">
            <div className="perspective-1600">
              <div className={cn("preserve-3d relative aspect-[3/4] w-full p-1.5", DIAMOND_CLIP, "bg-gradient-to-br from-[#c9a24b] via-[#f5e2a8] to-[#8a6d1f]")}>
                <div className={cn("h-full w-full overflow-hidden", DIAMOND_CLIP)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={person.photoUrl} alt={person.fullName} className="h-full w-full scale-125 object-cover grayscale" />
                </div>
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#c9a24b]">{person.nickname}</h3>
              <p className="mt-1 text-sm text-white/80">{person.fullName}</p>
              <p className="mt-3 text-xs leading-relaxed text-white/50">
                {person.childOrder}
                <br />
                {person.parents.father} &amp; {person.parents.mother}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ============ 6. FLOATING EVENT CARD ============ */}
      <section className="perspective-1600 mx-auto flex max-w-lg flex-col gap-10 px-6 py-20">
        {data.events.map((event, i) => (
          <Reveal
            key={event.id}
            direction="blur-scale"
            delay={i * 150}
            className={cn(
              "preserve-3d relative border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_35px_70px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm",
              i % 2 === 0 ? "[transform:rotateX(2deg)_translateY(-4px)] sm:mr-10" : "[transform:rotateX(-2deg)_translateY(4px)] sm:ml-10"
            )}
          >
            <OrnamentDiamondFacet className="absolute -top-6 left-1/2 h-10 w-7 -translate-x-1/2 text-[#c9a24b]" />
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[#c9a24b]">{event.name}</h3>
            <p className="mt-2 text-sm text-white/80">{formatFullDateWithDay(event.date)}</p>
            <p className="text-sm text-white/80">{formatTimeRange(event.startTime, event.endTime)}</p>
            <p className="mt-3 text-sm font-medium text-white">{event.venueName}</p>
            <p className="text-xs text-white/50">{event.address}</p>
          </Reveal>
        ))}
      </section>

      {/* ============ 7. COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center border-y border-white/10 px-6 text-center">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c9a24b]">Menuju Hari Bahagia</p>
          <div className="mx-auto mt-10 max-w-sm">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="flip-glow" pastLabelClassName="text-white" />
          </div>
        </Reveal>
      </section>

      {/* ============ 8. MASONRY GALLERY ============ */}
      <section className="px-6 py-20">
        <Reveal direction="blur-scale" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="masonry" />
        </div>
      </section>

      {/* ============ 9. CINEMATIC LOVE STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="blur-scale" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Our Story</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="blur-scale" delay={i * 100} className="grid grid-cols-[100px_1fr] gap-4 border-b border-white/10 pb-8">
              <span className="font-[family-name:var(--font-display)] text-sm text-[#c9a24b]">{moment.date}</span>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-base text-white">{moment.title}</h3>
                <p className="mt-1 text-sm text-white/60">{moment.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 10. MAPS ============ */}
      <section className="border-y border-white/10 px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Lokasi</h2>
          <p className="mt-2 text-sm text-white/70">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard
            event={data.events[data.events.length - 1]}
            className="mt-6"
            iframeClassName="grayscale contrast-125 invert-[0.9]"
            buttonClassName="border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black"
          />
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="blur-scale" className="text-center">
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

      {/* ============ 12. GIFT ============ */}
      <section className="border-t border-white/10 px-6 py-20">
        <Reveal direction="blur-scale" className="mx-auto max-w-lg text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#c9a24b]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-white/60">Doa restu Anda adalah hadiah terindah. Namun bila berkenan memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-white/10 text-left text-white" buttonClassName="border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING ============ */}
      <footer className="px-6 py-14 text-center text-white/50">
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-2xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
