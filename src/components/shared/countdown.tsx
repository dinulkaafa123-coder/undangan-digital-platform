"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";

export type CountdownVariant =
  | "medallion"
  | "editorial-inline"
  | "flip-glow"
  | "floral-badge"
  | "geometric-badge"
  | "orb-glow"
  | "handwritten-days"
  | "heritage-frame"
  | "palace-plaque"
  | "leaf-hex"
  | "glass-panel"
  | "arch-glow"
  | "marquee"
  | "orbital"
  | "petal-ring"
  | "wave-pulse"
  | "emerald-frame"
  | "deco-frame"
  | "glass-leaf"
  | "gebyok-frame"
  | "songket-frame"
  | "gate-frame"
  | "lantern-glow"
  | "film-reel"
  | "crown-badge"
  | "cloud-badge"
  | "star-badge"
  | "balloon-badge"
  | "luxury-ring"
  | "confetti-burst"
  | "laurel-badge"
  | "shield-badge"
  | "mono-badge";

interface CountdownProps {
  date: string;
  time: string;
  variant: CountdownVariant;
  className?: string;
  pastLabelClassName?: string;
}

const UNITS: Array<{ key: "days" | "hours" | "minutes" | "seconds"; label: string }> = [
  { key: "days", label: "Hari" },
  { key: "hours", label: "Jam" },
  { key: "minutes", label: "Menit" },
  { key: "seconds", label: "Detik" },
];

/**
 * Satu hook (`useCountdown`) dipakai bersama, tapi tampilannya sengaja
 * berbeda total per template lewat `variant` -- supaya "hitung mundur"
 * tidak terasa seperti komponen dashboard yang cuma diganti warna.
 */
