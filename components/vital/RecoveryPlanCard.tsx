"use client";

import { useState } from "react";
import type { RecoveryPlanPayload, RecoveryPlanPhase, RecoveryTreatment } from "@/lib/vital/types";
import Image from "next/image";
import { Sparkle } from "@/components/ui/icons";
import { getProductById } from "@/lib/products";

const ART_COMPONENTS: Record<string, (props: { color: string }) => React.ReactNode> = {
  droplet: ({ color }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  cell: ({ color }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="8" />
      <line x1="12" y1="16" x2="12" y2="22" />
      <line x1="2" y1="12" x2="8" y2="12" />
      <line x1="16" y1="12" x2="22" y2="12" />
    </svg>
  ),
  leaf: ({ color }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
};

function TreatmentCard({ t, onBook }: { t: RecoveryTreatment; onBook?: (productId: string) => void }) {
  const product = t.productId ? getProductById(t.productId) : null;
  const art = product?.art ?? "droplet";
  const color = product?.color ?? "#148c50";
  const ArtIcon = ART_COMPONENTS[art] ?? ART_COMPONENTS.droplet;

  return (
    <div className="rounded-xl border border-line/50 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="flex items-start gap-3">
        {/* Product thumbnail */}
        {product?.image ? (
          <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden">
            <Image src={product.image} alt={t.name} width={48} height={48} className="object-cover w-full h-full" />
          </div>
        ) : (
          <div
            className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: color + "14" }}
          >
            {ArtIcon({ color })}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="ff text-[13px] font-bold text-ink leading-tight">{t.name}</h4>
            <span className="shrink-0 text-[9px] font-bold text-butter bg-butter/10 px-2 py-[3px] rounded-full whitespace-nowrap uppercase tracking-[0.04em]">
              {t.frequency}
            </span>
          </div>
          <ul className="space-y-1">
            {t.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-[11px] text-ink-2 leading-[1.5]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-berry)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {b}
              </li>
            ))}
          </ul>

          {/* Price + Book button */}
          {product && (
            <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-line/30">
              <span className="text-[12px] font-bold text-ink tabular-nums">{product.price}</span>
              <button
                onClick={() => onBook?.(product.id)}
                className="text-[10px] font-bold text-cream bg-moss px-3 py-1.5 rounded-lg active:opacity-80"
              >
                {product.type === "bookable" ? "Book Now" : "Order"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SupplementStack({ stack }: { stack: RecoveryPlanPhase["supplementStack"] }) {
  return (
    <div className="rounded-xl border border-line/50 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-moss)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 2h6l3 7H6z" />
          <path d="M12 9v13" />
          <path d="M8 13h8" />
        </svg>
        <h4 className="ff text-[13px] font-semibold text-ink">Compounding Supplement Stack</h4>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] font-bold text-moss/60 uppercase tracking-[0.08em] mb-2 flex items-center gap-1">
            <span className="text-[12px]">☀️</span> Morning Stack
          </p>
          <ul className="space-y-1.5">
            {stack.morning.map((s, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[10.5px] text-ink-2 leading-tight">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-berry)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{s.name} <span className="text-muted">{s.dosage}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-bold text-moss/60 uppercase tracking-[0.08em] mb-2 flex items-center gap-1">
            <span className="text-[12px]">🌙</span> Night Stack
          </p>
          <ul className="space-y-1.5">
            {stack.night.map((s, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[10.5px] text-ink-2 leading-tight">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-berry)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{s.name} <span className="text-muted">{s.dosage}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function LifestyleSection({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-line/50 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-moss)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <h4 className="ff text-[13px] font-semibold text-ink">Lifestyle & Nutrition Guidance</h4>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px] text-ink-2 leading-[1.5]">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-berry)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MonitoringSection({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-line/50 bg-white p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-moss)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <h4 className="ff text-[13px] font-semibold text-ink">Monitoring & Follow-Up</h4>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px] text-ink-2 leading-[1.5]">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-berry)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhaseContent({ phase, onBook }: { phase: RecoveryPlanPhase; onBook?: (productId: string) => void }) {
  return (
    <div className="animate-[rd-plan-slide_0.3s_ease-out]">
      {/* Phase header */}
      <div className="flex items-center gap-3 mb-1">
        <h3 className="ff text-[16px] font-bold text-moss tracking-[-0.01em]">
          Phase {phase.phaseNumber} – {phase.title}
        </h3>
        <span className="shrink-0 text-[10px] font-bold text-rust bg-rust/10 px-2.5 py-1 rounded-full whitespace-nowrap">
          {phase.weekRange}
        </span>
      </div>
      <p className="text-[11px] text-muted leading-relaxed mb-4">
        Goal: {phase.goal}
      </p>

      {/* Two-column: treatments left, supplements right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <div className="space-y-3">
          {phase.treatments.map((t, i) => (
            <TreatmentCard key={i} t={t} onBook={onBook} />
          ))}

          {/* Expected Benefits */}
          <div className="rounded-xl bg-sage/30 border border-line/30 p-3">
            <p className="text-[10px] font-bold text-moss/70 uppercase tracking-[0.06em] mb-2">
              Expected Benefits ({phase.weekRange})
            </p>
            <div className="flex flex-wrap gap-2">
              {phase.expectedBenefits.map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-[10px] text-ink-2 bg-white rounded-full px-2.5 py-1 border border-line/40">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-berry)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <SupplementStack stack={phase.supplementStack} />
          <LifestyleSection items={phase.lifestyleGuidance} />
          <MonitoringSection items={phase.monitoring} />
        </div>
      </div>
    </div>
  );
}

export function RecoveryPlanCard({ payload, onBook }: { payload: RecoveryPlanPayload; onBook?: (productId: string) => void }) {
  const [activePhase, setActivePhase] = useState(0);
  const phase = payload.phases[activePhase];

  return (
    <div className="space-y-3 animate-[rd-card-stagger_0.5s_ease-out_both]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-moss to-moss-2 flex items-center justify-center">
            <Sparkle size={11} className="text-cream" />
          </div>
          <span className="ff text-[13px] font-semibold text-ink">Vital AI Recommendation</span>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center gap-1.5">
          {payload.phases.map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePhase(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activePhase ? "bg-moss scale-110" : "bg-line hover:bg-muted/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Phase content */}
      <PhaseContent key={activePhase} phase={phase} onBook={onBook} />

      {/* Closing message */}
      <div className="rounded-xl bg-gradient-to-br from-moss to-moss-2 px-4 py-3 flex items-start gap-3">
        <span className="text-[14px] mt-0.5">⭐</span>
        <p className="text-[11px] text-cream/80 leading-[1.6]">
          {payload.closingMessage}
        </p>
      </div>
    </div>
  );
}
