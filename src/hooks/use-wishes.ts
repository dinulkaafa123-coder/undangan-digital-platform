"use client";

import { useEffect, useState } from "react";
import type { AttendanceStatus, WishEntry } from "@/types/invitation";

/**
 * Menyimpan ucapan & RSVP tamu di localStorage per-template (demo only).
 * Di produksi nyata, ini akan diganti pemanggilan API ke backend.
 */
export function useWishes(storageKey: string, seed: WishEntry[]) {
  const [wishes, setWishes] = useState<WishEntry[]>(seed);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Membaca localStorage adalah sinkronisasi dengan sistem eksternal yang
    // hanya tersedia di client, sehingga setState di sini memang disengaja.
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as WishEntry[];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWishes([...parsed, ...seed]);
      }
    } catch {
      // localStorage tidak tersedia (mis. private mode) -- abaikan, pakai seed saja
    } finally {
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const addWish = (name: string, attendance: AttendanceStatus, message: string) => {
    const entry: WishEntry = {
      id: `local-${Date.now()}`,
      name,
      attendance,
      message,
      createdAt: new Date().toISOString(),
    };
    setWishes((prev) => {
      const next = [entry, ...prev];
      try {
        const own = next.filter((w) => w.id.startsWith("local-"));
        window.localStorage.setItem(storageKey, JSON.stringify(own));
      } catch {
        // abaikan jika localStorage penuh / tidak tersedia
      }
      return next;
    });
  };

  return { wishes, addWish, loaded };
}
