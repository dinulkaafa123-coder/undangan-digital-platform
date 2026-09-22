import type { CSSProperties } from "react";

/** Kumpulan ornamen SVG ringan yang dipakai berulang tapi berbeda kombinasi di tiap template. */

export function OrnamentCornerFrame({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 40 V12 Q4 4 12 4 H40" />
      <path d="M50 4 H60" strokeDasharray="2 3" />
      <circle cx="20" cy="20" r="3" />
    </svg>
  );
}

export function OrnamentSwirlDivider({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M0 12 H70" />
      <path d="M130 12 H200" />
      <path d="M85 12 c0 -8 8 -8 8 0 s8 8 8 0 -8 -8 8 -8 8 8 8 0" />
      <circle cx="100" cy="12" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function OrnamentFloralCorner({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 4 C 30 4, 40 20, 30 40 C 55 30, 70 45, 60 65" strokeLinecap="round" />
      <circle cx="14" cy="14" r="6" />
      <circle cx="32" cy="30" r="4" />
      <circle cx="46" cy="52" r="3" />
      <path d="M10 30 q10 10 0 22" strokeLinecap="round" />
    </svg>
  );
}

export function OrnamentIslamicArch({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 240" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 240 V110 C10 50 50 10 100 10 C150 10 190 50 190 110 V240" />
      <path d="M28 240 V112 C28 60 60 28 100 28 C140 28 172 60 172 112 V240" strokeDasharray="3 4" />
      <path d="M100 28 L100 10 M70 45 L60 25 M130 45 L140 25" />
    </svg>
  );
}

export function OrnamentArtDecoLines({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 40" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M0 20 H80" />
      <path d="M120 20 H200" />
      <path d="M90 5 L100 20 L90 35 M110 5 L100 20 L110 35" />
    </svg>
  );
}

export function OrnamentBatikBorder({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 240 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.2" preserveAspectRatio="none">
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 20}, 0)`}>
          <path d="M0 12 Q5 2 10 12 T20 12" />
          <circle cx="10" cy="12" r="1.6" fill="currentColor" stroke="none" />
        </g>
      ))}
    </svg>
  );
}

/** Crest/monogram melingkar untuk kesan "kerajaan" -- Royal Gold. */
export function OrnamentCrest({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 160 160" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="80" cy="80" r="72" strokeDasharray="1 5" />
      <circle cx="80" cy="80" r="60" />
      <path d="M80 20 L86 34 L80 48 L74 34 Z" fill="currentColor" stroke="none" />
      <path d="M80 140 L86 126 L80 112 L74 126 Z" fill="currentColor" stroke="none" />
      <path d="M20 80 L34 74 L48 80 L34 86 Z" fill="currentColor" stroke="none" />
      <path d="M140 80 L126 74 L112 80 L126 86 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Bunga kelopak berlapis dengan kesan depth -- Secret Garden. */
export function OrnamentGardenBloom({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 140 140" className={className} style={style} fill="none">
      <g opacity="0.55">
        <ellipse cx="70" cy="45" rx="16" ry="26" fill="currentColor" />
        <ellipse cx="70" cy="95" rx="16" ry="26" fill="currentColor" />
        <ellipse cx="45" cy="70" rx="26" ry="16" fill="currentColor" />
        <ellipse cx="95" cy="70" rx="26" ry="16" fill="currentColor" />
      </g>
      <circle cx="70" cy="70" r="12" fill="currentColor" />
      <path d="M70 82 Q64 105 50 118" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M64 100 Q54 100 48 108" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Mandala geometris islami, dipakai berputar sangat lambat -- Islamic Majesty. */
export function OrnamentMandala({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="100" cy="100" r="95" />
      <circle cx="100" cy="100" r="78" strokeDasharray="2 4" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = 100 + Math.cos(angle) * 78;
        const y = 100 + Math.sin(angle) * 78;
        return <circle key={i} cx={x} cy={y} r="10" />;
      })}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x1 = 100 + Math.cos(angle) * 40;
        const y1 = 100 + Math.sin(angle) * 40;
        const x2 = 100 + Math.cos(angle) * 95;
        const y2 = 100 + Math.sin(angle) * 95;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.5" opacity="0.5" />;
      })}
    </svg>
  );
}

/** Facet berlian bertumpuk -- Black Diamond. */
export function OrnamentDiamondFacet({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 140" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M50 4 L92 44 L50 136 L8 44 Z" />
      <path d="M8 44 H92" />
      <path d="M50 4 L30 44 L50 136" opacity="0.6" />
      <path d="M50 4 L70 44 L50 136" opacity="0.6" />
      <path d="M30 44 L70 44" opacity="0.4" />
    </svg>
  );
}

/** Bulan sabit dengan cahaya berlapis -- Moonlight Romance. */
export function OrnamentMoonGlow({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 160 160" className={className} style={style} fill="none">
      <circle cx="80" cy="80" r="78" fill="url(#moonGlowGradient)" opacity="0.5" />
      <path
        d="M95 40 A45 45 0 1 0 95 120 A35 35 0 1 1 95 40 Z"
        fill="currentColor"
      />
      <defs>
        <radialGradient id="moonGlowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/** Ranting kayu/daun sederhana untuk kesan rustic hangat -- Rustic Romance. */
export function OrnamentTwig({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 160 60" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M4 30 H156" />
      <path d="M40 30 L54 18 M40 30 L54 42" />
      <path d="M80 30 L94 18 M80 30 L94 42" />
      <path d="M120 30 L134 18 M120 30 L134 42" />
    </svg>
  );
}

/** Gapura/gerbang bertingkat, siluet arsitektur nusantara -- Nusantara Heritage. */
export function OrnamentGapura({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 220" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M10 220 V90 L100 10 L190 90 V220" />
      <path d="M28 220 V98 L100 32 L172 98 V220" strokeDasharray="2 5" />
      <path d="M100 10 V32 M60 60 H140 M45 78 H155" />
    </svg>
  );
}

/** Pintu gerbang istana beromamen ganda -- Diamond Palace 3D. */
export function OrnamentPalaceGate({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 260" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M10 260 V70 C10 30 45 8 100 8 C155 8 190 30 190 70 V260" />
      <path d="M30 260 V76 C30 46 58 26 100 26 C142 26 170 46 170 76 V260" strokeDasharray="2 5" />
      <path d="M100 8 V26" />
      <circle cx="100" cy="50" r="6" />
      <path d="M60 50 H80 M120 50 H140" />
    </svg>
  );
}

/** Lampu gantung kristal -- Diamond Palace / Golden Ballroom. */
export function OrnamentChandelier({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 140 160" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M70 0 V16" />
      <path d="M30 16 H110" />
      <path d="M30 16 L20 40 M110 16 L120 40" />
      <path d="M20 40 H120" />
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={i}>
          <path d={`M${28 + i * 14} 40 L${28 + i * 14} ${58 + (i % 3) * 6}`} />
          <circle cx={28 + i * 14} cy={62 + (i % 3) * 6} r="3" fill="currentColor" stroke="none" />
        </g>
      ))}
      <path d="M70 40 V90" strokeDasharray="1 4" />
    </svg>
  );
}

/** Siluet pohon berlapis untuk kedalaman hutan -- Enchanted Forest. */
export function OrnamentForestLayer({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 400 120" className={className} style={style} fill="currentColor" preserveAspectRatio="none">
      <path d="M0 120 V70 L20 40 L35 60 L55 20 L75 55 L95 35 L115 65 L140 30 L165 62 L190 38 L215 68 L240 32 L265 60 L290 40 L315 66 L340 34 L365 58 L385 42 L400 60 V120 Z" opacity="0.9" />
    </svg>
  );
}

/** Jendela mawar bergaya katedral -- Rose Cathedral. */
export function OrnamentRosetteWindow({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="70" strokeDasharray="2 4" />
      <circle cx="100" cy="100" r="14" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + Math.cos(angle) * 14;
        const y1 = 100 + Math.sin(angle) * 14;
        const x2 = 100 + Math.cos(angle) * 96;
        const y2 = 100 + Math.sin(angle) * 96;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
    </svg>
  );
}

/** Lengkung katedral gotik yang lebih runcing -- Rose Cathedral. */
export function OrnamentCathedralArch({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 260" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M10 260 V120 C10 60 50 10 100 10 C150 10 190 60 190 120 V260" />
      <path d="M26 260 V122 C26 70 58 26 100 26 C142 26 174 70 174 122 V260" strokeDasharray="2 5" />
    </svg>
  );
}

/** Kain tirai/valance melengkung -- Golden Ballroom. */
export function OrnamentCurtainSwag({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 240 60" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.2" preserveAspectRatio="none">
      <path d="M0 0 Q30 50 60 10 T120 10 T180 10 T240 0" />
      <path d="M0 0 Q30 45 60 8 T120 8 T180 8 T240 0" strokeDasharray="2 4" opacity="0.6" />
    </svg>
  );
}

/** Garis rasi bintang menghubungkan titik -- Celestial Love. */
export function OrnamentConstellationLines({ className, style }: { className?: string; style?: CSSProperties }) {
  const points = [
    [10, 60], [40, 20], [80, 35], [120, 8], [150, 40], [185, 15], [140, 70], [90, 80], [50, 95],
  ];
  return (
    <svg viewBox="0 0 200 110" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="0.8">
      <polyline points={points.map((p) => p.join(",")).join(" ")} opacity="0.6" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.4 : 1.4} fill="currentColor" stroke="none" />
      ))}
    </svg>
  );
}

/** Dahan sakura dengan bunga -- Sakura Dream. */
export function OrnamentSakuraBranch({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 220 100" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <path d="M0 90 Q60 70 90 40 T180 10" />
      <path d="M60 62 Q70 50 85 52" />
      <path d="M110 34 Q118 22 132 24" />
      {[[95, 42], [70, 58], [140, 22], [160, 16], [45, 68]].map(([x, y], i) => (
        <g key={i} fill="currentColor" stroke="none">
          <circle cx={x} cy={y} r="5" opacity="0.85" />
          <circle cx={x + 7} cy={y - 3} r="4" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

/** Garis ombak berulang -- Ocean Pearl. */
export function OrnamentWaveCrest({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.3" preserveAspectRatio="none">
      <path d="M0 12 Q12 2 24 12 T48 12 T72 12 T96 12 T120 12 T144 12 T168 12 T192 12 T216 12" />
    </svg>
  );
}

/** Butir mutiara -- Ocean Pearl. */
export function OrnamentPearlDrop({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 60 80" className={className} style={style} fill="none">
      <path d="M30 4 C46 26 52 40 52 52 A22 22 0 1 1 8 52 C8 40 14 26 30 4 Z" fill="url(#pearlGrad)" stroke="currentColor" strokeWidth="1" />
      <defs>
        <radialGradient id="pearlGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/** Sunburst art deco -- Art Deco Gatsby. */
export function OrnamentDecoSunburst({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 100" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1">
      {Array.from({ length: 11 }).map((_, i) => {
        const angle = (180 - i * 18) * (Math.PI / 180);
        const x = 100 + Math.cos(angle) * 95;
        const y = 100 - Math.sin(angle) * 95;
        return <line key={i} x1="100" y1="100" x2={x} y2={y} />;
      })}
      <path d="M5 100 A95 95 0 0 1 195 100" strokeDasharray="2 4" />
    </svg>
  );
}

/** Border chevron bertingkat -- Art Deco Gatsby. */
export function OrnamentDecoChevron({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 20" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.2" preserveAspectRatio="none">
      {Array.from({ length: 10 }).map((_, i) => (
        <path key={i} d={`M${i * 20} 20 L${i * 20 + 10} 0 L${i * 20 + 20} 20`} />
      ))}
    </svg>
  );
}

/** Daun kaca minimal untuk kesan botanical futuristik -- Glass Garden. */
export function OrnamentGlassPetal({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 160" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M50 4 C90 40 90 120 50 156 C10 120 10 40 50 4 Z" fill="currentColor" fillOpacity="0.08" />
      <path d="M50 10 V150" strokeDasharray="2 4" opacity="0.6" />
    </svg>
  );
}

/** Panel ukiran gebyok Jawa -- Royal Javanese. */
export function OrnamentGebyokPanel({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 160 240" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="6" y="6" width="148" height="228" rx="4" />
      <rect x="18" y="18" width="124" height="204" rx="4" strokeDasharray="2 5" />
      <path d="M80 18 V222 M18 120 H142" opacity="0.5" />
      <circle cx="80" cy="120" r="16" />
    </svg>
  );
}

/** Gunungan wayang, ikon khas Jawa -- Royal Javanese. */
export function OrnamentGunungan({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 160 220" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M80 6 L150 190 Q80 220 10 190 Z" />
      <path d="M80 6 L128 150 Q80 176 32 150 Z" strokeDasharray="2 5" />
      <path d="M55 90 Q80 70 105 90 M60 115 Q80 100 100 115" opacity="0.7" />
    </svg>
  );
}

/** Motif diamond bertumpuk ala songket -- Minang Royal. */
export function OrnamentSongketDiamond({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 240 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.1" preserveAspectRatio="none">
      {Array.from({ length: 12 }).map((_, i) => (
        <path key={i} d={`M${i * 20} 12 L${i * 20 + 10} 2 L${i * 20 + 20} 12 L${i * 20 + 10} 22 Z`} />
      ))}
    </svg>
  );
}

/** Siluet atap rumah gadang bergonjong -- Minang Royal. */
export function OrnamentRumahGadang({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 220 100" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 90 Q20 20 45 55 Q60 15 80 55 Q95 10 110 55 Q125 10 140 55 Q160 15 175 55 Q200 20 216 90" />
      <path d="M4 90 H216" />
    </svg>
  );
}

/** Candi bentar, gapura belah khas Bali -- Balinese Paradise. */
export function OrnamentCandiBentar({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 240" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M116 240 V150 C116 90 96 40 60 10 L60 40 C88 65 100 105 100 150 V240 Z" />
      <path d="M96 240 V152 C96 100 82 60 60 34" strokeDasharray="2 5" />
      {Array.from({ length: 4 }).map((_, i) => (
        <path key={i} d={`M${64 + i * 10} ${10 + i * 6} h10`} opacity="0.6" />
      ))}
    </svg>
  );
}

/** Lengkung keyhole ala Timur Tengah -- Arabian Nights. */
export function OrnamentKeyholeArch({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 260" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M10 260 V130 C10 60 45 20 70 20 A30 30 0 0 1 130 20 C155 20 190 60 190 130 V260" />
      <path d="M26 260 V132 C26 72 52 34 70 34 A16 16 0 0 0 130 34 C148 34 174 72 174 132 V260" strokeDasharray="2 5" />
    </svg>
  );
}

/** Lampion gantung -- Arabian Nights. */
export function OrnamentLantern({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 80 140" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M40 0 V14" />
      <path d="M20 14 H60 L52 34 H28 Z" />
      <path d="M24 34 Q16 70 24 100 Q40 116 56 100 Q64 70 56 34" />
      <path d="M24 34 H56 M24 100 H56" opacity="0.6" />
      <path d="M40 100 V128" />
      <circle cx="40" cy="132" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Mahkota kecil ala "little sultan/prince" -- template khitanan. */
export function OrnamentLittleCrown({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 100" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M10 90 L10 45 L35 65 L60 30 L85 65 L110 45 L110 90 Z" fill="currentColor" fillOpacity="0.15" />
      <circle cx="60" cy="18" r="6" fill="currentColor" stroke="none" />
      <circle cx="10" cy="38" r="4" fill="currentColor" stroke="none" />
      <circle cx="110" cy="38" r="4" fill="currentColor" stroke="none" />
      <path d="M10 90 H110" />
    </svg>
  );
}

/** Untaian bendera pesta (bunting) -- template ulang tahun. */
export function OrnamentBunting({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 240 40" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1" preserveAspectRatio="none">
      <path d="M0 4 Q120 24 240 4" />
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i} d={`M${16 + i * 28} 8 L${28 + i * 28} 8 L${22 + i * 28} 32 Z`} fill="currentColor" fillOpacity="0.7" stroke="none" />
      ))}
    </svg>
  );
}

/** Balon pesta sederhana -- template ulang tahun. */
export function OrnamentBalloon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 60 120" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.4">
      <ellipse cx="30" cy="38" rx="26" ry="32" fill="currentColor" fillOpacity="0.2" />
      <path d="M30 70 L34 82 L26 86 L32 96" strokeLinecap="round" />
    </svg>
  );
}

/** Ledakan konfeti kecil -- template ulang tahun. */
export function OrnamentConfettiBurst({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} fill="currentColor">
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i * 25.7 * Math.PI) / 180;
        const r = 30 + (i % 3) * 15;
        const x = 60 + Math.cos(angle) * r;
        const y = 60 + Math.sin(angle) * r;
        return i % 2 === 0 ? <circle key={i} cx={x} cy={y} r="3" /> : <rect key={i} x={x - 2.5} y={y - 2.5} width="5" height="5" transform={`rotate(${i * 15} ${x} ${y})`} />;
      })}
    </svg>
  );
}

/** Bintang kecil bersinar -- dipakai khitanan (islami) maupun ulang tahun (party). */
export function OrnamentStarSparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} fill="currentColor">
      <path d="M20 0 L23 17 L40 20 L23 23 L20 40 L17 23 L0 20 L17 17 Z" />
    </svg>
  );
}

/** Bulan sabit + bintang sederhana -- template khitanan islami. */
export function OrnamentCrescentStar({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="currentColor">
      <path d="M55 10 A38 38 0 1 0 55 90 A30 30 0 1 1 55 10 Z" />
      <path d="M78 20 L81 27 L88 28 L82 33 L84 40 L78 36 L72 40 L74 33 L68 28 L75 27 Z" />
    </svg>
  );
}

/** Topi wisuda sederhana -- template sekolah/wisuda. */
export function OrnamentGraduationCap({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 90" className={className} style={style} fill="currentColor">
      <path d="M60 10 L115 32 L60 54 L5 32 Z" />
      <path d="M30 40 V62 C30 72 90 72 90 62 V40" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M108 34 V58" stroke="currentColor" strokeWidth="3" />
      <circle cx="108" cy="62" r="4" />
    </svg>
  );
}

/** Karangan bunga laurel -- template sekolah/wisuda formal. */
export function OrnamentLaurelWreath({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 120" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M20 110 Q10 60 40 20" />
      <path d="M180 110 Q190 60 160 20" />
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={`l-${i}`} transform={`translate(${18 + i * 3.5}, ${100 - i * 14})`}>
          <ellipse rx="9" ry="4" transform={`rotate(${-40 + i * 6})`} fill="currentColor" stroke="none" opacity="0.8" />
        </g>
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={`r-${i}`} transform={`translate(${182 - i * 3.5}, ${100 - i * 14})`}>
          <ellipse rx="9" ry="4" transform={`rotate(${40 - i * 6})`} fill="currentColor" stroke="none" opacity="0.8" />
        </g>
      ))}
    </svg>
  );
}

/** Gulungan ijazah -- template sekolah/wisuda. */
export function OrnamentDiplomaScroll({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 140 60" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="20" y="10" width="100" height="40" rx="2" />
      <circle cx="20" cy="30" r="10" />
      <circle cx="120" cy="30" r="10" />
      <path d="M40 22 H100 M40 30 H100 M40 38 H80" opacity="0.6" />
    </svg>
  );
}

/** Garis grid minimal -- template corporate. */
export function OrnamentGridLines({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="0.6">
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`h-${i}`} x1="0" y1={i * 50} x2="200" y2={i * 50} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="200" />
      ))}
    </svg>
  );
}

/** Siluet mimbar/panggung podium -- template keagamaan (tabligh akbar). */
export function OrnamentMinbar({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 140" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M20 140 V70 L60 20 L100 70 V140" />
      <path d="M40 140 V90 H80 V140" />
      <circle cx="60" cy="34" r="5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Sorot lampu bioskop berbentuk kerucut -- Vintage Cinema. */
export function OrnamentSpotlightCone({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} fill="none">
      <path d="M100 0 L20 200 H180 Z" fill="url(#spotlightGrad)" />
      <defs>
        <linearGradient id="spotlightGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
