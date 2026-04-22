"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Leaf, Droplet, Bolt, Brain, Heart, Dna } from "@/components/ui/icons";
import { CATEGORIES, type IconKey } from "@/lib/data";

const iconMap: Record<IconKey, React.ComponentType<{ size?: number }>> = {
  leaf: Leaf,
  droplet: Droplet,
  bolt: Bolt,
  brain: Brain,
  heart: Heart,
  dna: Dna,
};

export function CategoriesDropdown() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = CATEGORIES[hovered];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={`inline-flex items-center gap-2 whitespace-nowrap px-3.5 py-2.5 rounded-[2px] border text-[13px] font-semibold transition-colors ${
          open ? "bg-ink text-cream border-ink" : "bg-paper text-ink border-line hover:border-ink"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
        <span>Categories</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <ChevronDown />
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+12px)] w-[880px] bg-cream border border-line rounded-[2px] z-[70] overflow-hidden grid grid-cols-[1fr_280px] shadow-[0_24px_60px_-20px_rgba(20,26,58,0.18)]">
          <div className="py-6 border-r border-line-2">
            <div className="text-[10px] text-muted tracking-[0.18em] uppercase font-semibold px-6 pb-3.5">
              Shop by category
            </div>
            {CATEGORIES.map((c, i) => {
              const Icon = iconMap[c.iconKey];
              return (
                <a
                  key={c.name}
                  href="#"
                  onMouseEnter={() => setHovered(i)}
                  className={`flex items-center justify-between px-6 py-[11px] no-underline transition-colors border-l-2 ${
                    hovered === i ? "bg-paper border-moss" : "border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-moss w-4 flex justify-center">
                      <Icon />
                    </span>
                    <span className={`text-sm text-ink ${hovered === i ? "font-semibold" : "font-medium"}`}>
                      {c.name}
                    </span>
                  </span>
                  <span className="ff text-[11px] text-ink-2 flex items-center gap-1.5">
                    {c.sub.length} <ArrowRight />
                  </span>
                </a>
              );
            })}
          </div>
          <div className="p-6 bg-paper flex flex-col">
            <div className="text-[10px] text-muted tracking-[0.18em] uppercase font-semibold mb-2.5">
              Within {active.name}
            </div>
            <div className="ff text-[20px] text-ink leading-tight mb-4">
              <em className="ff">{active.name}</em>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              {active.sub.map((s, j) => (
                <a
                  key={s}
                  href="#"
                  className={`text-[13px] text-ink-2 no-underline py-1.5 flex items-center gap-2 ${
                    j < active.sub.length - 1 ? "border-b border-line-2" : ""
                  }`}
                >
                  <span className="w-[3px] h-[3px] rounded-full bg-moss" />
                  {s}
                </a>
              ))}
            </div>
            <a
              href="#"
              className="inline-flex items-center justify-between mt-4 px-3.5 py-2.5 bg-ink text-cream text-[11px] tracking-[0.12em] uppercase font-semibold no-underline"
            >
              Browse {active.name} <ArrowRight />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
