"use client";

import { useState } from "react";
import type { BookingFormPayload } from "@/lib/vital/types";
import { Calendar, Check } from "@/components/ui/icons";

export function BookingForm({
  payload,
  onSelectSlot,
}: {
  payload: BookingFormPayload;
  onSelectSlot: (slotId: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const grouped = payload.slots.reduce<Record<string, typeof payload.slots>>(
    (acc, slot) => {
      (acc[slot.date] ??= []).push(slot);
      return acc;
    },
    {},
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink leading-relaxed">{payload.prompt}</p>
      {Object.entries(grouped).map(([date, slots]) => (
        <div key={date}>
          <div className="inline-flex items-center gap-1.5 mb-2.5 bg-paper rounded-full border border-line/50 px-3 py-1.5 shadow-sm">
            <Calendar size={11} className="text-moss shrink-0" />
            <span className="text-[11px] font-bold text-ink">
              {new Date(date + "T00:00:00").toLocaleDateString("en-MY", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="space-y-1.5">
            {slots.map((slot) => {
              const isSelected = selectedId === slot.id;
              return (
                <button
                  key={slot.id}
                  disabled={!slot.available}
                  onClick={() => setSelectedId(slot.id)}
                  className={`w-full text-left p-3.5 rounded-[10px] border transition-all duration-200 ${
                    !slot.available
                      ? "border-line/20 bg-paper/40 opacity-35 cursor-not-allowed"
                      : isSelected
                        ? "border-moss bg-moss/5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                        : "border-line/50 bg-white hover:bg-paper hover:border-line-2 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-ink">{slot.time}</span>
                      <span className="text-[11px] text-muted">{slot.practitioner}</span>
                    </div>
                    {!slot.available && (
                      <span className="text-[9px] font-bold text-muted uppercase tracking-wider bg-paper px-2 py-0.5 rounded-full">Full</span>
                    )}
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-moss flex items-center justify-center shadow-sm">
                        <Check size={11} className="text-cream" />
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted mt-1">{slot.specialty}</p>
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {selectedId && (
        <button
          onClick={() => onSelectSlot(selectedId)}
          className="w-full text-center text-sm font-semibold text-cream bg-moss py-3.5 rounded-[10px] hover:bg-moss/90 transition-all active:scale-[0.98] shadow-[0_4px_14px_rgba(26,38,89,0.15)] animate-[rd-fade-up_0.2s_ease-out]"
        >
          Confirm Appointment
        </button>
      )}
    </div>
  );
}
