"use client";

import type { InvitationData, CoupleProfile, EventSchedule } from "@/types/invitation";
import { makeId } from "@/lib/utils";
import { FormSection, FieldRow, Field, TextInput, TextArea, ToggleRow, ArrayToggleRow, ImageUpload, GalleryUpload, ListEditor, MapsFields } from "@/components/builder/fields";

function CoupleSection({ title, profile, onChange }: { title: string; profile: CoupleProfile; onChange: (p: CoupleProfile) => void }) {
  return (
    <FormSection title={title}>
      <Field label="Foto">
        <ImageUpload value={profile.photoUrl} onChange={(v) => onChange({ ...profile, photoUrl: v })} shape="portrait" />
      </Field>
      <FieldRow>
        <Field label="Nama Lengkap">
          <TextInput value={profile.fullName} onChange={(e) => onChange({ ...profile, fullName: e.target.value })} placeholder="mis. Aditya Pratama, S.T." />
        </Field>
        <Field label="Nama Panggilan">
          <TextInput value={profile.nickname} onChange={(e) => onChange({ ...profile, nickname: e.target.value })} placeholder="mis. Aditya" />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Nama Ayah">
          <TextInput value={profile.parents.father} onChange={(e) => onChange({ ...profile, parents: { ...profile.parents, father: e.target.value } })} />
        </Field>
        <Field label="Nama Ibu">
          <TextInput value={profile.parents.mother} onChange={(e) => onChange({ ...profile, parents: { ...profile.parents, mother: e.target.value } })} />
        </Field>
      </FieldRow>
    </FormSection>
  );
}

function ScheduleSection({ title, schedule, onChange }: { title: string; schedule: EventSchedule; onChange: (s: EventSchedule) => void }) {
  return (
    <FormSection title={title}>
      <FieldRow>
        <Field label="Tanggal">
          <TextInput type="date" value={schedule.date} onChange={(e) => onChange({ ...schedule, date: e.target.value })} />
        </Field>
        <Field label="Waktu">
          <TextInput type="time" value={schedule.startTime} onChange={(e) => onChange({ ...schedule, startTime: e.target.value })} />
        </Field>
      </FieldRow>
      <Field label="Nama Lokasi">
        <TextInput value={schedule.venueName} onChange={(e) => onChange({ ...schedule, venueName: e.target.value })} placeholder="mis. Grand Ballroom, The Kensington Hotel" />
      </Field>
      <Field label="Alamat Lengkap">
        <TextArea value={schedule.address} onChange={(e) => onChange({ ...schedule, address: e.target.value })} />
      </Field>
      <MapsFields
        mapsUrl={schedule.mapsUrl}
        mapsEmbedSrc={schedule.mapsEmbedSrc}
        onChangeUrl={(v) => onChange({ ...schedule, mapsUrl: v })}
        onChangeEmbed={(v) => onChange({ ...schedule, mapsEmbedSrc: v })}
      />
    </FormSection>
  );
}

