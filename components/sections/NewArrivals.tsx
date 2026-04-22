"use client";

import { useRef } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/data";

const items: Product[] = [
  {
    type: "physical", tag: "New", name: "Astaxanthin Complex",
    provider: "Reserve Daily Labs", location: "Ships free · MY",
    rating: 4.8, reviews: 34, size: "30 caps",
    art: "cell", color: "#1a2659", variationLabel: "Count",
    variations: [
      { label: "30 caps", meta: "30 caps · 12mg", price: "RM 129" },
      { label: "60 caps", meta: "60 caps · 12mg", price: "RM 219" },
    ],
  },
  {
    type: "bookable", tag: "New", name: "Cryo Body Sculpt",
    provider: "Frost Wellness", location: "KL · Bangsar",
    rating: 4.9, reviews: 18, duration: "45 min",
    art: "cell", color: "#f0a028", variationLabel: "Session",
    variations: [
      { label: "Single", meta: "45 min", price: "RM 580" },
      { label: "3-pack", meta: "3 × 45 min", price: "RM 1,500" },
    ],
  },
  {
    type: "physical", tag: "New", name: "Sea Moss Gel",
    provider: "Reserve Daily Labs", location: "Ships free · MY",
    rating: 4.7, reviews: 56, size: "250g",
    art: "leaf", color: "#148c50", variationLabel: "Size",
    variations: [
      { label: "250g", meta: "250g · 30 servings", price: "RM 89" },
      { label: "500g", meta: "500g · 60 servings", price: "RM 149" },
    ],
  },
  {
    type: "bookable", tag: "New", name: "Red Light Therapy",
    provider: "Radiance Clinic", location: "KL · TTDI",
    rating: 4.8, reviews: 42, duration: "30 min",
    art: "droplet", color: "#1a2659", variationLabel: "Package",
    variations: [
      { label: "Single", meta: "30 min", price: "RM 280" },
      { label: "5-pack", meta: "5 × 30 min", price: "RM 1,200" },
    ],
  },
  {
    type: "physical", tag: "New", name: "Shilajit Resin",
    provider: "Reserve Daily Labs", location: "Ships free · MY",
    rating: 4.9, reviews: 27, size: "30g",
    art: "cell", color: "#1a2659", variationLabel: "Size",
    variations: [
      { label: "15g", meta: "15g · 30 servings", price: "RM 169" },
      { label: "30g", meta: "30g · 60 servings", price: "RM 289" },
    ],
  },
  {
    type: "bookable", tag: "New", name: "Lymphatic Drainage Massage",
    provider: "Flow Bodywork", location: "KL · Sri Hartamas",
    rating: 4.7, reviews: 63, duration: "60 min",
    art: "leaf", color: "#f0a028", variationLabel: "Duration",
    variations: [
      { label: "60 min", meta: "60 min", price: "RM 320" },
      { label: "90 min", meta: "90 min", price: "RM 450" },
    ],
  },
];

export function NewArrivals() {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="py-14 lg:py-24 px-6 md:px-10 border-b border-line-2">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-6 lg:mb-10 gap-4 lg:gap-10">
          <div className="max-w-[640px]">
            <div className="flex items-center gap-3 text-[11px] text-moss tracking-[0.18em] uppercase font-semibold mb-3 lg:mb-[18px]">
              <span className="w-6 h-px bg-moss" />
              Just landed
            </div>
            <h2
              className="ff text-[clamp(28px,7vw,38px)] lg:text-[clamp(36px,3.8vw,54px)] font-normal text-ink tracking-[-0.02em] leading-[1.02] m-0"
            >
              New <span className="ff text-moss">arrivals.</span>
            </h2>
          </div>
          <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-6">
            <a
              href="#"
              className="text-xs text-ink tracking-[0.08em] uppercase font-semibold no-underline border-b border-ink pb-[3px]"
            >
              Shop all new
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
