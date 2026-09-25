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
import { OrnamentGardenBloom, OrnamentTwig } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-script": "'Yesteryear', cursive",
  "--font-heading": "'Cormorant Garamond', serif",
  "--font-body": "'Quicksand', sans-serif",
});

/**
 * ============================================================
 * LIVING BLOOM -- template "4D" -- taman berlapis yang tidak pernah diam.
 * ============================================================
 * Ciri "4D": EMPAT lapisan dedaunan/kelopak di kedalaman berbeda,
 * masing-masing terus BERGOYANG/MELAYANG sepanjang waktu (bukan cuma
 * saat scroll) dengan kecepatan & arah sendiri -- taman yang benar-benar
 * "hidup" di belakang layar, bukan latar diam.
 */
function LivingLayers({ dense = false }: { dense?: boolean }) {
  const layers = [
    { pos: "-left-10 -top-6", size: "h-32 w-32", rotate: "", anim: "animate-sway-leaf", duration: "5s", opacity: "text-[#4a6b52]/50" },
    { pos: "-right-8 top-1/3", size: "h-40 w-40", rotate: "rotate-90", anim: "animate-float-slow", duration: "7s", opacity: "text-[#e8b4c8]/50" },
    { pos: "-left-6 bottom-0", size: "h-36 w-36", rotate: "rotate-180", anim: "animate-sway-leaf", duration: "6.5s", opacity: "text-[#4a6b52]/35" },
    { pos: "-right-10 -bottom-8", size: "h-28 w-28", rotate: "-rotate-45", anim: "animate-float-slower", duration: "9s", opacity: "text-[#e8b4c8]/40" },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {layers.slice(0, dense ? 4 : 2).map((l, i) => (
        <OrnamentGardenBloom key={i} className={cn("absolute", l.pos, l.size, l.rotate, l.anim, l.opacity)} style={{ animationDuration: l.duration, animationDelay: `${i * 0.6}s` }} />
      ))}
    </div>
  );
}

