import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { BuilderApp } from "@/components/builder/builder-app";
import type { EventType } from "@/types/event";

export const metadata: Metadata = {
  title: "Buat Undangan — Undangan.id",
  description: "Isi data acaramu dan lihat undangan digitalmu langsung jadi, lengkap dengan preview live di layar smartphone.",
};

const VALID_TYPES = new Set(["wedding", "khitanan", "birthday", "school", "graduation", "corporate", "religious", "gathering", "other"]);

export default async function BuatUndanganPage({ searchParams }: PageProps<"/buat">) {
  const search = await searchParams;
  const rawType = Array.isArray(search.type) ? search.type[0] : search.type;
  const initialEventType: EventType | undefined = rawType && VALID_TYPES.has(rawType) ? (rawType as EventType) : undefined;

  const templateParam = Array.isArray(search.template) ? search.template[0] : search.template;
  const editParam = Array.isArray(search.edit) ? search.edit[0] : search.edit;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <BuilderApp initialTemplateSlug={templateParam} initialEventType={initialEventType} initialEditSlug={editParam} />
      </main>
      <SiteFooter />
    </>
  );
}
