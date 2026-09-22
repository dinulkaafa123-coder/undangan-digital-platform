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
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Italiana', serif",
  "--font-names": "'Cormorant Garamond', serif",
  "--font-body": "'Jost', sans-serif",
});

/** Trik full-bleed: elemen keluar dari container terbatas dan memenuhi lebar layar. */
const FULL_BLEED = "relative left-1/2 right-1/2 -mx-[50vw] w-screen";

/** Label section editorial: kecil, huruf besar renggang, rata kiri -- BUKAN judul besar di tengah. */
function EditorialLabel({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={cn("text-[11px] uppercase tracking-[0.4em]", dark ? "text-white/60" : "text-[#c9a86a]")}>
      {children}
    </p>
  );
}

/**
 * ============================================================
 * WHITE PALACE -- "White Editorial Wedding"
 * ============================================================
 * Layout khusus template ini: TIDAK ADA kartu/border kotak sama
 * sekali (beda total dari Royal Gold yang penuh bingkai ganda).
 * Foto full-bleed memenuhi layar, judul section kecil rata kiri
 * ala majalah, dan event/RSVP ditulis sebagai teks + garis tipis,
 * bukan kotak.
 */
export default function WhitePalaceTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1100);
  const heroParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative overflow-x-hidden bg-white font-[family-name:var(--font-body)] text-[#2f2a22]">
      {/* ============ 1. WHITE CURTAIN OPENING ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Foto pasangan" className="absolute inset-0 h-full w-full object-cover" />
          <div className={cn("absolute inset-y-0 left-0 w-1/2 bg-white transition-transform duration-[1100ms] ease-[cubic-bezier(.76,0,.24,1)]", phase === "closing" && "-translate-x-full")} />
          <div className={cn("absolute inset-y-0 right-0 w-1/2 bg-white transition-transform duration-[1100ms] ease-[cubic-bezier(.76,0,.24,1)]", phase === "closing" && "translate-x-full")} />
          <div className={cn("absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <EditorialLabel>Undangan Pernikahan</EditorialLabel>
            <h1 className="mt-5 font-[family-name:var(--font-names)] text-5xl italic text-[#2f2a22] sm:text-6xl">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <div className="mx-auto mt-6 h-px w-24 bg-[#c9a86a]" />
            <p className="mt-6 text-sm text-[#6b6151]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#2f2a22] bg-transparent text-[#2f2a22] hover:bg-[#2f2a22] hover:text-white">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-white text-[#c9a86a] ring-1 ring-[#c9a86a]/50" />

      {/* ============ 2. FULLSCREEN COUPLE PHOTOGRAPH ============ */}
      <section className={cn(FULL_BLEED, "scene-h overflow-hidden")}>
        <div ref={heroParallax} className="h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Foto pasangan" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* ============ 3. EDITORIAL NAMES ============ */}
      <section className="px-8 pb-4 pt-14">
        <Reveal direction="editorial">
          <EditorialLabel>No. 01 — The Couple</EditorialLabel>
          <h1 className="mt-4 font-[family-name:var(--font-names)] text-5xl italic leading-[1.05] text-[#2f2a22] sm:text-6xl">
            {data.groom.nickname}
            <br />&amp; {data.bride.nickname}
          </h1>
        </Reveal>
      </section>

      {/* ============ 4. SHORT QUOTE ============ */}
      <section className="px-8 py-10">
        <Reveal direction="editorial" className="max-w-md border-l border-[#c9a86a] pl-5">
          <p className="font-[family-name:var(--font-display)] text-base leading-loose text-[#4a4335]">{data.quote.text}</p>
          {data.quote.source && <p className="mt-2 text-xs uppercase tracking-widest text-[#c9a86a]">{data.quote.source}</p>}
        </Reveal>
      </section>

      {/* ============ 5. BRIDE & GROOM ============ */}
      <section className="px-8 py-10">
        <EditorialLabel>No. 02 — Bride &amp; Groom</EditorialLabel>
        <div className="mt-8 flex flex-col divide-y divide-[#e9e2d0]">
          {[data.bride, data.groom].map((person, i) => (
            <Reveal key={person.fullName} direction="editorial" delay={i * 150} className="grid grid-cols-[1fr_auto] items-center gap-6 py-6">
              <div>
                <h3 className="font-[family-name:var(--font-names)] text-3xl italic text-[#2f2a22]">{person.nickname}</h3>
                <p className="mt-1 text-sm font-medium">{person.fullName}</p>
                <p className="mt-2 text-xs leading-relaxed text-[#6b6151]">
                  {person.childOrder} {person.parents.father} &amp; {person.parents.mother}
                </p>
              </div>
              <div className="h-24 w-20 shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={person.photoUrl} alt={person.fullName} className="h-full w-full object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 6. WEDDING DATE ============ */}
      <section className="border-y border-[#2f2a22] px-8 py-10 text-center">
        <Reveal direction="editorial">
          <EditorialLabel>Save The Date</EditorialLabel>
          <p className="mt-3 font-[family-name:var(--font-display)] text-3xl">{formatFullDate(data.events[0].date)}</p>
          <div className="mt-8">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="editorial-inline" pastLabelClassName="text-[#6b6151]" />
          </div>
        </Reveal>
      </section>

      {/* ============ 7. EVENT ============ */}
      <section className="divide-y divide-[#e9e2d0] px-8">
        {data.events.map((event, i) => (
          <Reveal key={event.id} direction="editorial" delay={i * 150} className="grid grid-cols-[80px_1fr] gap-6 py-8">
            <span className="pt-1 text-xs uppercase tracking-widest text-[#c9a86a]">No. {String(i + 3).padStart(2, "0")}</span>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-xl">{event.name}</h3>
              <p className="mt-2 text-sm text-[#6b6151]">
                {formatFullDateWithDay(event.date)} &middot; {formatTimeRange(event.startTime, event.endTime)}
              </p>
              <p className="text-sm">{event.venueName}</p>
              <p className="text-xs text-[#6b6151]">{event.address}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ============ 8. HORIZONTAL EDITORIAL GALLERY ============ */}
      <section className="py-16">
        <div className="px-8">
          <EditorialLabel>Gallery</EditorialLabel>
        </div>
        <div className="mt-8">
          <Gallery photos={data.gallery} variant="horizontal-scroll" />
        </div>
      </section>

      {/* ============ 9. LOVE STORY ============ */}
      <section className="px-8 py-16">
        <EditorialLabel>Our Story</EditorialLabel>
        <div className="mt-8 flex flex-col gap-10">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="editorial" delay={i * 150} className="grid grid-cols-[80px_1fr] items-start gap-6">
              <span className="pt-1 text-right text-xs uppercase tracking-wide text-[#c9a86a]">{moment.date}</span>
              <div className="border-l border-[#e9e2d0] pl-5">
                <h3 className="font-[family-name:var(--font-display)] text-lg">{moment.title}</h3>
                <p className="mt-1 text-sm text-[#6b6151]">{moment.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 10. LOCATION ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#2f2a22] px-8 text-center text-white">
        <Reveal direction="editorial">
          <EditorialLabel dark>Location</EditorialLabel>
          <p className="mt-3 font-[family-name:var(--font-display)] text-2xl">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard
            event={data.events[data.events.length - 1]}
            className="mx-auto mt-6 max-w-sm"
            iframeClassName="grayscale"
            buttonClassName="border-b border-white text-white hover:text-[#c9a86a] hover:border-[#c9a86a]"
          />
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="px-8 py-16">
        <EditorialLabel>RSVP</EditorialLabel>
        <div className="mt-8">
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
      <section className="border-t border-[#2f2a22] px-8 py-16">
        <Reveal direction="editorial">
          <EditorialLabel>Wedding Gift</EditorialLabel>
          <p className="mt-3 max-w-sm text-sm text-[#6b6151]">Kehadiran Anda adalah kebahagiaan bagi kami. Jika ingin memberi hadiah, silakan melalui rekening berikut.</p>
          <div className="mt-6 flex flex-col divide-y divide-[#e9e2d0]">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="py-4 text-left" buttonClassName="border border-[#2f2a22] text-[#2f2a22] hover:bg-[#2f2a22] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING ============ */}
      <footer className="px-8 py-16 text-center">
        <p className="font-[family-name:var(--font-names)] text-2xl italic text-[#2f2a22]">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-2 text-xs text-[#6b6151]">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
