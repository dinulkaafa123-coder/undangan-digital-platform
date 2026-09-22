import { cn } from "@/lib/utils";

interface FloatingParticlesProps {
  count?: number;
  className?: string;
  particleClassName?: string;
}

/**
 * Partikel cahaya melayang, dekoratif saja (pointer-events-none). Posisi
 * dihitung deterministik (bukan Math.random()) supaya render server & client
 * identik -- tidak ada hydration mismatch -- dan tetap ringan (elemen
 * sedikit, animasi hanya transform+opacity).
 */
export function FloatingParticles({ count = 10, className, particleClassName }: FloatingParticlesProps) {
  const particles = Array.from({ length: count }, (_, i) => {
    const left = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const top = (Math.sin(i * 78.233) * 12543.7) % 1;
    const size = 3 + (i % 4);
    const duration = 5 + (i % 5) * 1.6;
    const delay = (i % 6) * 0.7;
    return {
      left: `${Math.abs(left) * 100}%`,
      top: `${Math.abs(top) * 100}%`,
      size,
      duration,
      delay,
    };
  });

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {particles.map((p, i) => (
        <span
          key={i}
          className={cn("absolute animate-twinkle rounded-full", particleClassName)}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
