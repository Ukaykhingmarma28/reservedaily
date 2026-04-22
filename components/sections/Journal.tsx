"use client";

import { useRef } from "react";
import { PlaceholderArt } from "@/components/illustrations/PlaceholderArt";
import type { JournalPost } from "@/lib/data";

const posts: JournalPost[] = [
  {
    cat: "Longevity",
    t: "The case for annual full-body MRI, quietly made.",
    d: "What a screening-first clinic in Penang told us about catching things early, and the questions every patient should ask.",
    read: "6 min", date: "Apr 14, 2026", author: "Dr. Aminah Ismail", art: "rings",
  },
  {
    cat: "Recovery",
    t: "NAD+ protocols: hype, science, and what actually moves the needle.",
    d: "Four physicians across KL and Singapore compare notes. The answers are more nuanced than the marketing.",
    read: "9 min", date: "Apr 08, 2026", author: "Rafael Tan", art: "pulse",
  },
  {
    cat: "Vital AI",
    t: "Your blood work, translated, a field guide to the numbers that matter.",
    d: "How to read a CBC panel without a medical degree. What to flag, what to ignore, and when to re-test.",
    read: "12 min", date: "Apr 02, 2026", author: "Priya Sundaram", art: "page",
  },
  {
    cat: "Skin",
    t: "HIFU vs. Thermage vs. RF Microneedling, a 2026 buyer's guide.",
    d: "The tools behind tightening treatments, who they actually work on, and what to expect in month one.",
    read: "8 min", date: "Mar 26, 2026", author: "Dr. Lena Wong", art: "weave",
  },
  {
    cat: "Nutrition",
    t: "Creatine isn't just for lifters. The evidence for everyone else.",
    d: "Twenty years of trials. Here is what the data says about cognition, bone density, and the over-40 case.",
    read: "7 min", date: "Mar 19, 2026", author: "Marcus Chen", art: "grid",
  },
  {
    cat: "Sleep",
    t: "The 9pm problem, why Malaysian professionals sleep worst.",
    d: "Ambient temperature, blue light, and ring data from 1,200 KL members paints a surprising picture.",
    read: "10 min", date: "Mar 12, 2026", author: "Dr. Jason Tan", art: "wave",
  },
];

export function Journal() {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="py-14 lg:py-24 px-6 md:px-10 bg-paper border-b border-line-2">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-4 lg:gap-10 mb-6 lg:mb-10">
          <div className="max-w-[720px]">
            <div className="flex items-center gap-3 text-[11px] text-moss tracking-[0.18em] uppercase font-semibold mb-3 lg:mb-4">
              <span className="w-6 h-px bg-moss" />
              Our journal
            </div>
            <h2
              className="ff text-[clamp(28px,7vw,38px)] lg:text-[clamp(40px,4vw,58px)] font-normal tracking-[-0.025em] leading-tight text-ink text-balance m-0"
            >
              Field notes on <span className="ff text-moss">feeling better</span>.
            </h2>
          </div>
          <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-5">
            <a
              href="#"
              className="text-[11px] lg:text-xs text-ink tracking-[0.08em] uppercase font-semibold no-underline border-b border-ink pb-[3px]"
            >
              Browse archive
            </a>
            <div className="flex gap-2">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Previous"
                className="w-9 h-9 lg:w-11 lg:h-11 border border-ink bg-transparent text-ink cursor-pointer flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Next"
                className="w-9 h-9 lg:w-11 lg:h-11 border border-ink bg-ink text-cream cursor-pointer flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={railRef}
          className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[minmax(320px,360px)] gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((p, i) => (
            <a
              key={i}
              href="#"
              className="snap-start flex flex-col no-underline text-inherit bg-cream border border-line-2 overflow-hidden transition-all duration-200 hover:border-ink hover:-translate-y-0.5"
            >
              <div className="aspect-[4/2.6] border-b border-line-2 overflow-hidden">
                <PlaceholderArt kind={p.art} />
              </div>
              <div className="p-4 lg:p-5 pb-5 lg:pb-6 flex flex-col gap-2.5 lg:gap-3.5 flex-1">
                <div className="flex items-center gap-2.5 text-[10px] text-moss tracking-[0.14em] uppercase font-semibold">
                  <span>{p.cat}</span>
                  <span className="text-line">·</span>
                  <span className="text-ink-2 tracking-[0.04em] normal-case font-medium">{p.read} read</span>
                </div>
                <h3
                  className="ff text-[17px] lg:text-xl font-normal tracking-[-0.02em] leading-[1.2] text-ink text-balance m-0"
                >
                  {p.t}
                </h3>
                <p className="text-[12px] lg:text-[13px] text-ink-2 leading-[1.55] m-0 line-clamp-2 lg:line-clamp-3">{p.d}</p>
                <div className="mt-auto pt-3 lg:pt-3.5 border-t border-line-2 flex justify-between items-center text-[10px] lg:text-[11px] text-muted">
                  <span className="ff text-[12px] lg:text-[13px] text-ink">{p.author}</span>
                  <span>{p.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
