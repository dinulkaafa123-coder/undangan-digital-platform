"use client";

import type { EventType } from "@/types/event";
import { getTemplatesByEventType } from "@/data/templates";
import { getTemplatePreview } from "@/data/template-previews";
import { DigitalInvitationPreview } from "@/components/catalog/digital-invitation-preview";
import { cn } from "@/lib/utils";

/**
 * Strip pemilihan template di dalam editor -- pindah template TIDAK
 * pernah mengubah `eventData`, hanya `templateId`, jadi data yang sudah
 * diisi tidak pernah hilang saat berganti template (lihat `builder-app.tsx`).
 * Preview mini di sini memakai `DigitalInvitationPreview` yang sama
 * dengan katalog (ringan, tanpa mount renderer penuh) -- katalog itu
 * sendiri sama sekali tidak diubah oleh fitur ini.
 */
export function TemplateSwitcher({ eventType, currentSlug, onSelect }: { eventType: EventType; currentSlug: string; onSelect: (slug: string) => void }) {
  const options = getTemplatesByEventType(eventType);
  if (options.length <= 1) return null;

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {options.map((t) => {
        const preview = getTemplatePreview(t.slug);
        const active = t.slug === currentSlug;
        return (
          <button
            key={t.slug}
            type="button"
            onClick={() => onSelect(t.slug)}
            className={cn(
              "flex w-[72px] shrink-0 flex-col items-center gap-1.5 rounded-lg border-2 p-1 transition-colors",
              active ? "border-black" : "border-transparent hover:border-black/20"
            )}
          >
            <div className="aspect-[9/16] w-full overflow-hidden rounded-md" style={{ background: preview.bg }}>
              <DigitalInvitationPreview config={preview} />
            </div>
            <span className="line-clamp-1 text-center text-[10px] font-medium text-black/70">{t.name}</span>
          </button>
        );
      })}
    </div>
  );
}
