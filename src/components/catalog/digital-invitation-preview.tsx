import type { PreviewConfig } from "@/data/template-previews";
import {
  OrnamentSwirlDivider,
  OrnamentCrest,
  OrnamentLittleCrown,
  OrnamentBatikBorder,
  OrnamentGapura,
  OrnamentSongketDiamond,
  OrnamentRumahGadang,
  OrnamentLaurelWreath,
  OrnamentGraduationCap,
  OrnamentDiamondFacet,
  OrnamentDecoSunburst,
  OrnamentSpotlightCone,
  OrnamentGridLines,
  OrnamentGardenBloom,
  OrnamentForestLayer,
  OrnamentSakuraBranch,
  OrnamentIslamicArch,
  OrnamentKeyholeArch,
  OrnamentCrescentStar,
  OrnamentLantern,
  OrnamentMinbar,
  OrnamentMoonGlow,
  OrnamentConstellationLines,
  OrnamentTwig,
  OrnamentGlassPetal,
  OrnamentCurtainSwag,
  OrnamentArtDecoLines,
  OrnamentWaveCrest,
  OrnamentPearlDrop,
  OrnamentCandiBentar,
  OrnamentCathedralArch,
  OrnamentRosetteWindow,
  OrnamentBalloon,
  OrnamentConfettiBurst,
} from "@/components/decorative/ornaments";

/** Partikel dekoratif ringan (CSS only) untuk preview -- dimatikan otomatis lewat prefers-reduced-motion (lihat globals.css). */
function PreviewParticles({ kind, color }: { kind: PreviewConfig["particles"]; color: string }) {
  if (kind === "none") return null;
  const count = 7;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = `${Math.abs(Math.sin(i * 12.9898) * 100) % 100}%`;
        const top = `${Math.abs(Math.sin(i * 78.233) * 100) % 100}%`;
        const delay = `${(i % 5) * 0.6}s`;
        if (kind === "confetti") {
          return <span key={i} className="absolute h-1.5 w-1.5 animate-twinkle rounded-[1px]" style={{ left, top, background: i % 2 ? "#ffe14d" : color, animationDelay: delay }} />;
        }
        if (kind === "petals") {
          return <span key={i} className="absolute h-1.5 w-1 animate-twinkle rounded-full" style={{ left, top, background: color, animationDelay: delay }} />;
        }
        return <span key={i} className="absolute h-1 w-1 animate-twinkle rounded-full" style={{ left, top, background: color, animationDelay: delay }} />;
      })}
    </div>
  );
}

/**
 * Merender MINIATUR cover setiap template memakai token desain (warna,
 * font, komponen ornamen SVG) yang sama dengan renderer aslinya --
 * lihat catatan arsitektur di `src/data/template-previews.ts`.
 */
