"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Kontrol musik latar undangan. Dibuat toleran terhadap kegagalan
 * (mis. browser memblokir autoplay, atau URL musik tidak dapat diakses)
 * supaya tidak pernah membuat halaman crash.
 */
export function useMusicPlayer(url: string, autoPlay = false) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "none";
    audio.addEventListener("canplaythrough", () => setIsReady(true));
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [url]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      void play();
    }
  }, [isPlaying, pause, play]);

  useEffect(() => {
    if (!autoPlay) return;
    // Autoplay hanya boleh dicoba di client setelah interaksi pengguna (mis.
    // klik "Buka Undangan"); play() sendiri sudah menangani kegagalan browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void play();
  }, [autoPlay, play]);

  return { isPlaying, isReady, play, pause, toggle };
}
