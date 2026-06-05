"use client";

import { useState, useRef, useCallback } from "react";
import type {
  RecoveryPlanPayload,
  RecoveryPlanPhase,
  RecommendedProduct,
  SupplementItem,
} from "@/lib/vital/types";
import { ProductRecommendation } from "./ProductRecommendation";
import {
  Sparkle,
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Leaf,
} from "@/components/ui/icons";

function Section({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-line/40 bg-white overflow-hidden">
      <div className="flex items-start gap-2.5 px-4 py-3 border-b border-line/30 bg-paper/50">
        <span className="w-8 h-8 rounded-lg bg-moss/8 flex items-center justify-center shrink-0 text-moss">
          {icon}
        </span>
        <div className="min-w-0 pt-0.5">
          <h4 className="ff text-[13px] font-semibold text-ink tracking-[-0.01em]">{title}</h4>
          {subtitle ? (
            <p className="text-[10px] text-muted mt-0.5 leading-snug">{subtitle}</p>
          ) : null}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function PlanOverview({ overview }: { overview: RecoveryPlanPayload["overview"] }) {
  return (
    <div className="px-4 sm:px-5 py-4 border-b border-line/25 bg-gradient-to-b from-sage/25 to-transparent">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-moss mb-2">
        Plan overview
      </p>
      <h4 className="ff text-[14px] sm:text-[15px] font-semibold text-ink tracking-[-0.02em] mb-2 leading-snug">
        {overview.title}
      </h4>
      <p className="text-[12px] sm:text-[13px] text-ink-2 leading-[1.65] mb-4">
        {overview.description}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        <div className="rounded-lg bg-white border border-line/40 px-3 py-2.5">
          <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted mb-0.5">
            Duration
          </p>
          <p className="ff text-[13px] font-semibold text-ink leading-tight">{overview.duration}</p>
        </div>
        <div className="rounded-lg bg-white border border-line/40 px-3 py-2.5">
          <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted mb-0.5">
            Phases
          </p>
          <p className="ff text-[13px] font-semibold text-ink leading-tight">
            {overview.phaseCount} stages
          </p>
        </div>
        <div className="rounded-lg bg-white border border-line/40 px-3 py-2.5 col-span-2 sm:col-span-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted mb-0.5">
            Focus
          </p>
          <p className="ff text-[13px] font-semibold text-ink leading-tight">
            {overview.focusLabel}
          </p>
        </div>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-muted mb-2">
        What this plan aims to improve
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {overview.focusAreas.map((area) => (
          <li
            key={area}
            className="flex items-start gap-2 text-[11px] sm:text-[12px] text-ink-2 leading-snug"
          >
            <Check size={11} className="text-berry shrink-0 mt-0.5" />
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[12px] text-ink-2 leading-[1.55]">
          <span className="mt-[5px] w-4 h-4 rounded-full bg-berry/12 flex items-center justify-center shrink-0">
            <Check size={9} className="text-berry" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}


function SupplementColumn({
  label,
  items,
  variant,
}: {
  label: string;
  items: SupplementItem[];
  variant: "morning" | "night";
}) {
  return (
    <div
      className={`rounded-lg p-3 border ${
        variant === "morning"
          ? "bg-gradient-to-br from-rust-soft/12 to-paper border-rust-soft/25"
          : "bg-gradient-to-br from-moss/6 to-paper border-moss/15"
      }`}
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-muted mb-2.5">
        {label}
      </p>
      <ul className="space-y-2">
        {items.map((s, i) => (
          <li key={i} className="border-b border-line/25 last:border-0 pb-2 last:pb-0">
            <p className="text-[12px] font-medium text-ink leading-tight">{s.name}</p>
            <p className="text-[10px] text-muted mt-0.5">{s.dosage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhasePanel({ phase }: { phase: RecoveryPlanPhase }) {
  return (
    <div className="flex flex-col gap-4 animate-[rd-plan-slide_0.35s_ease-out_both]">
      <div className="rounded-xl bg-gradient-to-r from-moss/[0.07] via-sage/40 to-transparent border border-moss/15 px-4 py-3.5">
        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-moss mb-1.5">
          Phase goal
        </p>
        <p className="text-[12px] sm:text-[13px] text-ink-2 leading-[1.65]">{phase.goal}</p>
      </div>

      <Section
        title="Supplement stack"
        subtitle="Daily nutraceutical protocol"
        icon={<Leaf size={16} />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SupplementColumn label="Morning" items={phase.supplementStack.morning} variant="morning" />
          <SupplementColumn label="Evening" items={phase.supplementStack.night} variant="night" />
        </div>
      </Section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Section title="Lifestyle" icon={<Leaf size={16} />}>
          <BulletList items={phase.lifestyleGuidance} />
        </Section>
        <Section title="Monitoring" icon={<Calendar size={16} />}>
          <BulletList items={phase.monitoring} />
        </Section>
      </div>

      <section className="rounded-xl border border-berry/20 bg-berry/[0.04] p-4">
        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-berry mb-3">
          Expected outcomes · {phase.weekRange}
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {phase.expectedBenefits.map((b, i) => (
            <div
              key={i}
              className="rounded-lg bg-white border border-line/40 px-3 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
            >
              <p className="text-[11px] font-medium text-ink leading-snug mb-1">{b.label}</p>
              <p className="text-[10px] text-muted">{b.timeline}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function RecoveryPlanCard({
  payload,
  onExplainProduct,
}: {
  payload: RecoveryPlanPayload;
  onExplainProduct: (rec: RecommendedProduct) => void;
}) {
  const [activePhase, setActivePhase] = useState(0);
  const phase = payload.phases[activePhase];
  const total = payload.phases.length;
  const touchStart = useRef<number | null>(null);
  const touchDelta = useRef(0);

  const goPhase = (index: number) => {
    setActivePhase(Math.max(0, Math.min(index, total - 1)));
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchDelta.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    touchDelta.current = e.touches[0].clientX - touchStart.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (Math.abs(touchDelta.current) < 48) {
      touchStart.current = null;
      return;
    }
    setActivePhase((prev) => {
      if (touchDelta.current < 0) return Math.min(prev + 1, total - 1);
      return Math.max(prev - 1, 0);
    });
    touchStart.current = null;
  }, [total]);

  return (
    <div
      className="w-full rounded-2xl border border-line/40 bg-gradient-to-b from-white to-paper/50 shadow-[0_4px_24px_rgba(26,38,89,0.06)] overflow-hidden animate-[rd-card-stagger_0.45s_ease-out_both]"
    >
      {/* Plan header */}
      <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b border-line/30 bg-white/80">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-moss to-moss-2 flex items-center justify-center shadow-[0_2px_8px_rgba(26,38,89,0.18)]">
            <Sparkle size={14} className="text-cream" />
          </span>
          <div>
            <h3 className="ff text-[15px] sm:text-[16px] font-semibold text-ink tracking-[-0.02em]">
              Your recovery plan
            </h3>
            <p className="text-[11px] text-muted">
              Personalised from your biomarker analysis
            </p>
          </div>
        </div>
      </div>

      <PlanOverview overview={payload.overview} />

      {/* Phase stepper */}
      <div className="px-3 sm:px-4 py-3 bg-paper/40 border-b border-line/25 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-2 min-w-max sm:min-w-0 sm:grid sm:grid-cols-3">
          {payload.phases.map((p, i) => {
            const active = i === activePhase;
            return (
              <button
                key={p.phaseNumber}
                type="button"
                onClick={() => goPhase(i)}
                className={`flex flex-col items-start text-left px-3 py-2.5 rounded-xl border transition-all cursor-pointer min-w-[140px] sm:min-w-0 ${
                  active
                    ? "bg-white border-moss/30 shadow-[0_2px_12px_rgba(26,38,89,0.08)] ring-1 ring-moss/15"
                    : "bg-transparent border-transparent hover:bg-white/60 hover:border-line/40"
                }`}
              >
                <span
                  className={`text-[9px] font-bold uppercase tracking-[0.1em] mb-1 ${
                    active ? "text-moss" : "text-muted"
                  }`}
                >
                  Phase {p.phaseNumber}
                </span>
                <span className={`ff text-[12px] font-semibold leading-tight mb-0.5 line-clamp-2 ${active ? "text-ink" : "text-ink-2"}`}>
                  {p.title}
                </span>
                <span className="text-[10px] text-muted">{p.weekRange}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phase body */}
      <div
        className="px-3 sm:px-4 py-4 sm:py-5"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-moss uppercase tracking-[0.08em]">
              Phase {phase.phaseNumber} of {total}
            </p>
            <h4 className="ff text-[17px] sm:text-[18px] font-semibold text-ink tracking-[-0.02em] leading-tight mt-0.5 truncate">
              {phase.title}
            </h4>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => goPhase(activePhase - 1)}
              disabled={activePhase === 0}
              aria-label="Previous phase"
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-line/50 bg-white text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-paper transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => goPhase(activePhase + 1)}
              disabled={activePhase === total - 1}
              aria-label="Next phase"
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-line/50 bg-white text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-paper transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <PhasePanel key={activePhase} phase={phase} />

        <p className="text-[10px] text-muted/70 text-center mt-4 sm:hidden">
          Swipe to change phase
        </p>
      </div>

      {payload.products.length > 0 ? (
        <div className="mx-3 sm:mx-4 mb-4 pt-4 border-t border-line/30">
          <p className="text-[10px] font-bold text-moss uppercase tracking-[0.1em] mb-3">
            Recommended treatments & products
          </p>
          <ProductRecommendation
            payload={{
              kind: "product-recommendations",
              intro:
                payload.productsIntro ??
                "Treatments and products that support your recovery protocol.",
              products: payload.products,
              wellnessPath: "health-check",
            }}
            onExplainProduct={onExplainProduct}
          />
        </div>
      ) : null}

      {/* Closing insight */}
      <div className="mx-3 sm:mx-4 mb-4 sm:mb-5 rounded-xl bg-ink text-cream px-4 py-4 flex gap-3">
        <span className="w-9 h-9 rounded-lg bg-butter/20 flex items-center justify-center shrink-0">
          <Sparkle size={16} className="text-butter" />
        </span>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-butter mb-1.5">
            VitalNow AI insight
          </p>
          <p className="text-[12px] text-cream/85 leading-[1.65]">{payload.closingMessage}</p>
        </div>
      </div>
    </div>
  );
}
