"use client";

import { useEffect, useState } from "react";
import { parseLocalDate } from "@/lib/date";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeCountdown(targetDate: string, targetTime: string): CountdownValue {
  const target = parseLocalDate(targetDate, targetTime).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

/** Menghitung mundur ke tanggal & jam acara. Aman untuk SSR (nilai awal statis). */
export function useCountdown(targetDate: string, targetTime: string): CountdownValue {
  const [value, setValue] = useState<CountdownValue>(() => ({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  }));

  useEffect(() => {
    // Sengaja dihitung ulang di client (bukan saat render) supaya nilai awal
    // server & client sama-sama netral dan tidak memicu hydration mismatch,
    // baru dikoreksi ke nilai asli begitu effect ini berjalan di browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(computeCountdown(targetDate, targetTime));
    const interval = setInterval(() => {
      setValue(computeCountdown(targetDate, targetTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  return value;
}