export default function LivingBloomTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);
  const heroParallax = useParallax<HTMLDivElement>(0.12);

  return (
    <div style={FONTS} className="relative bg-[#faf6ef] font-[family-name:var(--font-body)] text-[#2f3d31]">
      {/* ============ 1. OPENING -- taman yang tumbuh & terus bergoyang ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#eef2e9]">
          <LivingLayers dense />
          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <div className="mx-auto h-32 w-32 overflow-hidden rounded-[46%_54%_61%_39%/49%_45%_55%_51%] border-4 border-white shadow-[0_25px_50px_-15px_rgba(74,107,82,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#4a6b52]">Undangan Pernikahan</p>
            <h1 className="mt-2 font-[family-name:var(--font-script)] text-6xl text-[#4a6b52]">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#5a6b5c]">Dengan penuh cinta, kami mengundang</p>
            <p className="font-[family-name:var(--font-heading)] text-lg italic text-[#2f3d31]">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="bg-[#4a6b52] text-white shadow-[0_15px_35px_-12px_rgba(74,107,82,0.4)]">
                Buka Undangan 🌿
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#4a6b52] text-white" />

      {/* ============ 2. HERO -- foto dikelilingi taman hidup ============ */}
      <section className="scene-h relative flex items-end overflow-hidden">
        <div ref={heroParallax} className="absolute inset-0 h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf6ef] via-transparent to-transparent" />
        <LivingLayers dense />
        <Reveal direction="swing-left" className="relative z-10 w-full px-6 pb-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#4a6b52]/80">Selalu Bertumbuh, Selalu Hidup</p>
          <h2 className="mt-2 font-[family-name:var(--font-script)] text-6xl text-[#4a6b52]">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h2>
        </Reveal>
      </section>

      {/* ============ 3. QUOTE + DATE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#eef2e9] px-6 text-center">
        <LivingLayers />
        <Reveal direction="depth" className="relative mx-auto max-w-md">
          <OrnamentGardenBloom className="mx-auto mb-4 h-10 w-10 text-[#e8b4c8]" />
          <p className="font-[family-name:var(--font-heading)] text-lg italic leading-relaxed text-[#3a4a3c]">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#7a8f7d]">{data.quote.source}</p>}
        </Reveal>
        <Reveal direction="scale" delay={150} className="relative mt-12 rounded-full border-2 border-[#4a6b52]/30 px-8 py-5">
          <p className="text-xs uppercase tracking-widest text-[#7a8f7d]">Simpan Tanggalnya</p>
          <p className="mt-1 font-[family-name:var(--font-heading)] text-xl italic text-[#4a6b52]">{formatFullDate(data.events[0].date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#4a6b52] px-6 text-center text-white">
        <LivingLayers dense />
        <Reveal direction="scale" className="relative">
          <p className="text-xs uppercase tracking-widest text-white/70">Hitung Mundur</p>
          <div className="mt-6">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="emerald-frame" pastLabelClassName="text-white" />
          </div>
        </Reveal>
      </section>

      {/* ============ 5-6. COUPLE -- dua scene taman terpisah ============ */}
      {[data.groom, data.bride].map((person, i) => (
        <section key={person.fullName} className="scene-h relative flex flex-col items-center justify-center overflow-hidden px-6 text-center">
          <LivingLayers />
          <Reveal direction="scale" className="relative">
            <div className="mx-auto h-56 w-56 overflow-hidden rounded-[45%_55%_60%_40%/55%_45%_55%_45%] border-4 border-white shadow-[0_25px_50px_-15px_rgba(74,107,82,0.3)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={person.photoUrl} alt={person.fullName} className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal direction={i % 2 === 0 ? "swing-left" : "swing-right"} className="relative mt-6">
            <h3 className="font-[family-name:var(--font-script)] text-5xl text-[#a15b71]">{person.nickname}</h3>
            <p className="mt-1 font-[family-name:var(--font-heading)] text-lg">{person.fullName}</p>
            <p className="mt-2 text-sm text-[#5a6b5c]">
              {person.childOrder} &middot; {person.parents.father} &amp; {person.parents.mother}
            </p>
          </Reveal>
        </section>
      ))}

      {/* ============ 7. LOVE STORY ============ */}
      <section className="relative bg-[#eef2e9] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#4a6b52]">Perjalanan Cinta Kami</h2>
        </Reveal>
        <div className="mx-auto mt-12 flex max-w-lg flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal
              key={moment.id}
              direction={i % 2 === 0 ? "swing-left" : "swing-right"}
              delay={i * 100}
              className="rounded-3xl bg-white p-5 text-center shadow-[0_15px_30px_-15px_rgba(74,107,82,0.25)]"
            >
              <div className="flex items-center justify-center gap-2">
                <OrnamentTwig className="h-5 w-10 text-[#a15b71]" />
                <p className="text-xs uppercase tracking-wide text-[#a15b71]">{moment.date}</p>
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-heading)] italic">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#5a6b5c]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. EVENT ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#4a6b52]">Rangkaian Acara</h2>
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal
              key={event.id}
              direction={i % 2 === 0 ? "swing-left" : "swing-right"}
              delay={i * 100}
              className="relative rounded-[2rem] border-2 border-[#4a6b52]/20 bg-white p-8 text-center shadow-[0_25px_50px_-25px_rgba(74,107,82,0.3)]"
            >
              <OrnamentGardenBloom className="absolute -top-7 left-1/2 h-14 w-14 -translate-x-1/2 text-[#4a6b52]" />
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-xl italic text-[#4a6b52]">{event.name}</h3>
              <p className="mt-2 text-sm text-[#5a6b5c]">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-[#5a6b5c]">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#5a6b5c]">{event.address}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 9. GALLERY ============ */}
      <section className="relative bg-[#eef2e9] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#4a6b52]">Galeri Cinta</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="mosaic-reveal" accentClassName="border-[#4a6b52]/40" />
        </div>
      </section>

      {/* ============ 10. LOCATION ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#4a6b52] px-6 text-center text-white">
        <Reveal direction="scale" className="mx-auto max-w-md">
          <OrnamentGardenBloom className="mx-auto mb-4 h-12 w-12 text-white" />
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic">Lokasi</h2>
          <p className="mt-2 text-sm text-white/80">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard event={data.events[data.events.length - 1]} className="mt-6" iframeClassName="rounded-2xl" buttonClassName="rounded-full bg-white text-[#4a6b52]" />
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#4a6b52]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-md">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-[2rem] bg-[#eef2e9] p-6",
              inputClassName: "rounded-xl border-[#dbe6dd] bg-white focus:border-[#4a6b52]",
              textareaClassName: "rounded-xl border-[#dbe6dd] bg-white focus:border-[#4a6b52]",
              buttonClassName: "rounded-full bg-[#4a6b52] text-white",
              radioClassName: "rounded-full border-[#dbe6dd] bg-white text-[#5a6b5c]",
              radioActiveClassName: "bg-[#4a6b52] text-white border-[#4a6b52]",
              labelClassName: "text-[#5a6b5c]",
              wishItemClassName: "rounded-2xl bg-white shadow-sm",
              wishMessageClassName: "text-[#5a6b5c]",
              wishMetaClassName: "text-[#a15b71]",
            }}
          />
        </div>
      </section>

      {/* ============ 12. GIFT ============ */}
      <section className="relative bg-[#eef2e9] px-6 py-20">
        <Reveal direction="scale" className="mx-auto max-w-md text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#4a6b52]">Wedding Gift</h2>
          <p className="mt-2 text-sm text-[#5a6b5c]">Doa restu kalian sudah sangat berarti. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="rounded-2xl bg-white text-left shadow-sm" buttonClassName="rounded-full bg-[#4a6b52] text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING -- taman terus bergoyang di penutup ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#4a6b52] px-6 text-center text-white">
        <LivingLayers dense />
        <OrnamentGardenBloom className="relative mx-auto mb-4 h-12 w-12 text-white" />
        <p className="relative font-[family-name:var(--font-script)] text-4xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="relative mt-3 text-xs">Terima kasih atas doa restu Anda 🌸</p>
      </footer>
    </div>
  );
}