export function WeddingForm({ data, onChange }: { data: InvitationData; onChange: (data: InvitationData) => void }) {
  const akad = data.events[0];
  const resepsi = data.events[1];

  function updateEvent(index: number, schedule: EventSchedule) {
    const events = [...data.events];
    events[index] = schedule;
    onChange({ ...data, events });
  }

  return (
    <div className="space-y-5">
      <CoupleSection title="1. Mempelai Pria" profile={data.groom} onChange={(groom) => onChange({ ...data, groom })} />
      <CoupleSection title="2. Mempelai Wanita" profile={data.bride} onChange={(bride) => onChange({ ...data, bride })} />

      {akad && <ScheduleSection title="3. Akad" schedule={akad} onChange={(s) => updateEvent(0, s)} />}
      {resepsi && <ScheduleSection title="4. Resepsi" schedule={resepsi} onChange={(s) => updateEvent(1, s)} />}

      <FormSection title="5. Love Story" description="Ceritakan perjalanan kalian, dari pertemuan pertama sampai hari bahagia.">
        <ListEditor
          items={data.loveStory}
          onChange={(loveStory) => onChange({ ...data, loveStory })}
          newItem={() => ({ id: makeId("story"), date: "", title: "", description: "", photoUrl: "" })}
          addLabel="Tambah Momen"
          emptyHint="Belum ada momen love story."
          renderItem={(moment, update) => (
            <div className="space-y-3">
              <FieldRow>
                <Field label="Tanggal / Periode">
                  <TextInput value={moment.date} onChange={(e) => update({ date: e.target.value })} placeholder="mis. Januari 2019" />
                </Field>
                <Field label="Judul">
                  <TextInput value={moment.title} onChange={(e) => update({ title: e.target.value })} placeholder="mis. Pertama Bertemu" />
                </Field>
              </FieldRow>
              <Field label="Cerita">
                <TextArea value={moment.description} onChange={(e) => update({ description: e.target.value })} />
              </Field>
              <Field label="Foto (opsional)">
                <ImageUpload value={moment.photoUrl ?? ""} onChange={(v) => update({ photoUrl: v })} />
              </Field>
            </div>
          )}
        />
      </FormSection>

      <FormSection title="6. Galeri" description="Upload foto-foto untuk galeri undangan.">
        <GalleryUpload photos={data.gallery} onChange={(gallery) => onChange({ ...data, gallery })} />
      </FormSection>

      <FormSection title="7. Musik">
        <Field label="Judul Lagu">
          <TextInput value={data.music.title} onChange={(e) => onChange({ ...data, music: { ...data.music, title: e.target.value } })} />
        </Field>
        <FieldRow>
          <Field label="Artis (opsional)">
            <TextInput value={data.music.artist ?? ""} onChange={(e) => onChange({ ...data, music: { ...data.music, artist: e.target.value } })} />
          </Field>
          <Field label="URL Musik">
            <TextInput type="url" value={data.music.url} onChange={(e) => onChange({ ...data, music: { ...data.music, url: e.target.value } })} placeholder="https://..." />
          </Field>
        </FieldRow>
      </FormSection>

      <FormSection title="8. RSVP">
        <ToggleRow label="Aktifkan RSVP" description="Tamu bisa konfirmasi kehadiran & menulis ucapan." checked={data.rsvpEnabled} onChange={(rsvpEnabled) => onChange({ ...data, rsvpEnabled })} />
        <Field label="Nomor WhatsApp Konfirmasi (opsional)">
          <TextInput value={data.rsvpWhatsapp ?? ""} onChange={(e) => onChange({ ...data, rsvpWhatsapp: e.target.value })} placeholder="mis. 62812xxxxxxx" />
        </Field>
      </FormSection>

      <FormSection title="9. Wedding Gift" description="Rekening bank atau e-wallet untuk kado digital.">
        <ListEditor
          items={data.bankAccounts}
          onChange={(bankAccounts) => onChange({ ...data, bankAccounts })}
          newItem={() => ({ id: makeId("bank"), bankName: "", accountNumber: "", accountHolder: "" })}
          addLabel="Tambah Rekening / E-Wallet"
          emptyHint="Belum ada rekening/e-wallet ditambahkan."
          renderItem={(acc, update) => (
            <FieldRow>
              <Field label="Bank / E-Wallet">
                <TextInput value={acc.bankName} onChange={(e) => update({ bankName: e.target.value })} placeholder="mis. BCA / GoPay" />
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

      <FormSection title="10. Pengaturan" description="Nyalakan/matikan bagian undangan dengan cepat.">
        <p className="rounded-lg bg-black/[0.03] px-3 py-2 text-xs text-black/50">
          Countdown otomatis mengikuti tanggal Akad di atas -- tidak perlu diatur manual.
        </p>
        <ArrayToggleRow label="Galeri" description="Tampilkan/sembunyikan galeri foto." value={data.gallery} onChange={(gallery) => onChange({ ...data, gallery })} />
        <ToggleRow
          label="Musik"
          description="Aktifkan musik latar undangan."
          checked={!!data.music.url}
          onChange={(v) => onChange({ ...data, music: { ...data.music, url: v ? data.music.url || "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e70c5be0.mp3" : "" } })}
        />
        <ToggleRow label="RSVP & Ucapan" description="Tamu bisa konfirmasi kehadiran & menulis ucapan." checked={data.rsvpEnabled} onChange={(rsvpEnabled) => onChange({ ...data, rsvpEnabled })} />
        <ArrayToggleRow label="Wedding Gift" description="Tampilkan/sembunyikan info amplop digital." value={data.bankAccounts} onChange={(bankAccounts) => onChange({ ...data, bankAccounts })} />
        <ArrayToggleRow label="Ucapan Tamu (contoh)" description="Tampilkan/sembunyikan ucapan contoh yang sudah ada." value={data.wishes} onChange={(wishes) => onChange({ ...data, wishes })} />
      </FormSection>
    </div>
  );
}
