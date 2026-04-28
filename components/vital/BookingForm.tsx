"use client";

import { useState } from "react";
import type { BookingFormPayload } from "@/lib/vital/types";
import { Calendar, Check, Heart, Dna, ChevronLeft, ChevronRight, Sparkle } from "@/components/ui/icons";

function getCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function BookingForm({
  payload,
  onSelectSlot,
}: {
  payload: BookingFormPayload;
  onSelectSlot: (slotId: string) => void;
}) {
  const availableDates = new Set(
    payload.slots.filter((s) => s.available).map((s) => s.date),
  );
  const allSlotDates = new Set(payload.slots.map((s) => s.date));
  const suggestedDate = payload.slots.find((s) => s.available)?.date ?? null;
  const suggestedSlotId = suggestedDate
    ? payload.slots.find((s) => s.date === suggestedDate && s.available)?.id ?? null
    : null;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(suggestedDate);
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const first = payload.slots.find((s) => s.available);
    return first ? new Date(first.date + "T00:00:00") : new Date();
  });

  const slotsForDate = selectedDate
    ? payload.slots.filter((s) => s.date === selectedDate)
    : [];

  const y = viewMonth.getFullYear();
  const m = viewMonth.getMonth();
  const calendarDays = getCalendarDays(y, m);
  const todayStr = new Date().toISOString().slice(0, 10);

  function prevMonth() {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }
  function nextMonth() {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  const info = payload.serviceInfo;

  return (
    <div className="space-y-4">
      {info && (
        <div className="rounded-[12px] border border-line/50 overflow-hidden">
          <div className={`px-4 py-3 flex items-center gap-3 ${
            info.providerType === "nurse"
              ? "bg-gradient-to-r from-rust/10 to-rust-soft/10"
              : "bg-gradient-to-r from-ink/8 to-ink-2/8"
          }`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
              info.providerType === "nurse"
                ? "bg-gradient-to-br from-rust to-rust-soft"
                : "bg-gradient-to-br from-ink to-ink-2"
            }`}>
              {info.providerType === "nurse"
                ? <Heart size={15} className="text-cream" />
                : <Dna size={15} className="text-cream" />
              }
            </div>
            <div>
              <span className="text-[13px] font-bold text-ink">{payload.productName}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] font-semibold text-ink">{info.price}</span>
                <span className="text-[10px] text-muted">·</span>
                <span className="text-[11px] text-muted">{info.duration}</span>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-white">
            <p className="text-[12px] text-muted leading-relaxed">{info.description}</p>
            <ul className="mt-2.5 space-y-1.5">
              {info.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[11px] text-ink leading-snug">
                  <span className="w-4 h-4 rounded-full bg-moss/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={8} className="text-moss" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p className="text-sm text-ink leading-relaxed">{payload.prompt}</p>

      {/* Calendar */}
      <div className="rounded-[12px] border border-line/50 bg-white p-3">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={prevMonth}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-paper transition-colors"
          >
            <ChevronLeft size={14} className="text-muted" />
          </button>
          <span className="text-[13px] font-bold text-ink">
            {viewMonth.toLocaleDateString("en-MY", { month: "long", year: "numeric" })}
          </span>
          <button
            onClick={nextMonth}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-paper transition-colors"
          >
            <ChevronRight size={14} className="text-muted" />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center text-[9px] font-bold text-muted uppercase tracking-wider py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} />;

            const dateStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const hasAvailable = availableDates.has(dateStr);
            const hasSlots = allSlotDates.has(dateStr);
            const isSelected = selectedDate === dateStr;
            const isSuggested = dateStr === suggestedDate;
            const isToday = dateStr === todayStr;

            return (
              <button
                key={dateStr}
                disabled={!hasAvailable}
                onClick={() => {
                  setSelectedDate(dateStr);
                  setSelectedId(null);
                }}
                className={`relative flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-150 ${
                  isSelected
                    ? "bg-moss text-cream"
                    : hasAvailable
                      ? "text-ink hover:bg-moss/5 cursor-pointer"
                      : hasSlots
                        ? "text-muted/50 cursor-not-allowed"
                        : "text-muted/30 cursor-default"
                } ${isToday && !isSelected ? "font-bold" : ""}`}
              >
                <span className="text-[13px] leading-none">{day}</span>
                {hasAvailable && !isSelected && (
                  <span className={`absolute bottom-1 w-1 h-1 rounded-full ${
                    isSuggested ? "bg-moss" : "bg-moss/40"
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots for selected date */}
      {selectedDate && slotsForDate.length > 0 && (
        <div className="animate-[rd-fade-up_0.2s_ease-out]">
          <div className="inline-flex items-center gap-1.5 mb-2.5 bg-paper rounded-full border border-line/50 px-3 py-1.5 shadow-sm">
            <Calendar size={11} className="text-moss shrink-0" />
            <span className="text-[11px] font-bold text-ink">
              {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-MY", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="space-y-1.5">
            {slotsForDate.map((slot) => {
              const isSlotSelected = selectedId === slot.id;
              const isSuggested = slot.id === suggestedSlotId;
              return (
                <button
                  key={slot.id}
                  disabled={!slot.available}
                  onClick={() => setSelectedId(slot.id)}
                  className={`w-full text-left p-3.5 rounded-[10px] border transition-all duration-200 ${
                    !slot.available
                      ? "border-line/20 bg-paper/40 opacity-35 cursor-not-allowed"
                      : isSlotSelected
                        ? "border-moss bg-moss/5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                        : "border-line/50 bg-white hover:bg-paper hover:border-line-2 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-ink">{slot.time}</span>
                      <span className="text-[11px] text-muted">{slot.practitioner}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isSuggested && slot.available && !isSlotSelected && (
                        <span className="flex items-center gap-1 text-[9px] font-bold text-moss bg-moss/8 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          <Sparkle size={8} />
                          Suggested
                        </span>
                      )}
                      {!slot.available && (
                        <span className="text-[9px] font-bold text-muted uppercase tracking-wider bg-paper px-2 py-0.5 rounded-full">Full</span>
                      )}
                      {isSlotSelected && (
                        <span className="w-5 h-5 rounded-full bg-moss flex items-center justify-center shadow-sm">
                          <Check size={11} className="text-cream" />
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-[10px] text-muted mt-1">{slot.specialty}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

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
