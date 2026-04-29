"use client";

import { useEffect, useState } from "react";
import { Sparkle } from "@/components/ui/icons";

function badgeStyle(score: number): { bg: string; text: string } {
  if (score >= 80) return { bg: "bg-[#2a824b]/12", text: "text-[#2a824b]" };
  if (score >= 60) return { bg: "bg-[#5bab6e]/12", text: "text-[#3d8a50]" };
  if (score >= 40) return { bg: "bg-[#c09020]/12", text: "text-[#a07818]" };
  if (score >= 20) return { bg: "bg-[#e8601a]/12", text: "text-[#d05518]" };
  return { bg: "bg-[#dc3545]/12", text: "text-[#c03040]" };
}

const CX = 70;
const CY = 68;
const R = 52;
const SW = 16;

const SEGMENTS = [
  { from: 2, to: 47, color: "#e8613a" },
  { from: 47.8, to: 130, color: "#f5b731" },
  { from: 130.8, to: 178, color: "#3aaa5b" },
] as const;

function toXY(gaugeDeg: number, radius: number) {
  const svgRad = ((180 - gaugeDeg) * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(svgRad),
    y: CY - radius * Math.sin(svgRad),
  };
}

function segmentArc(fromDeg: number, toDeg: number): string {
  const start = toXY(fromDeg, R);
  const end = toXY(toDeg, R);
  const sweep = toDeg - fromDeg;
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${R} ${R} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

function needlePath(gaugeDeg: number): string {
  const tipR = R - 2;
  const baseR = 6;
  const halfW = 2.2;
  const tip = toXY(gaugeDeg, tipR);
  const perpRad = ((180 - gaugeDeg) * Math.PI) / 180 + Math.PI / 2;
  const bx = CX + baseR * Math.cos(((180 - gaugeDeg) * Math.PI) / 180);
  const by = CY - baseR * Math.sin(((180 - gaugeDeg) * Math.PI) / 180);
  const lx = bx + halfW * Math.cos(perpRad);
  const ly = by - halfW * Math.sin(perpRad);
  const rx = bx - halfW * Math.cos(perpRad);
  const ry = by + halfW * Math.sin(perpRad);
  return `M ${tip.x.toFixed(2)} ${tip.y.toFixed(2)} L ${lx.toFixed(2)} ${ly.toFixed(2)} L ${rx.toFixed(2)} ${ry.toFixed(2)} Z`;
}

export function HealthScoreGauge({
  score,
  scoreLabel,
  summary,
}: {
  score: number;
  scoreLabel: string;
  summary: string;
}) {
  const [anim, setAnim] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let frame: number;
    const t0 = performance.now();
    function tick(now: number) {
      const t = Math.min((now - t0) / 1200, 1);
      setAnim((1 - Math.pow(1 - t, 3)) * score);
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const ds = Math.round(anim);
  const badge = badgeStyle(score);

  const needleGaugeDeg = 2 + (anim / 100) * 176;
  const nc = "#1a5c32";

  return (
    <div
      className="rounded-2xl bg-gradient-to-b from-white to-paper/60 border border-line/40 p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]"
      style={{ animation: mounted ? "rd-card-stagger 0.5s ease-out both" : "none" }}
    >
      {/* AI Analysis pill */}
      <div className="flex justify-end mb-1">
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-moss bg-moss/8 px-2 py-0.5 rounded-full">
          <Sparkle size={9} />
          AI Analysis
        </span>
      </div>

      {/* Main: text left, gauge right */}
      <div className="flex items-center gap-3">
        {/* Left side */}
        <div className="flex-1 min-w-0">
          <p className="ff text-[15px] font-bold text-ink tracking-[-0.01em] mb-1">Health Score</p>
          <div className="flex items-baseline gap-1">
            <span className="ff text-[46px] font-bold text-ink tracking-[-0.04em] leading-none tabular-nums">
              {ds}
            </span>
            <span className="text-[17px] font-medium text-muted/50">/100</span>
          </div>
          <span className={`inline-block mt-2 text-[9px] font-bold uppercase tracking-[0.1em] px-2.5 py-[3px] rounded-[4px] ${badge.bg} ${badge.text}`}>
            {scoreLabel}
          </span>
          <p className="text-[11px] text-muted leading-[1.6] mt-2">{summary}</p>
        </div>

        {/* Right side: gauge */}
        <div className="shrink-0 w-[130px] lg:w-[150px]">
          <svg viewBox="0 0 140 82" className="w-full" aria-hidden="true">
            {/* Three colored arc segments */}
            {SEGMENTS.map((seg, i) => (
              <path
                key={i}
                d={segmentArc(seg.from, seg.to)}
                fill="none"
                stroke={seg.color}
                strokeWidth={SW}
                strokeLinecap="butt"
              />
            ))}

            {/* Tapered needle */}
            <path d={needlePath(needleGaugeDeg)} fill={nc} />
            <circle cx={CX} cy={CY} r="4" fill="white" stroke={nc} strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
