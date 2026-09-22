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
import { OrnamentGardenBloom } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-script": "'Yesteryear', cursive",
  "--font-heading": "'Cormorant Garamond', serif",
  "--font-body": "'Quicksand', sans-serif",
});

/** Offset zigzag untuk kesan "jalan setapak taman" -- bukan garis lurus. */
const PATH_OFFSETS = ["ml-0", "ml-10", "ml-4", "ml-14", "ml-2"];

/**
 * ============================================================
 * SECRET GARDEN -- "Enchanted Botanical Garden"
 * ============================================================
 * Setiap section jadi scene 100dvh: bunga BUKAN ornamen sudut, tapi
 * membingkai foto full-bleed dan masuk dari tepi layar. Love story
 * tetap jalan setapak zigzag (ciri khas template ini), gerbang taman
 * jadi opening, dan closing berupa bunga yang "menutup" layar.
 */
export default function SecretGardenTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);
  const heroParallax = useParallax<HTMLDivElement>(0.12);
  const coupleParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative bg-[#fbf8f2] font-[family-name:var(--font-body)] text-[#3a4a3c]">
      {/* ============ 1. GARDEN GATE OPENING ============ */}
      {phase !== "open" && (
        <div className="preserve-3d perspective-1600 fixed inset-0 z-50 overflow-hidden bg-[#eef2e6]">
          <div className={cn("preserve-3d absolute inset-y-0 left-0 w-1/2 origin-left bg-[#3f5a44] transition-transform duration-[1000ms] ease-in-out", phase === "closing" && "[transform:rotateY(-110deg)]")}>
            <OrnamentGardenBloom className="absolute -right-10 top-1/4 h-40 w-40 text-[#fbf8f2]/20" />
            <OrnamentGardenBloom className="absolute -right-16 bottom-10 h-52 w-52 text-[#fbf8f2]/10" />
          </div>
          <div className={cn("preserve-3d absolute inset-y-0 right-0 w-1/2 origin-right bg-[#3f5a44] transition-transform duration-[1000ms] ease-in-out", phase === "closing" && "[transform:rotateY(110deg)]")}>
            <OrnamentGardenBloom className="absolute -left-10 bottom-1/4 h-40 w-40 text-[#fbf8f2]/20" />
            <OrnamentGardenBloom className="absolute -left-16 top-10 h-52 w-52 text-[#fbf8f2]/10" />
          </div>
          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <div className="mx-auto h-32 w-32 overflow-hidden rounded-[46%_54%_61%_39%/49%_45%_55%_51%] border-4 border-white shadow-[0_25px_50px_-15px_rgba(0,0,0,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/70">Undangan Pernikahan</p>
            <h1 className="mt-2 font-[family-name:var(--font-script)] text-6xl text-white">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-white/80">Dengan penuh cinta, kami mengundang</p>
            <p className="font-[family-name:var(--font-heading)] text-lg italic text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="bg-white text-[#3f5a44] shadow-[0_15px_35px_-12px_rgba(0,0,0,0.4)]">
                Buka Gerbang Taman 🌿
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#3f5a44] text-white" />

      {/* ============ 2. HERO -- foto penuh layar dikepung bunga ============ */}
      <section className="scene-h relative flex items-end overflow-hidden">
        <div ref={heroParallax} className="absolute inset-0 h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fbf8f2] via-transparent to-transparent" />
        <OrnamentGardenBloom className="animate-sway-leaf absolute -left-8 -top-8 h-32 w-32 text-white/70" />
        <OrnamentGardenBloom className="animate-sway-leaf absolute -right-10 bottom-24 h-40 w-40 text-white/60" style={{ animationDelay: "1.2s" }} />
        <div className="relative z-10 w-full px-6 pb-16 text-center">
          <Reveal direction="swing-left">
            <p className="text-xs uppercase tracking-[0.3em] text-[#3f5a44]/70">Undangan Pernikahan</p>
            <h2 className="mt-2 font-[family-name:var(--font-script)] text-6xl text-[#3f5a44]">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ============ 3. COUPLE PORTRAIT -- bingkai organik penuh layar ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#eef2e6] px-6">
        <OrnamentGardenBloom className="pointer-events-none absolute -right-10 top-6 h-40 w-40 text-[#3f5a44]/10" />
        <OrnamentGardenBloom className="pointer-events-none absolute -left-10 bottom-6 h-40 w-40 rotate-90 text-[#3f5a44]/10" />
        <Reveal direction="scale" className="mx-auto w-fit">
          <div ref={coupleParallax} className="h-80 w-64 overflow-hidden rounded-[48%_52%_60%_40%/55%_45%_55%_45%] border-4 border-white shadow-[0_25px_50px_-15px_rgba(63,90,68,0.3)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.heroPhotoUrl} alt="Potret pasangan" className="h-full w-full scale-125 object-cover" />
          </div>
        </Reveal>
        <Reveal direction="up" delay={150} className="mt-8 text-center">
          <OrnamentGardenBloom className="mx-auto mb-3 h-10 w-10 text-[#c98098]" />
          <p className="mx-auto max-w-sm font-[family-name:var(--font-heading)] text-lg italic leading-relaxed text-[#5a6b5c]">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#7a8f7d]">{data.quote.source}</p>}
        </Reveal>
      </section>

      {/* ============ 4. DATE + COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#3f5a44] px-6 text-center text-white">
        <OrnamentGardenBloom className="pointer-events-none absolute -left-16 top-10 h-48 w-48 text-white/10" />
        <OrnamentGardenBloom className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rotate-45 text-white/10" />
        <Reveal direction="scale" className="relative rounded-full border-2 border-white/30 px-8 py-5">
          <p className="text-xs uppercase tracking-widest text-white/70">Simpan Tanggalnya</p>
          <p className="mt-1 font-[family-name:var(--font-heading)] text-xl italic">{formatFullDate(data.events[0].date)}</p>
        </Reveal>
        <div className="relative mt-10">
          <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="floral-badge" pastLabelClassName="text-white" />
        </div>
      </section>

      {/* ============ 5. LOVE STORY -- jalan setapak zigzag ============ */}
      <section className="relative bg-[#eef2e6] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#3f5a44]">Perjalanan Cinta Kami</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal
              key={moment.id}
              direction={i % 2 === 0 ? "swing-left" : "swing-right"}
              delay={i * 100}
              className={cn("w-[78%] rounded-3xl bg-white p-5 shadow-[0_15px_30px_-15px_rgba(63,90,68,0.25)]", PATH_OFFSETS[i % PATH_OFFSETS.length])}
            >
              <div className="flex items-center gap-2">
                <OrnamentGardenBloom className="h-6 w-6 shrink-0 text-[#c98098]" />
                <p className="text-xs uppercase tracking-wide text-[#a15b71]">{moment.date}</p>
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-heading)] italic">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#5a6b5c]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 6. EVENT -- kartu taman ============ */}
      <section className="relative bg-[#fbf8f2] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#3f5a44]">Rangkaian Acara</h2>
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal
              key={event.id}
              direction={i % 2 === 0 ? "swing-left" : "swing-right"}
              delay={i * 100}
              className="relative rounded-[2rem] border-2 border-[#3f5a44]/20 bg-white p-8 text-center shadow-[0_25px_50px_-25px_rgba(63,90,68,0.3)]"
            >
              <OrnamentGardenBloom className="absolute -top-7 left-1/2 h-14 w-14 -translate-x-1/2 text-[#3f5a44]" />
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-xl italic text-[#3f5a44]">{event.name}</h3>
              <p className="mt-2 text-sm text-[#5a6b5c]">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-[#5a6b5c]">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#5a6b5c]">{event.address}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 7. GALLERY -- polaroid mengambang ============ */}
      <section className="relative bg-[#eef2e6] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#3f5a44]">Galeri Cinta</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="polaroid-scatter" />
        </div>
      </section>

      {/* ============ 8. MAPS ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#3f5a44] px-6 text-center text-white">
        <Reveal direction="scale" className="mx-auto w-full max-w-md">
          <OrnamentGardenBloom className="mx-auto mb-4 h-12 w-12 text-white" />
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic">Lokasi</h2>
          <p className="mt-2 text-sm text-white/80">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard
            event={data.events[data.events.length - 1]}
            className="mt-6"
            iframeClassName="rounded-2xl"
            buttonClassName="rounded-full bg-white text-[#3f5a44]"
          />
        </Reveal>
      </section>

      {/* ============ 9. RSVP ============ */}
      <section className="relative bg-[#fbf8f2] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#3f5a44]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-md">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-[2rem] bg-[#eef2e6] p-6",
              inputClassName: "rounded-xl border-[#e3ecdd] bg-white focus:border-[#3f5a44]",
              textareaClassName: "rounded-xl border-[#e3ecdd] bg-white focus:border-[#3f5a44]",
              buttonClassName: "rounded-full bg-[#3f5a44] text-white",
              radioClassName: "rounded-full border-[#e3ecdd] bg-white text-[#5a6b5c]",
              radioActiveClassName: "bg-[#3f5a44] text-white border-[#3f5a44]",
              labelClassName: "text-[#5a6b5c]",
              wishItemClassName: "rounded-2xl bg-white shadow-sm",
              wishMessageClassName: "text-[#5a6b5c]",
              wishMetaClassName: "text-[#a15b71]",
            }}
          />
        </div>
      </section>

      {/* ============ 10. GIFT ============ */}
      <section className="relative bg-[#eef2e6] px-6 py-20">
        <Reveal direction="scale" className="mx-auto max-w-md text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#3f5a44]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#5a6b5c]">Doa restu kalian sudah sangat berarti. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="rounded-2xl bg-white text-left shadow-sm" buttonClassName="rounded-full bg-[#3f5a44] text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 11. CLOSING -- bunga menutup layar ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#3f5a44] px-6 text-center text-white">
        <OrnamentGardenBloom className="animate-sway-leaf pointer-events-none absolute -left-10 top-10 h-40 w-40 text-white/15" />
        <OrnamentGardenBloom className="animate-sway-leaf pointer-events-none absolute -right-10 bottom-10 h-40 w-40 rotate-180 text-white/15" style={{ animationDelay: "0.8s" }} />
        <OrnamentGardenBloom className="relative mx-auto mb-4 h-12 w-12 text-white" />
        <p className="relative font-[family-name:var(--font-script)] text-4xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="relative mt-3 text-xs">Terima kasih atas doa restu Anda 🌸</p>
      </footer>
    </div>
  );
}
