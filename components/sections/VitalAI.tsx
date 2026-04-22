"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";

type Marker = { name: string; value: string; tag: string; tone: "warn" | "soft" | "ok" };

const markers: Marker[] = [
  { name: "Vitamin D", value: "18 ng/mL", tag: "Deficient", tone: "warn" },
  { name: "hs-CRP", value: "4.2 mg/L", tag: "Elevated", tone: "warn" },
  { name: "Ferritin", value: "62 ng/mL", tag: "Low-optimal", tone: "soft" },
  { name: "HbA1c", value: "5.2 %", tag: "Optimal", tone: "ok" },
  { name: "TSH", value: "1.8 mIU/L", tag: "Optimal", tone: "ok" },
];

const toneColors = {
  warn: { bg: "#f5e6de", color: "#8a3a1a", dot: "#b85c2e" },
  soft: { bg: "#f5ecd0", color: "#7a5a10", dot: "#c9a85a" },
  ok: { bg: "#e6ede0", color: "#3e5030", dot: "#4a5d3a" },
};

const steps = [
  { n: "01", t: "Upload", d: "Any blood report, PDF, image, or clinic email. We parse it in seconds." },
  { n: "02", t: "Analyse", d: "Vital AI scores every biomarker, detecting what's optimal, low-optimal, or out of range." },
  { n: "03", t: "Match", d: "A personalised care protocol, treatments, supplements, providers, ranked by fit and price." },
];

