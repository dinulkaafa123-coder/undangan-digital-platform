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
import { FloatingParticles } from "@/components/shared/floating-particles";
import { OrnamentMoonGlow } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";

const FONTS = fontVars({
  "--font-display": "'Marcellus', serif",
  "--font-names": "'Cormorant Garamond', serif",
  "--font-body": "'Jost', sans-serif",
});

/**
 * ============================================================
 * MOONLIGHT ROMANCE -- "Romantic Night Sky"
 * ============================================================
 * Langit berbintang FIXED di belakang SELURUH halaman (ciri khas
 * template ini yang tidak dipakai template lain), dan setiap section
 * jadi scene 100dvh sehingga terasa seperti melayang di satu langit
 * malam yang sama dari awal sampai akhir.
 */
export default function MoonlightRomanceTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(950);
  const heroParallax = useParallax<HTMLDivElement>(0.12);

  return (
    <div style={FONTS} className="relative bg-[#0b1330] font-[family-name:var(--font-body)] text-[#e9e4d8]">
      {/* Langit malam persisten di belakang seluruh halaman */}
      <div className="fixed inset-0 z-0">
        <FloatingParticles count={34} particleClassName="bg-white/70" />
      </div>

      {/* ============ 1. MOON REVEAL ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#080d24]">
          <FloatingParticles count={22} particleClassName="bg-white/80" />
          <OrnamentMoonGlow className="animate-float-slow absolute -right-10 -top-10 h-52 w-52 text-[#d4b483]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080d24] via-transparent to-[#080d24]/40" />
          <div className="preserve-3d relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <Reveal direction="depth">
              <span className="text-xs uppercase tracking-[0.5em] text-[#d4b483]">Under the Same Moon</span>
              <h1 className="text-gold-gradient mt-4 font-[family-name:var(--font-names)] text-6xl italic sm:text-7xl">
                {data.groom.nickname}
                <br />&amp; {data.bride.nickname}
              </h1>
            </Reveal>
            <Reveal direction="up" delay={350}>
              <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-[#d4b483] to-transparent" />
              <p className="mt-6 text-sm text-[#c9c3b3]">Kepada Yth.</p>
              <p className="font-[family-name:var(--font-display)] text-lg text-[#f3ede0]">{guestName}</p>
            </Reveal>
            <Reveal direction="scale" delay={600}>
              <div className="mt-10">
                <GoldButton onClick={openInvitation} className="border border-[#d4b483] text-[#f3ede0] shadow-[0_0_45px_-10px_rgba(212,180,131,0.55)] hover:bg-[#d4b483] hover:text-[#0b1330]">
                  Buka Undangan
                </GoldButton>
              </div>
            </Reveal>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4b483] bg-[#0b1330] text-[#d4b483] animate-pulse-glow" />

      {/* ============ 2. HERO -- foto penuh layar di bawah langit ============ */}
      <section className="scene-h relative z-10 flex items-end overflow-hidden">
        <div ref={heroParallax} className="absolute inset-0 h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover opacity-80" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1330] via-transparent to-[#0b1330]/40" />
        <OrnamentMoonGlow className="absolute -right-8 -top-8 h-40 w-40 text-[#d4b483]" />
        <Reveal direction="rise" className="relative z-10 w-full px-6 pb-16 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-[#d4b483]/80">Under the Same Moon</span>
          <h1 className="mt-3 font-[family-name:var(--font-names)] text-5xl italic text-[#d4b483]">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h1>
        </Reveal>
      </section>

      {/* ============ 3. QUOTE ============ */}
      <section className="relative z-10 mx-auto max-w-lg px-6 py-20 text-center">
        <Reveal direction="rise">
          <div className="mx-auto mb-6 h-px w-32 bg-gradient-to-r from-transparent via-[#d4b483] to-transparent" />
          <p className="font-[family-name:var(--font-display)] text-lg italic leading-relaxed text-[#e9e4d8]">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-3 text-sm tracking-wide text-[#d4b483]">{data.quote.source}</p>}
        </Reveal>
      </section>

      {/* ============ 4-5. COUPLE -- dua scene potret di bawah bintang ============ */}
      {[data.groom, data.bride].map((person, i) => (
        <section key={person.fullName} className="scene-h relative z-10 flex flex-col items-center justify-center px-6 text-center">
          <Reveal direction={i % 2 === 0 ? "left" : "right"} delay={i * 100}>
            <PhotoFrame3D
              src={person.photoUrl}
              alt={person.fullName}
              shapeClassName="h-52 w-52 rounded-full"
              frameClassName="border border-[#d4b483]/60 shadow-[0_0_45px_-8px_rgba(212,180,131,0.5)]"
              tiltClassName={i % 2 === 0 ? "[transform:rotateY(-6deg)]" : "[transform:rotateY(6deg)]"}
            />
            <h3 className="mt-6 font-[family-name:var(--font-names)] text-4xl italic text-[#d4b483]">{person.nickname}</h3>
            <p className="mt-1 font-medium">{person.fullName}</p>
            <p className="mt-2 text-sm text-[#c9c3b3]">
              {person.childOrder}
              <br />
              {person.parents.father} &amp; {person.parents.mother}
            </p>
          </Reveal>
        </section>
      ))}

      {/* ============ 6. COUNTDOWN ============ */}
      <section className="scene-h relative z-10 flex flex-col items-center justify-center border-y border-white/10 px-6 text-center">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d4b483]">Menghitung Malam Menuju Bahagia</p>
          <div className="mx-auto mt-10 max-w-sm">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="orb-glow" pastLabelClassName="text-[#f3ede0]" />
          </div>
        </Reveal>
      </section>

      {/* ============ 7. EVENT ============ */}
      <section className="relative z-10 mx-auto max-w-lg px-6 py-20">
        <div className="flex flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="depth" delay={i * 150} className="border border-[#d4b483]/25 bg-white/[0.03] p-7 text-center backdrop-blur-sm">
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#d4b483]">{event.name}</h3>
              <p className="mt-2 text-sm text-[#c9c3b3]">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm text-[#c9c3b3]">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium text-[#f3ede0]">{event.venueName}</p>
              <p className="text-xs text-[#c9c3b3]">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale invert-[0.9] contrast-125" buttonClassName="border border-[#d4b483] text-[#d4b483] hover:bg-[#d4b483] hover:text-[#0b1330]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. LOVE STORY -- perjalanan malam ============ */}
      <section className="relative z-10 mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#d4b483]">Perjalanan Malam Kami</h2>
        </Reveal>
        <div className="relative mt-12 flex flex-col gap-12 pl-7">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-[repeating-linear-gradient(180deg,#d4b483_0px,#d4b483_3px,transparent_3px,transparent_9px)] opacity-50" />
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="relative">
              <span className="absolute -left-7 top-1 h-3.5 w-3.5 rounded-full bg-[#d4b483] shadow-[0_0_10px_3px_rgba(212,180,131,0.4)]" />
              <p className="text-xs uppercase tracking-widest text-[#d4b483]">{moment.date}</p>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg text-[#f3ede0]">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#c9c3b3]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 9. STAR GALLERY ============ */}
      <section className="relative z-10 px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#d4b483]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="constellation" accentClassName="border-[#d4b483]/70" />
        </div>
      </section>

      {/* ============ 10. LOCATION ============ */}
      <section className="scene-h relative z-10 flex flex-col items-center justify-center border-y border-white/10 px-6 text-center">
        <Reveal direction="scale" className="mx-auto max-w-md">
          <OrnamentMoonGlow className="mx-auto mb-4 h-14 w-14 text-[#d4b483]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#d4b483]">Lokasi</h2>
          <p className="mt-2 text-sm text-[#c9c3b3]">{data.events[data.events.length - 1].venueName}</p>
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="relative z-10 mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#d4b483]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#d4b483]/25 p-6",
              inputClassName: "border-[#d4b483]/30 bg-transparent text-[#f3ede0] focus:border-[#d4b483]",
              textareaClassName: "border-[#d4b483]/30 bg-transparent text-[#f3ede0] focus:border-[#d4b483]",
              buttonClassName: "bg-[#d4b483] text-[#0b1330] hover:bg-[#c4a06c]",
              radioClassName: "border-[#d4b483]/30 text-[#c9c3b3]",
              radioActiveClassName: "bg-[#d4b483] text-[#0b1330] border-[#d4b483]",
              labelClassName: "text-[#c9c3b3]",
              wishItemClassName: "border border-[#d4b483]/20",
              wishNameClassName: "text-[#f3ede0]",
              wishMessageClassName: "text-[#c9c3b3]",
              wishMetaClassName: "text-[#d4b483]",
            }}
          />
        </div>
      </section>

      {/* ============ 12. GIFT ============ */}
      <section className="relative z-10 border-y border-white/10 px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#d4b483]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#c9c3b3]">Doa restu Anda sudah lebih dari cukup. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d4b483]/25 text-left text-[#f3ede0]" buttonClassName="border border-[#d4b483] text-[#d4b483] hover:bg-[#d4b483] hover:text-[#0b1330]" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING ============ */}
      <footer className="scene-h relative z-10 flex flex-col items-center justify-center px-6 text-center text-[#c9c3b3]">
        <OrnamentMoonGlow className="animate-float-slow absolute right-6 top-10 h-24 w-24 text-[#d4b483]/40" />
        <p className="text-gold-gradient font-[family-name:var(--font-names)] text-4xl italic">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
