"use client";

import { useRef, type ReactNode } from "react";
import { ArrowRight } from "./icons";

type ScrollRailProps = {
  children: ReactNode;
  className?: string;
  itemGap?: number;
  showControls?: boolean;
  ariaLabel?: string;
};

export function ScrollRail({
  children,
  className = "",
  itemGap = 20,
  showControls = true,
  ariaLabel,
}: ScrollRailProps) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(320, el.clientWidth * 0.75), behavior: "smooth" });
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={ref}
        aria-label={ariaLabel}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ gap: itemGap }}
      >
        {children}
      </div>
      {showControls && (
        <div className="mt-6 flex gap-2 justify-end">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scroll(-1)}
            className="w-10 h-10 rounded-full border border-line bg-cream text-ink hover:border-ink transition-colors flex items-center justify-center rotate-180"
          >
            <ArrowRight />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scroll(1)}
            className="w-10 h-10 rounded-full border border-line bg-cream text-ink hover:border-ink transition-colors flex items-center justify-center"
          >
            <ArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
