import Link from "next/link";
import type { TemplateMeta } from "@/data/templates";
import { getTemplateEventType } from "@/data/templates";
import { getEventTypeMeta } from "@/types/event";
import { getTemplatePreview } from "@/data/template-previews";
import { PhoneFrame } from "@/components/catalog/phone-frame";
import { DigitalInvitationPreview } from "@/components/catalog/digital-invitation-preview";
import { formatRupiah, cn } from "@/lib/utils";

const BADGE_STYLES: Record<string, string> = {
  new: "bg-sky-500 text-white",
  "best-seller": "bg-rose-500 text-white",
  exclusive: "bg-violet-600 text-white",
};

const BADGE_LABELS: Record<string, string> = {
  new: "New",
  "best-seller": "Best Seller",
  exclusive: "Exclusive",
};

export function TemplateCard({ template }: { template: TemplateMeta }) {
  const eventTypeMeta = getEventTypeMeta(getTemplateEventType(template));
  const preview = getTemplatePreview(template.slug);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/templates/${template.slug}`}
        className="relative block w-full overflow-hidden py-5"
        style={{ background: `linear-gradient(160deg, ${preview.bg} 0%, ${preview.panelBg ?? preview.bg} 100%)` }}
      >
        <PhoneFrame className="w-[62%]">
          <DigitalInvitationPreview config={preview} />
        </PhoneFrame>

        {/* Hover overlay: "LIHAT DEMO" */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
          <span className="translate-y-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Lihat Demo
          </span>
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-black/70 shadow-sm">
          {eventTypeMeta.emoji} {eventTypeMeta.label}
        </span>
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          {template.badge && (
            <span className={cn("rounded-full px-3 py-1 text-[11px] font-semibold shadow-sm", BADGE_STYLES[template.badge])}>
              {BADGE_LABELS[template.badge]}
            </span>
          )}
          {template.isPremium ? (
            <span className="rounded-full bg-amber-400 px-3 py-1 text-[11px] font-semibold text-black shadow-sm">
              {template.isThreeD ? "Premium 3D" : "Premium"}
            </span>
          ) : (
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">Gratis</span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/templates/${template.slug}`}>
          <h3 className="text-base font-semibold text-black/90">{template.name}</h3>
        </Link>
        <p className="mt-0.5 text-[11px] uppercase tracking-wide text-black/40">{template.category}</p>
        <p className="mt-1 text-sm text-black/60">{template.tagline}</p>
        <p className="mt-2 text-sm font-medium text-black/80">{formatRupiah(template.price)}</p>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/undangan/${template.slug}`}
            className="flex-1 rounded-md border border-black/15 px-3 py-2 text-center text-sm font-medium text-black/80 transition-colors hover:border-black/40"
          >
            Lihat Demo
          </Link>
          <Link
            href={`/buat?type=${eventTypeMeta.id}&template=${template.slug}`}
            className="flex-1 rounded-md bg-black px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-black/80"
          >
            Gunakan
          </Link>
        </div>
      </div>
    </div>
  );
}