export function DigitalInvitationPreview({ config }: { config: PreviewConfig }) {
  const { layout, ornament, bg, accent, text, subtext, displayFont, bodyFont, eyebrow, title, subtitle, date, photoUrl, particles } = config;

  const base = (
    <div style={{ background: bg, color: text, fontFamily: bodyFont }} className="relative flex h-full w-full flex-col overflow-hidden">
      <PreviewParticles kind={particles} color={accent} />
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-6 text-center">
        {renderLayout()}
      </div>
    </div>
  );

  function EyebrowTitleDate({ titleClass = "text-lg" }: { titleClass?: string }) {
    return (
      <>
        <p className="text-[8px] font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>
          {eyebrow}
        </p>
        <h1 style={{ fontFamily: displayFont, color: text }} className={`mt-1.5 leading-tight ${titleClass}`}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 max-w-[85%] text-[8px] leading-snug" style={{ color: subtext }}>
            {subtitle}
          </p>
        )}
        <div className="my-2 h-px w-10" style={{ background: accent }} />
        <p className="text-[8px] font-medium tracking-[0.2em]" style={{ color: subtext }}>
          {date}
        </p>
      </>
    );
  }

  function renderLayout() {
    switch (layout) {
      case "frame-royal": {
        const OrnamentCmp = ornament === "little-crown" ? OrnamentLittleCrown : OrnamentCrest;
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-center border-[3px] border-double p-3" style={{ borderColor: accent }}>
            <OrnamentCmp className="h-8 w-8" style={{ color: accent }} />
            <div className="mt-2 h-16 w-16 overflow-hidden rounded-full border-2" style={{ borderColor: accent }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="mt-2">
              <EyebrowTitleDate titleClass="text-lg" />
            </div>
          </div>
        );
      }

      case "frame-heritage": {
        const BorderOrn = ornament === "songket-rumah" ? OrnamentSongketDiamond : OrnamentBatikBorder;
        const CenterOrn = ornament === "songket-rumah" ? OrnamentRumahGadang : OrnamentGapura;
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-center border-2 p-3" style={{ borderColor: accent }}>
            <BorderOrn className="absolute inset-x-2 top-2 h-2.5" style={{ color: accent }} />
            <CenterOrn className="h-10 w-10 opacity-70" style={{ color: accent }} />
            <div className="mt-2 h-16 w-14 overflow-hidden border-2" style={{ borderColor: accent }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="mt-2">
              <EyebrowTitleDate />
            </div>
            <BorderOrn className="absolute inset-x-2 bottom-2 h-2.5 rotate-180" style={{ color: accent }} />
          </div>
        );
      }

      case "frame-academic":
        return (
          <div className="flex h-full w-full flex-col items-center justify-center p-4">
            <div className="relative">
              <OrnamentLaurelWreath className="h-10 w-24" style={{ color: accent }} />
              <OrnamentGraduationCap className="absolute left-1/2 top-1/2 h-4 w-6 -translate-x-1/2 -translate-y-1/2" style={{ color: accent }} />
            </div>
            <div className="mt-3">
              <EyebrowTitleDate titleClass="text-base" />
            </div>
          </div>
        );

      case "editorial-fullbleed":
        return (
          <div className="relative flex h-full w-full flex-col">
            <div className="relative h-[55%] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg}, transparent)` }} />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center px-3 pb-4 text-center">
              <EyebrowTitleDate titleClass="text-base" />
            </div>
          </div>
        );

      case "cinematic-dark": {
        const OrnCmp =
          ornament === "deco-sunburst" ? OrnamentDecoSunburst : ornament === "spotlight" ? OrnamentSpotlightCone : ornament === "grid" ? OrnamentGridLines : ornament === "art-deco-lines" ? OrnamentArtDecoLines : OrnamentDiamondFacet;
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
            <OrnCmp className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-15" style={{ color: accent }} />
            <div className="relative z-10 h-24 w-20 overflow-hidden rounded-sm opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="" className="h-full w-full object-cover grayscale" />
            </div>
            <div className="relative z-10 mt-3">
              <EyebrowTitleDate titleClass="text-lg" />
            </div>
          </div>
        );
      }

      case "botanical-garden": {
        const OrnCmp = ornament === "forest-layer" ? OrnamentForestLayer : ornament === "sakura-branch" ? OrnamentSakuraBranch : OrnamentGardenBloom;
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-center px-3">
            <OrnCmp className="absolute -left-3 -top-3 h-14 w-14 opacity-60" style={{ color: accent }} />
            <OrnCmp className="absolute -bottom-3 -right-3 h-14 w-14 rotate-180 opacity-40" style={{ color: accent }} />
            <div className="relative h-16 w-16 overflow-hidden border-4 border-white shadow-md" style={{ borderRadius: "45% 55% 60% 40% / 55% 45% 55% 45%" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="relative mt-2">
              <EyebrowTitleDate />
            </div>
          </div>
        );
      }

      case "islamic-arch": {
        const ArchOrn = ornament === "keyhole-arch" ? OrnamentKeyholeArch : OrnamentIslamicArch;
        return (
          <div className="flex h-full w-full flex-col items-center justify-center p-3">
            {(ornament === "crescent-lantern") && (
              <div className="mb-1 flex items-center gap-1">
                <OrnamentCrescentStar className="h-4 w-4" style={{ color: accent }} />
                <OrnamentLantern className="h-6 w-4" style={{ color: accent }} />
              </div>
            )}
            {ornament === "minbar" && <OrnamentMinbar className="mb-1 h-8 w-7" style={{ color: accent }} />}
            <div className="relative h-20 w-16">
              <ArchOrn className="absolute inset-0 h-full w-full" style={{ color: accent }} />
              <div className="absolute inset-[3px] top-[3px] overflow-hidden rounded-t-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoUrl} alt="" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="mt-2">
              <EyebrowTitleDate titleClass="text-sm" />
            </div>
          </div>
        );
      }

      case "night-sky": {
        const OrnCmp = ornament === "constellation" ? OrnamentConstellationLines : OrnamentMoonGlow;
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <OrnCmp className="absolute -right-4 -top-4 h-16 w-16 opacity-70" style={{ color: accent }} />
            <div className="h-16 w-16 overflow-hidden rounded-full border" style={{ borderColor: accent, boxShadow: `0 0 20px -2px ${accent}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="mt-2">
              <EyebrowTitleDate />
            </div>
          </div>
        );
      }

      case "paper-rustic":
        return (
          <div className="flex h-full w-full flex-col items-center justify-center p-4">
            <div className="-rotate-3 border-4 border-white bg-white p-1.5 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="" className="h-16 w-20 object-cover" />
            </div>
            <OrnamentTwig className="mt-2 h-4 w-16" style={{ color: accent }} />
            <div className="mt-1">
              <EyebrowTitleDate />
            </div>
          </div>
        );

      case "glass-crystal":
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-center p-4">
            {ornament === "glass-petal" ? (
              <OrnamentGlassPetal className="absolute -right-2 top-2 h-16 w-10 opacity-40" style={{ color: accent }} />
            ) : (
              <OrnamentDiamondFacet className="absolute -left-2 top-1 h-14 w-9 opacity-40" style={{ color: accent }} />
            )}
            <div className="h-16 w-16 overflow-hidden rounded-full border border-white/70 bg-white/30 p-1 backdrop-blur-sm">
              <div className="h-full w-full overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoUrl} alt="" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="mt-2">
              <EyebrowTitleDate />
            </div>
          </div>
        );

      case "luxury-ballroom":
        return (
          <div className="flex h-full w-full flex-col items-center p-3 pt-4">
            {ornament === "curtain" ? (
              <OrnamentCurtainSwag className="h-4 w-[85%]" style={{ color: accent }} />
            ) : (
              <OrnamentArtDecoLines className="h-3 w-[70%]" style={{ color: accent }} />
            )}
            <div className="mt-3 h-16 w-16 overflow-hidden rounded-full border-2" style={{ borderColor: accent }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="mt-2 flex flex-1 flex-col items-center justify-center">
              <EyebrowTitleDate titleClass="text-base" />
            </div>
          </div>
        );

      case "ocean-destination":
        return (
          <div className="flex h-full w-full flex-col items-center justify-center p-3">
            <div className="h-16 w-20 overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="" className="h-full w-full object-cover" />
            </div>
            {ornament === "candi-bentar" ? (
              <OrnamentCandiBentar className="mt-2 h-6 w-8" style={{ color: accent }} />
            ) : (
              <div className="mt-2 flex items-center gap-1">
                <OrnamentWaveCrest className="h-3 w-10" style={{ color: accent }} />
                <OrnamentPearlDrop className="h-4 w-3" style={{ color: accent }} />
              </div>
            )}
            <div className="mt-1">
              <EyebrowTitleDate />
            </div>
          </div>
        );

      case "cathedral-rose":
        return (
          <div className="flex h-full w-full flex-col items-center justify-center p-3">
            <OrnamentRosetteWindow className="h-8 w-8 opacity-70" style={{ color: accent }} />
            <div className="relative mt-1 h-20 w-16">
              <OrnamentCathedralArch className="absolute inset-0 h-full w-full" style={{ color: accent }} />
              <div className="absolute inset-[3px] top-[3px] overflow-hidden rounded-t-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoUrl} alt="" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="mt-2">
              <EyebrowTitleDate titleClass="text-sm" />
            </div>
          </div>
        );

      case "storybook-clouds":
        return (
          <div className="flex h-full w-full flex-col items-center justify-center p-4">
            <div className="h-16 w-16 overflow-hidden border-4 border-white bg-white shadow-md" style={{ borderRadius: "45% 55% 60% 40% / 60% 50% 50% 40%" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="mt-2">
              <EyebrowTitleDate />
            </div>
          </div>
        );

      case "playful-party": {
        const OrnCmp = ornament === "confetti" ? OrnamentConfettiBurst : OrnamentBalloon;
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-center p-3">
            <OrnCmp className="absolute -left-2 -top-2 h-12 w-12 opacity-70" style={{ color: accent }} />
            <OrnCmp className="absolute -right-2 -top-2 h-12 w-12 rotate-12 opacity-50" style={{ color: accent }} />
            <div className="relative -rotate-2 border-4 border-black bg-white p-1 shadow-[3px_3px_0_#000]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="" className="h-16 w-16 object-cover" />
            </div>
            <div className="relative mt-2">
              <EyebrowTitleDate titleClass="text-lg font-black" />
            </div>
          </div>
        );
      }

      default:
        return <EyebrowTitleDate />;
    }
  }

  return base;
}

export type PreviewScene = "cover" | "couple" | "gallery" | "closing";

/**
 * Versi ringkas untuk halaman detail template: menyusun 4 "adegan" preview
 * (Cover, Couple/Event, Gallery, RSVP/Closing) memakai token desain (warna,
 * font, ornamen) yang SAMA dengan `DigitalInvitationPreview` di atas --
 * bukan renderer terpisah, supaya calon pembeli tidak merasa tertipu saat
 * membandingkan dengan halaman demo penuh.
 */
export function InvitationPreviewScene({ config, scene }: { config: PreviewConfig; scene: PreviewScene }) {
  const { bg, accent, text, subtext, displayFont, bodyFont, title, subtitle, photoUrl } = config;

  if (scene === "cover") return <DigitalInvitationPreview config={config} />;

  if (scene === "couple") {
    return (
      <div style={{ background: bg, color: text, fontFamily: bodyFont }} className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-[8px] uppercase tracking-[0.3em]" style={{ color: accent }}>
          Kedua Mempelai / Acara
        </p>
        <h2 style={{ fontFamily: displayFont }} className="text-base leading-snug">
          {title}
        </h2>
        <OrnamentSwirlDivider className="h-3 w-16" style={{ color: accent }} />
        <p className="max-w-[80%] text-[8px] leading-relaxed" style={{ color: subtext }}>
          {subtitle ?? "Dengan penuh syukur, kami mengundang Anda untuk turut hadir dan memberikan doa restu."}
        </p>
      </div>
    );
  }

  if (scene === "gallery") {
    return (
      <div style={{ background: bg }} className="grid h-full w-full grid-cols-2 gap-0.5 p-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoUrl} alt="" className="h-full w-full object-cover" style={{ filter: i % 2 ? "grayscale(15%)" : undefined }} />
            <div className="absolute inset-0" style={{ background: `${accent}22` }} />
          </div>
        ))}
      </div>
    );
  }

  // closing
  return (
    <div style={{ background: bg, color: text, fontFamily: bodyFont }} className="flex h-full w-full flex-col items-center justify-center gap-3 px-5 text-center">
      <OrnamentSwirlDivider className="h-3 w-16" style={{ color: accent }} />
      <p className="text-[9px] leading-relaxed" style={{ color: subtext }}>
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
      </p>
      <button
        type="button"
        className="pointer-events-none rounded-full px-4 py-1.5 text-[8px] font-semibold uppercase tracking-wide"
        style={{ background: accent, color: bg }}
      >
        Konfirmasi Kehadiran
      </button>
    </div>
  );
}
