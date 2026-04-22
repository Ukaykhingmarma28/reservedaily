"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/data";

const offers: Product[] = [
  {
    type: "bookable", tag: "-30%", name: "Exosome Revival Drip",
    provider: "Renewal Medical", location: "KL · Bangsar",
    rating: 4.9, reviews: 127, duration: "75 min", art: "cell", color: "#1a2659",
    variationLabel: "Package",
    variations: [
      { label: "Single", meta: "75 min", price: "RM 1,680", was: "RM 2,400" },
      { label: "3-pack", meta: "3 × 75 min", price: "RM 4,760", was: "RM 6,800" },
    ],
  },
  {
    type: "bookable", tag: "-25%", name: "PRF Skin Boost Facial",
    provider: "Éclat Aesthetics", location: "KL · Bukit Bintang",
    rating: 5.0, reviews: 89, duration: "60 min", art: "leaf", color: "#148c50",
    variationLabel: "Session",
    variations: [
      { label: "Single", meta: "60 min", price: "RM 2,400", was: "RM 3,200" },
      { label: "3-pack", meta: "3 × 60 min", price: "RM 6,120", was: "RM 8,640" },
    ],
  },
  {
    type: "bookable", tag: "-26%", name: "Myer's Cocktail IV",
    provider: "Pure IV Co.", location: "KL · Mont Kiara",
    rating: 4.8, reviews: 203, duration: "60 min", art: "droplet", color: "#f0a028",
    variationLabel: "Dosage",
    variations: [
      { label: "Standard", meta: "60 min", price: "RM 280", was: "RM 380" },
      { label: "Plus", meta: "75 min", price: "RM 380", was: "RM 480" },
    ],
  },
  {
    type: "physical", tag: "-20%", name: "Liposomal Vitamin C",
    provider: "Reserve Daily Labs", location: "Ships free · MY",
    rating: 4.8, reviews: 412, size: "60 caps", art: "leaf", color: "#1a2659",
    variationLabel: "Count",
    variations: [
      { label: "60 caps", meta: "60 caps · 1000mg", price: "RM 119", was: "RM 149" },
      { label: "120 caps", meta: "120 caps · 1000mg", price: "RM 199", was: "RM 249" },
    ],
  },
  {
    type: "bookable", tag: "-35%", name: "NAD+ Starter Drip",
    provider: "Pure IV Co.", location: "KL · Mont Kiara",
    rating: 4.7, reviews: 96, duration: "60 min", art: "droplet", color: "#1a2659",
    variationLabel: "Dosage",
    variations: [
      { label: "250 mg", meta: "60 min", price: "RM 442", was: "RM 680" },
      { label: "500 mg", meta: "90 min", price: "RM 637", was: "RM 980" },
    ],
  },
];

function Countdown({ hours = 47, minutes = 23, seconds = 11 }: { hours?: number; minutes?: number; seconds?: number }) {
  const [t, setT] = useState({ h: hours, m: minutes, s: seconds });
  useEffect(() => {
    const id = setInterval(() => {
      setT((prev) => {
        let s = prev.s - 1;
        let m = prev.m;
        let h = prev.h;
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  const cells = [
    ["HRS", pad(t.h)],
    ["MIN", pad(t.m)],
    ["SEC", pad(t.s)],
  ] as const;
  return (
    <div className="flex items-baseline gap-2 lg:gap-2.5">
      {cells.map(([l, v], i) => (
        <div key={l} className="flex items-baseline gap-2 lg:gap-2.5">
          <div className="flex flex-col items-center">
            <span className="ff text-[28px] lg:text-[40px] font-medium text-cream tracking-[-0.03em] leading-none tabular-nums">{v}</span>
            <span className="text-[8px] lg:text-[9px] text-cream/50 tracking-[0.18em] mt-1">{l}</span>
          </div>
          {i < 2 && <span className="ff text-[20px] lg:text-[30px] text-cream/30 leading-none">:</span>}
        </div>
      ))}
    </div>
  );
}

export function LimitedOffers() {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="py-14 lg:py-24 px-6 md:px-10 border-b border-line-2 bg-paper">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-6 lg:mb-10 gap-4 lg:gap-10">
          <div className="max-w-[640px]">
            <div className="flex items-center gap-3 text-[11px] text-moss tracking-[0.18em] uppercase font-semibold mb-3 lg:mb-[18px]">
              <span className="w-6 h-px bg-moss" />
              Limited time · Ends this week
            </div>
            <h2
              className="ff text-[clamp(28px,7vw,38px)] lg:text-[clamp(36px,3.8vw,54px)] font-normal text-ink tracking-[-0.02em] leading-[1.02] mb-0 lg:mb-3.5"
            >
              Flash offers, <span className="ff text-moss">handpicked</span>.
            </h2>
            <p className="hidden lg:block text-[15px] text-ink-2 leading-[1.5] m-0 max-w-[560px]">
              Treatments and apothecary essentials, marked down for a moment. Book before the timer runs out.
            </p>
          </div>
          <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-6">
            <p className="text-[13px] text-ink-2 leading-[1.5] m-0 lg:hidden">
              Marked down for a moment. Book before the timer runs out.
            </p>
            <div className="flex gap-2 shrink-0">
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

        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 lg:gap-6 items-stretch">
          <article className="flex flex-col lg:justify-between bg-ink text-cream p-5 lg:p-7">
            <div className="hidden lg:block">
              <div className="flex items-center gap-2.5 text-[10px] text-butter tracking-[0.2em] uppercase font-semibold mb-[18px]">
                <span className="w-[18px] h-px bg-butter" />
                Limited time
              </div>
              <h3
                className="ff text-[34px] font-normal text-cream tracking-[-0.025em] leading-[1.02] mb-3.5"
              >
                Flash offers,
                <br />
                <span className="ff text-butter">handpicked</span>.
              </h3>
              <p className="text-[13px] text-cream/70 leading-[1.5]">
                Treatments and apothecary essentials, marked down for a moment. Ends when the timer runs out.
              </p>
            </div>

            <div className="flex lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4 lg:my-6">
              <div>
                <div className="text-[9px] text-cream/50 tracking-[0.2em] uppercase font-semibold mb-2">Ends in</div>
                <Countdown />
              </div>
              <button className="bg-butter text-ink border-none px-4 lg:px-[18px] py-3 lg:py-3.5 text-[10px] lg:text-[11px] font-bold tracking-[0.14em] uppercase cursor-pointer flex items-center gap-2 shrink-0 lg:hidden">
                Shop all <ArrowRight />
              </button>
            </div>

            <button className="hidden lg:flex bg-butter text-ink border-none px-[18px] py-3.5 text-[11px] font-bold tracking-[0.14em] uppercase cursor-pointer items-center justify-between gap-2">
              Shop all offers <ArrowRight />
            </button>
          </article>

          <div
            ref={railRef}
            className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[minmax(280px,320px)] gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-3 lg:pb-5 min-w-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {offers.map((p, i) => (
              <div key={i} className="relative snap-start">
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
