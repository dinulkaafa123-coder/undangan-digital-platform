"use client";

import { makeId } from "@/lib/utils";
import type { SchoolEventData } from "@/types/event";
import { FormSection, FieldRow, Field, TextInput, TextArea, ToggleRow, ArrayToggleRow, GalleryUpload, ListEditor, MapsFields } from "@/components/builder/fields";

export function SchoolForm({ data, onChange }: { data: SchoolEventData; onChange: (data: SchoolEventData) => void }) {
  const { schedule } = data;

  return (
    <div className="space-y-5">
      <FormSection title="1. Data Sekolah & Acara">
        <FieldRow>
          <Field label="Nama Sekolah / Kampus">
            <TextInput value={data.schoolName} onChange={(e) => onChange({ ...data, schoolName: e.target.value })} />
          </Field>
          <Field label="Angkatan">
            <TextInput value={data.batchYear ?? ""} onChange={(e) => onChange({ ...data, batchYear: e.target.value })} placeholder="mis. Angkatan 2026" />
          </Field>
        </FieldRow>
        <Field label="Nama Acara">
          <TextInput value={data.title} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="mis. Wisuda & Pelepasan Angkatan 2026" />
        </Field>
        <FieldRow>
          <Field label="Kepala Sekolah">
            <TextInput value={data.principalName ?? ""} onChange={(e) => onChange({ ...data, principalName: e.target.value })} />
          </Field>
          <Field label="Panitia">
            <TextInput value={data.committeeName ?? ""} onChange={(e) => onChange({ ...data, committeeName: e.target.value })} />
          </Field>
        </FieldRow>
        <Field label="Deskripsi Acara">
          <TextArea value={data.description} onChange={(e) => onChange({ ...data, description: e.target.value })} />
        </Field>
      </FormSection>

      <FormSection title="2. Jadwal & Lokasi">
        <FieldRow>
          <Field label="Tanggal">
            <TextInput type="date" value={schedule.date} onChange={(e) => onChange({ ...data, schedule: { ...schedule, date: e.target.value } })} />
          </Field>
          <Field label="Waktu">
            <TextInput type="time" value={schedule.startTime} onChange={(e) => onChange({ ...data, schedule: { ...schedule, startTime: e.target.value } })} />
          </Field>
        </FieldRow>
        <Field label="Nama Lokasi">
          <TextInput value={schedule.venueName} onChange={(e) => onChange({ ...data, schedule: { ...schedule, venueName: e.target.value } })} />
        </Field>
        <Field label="Alamat Lengkap">
          <TextArea value={schedule.address} onChange={(e) => onChange({ ...data, schedule: { ...schedule, address: e.target.value } })} />
        </Field>
        <MapsFields
          mapsUrl={schedule.mapsUrl}
          mapsEmbedSrc={schedule.mapsEmbedSrc}
          onChangeUrl={(v) => onChange({ ...data, schedule: { ...schedule, mapsUrl: v } })}
          onChangeEmbed={(v) => onChange({ ...data, schedule: { ...schedule, mapsEmbedSrc: v } })}
        />
      </FormSection>

      <FormSection title="3. Susunan Acara (Agenda)">
        <ListEditor
          items={data.agenda}
          onChange={(agenda) => onChange({ ...data, agenda })}
          newItem={() => ({ id: makeId("ag"), time: "", activity: "" })}
          addLabel="Tambah Agenda"
          emptyHint="Belum ada susunan acara."
          renderItem={(item, update) => (
            <FieldRow>
              <Field label="Waktu">
                <TextInput value={item.time} onChange={(e) => update({ time: e.target.value })} placeholder="mis. 08.00 - 08.30" />
              </Field>
              <Field label="Kegiatan">
                <TextInput value={item.activity} onChange={(e) => update({ activity: e.target.value })} />
              </Field>
            </FieldRow>
          )}
        />
      </FormSection>

      <FormSection title="4. Galeri">
        <GalleryUpload photos={data.gallery} onChange={(gallery) => onChange({ ...data, gallery })} />
      </FormSection>

      <FormSection title="5. RSVP & Kontak">
        <ToggleRow label="Aktifkan RSVP" checked={data.rsvpEnabled} onChange={(rsvpEnabled) => onChange({ ...data, rsvpEnabled })} />
        <FieldRow>
          <Field label="Nama Kontak (opsional)">
            <TextInput
              value={data.contactPerson?.name ?? ""}
              onChange={(e) => onChange({ ...data, contactPerson: { name: e.target.value, phone: data.contactPerson?.phone ?? "" } })}
            />
          </Field>
          <Field label="Nomor WhatsApp (opsional)">
            <TextInput
              value={data.contactPerson?.phone ?? ""}
              onChange={(e) => onChange({ ...data, contactPerson: { name: data.contactPerson?.name ?? "", phone: e.target.value } })}
            />
          </Field>
        </FieldRow>
      </FormSection>

      <FormSection title="6. Pengaturan">
        <ArrayToggleRow label="Galeri" value={data.gallery} onChange={(gallery) => onChange({ ...data, gallery })} />
        <ArrayToggleRow label="Ucapan (contoh)" value={data.wishes} onChange={(wishes) => onChange({ ...data, wishes })} />
      </FormSection>
    </div>
  );
}
