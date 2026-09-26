"use client";

import type { InvitationTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { useParallax } from "@/hooks/use-parallax";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { GoldButton } from "@/components/shared/gold-button";
import { FloatingParticles } from "@/components/shared/floating-particles";
import { MapsCard } from "@/components/shared/maps-card";
import { BankAccountCard } from "@/components/shared/bank-account-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentCurtainSwag, OrnamentDiamondFacet } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";

const FONTS = fontVars({
  "--font-display": "'Cormorant Garamond', serif",
  "--font-body": "'Comfortaa', sans-serif",
});

/**
 * ============================================================
 * VELVET DEPTH -- template 3D, depth jauh lebih dramatis.
 * ============================================================
 * Bukan cuma translateZ datar: setiap kartu foto adalah TIGA lapisan
 * nyata dalam satu ruang perspective -- tirai belakang (translateZ
 * negatif + blur, jauh), foto (rotateY/rotateX miring, tengah), bingkai
 * emas tebal (translateZ positif, paling dekat kamera). Kemiringannya
 * benar-benar terlihat seperti kartu 3D di ruang, bukan foto datar.
 */
function VelvetCard({ src, alt, tiltY = -8, tiltX = 3 }: { src: string; alt: string; tiltY?: number; tiltX?: number }) {
  const parallax = useParallax<HTMLDivElement>(0.08);
  return (
    <div className="perspective-1600 mx-auto w-full max-w-sm">
      <div className="preserve-3d relative aspect-[4/5] w-full">
        {/* Lapisan jauh: tirai beludru blur */}
        <div className="preserve-3d absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4a1010] to-[#1a0505] opacity-70 blur-md" style={{ transform: "translateZ(-70px) scale(1.15)" }} />
        {/* Lapisan tengah: foto miring */}
        <div
          className="preserve-3d absolute inset-3 overflow-hidden rounded-xl shadow-[0_45px_80px_-25px_rgba(0,0,0,0.7)]"
          style={{ transform: `translateZ(0px) rotateY(${tiltY}deg) rotateX(${tiltX}deg)` }}
        >
          <div ref={parallax} className="h-[120%] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="h-full w-full object-cover" />
          </div>
        </div>
        {/* Lapisan depan: bingkai emas tebal, paling dekat kamera */}
        <div
          className="preserve-3d pointer-events-none absolute inset-0 rounded-2xl border-[10px] border-double border-[#d4af37]"
          style={{ transform: `translateZ(45px) rotateY(${tiltY * 0.4}deg) rotateX(${tiltX * 0.4}deg)` }}
        />
      </div>
    </div>
  );
}

export default function VelvetDepthTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1050);

  return (
    <div style={FONTS} className="relative bg-[#1a0505] font-[family-name:var(--font-body)] text-[#f0e5d8]">
      {/* ============ 1. OPENING -- tirai beludru terbuka dengan depth ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black">
          <FloatingParticles count={12} particleClassName="bg-[#d4af37]/60" />
          <div
            className="preserve-3d absolute inset-y-0 left-0 w-1/2 origin-left bg-gradient-to-r from-[#4a1010] to-[#2a0808] transition-transform duration-[1050ms] ease-[cubic-bezier(.7,0,.3,1)]"
            style={{ transform: phase === "closing" ? "rotateY(-100deg) translateZ(-40px)" : "rotateY(0deg)" }}
          >
            <OrnamentCurtainSwag className="absolute inset-x-0 top-0 h-10 text-[#d4af37]" />
          </div>
          <div
            className="preserve-3d absolute inset-y-0 right-0 w-1/2 origin-right bg-gradient-to-l from-[#4a1010] to-[#2a0808] transition-transform duration-[1050ms] ease-[cubic-bezier(.7,0,.3,1)]"
            style={{ transform: phase === "closing" ? "rotateY(100deg) translateZ(-40px)" : "rotateY(0deg)" }}
          >
            <OrnamentCurtainSwag className="absolute inset-x-0 top-0 h-10 scale-x-[-1] text-[#d4af37]" />
          </div>
          <div className="relative z-10 px-6 text-center transition-opacity duration-500" style={{ opacity: phase === "closing" ? 0 : 1 }}>
            <OrnamentDiamondFacet className="mx-auto h-14 w-10 text-[#d4af37]" />
            <p className="mt-4 text-xs uppercase tracking-[0.5em] text-[#d4af37]">The Wedding Of</p>
            <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-display)] text-6xl italic">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#e7d0c0]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#1a0505]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4af37] bg-[#1a0505] text-[#d4af37] animate-pulse-glow" />

      {/* ============ 2. HERO -- kartu velvet 3D ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <VelvetCard src={data.heroPhotoUrl} alt="Potret mempelai" />
        <Reveal direction="blur-scale" className="relative z-10 mt-8">
          <h1 className="font-[family-name:var(--font-display)] text-4xl italic text-[#d4af37]">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h1>
        </Reveal>
      </section>

      {/* ============ 3. QUOTE + DATE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <Reveal direction="up" className="mx-auto max-w-lg">
          <p className="font-[family-name:var(--font-display)] text-xl italic leading-relaxed">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-4 text-xs uppercase tracking-widest text-[#d4af37]">{data.quote.source}</p>}
        </Reveal>
        <Reveal direction="scale" delay={150} className="mt-14 border-y border-[#d4af37]/40 px-8 py-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[#e7d0c0]">Save The Date</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl italic">{formatFullDate(data.events[0].date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-black px-6 text-center">
        <FloatingParticles count={10} particleClassName="bg-[#d4af37]/50" />
        <Reveal direction="scale" className="relative">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37]">Menuju Hari Bahagia</p>
          <div className="mt-8">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="luxury-ring" pastLabelClassName="text-white" />
          </div>
        </Reveal>
      </section>

      {/* ============ 5-6. COUPLE -- kartu velvet per orang ============ */}
      {[data.groom, data.bride].map((person, i) => (
        <section key={person.fullName} className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
          <VelvetCard src={person.photoUrl} alt={person.fullName} tiltY={i % 2 === 0 ? -10 : 10} tiltX={4} />
          <Reveal direction={i % 2 === 0 ? "left" : "right"} className="mt-8">
            <h3 className="font-[family-name:var(--font-display)] text-4xl italic text-[#d4af37]">{person.nickname}</h3>
            <p className="mt-1 text-sm">{person.fullName}</p>
            <p className="mt-2 text-xs text-[#e7d0c0]">
              {person.childOrder} &middot; {person.parents.father} &amp; {person.parents.mother}
            </p>
          </Reveal>
        </section>
      ))}

      {/* ============ 7. LOVE STORY ============ */}
      <section className="relative bg-black px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#d4af37]">Kisah Cinta Kami</h2>
        </Reveal>
        <div className="mx-auto mt-12 flex max-w-lg flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="border border-[#d4af37]/25 p-6 text-center">
              <p className="text-xs uppercase tracking-widest text-[#d4af37]">{moment.date}</p>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg italic">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#e7d0c0]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. EVENT ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#d4af37]">Undangan Acara</h2>
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-6">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="blur-scale" delay={i * 150} className="border-2 border-double border-[#d4af37]/60 p-7 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-xl italic text-[#d4af37]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#e7d0c0]">{event.address}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 9. GALLERY ============ */}
      <section className="relative bg-black px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#d4af37]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="card-stack-3d" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ 10. LOCATION ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <Reveal direction="scale" className="mx-auto w-full max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#d4af37]">Lokasi Acara</h2>
          <p className="mt-2 text-sm text-[#e7d0c0]">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard event={data.events[data.events.length - 1]} className="mt-6" iframeClassName="grayscale contrast-125" buttonClassName="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#1a0505]" />
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#d4af37]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#d4af37]/25 p-6",
              inputClassName: "border-[#d4af37]/30 bg-transparent text-white focus:border-[#d4af37]",
              textareaClassName: "border-[#d4af37]/30 bg-transparent text-white focus:border-[#d4af37]",
              buttonClassName: "bg-[#d4af37] text-[#1a0505] hover:bg-[#c9a24b]",
              radioClassName: "border-[#d4af37]/30 text-[#e7d0c0]",
              radioActiveClassName: "bg-[#d4af37] text-[#1a0505] border-[#d4af37]",
              labelClassName: "text-[#e7d0c0]",
              wishItemClassName: "border border-[#d4af37]/20",
              wishNameClassName: "text-white",
              wishMessageClassName: "text-[#e7d0c0]",
              wishMetaClassName: "text-[#d4af37]",
            }}
          />
        </div>
      </section>

      {/* ============ 12. GIFT ============ */}
      <section className="relative bg-black px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#d4af37]">Wedding Gift</h2>
          <p className="mt-2 text-sm text-[#e7d0c0]">Doa restu Anda adalah karunia yang berarti. Namun jika ingin memberi tanda kasih:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/25 text-left text-white" buttonClassName="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a0505]" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center px-6 text-center text-[#e7d0c0]">
        <OrnamentDiamondFacet className="mx-auto mb-4 h-12 w-9 text-[#d4af37]" />
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-4xl italic">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
