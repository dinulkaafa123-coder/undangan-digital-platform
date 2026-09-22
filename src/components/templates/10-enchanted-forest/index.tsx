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
import { FloatingParticles } from "@/components/shared/floating-particles";
import { MapsCard } from "@/components/shared/maps-card";
import { BankAccountCard } from "@/components/shared/bank-account-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentForestLayer } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-heading": "'Cormorant Garamond', serif",
  "--font-body": "'Quicksand', sans-serif",
});

function ForestParallaxHero({ heroPhotoUrl }: { heroPhotoUrl: string }) {
  const farRef = useParallax<HTMLDivElement>(0.06);
  const midRef = useParallax<HTMLDivElement>(0.16);
  const nearRef = useParallax<HTMLDivElement>(0.3);

  return (
    <div className="scene-h relative w-full overflow-hidden bg-[#0f2318]">
      <div ref={farRef} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroPhotoUrl} alt="Pasangan di hutan" className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-[#0f2318]/40" />
      </div>
      <div ref={midRef} className="absolute inset-x-0 bottom-0">
        <OrnamentForestLayer className="h-24 w-full text-[#1f3d2c] sm:h-32" />
      </div>
      <div ref={nearRef} className="absolute inset-x-0 bottom-0">
        <OrnamentForestLayer className="h-16 w-full text-[#0a1a11] sm:h-20" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#fbf8f2] via-transparent to-transparent" />
    </div>
  );
}

/**
 * ENCHANTED FOREST -- "kamera melangkah melewati dedaunan".
 * Opening = beberapa lapis siluet dedaunan (foreground lebih besar &
 * cepat, background lebih kecil & lambat) yang membesar & memudar saat
 * "Buka Undangan" ditekan, seolah kamera menembus semak menuju cahaya --
 * lalu hero utama memakai parallax scroll multi-lapis yang sesungguhnya.
 */
export default function EnchantedForestTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1100);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#fbf8f2] font-[family-name:var(--font-body)] text-[#1f3d2c]">
      {/* ============ OPENING: menembus dedaunan ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#0a1a11]">
          <FloatingParticles count={16} particleClassName="bg-[#e8cb84] shadow-[0_0_6px_2px_rgba(232,203,132,0.7)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_60%)]" />

          {[0, 1, 2].map((layer) => (
            <div
              key={layer}
              className={cn(
                "absolute inset-x-[-10%] bottom-[-5%] transition-all ease-in",
                phase === "closing" ? "translate-y-[-40%] scale-150 opacity-0" : "translate-y-0 scale-100 opacity-100"
              )}
              style={{ transitionDuration: `${900 + layer * 150}ms`, transitionDelay: `${layer * 60}ms` }}
            >
              <OrnamentForestLayer className={cn("w-full text-[#173023]", layer === 0 ? "h-28 opacity-90" : layer === 1 ? "h-20 opacity-70" : "h-14 opacity-50")} />
            </div>
          ))}

          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.4em] text-[#e8cb84]">Enchanted Forest</p>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-5xl italic text-[#f3ede0]">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#cfe3d8]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-heading)] text-lg italic text-[#f3ede0]">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="bg-[#e8cb84] text-[#173023] shadow-[0_15px_35px_-12px_rgba(232,203,132,0.5)]">
                Masuk ke Hutan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#1f3d2c] text-[#e8cb84]" />

      {/* ============ HERO -- multi-layer parallax ============ */}
      <ForestParallaxHero heroPhotoUrl={data.heroPhotoUrl} />
      <div className="mx-auto -mt-10 max-w-md px-6 text-center">
        <Reveal direction="up">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl italic text-[#1f3d2c]">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h2>
          <p className="mt-4 text-sm text-[#3f5a44]">{data.quote.text}</p>
        </Reveal>
      </div>

      {/* ============ COUPLE ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic">Kedua Mempelai</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-16">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction={i % 2 === 0 ? "left" : "right"} delay={i * 120} className="flex flex-col items-center text-center">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="h-44 w-44 rounded-full"
                frameClassName="border-4 border-[#e8cb84]"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-5deg)]" : "[transform:rotateY(5deg)]"}
              />
              <h3 className="mt-6 font-[family-name:var(--font-heading)] text-4xl italic text-[#3f5a44]">{person.nickname}</h3>
              <p className="mt-1 font-medium">{person.fullName}</p>
              <p className="mt-2 text-sm text-[#5a6b5c]">
                {person.childOrder}
                <br />
                {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#1f3d2c] px-6 text-center text-[#f3ede0]">
        <Reveal direction="scale">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic">Menuju Hari Bahagia</h2>
          <div className="mt-10">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="leaf-hex" pastLabelClassName="text-[#cfe3d8]" />
          </div>
        </Reveal>
        <div className="mx-auto mt-16 flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="depth" delay={i * 150} className="border border-[#e8cb84]/30 p-7">
              <h3 className="font-[family-name:var(--font-heading)] text-xl italic text-[#e8cb84]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#cfe3d8]">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-[#e8cb84] text-[#f3ede0] hover:bg-[#e8cb84] hover:text-[#1f3d2c]" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic">Kisah Kami</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-10">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="border-l-2 border-[#3f5a44]/40 pl-5">
              <p className="text-xs uppercase tracking-wide text-[#a8791f]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-heading)] italic">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#5a6b5c]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- parallax ============ */}
      <section className="mx-auto max-w-lg px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="parallax-gallery" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-md px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-2xl bg-[#eef2e6] p-6",
              inputClassName: "rounded-lg border-[#cfe0d3] bg-white focus:border-[#3f5a44]",
              textareaClassName: "rounded-lg border-[#cfe0d3] bg-white focus:border-[#3f5a44]",
              buttonClassName: "rounded-full bg-[#3f5a44] text-white",
              radioClassName: "rounded-full border-[#cfe0d3] bg-white text-[#5a6b5c]",
              radioActiveClassName: "bg-[#3f5a44] text-white border-[#3f5a44]",
              labelClassName: "text-[#5a6b5c]",
              wishItemClassName: "rounded-xl bg-white shadow-sm",
              wishMessageClassName: "text-[#5a6b5c]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#eef2e6] px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-md">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#5a6b5c]">Doa restu kalian sudah sangat berarti. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="rounded-2xl bg-white text-left shadow-sm" buttonClassName="rounded-full bg-[#3f5a44] text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="bg-[#0a1a11] px-6 py-14 text-center text-[#e8cb84]">
        <p className="font-[family-name:var(--font-heading)] text-3xl italic">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-2 text-xs text-[#cfe3d8]">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
