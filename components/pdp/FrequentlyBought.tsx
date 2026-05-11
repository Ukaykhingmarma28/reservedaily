"use client";

import { useRef } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { ProductCard } from "@/components/sections/ProductCard";
import type { Product } from "@/lib/data";

export function FrequentlyBought({ products }: { products: Product[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section className="py-10 lg:py-16 border-t border-line-2">
      <div className="flex items-end justify-between mb-6 lg:mb-8">
        <div>
          <div className="flex items-center gap-3 text-[11px] text-moss tracking-[0.18em] uppercase font-semibold mb-2">
            <span className="w-6 h-px bg-moss" />
            Pairs well with
          </div>
          <h2 className="ff text-[clamp(22px,4vw,32px)] font-normal text-ink tracking-[-0.02em] leading-tight">
            Frequently bought together
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="w-9 h-9 lg:w-10 lg:h-10 border border-ink bg-transparent text-ink cursor-pointer flex items-center justify-center"
          >
            <span className="rotate-180 flex"><ArrowRight /></span>
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="w-9 h-9 lg:w-10 lg:h-10 border border-ink bg-ink text-cream cursor-pointer flex items-center justify-center"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="grid grid-flow-col auto-cols-[46%] sm:auto-cols-[minmax(260px,300px)] gap-3 lg:gap-5 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p, i) => (
          <div key={i} className="snap-start flex">
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
