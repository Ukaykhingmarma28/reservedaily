"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { ProductCard } from "./ProductCard";
import { getProductsBySection } from "@/lib/products";

const items = getProductsBySection("featured-apothecary");

const filters = [
  "Anti Aging & Aesthetics",
  "Health Check & Body Insights",
  "Health Product & Supplements",
  "Mind & Mood Balance",
  "Pain Relief & Body Recovery",
  "Regen & Functional Care",
];

const shortLabels: Record<string, string> = {
  "Anti Aging & Aesthetics": "Anti Aging",
  "Health Check & Body Insights": "Health Check",
  "Health Product & Supplements": "Supplements",
  "Mind & Mood Balance": "Mind & Mood",
  "Pain Relief & Body Recovery": "Pain Relief",
  "Regen & Functional Care": "Regen & Care",
};

export function FeaturedApothecary() {
  const [cat, setCat] = useState(filters[0]);
  const filtered = items.filter((p) => p.category === cat).slice(0, 8);

  return (
    <section className="py-14 lg:py-24 px-6 md:px-10 border-b border-line-2">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-8 gap-10 flex-wrap">
          <div>
            <div className="flex items-center gap-3 text-[11px] text-moss tracking-[0.18em] uppercase font-semibold mb-3 lg:mb-4">
              <span className="w-6 h-px bg-moss" />
              Apothecary · MOH-registered
            </div>
            <h2
              className="ff text-[clamp(28px,7vw,38px)] lg:text-[clamp(34px,3.5vw,48px)] font-normal text-ink tracking-[-0.02em] leading-[1.05] mb-2.5"
            >
              Doctor-certified <span className="ff">supplements.</span>
            </h2>
            <p className="text-sm text-ink-2 leading-[1.5] m-0 max-w-[560px]">
              Formulated with physicians, third-party tested. Filter by the outcome you&apos;re after.
            </p>
          </div>
        </div>

        {/* Mobile filter — styled dropdown */}
        <div className="mb-6 lg:hidden">
          <div className="relative">
            <div className="flex items-center justify-between border border-line bg-paper px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-moss" />
                <span className="text-[13px] text-ink tracking-[0.02em]">{shortLabels[cat]}</span>
              </div>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-ink/40">
                <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
              {filters.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop filters — original rectangular pills */}
        <div className="hidden lg:flex gap-2 flex-wrap mb-8 pb-6 border-b border-line-2">
          {filters.map((t) => {
            const active = t === cat;
            const count = items.filter((p) => p.category === t).length;
            return (
              <button
                key={t}
                onClick={() => setCat(t)}
                className={`px-4 py-2.5 text-xs font-medium cursor-pointer tracking-[0.02em] flex items-center gap-2 border transition-colors ${
                  active ? "bg-ink text-cream border-ink" : "bg-transparent text-ink border-line hover:border-ink"
                }`}
              >
                {t}
                <span className="text-[10px] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {filtered.map((p, i) => (
            <ProductCard key={`${cat}-${i}`} p={p} />
          ))}
        </div>

        <div className="mt-8 lg:mt-10 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-3.5 border border-ink text-ink text-xs lg:text-sm font-semibold tracking-[0.08em] uppercase no-underline transition-colors hover:bg-ink hover:text-cream"
          >
            View all {shortLabels[cat]} <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
