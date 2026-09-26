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

const FONTS = fontVars({
  "--font-script": "'Yesteryear', cursive",
  "--font-display": "'Cormorant Garamond', serif",
  "--font-body": "'Nunito', sans-serif",
});

/**
 * ============================================================
 * FLOATING PETALS 3D -- template 3D, depth-of-field nyata berlapis.
 * ============================================================
 * Tiga lapis kelopak pada translateZ berbeda, masing-masing dengan
 * blur yang MENINGKAT sesuai jaraknya (depth-of-field asli seperti
 * lensa kamera) -- foto utama tetap tajam di tengah, lapisan depan &
 * belakang mengabur secara alami sesuai kedalamannya.
 */
function DepthOfFieldFrame({ src, alt }: { src: string; alt: string }) {
  const parallax = useParallax<HTMLDivElement>(0.1);
  return (
    <div className="perspective-1600 relative mx-auto h-80 w-64">
      <div className="preserve-3d relative h-full w-full">
        <OrnamentGardenBloom className="absolute -left-10 -top-6 h-24 w-24 text-[#e8b4c8] blur-[3px]" style={{ transform: "translateZ(-90px)" }} />
        <OrnamentGardenBloom className="absolute -right-8 top-1/3 h-20 w-20 text-[#c98098] blur-[1px]" style={{ transform: "translateZ(-40px)" }} />
        <div className="absolute inset-0 overflow-hidden rounded-[3rem] border-4 border-white shadow-[0_35px_60px_-20px_rgba(74,107,82,0.35)]" style={{ transform: "translateZ(30px)" }}>
          <div ref={parallax} className="h-[120%] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="h-full w-full object-cover" />
          </div>
        </div>
        <OrnamentGardenBloom className="absolute -bottom-8 -right-10 h-28 w-28 text-[#e8b4c8]" style={{ transform: "translateZ(70px)" }} />
      </div>
    </div>
  );
}

