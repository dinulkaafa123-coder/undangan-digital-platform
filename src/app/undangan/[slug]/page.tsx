import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTemplateComponent } from "@/components/templates/registry";
import { getTemplateBySlug, getTemplateEventType, templates } from "@/data/templates";
import { getDemoEventData, getDemoEventTitle } from "@/data/demo-events";
import { getInvitationBySlug, incrementInvitationViews } from "@/lib/invitations";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { EventData } from "@/types/event";

export function generateStaticParams() {
  // Hanya slug template demo yang di-pre-render statis -- slug undangan
  // publik (mis. "arka-alya") dibuat oleh user secara dinamis lewat
  // "Aktifkan Undangan" dan otomatis di-render on-demand oleh Next.js
  // karena tidak diset `dynamicParams = false`.
  return templates.map((t) => ({ slug: t.slug }));
}

/**
 * Coba ambil undangan PUBLIK (hasil "Aktifkan Undangan", tersimpan di
 * Supabase) lebih dulu -- baru fallback ke data demo template kalau tidak
 * ketemu. Urutan ini aman karena slug undangan publik dibuat dari nama
 * acara (lihat `suggestSlugBase`), jadi praktis tidak akan bentrok dengan
 * slug template seperti "royal-gold". Kalau Supabase belum dikonfigurasi
 * atau sedang error, diam-diam lanjut ke fallback demo -- tidak boleh
 * mematahkan halaman demo yang sudah berjalan.
 */
async function resolveInvitation(slug: string): Promise<{ eventData: EventData; templateId: string; isPublished: boolean } | null> {
  if (isSupabaseConfigured()) {
    try {
      const record = await getInvitationBySlug(slug);
      if (record) {
        return { eventData: record.event_data, templateId: record.template_id, isPublished: true };
      }
    } catch {
      // DB tidak terjangkau / error -- lanjut ke fallback demo di bawah, jangan sampai memutus halaman.
    }
  }

  const template = getTemplateBySlug(slug);
  if (!template) return null;
  const eventData = getDemoEventData(getTemplateEventType(template));
  return { eventData, templateId: slug, isPublished: false };
}

export async function generateMetadata({ params }: PageProps<"/undangan/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveInvitation(slug);
  if (!resolved) return { title: "Undangan tidak ditemukan — Undangan.id" };
  const template = getTemplateBySlug(resolved.templateId);
  const title = getDemoEventTitle(resolved.eventData);
  return {
    title: template ? `${title} — Template ${template.name}` : title,
    description: resolved.isPublished ? `Undangan digital -- ${title}.` : `Contoh undangan digital menggunakan template ${template?.name ?? resolved.templateId}.`,
  };
}

export default async function InvitationPage({ params, searchParams }: PageProps<"/undangan/[slug]">) {
  const { slug } = await params;
  const search = await searchParams;

  const resolved = await resolveInvitation(slug);
  const TemplateComponent = resolved ? getTemplateComponent(resolved.templateId) : undefined;
  if (!resolved || !TemplateComponent) notFound();

  if (resolved.isPublished) {
    // Analytics ringan, tidak boleh menunda/menggagalkan render undangan.
    void incrementInvitationViews(slug);
  }

  const toParam = Array.isArray(search.to) ? search.to[0] : search.to;
  const guestName = toParam?.trim() || "Tamu Undangan";

  // TemplateComponent berasal dari registry module-level yang stabil
  // (lihat `registry.tsx`), bukan komponen baru yang didefinisikan saat render.
  // eslint-disable-next-line react-hooks/static-components
  return <TemplateComponent data={resolved.eventData} templateSlug={resolved.templateId} guestName={guestName} />;
}
