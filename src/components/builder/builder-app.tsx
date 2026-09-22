"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  type EventData,
  type EventType,
  getEventTypeMeta,
  isWeddingEvent,
  isKhitananEvent,
  isBirthdayEvent,
  isSchoolEvent,
  isCorporateEvent,
  isReligiousEvent,
} from "@/types/event";
import { getTemplateBySlug, getTemplateEventType, getTemplatesByEventType } from "@/data/templates";
import { createStarterEventData } from "@/lib/empty-event-data";
import { validateEventData } from "@/lib/validate-event";
import { loadDraft, saveDraft, type Draft } from "@/lib/draft-storage";
import { getInvitationBySlug, type InvitationRecord } from "@/lib/invitations";
import { isSupabaseConfigured } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { EventTypeSelector } from "@/components/builder/event-type-selector";
import { TemplateSwitcher } from "@/components/builder/template-switcher";
import { LivePreview } from "@/components/builder/live-preview";
import { PublishFlow } from "@/components/builder/publish-flow";
import { WeddingForm } from "@/components/builder/forms/wedding-form";
import { KhitananForm } from "@/components/builder/forms/khitanan-form";
import { BirthdayForm } from "@/components/builder/forms/birthday-form";
import { SchoolForm } from "@/components/builder/forms/school-form";
import { CorporateForm } from "@/components/builder/forms/corporate-form";
import { ReligiousForm } from "@/components/builder/forms/religious-form";

type Status = "loading" | "select-type" | "no-template" | "edit-not-found" | "ready";

/** Bangun draft baru untuk `eventType`: pakai eventData yang sudah ada kalau jenis acaranya sama, atau data starter kalau belum ada / beda jenis. */
function resolveDraftForType(existing: Draft | null, eventType: EventType, preferredTemplateId?: string): Draft | null {
  const templatesForType = getTemplatesByEventType(eventType);
  if (templatesForType.length === 0) return null;
  const templateId = preferredTemplateId ?? templatesForType[0].slug;
  const sameType = existing && existing.eventType === eventType;
  const eventData: EventData = sameType ? existing!.eventData : createStarterEventData(eventType);
  return {
    eventType,
    templateId,
    eventData,
    updatedAt: new Date().toISOString(),
    publishedSlug: sameType ? existing!.publishedSlug : undefined,
    publishedId: sameType ? existing!.publishedId : undefined,
  };
}

