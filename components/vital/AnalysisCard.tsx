import type { AnalysisPayload, BiomarkerResult } from "@/lib/vital/types";
import { Badge } from "@/components/ui/Badge";

const statusConfig = {
  low: { tone: "rust", label: "Low", dot: "bg-rust" },
  normal: { tone: "moss", label: "Optimal", dot: "bg-moss" },
  high: { tone: "butter", label: "Elevated", dot: "bg-butter" },
  critical: { tone: "berry", label: "Critical", dot: "bg-berry" },
} as const;

function ScoreRing({ score }: { score: number }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score >= 80 ? "var(--color-moss)" : score >= 50 ? "var(--color-butter)" : "var(--color-rust)";
  const label = score >= 80 ? "Excellent" : score >= 50 ? "Fair" : "Needs Attention";
  const bg = score >= 80 ? "bg-moss/8" : score >= 50 ? "bg-butter/10" : "bg-rust/8";

  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
          <circle cx="48" cy="48" r={r} fill="none" stroke="var(--color-line)" strokeWidth="6" />
          <circle
            cx="48" cy="48" r={r} fill="none"
            stroke={color} strokeWidth="6"
            strokeDasharray={c} strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="ff text-[26px] font-bold text-ink leading-none tracking-tight">{score}</span>
          <span className="text-[9px] font-semibold text-muted uppercase tracking-wider mt-0.5">/100</span>
        </div>
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full ${bg}`} style={{ color }}>
        {label}
      </span>
    </div>
  );
}

function RangeBar({ marker }: { marker: BiomarkerResult }) {
  const { value, referenceRange, status } = marker;
  const rangeSpan = referenceRange.high - referenceRange.low || 1;
  const displayLow = referenceRange.low - rangeSpan * 0.3;
  const displayHigh = referenceRange.high + rangeSpan * 0.3;
  const totalSpan = displayHigh - displayLow || 1;
  const pct = Math.max(4, Math.min(96, ((value - displayLow) / totalSpan) * 100));
  const refStart = ((referenceRange.low - displayLow) / totalSpan) * 100;
  const refWidth = (rangeSpan / totalSpan) * 100;
  const dotClass = statusConfig[status].dot;

  return (
    <div className="relative h-2 rounded-full bg-line/40 w-full overflow-hidden">
      <div
        className="absolute h-full rounded-full bg-moss/12"
        style={{ left: `${refStart}%`, width: `${refWidth}%` }}
      />
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full ${dotClass} border-[2.5px] border-white shadow-[0_1px_4px_rgba(0,0,0,0.15)] transition-all duration-700 ease-out`}
        style={{ left: `calc(${pct}% - 7px)` }}
      />
    </div>
  );
}

function MarkerRow({ marker }: { marker: BiomarkerResult }) {
  const config = statusConfig[marker.status];

  return (
    <div className="py-3.5 border-b border-line/20 last:border-0">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-2 h-2 rounded-full ${config.dot} shrink-0`} />
          <span className="text-[13px] font-semibold text-ink tracking-[-0.01em] truncate">{marker.name}</span>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-[13px] font-mono font-bold text-ink tabular-nums">
            {marker.value}
            <span className="text-[10px] font-normal text-muted ml-0.5">{marker.unit}</span>
          </span>
          <Badge tone={config.tone} className="text-[7px] px-1.5 py-0.5">
            {config.label}
          </Badge>
        </div>
      </div>
      <RangeBar marker={marker} />
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[9px] text-muted font-medium tabular-nums">
          Ref: {marker.referenceRange.low}–{marker.referenceRange.high} {marker.unit}
        </span>
      </div>
      <p className="text-[11px] text-muted leading-relaxed mt-1.5">{marker.explanation}</p>
    </div>
  );
}

export function AnalysisCard({ payload }: { payload: AnalysisPayload }) {
  const issues = payload.biomarkers.filter((m) => m.status !== "normal");
  const normal = payload.biomarkers.filter((m) => m.status === "normal");
  const sorted = [...issues, ...normal];

  return (
    <div className="space-y-5">
      {/* Header with score */}
      <div className="flex items-start gap-5 bg-gradient-to-br from-paper via-cream to-paper rounded-[10px] p-4 border border-line/30">
        <ScoreRing score={payload.overallScore} />
        <div className="flex-1 min-w-0 pt-1">
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.1em] mb-1">Health Score</p>
          <h4 className="ff text-[17px] font-semibold text-ink tracking-[-0.02em] mb-2 leading-tight">Blood Report Analysis</h4>
          <p className="text-[12px] text-muted leading-[1.6]">{payload.summary}</p>
        </div>
      </div>

      {/* Deficiency flags */}
      {payload.deficiencies.length > 0 && (
        <div>
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.1em] mb-2">Areas requiring attention</p>
          <div className="flex flex-wrap gap-1.5">
            {payload.deficiencies.map((d) => (
              <Badge key={d} tone="rust" outline>{d}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Biomarker breakdown */}
      <div className="border border-line/40 rounded-[10px] overflow-hidden">
        <div className="px-4 py-2.5 bg-paper/80 border-b border-line/30 flex items-center justify-between">
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.1em]">Biomarker Breakdown</p>
          <p className="text-[10px] text-muted">{issues.length} flagged · {normal.length} normal</p>
        </div>
        <div className="px-4 bg-white">
          {sorted.map((m) => (
            <MarkerRow key={m.name} marker={m} />
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 px-3 py-2.5 bg-paper/60 rounded-[8px] border border-line/20">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted shrink-0 mt-px" aria-hidden>
          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
          <path d="M7 4v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <p className="text-[10px] text-muted leading-relaxed">
          This analysis is for informational purposes only. Please consult a licensed medical practitioner before making health decisions.
        </p>
      </div>
    </div>
  );
}
