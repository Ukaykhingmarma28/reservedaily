"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Bolt, Brain, Dna, Droplet, Heart, Leaf, Search } from "@/components/ui/icons";

const DNA_SEGS = 60;
const DNA_WIDTH = 1800;
const DNA_AMP = 140;
const DNA_FREQ = 3.5;
const DNA_RUNG_STEP = 3;

function SpinningDNA() {
  const ref = useRef<SVGGElement>(null);
  const rungIndices = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i <= DNA_SEGS; i += DNA_RUNG_STEP) arr.push(i);
    return arr;
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const s1Segs = root.querySelectorAll("[data-s1]");
    const s2Segs = root.querySelectorAll("[data-s2]");
    const rungs = root.querySelectorAll("[data-rung]");
    const n1 = root.querySelectorAll("[data-n1]");
    const n2 = root.querySelectorAll("[data-n2]");
    const hi1 = root.querySelectorAll("[data-h1]");
    const hi2 = root.querySelectorAll("[data-h2]");

    let visible = true;
    const section = root.closest("svg")?.closest("section");
    const io = section
      ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: "100px" })
      : null;
    if (io && section) io.observe(section);

    let raf: number;
    const start = performance.now();
    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

    const tick = (now: number) => {
      if (!visible) { raf = requestAnimationFrame(tick); return; }
      const phase = ((now - start) / 1000) * 1.2;

      for (let i = 0; i < DNA_SEGS; i++) {
        const t1 = i / DNA_SEGS;
        const t2 = (i + 1) / DNA_SEGS;
        const a1 = t1 * Math.PI * DNA_FREQ * 2 + phase;
        const a2 = t2 * Math.PI * DNA_FREQ * 2 + phase;
        const x1 = t1 * DNA_WIDTH, x2 = t2 * DNA_WIDTH;
        const s1y1 = 500 + Math.sin(a1) * DNA_AMP, s1y2 = 500 + Math.sin(a2) * DNA_AMP;
        const s2y1 = 500 - Math.sin(a1) * DNA_AMP, s2y2 = 500 - Math.sin(a2) * DNA_AMP;
        const zMid1 = Math.cos((a1 + a2) / 2);
        const edgeFade = Math.sin(t1 * Math.PI);

        const d1 = (zMid1 + 1) / 2;
        const el1 = s1Segs[i];
        el1.setAttribute("x1", String(x1)); el1.setAttribute("y1", String(s1y1));
        el1.setAttribute("x2", String(x2)); el1.setAttribute("y2", String(s1y2));
        el1.setAttribute("stroke-width", String(1.2 + d1 * 4.5));
        el1.setAttribute("stroke", `rgb(${Math.round(lerp(30, 74, d1))},${Math.round(lerp(40, 93, d1))},${Math.round(lerp(22, 58, d1))})`);
        el1.setAttribute("opacity", String((0.3 + d1 * 0.7) * edgeFade));

        const d2 = (-zMid1 + 1) / 2;
        const el2 = s2Segs[i];
        el2.setAttribute("x1", String(x1)); el2.setAttribute("y1", String(s2y1));
        el2.setAttribute("x2", String(x2)); el2.setAttribute("y2", String(s2y2));
        el2.setAttribute("stroke-width", String(1.2 + d2 * 4.5));
        el2.setAttribute("stroke", `rgb(${Math.round(lerp(92, 201, d2))},${Math.round(lerp(74, 168, d2))},${Math.round(lerp(38, 90, d2))})`);
        el2.setAttribute("opacity", String((0.3 + d2 * 0.7) * edgeFade));
      }

      for (let k = 0; k < rungIndices.length; k++) {
        const idx = rungIndices[k];
        const t = idx / DNA_SEGS;
        const a = t * Math.PI * DNA_FREQ * 2 + phase;
        const x = t * DNA_WIDTH;
        const y1 = 500 + Math.sin(a) * DNA_AMP;
        const y2 = 500 - Math.sin(a) * DNA_AMP;
        const fade = Math.sin(t * Math.PI);
        const d = (Math.cos(a) + 1) / 2;

        const rung = rungs[k];
        rung.setAttribute("x1", String(x)); rung.setAttribute("y1", String(y1));
        rung.setAttribute("x2", String(x)); rung.setAttribute("y2", String(y2));
        rung.setAttribute("stroke-width", String(0.6 + d * 2));
        rung.setAttribute("opacity", String((0.12 + d * 0.55) * fade));

        const r = 2 + d * 5;
        const op = fade * (0.35 + d * 0.6);
        const node1 = n1[k];
        node1.setAttribute("cx", String(x)); node1.setAttribute("cy", String(y1)); node1.setAttribute("r", String(r));
        node1.setAttribute("opacity", String(op));
        node1.setAttribute("fill", `rgb(${Math.round(lerp(30, 74, d))},${Math.round(lerp(40, 93, d))},${Math.round(lerp(22, 58, d))})`);

        const d2n = 1 - d;
        const node2 = n2[k];
        node2.setAttribute("cx", String(x)); node2.setAttribute("cy", String(y2)); node2.setAttribute("r", String(2 + d2n * 5));
        node2.setAttribute("opacity", String(fade * (0.35 + d2n * 0.6)));
        node2.setAttribute("fill", `rgb(${Math.round(lerp(92, 201, d2n))},${Math.round(lerp(74, 168, d2n))},${Math.round(lerp(38, 90, d2n))})`);

        const h1El = hi1[k];
        if (d > 0.6) {
          h1El.setAttribute("cx", String(x - r * 0.35)); h1El.setAttribute("cy", String(y1 - r * 0.35));
          h1El.setAttribute("r", String(r * 0.35)); h1El.setAttribute("opacity", String(0.5 * d));
        } else h1El.setAttribute("opacity", "0");

        const r2 = 2 + d2n * 5;
        const h2El = hi2[k];
        if (d2n > 0.6) {
          h2El.setAttribute("cx", String(x - r2 * 0.35)); h2El.setAttribute("cy", String(y2 - r2 * 0.35));
          h2El.setAttribute("r", String(r2 * 0.35)); h2El.setAttribute("opacity", String(0.5 * d2n));
        } else h2El.setAttribute("opacity", "0");
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io?.disconnect(); };
  }, [rungIndices]);

  return (
    <g ref={ref}>
      <g>
        {Array.from({ length: DNA_SEGS }).map((_, i) => <line key={`s1-${i}`} data-s1="" strokeLinecap="round" />)}
        {Array.from({ length: DNA_SEGS }).map((_, i) => <line key={`s2-${i}`} data-s2="" strokeLinecap="round" />)}
      </g>
      {rungIndices.map((_, k) => <line key={`r-${k}`} data-rung="" stroke="#6a7a4a" strokeLinecap="round" />)}
      {rungIndices.map((_, k) => <circle key={`n1-${k}`} data-n1="" />)}
      {rungIndices.map((_, k) => <circle key={`n2-${k}`} data-n2="" />)}
      {rungIndices.map((_, k) => <circle key={`h1-${k}`} data-h1="" fill="#fff" />)}
      {rungIndices.map((_, k) => <circle key={`h2-${k}`} data-h2="" fill="#fff" />)}
    </g>
  );
}

