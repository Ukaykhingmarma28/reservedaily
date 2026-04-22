"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/data";

const items: Product[] = [
  // Anti Aging & Aesthetics (8)
  { category: "Anti Aging & Aesthetics", type: "physical", tag: "New", name: "Marine Collagen Peptides", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 184, size: "250g", art: "leaf", color: "#f0a028", variationLabel: "Flavour", variations: [{ label: "Unflavoured", meta: "250g · 25 servings", price: "RM 139" }, { label: "Yuzu", meta: "250g · 25 servings", price: "RM 149" }] },
  { category: "Anti Aging & Aesthetics", type: "physical", tag: "Bestseller", name: "Centella Recovery Mask", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 534, size: "5 sheets", art: "leaf", color: "#1a2659", variationLabel: "Pack", variations: [{ label: "5 sheets", meta: "5 sheets · 25ml ea.", price: "RM 89" }, { label: "10 sheets", meta: "10 sheets · 25ml ea.", price: "RM 159" }] },
  { category: "Anti Aging & Aesthetics", type: "physical", tag: "Staff Pick", name: "Retinol Night Serum", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.9, reviews: 321, size: "30ml", art: "droplet", color: "#1a2659", variationLabel: "Strength", variations: [{ label: "0.3%", meta: "30ml · Beginner", price: "RM 119" }, { label: "0.5%", meta: "30ml · Advanced", price: "RM 149" }] },
  { category: "Anti Aging & Aesthetics", type: "physical", tag: "Featured", name: "Hyaluronic Acid Booster", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 267, size: "30ml", art: "droplet", color: "#f0a028", variationLabel: "Size", variations: [{ label: "15ml", meta: "15ml · Travel", price: "RM 69" }, { label: "30ml", meta: "30ml · Full", price: "RM 109" }] },
  { category: "Anti Aging & Aesthetics", type: "physical", tag: "New", name: "Peptide Eye Cream", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.6, reviews: 142, size: "15ml", art: "cell", color: "#1a2659", price: "RM 99" },
  { category: "Anti Aging & Aesthetics", type: "physical", tag: "Bestseller", name: "Niacinamide Glow Toner", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 389, size: "200ml", art: "leaf", color: "#148c50", variationLabel: "Size", variations: [{ label: "100ml", meta: "100ml", price: "RM 59" }, { label: "200ml", meta: "200ml", price: "RM 89" }] },
  { category: "Anti Aging & Aesthetics", type: "physical", tag: "Staff Pick", name: "Exosome Brightening Ampoule", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.9, reviews: 98, size: "5ml × 4", art: "cell", color: "#1a2659", price: "RM 249" },
  { category: "Anti Aging & Aesthetics", type: "physical", tag: "Featured", name: "Sunscreen SPF50+ PA++++", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 612, size: "50ml", art: "droplet", color: "#f0a028", price: "RM 79" },

  // Health Check & Body Insights (8)
  { category: "Health Check & Body Insights", type: "physical", tag: "New", name: "Myo-Inositol Powder", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 312, size: "300g", art: "leaf", color: "#1a2659", variationLabel: "Size", variations: [{ label: "150g", meta: "150g · 30 servings", price: "RM 89" }, { label: "300g", meta: "300g · 60 servings", price: "RM 149" }] },
  { category: "Health Check & Body Insights", type: "physical", tag: "Bestseller", name: "Omega-3 Fish Oil", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.9, reviews: 478, size: "120 caps", art: "droplet", color: "#1a2659", variationLabel: "Count", variations: [{ label: "60 caps", meta: "60 caps · 1000mg", price: "RM 89" }, { label: "120 caps", meta: "120 caps · 1000mg", price: "RM 149" }] },
  { category: "Health Check & Body Insights", type: "physical", tag: "Staff Pick", name: "CoQ10 Ubiquinol", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 203, size: "60 caps", art: "cell", color: "#f0a028", variationLabel: "Strength", variations: [{ label: "100mg", meta: "60 caps · 100mg", price: "RM 139" }, { label: "200mg", meta: "60 caps · 200mg", price: "RM 219" }] },
  { category: "Health Check & Body Insights", type: "physical", tag: "Featured", name: "Liver Support Complex", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 167, size: "90 caps", art: "leaf", color: "#148c50", price: "RM 109" },
  { category: "Health Check & Body Insights", type: "physical", tag: "New", name: "Iron + Vitamin C Gummies", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.6, reviews: 234, size: "60 gummies", art: "droplet", color: "#f0a028", price: "RM 59" },
  { category: "Health Check & Body Insights", type: "physical", tag: "Bestseller", name: "Probiotic 50 Billion CFU", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 356, size: "30 caps", art: "cell", color: "#1a2659", variationLabel: "Strain", variations: [{ label: "Women", meta: "30 caps · 50B CFU", price: "RM 119" }, { label: "Men", meta: "30 caps · 50B CFU", price: "RM 119" }] },
  { category: "Health Check & Body Insights", type: "physical", tag: "Staff Pick", name: "Electrolyte Hydration Mix", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 289, size: "30 sachets", art: "droplet", color: "#1a2659", price: "RM 69" },
  { category: "Health Check & Body Insights", type: "physical", tag: "Featured", name: "Spirulina Tablets", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.6, reviews: 178, size: "120 tabs", art: "leaf", color: "#148c50", price: "RM 49" },

  // Health Product & Supplements (8)
  { category: "Health Product & Supplements", type: "physical", tag: "Bestseller", name: "Liposomal Vitamin C", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 412, size: "60 caps", art: "droplet", color: "#1a2659", variationLabel: "Count", variations: [{ label: "60 caps", meta: "60 caps · 1000mg", price: "RM 149" }, { label: "120 caps", meta: "120 caps · 1000mg", price: "RM 249" }] },
  { category: "Health Product & Supplements", type: "physical", tag: "Featured", name: "Vitamin D3 + K2 Drops", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.9, reviews: 421, size: "30ml", art: "droplet", color: "#1a2659", variationLabel: "Strength", variations: [{ label: "2,000 IU", meta: "30ml · 2,000 IU/drop", price: "RM 79" }, { label: "5,000 IU", meta: "30ml · 5,000 IU/drop", price: "RM 119" }] },
  { category: "Health Product & Supplements", type: "physical", tag: "New", name: "Zinc + Quercetin Complex", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 198, size: "60 caps", art: "cell", color: "#f0a028", price: "RM 69" },
  { category: "Health Product & Supplements", type: "physical", tag: "Staff Pick", name: "Elderberry Syrup", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 345, size: "240ml", art: "leaf", color: "#148c50", variationLabel: "Size", variations: [{ label: "120ml", meta: "120ml · 24 servings", price: "RM 59" }, { label: "240ml", meta: "240ml · 48 servings", price: "RM 99" }] },
  { category: "Health Product & Supplements", type: "physical", tag: "Bestseller", name: "B-Complex Active", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 267, size: "60 caps", art: "droplet", color: "#1a2659", price: "RM 59" },
  { category: "Health Product & Supplements", type: "physical", tag: "Featured", name: "Berberine 500mg", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.9, reviews: 156, size: "60 caps", art: "cell", color: "#1a2659", variationLabel: "Count", variations: [{ label: "60 caps", meta: "60 caps · 500mg", price: "RM 99" }, { label: "120 caps", meta: "120 caps · 500mg", price: "RM 169" }] },
  { category: "Health Product & Supplements", type: "physical", tag: "New", name: "Turmeric Curcumin C3", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.6, reviews: 213, size: "90 caps", art: "leaf", color: "#f0a028", price: "RM 79" },
  { category: "Health Product & Supplements", type: "physical", tag: "Staff Pick", name: "Digestive Enzyme Blend", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 189, size: "60 caps", art: "droplet", color: "#1a2659", price: "RM 89" },

  // Mind & Mood Balance (8)
  { category: "Mind & Mood Balance", type: "physical", tag: "Bestseller", name: "Magnesium Glycinate", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 186, size: "90 caps", art: "droplet", color: "#f0a028", variationLabel: "Count", variations: [{ label: "60 caps", meta: "60 caps · 400mg", price: "RM 89" }, { label: "90 caps", meta: "90 caps · 400mg", price: "RM 119" }] },
  { category: "Mind & Mood Balance", type: "physical", tag: "Staff Pick", name: "Ashwagandha KSM-66", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.9, reviews: 324, size: "60 caps", art: "leaf", color: "#148c50", variationLabel: "Strength", variations: [{ label: "300mg", meta: "60 caps · 300mg", price: "RM 79" }, { label: "600mg", meta: "60 caps · 600mg", price: "RM 119" }] },
  { category: "Mind & Mood Balance", type: "physical", tag: "New", name: "L-Theanine + GABA", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 145, size: "60 caps", art: "cell", color: "#1a2659", price: "RM 69" },
  { category: "Mind & Mood Balance", type: "physical", tag: "Featured", name: "Lion's Mane Extract", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 278, size: "60 caps", art: "leaf", color: "#f0a028", variationLabel: "Form", variations: [{ label: "Capsules", meta: "60 caps · 500mg", price: "RM 89" }, { label: "Powder", meta: "100g · 50 servings", price: "RM 109" }] },
  { category: "Mind & Mood Balance", type: "physical", tag: "Bestseller", name: "Melatonin Gummies", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.6, reviews: 412, size: "60 gummies", art: "droplet", color: "#1a2659", price: "RM 49" },
  { category: "Mind & Mood Balance", type: "physical", tag: "Staff Pick", name: "Rhodiola Rosea", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 167, size: "60 caps", art: "cell", color: "#148c50", price: "RM 79" },
  { category: "Mind & Mood Balance", type: "physical", tag: "New", name: "5-HTP Mood Support", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 98, size: "30 caps", art: "droplet", color: "#f0a028", price: "RM 59" },
  { category: "Mind & Mood Balance", type: "physical", tag: "Featured", name: "Reishi Calm Complex", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 134, size: "60 caps", art: "leaf", color: "#1a2659", price: "RM 99" },

  // Pain Relief & Body Recovery (8)
  { category: "Pain Relief & Body Recovery", type: "physical", tag: "Bestseller", name: "Glucosamine + MSM", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 367, size: "120 tabs", art: "cell", color: "#1a2659", variationLabel: "Count", variations: [{ label: "60 tabs", meta: "60 tabs · 1500mg", price: "RM 79" }, { label: "120 tabs", meta: "120 tabs · 1500mg", price: "RM 129" }] },
  { category: "Pain Relief & Body Recovery", type: "physical", tag: "Staff Pick", name: "Turmeric Joint Cream", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 234, size: "100ml", art: "leaf", color: "#f0a028", price: "RM 69" },
  { category: "Pain Relief & Body Recovery", type: "physical", tag: "New", name: "Collagen Type II Complex", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.9, reviews: 89, size: "60 caps", art: "droplet", color: "#1a2659", variationLabel: "Count", variations: [{ label: "30 caps", meta: "30 caps · 40mg", price: "RM 109" }, { label: "60 caps", meta: "60 caps · 40mg", price: "RM 179" }] },
  { category: "Pain Relief & Body Recovery", type: "physical", tag: "Featured", name: "Magnesium Recovery Spray", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.6, reviews: 198, size: "120ml", art: "droplet", color: "#148c50", price: "RM 49" },
  { category: "Pain Relief & Body Recovery", type: "physical", tag: "Bestseller", name: "BCAA Recovery Powder", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 312, size: "300g", art: "cell", color: "#f0a028", variationLabel: "Flavour", variations: [{ label: "Watermelon", meta: "300g · 30 servings", price: "RM 99" }, { label: "Grape", meta: "300g · 30 servings", price: "RM 99" }] },
  { category: "Pain Relief & Body Recovery", type: "physical", tag: "Staff Pick", name: "Arnica Muscle Gel", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 156, size: "100ml", art: "leaf", color: "#1a2659", price: "RM 59" },
  { category: "Pain Relief & Body Recovery", type: "physical", tag: "New", name: "Creatine Monohydrate", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.9, reviews: 423, size: "500g", art: "cell", color: "#1a2659", variationLabel: "Size", variations: [{ label: "250g", meta: "250g · 50 servings", price: "RM 69" }, { label: "500g", meta: "500g · 100 servings", price: "RM 109" }] },
  { category: "Pain Relief & Body Recovery", type: "physical", tag: "Featured", name: "Omega-3 Krill Oil", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 178, size: "60 caps", art: "droplet", color: "#f0a028", price: "RM 119" },

  // Regen & Functional Care (8)
  { category: "Regen & Functional Care", type: "physical", tag: "Staff Pick", name: "NMN + Resveratrol", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.9, reviews: 287, size: "60 caps", art: "cell", color: "#1a2659", variationLabel: "Strength", variations: [{ label: "250 mg", meta: "60 caps · 250mg", price: "RM 289" }, { label: "500 mg", meta: "60 caps · 500mg", price: "RM 489" }] },
  { category: "Regen & Functional Care", type: "physical", tag: "Staff Pick", name: "Liposomal Glutathione", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 211, size: "60 caps", art: "droplet", color: "#1a2659", variationLabel: "Count", variations: [{ label: "30 caps", meta: "30 caps · 500mg", price: "RM 179" }, { label: "60 caps", meta: "60 caps · 500mg", price: "RM 299" }] },
  { category: "Regen & Functional Care", type: "physical", tag: "Bestseller", name: "NAD+ Precursor Complex", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.9, reviews: 198, size: "30 caps", art: "cell", color: "#f0a028", variationLabel: "Strength", variations: [{ label: "250mg", meta: "30 caps · 250mg", price: "RM 199" }, { label: "500mg", meta: "30 caps · 500mg", price: "RM 349" }] },
  { category: "Regen & Functional Care", type: "physical", tag: "New", name: "Spermidine Longevity", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 67, size: "60 caps", art: "leaf", color: "#148c50", price: "RM 169" },
  { category: "Regen & Functional Care", type: "physical", tag: "Featured", name: "PQQ + CoQ10 Stack", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.7, reviews: 134, size: "60 caps", art: "droplet", color: "#1a2659", price: "RM 139" },
  { category: "Regen & Functional Care", type: "physical", tag: "Bestseller", name: "Collagen + Elastin Peptides", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 289, size: "300g", art: "leaf", color: "#f0a028", variationLabel: "Flavour", variations: [{ label: "Berry", meta: "300g · 30 servings", price: "RM 149" }, { label: "Plain", meta: "300g · 30 servings", price: "RM 139" }] },
  { category: "Regen & Functional Care", type: "physical", tag: "Staff Pick", name: "Fisetin Senolytic", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.9, reviews: 78, size: "30 caps", art: "cell", color: "#1a2659", price: "RM 189" },
  { category: "Regen & Functional Care", type: "physical", tag: "New", name: "Urolithin A Mitopure", provider: "Reserve Daily Labs", location: "Ships free · MY", rating: 4.8, reviews: 45, size: "30 caps", art: "cell", color: "#f0a028", price: "RM 259" },
];

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
  const filtered = items.filter((p) => p.category === cat);

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
