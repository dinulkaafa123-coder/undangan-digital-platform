const DAY_NAMES = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

/** Parse "YYYY-MM-DD" (+ optional "HH:mm") as local time, avoiding UTC-shift bugs. */
export function parseLocalDate(dateStr: string, timeStr = "00:00"): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1, hour ?? 0, minute ?? 0);
}

/** "20 Desember 2026" */
export function formatFullDate(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

/** "Minggu, 20 Desember 2026" */
export function formatFullDateWithDay(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  return `${DAY_NAMES[d.getDay()]}, ${formatFullDate(dateStr)}`;
}

/** "08:00 WIB" */
export function formatTimeRange(start: string, end?: string): string {
  if (!end) return `${start} WIB`;
  return `${start} - ${end} WIB`;
}
