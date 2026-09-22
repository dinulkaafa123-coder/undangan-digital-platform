"use client";

import { useState } from "react";
import { useWishes } from "@/hooks/use-wishes";
import type { AttendanceStatus, WishEntry } from "@/types/invitation";
import { cn } from "@/lib/utils";

export interface GuestBookTheme {
  cardClassName?: string;
  inputClassName?: string;
  textareaClassName?: string;
  buttonClassName?: string;
  radioActiveClassName?: string;
  radioClassName?: string;
  wishItemClassName?: string;
  wishNameClassName?: string;
  wishMessageClassName?: string;
  wishMetaClassName?: string;
  labelClassName?: string;
}

interface GuestBookProps {
  storageKey: string;
  seedWishes: WishEntry[];
  rsvpEnabled: boolean;
  theme?: GuestBookTheme;
}

const ATTENDANCE_OPTIONS: Array<{ value: AttendanceStatus; label: string }> = [
  { value: "hadir", label: "Hadir" },
  { value: "ragu", label: "Mungkin" },
  { value: "tidak_hadir", label: "Tidak Hadir" },
];

export function GuestBook({ storageKey, seedWishes, rsvpEnabled, theme = {} }: GuestBookProps) {
  const { wishes, addWish } = useWishes(storageKey, seedWishes);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceStatus>("hadir");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    addWish(name.trim(), attendance, message.trim());
    setName("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="w-full">
      {rsvpEnabled && (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-3", theme.cardClassName)}>
          <div>
            <label className={cn("mb-1 block text-sm", theme.labelClassName)}>Nama</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda"
              required
              className={cn("w-full rounded-md border px-3 py-2 text-sm outline-none", theme.inputClassName)}
            />
          </div>

          <div>
            <label className={cn("mb-1 block text-sm", theme.labelClassName)}>Konfirmasi Kehadiran</label>
            <div className="flex flex-wrap gap-2">
              {ATTENDANCE_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setAttendance(opt.value)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs sm:text-sm transition-colors",
                    theme.radioClassName,
                    attendance === opt.value && theme.radioActiveClassName
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={cn("mb-1 block text-sm", theme.labelClassName)}>Ucapan &amp; Doa</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan dan doa terbaik Anda..."
              required
              rows={3}
              className={cn("w-full resize-none rounded-md border px-3 py-2 text-sm outline-none", theme.textareaClassName)}
            />
          </div>

          <button type="submit" className={cn("rounded-md px-4 py-2 text-sm font-medium transition-transform active:scale-95", theme.buttonClassName)}>
            {submitted ? "Terkirim, terima kasih!" : "Kirim Ucapan"}
          </button>
        </form>
      )}

      <div className="mt-6 flex max-h-80 flex-col gap-3 overflow-y-auto pr-1">
        {wishes.map((wish) => (
          <div key={wish.id} className={cn("rounded-md p-3", theme.wishItemClassName)}>
            <div className="flex items-center justify-between gap-2">
              <span className={cn("text-sm font-semibold", theme.wishNameClassName)}>{wish.name}</span>
              <span className={cn("shrink-0 text-[10px] uppercase tracking-wide", theme.wishMetaClassName)}>
                {wish.attendance === "hadir" ? "Hadir" : wish.attendance === "ragu" ? "Mungkin" : "Tidak Hadir"}
              </span>
            </div>
            <p className={cn("mt-1 text-sm", theme.wishMessageClassName)}>{wish.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
