"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { EventType } from "@/types/event";

const CHOICES: Array<{ type: EventType; emoji: string; label: string }> = [
  { type: "wedding", emoji: "💍", label: "Pernikahan" },
  { type: "khitanan", emoji: "👶", label: "Khitanan" },
  { type: "birthday", emoji: "🎂", label: "Ulang Tahun" },
  { type: "school", emoji: "🎓", label: "Sekolah / Wisuda" },
  { type: "corporate", emoji: "🏢", label: "Corporate / Kantor" },
  { type: "religious", emoji: "🕌", label: "Keagamaan" },
  { type: "gathering", emoji: "👨‍👩‍👧", label: "Gathering" },
  { type: "other", emoji: "🎉", label: "Lainnya" },
];

export function EventTypeSelector({ onSelect }: { onSelect: (type: EventType) => void }) {
  const router = useRouter();
  const [editSlug, setEditSlug] = useState("");

  function handleEditSubmit(e: FormEvent) {
    e.preventDefault();
    const slug = editSlug.trim();
    if (!slug) return;
    router.push(`/buat?edit=${encodeURIComponent(slug)}`);
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
        Langkah 1
      </span>
      <h1 className="mx-auto mt-6 max-w-lg text-3xl font-bold text-black sm:text-4xl">Acara apa yang ingin kamu buat?</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-black/60">Pilih jenis acara, form dan preview akan menyesuaikan otomatis.</p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {CHOICES.map((choice) => (
          <button
            key={choice.type}
            type="button"
            onClick={() => onSelect(choice.type)}
            className="flex flex-col items-center gap-2 rounded-2xl border border-black/10 p-6 text-center transition-colors hover:border-black/40 hover:bg-black/[0.02]"
          >
            <span className="text-3xl">{choice.emoji}</span>
            <span className="text-sm font-semibold text-black">{choice.label}</span>
          </button>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-sm border-t border-black/10 pt-6">
        <p className="text-xs text-black/50">Sudah punya undangan yang aktif dan ingin mengedit datanya?</p>
        <form onSubmit={handleEditSubmit} className="mt-3 flex gap-2">
          <input
            value={editSlug}
            onChange={(e) => setEditSlug(e.target.value)}
            placeholder="mis. arka-alya"
            className="flex-1 rounded-full border border-black/15 px-4 py-2 text-sm outline-none focus:border-black/40"
          />
          <button type="submit" className="shrink-0 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-black/80">
            Edit
          </button>
        </form>
      </div>
    </section>
  );
}
