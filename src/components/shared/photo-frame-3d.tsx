"use client";

import type { ReactNode } from "react";
import { useParallax } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";

interface PhotoFrame3DProps {
  src: string;
  alt: string;
  /** kelas bentuk bingkai luar, mis. "rounded-full", "rounded-[2rem]", clip-path arch, dll */
  shapeClassName?: string;
  /** kelas warna/ketebalan border + shadow bingkai */
  frameClassName?: string;
  /** kemiringan 3D statis, mis. "[transform:rotateY(-6deg)_rotateX(3deg)]" */
  tiltClassName?: string;
  /** elemen dekoratif (ornamen sudut, dsb) yang ikut "melayang" di depan foto */
  ornament?: ReactNode;
  /** kecepatan parallax scroll untuk foto di dalam bingkai, 0 = mati */
  parallaxSpeed?: number;
  className?: string;
}

/**
 * Bingkai foto dengan depth nyata: perspective + preserve-3d + tilt statis,
 * lapisan bayangan, dan opsi parallax scroll pada foto di dalamnya. Dipakai
 * ulang di semua template (potret mempelai, love story, dst) supaya foto
 * tidak terasa seperti gambar biasa yang "ditempel".
 */
export function PhotoFrame3D({
  src,
  alt,
  shapeClassName = "rounded-[1.5rem]",
  frameClassName = "border-[3px] border-[#d4af6a]",
  tiltClassName = "[transform:rotateY(-5deg)_rotateX(2deg)]",
  ornament,
  parallaxSpeed = 0.08,
  className,
}: PhotoFrame3DProps) {
  const parallaxRef = useParallax<HTMLDivElement>(parallaxSpeed);

  return (
    <div className={cn("perspective-1600", className)}>
      <div className={cn("preserve-3d relative transition-transform duration-700", tiltClassName)}>
        <div
          className={cn(
            "relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)]",
            shapeClassName,
            frameClassName
          )}
        >
          <div ref={parallaxRef} className="h-[112%] w-full scale-110">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
        {ornament}
      </div>
    </div>
  );
}
