"use client";

import type { SchoolTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { GoldButton } from "@/components/shared/gold-button";
import { MapsCard } from "@/components/shared/maps-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentGraduationCap, OrnamentLaurelWreath } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Playfair Display', serif",
  "--font-body": "'Lora', serif",
});

/**
 * ============================================================
 * GRADUATION ELEGANT -- template SEKOLAH/WISUDA, konsep formal.
 * ============================================================
 * Navy-emas dengan laurel wreath & topi toga sebagai motif utama --
 * layout galeri & agenda formal, bukan sekadar wedding yang diganti teks.
 */
export default function GraduationElegantTemplate({ data, templateSlug, guestName }: SchoolTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(950);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#f4f1e6] font-[family-name:var(--font-body)] text-[#0d1b3a]">
      {/* ============ OPENING: laurel + iris dari bawah ============ */}
      {phase !== "open" && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#0d1b3a]">
          <div
            className={cn(
              "absolute inset-0 transition-[clip-path] duration-[950ms] ease-in",
              phase === "closing" ? "[clip-path:circle(150%_at_50%_100%)]" : "[clip-path:circle(0%_at_50%_100%)]"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.coverImage} alt="" className="h-full w-full object-cover opacity-50" />
          </div>
          <div className={cn("relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <div className="relative">
              <OrnamentLaurelWreath className="h-24 w-52 text-[#c9a24b]" />
              <OrnamentGraduationCap className="absolute left-1/2 top-1/2 h-10 w-14 -translate-x-1/2 -translate-y-1/2 text-[#c9a24b]" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-[#c9a24b]">{data.schoolName}</p>
            <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl">{data.title}</h1>
            <p className="mt-6 text-sm text-[#cdd6f0]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#c9a24b] text-white hover:bg-[#c9a24b] hover:text-[#0d1b3a]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#c9a24b] bg-[#0d1b3a] text-[#c9a24b]" />

      {/* ============ HERO ============ */}
      <section className="scene-h relative w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.heroImage} alt={data.schoolName} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f1e6] via-transparent to-transparent" />
      </section>

      {/* ============ CONTENT ============ */}
      <section className="mx-auto max-w-lg px-6 py-14 text-center">
        <Reveal direction="up">
          <OrnamentLaurelWreath className="mx-auto h-14 w-32 text-[#c9a24b]" />
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-[#0d1b3a]">{data.title}</h2>
          {data.batchYear && <p className="mt-1 text-sm uppercase tracking-widest text-[#a8791f]">{data.batchYear}</p>}
          <p className="mt-4 text-sm leading-relaxed text-[#3a4a6a]">{data.description}</p>
          {data.principalName && <p className="mt-4 text-xs text-[#3a4a6a]">Kepala Sekolah: {data.principalName}</p>}
        </Reveal>
      </section>

      {/* ============ EVENT + AGENDA ============ */}
      <section className="scene-h flex flex-col items-center justify-center bg-[#0d1b3a] px-6 text-[#f4f1e6]">
        <Reveal direction="scale" className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c9a24b]">{formatFullDate(data.schedule.date)}</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="laurel-badge" />
          </div>
        </Reveal>
        <div className="mx-auto mt-14 max-w-lg">
          <Reveal direction="scale" className="border border-[#c9a24b]/50 p-6 text-center">
            <h3 className="font-[family-name:var(--font-display)] text-lg text-[#c9a24b]">{data.schedule.name}</h3>
            <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
            <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
            <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
            <p className="text-xs text-[#cdd6f0]">{data.schedule.address}</p>
          </Reveal>
          <div className="mt-8 flex flex-col divide-y divide-[#c9a24b]/20 border-y border-[#c9a24b]/20">
            {data.agenda.map((item) => (
              <div key={item.id} className="grid grid-cols-[100px_1fr] gap-4 py-3 text-sm">
                <span className="text-[#c9a24b]">{item.time}</span>
                <span>{item.activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#0d1b3a]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="gold-line-grid" />
        </div>
      </section>

      {/* ============ MAPS ============ */}
      <section className="mx-auto max-w-lg px-6 pb-16 text-center">
        <Reveal direction="scale">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#0d1b3a]">Lokasi</h2>
          <MapsCard event={data.schedule} className="mt-6" buttonClassName="border border-[#0d1b3a] text-[#0d1b3a] hover:bg-[#0d1b3a] hover:text-white" />
        </Reveal>
      </section>

      {/* ============ RSVP ============ */}
      <section className="bg-[#eee3c4] px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#0d1b3a]">Konfirmasi Kehadiran</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border border-[#c9a24b]/50 bg-white p-6",
              inputClassName: "border-[#c9a24b]/60 focus:border-[#0d1b3a]",
              textareaClassName: "border-[#c9a24b]/60 focus:border-[#0d1b3a]",
              buttonClassName: "bg-[#0d1b3a] text-white hover:bg-[#1c3d78]",
              radioClassName: "border-[#c9a24b]/60 text-[#0d1b3a]",
              radioActiveClassName: "bg-[#0d1b3a] text-white border-[#0d1b3a]",
              labelClassName: "text-[#0d1b3a]",
              wishItemClassName: "border border-[#c9a24b]/30 bg-white",
              wishMessageClassName: "text-[#3a4a6a]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <footer className="scene-h flex flex-col items-center justify-center bg-[#0d1b3a] px-6 text-center text-[#c9a24b]">
        <OrnamentGraduationCap className="mx-auto mb-4 h-10 w-14" />
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-xl">{data.schoolName}</p>
        {data.committeeName && <p className="mt-2 text-xs text-[#cdd6f0]">{data.committeeName}</p>}
      </footer>
    </div>
  );
}
