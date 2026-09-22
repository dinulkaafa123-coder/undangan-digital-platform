"use client";

import { useMemo, useState } from "react";
import type { TemplateCategory, TemplateMeta, CategoryMeta } from "@/data/templates";
import { getTemplateEventType } from "@/data/templates";
import type { EventType } from "@/types/event";
import { eventTypes } from "@/types/event";
import { TemplateCard } from "./template-card";
import { cn } from "@/lib/utils";

interface CatalogViewProps {
  templates: TemplateMeta[];
  categories: CategoryMeta[];
  initialEventType?: EventType | "all";
  initialCategory?: TemplateCategory | "all";
}

export function CatalogView({ templates, categories, initialEventType = "all", initialCategory = "all" }: CatalogViewProps) {
  const [activeEventType, setActiveEventType] = useState<EventType | "all">(initialEventType);
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | "all">(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchEventType = activeEventType === "all" || getTemplateEventType(t) === activeEventType;
      // "3D" bukan kategori utama satu template pun -- ini badge lintas kategori,
      // jadi filternya mengecek flag `isThreeD`, bukan `t.category`.
      const matchCategory =
        activeCategory === "all" ? true : activeCategory === "3d" ? t.isThreeD : t.category === activeCategory || t.tags.includes(activeCategory);
      const matchQuery = t.name.toLowerCase().includes(query.toLowerCase()) || t.tagline.toLowerCase().includes(query.toLowerCase());
      return matchEventType && matchCategory && matchQuery;
    });
  }, [templates, activeEventType, activeCategory, query]);

  return (
    <div>
      {/* Filter utama: jenis acara -- Event Invitation Platform, bukan cuma wedding */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveEventType("all")}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
            activeEventType === "all" ? "border-black bg-black text-white" : "border-black/15 text-black/70 hover:border-black/40"
          )}
        >
          Semua Acara
        </button>
        {eventTypes.map((et) => (
          <button
            key={et.id}
            onClick={() => setActiveEventType(et.id)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              activeEventType === et.id ? "border-black bg-black text-white" : "border-black/15 text-black/70 hover:border-black/40"
            )}
          >
            {et.emoji} {et.label}
          </button>
        ))}
      </div>

      {/* Filter sekunder: gaya desain, hanya berlaku dalam jenis acara yang dipilih */}
      <div className="mt-4 flex flex-col gap-4 border-t border-black/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              activeCategory === "all" ? "border-black/70 bg-black/5 text-black" : "border-black/10 text-black/50 hover:border-black/30"
            )}
          >
            Semua Gaya
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeCategory === cat.id ? "border-black/70 bg-black/5 text-black" : "border-black/10 text-black/50 hover:border-black/30"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari template..."
          className="w-full rounded-md border border-black/15 px-4 py-2 text-sm outline-none focus:border-black/40 sm:w-56"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-black/50">
          {activeEventType !== "all" && (activeEventType === "school" || activeEventType === "corporate" || activeEventType === "other")
            ? "Template untuk kategori ini sedang kami siapkan -- segera hadir!"
            : "Tidak ada template yang cocok. Coba kategori atau kata kunci lain."}
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}
