import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CatalogView } from "@/components/catalog/catalog-view";
import { templates, categories, type TemplateCategory } from "@/data/templates";
import { eventTypes, type EventType } from "@/types/event";

export const metadata: Metadata = {
  title: "Katalog Template Undangan Digital — Undangan.id",
  description:
    "Jelajahi template undangan digital untuk pernikahan, khitanan, ulang tahun, dan berbagai acara lainnya -- lengkap dengan preview, kategori, dan badge premium/3D.",
};

const validCategories = new Set(categories.map((c) => c.id));
const validEventTypes = new Set(eventTypes.map((e) => e.id));

export default async function TemplatesPage({ searchParams }: PageProps<"/templates">) {
  const params = await searchParams;

  const rawCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const initialCategory: TemplateCategory | "all" =
    rawCategory && validCategories.has(rawCategory as TemplateCategory) ? (rawCategory as TemplateCategory) : "all";

  const rawType = Array.isArray(params.type) ? params.type[0] : params.type;
  const initialEventType: EventType | "all" = rawType && validEventTypes.has(rawType as EventType) ? (rawType as EventType) : "all";

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-14 pb-6 text-center">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">Temukan Desain Undanganmu</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-black/60">
            Untuk pernikahan, khitanan, ulang tahun, wisuda, corporate, keagamaan, dan berbagai acara
            lainnya. Pilih jenis acara, jelajahi gaya desainnya, lihat demo interaktifnya, lalu gunakan.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <CatalogView templates={templates} categories={categories} initialEventType={initialEventType} initialCategory={initialCategory} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
