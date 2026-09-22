"use client";

import type { InvitationTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { PhotoFrame3D } from "@/components/shared/photo-frame-3d";
import { GoldButton } from "@/components/shared/gold-button";
import { MapsCard } from "@/components/shared/maps-card";
import { BankAccountCard } from "@/components/shared/bank-account-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentSakuraBranch } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-heading": "'Cormorant Garamond', serif",
  "--font-body": "'Nunito', sans-serif",
});

function SakuraPetals({ count = 14 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="animate-petal-fall absolute h-2.5 w-2 rounded-[60%_10%_60%_10%] bg-[#f3b6c9]"
          style={{
            left: `${(i * 29) % 100}%`,
            top: "-5%",
            animationDuration: `${7 + (i % 5) * 1.4}s`,
            animationDelay: `${(i % 6) * 0.9}s`,
            opacity: 0.4 + (i % 3) * 0.2,
          }}
        />
      ))}
    </div>
  );
}

/**
 * SAKURA DREAM -- "dahan sakura berlapis, kelopak berguguran".
 * Opening = dua dahan sakura di sudut atas yang mekar (scale dari kecil
 * ke penuh) sambil kelopak berjatuhan dengan depth (sebagian besar &
 * blur dekat kamera, sebagian kecil jauh di belakang).
 */
export default function SakuraDreamTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#fff7f5] font-[family-name:var(--font-body)] text-[#5a3a44]">
      {/* ============ OPENING: sakura mekar ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#fbe4ea]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,235,225,0.9),transparent_60%)]" />
          <SakuraPetals count={18} />

          <div className={cn("absolute -left-4 -top-4 origin-top-left transition-all duration-[1000ms] ease-out", phase === "closing" ? "scale-[2.5] opacity-0" : "scale-100 opacity-100")}>
            <OrnamentSakuraBranch className="h-24 w-40 text-[#c98098]" />
          </div>
          <div
            className={cn(
              "absolute -right-4 -top-2 origin-top-right transition-all duration-[1000ms] ease-out",
              phase === "closing" ? "[transform:scaleX(-2.5)_scaleY(2.5)] opacity-0" : "[transform:scaleX(-1)] opacity-100"
            )}
          >
            <OrnamentSakuraBranch className="h-20 w-36 text-[#c98098]/80" />
          </div>

          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="text-xs uppercase tracking-[0.35em] text-[#a15b71]">Sakura Dream</p>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-6xl italic text-[#a15b71]">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>
            <p className="mt-6 text-sm text-[#7a4b5a]">Dengan penuh cinta, kami mengundang</p>
            <p className="font-[family-name:var(--font-heading)] text-lg italic text-[#5a3a44]">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="bg-[#c98098] text-white shadow-[0_15px_35px_-12px_rgba(201,128,152,0.5)]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#c98098] text-white" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative mx-auto flex max-w-lg flex-col items-center justify-center overflow-hidden px-6 text-center">
        <SakuraPetals count={8} />
        <Reveal direction="scale">
          <div className="mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-[0_25px_50px_-15px_rgba(201,128,152,0.4)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
          </div>
          <h2 className="mt-6 font-[family-name:var(--font-heading)] text-3xl italic text-[#a15b71]">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h2>
          <p className="mt-3 text-sm text-[#7a4b5a]">{data.quote.text}</p>
        </Reveal>
      </section>

      {/* ============ COUPLE ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#a15b71]">Kedua Mempelai</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-16">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction={i % 2 === 0 ? "left" : "right"} delay={i * 120} className="flex flex-col items-center text-center">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="h-44 w-44 rounded-full"
                frameClassName="border-4 border-white"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-5deg)]" : "[transform:rotateY(5deg)]"}
              />
              <h3 className="mt-6 font-[family-name:var(--font-heading)] text-4xl italic text-[#a15b71]">{person.nickname}</h3>
              <p className="mt-1 font-medium">{person.fullName}</p>
              <p className="mt-2 text-sm text-[#7a4b5a]">
                {person.childOrder}
                <br />
                {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EVENT + COUNTDOWN ============ */}
      <section className="scene-h mx-auto flex max-w-lg flex-col items-center justify-center px-6 text-center">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-widest text-[#a15b71]">Hitung Mundur</p>
          <div className="mt-6">
            <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="petal-ring" />
          </div>
        </Reveal>
        <div className="mt-10 flex flex-col gap-6">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="scale" delay={i * 100} className="rounded-[2rem] border border-[#f3cdd7] bg-white p-7 shadow-[0_20px_40px_-20px_rgba(201,128,152,0.3)]">
              <h3 className="font-[family-name:var(--font-heading)] text-xl italic text-[#a15b71]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-medium">{event.venueName}</p>
              <p className="text-xs text-[#7a4b5a]">{event.address}</p>
              <MapsCard event={event} className="mt-4" iframeClassName="rounded-2xl" buttonClassName="rounded-full bg-[#c98098] text-white" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="bg-[#fbe4ea] px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#a15b71]">Kisah Kami</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-8">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100} className="rounded-2xl bg-white p-5 text-center shadow-sm">
              <p className="text-xs uppercase tracking-wide text-[#a15b71]">{moment.date}</p>
              <h3 className="font-[family-name:var(--font-heading)] italic">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#7a4b5a]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ GALLERY -- floating frames ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#a15b71]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="floating-frames" accentClassName="border-white" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-md px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#a15b71]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-3xl bg-[#fbe4ea] p-5",
              inputClassName: "rounded-xl border-[#f3cdd7] bg-white focus:border-[#c98098]",
              textareaClassName: "rounded-xl border-[#f3cdd7] bg-white focus:border-[#c98098]",
              buttonClassName: "rounded-full bg-[#c98098] text-white",
              radioClassName: "rounded-full border-[#f3cdd7] bg-white text-[#7a4b5a]",
              radioActiveClassName: "bg-[#c98098] text-white border-[#c98098]",
              labelClassName: "text-[#7a4b5a]",
              wishItemClassName: "rounded-2xl bg-white shadow-sm",
              wishMessageClassName: "text-[#7a4b5a]",
              wishMetaClassName: "text-[#a15b71]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#fbe4ea] px-6 py-16 text-center">
        <Reveal direction="scale" className="mx-auto max-w-md">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl italic text-[#a15b71]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#7a4b5a]">Doa restu kalian sudah sangat berarti. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="rounded-2xl bg-white text-left shadow-sm" buttonClassName="rounded-full bg-[#c98098] text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="scene-h flex flex-col items-center justify-center px-6 text-center text-[#a15b71]">
        <p className="font-[family-name:var(--font-heading)] text-3xl italic">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-2 text-xs text-[#7a4b5a]">Terima kasih atas doa restu Anda 🌸</p>
      </footer>
    </div>
  );
}