type Concern = { name: string; count: number; match: string };
type Group = { group: string; short: string; Icon: React.ComponentType<{ size?: number }>; concerns: Concern[] };

const CLICKS_KEY = "rd-concern-clicks";

function getClickCounts(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(CLICKS_KEY) || "{}"); }
  catch { return {}; }
}

function trackClick(name: string) {
  const counts = getClickCounts();
  counts[name] = (counts[name] || 0) + 1;
  localStorage.setItem(CLICKS_KEY, JSON.stringify(counts));
}

const groups: Group[] = [
  {
    group: "Anti Aging & Aesthetics",
    short: "Anti Aging",
    Icon: Leaf,
    concerns: [
      { name: "Fine lines & wrinkles", count: 18, match: "HIFU · Collagen boosters" },
      { name: "Sagging skin", count: 14, match: "Luna Lift · Thread lift" },
      { name: "Dull complexion", count: 22, match: "Glow drips · Exosome facial" },
      { name: "Acne & scarring", count: 16, match: "Microneedling · PRP" },
      { name: "Pigmentation", count: 11, match: "Laser · Tranexamic IV" },
      { name: "Dark circles", count: 9, match: "Under-eye cell booster" },
    ],
  },
  {
    group: "Health Check & Body Insights",
    short: "Health Check",
    Icon: Droplet,
    concerns: [
      { name: "Annual health screening", count: 14, match: "Full blood panel" },
      { name: "Hormone imbalance", count: 12, match: "Male & female hormone panels" },
      { name: "Gut & digestion", count: 10, match: "Microbiome · Food sensitivity" },
      { name: "Heavy metal toxicity", count: 7, match: "Metal panel · Chelation review" },
      { name: "Genetic risk", count: 9, match: "DNA report · Carrier screening" },
      { name: "Cardiovascular health", count: 11, match: "Lipid · ApoB · Calcium score" },
    ],
  },
  {
    group: "Health Product & Supplements",
    short: "Supplements",
    Icon: Bolt,
    concerns: [
      { name: "Chronic fatigue", count: 21, match: "Adrenal stack · B-complex" },
      { name: "Low immunity", count: 19, match: "Vitamin C · Zinc · Elderberry" },
      { name: "Poor sleep", count: 17, match: "Magnesium · Melatonin · Glycine" },
      { name: "Brain & focus", count: 13, match: "Nootropics · Omega-3" },
      { name: "Skin & hair", count: 15, match: "Collagen · Biotin · Marine peptides" },
      { name: "Metabolism support", count: 12, match: "Berberine · Chromium · GLP-1" },
    ],
  },
  {
    group: "Mind & Mood Balance",
    short: "Mind & Mood",
    Icon: Brain,
    concerns: [
      { name: "Stress & burnout", count: 15, match: "Cortisol protocol · Coaching" },
      { name: "Anxiety", count: 12, match: "Mindfulness · Adaptogen IV" },
      { name: "Low mood", count: 10, match: "Ketamine clinic · SSRI review" },
      { name: "Cognitive decline", count: 9, match: "NAD+ · Cognitive panel" },
      { name: "Sleep anxiety", count: 11, match: "Sleep study · Magnesium IV" },
      { name: "Emotional reset", count: 7, match: "Coaching · Breathwork retreat" },
    ],
  },
  {
    group: "Pain Relief & Body Recovery",
    short: "Pain & Recovery",
    Icon: Heart,
    concerns: [
      { name: "Joint pain", count: 14, match: "PRP injection · Exosome joint" },
      { name: "Muscle recovery", count: 18, match: "Cryotherapy · Recovery drip" },
      { name: "Back & posture", count: 11, match: "Deep tissue · Shockwave" },
      { name: "Weight management", count: 13, match: "Body contouring · GLP-1" },
      { name: "Sports performance", count: 16, match: "Performance IV · Screening" },
      { name: "Post-surgery care", count: 8, match: "Regen IV · Lymphatic drainage" },
    ],
  },
  {
    group: "Regen & Functional Care",
    short: "Regen Care",
    Icon: Dna,
    concerns: [
      { name: "Cellular repair", count: 12, match: "Exosome IV · Stem cell" },
      { name: "Longevity & NAD+", count: 14, match: "NAD+ push · Longevity panel" },
      { name: "Hair regeneration", count: 10, match: "PRP scalp · Exosome hair" },
      { name: "Joint & tissue repair", count: 9, match: "PRF joint · Peptides" },
      { name: "Skin regeneration", count: 15, match: "Exosome facial · Microneedling" },
      { name: "Hormone optimisation", count: 8, match: "TRT · Peptide stack" },
    ],
  },
];

