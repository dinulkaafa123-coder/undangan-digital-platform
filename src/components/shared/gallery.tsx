"use client";

import { useState } from "react";
import type { GalleryPhoto } from "@/types/invitation";
import { cn } from "@/lib/utils";

export type GalleryVariant =
  | "salon-frame"
  | "horizontal-scroll"
  | "masonry"
  | "polaroid-scatter"
  | "arch-grid"
  | "constellation"
  | "corkboard"
  | "heritage-frame"
  | "museum-wall"
  | "parallax-gallery"
  | "card-stack-3d"
  | "cathedral-arch"
  | "cinematic-strip"
  | "floating-frames"
  | "carousel-depth"
  | "mosaic-reveal"
  | "film-strip"
  | "crown-frame"
  | "cloud-frame"
  | "star-frame"
  | "balloon-scatter"
  | "gold-line-grid"
  | "confetti-mosaic";

interface GalleryProps {
  photos: GalleryPhoto[];
  variant: GalleryVariant;
  className?: string;
  /** warna bingkai/aksen, dipakai variant yang berbentuk frame supaya bisa dipakai ulang lintas template */
  accentClassName?: string;
}

const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];

/**
 * Satu state lightbox dipakai bersama, tapi bentuk galerinya (`variant`)
 * benar-benar berbeda struktur per template -- bukan grid 3 kolom yang
 * cuma diganti warna/border. `accentClassName` membuat sebagian variant
 * (yang berbentuk frame) bisa dipakai ulang lintas template dengan warna
 * berbeda tanpa mengubah strukturnya.
 */
