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
import { OrnamentIslamicArch, OrnamentMandala } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";

const FONTS = fontVars({
  "--font-heading": "'Amiri', serif",
  "--font-body": "'Poppins', sans-serif",
});

/**
 * ============================================================
 * ISLAMIC MAJESTY -- "Islamic Luxury Wedding"
 * ============================================================
 * Setiap section jadi scene 100dvh dengan mandala berputar sebagai
 * elemen latar berulang. Akad & Resepsi tetap dua komposisi berbeda
 * (mihrab tunggal vs kartu geometris lebar) -- ciri khas template ini.
 */
export default function IslamicMajestyTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(1000);
  const akad = data.events[0];
  const resepsi = data.events[1] ?? data.events[0];
  const heroParallax = useParallax<HTMLDivElement>(0.1);

  return (
    <div style={FONTS} className="relative bg-[#f6f1e2] font-[family-name:var(--font-body)] text-[#1c3327]">
      {/* ============ 1. ISLAMIC ORNAMENTAL REVEAL ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0f3d2e] px-6 text-center">
          <OrnamentMandala className="animate-spin-slow absolute left-1/2 top-1/2 h-[140vw] w-[140vw] max-w-none -translate-x-1/2 -translate-y-1/2 text-[#d4af37]/10 sm:h-[70vw] sm:w-[70vw]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f3d2e] via-transparent to-[#0f3d2e]" />
          <div className="relative z-10">
            <Reveal direction="depth">
              <p className="font-[family-name:var(--font-heading)] text-2xl text-[#d4af37]">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            </Reveal>
            <Reveal direction="scale" delay={200}>
              <div className="perspective-1600 relative mx-auto mt-6 h-64 w-52">
                <div className="preserve-3d relative h-full w-full [transform:rotateX(4deg)]">
                  <OrnamentIslamicArch className="absolute inset-0 h-full w-full text-[#d4af37] [transform:translateZ(10px)]" />
                  <OrnamentIslamicArch className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] text-[#d4af37]/50 [transform:translateZ(-15px)]" />
                  <div className="absolute inset-3 top-3 overflow-hidden rounded-t-[100px] [transform:translateZ(25px)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={data.heroPhotoUrl} alt="Pasangan" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="up" delay={450}>
              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#d4af37]">Walimatul &lsquo;Ursy</p>
              <h1 className="text-gold-gradient mt-2 font-[family-name:var(--font-heading)] text-4xl">
                {data.groom.nickname} &amp; {data.bride.nickname}
              </h1>
              <p className="mt-6 text-sm text-[#e2d6b8]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <p className="font-[family-name:var(--font-heading)] text-lg text-[#f6f1e2]">{guestName}</p>
            </Reveal>
            <Reveal direction="scale" delay={700}>
              <div className="mt-9">
                <GoldButton onClick={openInvitation} className="border border-[#d4af37] text-[#f6f1e2] hover:bg-[#d4af37] hover:text-[#0f3d2e]">
                  Buka Undangan
                </GoldButton>
              </div>
            </Reveal>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#0f3d2e] text-[#d4af37]" />

      {/* ============ 2. HERO -- lengkung arsitektural penuh layar ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#0f3d2e] px-6 text-center">
        <OrnamentMandala className="animate-spin-slow pointer-events-none absolute -right-32 -top-32 h-96 w-96 text-[#d4af37]/10" />
        <OrnamentMandala className="animate-spin-slow pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 text-[#d4af37]/10" style={{ animationDirection: "reverse" }} />
        <Reveal direction="scale" className="perspective-1600 relative mx-auto h-[60dvh] max-h-[420px] w-72">
          <div className="preserve-3d relative h-full w-full [transform:rotateY(-3deg)]">
            <OrnamentIslamicArch className="absolute inset-0 h-full w-full text-[#d4af37]/60 [transform:translateZ(-10px)]" />
            <div ref={heroParallax} className="absolute inset-0 overflow-hidden rounded-t-[999px] border-4 border-[#d4af37] [transform:translateZ(15px)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.heroPhotoUrl} alt="Potret pasangan" className="h-[130%] w-full object-cover" />
            </div>
          </div>
        </Reveal>
        <Reveal direction="wipe" delay={150} className="relative mt-8">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl text-[#f6f1e2]">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h1>
        </Reveal>
      </section>

      {/* ============ 3. QURAN QUOTE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#f6f1e2] px-6 text-center">
        <Reveal direction="wipe" className="mx-auto max-w-lg">
          <p className="font-[family-name:var(--font-heading)] text-xl leading-relaxed text-[#1c3327]">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-4 text-sm font-semibold text-[#a8791f]">({data.quote.source})</p>}
        </Reveal>
        <Reveal direction="wipe" delay={200} className="mt-14 border-y border-[#d4af37] px-8 py-5 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#a8791f]">Insya Allah</p>
          <p className="mt-2 font-[family-name:var(--font-heading)] text-xl">{formatFullDate(akad.date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUNTDOWN ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#0f3d2e] px-6 text-center text-[#f6f1e2]">
        <OrnamentMandala className="animate-spin-slow pointer-events-none absolute -right-32 -top-32 h-96 w-96 text-[#d4af37]/10" />
        <Reveal direction="scale" className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e2d6b8]">Menuju Hari Bahagia</p>
          <div className="mt-8">
            <Countdown date={akad.date} time={akad.startTime} variant="geometric-badge" pastLabelClassName="text-[#e2d6b8]" />
          </div>
        </Reveal>
      </section>

      {/* ============ 5. AKAD -- lengkung mihrab tunggal ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#eee3c4] px-6 text-center">
        <Reveal direction="wipe">
          <p className="text-xs uppercase tracking-[0.3em] text-[#a8791f]">Akad Nikah</p>
          <div className="relative mx-auto mt-6 h-72 w-56">
            <OrnamentIslamicArch className="absolute inset-0 h-full w-full text-[#0f3d2e]" />
            <div className="absolute inset-4 top-4 flex flex-col items-center justify-center px-3 text-center">
              <p className="font-[family-name:var(--font-heading)] text-lg text-[#0f3d2e]">{formatFullDateWithDay(akad.date)}</p>
              <p className="mt-1 text-sm text-[#4a5c50]">{formatTimeRange(akad.startTime, akad.endTime)}</p>
              <p className="mt-3 text-sm font-medium text-[#0f3d2e]">{akad.venueName}</p>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-xs text-xs text-[#4a5c50]">{akad.address}</p>
        </Reveal>
      </section>

      {/* ============ 6. RESEPSI -- kartu lebar geometris ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#f6f1e2] px-6 py-16">
        <Reveal direction="scale" className="relative mx-auto w-full max-w-md overflow-hidden border-2 border-[#d4af37] p-8 text-center">
          <OrnamentMandala className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 text-[#0f3d2e]/5" />
          <p className="relative text-xs uppercase tracking-[0.3em] text-[#a8791f]">Resepsi Pernikahan</p>
          <h3 className="relative mt-2 font-[family-name:var(--font-heading)] text-2xl text-[#0f3d2e]">{resepsi.venueName}</h3>
          <p className="relative mt-2 text-sm text-[#4a5c50]">{formatFullDateWithDay(resepsi.date)}</p>
          <p className="relative text-sm text-[#4a5c50]">{formatTimeRange(resepsi.startTime, resepsi.endTime)}</p>
          <p className="relative mt-2 text-xs text-[#4a5c50]">{resepsi.address}</p>
          <div className="relative mt-4">
            <MapsCard event={resepsi} iframeClassName="grayscale" buttonClassName="border border-[#0f3d2e] text-[#0f3d2e] hover:bg-[#0f3d2e] hover:text-white" />
          </div>
        </Reveal>
      </section>

      {/* ============ 7. LOVE STORY ============ */}
      <section className="relative bg-[#f6f1e2] px-6 py-20">
        <Reveal direction="wipe" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#0f3d2e]">Kisah Kami</h2>
        </Reveal>
        <div className="relative mx-auto mt-12 flex max-w-lg flex-col gap-10 border-l-2 border-dashed border-[#d4af37] pl-7">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="wipe" delay={i * 100} className="relative">
              <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-[#0f3d2e] ring-2 ring-[#d4af37]" />
              <p className="text-xs uppercase tracking-widest text-[#a8791f]">{moment.date}</p>
              <h3 className="mt-1 font-[family-name:var(--font-heading)] text-lg text-[#0f3d2e]">{moment.title}</h3>
              <p className="mt-1 text-sm text-[#4a5c50]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 8. GALLERY ============ */}
      <section className="relative bg-[#eee3c4] px-6 py-20">
        <Reveal direction="wipe" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#0f3d2e]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="arch-grid" accentClassName="border-[#d4af37]" />
        </div>
      </section>

      {/* ============ 9. RSVP ============ */}
      <section className="relative bg-[#f6f1e2] px-6 py-20">
        <Reveal direction="wipe" className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[#0f3d2e]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "rounded-lg border border-[#d4af37]/50 bg-white p-6",
              inputClassName: "border-[#d4af37]/60 focus:border-[#0f3d2e]",
              textareaClassName: "border-[#d4af37]/60 focus:border-[#0f3d2e]",
              buttonClassName: "bg-[#0f3d2e] text-white hover:bg-[#173f31]",
              radioClassName: "border-[#d4af37]/60 text-[#4a5c50]",
              radioActiveClassName: "bg-[#0f3d2e] text-white border-[#0f3d2e]",
              labelClassName: "text-[#4a5c50]",
              wishItemClassName: "border border-[#d4af37]/30 bg-white",
              wishMessageClassName: "text-[#4a5c50]",
              wishMetaClassName: "text-[#a8791f]",
            }}
          />
        </div>
      </section>

      {/* ============ 10. GIFT ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#0f3d2e] px-6 text-center text-[#f6f1e2]">
        <Reveal direction="scale" className="mx-auto max-w-lg">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#e2d6b8]">
            Kehadiran dan doa Anda adalah kebahagiaan bagi kami. Bila hendak memberi hadiah pernikahan, dapat melalui rekening berikut.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border border-[#d4af37]/50 bg-white text-left text-[#1c3327]" buttonClassName="border border-[#d4af37] text-[#f6f1e2] hover:bg-[#d4af37] hover:text-[#0f3d2e]" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 11. CLOSING ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center overflow-hidden bg-[#0f3d2e] px-6 text-center text-[#d4af37]">
        <OrnamentMandala className="animate-spin-slow pointer-events-none absolute left-1/2 top-1/2 h-[120vw] w-[120vw] max-w-none -translate-x-1/2 -translate-y-1/2 text-[#d4af37]/5 sm:h-[50vw] sm:w-[50vw]" />
        <p className="relative font-[family-name:var(--font-heading)] text-3xl text-[#f6f1e2]">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="relative mt-3 text-xs">Jazakumullahu khairan atas doa restu Anda</p>
      </footer>
    </div>
  );
}
