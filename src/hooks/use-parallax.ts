"use client";

import { useEffect, useRef } from "react";

/**
 * Parallax scroll ringan & GPU-friendly: memindahkan elemen lewat
 * `transform: translate3d` langsung di DOM (bukan lewat React state),
 * di-throttle dengan requestAnimationFrame, dan hanya aktif selagi
 * elemen terlihat di viewport (IntersectionObserver) supaya baterai HP
 * tidak boros saat elemen sudah lewat.
 *
 * `speed` positif = elemen bergerak lebih lambat dari scroll (efek jauh),
 * negatif = lebih cepat (efek dekat/depan).
 */
export function useParallax<T extends HTMLElement>(speed = 0.25) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = false;
    let ticking = false;

    const update = () => {
      ticking = false;
      if (!active) return;
      const rect = node.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      node.style.transform = `translate3d(0, ${(-centerOffset * speed).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) onScroll();
      },
      { rootMargin: "20% 0px 20% 0px" }
    );
    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [speed]);

  return ref;
}