export function ShopByConcern() {
  const [sortedConcerns, setSortedConcerns] = useState<Concern[]>(() =>
    groups.flatMap((g) => g.concerns)
  );
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const counts = getClickCounts();
    if (Object.keys(counts).length > 0) {
      const all = groups.flatMap((g) => g.concerns);
      all.sort((a, b) => (counts[b.name] || 0) - (counts[a.name] || 0));
      setSortedConcerns(all);
    }
    setIsMobile(window.innerWidth < 1024);
  }, []);

  const filtered = query.trim()
    ? sortedConcerns.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.match.toLowerCase().includes(query.toLowerCase())
      )
    : sortedConcerns;

  const displayed = filtered.slice(0, 18);

  return (
    <section className="relative bg-cream border-b border-line-2 overflow-hidden">
      <svg
        aria-hidden
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-55 pointer-events-none"
      >
        <defs>
          <linearGradient id="dnaFadeX" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="15%" stopColor="#fff" stopOpacity="1" />
            <stop offset="85%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="dnaFadeMask">
            <rect x="0" y="0" width="1800" height="1000" fill="url(#dnaFadeX)" />
          </mask>
        </defs>
        <g transform="translate(800 500) rotate(-30) translate(-900 -500)">
          <g mask="url(#dnaFadeMask)">
            <SpinningDNA />
          </g>
        </g>
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} cx={150 + i * 140} cy={450} r="2" fill="#4a5d3a" opacity="0.5">
            <animate attributeName="cy" values={`${100 + (i * 70) % 700};${100 + ((i * 70 + 400) % 700)};${100 + (i * 70) % 700}`} dur={`${10 + (i % 5)}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.6;0" dur={`${10 + (i % 5)}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      <div className="relative z-[1] max-w-[1400px] mx-auto px-6 md:px-10 py-8 lg:py-20">
        <div className="flex flex-col items-center text-center mb-5 lg:mb-12 gap-3 lg:gap-6">
          <h2
            className="ff text-[22px] lg:text-[clamp(38px,4vw,58px)] font-normal text-ink tracking-[-0.025em] leading-[1.1]"
          >
            What&apos;s on your mind?
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            <span className="ff text-moss">We&apos;ll show you the path.</span>
          </h2>

          <div className="flex items-center bg-paper border border-line px-3 py-2.5 lg:px-6 lg:py-4 gap-2 lg:gap-3 w-full max-w-[680px] shadow-sm focus-within:border-moss transition-colors">
            <span className="text-muted">
              <Search size={18} />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. hair loss, anxiety, joint pain..."
              className="flex-1 border-none bg-transparent outline-none text-base lg:text-sm text-ink placeholder:text-muted"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-muted hover:text-ink bg-transparent border-none cursor-pointer text-lg leading-none p-0"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-[10px] lg:text-xs text-muted font-semibold tracking-[0.12em] uppercase mb-3 lg:mb-4">
            {query ? `${filtered.length} results` : "Popular"}
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 lg:gap-2.5 max-w-[900px]">
            {filtered.slice(0, query ? 18 : isMobile ? 8 : 18).map((c) => (
              <a
                key={c.name}
                href="#"
                onClick={() => trackClick(c.name)}
                className="inline-flex items-center gap-1 lg:gap-2 px-3 py-2 lg:px-5 lg:py-3 bg-paper border border-line text-[12px] lg:text-sm font-medium text-ink no-underline whitespace-nowrap transition-all hover:border-moss hover:bg-sage/40 hover:shadow-sm"
              >
                {c.name}
                <span className="hidden lg:inline text-[11px] text-muted font-normal">{c.count}</span>
              </a>
            ))}
          </div>

          <div className="mt-4 lg:mt-8 flex justify-center">
            <a
              href="#"
              className="text-[12px] lg:text-[13px] text-ink font-semibold no-underline border-b border-ink pb-0.5 flex items-center gap-2 hover:text-moss hover:border-moss transition-colors"
            >
              VIEW ALL CONCERNS <ArrowRight />
            </a>
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-muted mt-2">No concerns match your search. Try a different term.</p>
          )}
        </div>
      </div>
    </section>
  );
}