export function BuilderApp({
  initialTemplateSlug,
  initialEventType,
  initialEditSlug,
}: {
  initialTemplateSlug?: string;
  initialEventType?: EventType;
  initialEditSlug?: string;
}) {
  const [status, setStatus] = useState<Status>("loading");
  const [pendingEmptyType, setPendingEmptyType] = useState<EventType | null>(null);
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [templateId, setTemplateId] = useState<string>("");
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [errors, setErrors] = useState<string[]>([]);
  const [savedNotice, setSavedNotice] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);
  const [showPublish, setShowPublish] = useState(false);

  // ============ Resolusi state awal (sekali saat mount) ============
  // Draft disimpan di localStorage (sumber eksternal, tidak tersedia saat
  // SSR) -- state awal "loading" dipertahankan sama persis antara server &
  // client untuk menghindari hydration mismatch, baru diselesaikan di sini
  // setelah mount. Semua `setState` di bawah karena itu sengaja dijalankan
  // langsung di effect ini (bukan di callback async terpisah).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    // Masuk lewat link "Edit Undangan" (mis. /buat?edit=arka-alya): ambil
    // data LANGSUNG dari database berdasarkan slug, bukan dari localStorage
    // -- ini yang memungkinkan undangan yang sudah aktif diedit lagi dari
    // browser mana pun, bukan cuma browser yang dipakai saat aktivasi.
    if (initialEditSlug) {
      (async () => {
        const existing = loadDraft();
        if (existing && existing.publishedSlug !== initialEditSlug) {
          const proceed = window.confirm(
            `Anda memiliki draft "${getEventTypeMeta(existing.eventType).label}" yang sedang dikerjakan. Membuka undangan lain untuk diedit akan mengganti draft ini. Lanjutkan?`
          );
          if (!proceed) {
            setEventType(existing.eventType);
            setTemplateId(existing.templateId);
            setEventData(existing.eventData);
            setPublishedSlug(existing.publishedSlug ?? null);
            setStatus("ready");
            return;
          }
        }
        if (!isSupabaseConfigured()) {
          setStatus("edit-not-found");
          return;
        }
        try {
          const record = await getInvitationBySlug(initialEditSlug);
          if (!record) {
            setStatus("edit-not-found");
            return;
          }
          const draft: Draft = {
            eventType: record.event_type,
            templateId: record.template_id,
            eventData: record.event_data,
            updatedAt: new Date().toISOString(),
            publishedSlug: record.slug,
            publishedId: record.id,
          };
          saveDraft(draft);
          setEventType(draft.eventType);
          setTemplateId(draft.templateId);
          setEventData(draft.eventData);
          setPublishedSlug(draft.publishedSlug ?? null);
          setStatus("ready");
        } catch {
          setStatus("edit-not-found");
        }
      })();
      return;
    }

    const existing = loadDraft();
    let resolved: Draft | null = null;

    if (initialTemplateSlug) {
      const template = getTemplateBySlug(initialTemplateSlug);
      if (template) {
        const type = getTemplateEventType(template);
        if (existing && existing.eventType !== type) {
          const proceed = window.confirm(
            `Anda memiliki draft "${getEventTypeMeta(existing.eventType).label}" yang sedang dikerjakan. Memilih template ini akan memulai draft baru untuk acara "${getEventTypeMeta(type).label}". Lanjutkan?`
          );
          resolved = proceed ? resolveDraftForType(null, type, initialTemplateSlug) : existing;
        } else {
          resolved = resolveDraftForType(existing, type, initialTemplateSlug);
        }
      }
    } else if (initialEventType) {
      if (existing && existing.eventType !== initialEventType) {
        const proceed = window.confirm(
          `Anda memiliki draft "${getEventTypeMeta(existing.eventType).label}" yang sedang dikerjakan. Memilih jenis acara ini akan memulai draft baru untuk acara "${getEventTypeMeta(initialEventType).label}". Lanjutkan?`
        );
        resolved = proceed ? resolveDraftForType(null, initialEventType) : existing;
      } else {
        resolved = resolveDraftForType(existing, initialEventType);
      }
    } else if (existing) {
      resolved = existing;
    }

    if (!resolved) {
      const fallbackType = initialEventType ?? existing?.eventType ?? null;
      if (fallbackType && getTemplatesByEventType(fallbackType).length === 0) {
        setPendingEmptyType(fallbackType);
        setStatus("no-template");
      } else {
        setStatus("select-type");
      }
      return;
    }

    saveDraft(resolved);
    setEventType(resolved.eventType);
    setTemplateId(resolved.templateId);
    setEventData(resolved.eventData);
    setPublishedSlug(resolved.publishedSlug ?? null);
    setStatus("ready");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // ============ Autosave (debounced) setiap eventData/templateId berubah ============
  useEffect(() => {
    if (status !== "ready" || !eventData || !eventType || !templateId) return;
    const timeout = window.setTimeout(() => {
      saveDraft({ eventType, templateId, eventData, updatedAt: new Date().toISOString(), publishedSlug: publishedSlug ?? undefined });
    }, 250);
    return () => window.clearTimeout(timeout);
  }, [eventData, templateId, eventType, status, publishedSlug]);

  function handleSelectEventType(type: EventType) {
    const templatesForType = getTemplatesByEventType(type);
    if (templatesForType.length === 0) {
      setPendingEmptyType(type);
      setStatus("no-template");
      return;
    }
    const resolved = resolveDraftForType(loadDraft(), type);
    if (!resolved) return;
    saveDraft(resolved);
    setEventType(resolved.eventType);
    setTemplateId(resolved.templateId);
    setEventData(resolved.eventData);
    setStatus("ready");
  }

  function handleChangeTemplate(slug: string) {
    setTemplateId(slug);
  }

  function handleSaveDraft() {
    if (!eventData || !eventType || !templateId) return;
    setErrors(validateEventData(eventData));
    saveDraft({ eventType, templateId, eventData, updatedAt: new Date().toISOString(), publishedSlug: publishedSlug ?? undefined });
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2500);
  }

  function handleReset() {
    if (!eventType || !templateId) return;
    const ok = window.confirm("Yakin ingin menghapus draft ini? Semua data yang sudah diisi akan hilang.");
    if (!ok) return;
    const fresh = createStarterEventData(eventType);
    setEventData(fresh);
    setErrors([]);
    saveDraft({ eventType, templateId, eventData: fresh, updatedAt: new Date().toISOString(), publishedSlug: publishedSlug ?? undefined });
  }

  function handlePreviewNewTab() {
    if (eventData && eventType && templateId) {
      saveDraft({ eventType, templateId, eventData, updatedAt: new Date().toISOString(), publishedSlug: publishedSlug ?? undefined });
    }
    window.open("/pratinjau", "_blank", "noopener,noreferrer");
  }

  function handlePublishClick() {
    setErrors([]);
    if (!eventData) return;
    const validation = validateEventData(eventData);
    if (validation.length > 0) {
      setErrors(validation);
      return;
    }
    setShowPublish(true);
  }

  function handlePublished(record: InvitationRecord) {
    setPublishedSlug(record.slug);
    if (eventType && templateId && eventData) {
      saveDraft({ eventType, templateId, eventData, updatedAt: new Date().toISOString(), publishedSlug: record.slug, publishedId: record.id });
    }
  }

  if (status === "loading") {
    return <div className="flex min-h-[50vh] items-center justify-center text-sm text-black/40">Memuat...</div>;
  }

  if (status === "select-type") {
    return <EventTypeSelector onSelect={handleSelectEventType} />;
  }

  if (status === "no-template") {
    const label = pendingEmptyType ? getEventTypeMeta(pendingEmptyType).label : "ini";
    return (
      <section className="mx-auto max-w-lg px-6 py-20 text-center">
        <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">Segera Hadir</span>
        <h1 className="mt-6 text-2xl font-bold text-black sm:text-3xl">Template {label} Belum Tersedia</h1>
        <p className="mt-3 text-sm text-black/60">
          Kami belum punya template untuk jenis acara ini. Coba pilih jenis acara lain, atau jelajahi katalog template yang sudah tersedia.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/buat" className="rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black transition-colors hover:border-black/50">
            Pilih Jenis Lain
          </Link>
          <Link href="/templates" className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/80">
            Jelajahi Template
          </Link>
        </div>
      </section>
    );
  }

  if (status === "edit-not-found") {
    return (
      <section className="mx-auto max-w-lg px-6 py-20 text-center">
        <span className="inline-block rounded-full bg-red-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-700">Tidak Ditemukan</span>
        <h1 className="mt-6 text-2xl font-bold text-black sm:text-3xl">Undangan Tidak Bisa Dibuka untuk Diedit</h1>
        <p className="mt-3 text-sm text-black/60">
          Undangan dengan link ini tidak ditemukan, sudah tidak aktif, atau koneksi ke database sedang bermasalah. Coba lagi beberapa saat lagi.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/buat" className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/80">
            Buat Undangan Baru
          </Link>
        </div>
      </section>
    );
  }

  if (!eventData || !eventType) return null;

  const eventTypeMeta = getEventTypeMeta(eventType);
  const currentTemplate = getTemplateBySlug(templateId);

  function renderForm() {
    if (!eventData) return null;
    if (isWeddingEvent(eventData)) return <WeddingForm data={eventData} onChange={setEventData} />;
    if (isKhitananEvent(eventData)) return <KhitananForm data={eventData} onChange={setEventData} />;
    if (isBirthdayEvent(eventData)) return <BirthdayForm data={eventData} onChange={setEventData} />;
    if (isSchoolEvent(eventData)) return <SchoolForm data={eventData} onChange={setEventData} />;
    if (isCorporateEvent(eventData)) return <CorporateForm data={eventData} onChange={setEventData} />;
    if (isReligiousEvent(eventData)) return <ReligiousForm data={eventData} onChange={setEventData} />;
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <button
            type="button"
            onClick={() => {
              const ok = window.confirm("Ganti jenis acara akan menyimpan draft ini apa adanya dan menampilkan pilihan jenis acara. Lanjutkan?");
              if (ok) setStatus("select-type");
            }}
            className="text-xs text-black/40 transition-colors hover:text-black"
          >
            ← Ganti jenis acara
          </button>
          <h1 className="mt-1 text-xl font-bold text-black sm:text-2xl">
            Buat Undangan {eventTypeMeta.emoji} {eventTypeMeta.label}
          </h1>
        </div>

        {/* Tab mobile: EDIT / PREVIEW */}
        <div className="flex gap-1.5 rounded-full border border-black/10 p-1 lg:hidden">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={cn("rounded-full px-4 py-1.5 text-xs font-semibold transition-colors", activeTab === "edit" ? "bg-black text-white" : "text-black/60")}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={cn("rounded-full px-4 py-1.5 text-xs font-semibold transition-colors", activeTab === "preview" ? "bg-black text-white" : "text-black/60")}
          >
            Preview
          </button>
        </div>
      </div>

      {publishedSlug && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <span>
            ✅ Undangan ini sudah <strong>aktif</strong> di <code className="rounded bg-white/60 px-1.5 py-0.5">/undangan/{publishedSlug}</code>
          </span>
          <Link href={`/undangan/${publishedSlug}`} target="_blank" className="font-semibold underline underline-offset-2 hover:text-emerald-900">
            Buka Undangan →
          </Link>
        </div>
      )}

      <div className="mt-5">
        <TemplateSwitcher eventType={eventType} currentSlug={templateId} onSelect={handleChangeTemplate} />
      </div>

      {errors.length > 0 && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Mohon lengkapi data berikut:</p>
          <ul className="mt-1.5 list-disc space-y-0.5 pl-5">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        <div className={cn(activeTab === "edit" ? "block" : "hidden", "lg:block")}>
          {renderForm()}

          <div className="mt-6 flex flex-col gap-3 border-t border-black/10 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={handlePreviewNewTab}
              className="flex-1 rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black transition-colors hover:border-black/50"
            >
              Preview Undangan
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex-1 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/80"
            >
              {savedNotice ? "Tersimpan ✓" : "Simpan Draft"}
            </button>
            <button
              type="button"
              onClick={handlePublishClick}
              className="flex-1 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              {publishedSlug ? "Simpan Perubahan" : "Aktifkan Undangan"}
            </button>
          </div>
          <button type="button" onClick={handleReset} className="mt-3 text-center text-xs font-medium text-red-500 transition-colors hover:text-red-700">
            Reset Draft
          </button>
        </div>

        <div className={cn(activeTab === "preview" ? "block" : "hidden", "lg:block")}>
          <div className="lg:sticky lg:top-6">
            <LivePreview className="mx-auto w-full max-w-[300px]" />
            <p className="mt-3 text-center text-xs text-black/40">Preview berubah otomatis mengikuti data yang Anda isi.</p>
          </div>
        </div>
      </div>

      {showPublish && (
        <PublishFlow
          eventType={eventType}
          templateId={templateId}
          templateName={currentTemplate?.name ?? templateId}
          eventData={eventData}
          mode={publishedSlug ? "update" : "activate"}
          existingSlug={publishedSlug ?? undefined}
          onClose={() => setShowPublish(false)}
          onPublished={handlePublished}
        />
      )}
    </div>
  );
}
