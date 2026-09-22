"use client";

import { makeId } from "@/lib/utils";
import type { ReligiousEventData } from "@/types/event";
import { FormSection, FieldRow, Field, TextInput, TextArea, GalleryUpload, ImageUpload, ListEditor, ToggleRow, ArrayToggleRow, MapsFields } from "@/components/builder/fields";

export function ReligiousForm({ data, onChange }: { data: ReligiousEventData; onChange: (data: ReligiousEventData) => void }) {
  const { schedule } = data;
  const speaker = data.speaker ?? { name: "", title: "", photoUrl: "" };

  return (
    <div className="space-y-5">
      <FormSection title="1. Data Acara">
        <Field label="Nama Acara / Tema">
          <TextInput value={data.title} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="mis. Tabligh Akbar Menyambut Tahun Baru Hijriah" />
        </Field>
        <Field label="Penyelenggara (opsional)" hint="mis. nama masjid/majelis taklim.">
          <TextInput value={data.hostName ?? ""} onChange={(e) => onChange({ ...data, hostName: e.target.value })} />
        </Field>
        <Field label="Deskripsi Acara">
          <TextArea value={data.description} onChange={(e) => onChange({ ...data, description: e.target.value })} />
        </Field>
      </FormSection>

      <FormSection title="2. Pembicara">
        <Field label="Foto">
          <ImageUpload value={speaker.photoUrl ?? ""} onChange={(v) => onChange({ ...data, speaker: { ...speaker, photoUrl: v } })} />
        </Field>
        <FieldRow>
          <Field label="Nama Pembicara">
            <TextInput value={speaker.name} onChange={(e) => onChange({ ...data, speaker: { ...speaker, name: e.target.value } })} />
          </Field>
          <Field label="Gelar / Keterangan (opsional)">
            <TextInput value={speaker.title ?? ""} onChange={(e) => onChange({ ...data, speaker: { ...speaker, title: e.target.value } })} />
          </Field>
        </FieldRow>
      </FormSection>

      <FormSection title="3. Jadwal & Lokasi">
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

      <FormSection title="4. Susunan Acara (Agenda)">
        <ListEditor
          items={data.agenda}
          onChange={(agenda) => onChange({ ...data, agenda })}
          newItem={() => ({ id: makeId("ag"), time: "", activity: "" })}
          addLabel="Tambah Agenda"
          emptyHint="Belum ada susunan acara."
          renderItem={(item, update) => (
            <FieldRow>
              <Field label="Waktu">
                <TextInput value={item.time} onChange={(e) => update({ time: e.target.value })} placeholder="mis. 19.00 - 19.30" />
              </Field>
              <Field label="Kegiatan">
                <TextInput value={item.activity} onChange={(e) => update({ activity: e.target.value })} />
              </Field>
            </FieldRow>
          )}
        />
      </FormSection>

      <FormSection title="5. Galeri">
        <GalleryUpload photos={data.gallery} onChange={(gallery) => onChange({ ...data, gallery })} />
      </FormSection>

      <FormSection title="6. RSVP & Kontak">
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

      <FormSection title="7. Pengaturan">
        <ArrayToggleRow label="Galeri" value={data.gallery} onChange={(gallery) => onChange({ ...data, gallery })} />
        <ArrayToggleRow label="Ucapan (contoh)" value={data.wishes} onChange={(wishes) => onChange({ ...data, wishes })} />
      </FormSection>
    </div>
  );
}
