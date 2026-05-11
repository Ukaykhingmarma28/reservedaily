"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Heart, Star, Check } from "@/components/ui/icons";
import { CellArt } from "@/components/illustrations/CellArt";
import { LeafArt } from "@/components/illustrations/LeafArt";
import { BottleArt } from "@/components/illustrations/BottleArt";
import type { Product } from "@/lib/data";

export function ProductHero({
  product: p,
  description,
  highlights,
}: {
  product: Product;
  description: string;
  highlights: string[];
}) {
  const [vIdx, setVIdx] = useState(0);
  const v = p.variations ? p.variations[vIdx] : null;
  const isBookable = p.type === "bookable";
  const displayPrice = v?.price ?? p.price ?? "";
  const displayWas = v?.was ?? p.was;
  const displayMeta = v?.meta ?? (isBookable ? p.duration : p.size);

  const ArtComp = p.art === "cell" ? CellArt : p.art === "leaf" ? LeafArt : BottleArt;

  return (
    <section className="pb-10 lg:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Image */}
        <div className="relative aspect-square lg:aspect-[4/5] bg-paper border border-line-2 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08]">
            <ArtComp color={p.color} bg="var(--color-paper)" />
          </div>
          {p.image && (
            <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12">
              <div className="relative w-full h-full">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          )}
          {!p.image && (
            <div className="absolute inset-0">
              <ArtComp color={p.color} bg="var(--color-paper)" />
            </div>
          )}
          <div className="absolute top-3 left-3 lg:top-4 lg:left-4 bg-ink text-cream text-[9px] lg:text-[10px] px-2 lg:px-2.5 py-[3px] tracking-[0.12em] uppercase font-semibold">
            {p.tag}
          </div>
          <button
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 lg:top-4 lg:right-4 w-8 h-8 lg:w-9 lg:h-9 bg-cream/95 border border-line flex items-center justify-center cursor-pointer text-ink hover:text-rust transition-colors"
          >
            <Heart size={14} />
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[11px] text-muted tracking-[0.04em] mb-2">
            <span className="text-ink font-medium">{p.provider}</span>
            <span>·</span>
            <span>{p.location}</span>
          </div>

          <h1 className="ff text-[clamp(22px,4vw,34px)] font-medium text-ink tracking-[-0.02em] leading-tight mb-3">
            {p.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-px text-rust">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>
            <span className="text-xs text-ink">{p.rating}</span>
            <span className="text-xs text-muted">({p.reviews} reviews)</span>
          </div>

          <p className="text-[13px] lg:text-sm text-ink-2 leading-relaxed mb-5">
            {description}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
            {highlights.map((h) => (
              <div key={h} className="flex items-start gap-2 text-[12px] text-ink-2">
                <Check size={12} className="text-berry mt-0.5 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Meta badge */}
          {displayMeta && (
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-sage text-ink text-[10px] px-2.5 py-1 tracking-[0.08em] uppercase font-semibold">
                {isBookable ? `⏱ ${displayMeta}` : `◱ ${displayMeta}`}
              </span>
              {p.category && (
                <span className="bg-sage text-ink text-[10px] px-2.5 py-1 tracking-[0.08em] uppercase font-semibold">
                  {p.category}
                </span>
              )}
            </div>
          )}

          {/* Variations */}
          {p.variations && (
            <div className="mb-5">
              <div className="text-[10px] text-muted tracking-[0.12em] uppercase font-semibold mb-2">
                {p.variationLabel ?? (isBookable ? "Session" : "Size")}
              </div>
              <div className="flex gap-2 flex-wrap">
                {p.variations.map((opt, j) => {
                  const active = j === vIdx;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setVIdx(j)}
                      className={`px-3 py-1.5 text-[11px] font-medium cursor-pointer tracking-[0.02em] border transition-colors ${
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

          {/* Price */}
          <div className="border-t border-line-2 pt-5 mt-auto">
            <div className="text-[9px] text-muted tracking-[0.1em] uppercase mb-1">
              {isBookable ? "From" : "Price"}
            </div>
            <div className="flex items-baseline gap-2 mb-5">
              <span className="ff text-[28px] lg:text-[34px] font-medium text-ink tracking-[-0.02em]">
                {displayPrice}
              </span>
              {displayWas && (
                <span className="text-sm text-muted line-through">{displayWas}</span>
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className={`flex-1 py-3.5 text-[11px] font-semibold tracking-[0.12em] uppercase cursor-pointer flex items-center justify-center gap-2 border transition-colors ${
                  isBookable
                    ? "bg-ink text-cream border-ink hover:bg-moss"
                    : "bg-ink text-cream border-ink hover:bg-moss"
                }`}
              >
                {isBookable ? "Reserve now" : "Add to bag"}
                <ArrowRight />
              </button>
              <button className="py-3.5 px-6 text-[11px] font-semibold tracking-[0.12em] uppercase cursor-pointer flex items-center justify-center gap-2 border border-ink text-ink bg-transparent transition-colors hover:bg-ink hover:text-cream">
                <Heart size={13} />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