export default function FloatingPetals3DTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative bg-[#fdf6f2] font-[family-name:var(--font-body)] text-[#3a2a30]">
      {/* ============ 1. OPENING ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#f3d9e2] px-6 text-center">
          <div
            className="preserve-3d relative transition-all duration-1000 ease-in"
            style={{ transform: phase === "closing" ? "translateZ(300px) scale(2.5)" : "translateZ(0px) scale(1)", opacity: phase === "closing" ? 0 : 1 }}
          >
            <DepthOfFieldFrame src={data.heroPhotoUrl} alt="Pasangan" />
          </div>
          <div className="relative z-10 mt-6 transition-opacity duration-500" style={{ opacity: phase === "closing" ? 0 : 1 }}>
            <p className="text-xs uppercase tracking-[0.35em] text-[#a15b71]">Undangan Pernikahan</p>
            <h1 className="mt-2 font-[family-name:var(--font-script)] text-6xl text-[#a15b71]">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#7a4b5a]">Dengan penuh cinta, kami mengundang</p>
            <p className="font-[family-name:var(--font-display)] text-lg italic">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="bg-[#c98098] text-white shadow-[0_15px_35px_-12px_rgba(201,128,152,0.5)]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#c98098] text-white" />

      {/* ============ 2. HERO ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <DepthOfFieldFrame src={data.heroPhotoUrl} alt="Pasangan" />
        <Reveal direction="scale" className="mt-8">
          <h2 className="font-[family-name:var(--font-script)] text-5xl text-[#a15b71]">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h2>
        </Reveal>
      </section>

      {/* ============ 3. QUOTE + DATE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#fbe9ee] px-6 text-center">
        <Reveal direction="depth" className="mx-auto max-w-md">
          <OrnamentGardenBloom className="mx-auto mb-4 h-10 w-10 text-[#c98098]" />
          <p className="font-[family-name:var(--font-display)] text-lg italic leading-relaxed">{data.quote.text}</p>
          {data.quote.source && <p className="mt-3 text-xs uppercase tracking-widest text-[#a15b71]">{data.quote.source}</p>}
        </Reveal>
        <Reveal direction="scale" delay={150} className="mt-12 rounded-full border-2 border-[#c98098]/40 px-8 py-5">
          <p className="text-xs uppercase tracking-widest text-[#a15b71]">Save The Date</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-xl italic text-[#a15b71]">{formatFullDate(data.events[0].date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#c98098] px-6 text-center text-white">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-widest text-white/80">Hitung Mundur</p>
          <div className="mt-6">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="petal-ring" pastLabelClassName="text-white" />
          </div>
        </Reveal>
      </section>

      {/* ============ 5-6. COUPLE ============ */}
      {[data.groom, data.bride].map((person, i) => (
        <section key={person.fullName} className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
          <DepthOfFieldFrame src={person.photoUrl} alt={person.fullName} />
          <Reveal direction={i % 2 === 0 ? "swing-left" : "swing-right"} className="mt-8">
            <h3 className="font-[family-name:var(--font-script)] text-4xl text-[#a15b71]">{person.nickname}</h3>
            <p className="mt-1 font-[family-name:var(--font-display)] text-lg">{person.fullName}</p>
            <p className="mt-2 text-sm text-[#5a6b5c]">
              {person.childOrder} &middot; {person.parents.father} &amp; {person.parents.mother}
            </p>
          </Reveal>
        </section>
      ))}

      {/* ============ 7. LOVE STORY ============ */}
      <section className="relative bg-[#fbe9ee] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#a15b71]">Perjalanan Cinta Kami</h2>
        </Reveal>
        <div className="mx-auto mt-12 flex max-w-lg flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "swing-left" : "swing-right"} delay={i * 100} className="rounded-3xl bg-white p-5 text-center shadow-[0_15px_30px_-15px_rgba(201,128,152,0.25)]">
              <p className="text-xs uppercase tracking-wide text-[#a15b71]">{moment.date}</p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] italic">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#5a6b5c]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. EVENT ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#a15b71]">Rangkaian Acara</h2>
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction={i % 2 === 0 ? "swing-left" : "swing-right"} delay={i * 100} className="relative rounded-[2rem] border-2 border-[#c98098]/30 bg-white p-8 text-center shadow-[0_25px_50px_-25px_rgba(201,128,152,0.3)]">
              <OrnamentGardenBloom className="absolute -top-7 left-1/2 h-14 w-14 -translate-x-1/2 text-[#c98098]" />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl italic text-[#a15b71]">{event.name}</h3>
              <p className="mt-2 text-sm text-[#5a6b5c]">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-[#5a6b5c]">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#5a6b5c]">{event.address}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 9. GALLERY ============ */}
      <section className="relative bg-[#fbe9ee] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#a15b71]">Galeri Cinta</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="floating-frames" accentClassName="border-[#c98098]/50" />
        </div>
      </section>

      {/* ============ 10. LOCATION ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#a15b71] px-6 text-center text-white">
        <Reveal direction="scale" className="mx-auto max-w-md">
          <OrnamentGardenBloom className="mx-auto mb-4 h-12 w-12 text-white" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic">Lokasi</h2>
          <p className="mt-2 text-sm text-white/80">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard event={data.events[data.events.length - 1]} className="mt-6" iframeClassName="rounded-2xl" buttonClassName="rounded-full bg-white text-[#a15b71]" />
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#a15b71]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-md">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-[2rem] bg-[#fbe9ee] p-6",
              inputClassName: "rounded-xl border-[#f3d9e2] bg-white focus:border-[#a15b71]",
              textareaClassName: "rounded-xl border-[#f3d9e2] bg-white focus:border-[#a15b71]",
              buttonClassName: "rounded-full bg-[#a15b71] text-white",
              radioClassName: "rounded-full border-[#f3d9e2] bg-white text-[#5a6b5c]",
              radioActiveClassName: "bg-[#a15b71] text-white border-[#a15b71]",
              labelClassName: "text-[#5a6b5c]",
              wishItemClassName: "rounded-2xl bg-white shadow-sm",
              wishMessageClassName: "text-[#5a6b5c]",
              wishMetaClassName: "text-[#a15b71]",
            }}
          />
        </div>
      </section>

      {/* ============ 12. GIFT ============ */}
      <section className="relative bg-[#fbe9ee] px-6 py-20">
        <Reveal direction="scale" className="mx-auto max-w-md text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl italic text-[#a15b71]">Wedding Gift</h2>
          <p className="mt-2 text-sm text-[#5a6b5c]">Doa restu kalian sudah sangat berarti. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="rounded-2xl bg-white text-left shadow-sm" buttonClassName="rounded-full bg-[#a15b71] text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING ============ */}
      <footer className="scene-h flex flex-col items-center justify-center px-6 text-center text-[#a15b71]">
        <p className="font-[family-name:var(--font-script)] text-4xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs text-[#5a6b5c]">Terima kasih atas doa restu Anda 🌸</p>
      </footer>
    </div>
  );
}
