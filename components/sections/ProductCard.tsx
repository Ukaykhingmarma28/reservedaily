"use client";

import { useState } from "react";
import { ArrowRight, Heart, Star } from "@/components/ui/icons";
import { CellArt } from "@/components/illustrations/CellArt";
import { LeafArt } from "@/components/illustrations/LeafArt";
import type { Product } from "@/lib/data";

export function ProductCard({ p }: { p: Product }) {
  const [vIdx, setVIdx] = useState(0);
  const v = p.variations ? p.variations[vIdx] : null;
  const ArtComp = p.art === "cell" ? CellArt : p.art === "leaf" ? LeafArt : CellArt;
  const isBookable = p.type === "bookable";
  const displayPrice = v?.price ?? p.price ?? "";
  const displayWas = v?.was ?? p.was;
  const displayMeta = v?.meta ?? (isBookable ? p.duration : p.size);

  return (
    <article className="snap-start flex flex-col border border-line-2 p-1 lg:p-2.5 bg-paper min-w-0 lg:min-w-[280px] w-full">
      <div className="aspect-[4/3] lg:aspect-[5/4] bg-cream relative mb-1 lg:mb-2.5 overflow-hidden">
        <div className="absolute inset-0">
          <ArtComp color={p.color} bg="var(--color-cream)" />
        </div>
        <div className="absolute top-1.5 left-1.5 lg:top-2.5 lg:left-2.5 bg-ink text-cream text-[8px] lg:text-[10px] px-1.5 lg:px-2.5 py-[2px] lg:py-[3px] tracking-[0.12em] uppercase font-semibold">
          {p.tag}
        </div>
        <button
          aria-label="Add to wishlist"
          className="absolute top-1.5 right-1.5 lg:top-2.5 lg:right-2.5 w-6 h-6 lg:w-7 lg:h-7 bg-cream/95 border border-line flex items-center justify-center cursor-pointer text-ink hover:text-rust transition-colors"
        >
          <Heart size={12} />
        </button>
        <div className="absolute left-1.5 bottom-1.5 lg:left-2.5 lg:bottom-2.5">
          <span className="bg-ink/85 text-cream text-[8px] lg:text-[10px] px-1.5 lg:px-2.5 py-0.5 lg:py-1 tracking-[0.08em] uppercase font-semibold">
            {isBookable ? `⏱ ${displayMeta}` : `◱ ${displayMeta}`}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 lg:gap-1.5 text-[9px] lg:text-[11px] text-muted tracking-[0.04em] mb-0.5 lg:mb-1 truncate">
        <span className="text-ink font-medium truncate">{p.provider}</span>
        <span className="shrink-0">·</span>
        <span className="truncate">{p.location}</span>
      </div>

      <h3 className="ff text-[11px] lg:text-[17px] font-medium text-ink tracking-[-0.01em] mb-0.5 lg:mb-1.5 leading-tight line-clamp-2">{p.name}</h3>

      <div className="flex items-center gap-1 lg:gap-1.5 mb-1 lg:mb-2.5 text-[9px] lg:text-xs text-ink-2">
        <span className="text-rust flex gap-px">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} />
          ))}
        </span>
        <span>{p.rating}</span>
        <span className="text-muted">({p.reviews})</span>
      </div>

      {p.variations && (
        <div className="mb-2.5">
          <div className="text-[9px] text-muted tracking-[0.12em] uppercase font-semibold mb-1.5">
            {p.variationLabel ?? (isBookable ? "Session" : "Size")}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {p.variations.map((opt, j) => {
              const active = j === vIdx;
              return (
                <button
                  key={opt.label}
                  onClick={() => setVIdx(j)}
                  className={`px-2.5 py-1 text-[10.5px] font-medium cursor-pointer tracking-[0.02em] leading-tight border transition-colors ${
                    active ? "bg-ink text-cream border-ink" : "bg-transparent text-ink border-line hover:border-ink"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-auto pt-1.5 lg:pt-2.5 border-t border-line-2">
        <div className="flex items-end justify-between gap-2.5">
          <div>
            <div className="text-[7px] lg:text-[9px] text-muted tracking-[0.1em] uppercase mb-px">
              {isBookable ? "From" : "Price"}
            </div>
            <div className="flex items-baseline gap-1 lg:gap-1.5">
              <span className="ff text-sm lg:text-xl font-medium text-ink tracking-[-0.01em] whitespace-nowrap">{displayPrice}</span>
              {displayWas && <span className="text-[10px] lg:text-[11px] text-muted line-through hidden lg:inline">{displayWas}</span>}
            </div>
          </div>
          <button
            className={`hidden lg:flex px-3 py-1.5 text-[10.5px] font-semibold tracking-[0.1em] uppercase cursor-pointer items-center gap-1.5 whitespace-nowrap border transition-colors ${
              isBookable ? "bg-ink text-cream border-ink hover:bg-moss" : "bg-transparent text-ink border-ink hover:bg-ink hover:text-cream"
            }`}
          >
            {isBookable ? "Reserve" : "Add to bag"}
            <ArrowRight />
          </button>
        </div>
        <button
          className={`lg:hidden w-full mt-1.5 py-1.5 text-[8px] font-semibold tracking-[0.1em] uppercase cursor-pointer flex items-center justify-center gap-1 border transition-colors ${
            isBookable ? "bg-ink text-cream border-ink" : "bg-transparent text-ink border-ink"
          }`}
        >
          {isBookable ? "Reserve" : "Add to bag"}
          <ArrowRight />
        </button>
      </div>
    </article>
  );
}
