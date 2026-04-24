"use client";

import { useState } from "react";
import type { ProductRecsPayload, RecommendedProduct } from "@/lib/vital/types";
import { ProductCard } from "@/components/sections/ProductCard";
import { ChevronDown } from "@/components/ui/icons";

function ProductWithReason({
  rec,
  onSelect,
}: {
  rec: RecommendedProduct;
  onSelect: () => void;
}) {
  const [showReason, setShowReason] = useState(false);

  return (
    <div className="shrink-0 w-[240px] lg:w-[270px] snap-start">
      <div
        onClick={onSelect}
        className="cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        <ProductCard p={rec.product} />
      </div>

      {/* Why this suits me toggle */}
      <button
        onClick={() => setShowReason(!showReason)}
        className="flex items-center gap-1.5 mt-2 px-1 text-[11px] font-medium text-moss hover:text-moss-2 transition-colors group"
      >
        <ChevronDown
          size={10}
          className={`transition-transform duration-200 ${showReason ? "rotate-180" : ""}`}
        />
        Why this suits me
      </button>
      {showReason && (
        <p className="text-[11px] text-muted leading-relaxed mt-1.5 px-1 animate-[rd-fade-up_0.2s_ease-out]">
          {rec.reason}
        </p>
      )}
    </div>
  );
}

export function ProductRecommendation({
  payload,
  onSelectProduct,
}: {
  payload: ProductRecsPayload;
  onSelectProduct: (rec: RecommendedProduct) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-ink leading-relaxed">{payload.intro}</p>

      <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
        {payload.products.map((rec) => (
          <ProductWithReason
            key={rec.product.name}
            rec={rec}
            onSelect={() => onSelectProduct(rec)}
          />
        ))}
      </div>
    </div>
  );
}
