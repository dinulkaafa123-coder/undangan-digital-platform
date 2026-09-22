"use client";

import { useEffect, useState } from "react";

export type CoverPhase = "cover" | "closing" | "open";

/**
 * State machine kecil untuk transisi "amplop" cinematic: cover -> closing
 * (animasi keluar ~900ms) -> open (cover dilepas dari DOM). Body discroll-lock
 * selama cover tampil supaya undangan terasa seperti pengalaman utuh, bukan
 * halaman web biasa yang langsung bisa di-scroll.
 */
export function useInvitationCover(closingDurationMs = 900) {
  const [phase, setPhase] = useState<CoverPhase>("cover");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = phase === "open" ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  const openInvitation = () => {
    setPhase((current) => (current === "cover" ? "closing" : current));
    window.setTimeout(() => setPhase("open"), closingDurationMs);
  };

  return { phase, openInvitation, isOpen: phase === "open" };
}
