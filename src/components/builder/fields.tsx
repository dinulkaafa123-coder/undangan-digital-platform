"use client";

import { useEffect, useRef, useState, type ChangeEvent, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import type { GalleryPhoto } from "@/types/invitation";
import { uploadImage } from "@/lib/image-utils";
import { makeId, cn } from "@/lib/utils";

/** Kartu section form -- satu per bagian (Mempelai Pria, Akad, Galeri, dst). */
export function FormSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-black/80">{title}</h3>
      {description && <p className="mt-1 text-xs text-black/50">{description}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function FieldRow({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-black/70">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 text-[11px] text-black/40">{hint}</p>}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none transition-colors focus:border-black/40";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputClass, "min-h-[90px] resize-y", props.className)} />;
}

export function ToggleSwitch({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", checked ? "bg-black" : "bg-black/15")}
    >
      <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", checked ? "translate-x-5" : "translate-x-0.5")} />
      {label && <span className="sr-only">{label}</span>}
    </button>
  );
}

export function ToggleRow({ label, description, checked, onChange }: { label: string; description?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-black/10 px-4 py-3">
      <div>
        <p className="text-sm font-medium text-black/80">{label}</p>
        {description && <p className="text-xs text-black/50">{description}</p>}
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

/** Toggle yang mengendalikan array (galeri/rekening/wishes): nonaktif = array dikosongkan, aktif = array terakhir yang tersimpan dikembalikan. */
export function ArrayToggleRow<T>({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: T[];
  onChange: (v: T[]) => void;
}) {
  const shadow = useRef<T[]>(value);
  useEffect(() => {
    if (value.length > 0) shadow.current = value;
  }, [value]);
  const enabled = value.length > 0;
  return (
    <ToggleRow
      label={label}
      description={description}
      checked={enabled}
      onChange={(v) => onChange(v ? shadow.current : [])}
    />
  );
}

/** Upload satu foto dengan preview + ganti/hapus. Memakai data URL (base64), bukan object URL, supaya bertahan setelah refresh -- lihat `src/lib/image-utils.ts`. */
export function ImageUpload({ value, onChange, label = "Foto", shape = "square" }: { value: string; onChange: (dataUrl: string) => void; label?: string; shape?: "square" | "portrait" }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const dataUrl = await uploadImage(file);
      onChange(dataUrl);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className={cn("shrink-0 overflow-hidden rounded-lg border border-black/10 bg-black/5", shape === "portrait" ? "h-20 w-16" : "h-16 w-16")}>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt={label} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="rounded-md border border-black/15 px-3 py-1.5 text-xs font-medium text-black/80 transition-colors hover:border-black/40 disabled:opacity-50"
          >
            {busy ? "Memproses..." : value ? "Ganti Foto" : "Upload Foto"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-md border border-black/15 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:border-red-300"
            >
              Hapus
            </button>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
}

/** Upload beberapa foto sekaligus (galeri): tambah, preview grid, hapus per foto. */
export function GalleryUpload({ photos, onChange }: { photos: GalleryPhoto[]; onChange: (photos: GalleryPhoto[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setBusy(true);
    try {
      const newPhotos: GalleryPhoto[] = await Promise.all(
        files.map(async (file) => ({ id: makeId("gal"), url: await uploadImage(file) }))
      );
      onChange([...photos, ...newPhotos]);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  function remove(id: string) {
    onChange(photos.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {photos.map((p) => (
          <div key={p.id} className="group relative aspect-square overflow-hidden rounded-lg border border-black/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => remove(p.id)}
              className="absolute right-1 top-1 rounded-full bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              Hapus
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-black/20 text-black/40 transition-colors hover:border-black/40 hover:text-black/60"
        >
          <span className="text-xl leading-none">+</span>
          <span className="text-[10px]">{busy ? "..." : "Tambah"}</span>
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
    </div>
  );
}

/** Editor daftar berulang generik (love story, agenda) -- tambah/ubah/hapus item. */
export function ListEditor<T extends { id: string }>({
  items,
  onChange,
  newItem,
  renderItem,
  addLabel = "Tambah",
  emptyHint,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
  addLabel?: string;
  emptyHint?: string;
}) {
  function update(id: string, patch: Partial<T>) {
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }
  function remove(id: string) {
    onChange(items.filter((it) => it.id !== id));
  }
  function add() {
    onChange([...items, newItem()]);
  }
  return (
    <div className="space-y-3">
      {items.length === 0 && emptyHint && <p className="text-xs text-black/40">{emptyHint}</p>}
      {items.map((item) => (
        <div key={item.id} className="relative rounded-lg border border-black/10 p-3 pr-9">
          {renderItem(item, (patch) => update(item.id, patch))}
          <button
            type="button"
            onClick={() => remove(item.id)}
            aria-label="Hapus item"
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-black/30 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="w-full rounded-lg border border-dashed border-black/20 py-2 text-xs font-medium text-black/50 transition-colors hover:border-black/40 hover:text-black/70"
      >
        + {addLabel}
      </button>
    </div>
  );
}

/** Sepasang field link Google Maps (tautan buka-di-Maps + opsional link embed) -- dipakai semua jenis acara yang punya jadwal/lokasi. */
export function MapsFields({
  mapsUrl,
  mapsEmbedSrc,
  onChangeUrl,
  onChangeEmbed,
}: {
  mapsUrl: string;
  mapsEmbedSrc: string;
  onChangeUrl: (v: string) => void;
  onChangeEmbed: (v: string) => void;
}) {
  return (
    <FieldRow>
      <Field label="Link Google Maps" hint="Tombol 'Buka di Maps' akan mengarah ke sini.">
        <TextInput type="url" value={mapsUrl} onChange={(e) => onChangeUrl(e.target.value)} placeholder="https://maps.google.com/?q=..." />
      </Field>
      <Field label="Link Embed Google Maps (opsional)" hint="Google Maps > Bagikan > Sematkan peta > salin URL dari src=&quot;...&quot;">
        <TextInput type="url" value={mapsEmbedSrc} onChange={(e) => onChangeEmbed(e.target.value)} placeholder="https://www.google.com/maps?...&output=embed" />
      </Field>
    </FieldRow>
  );
}
