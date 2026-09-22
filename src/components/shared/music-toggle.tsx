"use client";

import { useMusicPlayer } from "@/hooks/use-music-player";
import { cn } from "@/lib/utils";

interface MusicToggleProps {
  url: string;
  autoPlay?: boolean;
  className?: string;
}

export function MusicToggle({ url, autoPlay, className }: MusicToggleProps) {
  const { isPlaying, toggle } = useMusicPlayer(url, autoPlay);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
      className={cn(
        "fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-transform active:scale-90",
        className
      )}
    >
      <span className={cn("block h-4 w-4 rounded-full border-2 border-current", isPlaying && "animate-spin")} />
    </button>
  );
}
