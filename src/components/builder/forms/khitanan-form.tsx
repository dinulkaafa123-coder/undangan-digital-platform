"use client";

import { makeId } from "@/lib/utils";
import type { KhitananEventData } from "@/types/event";
import { FormSection, FieldRow, Field, TextInput, TextArea, ToggleRow, ArrayToggleRow, ImageUpload, GalleryUpload, ListEditor, MapsFields } from "@/components/builder/fields";

export function KhitananForm({ data, onChange }: { data: KhitananEventData; onChange: (data: KhitananEventData) => void }) {
  const { child, schedule } = data;

  return (
    <div className="space-y-5">
      <FormSection title="1. Data Anak" description="Anak yang akan dikhitan.">
        <Field label="Foto Anak">
          <ImageUpload value={child.photoUrl} onChange={(v) => onChange({ ...data, child: { ...child, photoUrl: v } })} shape="portrait" />
        </Field>
        <FieldRow>
          <Field label="Nama Lengkap">
            <TextInput value={child.fullName} onChange={(e) => onChange({ ...data, child: { ...child, fullName: e.target.value } })} />
          </Field>
          <Field label="Nama Panggilan">
            <TextInput value={child.nickname} onChange={(e) => onChange({ ...data, child: { ...child, nickname: e.target.value } })} />
          </Field>
        </FieldRow>
        <FieldRow>
          <Field label="Nama Ayah">
            <TextInput value={child.parents.father} onChange={(e) => onChange({ ...data, child: { ...child, parents: { ...child.parents, father: e.target.value } } })} />
          </Field>
          <Field label="Nama Ibu">
            <TextInput value={child.parents.mother} onChange={(e) => onChange({ ...data, child: { ...child, parents: { ...child.parents, mother: e.target.value } } })} />
          </Field>
        </FieldRow>
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

      <FormSection title="3. Cerita / Doa Harapan">
        <Field label="Isi Doa / Harapan">
          <TextArea value={data.greeting.text} onChange={(e) => onChange({ ...data, greeting: { ...data.greeting, text: e.target.value } })} />
        </Field>
        <Field label="Sumber (opsional)">
          <TextInput value={data.greeting.source ?? ""} onChange={(e) => onChange({ ...data, greeting: { ...data.greeting, source: e.target.value } })} placeholder="mis. Doa untuk anak yang dikhitan" />
        </Field>
      </FormSection>

      <FormSection title="4. Galeri">
        <GalleryUpload photos={data.gallery} onChange={(gallery) => onChange({ ...data, gallery })} />
      </FormSection>

      <FormSection title="5. Musik">
        <FieldRow>
          <Field label="Judul Lagu">
            <TextInput value={data.music.title} onChange={(e) => onChange({ ...data, music: { ...data.music, title: e.target.value } })} />
          </Field>
          <Field label="URL Musik">
            <TextInput type="url" value={data.music.url} onChange={(e) => onChange({ ...data, music: { ...data.music, url: e.target.value } })} />
          </Field>
        </FieldRow>
      </FormSection>

      <FormSection title="6. RSVP & Gift">
        <ToggleRow label="Aktifkan RSVP" description="Tamu bisa konfirmasi kehadiran & menulis ucapan." checked={data.rsvpEnabled} onChange={(rsvpEnabled) => onChange({ ...data, rsvpEnabled })} />
        <ListEditor
          items={data.bankAccounts}
          onChange={(bankAccounts) => onChange({ ...data, bankAccounts })}
          newItem={() => ({ id: makeId("bank"), bankName: "", accountNumber: "", accountHolder: "" })}
          addLabel="Tambah Rekening / E-Wallet"
          emptyHint="Belum ada rekening/e-wallet untuk kado digital."
          renderItem={(acc, update) => (
            <FieldRow>
              <Field label="Bank / E-Wallet">
                <TextInput value={acc.bankName} onChange={(e) => update({ bankName: e.target.value })} />
              </Field>
              <Field label="Nomor Rekening / HP">
                <TextInput value={acc.accountNumber} onChange={(e) => update({ accountNumber: e.target.value })} />
              </Field>
              <Field label="Nama Pemilik">
                <TextInput value={acc.accountHolder} onChange={(e) => update({ accountHolder: e.target.value })} />
              </Field>
            </FieldRow>
          )}
        />
      </FormSection>

      <FormSection title="7. Pengaturan">
        <ArrayToggleRow label="Galeri" value={data.gallery} onChange={(gallery) => onChange({ ...data, gallery })} />
        <ArrayToggleRow label="Ucapan Tamu (contoh)" value={data.wishes} onChange={(wishes) => onChange({ ...data, wishes })} />
      </FormSection>
    </div>
  );
}
