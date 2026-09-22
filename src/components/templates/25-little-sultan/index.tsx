"use client";

import type { KhitananTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
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
import { OrnamentLittleCrown, OrnamentStarSparkle } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Cinzel', serif",
  "--font-body": "'Poppins', sans-serif",
});

/**
 * ============================================================
 * LITTLE SULTAN -- template KHITANAN, konsep "istana kecil".
 * ============================================================
 * Bukan wedding yang judulnya diganti: fokus pada anak (bukan
 * pasangan), tanpa love story/akad-resepsi, memakai bahasa "walimatul
 * khitan" dan nada playful-regal (mahkota kecil, bukan crest kerajaan
 * dewasa ala Royal Gold).
 */
export default function LittleSultanTemplate({ data, templateSlug, guestName }: KhitananTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);

  return (
    <div style={FONTS} className="relative min-h-screen bg-[#f4f1e6] font-[family-name:var(--font-body)] text-[#1a2a5c]">
      {/* ============ OPENING: gerbang istana kecil ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#101c40]">
          <FloatingParticles count={14} particleClassName="bg-[#d4af37]/70" />
          <div className={cn("preserve-3d absolute inset-y-0 left-0 w-1/2 origin-left bg-[#1a2a5c] transition-transform duration-1000 ease-in-out", phase === "closing" && "[transform:rotateY(-115deg)]")}>
            <OrnamentLittleCrown className="absolute right-6 top-10 h-16 w-20 text-[#d4af37]/50" />
          </div>
          <div className={cn("preserve-3d absolute inset-y-0 right-0 w-1/2 origin-right bg-[#1a2a5c] transition-transform duration-1000 ease-in-out", phase === "closing" && "[transform:rotateY(115deg)]")}>
            <OrnamentLittleCrown className="absolute left-6 top-10 h-16 w-20 text-[#d4af37]/50" />
          </div>
          <div className={cn("relative z-10 px-6 text-center transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <OrnamentLittleCrown className="mx-auto h-14 w-16 text-[#d4af37]" />
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-[#d4af37]">Walimatul Khitan</p>
            <h1 className="text-gold-gradient mt-3 font-[family-name:var(--font-display)] text-4xl sm:text-5xl">{data.child.nickname}</h1>
            <p className="mt-6 text-sm text-[#cdd6f0]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-display)] text-lg text-white">{guestName}</p>
            <div className="mt-9">
              <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#1a2a5c]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="border border-[#d4af37] bg-[#1a2a5c] text-[#d4af37]" />

      {/* ============ GREETING ============ */}
      <section className="mx-auto max-w-md px-6 pt-16 text-center">
        <Reveal direction="scale">
          <OrnamentStarSparkle className="mx-auto h-6 w-6 text-[#d4af37]" />
          <p className="mt-3 font-[family-name:var(--font-display)] text-lg italic leading-relaxed text-[#1a2a5c]">&ldquo;{data.greeting.text}&rdquo;</p>
          {data.greeting.source && <p className="mt-2 text-xs uppercase tracking-widest text-[#a8791f]">{data.greeting.source}</p>}
        </Reveal>
      </section>

      {/* ============ CHILD PHOTO & NAME ============ */}
      <section className="mx-auto max-w-sm px-6 py-10 text-center">
        <Reveal direction="depth">
          <PhotoFrame3D
            src={data.child.photoUrl}
            alt={data.child.fullName}
            shapeClassName="mx-auto h-56 w-56 rounded-full"
            frameClassName="border-[6px] border-[#d4af37]"
            tiltClassName="[transform:rotateY(-4deg)]"
            ornament={<OrnamentLittleCrown className="absolute -top-6 left-1/2 h-12 w-14 -translate-x-1/2 text-[#d4af37]" />}
          />
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl text-[#1a2a5c]">{data.child.nickname}</h1>
          <p className="mt-1 text-sm font-medium">{data.child.fullName}</p>
        </Reveal>
      </section>

      {/* ============ ANNOUNCEMENT ============ */}
      <section className="bg-[#1a2a5c] px-6 py-14 text-center text-white">
        <Reveal direction="up">
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37]">Telah dikhitankan putra kami</p>
          <p className="mt-4 text-xs uppercase tracking-widest text-[#cdd6f0]">{data.child.childOrder}</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-lg">
            {data.child.parents.father} &amp; {data.child.parents.mother}
          </p>
          {data.familyName && <p className="mt-3 text-xs text-[#cdd6f0]">{data.familyName}</p>}
        </Reveal>
      </section>

      {/* ============ WEDDING DATE + COUNTDOWN ============ */}
      <section className="px-6 py-16 text-center">
        <Reveal direction="scale">
          <p className="text-xs uppercase tracking-[0.3em] text-[#a8791f]">Insya Allah Pada</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[#1a2a5c]">{formatFullDate(data.schedule.date)}</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="crown-badge" pastLabelClassName="text-[#1a2a5c]" />
          </div>
        </Reveal>
      </section>

      {/* ============ EVENT + MAPS ============ */}
      <section className="mx-auto max-w-lg px-6 pb-16">
        <Reveal direction="scale" className="border-2 border-double border-[#d4af37] p-8 text-center">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#1a2a5c]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-[#4a5a8a]">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-[#1a2a5c] text-[#1a2a5c] hover:bg-[#1a2a5c] hover:text-white" />
        </Reveal>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#1a2a5c]">Galeri</h2>
        </Reveal>
        <div className="mt-10">
          <Gallery photos={data.gallery} variant="crown-frame" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ RSVP ============ */}
      <section className="mx-auto max-w-lg px-6 py-16">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#1a2a5c]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mt-10">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-lg border border-[#d4af37]/50 bg-white p-6",
              inputClassName: "border-[#d4af37]/60 focus:border-[#1a2a5c]",
              textareaClassName: "border-[#d4af37]/60 focus:border-[#1a2a5c]",
              buttonClassName: "bg-[#1a2a5c] text-white hover:bg-[#243b7a]",
              radioClassName: "border-[#d4af37]/60 text-[#1a2a5c]",
              radioActiveClassName: "bg-[#1a2a5c] text-white border-[#1a2a5c]",
              labelClassName: "text-[#1a2a5c]",
              wishItemClassName: "border border-[#d4af37]/30 bg-white",
              wishMessageClassName: "text-[#4a5a8a]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ GIFT ============ */}
      <section className="bg-[#eee3c4] px-6 py-16 text-center">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#1a2a5c]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#4a5a8a]">Doa restu Anda sudah menjadi kebahagiaan bagi kami. Namun jika ingin memberi hadiah:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/50 bg-white text-left" buttonClassName="border border-[#1a2a5c] text-[#1a2a5c] hover:bg-[#1a2a5c] hover:text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ CLOSING ============ */}
      <footer className="bg-[#1a2a5c] px-6 py-14 text-center text-[#d4af37]">
        <OrnamentLittleCrown className="mx-auto mb-4 h-10 w-12" />
        <p className="text-gold-gradient font-[family-name:var(--font-display)] text-2xl">{data.child.nickname}</p>
        <p className="mt-3 text-xs text-[#cdd6f0]">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