export function VitalAI() {
  const [step, setStep] = useState(0);
  const touchRef = useRef<number | null>(null);

  const goStep = (n: number) => setStep((n + steps.length) % steps.length);

  return (
    <section id="vital" className="bg-cream py-14 lg:py-24 px-6 md:px-10 border-b border-line-2 relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5 lg:gap-[60px] items-end mb-8 lg:mb-14">
          <div>
            <div className="flex items-center gap-3 text-[11px] text-moss tracking-[0.18em] uppercase font-semibold mb-4 lg:mb-[22px]">
              <span className="w-6 h-px bg-moss" />
              Vital AI · Exclusive to Reserve Daily
            </div>
            <h2
              className="ff text-[clamp(28px,7vw,38px)] lg:text-[clamp(42px,4.6vw,68px)] font-normal leading-[0.98] tracking-[-0.025em] text-ink m-0"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              Upload your blood.
              <br />
              Receive a <span className="ff text-moss">plan</span>,<br />
              not a diagnosis.
            </h2>
          </div>
          <p className="text-sm lg:text-base leading-[1.65] text-ink-2 max-w-[460px]">
            Vital AI reads your biomarkers through a <em className="ff text-moss">functional medicine</em>{" "}
            lens, flagging suboptimal ranges, not just abnormal ones, and matches you to the right clinics,
            treatments, and supplements at the best prices in Malaysia.
          </p>
        </div>

        {/* Mobile: swipeable step cards + dark biomarker panel */}
        <div className="lg:hidden flex flex-col gap-4">
          <div
            className="border border-line-2 bg-paper p-6 relative"
            onTouchStart={(e) => { touchRef.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchRef.current == null) return;
              const dx = e.changedTouches[0].clientX - touchRef.current;
              if (Math.abs(dx) > 40) goStep(dx < 0 ? step + 1 : step - 1);
              touchRef.current = null;
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] text-muted tracking-[0.16em] uppercase font-semibold">
                How it works
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => goStep(step - 1)}
                  aria-label="Previous step"
                  className="w-8 h-8 border border-line bg-transparent text-ink cursor-pointer flex items-center justify-center"
                >
                  <span className="rotate-180 flex"><ArrowRight /></span>
                </button>
                <span className="text-[11px] text-muted tracking-[0.1em] font-medium">
                  {String(step + 1).padStart(2, "0")} / 03
                </span>
                <button
                  onClick={() => goStep(step + 1)}
                  aria-label="Next step"
                  className="w-8 h-8 border border-line bg-transparent text-ink cursor-pointer flex items-center justify-center"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
            <div className="ff text-[28px] text-moss font-normal tracking-[-0.02em] mb-1">{steps[step].n}</div>
            <h3 className="ff text-xl font-medium text-ink tracking-[-0.01em] mb-2">{steps[step].t}</h3>
            <p className="text-[13px] leading-[1.6] text-ink-2 m-0">{steps[step].d}</p>
            <div className="flex gap-1.5 mt-5">
              {steps.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setStep(k)}
                  aria-label={`Step ${k + 1}`}
                  className={`border-none p-0 cursor-pointer h-0.5 transition-all duration-300 ${
                    k === step ? "w-8 bg-moss" : "w-3 bg-line"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-ink text-cream p-6 border border-ink">
            <div className="flex justify-between items-baseline mb-5">
              <div className="text-[10px] text-butter tracking-[0.18em] uppercase font-semibold">Sample analysis</div>
              <div className="text-[10px] text-cream/50 tracking-[0.1em]">N. CHEN · APR 2026</div>
            </div>

            <h3 className="ff text-xl font-normal text-cream tracking-[-0.01em] mb-4 leading-tight">
              <span className="ff text-butter">Biomarker</span> snapshot
            </h3>

            <div className="flex flex-col gap-3 mb-5">
              {markers.map((m) => {
                const ts = toneColors[m.tone];
                return (
                  <div key={m.name} className="flex items-center justify-between pb-3 border-b border-cream/10">
                    <div className="flex items-center gap-2.5">
                      <span className="w-[7px] h-[7px] rounded-full inline-block shrink-0" style={{ background: ts.dot }} />
                      <span className="ff text-sm text-cream">{m.name}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] text-cream/60">{m.value}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 tracking-[0.02em]" style={{ background: ts.bg, color: ts.color }}>
                        {m.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-cream/15 pt-4 mb-6">
              <div className="flex items-center gap-2.5 text-[10px] text-butter tracking-[0.16em] uppercase font-semibold mb-3">
                <span className="w-4 h-px bg-butter" />
                Matched protocol
              </div>
              <div className="flex justify-between items-end gap-3">
                <div>
                  <div className="ff text-[16px] text-cream tracking-[-0.01em] mb-1 leading-snug">
                    Vit-D Infusion <span className="text-cream/40">+</span> Anti-inflammatory IV
                  </div>
                  <div className="text-[11px] text-cream/55">3 treatments · 2 supplements · KL & Penang</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[9px] text-cream/50 tracking-[0.12em] mb-0.5">FROM</div>
                  <div className="ff text-xl text-butter tracking-[-0.01em]">RM 280</div>
                </div>
              </div>
            </div>

            <button className="w-full bg-butter text-ink border-none py-3.5 text-xs font-semibold tracking-[0.08em] cursor-pointer flex items-center justify-center gap-2.5">
              TRY VITAL AI, FREE <ArrowRight />
            </button>
          </div>
        </div>

        {/* Desktop: original two-panel grid */}
        <div className="hidden lg:grid grid-cols-[1.1fr_1fr] border border-line-2 bg-paper">
          <div className="p-14 bg-paper border-r border-line-2">
            <div className="text-[10px] text-muted tracking-[0.16em] uppercase font-semibold mb-8">
              How it works · Three steps
            </div>
            <div className="flex flex-col gap-8">
              {steps.map((s) => (
                <div key={s.n} className="grid grid-cols-[64px_1fr] gap-5 items-baseline pb-6 border-b border-line-2">
                  <div className="ff text-[32px] text-moss font-normal tracking-[-0.02em]">{s.n}</div>
                  <div>
                    <h3 className="ff text-[22px] font-medium text-ink tracking-[-0.01em] mb-1.5">{s.t}</h3>
                    <p className="text-[13px] leading-[1.6] text-ink-2">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2.5 mt-9">
              <button className="bg-ink text-cream border-none px-6 py-3.5 text-xs font-semibold tracking-[0.08em] cursor-pointer flex items-center gap-2.5">
                TRY VITAL AI, FREE <ArrowRight />
              </button>
              <button className="bg-transparent text-ink border border-ink px-5 py-3 text-xs font-medium tracking-[0.08em] cursor-pointer">
                HOW IT WORKS
              </button>
            </div>
          </div>

          <div className="p-14 bg-ink text-cream relative">
            <div className="flex justify-between items-baseline mb-7">
              <div className="text-[10px] text-butter tracking-[0.18em] uppercase font-semibold">Sample analysis</div>
              <div className="text-[10px] text-cream/50 tracking-[0.1em]">N. CHEN · APR 2026</div>
            </div>

            <h3 className="ff text-[26px] font-normal text-cream tracking-[-0.01em] mb-6 leading-tight">
              <span className="ff text-butter">Biomarker</span> snapshot
            </h3>

            <div className="flex flex-col gap-3.5 mb-7">
              {markers.map((m) => {
                const ts = toneColors[m.tone];
                return (
                  <div key={m.name} className="flex items-center justify-between pb-3 border-b border-cream/10">
                    <div className="flex items-center gap-3">
                      <span className="w-[7px] h-[7px] rounded-full inline-block" style={{ background: ts.dot }} />
                      <span className="ff text-base text-cream">{m.name}</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <span className="text-xs text-cream/60">{m.value}</span>
                      <span className="text-[10.5px] font-semibold px-2.5 py-0.5 tracking-[0.02em]" style={{ background: ts.bg, color: ts.color }}>
                        {m.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-cream/15 pt-5">
              <div className="flex items-center gap-2.5 text-[10px] text-butter tracking-[0.16em] uppercase font-semibold mb-3">
                <span className="w-4 h-px bg-butter" />
                Matched protocol
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-4 items-end">
                <div>
                  <div className="ff text-[19px] text-cream tracking-[-0.01em] mb-1 leading-snug">
                    Vit-D Infusion <span className="text-cream/40">+</span> Anti-inflammatory IV
                  </div>
                  <div className="text-xs text-cream/55">3 treatments · 2 supplements · KL & Penang</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-cream/50 tracking-[0.12em] mb-0.5">FROM</div>
                  <div className="ff text-2xl text-butter tracking-[-0.01em]">RM 280</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
