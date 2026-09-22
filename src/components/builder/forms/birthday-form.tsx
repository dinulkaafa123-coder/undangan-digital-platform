"use client";

import { makeId } from "@/lib/utils";
import type { BirthdayEventData } from "@/types/event";
import { FormSection, FieldRow, Field, TextInput, TextArea, ToggleRow, ArrayToggleRow, ImageUpload, GalleryUpload, ListEditor, MapsFields } from "@/components/builder/fields";

export function BirthdayForm({ data, onChange }: { data: BirthdayEventData; onChange: (data: BirthdayEventData) => void }) {
  const { celebrant, schedule } = data;

  return (
    <div className="space-y-5">
      <FormSection title="1. Data Acara">
        <FieldRow>
          <Field label="Nama Acara">
            <TextInput value={data.title} onChange={(e) => onChange({ ...data, title: e.target.value })} placeholder="mis. Ulang Tahun ke-17 Kirana" />
          </Field>
          <Field label="Tuan Rumah (opsional)">
            <TextInput value={data.hostName ?? ""} onChange={(e) => onChange({ ...data, hostName: e.target.value })} />
          </Field>
        </FieldRow>
      </FormSection>

      <FormSection title="2. Yang Berulang Tahun">
        <Field label="Foto">
          <ImageUpload value={celebrant.photoUrl} onChange={(v) => onChange({ ...data, celebrant: { ...celebrant, photoUrl: v } })} shape="portrait" />
        </Field>
        <FieldRow>
          <Field label="Nama">
            <TextInput value={celebrant.fullName} onChange={(e) => onChange({ ...data, celebrant: { ...celebrant, fullName: e.target.value } })} />
          </Field>
          <Field label="Nama Panggilan">
            <TextInput value={celebrant.nickname} onChange={(e) => onChange({ ...data, celebrant: { ...celebrant, nickname: e.target.value } })} />
          </Field>
        </FieldRow>
        <Field label="Usia yang Dirayakan">
          <TextInput
            type="number"
            min={0}
            value={celebrant.age}
            onChange={(e) => onChange({ ...data, celebrant: { ...celebrant, age: Number(e.target.value) || 0 } })}
            className="max-w-[120px]"
          />
        </Field>
        <Field label="Deskripsi / Tagline" hint="Ditampilkan di cover, mis. 'You're Invited to My Sweet Seventeen'.">
          <TextInput value={data.tagline} onChange={(e) => onChange({ ...data, tagline: e.target.value })} />
        </Field>
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

      <FormSection title="4. Galeri">
        <GalleryUpload photos={data.gallery} onChange={(gallery) => onChange({ ...data, gallery })} />
      </FormSection>

      <FormSection title="5. RSVP & Gift">
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

      <FormSection title="6. Pengaturan">
        <ArrayToggleRow label="Galeri" value={data.gallery} onChange={(gallery) => onChange({ ...data, gallery })} />
        <ArrayToggleRow label="Ucapan Tamu (contoh)" value={data.wishes} onChange={(wishes) => onChange({ ...data, wishes })} />
      </FormSection>
    </div>
  );
}