export function Countdown({ date, time, variant, className, pastLabelClassName }: CountdownProps) {
  const countdown = useCountdown(date, time);

  if (countdown.isPast) {
    return <p className={cn("text-center text-sm", pastLabelClassName)}>Hari bahagia telah tiba</p>;
  }

  if (variant === "medallion") {
    return (
      <div className={cn("flex items-center justify-center gap-3 sm:gap-5", className)}>
        {UNITS.map((unit) => (
          <div
            key={unit.key}
            className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-[#d4af6a] bg-gradient-to-b from-[#3a2e1a] to-[#241c10] shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),0_10px_20px_-8px_rgba(0,0,0,0.6)] sm:h-20 sm:w-20"
          >
            <span className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#e8cb84] sm:text-2xl">
              {String(countdown[unit.key]).padStart(2, "0")}
            </span>
            <span className="text-[8px] uppercase tracking-[0.15em] text-[#c9a86a] sm:text-[9px]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "editorial-inline") {
    return (
      <div className={cn("flex items-baseline justify-center gap-4 sm:gap-7", className)}>
        {UNITS.map((unit, i) => (
          <div key={unit.key} className="flex items-baseline gap-4 sm:gap-7">
            <div className="flex flex-col items-center">
              <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl">{countdown[unit.key]}</span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.3em] opacity-60">{unit.label}</span>
            </div>
            {i < UNITS.length - 1 && <span className="h-8 w-px self-center bg-current opacity-20" />}
          </div>
        ))}
      </div>
    );
  }

  if (variant === "flip-glow") {
    return (
      <div className={cn("flex items-center justify-center gap-2.5 sm:gap-4", className)}>
        {UNITS.map((unit) => (
          <div
            key={unit.key}
            className="flex w-16 flex-col items-center rounded-md border border-[#c9a24b]/50 bg-black/60 py-3 shadow-[0_0_25px_-8px_rgba(201,162,75,0.7)] sm:w-20"
          >
            <span className="font-[family-name:var(--font-display)] text-2xl text-white [text-shadow:0_0_14px_rgba(201,162,75,0.75)] sm:text-3xl">
              {String(countdown[unit.key]).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#c9a24b]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "floral-badge") {
    return (
      <div className={cn("flex items-center justify-center gap-3 sm:gap-5", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center gap-1.5">
            <div className="flex h-16 w-16 items-center justify-center rounded-[42%_58%_65%_35%/45%_40%_60%_55%] bg-[#f7d9e3] shadow-[0_10px_20px_-10px_rgba(63,90,68,0.4)] sm:h-[4.5rem] sm:w-[4.5rem]">
              <span className="font-[family-name:var(--font-heading)] text-xl italic text-[#a15b71] sm:text-2xl">{countdown[unit.key]}</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#7a8f7d]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "geometric-badge") {
    return (
      <div className={cn("flex items-center justify-center gap-3 sm:gap-5", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center gap-1.5">
            <div
              className="flex h-16 w-16 items-center justify-center border border-[#d4af37] bg-[#0f3d2e] sm:h-[4.5rem] sm:w-[4.5rem]"
              style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}
            >
              <span className="font-[family-name:var(--font-heading)] text-xl text-[#d4af37] sm:text-2xl">
                {String(countdown[unit.key]).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#e2d6b8]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "orb-glow") {
    return (
      <div className={cn("flex items-center justify-center gap-4 sm:gap-6", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center gap-2">
            <div className="animate-pulse-glow flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.5),rgba(212,180,131,0.25)_60%,transparent_75%)] ring-1 ring-[#d4b483]/60 sm:h-[4.5rem] sm:w-[4.5rem]">
              <span className="font-[family-name:var(--font-display)] text-xl text-[#f3ede0] sm:text-2xl">{countdown[unit.key]}</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#d4b483]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "handwritten-days") {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <span className="font-[family-name:var(--font-script)] text-7xl leading-none text-[#8a5a3b] sm:text-8xl">{countdown.days}</span>
        <span className="mt-1 text-sm tracking-wide text-[#6b5a45]">hari lagi menuju hari bahagia</span>
        <span className="mt-2 text-xs text-[#8a5a3b]/80">
          {countdown.hours} jam {countdown.minutes} menit {countdown.seconds} detik
        </span>
      </div>
    );
  }

  if (variant === "heritage-frame") {
    return (
      <div className={cn("flex items-center justify-center gap-2.5 sm:gap-4", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="relative w-16 border border-[#d4af37] bg-[#5c1a1a]/40 px-1 py-3 text-center sm:w-20">
            <span className="absolute left-0 top-0 h-2 w-2 -translate-x-px -translate-y-px border-l border-t border-[#d4af37]" />
            <span className="absolute bottom-0 right-0 h-2 w-2 translate-x-px translate-y-px border-b border-r border-[#d4af37]" />
            <span className="font-[family-name:var(--font-display)] text-xl text-[#d4af37] sm:text-2xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            <span className="mt-0.5 block text-[9px] uppercase tracking-[0.2em] text-[#f0dcb0]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "palace-plaque") {
    return (
      <div className={cn("flex items-center justify-center gap-2.5 sm:gap-4", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="relative w-16 border-2 border-[#d4af6a] bg-gradient-to-b from-[#fdf1c8] to-[#e8cb84] px-1 py-3 text-center shadow-[0_10px_20px_-8px_rgba(0,0,0,0.4)] sm:w-20">
            <span className="absolute inset-1 border border-[#7a5a1e]/40" />
            <span className="relative font-[family-name:var(--font-display)] text-xl text-[#3a2e1a] sm:text-2xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            <span className="relative mt-0.5 block text-[9px] uppercase tracking-[0.2em] text-[#5a4a2a]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "leaf-hex") {
    return (
      <div className={cn("flex items-center justify-center gap-3 sm:gap-5", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center gap-1.5">
            <div
              className="flex h-16 w-16 items-center justify-center bg-[#2f4a34] text-[#e8f0e6] sm:h-[4.5rem] sm:w-[4.5rem]"
              style={{ clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)" }}
            >
              <span className="font-[family-name:var(--font-display)] text-lg sm:text-xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#3f5a44]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "glass-panel") {
    return (
      <div className={cn("flex items-center justify-center gap-2.5 sm:gap-4", className)}>
        {UNITS.map((unit) => (
          <div
            key={unit.key}
            className="flex w-16 flex-col items-center border border-white/40 bg-white/10 py-3 shadow-[0_15px_30px_-15px_rgba(0,0,0,0.3)] backdrop-blur-md sm:w-20"
          >
            <span className="font-[family-name:var(--font-display)] text-2xl text-white sm:text-3xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/70">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "arch-glow") {
    return (
      <div className={cn("flex items-center justify-center gap-2.5 sm:gap-4", className)}>
        {UNITS.map((unit) => (
          <div
            key={unit.key}
            className="flex w-16 flex-col items-center border border-[#c9a24b]/60 bg-white/5 pb-3 pt-5 text-center shadow-[0_0_25px_-10px_rgba(201,162,75,0.6)] sm:w-20"
            style={{ borderRadius: "50% 50% 8px 8px / 65% 65% 8px 8px" }}
          >
            <span className="font-[family-name:var(--font-display)] text-xl text-[#c9a24b] sm:text-2xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.2em] opacity-70">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "marquee") {
    return (
      <div className={cn("flex items-center justify-center gap-2 sm:gap-4", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="relative border-2 border-[#c9a24b] bg-[#1a1206] px-3 py-3 text-center">
            <span className="absolute -top-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#c9a24b] shadow-[0_0_6px_1px_rgba(201,162,75,0.8)]" />
            <span className="font-[family-name:var(--font-display)] text-xl text-[#f5e2a8] sm:text-2xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            <span className="mt-0.5 block text-[9px] uppercase tracking-[0.2em] text-[#c9a24b]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "orbital") {
    return (
      <div className={cn("relative mx-auto flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48", className)}>
        <span className="absolute inset-0 rounded-full border border-dashed border-white/25" />
        <span className="absolute inset-4 rounded-full border border-dashed border-white/15" />
        <div className="text-center">
          <span className="font-[family-name:var(--font-display)] text-2xl text-white sm:text-3xl">{countdown.days}</span>
          <span className="block text-[10px] uppercase tracking-[0.3em] text-white/60">hari lagi</span>
        </div>
        {UNITS.slice(1).map((unit, i) => {
          const angle = i * 120;
          return (
            <div
              key={unit.key}
              className="animate-orbit-spin absolute inset-0"
              style={{ animationDuration: `${18 + i * 6}s`, transform: `rotate(${angle}deg)` }}
            >
              <div className="absolute left-1/2 top-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4b483] bg-[#0b1330] text-[10px] text-[#f3ede0]" style={{ transform: `rotate(${-angle}deg)` }}>
                {String(countdown[unit.key]).padStart(2, "0")}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === "petal-ring") {
    return (
      <div className={cn("flex items-center justify-center gap-3 sm:gap-5", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center gap-1.5">
            <div
              className="flex h-16 w-16 items-center justify-center bg-[#ffd9e6] shadow-[0_10px_20px_-10px_rgba(200,120,150,0.5)] sm:h-[4.5rem] sm:w-[4.5rem]"
              style={{ borderRadius: "50% 10% 50% 10% / 10% 50% 10% 50%" }}
            >
              <span className="font-[family-name:var(--font-heading)] text-xl italic text-[#a15b71] sm:text-2xl">{countdown[unit.key]}</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#a15b71]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "wave-pulse") {
    return (
      <div className={cn("flex items-center justify-center gap-2.5 sm:gap-4", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex w-16 flex-col items-center rounded-t-full rounded-b-3xl border border-[#7fb2c9]/50 bg-white/60 py-3 shadow-sm sm:w-20">
            <span className="font-[family-name:var(--font-display)] text-xl text-[#2c5f73] sm:text-2xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#4a8399]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "emerald-frame") {
    return (
      <div className={cn("flex items-center justify-center gap-2.5 sm:gap-4", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="relative w-16 border-2 border-[#d4af37] bg-[#0d3b2e] px-1 py-3 text-center sm:w-20">
            <span className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            <span className="font-[family-name:var(--font-display)] text-xl text-[#d4af37] sm:text-2xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            <span className="mt-0.5 block text-[9px] uppercase tracking-[0.2em] text-[#cfe3d8]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "deco-frame") {
    return (
      <div className={cn("flex items-center justify-center gap-2 sm:gap-4", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="border border-[#c9a24b] bg-black px-3 py-3 text-center" style={{ clipPath: "polygon(15% 0,85% 0,100% 15%,100% 85%,85% 100%,15% 100%,0 85%,0 15%)" }}>
            <span className="font-[family-name:var(--font-display)] text-xl text-[#c9a24b] sm:text-2xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            <span className="mt-0.5 block text-[9px] uppercase tracking-[0.2em] text-white/70">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "glass-leaf") {
    return (
      <div className={cn("flex items-center justify-center gap-3 sm:gap-5", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center gap-1.5">
            <div
              className="flex h-16 w-14 items-center justify-center border border-white/50 bg-white/10 backdrop-blur-md sm:h-[4.5rem] sm:w-16"
              style={{ borderRadius: "50% 0 50% 0" }}
            >
              <span className="font-[family-name:var(--font-display)] text-lg text-white sm:text-xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/70">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "gebyok-frame") {
    return (
      <div className={cn("flex items-center justify-center gap-2.5 sm:gap-4", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="relative w-16 border-4 border-double border-[#8a5a2e] bg-[#fff8ec] px-1 py-3 text-center sm:w-20">
            <span className="font-[family-name:var(--font-display)] text-xl text-[#5c1a1a] sm:text-2xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            <span className="mt-0.5 block text-[9px] uppercase tracking-[0.2em] text-[#8a5a2e]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "songket-frame") {
    return (
      <div className={cn("flex items-center justify-center gap-2.5 sm:gap-4", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="w-16 border border-[#d4af37] px-1 py-3 text-center sm:w-20" style={{ clipPath: "polygon(50% 0,100% 15%,100% 85%,50% 100%,0 85%,0 15%)" }}>
            <span className="font-[family-name:var(--font-display)] text-xl text-[#d4af37] sm:text-2xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            <span className="mt-0.5 block text-[9px] uppercase tracking-[0.2em] text-[#f0dcb0]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "gate-frame") {
    return (
      <div className={cn("flex items-center justify-center gap-2.5 sm:gap-4", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="w-16 border border-[#d4af37] bg-[#fff8ec]/10 px-1 pb-3 pt-5 text-center sm:w-20" style={{ borderRadius: "40% 40% 4px 4px" }}>
            <span className="font-[family-name:var(--font-display)] text-xl text-[#d4af37] sm:text-2xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            <span className="mt-0.5 block text-[9px] uppercase tracking-[0.2em] opacity-70">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "lantern-glow") {
    return (
      <div className={cn("flex items-center justify-center gap-2.5 sm:gap-4", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center gap-1.5">
            <div className="flex h-16 w-14 items-center justify-center rounded-t-full rounded-b-md border border-[#d4af37] bg-[radial-gradient(circle,rgba(212,175,55,0.35),transparent_75%)] sm:h-[4.5rem] sm:w-16">
              <span className="font-[family-name:var(--font-display)] text-lg text-[#f5e2a8] sm:text-xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#d4af37]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "film-reel") {
    return (
      <div className={cn("flex items-center justify-center gap-1 border-y-4 border-black bg-[#111] px-2 py-3", className)}>
        {UNITS.map((unit, i) => (
          <div key={unit.key} className="flex items-center">
            <div className="flex flex-col items-center px-2">
              <span className="font-[family-name:var(--font-display)] text-xl text-white sm:text-2xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
              <span className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/50">{unit.label}</span>
            </div>
            {i < UNITS.length - 1 && (
              <div className="flex flex-col gap-1.5 px-1">
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (variant === "crown-badge") {
    return (
      <div className={cn("flex items-center justify-center gap-3 sm:gap-5", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center gap-1">
            <svg viewBox="0 0 40 26" className="h-4 w-6 text-[#d4af37]" fill="currentColor">
              <path d="M2 24 L2 10 L12 18 L20 4 L28 18 L38 10 L38 24 Z" />
            </svg>
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d4af37] bg-[#1c1509] sm:h-16 sm:w-16">
              <span className="font-[family-name:var(--font-display)] text-lg text-[#f5e2a8] sm:text-xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            </div>
            <span className="text-[8px] uppercase tracking-[0.2em] text-[#d4af37]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "cloud-badge") {
    return (
      <div className={cn("flex items-center justify-center gap-3 sm:gap-5", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center gap-1.5">
            <div className="flex h-16 w-16 items-center justify-center rounded-[45%_55%_60%_40%/60%_50%_50%_40%] bg-white shadow-[0_10px_25px_-10px_rgba(120,150,200,0.5)] sm:h-[4.5rem] sm:w-[4.5rem]">
              <span className="font-[family-name:var(--font-display)] text-lg text-[#5a7ab0] sm:text-xl">{countdown[unit.key]}</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#7a94c0]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "star-badge") {
    return (
      <div className={cn("flex items-center justify-center gap-3 sm:gap-5", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="relative flex h-16 w-16 items-center justify-center sm:h-[4.5rem] sm:w-[4.5rem]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-[#0f3d2e]" fill="currentColor">
              <path d="M50 0 L61 35 L98 35 L68 57 L79 92 L50 70 L21 92 L32 57 L2 35 L39 35 Z" />
            </svg>
            <span className="relative font-[family-name:var(--font-display)] text-sm text-[#d4af37] sm:text-base">{String(countdown[unit.key]).padStart(2, "0")}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "balloon-badge") {
    return (
      <div className={cn("flex items-end justify-center gap-3 sm:gap-5", className)}>
        {UNITS.map((unit, i) => (
          <div
            key={unit.key}
            className={cn(
              "flex h-16 w-14 flex-col items-center justify-center rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)] sm:h-[4.5rem] sm:w-16",
              i % 3 === 0 ? "bg-[#f7b6c8]" : i % 3 === 1 ? "bg-[#b6d8f7]" : "bg-[#fde08a]"
            )}
          >
            <span className="font-[family-name:var(--font-display)] text-lg text-[#5a3a44] sm:text-xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            <span className="text-[8px] uppercase tracking-wide text-[#5a3a44]/70">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "luxury-ring") {
    return (
      <div className={cn("flex items-center justify-center gap-4 sm:gap-6", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#c9a24b] sm:h-[4.5rem] sm:w-[4.5rem]">
              <div className="flex h-[85%] w-[85%] items-center justify-center rounded-full border border-[#c9a24b]/50">
                <span className="font-[family-name:var(--font-display)] text-lg text-[#c9a24b] sm:text-xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
              </div>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#c9a24b]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "confetti-burst") {
    return (
      <div className={cn("flex items-center justify-center gap-3 sm:gap-5", className)}>
        {UNITS.map((unit, i) => (
          <div
            key={unit.key}
            className={cn(
              "flex h-16 w-16 -rotate-3 flex-col items-center justify-center border-4 border-black text-center shadow-[3px_3px_0_#000] sm:h-[4.5rem] sm:w-[4.5rem]",
              i % 4 === 0 ? "bg-[#ff5c7a] rotate-2" : i % 4 === 1 ? "bg-[#5cc9ff] -rotate-2" : i % 4 === 2 ? "bg-[#ffe14d] rotate-3" : "bg-[#7cff8a] -rotate-1"
            )}
          >
            <span className="font-[family-name:var(--font-display)] text-lg text-black sm:text-xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            <span className="text-[8px] uppercase tracking-wide text-black/70">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "laurel-badge") {
    return (
      <div className={cn("flex items-center justify-center gap-3 sm:gap-5", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center gap-1">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c9a24b] bg-[#0d1b3a] sm:h-[4.5rem] sm:w-[4.5rem]">
              <span className="font-[family-name:var(--font-display)] text-lg text-[#e9e2d0] sm:text-xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            </div>
            <span className="text-[8px] uppercase tracking-[0.2em] text-[#c9a24b]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "shield-badge") {
    return (
      <div className={cn("flex items-center justify-center gap-3 sm:gap-5", className)}>
        {UNITS.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center gap-1.5">
            <div
              className="flex h-16 w-16 items-center justify-center bg-[#1c3d78] text-white sm:h-[4.5rem] sm:w-[4.5rem]"
              style={{ clipPath: "polygon(50% 0%, 100% 20%, 100% 65%, 50% 100%, 0% 65%, 0% 20%)" }}
            >
              <span className="font-[family-name:var(--font-display)] text-lg sm:text-xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
            </div>
            <span className="text-[8px] uppercase tracking-[0.2em] text-[#1c3d78]">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  }

  // mono-badge
  return (
    <div className={cn("flex items-center justify-center gap-2.5 sm:gap-4", className)}>
      {UNITS.map((unit) => (
        <div key={unit.key} className="flex w-16 flex-col items-center border border-white/25 py-3 text-center sm:w-20">
          <span className="font-[family-name:var(--font-display)] text-xl text-white sm:text-2xl">{String(countdown[unit.key]).padStart(2, "0")}</span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.25em] text-white/50">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
