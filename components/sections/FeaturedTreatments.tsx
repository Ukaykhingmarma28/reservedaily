"use client";

import { useRef } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/data";

const items: Product[] = [
  {
    type: "bookable", tag: "Bestseller", name: "Exosome IV Therapy",
    provider: "Renewal Medical", location: "KL · Bangsar",
    rating: 4.9, reviews: 127, duration: "75 min", art: "cell", color: "#1a2659",
    variationLabel: "Package",
    variations: [
      { label: "Single", meta: "75 min", price: "RM 2,400", was: "RM 2,900" },
      { label: "3-pack", meta: "3 × 75 min", price: "RM 6,800" },
      { label: "5-pack", meta: "5 × 75 min", price: "RM 10,500" },
    ],
  },
  {
    type: "bookable", tag: "Staff Pick", name: "NAD+ Longevity Drip",
    provider: "Pure IV Co.", location: "KL · Mont Kiara",
    rating: 4.8, reviews: 203, duration: "90 min", art: "cell", color: "#f0a028",
    variationLabel: "Dosage",
    variations: [
      { label: "250 mg", meta: "60 min", price: "RM 680" },
      { label: "500 mg", meta: "90 min", price: "RM 980" },
      { label: "1000 mg", meta: "120 min", price: "RM 1,680" },
    ],
  },
  {
    type: "bookable", tag: "Featured", name: "Luna Lift HIFU Facial",
    provider: "Éclat Aesthetics", location: "KL · Bukit Bintang",
    rating: 5.0, reviews: 89, duration: "60 min", art: "leaf", color: "#148c50",
    variationLabel: "Session",
    variations: [
      { label: "60 min", meta: "60 min", price: "RM 3,200", was: "RM 3,800" },
      { label: "90 min", meta: "90 min", price: "RM 4,200" },
    ],
  },
  {
    type: "bookable", tag: "Limited", name: "ExoCake 5D Package",
    provider: "Vitality Wellness", location: "KL · KLCC",
    rating: 4.9, reviews: 42, duration: "4 sessions", art: "cell", color: "#1a2659",
    price: "RM 4,200",
  },
];

export function FeaturedTreatments() {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="py-14 lg:py-24 px-6 md:px-10 border-b border-line-2 bg-paper">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-6 lg:mb-10 gap-4 lg:gap-10">
          <div className="max-w-[640px]">
            <div className="flex items-center gap-3 text-[11px] text-moss tracking-[0.18em] uppercase font-semibold mb-3 lg:mb-[18px]">
              <span className="w-6 h-px bg-moss" />
              Featured treatments
            </div>
            <h2
              className="ff text-[clamp(28px,7vw,38px)] lg:text-[clamp(36px,3.8vw,54px)] font-normal text-ink tracking-[-0.02em] leading-[1.02] m-0"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              The edit, <span className="ff text-moss">curated</span>.
            </h2>
          </div>
          <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-6">
            <a
              href="#"
              className="text-xs text-ink tracking-[0.08em] uppercase font-semibold no-underline border-b border-ink pb-[3px]"
            >
              Shop all featured
            </a>
            <div className="flex gap-2">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Previous"
                className="w-9 h-9 lg:w-11 lg:h-11 border border-ink bg-transparent text-ink cursor-pointer flex items-center justify-center"
              >
                <span className="rotate-180 flex">
                  <ArrowRight />
                </span>
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Next"
                className="w-9 h-9 lg:w-11 lg:h-11 border border-ink bg-ink text-cream cursor-pointer flex items-center justify-center"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={railRef}
          className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[minmax(300px,1fr)] gap-4 lg:gap-7 overflow-x-auto snap-x snap-mandatory pb-3 lg:pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((p, i) => (
            <ProductCard key={i} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
