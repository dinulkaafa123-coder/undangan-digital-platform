import type { EventData } from "@/types/event";

/** Validasi minimal per jenis acara. Mengembalikan daftar pesan error yang jelas -- dipakai builder sebelum "Simpan Draft" / "Preview Undangan". */
export function validateEventData(data: EventData): string[] {
  const errors: string[] = [];

  switch (data.eventType) {
    case "wedding": {
      if (!data.groom.fullName.trim()) errors.push("Nama mempelai pria wajib diisi.");
      if (!data.bride.fullName.trim()) errors.push("Nama mempelai wanita wajib diisi.");
      if (!data.events[0]?.date) errors.push("Tanggal Akad wajib diisi.");
      break;
    }
    case "khitanan": {
      if (!data.child.fullName.trim()) errors.push("Nama anak yang dikhitan wajib diisi.");
      if (!data.schedule.date) errors.push("Tanggal acara wajib diisi.");
      break;
    }
    case "birthday": {
      if (!data.celebrant.fullName.trim()) errors.push("Nama yang berulang tahun wajib diisi.");
      if (!data.schedule.date) errors.push("Tanggal acara wajib diisi.");
      break;
    }
    case "school": {
      if (!data.schoolName.trim()) errors.push("Nama sekolah/kampus wajib diisi.");
      if (!data.title.trim()) errors.push("Nama acara wajib diisi.");
      if (!data.schedule.date) errors.push("Tanggal acara wajib diisi.");
      break;
    }
    case "corporate": {
      if (!data.companyName.trim()) errors.push("Nama perusahaan wajib diisi.");
      if (!data.title.trim()) errors.push("Nama acara wajib diisi.");
      if (!data.schedule.date) errors.push("Tanggal acara wajib diisi.");
      break;
    }
    case "religious": {
      if (!data.title.trim()) errors.push("Nama acara wajib diisi.");
      if (!data.schedule.date) errors.push("Tanggal acara wajib diisi.");
      break;
    }
  }

  return errors;
}
