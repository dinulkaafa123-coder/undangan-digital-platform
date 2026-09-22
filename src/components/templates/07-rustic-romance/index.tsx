"use client";

import type { InvitationTemplateProps } from "../types";
import { fontVars } from "@/lib/template-fonts";
import { useInvitationCover } from "@/hooks/use-invitation-cover";
import { Reveal } from "@/components/shared/reveal";
import { Countdown } from "@/components/shared/countdown";
import { Gallery } from "@/components/shared/gallery";
import { PhotoFrame3D } from "@/components/shared/photo-frame-3d";
import { MapsCard } from "@/components/shared/maps-card";
import { BankAccountCard } from "@/components/shared/bank-account-card";
import { GuestBook } from "@/components/shared/guest-book";
import { MusicToggle } from "@/components/shared/music-toggle";
import { OrnamentTwig } from "@/components/decorative/ornaments";
import { formatFullDate, formatFullDateWithDay, formatTimeRange } from "@/lib/date";
import { cn } from "@/lib/utils";

const FONTS = fontVars({
  "--font-display": "'Abril Fatface', cursive",
  "--font-script": "'Caveat', cursive",
  "--font-body": "'Nunito', sans-serif",
});

const WOOD_GRAIN = "repeating-linear-gradient(100deg, rgba(90,58,32,0.05) 0px, rgba(90,58,32,0.05) 2px, transparent 2px, transparent 26px)";
const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];

/**
 * ============================================================
 * RUSTIC ROMANCE -- "Scrapbook Wedding Journal"
 * ============================================================
 * Dibuka dengan MEMECAHKAN SEGEL LILIN (bukan tombol biasa). Setiap
 * halaman berikutnya terasa seperti membuka lembar scrapbook fisik --
 * elemen dimiringkan & ditempel "selotip" di atas kertas bertekstur
 * kayu penuh layar, bukan kartu digital rapi berbayang tipis.
 */
