"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProductRecsPayload, RecommendedProduct } from "@/lib/vital/types";
import type { Product } from "@/lib/data";
import { Star, ArrowRight, ChevronRight, Sparkle } from "@/components/ui/icons";

function typeLabel(p: Product): string {
  if (p.type === "physical") return "Supplement";
  const n = p.name.toLowerCase();
  if (n.includes("iv drip") || n.includes("iv ")) return "IV Drip";
  if (n.includes("jab") || n.includes("im ") || n.includes("im –")) return "Injection";
  return "Treatment";
}

function VitalProductCard({
  rec,
  onExplain,
  index,
}: {
  rec: RecommendedProduct;
  onExplain: () => void;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const p = rec.product;
  const isBookable = p.type === "bookable";
  const price = p.variations?.[0]?.price ?? p.price ?? "";
  const was = p.variations?.[0]?.was ?? p.was;
  const meta = isBookable ? p.duration : p.size;
  const label = typeLabel(p);
  const hasMultipleVariations = (p.variations?.length ?? 0) > 1;

  return (
    <div
      className="shrink-0 w-[200px] sm:w-[220px] lg:w-[260px] snap-start flex flex-col"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <article className="flex flex-col bg-white border border-line-2 rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.05)] flex-1">
        {/* Header */}
        <div className="h-20 lg:h-24 relative overflow-hidden">
          {p.image ? (
            <Image src={p.image} alt={p.name} fill className="object-cover" sizes="260px" />
          ) : (
            <>
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.color}18, ${p.color}30, ${p.color}12)` }} />
              <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-20" style={{ background: p.color }} />
              <div className="absolute -right-1 top-8 w-10 h-10 rounded-full opacity-10" style={{ background: p.color }} />
            </>
          )}

          {/* Type badge */}
          <div className="absolute top-2.5 left-2.5">
            <span
              className="inline-flex items-center gap-1 text-[9px] lg:text-[10px] font-semibold tracking-[0.08em] uppercase px-2 py-[3px] rounded-full"
              style={{
                background: `${p.color}20`,
                color: p.color,
                border: `1px solid ${p.color}30`,
              }}
            >
              {label === "IV Drip" && <span className="text-[8px]">💧</span>}
              {label === "Injection" && <span className="text-[8px]">💉</span>}
              {label === "Supplement" && <span className="text-[8px]">✦</span>}
              {label === "Treatment" && <span className="text-[8px]">✦</span>}
              {label}
            </span>
          </div>

          {/* Meta badge */}
          {meta && (
            <div className="absolute bottom-2.5 left-2.5">
              <span className="text-[9px] lg:text-[10px] font-medium text-ink/70 bg-white/80 backdrop-blur-sm px-2 py-[2px] rounded-full">
                {isBookable ? `⏱ ${meta}` : meta}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col p-3 lg:p-3.5 flex-1">
          <div className="text-[9px] lg:text-[10px] text-muted truncate mb-0.5">
            {p.provider} · {p.location}
          </div>

          <h4 className="ff text-[12px] lg:text-[14px] font-semibold text-ink leading-tight line-clamp-2 mb-1.5 min-h-[2lh]">
            {p.name}
          </h4>

          <div className="flex items-center gap-1 mb-2.5 text-[9px] lg:text-[10px]">
            <span className="text-rust flex gap-px">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={9} />
              ))}
            </span>
            <span className="text-ink font-medium">{p.rating}</span>
            <span className="text-muted">({p.reviews})</span>
          </div>

          {/* AI match reason — inside the card */}
          <div className="rounded-lg bg-moss/[0.04] border border-moss/10 px-2.5 py-2 mb-3">
            <div className="flex items-start gap-1.5">
              <Sparkle size={11} className="text-moss shrink-0 mt-px" />
              <p className={`text-[10px] lg:text-[11px] leading-relaxed text-ink/70 ${expanded ? "" : "line-clamp-2"}`}>
                {rec.reason}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1.5 pl-[17px]">
              {!expanded && rec.reason.length > 80 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
                  className="text-[9px] text-moss font-medium cursor-pointer"
                >
                  Read more
                </button>
              )}
              {!expanded && rec.reason.length > 80 && (
                <span className="text-[9px] text-line">·</span>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); onExplain(); }}
                className="flex items-center gap-1 text-[9px] text-moss font-medium cursor-pointer"
              >
                <Sparkle size={8} className="text-moss" />
                Ask VitalNow AI
              </button>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="mt-auto flex items-end justify-between gap-2 pt-2.5 border-t border-line-2">
            <div>
              <div className="text-[8px] lg:text-[9px] text-muted tracking-[0.08em] uppercase">
                {hasMultipleVariations ? "From" : "Price"}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="ff text-[15px] lg:text-[17px] font-semibold text-ink tracking-[-0.01em]">
                  {price}
                </span>
                {was && (
                  <span className="text-[9px] lg:text-[10px] text-muted line-through">
                    {was}
                  </span>
                )}
              </div>
            </div>
            <Link
              href={`/products/${p.id}`}
              className="flex items-center gap-1 px-2.5 py-1.5 text-[9px] lg:text-[10px] font-semibold tracking-[0.06em] uppercase bg-moss text-cream rounded-lg transition-colors no-underline whitespace-nowrap"
            >
              View
              <ArrowRight size={10} />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export function ProductRecommendation({
  payload,
  onExplainProduct,
}: {
  payload: ProductRecsPayload;
  onExplainProduct: (rec: RecommendedProduct) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scroll = useCallback((dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 240, behavior: "smooth" });
  }, []);

  return (
    <div className="space-y-3">
      <p className="text-[13px] lg:text-sm text-ink leading-relaxed">{payload.intro}</p>

      {/* Scroll rail */}
      <div className="relative -mx-3 sm:-mx-4">
        <div
          ref={railRef}
          onScroll={updateArrows}
          className="flex gap-2 sm:gap-2.5 lg:gap-3 overflow-x-auto pb-3 px-3 sm:px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {payload.products.map((rec, i) => (
            <VitalProductCard
              key={rec.product.id}
              rec={rec}
              onExplain={() => onExplainProduct(rec)}
              index={i}
            />
          ))}
        </div>

        {/* Desktop nav arrows — always visible */}
        {canScrollLeft && (
          <button
            onClick={() => scroll(-1)}
            className="hidden lg:flex absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center bg-white border border-line rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] text-ink hover:bg-paper transition-colors cursor-pointer z-10"
          >
            <ChevronRight size={14} className="rotate-180" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll(1)}
            className="hidden lg:flex absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center bg-white border border-line rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] text-ink hover:bg-paper transition-colors cursor-pointer z-10"
          >
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Swipe hint — mobile only */}
      {payload.products.length > 2 && (
        <p className="text-[9px] lg:text-[10px] text-muted/60 text-center tracking-[0.04em] lg:hidden">
          Swipe to see all {payload.products.length} recommendations →
        </p>
      )}
    </div>
  );
}
