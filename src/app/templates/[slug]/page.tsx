import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { TemplateCard } from "@/components/catalog/template-card";
import { PhoneFrame } from "@/components/catalog/phone-frame";
import { DigitalInvitationPreview, InvitationPreviewScene, type PreviewScene } from "@/components/catalog/digital-invitation-preview";
import { templates, getTemplateBySlug, getTemplateEventType, categories } from "@/data/templates";
import { getTemplatePreview } from "@/data/template-previews";
import { getEventTypeMeta, type EventType } from "@/types/event";
import { formatRupiah, cn } from "@/lib/utils";

const PREVIEW_SCENES: { scene: PreviewScene; label: string }[] = [
  { scene: "cover", label: "Cover" },
  { scene: "couple", label: "Couple / Event" },
  { scene: "gallery", label: "Gallery" },
  { scene: "closing", label: "RSVP / Closing" },
];

const CUSTOMIZABLE_FIELDS: Record<EventType, string[]> = {
  wedding: [
    "Nama & foto mempelai pria dan wanita",
    "Nama kedua orang tua",
    "Tanggal, waktu, dan lokasi akad & resepsi",
    "Alamat & tautan Google Maps",
    "Galeri foto",
    "Cerita cinta (love story)",
    "Musik latar",
    "Nomor rekening (amplop digital)",
    "RSVP & ucapan tamu",
  ],
  khitanan: [
    "Nama & foto anak yang dikhitan",
    "Nama kedua orang tua / keluarga",
    "Tanggal, waktu, dan lokasi acara",
    "Alamat & tautan Google Maps",
    "Galeri foto",
    "Musik latar",
    "Nomor rekening (amplop digital)",
    "RSVP & ucapan tamu",
  ],
  birthday: [
    "Nama & foto yang berulang tahun",
    "Usia yang dirayakan",
    "Tanggal, waktu, dan lokasi acara",
    "Alamat & tautan Google Maps",
    "Galeri foto",
    "Musik latar",
    "Nomor rekening (kado digital)",
    "RSVP & ucapan tamu",
  ],
  school: ["Nama sekolah/kampus", "Judul acara", "Tanggal, waktu, dan lokasi", "Susunan acara", "Galeri foto", "RSVP"],
  graduation: ["Nama sekolah/kampus", "Angkatan", "Judul acara", "Tanggal, waktu, dan lokasi", "Susunan acara", "RSVP"],
  corporate: ["Nama perusahaan", "Judul acara", "Pembicara", "Tanggal, waktu, dan lokasi", "Susunan acara", "Kontak pendaftaran"],
  religious: ["Judul acara", "Penceramah/pembicara", "Tanggal, waktu, dan lokasi", "Susunan acara", "Galeri foto", "RSVP"],
  gathering: ["Judul acara", "Tanggal, waktu, dan lokasi", "Deskripsi acara", "Galeri foto", "RSVP"],
  other: ["Judul acara", "Tanggal, waktu, dan lokasi", "Deskripsi acara", "Galeri foto", "RSVP"],
};

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/templates/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return { title: "Template tidak ditemukan — Undangan.id" };
  return {
    title: `${template.name} — Template Undangan ${template.category} | Undangan.id`,
    description: template.description,
  };
}

export default async function TemplateDetailPage({ params }: PageProps<"/templates/[slug]">) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) notFound();

  const eventType = getTemplateEventType(template);
  const eventTypeMeta = getEventTypeMeta(eventType);
  const categoryMeta = categories.find((c) => c.id === template.category);
  // "Template serupa" harus tetap dalam jenis acara yang sama -- jangan
  // menyarankan template wedding di halaman template khitanan, dst.
  const related = templates
    .filter((t) => getTemplateEventType(t) === eventType && t.category === template.category && t.slug !== template.slug)
    .slice(0, 4);

  const preview = getTemplatePreview(template.slug);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-10">
          <nav className="text-xs text-black/50">
            <Link href="/templates" className="hover:text-black">
              Katalog Template
            </Link>{" "}
            / <Link href={`/templates?type=${eventType}`} className="hover:text-black">{eventTypeMeta.label}</Link> /{" "}
            <span className="text-black/70">{template.name}</span>
          </nav>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div
              className="group flex items-center justify-center overflow-hidden rounded-2xl border border-black/10 py-10"
              style={{ background: `linear-gradient(160deg, ${preview.bg} 0%, ${preview.panelBg ?? preview.bg} 100%)` }}
            >
              <PhoneFrame className="w-[70%] max-w-[280px]">
                <DigitalInvitationPreview config={preview} />
              </PhoneFrame>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/70">
                  {eventTypeMeta.emoji} {eventTypeMeta.label}
                </span>
                <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium capitalize text-black/70">
                  {categoryMeta?.label ?? template.category}
                </span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    template.isFourD ? "bg-fuchsia-500 text-white" : "bg-amber-400 text-black"
                  )}
                >
                  {template.isFourD ? "Premium 4D" : template.isThreeD ? "Premium 3D" : "Premium"}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold text-black">{template.name}</h1>
              <p className="mt-2 text-base text-black/60">{template.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-black/70">{template.description}</p>

              <div className="mt-4 flex items-center gap-2">
                {template.colors.map((color) => (
                  <span key={color} className="h-6 w-6 rounded-full border border-black/10" style={{ backgroundColor: color }} />
                ))}
              </div>

              <p className="mt-6 text-2xl font-bold text-black">{formatRupiah(template.price)}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/undangan/${template.slug}`}
                  className="flex-1 rounded-full border border-black/20 px-6 py-3 text-center text-sm font-semibold text-black transition-colors hover:border-black/50"
                >
                  Lihat Demo
                </Link>
                <Link
                  href={`/buat?type=${eventType}&template=${template.slug}`}
                  className="flex-1 rounded-full bg-black px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-black/80"
                >
                  Gunakan
                </Link>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-black/50">Bisa disesuaikan</h2>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {CUSTOMIZABLE_FIELDS[eventType].map((field) => (
                    <li key={field} className="flex items-start gap-2 text-sm text-black/70">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      {field}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-xl font-bold text-black">Preview Undangan</h2>
          <p className="mt-1 text-sm text-black/60">
            Empat cuplikan tampilan {template.name} -- dari cover sampai konfirmasi kehadiran.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {PREVIEW_SCENES.map(({ scene, label }) => (
              <div key={scene} className="flex flex-col items-center gap-3">
                <div
                  className="group flex w-full items-center justify-center overflow-hidden rounded-xl border border-black/10 py-6"
                  style={{ background: `linear-gradient(160deg, ${preview.bg} 0%, ${preview.panelBg ?? preview.bg} 100%)` }}
                >
                  <PhoneFrame className="w-[60%]">
                    <InvitationPreviewScene config={preview} scene={scene} />
                  </PhoneFrame>
                </div>
                <p className="text-xs font-medium uppercase tracking-wide text-black/50">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 py-14">
            <h2 className="text-xl font-bold text-black">Template Serupa</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
