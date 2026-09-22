"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** diteruskan langsung ke elemen, untuk kasus seperti clip-path kompleks yang tidak praktis lewat className */
  style?: React.CSSProperties;
  /** delay animasi dalam ms, dibuat kelipatan kecil supaya terasa halus tapi tidak lambat */
  delay?: number;
  /**
   * Gaya reveal -- sengaja dibuat banyak & berbeda karakter supaya tiap
   * template punya "gerakan masuk" sendiri, bukan cuma warna beda:
   *  - unfold: seperti tutup buku terbuka (hinge rotateX dari atas) -- Royal Gold
   *  - editorial: fade tenang tanpa gerak, durasi panjang -- White Palace
   *  - blur-scale: fokus kamera masuk (blur+scale) -- Black Diamond
   *  - swing-left/right: ayunan seperti dahan/pintu -- Secret Garden
   *  - wipe: sapuan clip-path horizontal -- Islamic Majesty
   *  - rise: naik perlahan seperti cahaya -- Moonlight Romance
   *  - drop: jatuh & sedikit memantul seperti kartu diletakkan -- Rustic Romance
   *  - split: membuka dari tengah seperti gerbang -- Nusantara Heritage
   */
  direction?:
    | "up"
    | "down"
    | "left"
    | "right"
    | "scale"
    | "depth"
    | "unfold"
    | "editorial"
    | "blur-scale"
    | "swing-left"
    | "swing-right"
    | "wipe"
    | "rise"
    | "drop"
    | "split"
    | "none";
  as?: keyof React.JSX.IntrinsicElements;
}

const VARIANTS: Record<NonNullable<RevealProps["direction"]>, { base: string; hidden: string; visible: string }> = {
  up: { base: "transition-all duration-700 ease-out", hidden: "opacity-0 translate-y-8", visible: "opacity-100 translate-y-0" },
  down: { base: "transition-all duration-700 ease-out", hidden: "opacity-0 -translate-y-8", visible: "opacity-100 translate-y-0" },
  left: { base: "transition-all duration-700 ease-out", hidden: "opacity-0 translate-x-8", visible: "opacity-100 translate-x-0" },
  right: { base: "transition-all duration-700 ease-out", hidden: "opacity-0 -translate-x-8", visible: "opacity-100 translate-x-0" },
  scale: { base: "transition-all duration-700 ease-out", hidden: "opacity-0 scale-90", visible: "opacity-100 scale-100" },
  depth: {
    base: "transition-all duration-[900ms] ease-out [transform-style:preserve-3d]",
    hidden: "opacity-0 [transform:perspective(1000px)_translateZ(-80px)_rotateX(10deg)]",
    visible: "opacity-100 [transform:perspective(1000px)_translateZ(0)_rotateX(0deg)]",
  },
  unfold: {
    base: "transition-all duration-[850ms] ease-out [transform-origin:top_center] [transform-style:preserve-3d]",
    hidden: "opacity-0 [transform:perspective(900px)_rotateX(-85deg)]",
    visible: "opacity-100 [transform:perspective(900px)_rotateX(0deg)]",
  },
  editorial: {
    base: "transition-opacity duration-[1200ms] ease-out",
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  "blur-scale": {
    base: "transition-all duration-[850ms] ease-out",
    hidden: "opacity-0 scale-95 blur-md",
    visible: "opacity-100 scale-100 blur-none",
  },
  "swing-left": {
    base: "transition-all duration-[800ms] ease-out [transform-origin:top_left]",
    hidden: "opacity-0 [transform:rotate(-10deg)_translateX(-24px)]",
    visible: "opacity-100 [transform:rotate(0deg)_translateX(0)]",
  },
  "swing-right": {
    base: "transition-all duration-[800ms] ease-out [transform-origin:top_right]",
    hidden: "opacity-0 [transform:rotate(10deg)_translateX(24px)]",
    visible: "opacity-100 [transform:rotate(0deg)_translateX(0)]",
  },
  wipe: {
    base: "transition-all duration-[750ms] ease-[cubic-bezier(.65,0,.35,1)]",
    hidden: "opacity-100 [clip-path:inset(0_100%_0_0)]",
    visible: "opacity-100 [clip-path:inset(0_0%_0_0)]",
  },
  rise: {
    base: "transition-all duration-[1100ms] ease-out",
    hidden: "opacity-0 translate-y-14",
    visible: "opacity-100 translate-y-0",
  },
  drop: {
    base: "transition-all duration-[650ms] ease-[cubic-bezier(.34,1.56,.64,1)]",
    hidden: "opacity-0 -translate-y-5 rotate-2",
    visible: "opacity-100 translate-y-0 rotate-0",
  },
  split: {
    base: "transition-all duration-[750ms] ease-out [transform-origin:center]",
    hidden: "opacity-0 scale-x-0",
    visible: "opacity-100 scale-x-100",
  },
  none: { base: "transition-opacity duration-700 ease-out", hidden: "opacity-0", visible: "opacity-100" },
};

/** Wrapper animasi cinematic saat elemen masuk viewport -- gaya gerak berbeda per `direction`. */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
  direction = "up",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  const variant = VARIANTS[direction];

  return (
    <Tag
      ref={ref}
      style={{ ...style, transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={cn(variant.base, visible ? variant.visible : variant.hidden, className)}
    >
      {children}
    </Tag>
  );
}
