"use client";

import { useState } from "react";
import type { BiomarkerResult } from "@/lib/vital/types";

const STATUS_CONFIG = {
  low: { dot: "bg-butter", barFill: "bg-butter", label: "LOW", labelBg: "bg-butter/10", labelText: "text-butter" },
  normal: { dot: "bg-[#3a8a5c]", barFill: "bg-[#3a8a5c]", label: "OPTIMAL", labelBg: "bg-[#3a8a5c]/10", labelText: "text-[#3a8a5c]" },
  high: { dot: "bg-rust", barFill: "bg-rust", label: "ELEVATED", labelBg: "bg-rust/10", labelText: "text-rust" },
  critical: { dot: "bg-red-500", barFill: "bg-red-500", label: "CRITICAL", labelBg: "bg-red-500/10", labelText: "text-red-600" },
} as const;

function statusLabel(status: BiomarkerResult["status"], value: number, ref: { low: number; high: number }): string {
  if (status === "normal") return "OPTIMAL";
  if (status === "low") return "LOW";
  if (status === "critical") return "CRITICAL";
  const range = ref.high - ref.low || 1;
  const overshoot = (value - ref.high) / range;
  if (overshoot <= 0.1) return "SLIGHTLY HIGH";
  if (overshoot <= 0.3) return "BORDERLINE";
  return "ELEVATED";
}

function barPosition(value: number, ref: { low: number; high: number }): number {
  const range = ref.high - ref.low || 1;
  const padded_low = ref.low - range * 0.4;
  const padded_high = ref.high + range * 0.4;
  const span = padded_high - padded_low || 1;
  return Math.max(3, Math.min(97, ((value - padded_low) / span) * 100));
}

function refZone(ref: { low: number; high: number }): { left: number; width: number } {
  const range = ref.high - ref.low || 1;
  const padded_low = ref.low - range * 0.4;
  const padded_high = ref.high + range * 0.4;
  const span = padded_high - padded_low || 1;
  const left = ((ref.low - padded_low) / span) * 100;
  const width = (range / span) * 100;
  return { left, width };
}

function MarkerRow({ marker, expanded, onToggle }: {
  marker: BiomarkerResult;
  expanded: boolean;
  onToggle: () => void;
}) {
  const config = STATUS_CONFIG[marker.status];
  const pos = barPosition(marker.value, marker.referenceRange);
  const zone = refZone(marker.referenceRange);
  const label = statusLabel(marker.status, marker.value, marker.referenceRange);
  const labelStyle = marker.status === "high"
    ? (label === "SLIGHTLY HIGH" || label === "BORDERLINE"
      ? { bg: "bg-rust-soft/15", text: "text-rust" }
      : { bg: config.labelBg, text: config.labelText })
    : { bg: config.labelBg, text: config.labelText };

  return (
    <div
      className="py-3.5 first:pt-0 last:pb-0 cursor-pointer hover:bg-paper/40 -mx-1 px-1 rounded-lg transition-colors"
      onClick={onToggle}
    >
      {/* Row 1: name + value */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-1">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className={`w-2 h-2 rounded-full ${config.dot} shrink-0`} />
          <span className="text-[12px] sm:text-[13px] font-semibold text-ink truncate">{marker.name}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="text-[12px] sm:text-[13px] font-mono font-bold text-ink tabular-nums">
            {marker.value}
            <span className="text-[9px] sm:text-[10px] font-normal text-muted ml-0.5">{marker.unit}</span>
          </span>
          <span className={`text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.06em] px-1.5 py-0.5 rounded-full whitespace-nowrap ${labelStyle.bg} ${labelStyle.text}`}>
            {label}
          </span>
        </div>
      </div>

      {/* Reference range */}
      <div className="pl-4 mb-1.5">
        <span className="text-[10px] text-muted">
          Ref: {marker.referenceRange.high >= 900 ? `> ${marker.referenceRange.low}` : marker.referenceRange.low > 0 ? `${marker.referenceRange.low} – ${marker.referenceRange.high}` : `< ${marker.referenceRange.high}`}{marker.unit ? ` ${marker.unit}` : ""}
        </span>
      </div>

      {/* Range bar */}
      <div className="pl-4">
        <div className="relative h-[5px] w-full rounded-full bg-line/50 overflow-hidden">
          {/* Reference zone */}
          <div
            className="absolute h-full rounded-full bg-[#3a8a5c]/10"
            style={{ left: `${zone.left}%`, width: `${zone.width}%` }}
          />
          {/* Fill bar */}
          <div
            className={`absolute left-0 h-full rounded-full ${config.barFill} transition-all duration-700 ease-out`}
            style={{ width: `${pos}%`, opacity: 0.35 }}
          />
        </div>
        {/* Dot marker */}
        <div className="relative h-0">
          <div
            className={`absolute -top-[9px] w-[13px] h-[13px] rounded-full ${config.dot} border-[2.5px] border-white shadow-[0_1px_4px_rgba(0,0,0,0.18)] transition-all duration-700 ease-out`}
            style={{ left: `calc(${pos}% - 6.5px)` }}
          />
        </div>
      </div>

      {/* Expandable explanation */}
      <div className={`overflow-hidden transition-all duration-200 ${expanded ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
        <p className="text-[11px] text-muted leading-relaxed pl-4 border-l-2 border-line/40 ml-4">
          {marker.explanation}
        </p>
      </div>
    </div>
  );
}

export function BiomarkerSummary({ biomarkers }: { biomarkers: BiomarkerResult[] }) {
  const [expandedName, setExpandedName] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const flagged = biomarkers.filter((m) => m.status !== "normal");
  const normal = biomarkers.filter((m) => m.status === "normal");
  const sorted = [...flagged, ...normal];
  const visible = showAll ? sorted : sorted.slice(0, 5);
  const hiddenCount = Math.max(0, sorted.length - 5);

  return (
    <div
      className="rounded-2xl bg-gradient-to-b from-white to-paper/60 border border-line/40 p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]"
      style={{ animation: "rd-card-stagger 0.5s ease-out 0.24s both" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-moss)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="12" width="4" height="9" rx="1" />
            <rect x="10" y="7" width="4" height="14" rx="1" />
            <rect x="17" y="3" width="4" height="18" rx="1" />
          </svg>
          <h3 className="ff text-[14px] font-semibold text-ink tracking-[-0.01em]">Biomarker Summary</h3>
        </div>
        <span className="text-[10px] text-muted">{flagged.length} flagged</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-line/25">
        {visible.map((m) => (
          <MarkerRow
            key={m.name}
            marker={m}
            expanded={expandedName === m.name}
            onToggle={() => setExpandedName(expandedName === m.name ? null : m.name)}
          />
        ))}
      </div>

      {/* Expand / Collapse toggle */}
      {hiddenCount > 0 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-3 text-center text-[11px] font-semibold text-moss py-2 rounded-lg border border-line/40 hover:bg-paper transition-colors"
        >
          {showAll ? "Show less" : `Show all ${sorted.length} biomarkers`}
        </button>
      )}
    </div>
  );
}