export function Gallery({ photos, variant, className, accentClassName = "border-[#d4af6a]" }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={className}>
      {variant === "salon-frame" && (
        <div className="flex flex-col gap-4">
          <button type="button" onClick={() => setActiveIndex(0)} className={cn("group relative block overflow-hidden border-4 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.5)]", accentClassName)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[0]?.url} alt="" className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-80" />
          </button>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {photos.map((photo, i) => (
              <button key={photo.id} type="button" onClick={() => setActiveIndex(i)} className={cn("h-20 w-20 shrink-0 overflow-hidden border-2 opacity-80 transition-opacity hover:opacity-100", accentClassName)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {variant === "horizontal-scroll" && (
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2">
          {photos.map((photo, i) => (
            <button key={photo.id} type="button" onClick={() => setActiveIndex(i)} className="w-[78%] shrink-0 snap-center overflow-hidden sm:w-[46%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-72 w-full object-cover sm:h-80" />
            </button>
          ))}
        </div>
      )}

      {variant === "masonry" && (
        <div className="columns-2 gap-2.5 sm:gap-3 [column-fill:balance]">
          {photos.map((photo, i) => (
            <button key={photo.id} type="button" onClick={() => setActiveIndex(i)} className="group mb-2.5 block w-full overflow-hidden break-inside-avoid sm:mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt=""
                className={cn(
                  "w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105",
                  i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
                )}
              />
            </button>
          ))}
        </div>
      )}

      {variant === "polaroid-scatter" && (
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-6 px-2">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn("w-[42%] border-4 border-white bg-white p-1.5 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] sm:w-[28%]", rotations[i % rotations.length])}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {variant === "arch-grid" && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn("group aspect-[3/4] overflow-hidden border-2", accentClassName)}
              style={{ borderRadius: "45% 45% 0 0 / 55% 55% 0 0" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </button>
          ))}
        </div>
      )}

      {variant === "constellation" && (
        <div className="relative mx-auto flex max-w-xs flex-col items-center">
          {photos.map((photo, i) => (
            <div key={photo.id} className={cn("relative flex w-full", i % 2 === 0 ? "justify-start" : "justify-end")}>
              {i > 0 && <span className="absolute -top-6 left-1/2 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-current opacity-50" />}
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn("my-3 h-24 w-24 shrink-0 overflow-hidden rounded-full border shadow-[0_0_25px_-5px_rgba(212,180,131,0.6)]", accentClassName)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt="" className="h-full w-full object-cover" />
              </button>
            </div>
          ))}
        </div>
      )}

      {variant === "corkboard" && (
        <div className="flex gap-4 overflow-x-auto px-6 pb-3">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn("relative w-36 shrink-0 border-[10px] border-white bg-white pb-4 shadow-[0_18px_25px_-12px_rgba(90,58,32,0.5)]", rotations[i % rotations.length])}
            >
              <span className="absolute -top-2 left-1/2 h-4 w-10 -translate-x-1/2 rotate-2 bg-[#e3d5bc]/90" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="aspect-[4/5] w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {variant === "heritage-frame" && (
        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo, i) => (
            <button key={photo.id} type="button" onClick={() => setActiveIndex(i)} className={cn("group relative aspect-square overflow-hidden border-2 p-1.5", accentClassName)}>
              <span className={cn("absolute left-0.5 top-0.5 h-3 w-3 border-l-2 border-t-2", accentClassName)} />
              <span className={cn("absolute bottom-0.5 right-0.5 h-3 w-3 border-b-2 border-r-2", accentClassName)} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </button>
          ))}
        </div>
      )}

      {/* Museum wall: bingkai besar sejajar dengan label ala galeri seni */}
      {variant === "museum-wall" && (
        <div className="flex flex-col gap-8">
          {photos.map((photo, i) => (
            <button key={photo.id} type="button" onClick={() => setActiveIndex(i)} className="group mx-auto w-[85%]">
              <span className={cn("block border-[10px] p-1 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]", accentClassName, "bg-black/5")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt="" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </span>
              <span className="mt-2 block text-center text-[10px] uppercase tracking-[0.25em] opacity-60">Koleksi {String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      )}

      {/* Parallax gallery: lapisan depan/belakang bergerak beda kecepatan lewat translate statis + scale */}
      {variant === "parallax-gallery" && (
        <div className="relative flex flex-col gap-10">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn("relative mx-auto overflow-hidden rounded-sm shadow-2xl", i % 2 === 0 ? "w-[80%] translate-x-[-6%]" : "w-[68%] translate-x-[8%]")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </button>
          ))}
        </div>
      )}

      {/* 3D card stack: kartu bertumpuk dengan depth rotate */}
      {variant === "card-stack-3d" && (
        <div className="perspective-1600 mx-auto flex max-w-xs flex-wrap justify-center gap-y-6">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "preserve-3d -ml-8 w-40 overflow-hidden border bg-white/10 shadow-[0_25px_45px_-15px_rgba(0,0,0,0.5)] backdrop-blur-sm first:ml-0",
                accentClassName,
                i % 2 === 0 ? "[transform:rotateY(-8deg)]" : "[transform:rotateY(8deg)]"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="aspect-[3/4] w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Cathedral arch: grid dengan lengkung gotik lancip */}
      {variant === "cathedral-arch" && (
        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn("group aspect-[3/4] overflow-hidden border-2", accentClassName)}
              style={{ borderRadius: "50% 50% 0 0 / 65% 65% 0 0" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </button>
          ))}
        </div>
      )}

      {/* Cinematic strip: satu baris lebar dengan judul reel ala film */}
      {variant === "cinematic-strip" && (
        <div className={cn("flex gap-1 overflow-x-auto border-y-8 bg-black/90 p-2", accentClassName)}>
          {photos.map((photo, i) => (
            <button key={photo.id} type="button" onClick={() => setActiveIndex(i)} className="relative h-48 w-72 shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Floating frames: kartu foto melayang dengan sedikit rotasi & offset acak */}
      {variant === "floating-frames" && (
        <div className="flex flex-wrap justify-center gap-4">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "animate-float-slow w-[44%] border bg-white/70 p-2 shadow-[0_20px_35px_-15px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:w-[30%]",
                accentClassName
              )}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Carousel depth: item tengah besar, samping mengecil */}
      {variant === "carousel-depth" && (
        <div className="flex items-center gap-3 overflow-x-auto px-8 py-4">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn("shrink-0 overflow-hidden rounded-md shadow-xl transition-all", i % 2 === 0 ? "h-56 w-40 opacity-100" : "h-44 w-32 opacity-70")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Mosaic reveal: petak-petak ukuran campur dengan overlay kaca */}
      {variant === "mosaic-reveal" && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn("group relative overflow-hidden", i % 4 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-white/10 mix-blend-overlay backdrop-blur-[1px] transition-opacity duration-500 group-hover:opacity-0" />
            </button>
          ))}
        </div>
      )}

      {/* Film strip: format lebar dengan lubang sprocket di tepi */}
      {variant === "film-strip" && (
        <div className="flex flex-col gap-1 bg-black py-2">
          <div className="flex justify-around">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="h-2 w-3 rounded-[2px] bg-white/20" />
            ))}
          </div>
          <div className="flex gap-1 overflow-x-auto px-2">
            {photos.map((photo, i) => (
              <button key={photo.id} type="button" onClick={() => setActiveIndex(i)} className="h-40 w-56 shrink-0 overflow-hidden sm:h-48 sm:w-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt="" className="h-full w-full object-cover grayscale-[0.3]" />
              </button>
            ))}
          </div>
          <div className="flex justify-around">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="h-2 w-3 rounded-[2px] bg-white/20" />
            ))}
          </div>
        </div>
      )}

      {/* Crown frame: grid dengan aksen mahkota di sudut -- template khitanan kerajaan kecil */}
      {variant === "crown-frame" && (
        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo, i) => (
            <button key={photo.id} type="button" onClick={() => setActiveIndex(i)} className={cn("group relative aspect-square overflow-hidden rounded-t-3xl border-2", accentClassName)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </button>
          ))}
        </div>
      )}

      {/* Cloud frame: bingkai bulat lembut ala dongeng -- Little Prince */}
      {variant === "cloud-frame" && (
        <div className="flex flex-wrap justify-center gap-4">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="w-[42%] overflow-hidden border-4 border-white bg-white shadow-[0_15px_30px_-15px_rgba(90,120,180,0.4)] sm:w-[28%]"
              style={{ borderRadius: "45% 55% 60% 40% / 60% 50% 50% 40%" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Star frame: foto dipotong bentuk bintang -- Islamic Kids */}
      {variant === "star-frame" && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group aspect-square overflow-hidden"
              style={{ clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 92%,50% 70%,21% 92%,32% 57%,2% 35%,39% 35%)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </button>
          ))}
        </div>
      )}

      {/* Balloon scatter: foto melayang ukuran & rotasi campur -- Sweet Celebration */}
      {variant === "balloon-scatter" && (
        <div className="flex flex-wrap items-end justify-center gap-4 px-2">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "animate-float-slow overflow-hidden rounded-full border-4 border-white shadow-[0_15px_25px_-10px_rgba(0,0,0,0.3)]",
                i % 3 === 0 ? "h-28 w-28" : i % 3 === 1 ? "h-20 w-20" : "h-24 w-24"
              )}
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Gold line grid: grid rapi bergaris tipis emas -- Birthday Luxury */}
      {variant === "gold-line-grid" && (
        <div className="grid grid-cols-3 gap-px bg-[#c9a24b]/40">
          {photos.map((photo, i) => (
            <button key={photo.id} type="button" onClick={() => setActiveIndex(i)} className="group aspect-square overflow-hidden bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover opacity-90 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      )}

      {/* Confetti mosaic: grid warna-warni miring -- Party Pop */}
      {variant === "confetti-mosaic" && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "aspect-square overflow-hidden border-4 border-black shadow-[4px_4px_0_#000]",
                i % 3 === 0 ? "rotate-2" : i % 3 === 1 ? "-rotate-2" : "rotate-1"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {activeIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4" onClick={() => setActiveIndex(null)}>
          <button type="button" onClick={() => setActiveIndex(null)} className="absolute right-5 top-5 text-3xl text-white/80 transition-colors hover:text-white" aria-label="Tutup">
            &times;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[activeIndex].url}
            alt={photos[activeIndex].caption ?? "Galeri foto"}
            className="max-h-[85vh] max-w-full rounded-sm object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
