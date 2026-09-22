import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GoldButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  type?: "button" | "submit";
}

/**
 * Tombol premium dengan sapuan cahaya (shimmer) berulang -- dipakai untuk
 * "Buka Undangan", tombol Maps, dsb. Warna/border sepenuhnya diatur lewat
 * `className` supaya tiap template bisa punya identitas sendiri.
 */
export function GoldButton({ children, onClick, href, target, rel, className, type = "button" }: GoldButtonProps) {
  const classes = cn(
    "shimmer-sweep relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.25em] transition-transform duration-300 active:scale-95",
    className
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
