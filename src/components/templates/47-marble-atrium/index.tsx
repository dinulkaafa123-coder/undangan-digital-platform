"use client";

import type { InvitationTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { useParallax } from "@/hooks/use-parallax";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { GoldButton } from "@/components/shared/gold-button";
import { MapsCard } from "@/components/shared/maps-card";
import { BankAccountCard } from "@/components/shared/bank-account-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentCrest } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";

const FONTS = fontVars({
  "--font-display": "'Italiana', serif",
  "--font-body": "'Jost', sans-serif",
});

/**
 * ============================================================
 * MARBLE ATRIUM -- template 3D, aula marmer dengan kolom berlapis.
 * ============================================================
 * Deretan kolom di beberapa translateZ berbeda menciptakan lorong
 * atrium yang benar-benar terasa MEMANJANG ke kedalaman -- bukan
 * satu gambar datar, tapi 5 lapis kolom nyata dalam satu ruang 3D.
 */
function ColonnadeHall({ children }: { children: React.ReactNode }) {
  const depths = [-120, -80, -40, 0];
  return (
    <div className="perspective-1600 relative h-full w-full overflow-hidden">
      <div className="preserve-3d absolute inset-0">
        {depths.map((z, i) => (
          <div key={i} className="preserve-3d absolute inset-0 flex items-center justify-between px-4" style={{ transform: `translateZ(${z}px) scale(${1 - Math.abs(z) / 500})` }}>
            <div className="h-full w-3 bg-gradient-to-b from-white via-[#e7d9b8] to-white opacity-70" />
            <div className="h-full w-3 bg-gradient-to-b from-white via-[#e7d9b8] to-white opacity-70" />
          </div>
        ))}
      </div>
      <div className="preserve-3d relative z-10 flex h-full items-center justify-center" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </div>
  );
}

export default function MarbleAtriumTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);
  const heroParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative bg-white font-[family-name:var(--font-body)] text-[#2f2a22]">
      {/* ============ 1. OPENING -- lorong atrium terbuka ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 overflow-hidden bg-[#faf7f0]">
          <ColonnadeHall>
            <div className="relative z-10 px-6 text-center transition-all duration-1000 ease-in" style={{ opacity: phase === "closing" ? 0 : 1, transform: phase === "closing" ? "translateZ(200px) scale(1.5)" : "translateZ(0px) scale(1)" }}>
              <OrnamentCrest className="mx-auto h-12 w-12 text-[#c9a86a]" />
              <p className="mt-4 text-xs uppercase tracking-[0.5em] text-[#c9a86a]">The Wedding Of</p>
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-6xl italic text-[#2f2a22]">
                {data.groom.nickname} &amp; {data.bride.nickname}
              </h1>
              <p className="mt-6 text-sm text-[#6b6151]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <p className="font-[family-name:var(--font-display)] text-lg italic">{guestName}</p>
              <div className="mt-9">
                <GoldButton onClick={openInvitation} className="border border-[#2f2a22] text-[#2f2a22] hover:bg-[#2f2a22] hover:text-white">
                  Buka Undangan
                </GoldButton>
              </div>
            </div>
          </ColonnadeHall>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-white text-[#c9a86a] ring-1 ring-[#c9a86a]/50" />

      {/* ============ 2. HERO ============ */}
      <section className="scene-h relative flex items-end overflow-hidden">
        <div ref={heroParallax} className="absolute inset-0 h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Potret mempelai" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        <Reveal direction="editorial" className="relative z-10 w-full px-6 pb-16 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-5xl italic text-[#2f2a22]">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h1>
        </Reveal>
      </section>

      {/* ============ 3. QUOTE + DATE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <ColonnadeHall>
          <Reveal direction="editorial" className="mx-auto max-w-lg">
            <p className="font-[family-name:var(--font-display)] text-xl italic leading-relaxed text-[#4a4335]">{data.quote.text}</p>
            {data.quote.source && <p className="mt-4 text-xs uppercase tracking-widest text-[#c9a86a]">{data.quote.source}</p>}
            <div className="mx-auto mt-10 h-px w-24 bg-[#c9a86a]" />
            <p className="mt-6 text-sm text-[#6b6151]">Save The Date</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl italic">{formatFullDate(data.events[0].date)}</p>
          </Reveal>
        </ColonnadeHall>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center border-y border-[#2f2a22] px-6 text-center">
        <Reveal direction="editorial">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c9a86a]">Menuju Hari Bahagia</p>
          <div className="mt-8">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="editorial-inline" pastLabelClassName="text-[#6b6151]" />
          </div>
        </Reveal>
      </section>

      {/* ============ 5-6. COUPLE ============ */}
      <section className="relative px-6 py-20">
        <div className="mx-auto flex max-w-lg flex-col gap-16">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction="editorial" delay={i * 150} className="grid grid-cols-[1fr_auto] items-center gap-6">
              <div className={i % 2 ? "order-2 text-right" : ""}>
                <h3 className="font-[family-name:var(--font-display)] text-3xl italic text-[#2f2a22]">{person.nickname}</h3>
                <p className="mt-1 text-sm font-medium">{person.fullName}</p>
                <p className="mt-2 text-xs text-[#6b6151]">
                  {person.childOrder} {person.parents.father} &amp; {person.parents.mother}
                </p>
              </div>
              <div className="perspective-1600 h-32 w-28 shrink-0">
                <div className="preserve-3d h-full w-full" style={{ transform: `rotateY(${i % 2 ? 8 : -8}deg)` }}>
                  <div className="h-full w-full overflow-hidden shadow-[0_25px_45px_-20px_rgba(0,0,0,0.4)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={person.photoUrl} alt={person.fullName} className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 7. LOVE STORY ============ */}
      <section className="relative bg-[#faf7f0] px-6 py-20">
        <Reveal direction="editorial" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic">Kisah Kami</h2>
        </Reveal>
        <div className="mx-auto mt-12 flex max-w-lg flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="editorial" delay={i * 100} className="grid grid-cols-[80px_1fr] gap-6 border-b border-[#e9e2d0] pb-6">
              <span className="text-right text-xs uppercase tracking-wide text-[#c9a86a]">{moment.date}</span>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg italic">{moment.title}</h3>
                <p className="mt-1 text-sm text-[#6b6151]">{moment.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. EVENT ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="editorial" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic">Undangan Acara</h2>
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-lg flex-col divide-y divide-[#e9e2d0]">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="editorial" delay={i * 150} className="py-8 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-xl italic text-[#c9a86a]">{event.name}</h3>
              <p className="mt-2 text-sm text-[#6b6151]">{formatFullDateWithDay(event.date)} &middot; {formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-1 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#6b6151]">{event.address}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 9. GALLERY ============ */}
      <section className="relative bg-[#faf7f0] py-20">
        <Reveal direction="editorial" className="px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="museum-wall" accentClassName="border-[#c9a86a]" />
        </div>
      </section>

      {/* ============ 10. LOCATION ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#2f2a22] px-6 text-center text-white">
        <Reveal direction="editorial" className="mx-auto max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic">Lokasi</h2>
          <p className="mt-2 text-sm text-white/70">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard event={data.events[data.events.length - 1]} className="mt-6" iframeClassName="grayscale" buttonClassName="border-b border-white text-white hover:text-[#c9a86a] hover:border-[#c9a86a]" />
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="editorial" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border-b border-[#e9e2d0] pb-6",
              inputClassName: "rounded-none border-x-0 border-t-0 border-b border-[#e9e2d0] px-0 focus:border-[#2f2a22]",
              textareaClassName: "rounded-none border-x-0 border-t-0 border-b border-[#e9e2d0] px-0 focus:border-[#2f2a22]",
              buttonClassName: "rounded-none bg-[#2f2a22] text-white hover:bg-[#c9a86a]",
              radioClassName: "rounded-none border-b border-[#e9e2d0] text-[#6b6151]",
              radioActiveClassName: "bg-[#2f2a22] text-white border-[#2f2a22]",
              labelClassName: "text-[#6b6151]",
              wishItemClassName: "border-b border-[#e9e2d0]",
              wishMessageClassName: "text-[#6b6151]",
              wishMetaClassName: "text-[#c9a86a]",
            }}
          />
        </div>
      </section>

      {/* ============ 12. GIFT ============ */}
      <section className="border-t border-[#2f2a22] px-6 py-20">
        <Reveal direction="editorial" className="mx-auto max-w-lg text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic">Wedding Gift</h2>
          <p className="mt-3 text-sm text-[#6b6151]">Kehadiran Anda adalah kebahagiaan bagi kami. Jika ingin memberi hadiah, silakan melalui rekening berikut.</p>
          <div className="mt-6 flex flex-col divide-y divide-[#e9e2d0]">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="py-4 text-left" buttonClassName="border border-[#2f2a22] text-[#2f2a22] hover:bg-[#2f2a22] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING ============ */}
      <footer className="scene-h flex flex-col items-center justify-center px-6 text-center">
        <p className="font-[family-name:var(--font-display)] text-3xl italic text-[#2f2a22]">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-2 text-xs text-[#6b6151]">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
