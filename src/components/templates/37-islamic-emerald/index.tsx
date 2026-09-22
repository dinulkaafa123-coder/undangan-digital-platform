"use client";

import type { ReligiousTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { GoldButton } from "@/components/shared/gold-button";
import { MapsCard } from "@/components/shared/maps-card";
import { BankAccountCard } from "@/components/shared/bank-account-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentIslamicArch } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-heading": "'Amiri', serif",
  "--font-body": "'Lora', serif",
});

/**
 * ============================================================
 * ISLAMIC EMERALD -- template KEAGAMAAN, konsep formal-khidmat.
 * ============================================================
 * Zamrud-emas dengan lengkung mihrab -- untuk pengajian/tasyakuran
 * yang ingin terasa agung namun tetap tenang.
 */
export default function IslamicEmeraldTemplate({ data, templateSlug, guestName }: ReligiousTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#f6f1e2] font-[family-name:var(--font-body)] text-[#1c3327]">
      {/* ============ OPENING ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0f3d2e] px-6 text-center">
          <div className={cn("relative transition-transform duration-1000 ease-in [transform-origin:50%_60%]", phase === "closing" ? "scale-[6]" : "scale-100")}>
            <OrnamentIslamicArch className="mx-auto h-56 w-44 text-[#d4af37]" />
          </div>
          <div className={cn("relative z-10 mt-4 transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <p className="font-[family-name:var(--font-heading)] text-xl text-[#d4af37]">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            {data.hostName && <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[#d4af37]">{data.hostName}</p>}
            <h1 className="mt-2 font-[family-name:var(--font-heading)] text-3xl text-white sm:text-4xl">{data.title}</h1>
            <p className="mt-6 text-sm text-[#cdeedd]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-heading)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#0f3d2e]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#0f3d2e] text-[#d4af37]" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroImage} alt={data.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f6f1e2] via-transparent to-transparent" />
      </section>

      {/* ============ CONTENT ============ */}
      <section className="mx-auto max-w-lg px-6 py-14 text-center">
        <Reveal direction="up">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#0f3d2e]">{data.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#4a5c50]">{data.description}</p>
        </Reveal>
      </section>

      {/* ============ SPEAKER ============ */}
      {data.speaker && (
        <section className="mx-auto max-w-sm px-6 pb-14 text-center">
          <Reveal direction="scale" className="border-2 border-[#d4af37] p-6">
            {data.speaker.photoUrl && (
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-[#d4af37]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.speaker.photoUrl} alt={data.speaker.name} className="h-full w-full object-cover" />
              </div>
            )}
            <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg text-[#0f3d2e]">{data.speaker.name}</h3>
            {data.speaker.title && <p className="mt-1 text-xs">{data.speaker.title}</p>}
          </Reveal>
        </section>
      )}

      {/* ============ COUNTDOWN ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#0f3d2e] px-6 text-center text-[#f6f1e2]">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e2d6b8]">Menuju Hari Acara</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="geometric-badge" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT + AGENDA ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="scale" className="border-2 border-[#d4af37] p-7 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-xl text-[#0f3d2e]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-[#4a5c50]">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-[#0f3d2e] text-[#0f3d2e] hover:bg-[#0f3d2e] hover:text-white" />
        </Reveal>
        <div className="mt-8 flex flex-col gap-3">
          {data.agenda.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-[#d4af37]/40 pb-2 text-sm">
              <span className="font-semibold text-[#0f3d2e]">{item.time}</span>
              <span className="text-[#4a5c50]">{item.activity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#0f3d2e]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="arch-grid" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="bg-[#eee3c4] px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#0f3d2e]">Konfirmasi Kehadiran</h2>
        </Reveal>
        <div className="mx-auto mt-8 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#d4af37]/50 bg-white p-6",
              inputClassName: "border-[#d4af37]/60 focus:border-[#0f3d2e]",
              textareaClassName: "border-[#d4af37]/60 focus:border-[#0f3d2e]",
              buttonClassName: "bg-[#0f3d2e] text-white",
              radioClassName: "border-[#d4af37]/60 text-[#4a5c50]",
              radioActiveClassName: "bg-[#0f3d2e] text-white border-[#0f3d2e]",
              wishItemClassName: "border border-[#d4af37]/30 bg-white",
              wishMessageClassName: "text-[#4a5c50]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ INFAQ / GIFT ============ */}
      {data.bankAccounts.length > 0 && (
        <section className="mx-auto max-w-lg px-6 py-16 text-center">
          <Reveal direction="scale">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#0f3d2e]">Infaq &amp; Sedekah</h2>
            <div className="mt-8 flex flex-col gap-4">
              {data.bankAccounts.map((acc) => (
                <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/50 bg-white text-left" buttonClassName="border border-[#0f3d2e] text-[#0f3d2e] hover:bg-[#0f3d2e] hover:text-white" />
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ============ CLOSING ============ */}
      <footer className="bg-[#0f3d2e] px-6 py-14 text-center text-[#d4af37]">
        <p className="font-[family-name:var(--font-heading)] text-2xl text-[#f6f1e2]">{data.title}</p>
        <p className="mt-3 text-xs">Jazakumullahu khairan atas doa restu Anda</p>
      </footer>
    </div>
  );
}
