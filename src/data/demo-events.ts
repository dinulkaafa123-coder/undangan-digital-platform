import type { EventData, EventType } from "@/types/event";
import { demoInvitation } from "./demo-invitation";
import { demoKhitanan } from "./demo-khitanan";
import { demoBirthday } from "./demo-birthday";
import { demoSchool } from "./demo-school";
import { demoCorporate } from "./demo-corporate";
import { demoReligious } from "./demo-religious";

/** Data demo per jenis acara, dipakai halaman demo (`/undangan/[slug]`) untuk memasangkan template dengan eventData yang sesuai jenis acaranya. */
export function getDemoEventData(eventType: EventType): EventData {
  switch (eventType) {
    case "khitanan":
      return demoKhitanan;
    case "birthday":
      return demoBirthday;
    case "school":
    case "graduation":
      return demoSchool;
    case "corporate":
      return demoCorporate;
    case "religious":
      return demoReligious;
    case "wedding":
    default:
      return demoInvitation;
  }
}

/** Judul singkat untuk <title>/metadata, tidak semua eventData punya field `metaTitle` seperti wedding. */
export function getDemoEventTitle(data: EventData): string {
  if (data.eventType === "wedding") return data.metaTitle;
  return data.title;
}
