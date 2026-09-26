"use client";

import type { ReligiousTemplateProps } from "../types";
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
import { OrnamentIslamicArch, OrnamentMandala } from "@/components/decorative/ornaments";
import { formatFullDateWithDay, formatTimeRange } from "@/lib/date";

const FONTS = fontVars({
  "--font-heading": "'Amiri', serif",
  "--font-body": "'Lora', serif",
});

/**
 * ============================================================
 * MIHRAB DEPTH -- template 3D KEAGAMAAN, lorong lengkung mihrab.
 * ============================================================
 * Beberapa lengkung mihrab bersarang pada translateZ berjenjang
 * menciptakan lorong yang benar-benar memanjang ke kedalaman --
 * mandala berputar lambat di lapisan paling belakang.
 */
function MihrabTunnel({ children }: { children: React.ReactNode }) {
  return (
    <div className="perspective-1600 relative flex h-full w-full items-center justify-center overflow-hidden">
      <OrnamentMandala className="animate-spin-slow absolute h-[70vw] w-[70vw] max-w-none text-[#d4af37]/8" style={{ transform: "translateZ(-150px)" }} />
      <div className="preserve-3d relative h-80 w-64">
        <OrnamentIslamicArch className="absolute inset-0 text-[#d4af37]/30" style={{ transform: "translateZ(-70px) scale(1.25)" }} />
        <OrnamentIslamicArch className="absolute inset-4 text-[#d4af37]/60" style={{ transform: "translateZ(-25px) scale(1.1)" }} />
        <OrnamentIslamicArch className="absolute inset-8 text-[#d4af37]" style={{ transform: "translateZ(30px)" }} />
        <div className="preserve-3d absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(55px)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function MihrabDepthTemplate({ data, templateSlug, guestName }: ReligiousTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);
  const heroParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative bg-[#f6f1e2] font-[family-name:var(--font-body)] text-[#1c3327]">
      {/* ============ 1. OPENING ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 overflow-hidden bg-[#0f3d2e]">
          <MihrabTunnel>
            <div className="h-24 w-24 rounded-full border-2 border-[#d4af37] bg-[#0f3d2e]/40" />
          </MihrabTunnel>
          <div
            className="absolute inset-x-0 bottom-16 z-10 px-6 text-center transition-opacity duration-500"
            style={{ opacity: phase === "closing" ? 0 : 1 }}
          >
            <p className="font-[family-name:var(--font-heading)] text-lg text-[#d4af37]">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            {data.hostName && <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#d4af37]">{data.hostName}</p>}
            <h1 className="mt-2 font-[family-name:var(--font-heading)] text-3xl text-white">{data.title}</h1>
            <p className="mt-4 text-sm text-[#cdeedd]">Kepada Yth.</p>
            <p className="font-[family-name:var(--font-heading)] text-lg text-white">{guestName}</p>
            <div className="mt-7">
              <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-[#0f3d2e]">
                Buka Undangan
              </GoldButton>
            </div>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#0f3d2e] text-[#d4af37]" />

      {/* ============ 2. HERO -- lorong mihrab ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <MihrabTunnel>
          <div ref={heroParallax} className="h-full w-full overflow-hidden rounded-t-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.heroImage} alt={data.title} className="h-[130%] w-full object-cover" />
          </div>
        </MihrabTunnel>
        <Reveal direction="wipe" className="relative z-10 mt-4">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-[#0f3d2e]">{data.title}</h1>
        </Reveal>
      </section>

      {/* ============ 3. CONTENT ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <Reveal direction="up" className="mx-auto max-w-lg">
          <p className="text-sm leading-relaxed text-[#4a5c50]">{data.description}</p>
        </Reveal>
      </section>

      {/* ============ 4. SPEAKER ============ */}
      {data.speaker && (
        <section className="relative px-6 pb-14 text-center">
          <Reveal direction="scale" className="mx-auto max-w-sm border-2 border-[#d4af37] p-6">
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

      {/* ============ 5. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#0f3d2e] px-6 text-center text-[#f6f1e2]">
        <OrnamentMandala className="animate-spin-slow pointer-events-none absolute -right-32 -top-32 h-96 w-96 text-[#d4af37]/10" />
        <Reveal direction="scale" className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e2d6b8]">Menuju Hari Acara</p>
          <div className="mt-8">
            <Countdown date={data.schedule.date} time={data.schedule.startTime} variant="geometric-badge" />
          </div>
        </Reveal>
      </section>

      {/* ============ 6. EVENT + AGENDA ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="scale" className="mx-auto max-w-lg border-2 border-[#d4af37] p-7 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-xl text-[#0f3d2e]">{data.schedule.name}</h3>
          <p className="mt-2 text-sm">{formatFullDateWithDay(data.schedule.date)}</p>
          <p className="text-sm">{formatTimeRange(data.schedule.startTime, data.schedule.endTime)}</p>
          <p className="mt-2 text-sm font-medium">{data.schedule.venueName}</p>
          <p className="text-xs text-[#4a5c50]">{data.schedule.address}</p>
          <MapsCard event={data.schedule} className="mt-4" iframeClassName="grayscale" buttonClassName="border border-[#0f3d2e] text-[#0f3d2e] hover:bg-[#0f3d2e] hover:text-white" />
        </Reveal>
        <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3">
          {data.agenda.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-[#d4af37]/40 pb-2 text-sm">
              <span className="font-semibold text-[#0f3d2e]">{item.time}</span>
              <span className="text-[#4a5c50]">{item.activity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 7. GALLERY ============ */}
      <section className="relative bg-[#eee3c4] px-6 py-20">
        <Reveal direction="up" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#0f3d2e]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="arch-grid" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ 8. RSVP ============ */}
      <section className="relative px-6 py-20">
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
        {data.contactPerson && (
          <p className="mt-8 text-center text-xs text-[#4a5c50]">
            Kontak: {data.contactPerson.name} &middot; {data.contactPerson.phone}
          </p>
        )}
      </section>

      {/* ============ 9. INFAQ ============ */}
      {data.bankAccounts.length > 0 && (
        <section className="mx-auto max-w-lg px-6 py-20 text-center">
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

      {/* ============ 10. CLOSING ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#0f3d2e] px-6 text-center text-[#d4af37]">
        <OrnamentMandala className="animate-spin-slow pointer-events-none absolute left-1/2 top-1/2 h-[100vw] w-[100vw] max-w-none -translate-x-1/2 -translate-y-1/2 text-[#d4af37]/5 sm:h-[40vw] sm:w-[40vw]" />
        <p className="relative font-[family-name:var(--font-heading)] text-2xl text-[#f6f1e2]">{data.title}</p>
        <p className="relative mt-3 text-xs">Jazakumullahu khairan atas doa restu Anda</p>
      </footer>
    </div>
  );
}
