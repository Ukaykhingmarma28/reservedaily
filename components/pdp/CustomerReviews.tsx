"use client";

import { useState } from "react";
import { Star, Check } from "@/components/ui/icons";
import type { MockReview } from "@/lib/pdp-mock";

export function CustomerReviews({
  reviews,
  avgRating,
  ratingBreakdown,
  totalReviews,
}: {
  reviews: MockReview[];
  avgRating: number;
  ratingBreakdown: number[];
  totalReviews: number;
}) {
  const [sort, setSort] = useState("recent");
  const [visibleCount, setVisibleCount] = useState(4);

  const sorted = [...reviews].sort((a, b) => {
    if (sort === "highest") return b.rating - a.rating;
    if (sort === "lowest") return a.rating - b.rating;
    return 0;
  });

  const visible = sorted.slice(0, visibleCount);

  return (
    <section id="reviews" className="py-10 lg:py-16 border-t border-line-2 scroll-mt-24">
      <div className="flex items-center gap-3 text-[11px] text-moss tracking-[0.18em] uppercase font-semibold mb-2">
        <span className="w-6 h-px bg-moss" />
        What customers say
      </div>
      <h2 className="ff text-[clamp(22px,4vw,32px)] font-normal text-ink tracking-[-0.02em] leading-tight mb-8">
        Customer reviews
      </h2>

      {/* Rating summary */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 mb-10 pb-10 border-b border-line-2">
        {/* Average */}
        <div className="flex flex-col items-center lg:items-start shrink-0">
          <span className="ff text-[52px] lg:text-[64px] font-medium text-ink tracking-[-0.03em] leading-none">
            {avgRating}
          </span>
          <div className="flex gap-px text-rust my-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} />
            ))}
          </div>
          <span className="text-xs text-muted">{totalReviews} reviews</span>
        </div>

        {/* Breakdown bars */}
        <div className="flex-1 flex flex-col gap-2 max-w-[400px]">
          {ratingBreakdown.map((count, i) => {
            const starNum = 5 - i;
            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={starNum} className="flex items-center gap-3">
                <span className="text-[11px] text-ink w-[14px] text-right">{starNum}</span>
                <Star size={11} className="text-rust shrink-0" />
                <div className="flex-1 h-2 bg-line-2 overflow-hidden">
                  <div
                    className="h-full bg-rust transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[11px] text-muted w-[20px] text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-muted">
          Showing {Math.min(visibleCount, reviews.length)} of {reviews.length} reviews
        </span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-[11px] text-ink bg-paper border border-line px-3 py-2 cursor-pointer"
        >
          <option value="recent">Most recent</option>
          <option value="highest">Highest rated</option>
          <option value="lowest">Lowest rated</option>
        </select>
      </div>

      {/* Review cards */}
      <div className="space-y-6">
        {visible.map((r, i) => (
          <article key={i} className="pb-6 border-b border-line-2 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-sage text-moss text-[11px] font-semibold flex items-center justify-center uppercase">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-[12px] font-medium text-ink">{r.name}</div>
                  <div className="text-[10px] text-muted">{r.date}</div>
                </div>
              </div>
              {r.verified && (
                <span className="flex items-center gap-1 text-[10px] text-berry font-medium">
                  <Check size={10} />
                  Verified
                </span>
              )}
            </div>
            <div className="flex gap-px text-rust mb-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={11} className={j < r.rating ? "text-rust" : "text-line"} />
              ))}
            </div>
            <p className="text-[13px] text-ink-2 leading-relaxed">{r.text}</p>
          </article>
        ))}
      </div>

      {visibleCount < reviews.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + 4)}
            className="px-6 py-3 text-[11px] font-semibold tracking-[0.1em] uppercase cursor-pointer border border-ink text-ink bg-transparent transition-colors hover:bg-ink hover:text-cream"
          >
            Show more reviews
          </button>
        </div>
      )}
    </section>
  );
}
