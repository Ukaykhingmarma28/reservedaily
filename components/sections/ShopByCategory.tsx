"use client";

import { useRef } from "react";
import { ArrowRight, Bolt, Brain, Dna, Droplet, Heart, Leaf, Spa } from "@/components/ui/icons";

type Cat = {
  name: string;
  Icon: React.ComponentType<{ size?: number }>;
  acc: string;
};

const cats: Cat[] = [
  { name: "Regen & Functional", Icon: Dna, acc: "var(--color-moss)" },
  { name: "Anti Aging", Icon: Leaf, acc: "var(--color-moss)" },
  { name: "Health Check", Icon: Droplet, acc: "var(--color-moss)" },
  { name: "Pain Relief", Icon: Heart, acc: "var(--color-moss)" },
  { name: "Supplements", Icon: Bolt, acc: "var(--color-moss)" },
  { name: "Mind & Mood", Icon: Brain, acc: "var(--color-moss)" },
  { name: "Spa", Icon: Spa, acc: "var(--color-moss)" },
];

const tags = [
  "Immune Support", "Joint Care", "Gut Health", "Brain & Cognitive",
  "Hormonal Balance", "Skin & Hair", "Sleep", "Detox & Cleanse",
  "Energy & Stamina", "Heart Health", "Blood Sugar",
];

export function ShopByCategory() {
  const tagRef = useRef<HTMLDivElement>(null);
  const scrollTags = (dir: 1 | -1) => {
    const el = tagRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <section className="py-10 lg:py-16 px-6 md:px-10 border-b border-line-2 bg-paper">
      <div className="max-w-[1400px] mx-auto">
        <h2
          className="ff text-[20px] lg:text-[28px] font-normal text-ink tracking-[-0.02em] leading-tight mb-6 lg:mb-8"
        >
          Shop by category
        </h2>

        {/* Category circles */}
        <div className="flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4 lg:pb-6 lg:grid lg:grid-cols-7 lg:gap-x-4 lg:gap-y-6 lg:overflow-visible snap-x snap-mandatory">
          {cats.map((c) => {
            const Icon = c.Icon;
            return (
              <a
                key={c.name}
                href="#"
                className="flex flex-col items-center gap-2.5 lg:gap-3 no-underline text-inherit group shrink-0 w-[72px] lg:w-auto snap-start"
              >
                <div className="w-[72px] h-[72px] lg:w-28 lg:h-28 rounded-full bg-sage flex items-center justify-center transition-colors group-hover:bg-sage-2">
                  <span style={{ color: c.acc }} className="transition-transform group-hover:scale-110">
                    <Icon size={28} />
                  </span>
                </div>
                <span className="text-[11px] lg:text-[13px] font-medium text-ink text-center leading-tight">
                  {c.name}
                </span>
              </a>
            );
          })}
        </div>

        {/* Sub-category pill row */}
        <div className="relative mt-2 lg:mt-4">
          <button
            onClick={() => scrollTags(-1)}
            aria-label="Previous"
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-paper border border-line items-center justify-center cursor-pointer text-ink shadow-sm hover:border-ink transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={tagRef}
            className="flex gap-2 lg:gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-10"
          >
            {tags.map((t) => (
              <a
                key={t}
                href="#"
                className="shrink-0 px-4 lg:px-5 py-2 lg:py-2.5 rounded-full bg-sage/60 text-[11px] lg:text-[12px] font-medium text-ink tracking-[0.02em] no-underline whitespace-nowrap transition-colors hover:bg-sage-2"
              >
                {t}
              </a>
            ))}
          </div>

          <button
            onClick={() => scrollTags(1)}
            aria-label="Next"
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-paper border border-line items-center justify-center cursor-pointer text-ink shadow-sm hover:border-ink transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
