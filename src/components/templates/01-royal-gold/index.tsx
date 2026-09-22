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
import { OrnamentCrest, OrnamentSwirlDivider, OrnamentCornerFrame } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";

const FONTS = fontVars({
  "--font-display": "'Playfair Display', serif",
  "--font-body": "'Cormorant Garamond', serif",
  "--font-script": "'Alex Brush', cursive",
});

/**
 * ============================================================
 * ROYAL GOLD -- "Modern Royal Palace"
 * ============================================================
 * Setiap section adalah SATU scene 100dvh full-bleed (bukan card di
 * atas background putih) -- foto besar penuh layar, dibingkai lewat
 * overlay ornamen arsitektural, bukan ditempel kecil di tengah card.
 * Alur unik template ini: Opening (gerbang istana) -> Hero foto penuh
 * layar -> Quote+Date dalam bingkai emas -> Countdown -> Couple (dua
 * scene potret terpisah, bukan digabung) -> Love Story gulungan ->
 * Event formal -> Gallery -> Lokasi -> RSVP -> Gift -> Closing (segel).
 */
export default function RoyalGoldTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);
  const heroParallax = useParallax<HTMLDivElement>(0.12);
  const groomParallax = useParallax<HTMLDivElement>(0.1);
  const brideParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative bg-[#120d05] font-[family-name:var(--font-body)] text-[#3a2e1a]">
      {/* ============ 1. OPENING -- gerbang istana ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 overflow-hidden bg-[#120d05]">
          <div className="preserve-3d absolute inset-0 [transform:translateZ(-60px)_scale(1.08)] opacity-60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.coverPhotoUrl} alt="" className="h-full w-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#120d05] via-[#120d05]/70 to-[#120d05]" />
          </div>
          <FloatingParticles count={14} particleClassName="bg-[#e8cb84]/70" />
          <div
            className={
              "relative flex h-full w-full flex-col items-center justify-center px-8 text-center transition-all duration-[1000ms] ease-in [transform-origin:bottom_center] " +
              (phase === "closing" ? "[transform:perspective(900px)_rotateX(-100deg)] opacity-0" : "[transform:rotateX(0deg)] opacity-100")
            }
          >
            <div className="pointer-events-none absolute inset-x-6 top-8 bottom-8 border-[3px] border-double border-[#d4af6a]/70" />
            <OrnamentCornerFrame className="absolute left-8 top-8 h-9 w-9 text-[#d4af6a]" />
            <OrnamentCornerFrame className="absolute right-8 top-8 h-9 w-9 rotate-90 text-[#d4af6a]" />
            <OrnamentCornerFrame className="absolute bottom-8 left-8 h-9 w-9 -rotate-90 text-[#d4af6a]" />
            <OrnamentCornerFrame className="absolute bottom-8 right-8 h-9 w-9 rotate-180 text-[#d4af6a]" />

            <OrnamentCrest className="h-16 w-16 text-[#d4af6a]" />
            <p className="mt-5 text-xs uppercase tracking-[0.5em] text-[#c9a86a]">The Wedding Of</p>
            <h1 className="text-gold-gradient mt-4 font-[family-name:var(--font-script)] text-6xl leading-tight sm:text-7xl">
              {data.groom.nickname}
              <br />&amp; {data.bride.nickname}
            </h1>
            <OrnamentSwirlDivider className="mx-auto mt-6 h-5 w-36 text-[#d4af6a]" />
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#a8916a]">{formatFullDate(data.events[0].date)}</p>
            <p className="mt-8 text-xs tracking-wide text-[#c9a86a]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-lg text-[#f4ecd8]">{guestName}</p>
            <div className="mt-10">
              <GoldButton
                onClick={openInvitation}
                className="border border-[#a8791f] bg-gradient-to-r from-[#7a5a1e] via-[#e8cb84] to-[#7a5a1e] text-[#1c1509] shadow-[0_10px_30px_-10px_rgba(212,175,106,0.7)]"
              >
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4af6a] bg-[#2c2417] text-[#d4af6a] animate-pulse-glow" />

      {/* ============ 2. HERO -- foto penuh layar dalam bingkai arsitektural ============ */}
      <section className="scene-h relative flex items-end overflow-hidden bg-[#120d05]">
        <div ref={heroParallax} className="absolute inset-0 h-[130%] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Potret mempelai" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#120d05] via-[#120d05]/25 to-transparent" />
        <div className="pointer-events-none absolute inset-4 border-[3px] border-double border-[#d4af6a]/80 sm:inset-6" />
        <OrnamentCornerFrame className="absolute left-6 top-6 h-10 w-10 text-[#d4af6a]" />
        <OrnamentCornerFrame className="absolute right-6 top-6 h-10 w-10 rotate-90 text-[#d4af6a]" />
        <Reveal direction="unfold" className="relative z-10 w-full px-8 pb-16 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[#e8cb84]">The Wedding Of</p>
          <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-script)] text-6xl leading-tight sm:text-7xl">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h1>
        </Reveal>
      </section>

      {/* ============ 3. QUOTE + DATE -- bingkai emas penuh layar ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#faf4e6] px-8 text-center">
        <div className="pointer-events-none absolute inset-6 border-[3px] border-double border-[#d4af6a]/70" />
        <Reveal direction="up">
          <OrnamentSwirlDivider className="mx-auto mb-6 h-5 w-32 text-[#a8791f]" />
          <p className="mx-auto max-w-sm font-[family-name:var(--font-display)] text-xl italic leading-relaxed text-[#5a4a2a]">
            &ldquo;{data.quote.text}&rdquo;
          </p>
          {data.quote.source && <p className="mt-4 text-sm tracking-wide text-[#a8791f]">{data.quote.source}</p>}
        </Reveal>
        <Reveal direction="scale" delay={150} className="mt-14 border-y-2 border-[#d4af6a] px-10 py-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[#a8791f]">Save The Date</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">{formatFullDate(data.events[0].date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#2c2417] px-6 text-[#f4ecd8]">
        <FloatingParticles count={10} particleClassName="bg-[#d4af6a]/60" />
        <Reveal direction="scale" className="relative text-center">
          <OrnamentCrest className="mx-auto mb-6 h-12 w-12 text-[#d4af6a]" />
          <p className="text-xs uppercase tracking-[0.35em] text-[#c9a86a]">Menuju Hari Bahagia</p>
          <div className="mt-8">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="medallion" pastLabelClassName="text-[#e8cb84]" />
          </div>
        </Reveal>
      </section>

      {/* ============ 5-6. COUPLE -- dua scene potret penuh layar terpisah ============ */}
      {[
        { person: data.groom, parallax: groomParallax, label: "Mempelai Pria" },
        { person: data.bride, parallax: brideParallax, label: "Mempelai Wanita" },
      ].map(({ person, parallax, label }, i) => (
        <section key={person.fullName} className="scene-h relative flex items-end overflow-hidden bg-[#120d05]">
          <div ref={parallax} className="absolute inset-0 h-[130%] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={person.photoUrl} alt={person.fullName} className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#120d05] via-[#120d05]/10 to-transparent" />
          <div className={`pointer-events-none absolute inset-4 border-[3px] border-double border-[#d4af6a]/80 sm:inset-6 ${i % 2 ? "" : ""}`} />
          <Reveal direction={i % 2 === 0 ? "left" : "right"} className="relative z-10 w-full px-8 pb-14 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#e8cb84]">{label}</p>
            <h3 className="mt-2 font-[family-name:var(--font-script)] text-6xl text-[#f4ecd8]">{person.nickname}</h3>
            <p className="mt-2 font-[family-name:var(--font-display)] text-lg text-[#f4ecd8]/90">{person.fullName}</p>
            <p className="mt-2 text-sm text-[#e7d9b8]">
              {person.childOrder} <br /> {person.parents.father} &amp; {person.parents.mother}
            </p>
            {person.instagram && <p className="mt-1 text-xs text-[#d4af6a]">{person.instagram}</p>}
          </Reveal>
        </section>
      ))}

      {/* ============ 7. LOVE STORY -- gulungan kerajaan ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#f0e5c8] py-16">
        <Reveal direction="unfold" className="px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#3a2e1a]">Kisah Cinta Kami</h2>
        </Reveal>
        <div className="mt-10 flex w-full snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4">
          {data.loveStory.map((moment, i) => (
            <Reveal
              key={moment.id}
              direction="scale"
              delay={i * 100}
              className="w-64 shrink-0 snap-center border-2 border-double border-[#d4af6a] bg-[#faf4e6] p-6 text-center shadow-[0_20px_40px_-20px_rgba(0,0,0,0.3)]"
            >
              <OrnamentCrest className="mx-auto h-8 w-8 text-[#a8791f]" />
              <p className="mt-3 text-xs uppercase tracking-widest text-[#a8791f]">{moment.date}</p>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg">{moment.title}</h3>
              <p className="mt-2 text-sm text-[#5a4a2a]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. EVENT -- kartu undangan formal di atas background tekstur ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#faf4e6] px-6 py-16">
        <Reveal direction="unfold" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide">Undangan Acara</h2>
        </Reveal>
        <Reveal direction="scale" delay={150} className="relative mt-10 w-full max-w-md border-[6px] border-double border-[#d4af6a] p-8 text-center shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)]">
          <OrnamentCornerFrame className="absolute left-2 top-2 h-8 w-8 text-[#a8791f]" />
          <OrnamentCornerFrame className="absolute right-2 top-2 h-8 w-8 rotate-90 text-[#a8791f]" />
          <OrnamentCornerFrame className="absolute bottom-2 left-2 h-8 w-8 -rotate-90 text-[#a8791f]" />
          <OrnamentCornerFrame className="absolute bottom-2 right-2 h-8 w-8 rotate-180 text-[#a8791f]" />
          {data.events.map((event, i) => (
            <div key={event.id} className={i > 0 ? "mt-6 border-t border-[#d4af6a]/50 pt-6" : ""}>
              <h3 className="font-[family-name:var(--font-display)] text-xl text-[#a8791f]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-2 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#5a4a2a]">{event.address}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ============ 9. GALLERY ============ */}
      <section className="relative bg-[#faf4e6] px-6 py-20">
        <Reveal direction="unfold" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="salon-frame" accentClassName="border-[#d4af6a]" />
        </div>
      </section>

      {/* ============ 10. LOKASI ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#2c2417] px-6 text-center text-[#f4ecd8]">
        <Reveal direction="scale" className="mx-auto w-full max-w-md">
          <OrnamentCrest className="mx-auto mb-4 h-10 w-10 text-[#d4af6a]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide">Lokasi Acara</h2>
          <p className="mt-2 text-sm text-[#e7d9b8]">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard
            event={data.events[data.events.length - 1]}
            className="mt-6"
            iframeClassName="grayscale contrast-125"
            buttonClassName="border border-[#d4af6a] text-[#f4ecd8] hover:bg-[#d4af6a] hover:text-[#2c2417]"
          />
        </Reveal>
      </section>

      {/* ============ 11. RSVP ============ */}
      <section className="relative bg-[#faf4e6] px-6 py-20">
        <Reveal direction="unfold" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="relative mx-auto mt-10 max-w-lg border-2 border-double border-[#d4af6a]/60 bg-[#fffdf7] p-1 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.35)]">
          <OrnamentCornerFrame className="absolute -left-2 -top-2 h-10 w-10 text-[#d4af6a]" />
          <OrnamentCornerFrame className="absolute -right-2 -top-2 h-10 w-10 rotate-90 text-[#d4af6a]" />
          <div className="p-5">
            <GuestBook
              storageKey={`wishes-${templateSlug}`}
              seedWishes={data.wishes}
              rsvpEnabled={data.rsvpEnabled}
              theme={{
                cardClassName: "rounded-xl p-4",
                inputClassName: "border-[#c9a86a]/60 bg-white focus:border-[#a8791f]",
                textareaClassName: "border-[#c9a86a]/60 bg-white focus:border-[#a8791f]",
                buttonClassName: "bg-[#a8791f] text-white hover:bg-[#8a6d1f]",
                radioClassName: "border-[#c9a86a]/60 text-[#5a4a2a]",
                radioActiveClassName: "bg-[#a8791f] text-white border-[#a8791f]",
                labelClassName: "text-[#5a4a2a]",
                wishItemClassName: "border border-[#c9a86a]/30 bg-[#fffdf7]",
                wishNameClassName: "text-[#3a2e1a]",
                wishMessageClassName: "text-[#5a4a2a]",
                wishMetaClassName: "text-[#a8791f]",
              }}
            />
          </div>
        </div>
      </section>

      {/* ============ 12. GIFT ============ */}
      <section className="relative bg-[#f0e5c8] px-6 py-20">
        <Reveal direction="scale" className="mx-auto max-w-lg text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide">Wedding Gift</h2>
          <p className="mt-2 text-sm text-[#5a4a2a]">
            Doa restu Anda adalah karunia yang berarti bagi kami. Namun jika ingin memberi tanda kasih, kami sediakan nomor rekening berikut.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard
                key={acc.id}
                account={acc}
                className="border border-[#d4af6a]/50 bg-[#faf4e6] text-left shadow-[0_15px_35px_-15px_rgba(0,0,0,0.3)]"
                buttonClassName="border border-[#a8791f] text-[#a8791f] hover:bg-[#a8791f] hover:text-white"
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 13. CLOSING -- segel kerajaan ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#2c2417] px-6 text-center text-[#c9a86a]">
        <FloatingParticles count={8} particleClassName="bg-[#d4af6a]/50" />
        <OrnamentCrest className="relative mx-auto mb-4 h-14 w-14 text-[#d4af6a]" />
        <p className="text-gold-gradient relative font-[family-name:var(--font-script)] text-4xl">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="relative mt-4 text-xs tracking-widest">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