export default function RusticRomanceTemplate({ data, templateSlug, guestName }: InvitationTemplateProps) {
  const { phase, openInvitation, isOpen } = useInvitationCover(900);

  return (
    <div style={{ ...FONTS, backgroundImage: WOOD_GRAIN }} className="relative bg-[#efe6d8] font-[family-name:var(--font-body)] text-[#4a3b2a]">
      {/* ============ 1. PAPER INVITATION OPENING + WAX SEAL ============ */}
      {phase !== "open" && (
        <div className="perspective-1600 fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#e3d5bc] px-6" style={{ backgroundImage: WOOD_GRAIN }}>
          <div className={cn("relative w-full max-w-sm transition-opacity duration-500", phase === "closing" && "opacity-0")}>
            <div className="relative border-4 border-white bg-[#fbf8f2] px-6 pb-10 pt-16 text-center shadow-[0_30px_60px_-20px_rgba(90,58,32,0.5)]">
              <h1 className="font-[family-name:var(--font-display)] text-3xl text-[#5e6e52]">
                {data.groom.nickname} &amp; {data.bride.nickname}
              </h1>
              <OrnamentTwig className="mx-auto mt-3 h-8 w-32 text-[#8a5a3b]" />
              <p className="mt-3 font-[family-name:var(--font-script)] text-2xl text-[#8a5a3b]">dengan bahagia mengundang</p>
              <p className="mt-2 text-sm">{guestName}</p>
              <p className="mt-6 text-xs uppercase tracking-widest text-[#8a5a3b]/70">Sentuh segel untuk membuka</p>
            </div>

            {/* Wax seal -- interaksi pembuka undangan, bukan tombol biasa */}
            <button
              type="button"
              onClick={openInvitation}
              aria-label="Buka segel undangan"
              className={cn(
                "absolute left-1/2 top-0 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#6b2a1a] bg-gradient-to-br from-[#a8442a] to-[#6b2a1a] text-center shadow-[0_10px_20px_-8px_rgba(0,0,0,0.5)] transition-transform duration-500 active:scale-90",
                phase === "closing" && "scale-0 rotate-45"
              )}
            >
              <span className="font-[family-name:var(--font-display)] text-lg text-[#f0dcb0]">
                {data.groom.nickname[0]}
                {data.bride.nickname[0]}
              </span>
            </button>
          </div>
        </div>
      )}

      <MusicToggle url={data.music.url} autoPlay={isOpen} className="bg-[#8a5a3b] text-white" />

      {/* ============ 2. HERO -- foto ditempel besar penuh layar ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center overflow-hidden px-6 py-16">
        <Reveal direction="drop" className="relative w-full max-w-sm -rotate-1 border-8 border-white bg-white p-4 shadow-[0_25px_50px_-20px_rgba(90,58,32,0.4)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.heroPhotoUrl} alt="Pasangan" className="h-80 w-full object-cover" />
          <span className="absolute -right-3 -top-3 h-8 w-16 -rotate-12 bg-[#e3d5bc]/90" />
        </Reveal>
        <Reveal direction="drop" delay={150} className="mt-8 text-center">
          <h1 className="font-[family-name:var(--font-script)] text-6xl text-[#8a5a3b]">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h1>
        </Reveal>
      </section>

      {/* ============ 3. HANDWRITTEN QUOTE + DATE ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center bg-[#5e6e52]/10 px-6 text-center">
        <Reveal direction="drop" className="mx-auto max-w-md">
          <p className="font-[family-name:var(--font-script)] text-3xl text-[#6b4a2b]">&ldquo;{data.quote.text}&rdquo;</p>
          {data.quote.source && <p className="mt-2 text-xs uppercase tracking-widest text-[#8a5a3b]">{data.quote.source}</p>}
        </Reveal>
        <Reveal direction="drop" delay={150} className="mt-12 -rotate-1 border-4 border-dashed border-[#8a5a3b]/50 bg-white/70 px-6 py-5">
          <p className="text-xs uppercase tracking-widest text-[#8a5a3b]">Tandai Kalendermu</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-xl text-[#5e6e52]">{formatFullDate(data.events[0].date)}</p>
        </Reveal>
      </section>

      {/* ============ 4. COUPLE MINI-BIO ============ */}
      <section className="relative px-6 py-20">
        <div className="mx-auto flex max-w-lg flex-col gap-10 sm:flex-row sm:justify-center">
          {[data.groom, data.bride].map((person, i) => (
            <Reveal key={person.fullName} direction={i % 2 === 0 ? "left" : "right"} delay={i * 120} className="flex flex-1 flex-col items-center text-center">
              <PhotoFrame3D
                src={person.photoUrl}
                alt={person.fullName}
                shapeClassName="h-40 w-full"
                frameClassName="border-4 border-white"
                tiltClassName={i % 2 === 0 ? "[transform:rotateY(-4deg)_rotateX(2deg)]" : "[transform:rotateY(4deg)_rotateX(2deg)]"}
                className="w-full max-w-[220px]"
              />
              <h3 className="mt-5 font-[family-name:var(--font-script)] text-3xl text-[#8a5a3b]">{person.nickname}</h3>
              <p className="text-sm font-semibold">{person.fullName}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#6b5a45]">
                {person.childOrder}
                <br />
                {person.parents.father} &amp; {person.parents.mother}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 5. COUNTDOWN + EVENT ============ */}
      <section className="relative bg-[#5e6e52]/10 px-6 py-20 text-center">
        <Reveal direction="scale" className="mb-10">
          <Countdown date={data.events[0].date} time={data.events[0].startTime} variant="handwritten-days" />
        </Reveal>
        <div className="mx-auto flex max-w-lg flex-col gap-8">
          {data.events.map((event, i) => (
            <Reveal key={event.id} direction="drop" delay={i * 100} className={cn("relative bg-white p-8 shadow-[0_15px_30px_-15px_rgba(90,58,32,0.4)]", rotations[i % rotations.length])}>
              <span className="absolute -top-3 left-8 h-6 w-12 -rotate-6 bg-[#e3d5bc]/90" />
              <h3 className="font-[family-name:var(--font-display)] text-lg text-[#5e6e52]">{event.name}</h3>
              <p className="mt-2 text-sm">{formatFullDateWithDay(event.date)}</p>
              <p className="text-sm">{formatTimeRange(event.startTime, event.endTime)}</p>
              <p className="mt-3 text-sm font-semibold">{event.venueName}</p>
              <p className="text-xs text-[#6b5a45]">{event.address}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 6. SCRAPBOOK LOVE STORY ============ */}
      <section className="relative px-6 py-20">
        <Reveal direction="drop" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5e6e52]">Cerita Kami</h2>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-lg grid-cols-2 gap-5">
          {data.loveStory.map((moment, i) => (
            <Reveal key={moment.id} direction="drop" delay={i * 100} className={cn("border-4 border-white bg-white p-2 shadow-[0_15px_30px_-15px_rgba(90,58,32,0.4)]", rotations[i % rotations.length])}>
              {moment.photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={moment.photoUrl} alt={moment.title} className="h-28 w-full object-cover" />
              )}
              <p className="mt-2 font-[family-name:var(--font-script)] text-lg text-[#8a5a3b]">{moment.title}</p>
              <p className="text-[10px] uppercase tracking-wide text-[#6b5a45]">{moment.date}</p>
              <p className="mt-1 text-xs text-[#6b5a45]">{moment.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 7. POLAROID GALLERY ============ */}
      <section className="relative bg-[#5e6e52]/10 px-6 py-20">
        <Reveal direction="drop" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5e6e52]">Galeri</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg">
          <Gallery photos={data.gallery} variant="corkboard" />
        </div>
      </section>

      {/* ============ 8. MAPS ============ */}
      <section className="scene-h relative flex flex-col items-center justify-center px-6 text-center">
        <Reveal direction="scale" className="mx-auto w-full max-w-md">
          <OrnamentTwig className="mx-auto mb-4 h-8 w-32 text-[#8a5a3b]" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5e6e52]">Lokasi</h2>
          <p className="mt-2 text-sm">{data.events[data.events.length - 1].venueName}</p>
          <MapsCard event={data.events[data.events.length - 1]} className="mt-6" buttonClassName="rounded-full bg-[#5e6e52] text-white" />
        </Reveal>
      </section>

      {/* ============ 9. RSVP ============ */}
      <section className="relative bg-[#5e6e52]/10 px-6 py-20">
        <Reveal direction="drop" className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5e6e52]">Ucapan &amp; Doa</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-md">
          <GuestBook
            storageKey={`wishes-${templateSlug}`}
            seedWishes={data.wishes}
            rsvpEnabled={data.rsvpEnabled}
            theme={{
              cardClassName: "border-4 border-white bg-white p-6 shadow-sm",
              inputClassName: "rounded-md border-[#e3d5bc] focus:border-[#8a5a3b]",
              textareaClassName: "rounded-md border-[#e3d5bc] focus:border-[#8a5a3b]",
              buttonClassName: "rounded-full bg-[#8a5a3b] text-white",
              radioClassName: "rounded-full border-[#e3d5bc] text-[#6b5a45]",
              radioActiveClassName: "bg-[#5e6e52] text-white border-[#5e6e52]",
              labelClassName: "text-[#6b5a45]",
              wishItemClassName: "border-2 border-dashed border-[#e3d5bc]",
              wishMessageClassName: "text-[#6b5a45]",
              wishMetaClassName: "text-[#8a5a3b]",
            }}
          />
        </div>
      </section>

      {/* ============ 10. GIFT ============ */}
      <section className="relative px-6 py-20 text-center">
        <Reveal direction="scale" className="mx-auto max-w-md">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5e6e52]">Tanda Kasih</h2>
          <p className="mt-2 text-sm text-[#6b5a45]">Kehadiranmu sudah cukup membuat kami bahagia. Tapi kalau mau kasih hadiah, boleh banget lewat sini:</p>
          <div className="mt-8 flex flex-col gap-4">
            {data.bankAccounts.map((acc) => (
              <BankAccountCard key={acc.id} account={acc} className="border-4 border-white bg-white text-left shadow-sm" buttonClassName="rounded-full bg-[#8a5a3b] text-white" />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ 11. CLOSING ============ */}
      <footer className="scene-h relative flex flex-col items-center justify-center px-6 text-center text-[#6b5a45]">
        <OrnamentTwig className="mx-auto mb-4 h-8 w-32 text-[#8a5a3b]" />
        <p className="font-[family-name:var(--font-script)] text-4xl text-[#8a5a3b]">
          {data.groom.nickname} &amp; {data.bride.nickname}
        </p>
        <p className="mt-3 text-xs">Terima kasih atas doa restu Anda</p>
      </footer>
    </div>
  );
}
