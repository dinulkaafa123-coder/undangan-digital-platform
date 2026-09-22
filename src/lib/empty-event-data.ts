import { getDemoEventData } from "@/data/demo-events";
import type { EventData, EventType } from "@/types/event";

/**
 * Titik awal saat user pertama kali membuat undangan untuk suatu jenis
 * acara: salinan DALAM (deep clone) dari data demo jenis acara tersebut.
 *
 * Dipilih dibanding objek kosong karena:
 * 1. Setiap renderer template mengasumsikan bentuk data lengkap (array
 *    galeri, jadwal, dsb terisi) -- objek kosong berisiko membuat
 *    renderer crash atau tampil rusak sebelum user sempat mengisi apa pun.
 * 2. User langsung melihat preview yang utuh & premium sejak awal, lalu
 *    tinggal menimpa tiap field dengan data acara mereka sendiri --
 *    bukan menatap kanvas kosong.
 */
export function createStarterEventData(eventType: EventType): EventData {
  return JSON.parse(JSON.stringify(getDemoEventData(eventType))) as EventData;
}
