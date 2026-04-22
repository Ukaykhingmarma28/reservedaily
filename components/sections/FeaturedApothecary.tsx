"use client";

import { useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/data";

const items: Product[] = [
  {
    category: "Health Product & Supplements", type: "physical", tag: "Bestseller", name: "Liposomal Vitamin C",
    provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 412, size: "60 caps",
    art: "droplet", color: "#1a2659", variationLabel: "Count",
    variations: [
      { label: "60 caps", meta: "60 caps · 1000mg", price: "RM 149" },
      { label: "120 caps", meta: "120 caps · 1000mg", price: "RM 249" },
    ],
  },
  {
    category: "Regen & Functional Care", type: "physical", tag: "Staff Pick", name: "NMN + Resveratrol",
    provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.9, reviews: 287, size: "60 caps",
    art: "cell", color: "#1a2659", variationLabel: "Strength",
    variations: [
      { label: "250 mg", meta: "60 caps · 250mg", price: "RM 289" },
      { label: "500 mg", meta: "60 caps · 500mg", price: "RM 489" },
    ],
  },
  {
    category: "Anti Aging & Aesthetics", type: "physical", tag: "New", name: "Marine Collagen Peptides",
    provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 184, size: "250g",
    art: "leaf", color: "#f0a028", variationLabel: "Flavour",
    variations: [
      { label: "Unflavoured", meta: "250g · 25 servings", price: "RM 139" },
      { label: "Yuzu", meta: "250g · 25 servings", price: "RM 149" },
    ],
  },
  {
    category: "Mind & Mood Balance", type: "physical", tag: "Bestseller", name: "Magnesium Glycinate",
    provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 186, size: "90 caps",
    art: "droplet", color: "#f0a028", variationLabel: "Count",
    variations: [
      { label: "60 caps", meta: "60 caps · 400mg", price: "RM 89" },
      { label: "90 caps", meta: "90 caps · 400mg", price: "RM 119" },
    ],
  },
  {
    category: "Health Product & Supplements", type: "physical", tag: "Featured", name: "Vitamin D3 + K2 Drops",
    provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.9, reviews: 421, size: "30ml",
    art: "droplet", color: "#1a2659", variationLabel: "Strength",
    variations: [
      { label: "2,000 IU", meta: "30ml · 2,000 IU/drop", price: "RM 79" },
      { label: "5,000 IU", meta: "30ml · 5,000 IU/drop", price: "RM 119" },
    ],
  },
  {
    category: "Health Check & Body Insights", type: "physical", tag: "New", name: "Myo-Inositol Powder",
    provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 312, size: "300g",
    art: "leaf", color: "#1a2659", variationLabel: "Size",
    variations: [
      { label: "150g", meta: "150g · 30 servings", price: "RM 89" },
      { label: "300g", meta: "300g · 60 servings", price: "RM 149" },
    ],
  },
  {
    category: "Regen & Functional Care", type: "physical", tag: "Staff Pick", name: "Liposomal Glutathione",
    provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 211, size: "60 caps",
    art: "droplet", color: "#1a2659", variationLabel: "Count",
    variations: [
      { label: "30 caps", meta: "30 caps · 500mg", price: "RM 179" },
      { label: "60 caps", meta: "60 caps · 500mg", price: "RM 299" },
    ],
  },
  {
    category: "Anti Aging & Aesthetics", type: "physical", tag: "Bestseller", name: "Centella Recovery Mask",
    provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 534, size: "5 sheets",
    art: "leaf", color: "#1a2659", variationLabel: "Pack",
    variations: [
      { label: "5 sheets", meta: "5 sheets · 25ml ea.", price: "RM 89" },
      { label: "10 sheets", meta: "10 sheets · 25ml ea.", price: "RM 159" },
    ],
  },
];

const filters = [
  "All",
  "Anti Aging & Aesthetics",
  "Health Check & Body Insights",
  "Health Product & Supplements",
  "Mind & Mood Balance",
  "Pain Relief & Body Recovery",
  "Regen & Functional Care",
];

const shortLabels: Record<string, string> = {
  "All": "All",
  "Anti Aging & Aesthetics": "Anti Aging",
  "Health Check & Body Insights": "Health Check",
  "Health Product & Supplements": "Supplements",
  "Mind & Mood Balance": "Mind & Mood",
  "Pain Relief & Body Recovery": "Pain Relief",
  "Regen & Functional Care": "Regen & Care",
};

export function FeaturedApothecary() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? items : items.filter((p) => p.category === cat);

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
                <span className="text-[13px] text-ink tracking-[0.02em]">{cat === "All" ? "All categories" : shortLabels[cat]}</span>
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
            const count = t === "All" ? items.length : items.filter((p) => p.category === t).length;
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
      </div>
    </section>
  );
}
