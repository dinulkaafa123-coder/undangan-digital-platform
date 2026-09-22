"use client";

import type { KhitananTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { GoldButton } from "@/components/shared/gold-button";
import { FloatingParticles } from "@/components/shared/floating-particles";
import { MapsCard } from "@/components/shared/maps-card";
import { BankAccountCard } from "@/components/shared/bank-account-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentCrescentStar, OrnamentIslamicArch, OrnamentStarSparkle } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-heading": "'Amiri', serif",
  "--font-body": "'Quicksand', sans-serif",
});

/**
 * ============================================================
 * ISLAMIC KIDS -- template KHITANAN, konsep "islami & ceria".
 * ============================================================
 * Hijau-emas dengan bulan-bintang playful & lengkung masjid mini --
 * beda dari Little Sultan (navy formal) & Little Prince (biru lembut),
 * dan sengaja lebih ceria/bulat dibanding Islamic Majesty (wedding).
 */
export default function IslamicKidsTemplate({ data, templateSlug, guestName }: KhitananTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#f3f8f0] font-[family-name:var(--font-body)] text-[#1c3327]">
      {/* ============ OPENING ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0f5c3e] px-6 text-center">
          <FloatingParticles count={14} particleClassName="bg-[#f5d97a]/80" />
          <div className={cn("relative transition-transform duration-1000 ease-in [transform-origin:50%_65%]", phase === "closing" ? "scale-[6]" : "scale-100")}>
            <OrnamentCrescentStar className="mx-auto h-20 w-20 text-[#f5d97a]" />
          </div>
          <div className={cn("relative z-10 mt-4 transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="font-[family-name:var(--font-heading)] text-xl text-[#f5d97a]">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#f5d97a]">Walimatul Khitan</p>
            <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl text-white">{data.child.nickname}</h1>
            <p className="mt-6 text-sm text-[#cdeedd]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-heading)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#f5d97a] text-white hover:bg-[#f5d97a] hover:text-[#0f5c3e]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#0f5c3e] text-[#f5d97a]" />

      {/* ============ CHILD PHOTO ============ */}
      <section className="scene-h mx-auto flex max-w-sm flex-col items-center justify-center px-6 text-center">
        <Reveal direction="scale">
          <div className="perspective-1600 relative mx-auto h-64 w-52">
            <OrnamentIslamicArch className="absolute inset-0 h-full w-full text-[#f5d97a]" />
            <div className="absolute inset-3 top-3 overflow-hidden rounded-t-[999px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.child.photoUrl} alt={data.child.fullName} className="h-full w-full object-cover" />
            </div>
          </div>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-4xl text-[#0f5c3e]">{data.child.nickname}</h1>
          <p className="mt-1 text-sm font-medium">{data.child.fullName}</p>
        </Reveal>
      </section>

      {/* ============ GREETING ============ */}
      <section className="mx-auto max-w-md px-6 py-10 text-center">
        <Reveal direction="up">
          <div className="flex justify-center gap-2">
            <OrnamentStarSparkle className="h-5 w-5 text-[#f5c542]" />
            <OrnamentStarSparkle className="h-6 w-6 text-[#f5c542]" />
            <OrnamentStarSparkle className="h-5 w-5 text-[#f5c542]" />
          </div>
          <p className="mt-3 font-[family-name:var(--font-heading)] text-lg leading-relaxed text-[#1c3327]">&ldquo;{data.greeting.text}&rdquo;</p>
          {data.greeting.source && <p className="mt-2 text-xs uppercase tracking-widest text-[#a8791f]">{data.greeting.source}</p>}
        </Reveal>
      </section>

      {/* ============ ANNOUNCEMENT ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#0f5c3e] px-6 text-center text-white">
        <Reveal direction="up">
          <p className="text-sm uppercase tracking-[0.3em] text-[#f5d97a]">Telah dikhitankan putra kami</p>
          <p className="mt-4 text-xs uppercase tracking-widest text-[#cdeedd]">{data.child.childOrder}</p>
          <p className="mt-1 font-[family-name:var(--font-heading)] text-lg">
            {data.child.parents.father} &amp; {data.child.parents.mother}
          </p>
        </Reveal>
      </section>

      {/* ============ DATE + COUNTDOWN ============ */}
      <section className="px-6 py-16 text-center">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-[0.3em] text-[#a8791f]">Insya Allah Pada</p>
          <p className="mt-2 font-[family-name:var(--font-heading)] text-2xl text-[#0f5c3e]">{formatFullDate(data.schedule.date)}</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="star-badge" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT + MAPS ============ */}
      <section className="mx-auto max-w-lg px-6 pb-16">
        <Reveal direction="scale" className="border-2 border-[#f5d97a] p-8 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-xl text-[#0f5c3e]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-[#4a5c50]">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-[#0f5c3e] text-[#0f5c3e] hover:bg-[#0f5c3e] hover:text-white" />
        </Reveal>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#0f5c3e]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="star-frame" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#0f5c3e]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-lg border border-[#f5d97a]/60 bg-white p-6",
              inputClassName: "border-[#f5d97a]/60 focus:border-[#0f5c3e]",
              textareaClassName: "border-[#f5d97a]/60 focus:border-[#0f5c3e]",
              buttonClassName: "bg-[#0f5c3e] text-white hover:bg-[#0d4c33]",
              radioClassName: "border-[#f5d97a]/60 text-[#1c3327]",
              radioActiveClassName: "bg-[#0f5c3e] text-white border-[#0f5c3e]",
              labelClassName: "text-[#1c3327]",
              wishItemClassName: "border border-[#f5d97a]/40 bg-white",
              wishMessageClassName: "text-[#4a5c50]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#eef7ea] px-6 py-16 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#0f5c3e]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#4a5c50]">Doa restu Anda sudah menjadi kebahagiaan bagi kami. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#f5d97a]/50 bg-white text-left" buttonClassName="border border-[#0f5c3e] text-[#0f5c3e] hover:bg-[#0f5c3e] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ CLOSING ============ */}
      <footer className="bg-[#0f5c3e] px-6 py-14 text-center text-[#f5d97a]">
        <OrnamentCrescentStar className="mx-auto mb-4 h-10 w-10" />
        <p className="font-[family-name:var(--font-heading)] text-2xl text-white">{data.child.nickname}</p>
        <p className="mt-3 text-xs text-[#cdeedd]">Jazakumullahu khairan atas doa restu Anda</p>
      </footer>
    </div>
  );
}
