import type { EventSchedule } from "@/types/invitation";
import { cn } from "@/lib/utils";

interface MapsCardProps {
  event: EventSchedule;
  className?: string;
  buttonClassName?: string;
  iframeClassName?: string;
}

export function MapsCard({ event, className, buttonClassName, iframeClassName }: MapsCardProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className={cn("mb-3 aspect-video w-full overflow-hidden rounded-lg", iframeClassName)}>
        <iframe
          src={event.mapsEmbedSrc}
          title={`Peta lokasi ${event.venueName}`}
          loading="lazy"
          className="h-full w-full border-0"
        />
      </div>
      <a
        href={event.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium", buttonClassName)}
      >
        Buka di Google Maps
      </a>
    </div>
  );
}
