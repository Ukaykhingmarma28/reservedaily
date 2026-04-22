"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Bolt,
  Brain,
  ChevronDown,
  Close,
  Dna,
  Droplet,
  Heart,
  Leaf,
} from "@/components/ui/icons";
import { CATEGORIES, CATEGORY_STRIP_LINKS, type IconKey } from "@/lib/data";

const iconMap: Record<IconKey, React.ComponentType<{ size?: number }>> = {
  leaf: Leaf,
  droplet: Droplet,
  bolt: Bolt,
  brain: Brain,
  heart: Heart,
  dna: Dna,
};

type Props = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-[80]">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
        style={{ animation: "rd-drawer-fade 180ms ease-out" }}
        aria-hidden
      />
      <aside
        className="absolute inset-y-0 right-0 w-full max-w-sm bg-cream shadow-[0_24px_60px_-20px_rgba(20,26,58,0.28)] flex flex-col"
        style={{ animation: "rd-drawer-slide 200ms ease-out" }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between h-[68px] px-5 border-b border-line-2 shrink-0">
          <Image src="/logo.png" alt="Reserve Daily" width={120} height={30} className="h-8 w-auto" />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 inline-flex items-center justify-center text-ink rounded-[2px] border border-line bg-paper"
          >
            <Close />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-5 py-5 flex flex-col gap-2.5 border-b border-line-2">
            <a
              href="#vital"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 no-underline bg-ink text-cream px-4 py-3 text-[13px] font-semibold tracking-[0.04em] rounded-[2px]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-butter" />
              Vital AI
            </a>
            <button
              onClick={onClose}
              className="bg-paper text-ink border border-line px-4 py-3 text-[13px] font-semibold tracking-[0.03em] rounded-[2px]"
            >
              SIGN IN
            </button>
          </div>

          <nav className="px-5 py-2 border-b border-line-2">
            {CATEGORY_STRIP_LINKS.map((l) => (
              <a
                key={l}
                href="#"
                onClick={onClose}
                className="flex items-center justify-between py-3.5 text-[15px] text-ink font-medium no-underline border-b border-line-2 last:border-b-0"
              >
                <span>{l}</span>
                <span className="text-muted">
                  <ArrowRight />
                </span>
              </a>
            ))}
          </nav>

          <div className="px-5 py-4 border-b border-line-2">
            <div className="text-[10px] text-muted tracking-[0.18em] uppercase font-semibold pb-2">
              Shop by category
            </div>
            {CATEGORIES.map((c) => {
              const Icon = iconMap[c.iconKey];
              const isOpen = expanded === c.name;
              return (
                <div key={c.name} className="border-b border-line-2 last:border-b-0">
                  <button
                    onClick={() => setExpanded(isOpen ? null : c.name)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between py-3.5 text-left"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-moss w-4 flex justify-center">
                        <Icon />
                      </span>
                      <span className="text-[14px] text-ink font-medium">{c.name}</span>
                    </span>
                    <span
                      className={`text-ink-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    >
                      <ChevronDown size={14} />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-3 pl-7 flex flex-col">
                      {c.sub.map((s) => (
                        <a
                          key={s}
                          href="#"
                          onClick={onClose}
                          className="text-[13px] text-ink-2 no-underline py-2 flex items-center gap-2"
                        >
                          <span className="w-[3px] h-[3px] rounded-full bg-moss" />
                          {s}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="px-5 py-5">
            <a
              href="#"
              onClick={onClose}
              aria-label="Wishlist"
              className="flex items-center justify-between py-2 text-[14px] text-ink font-medium no-underline"
            >
              <span className="flex items-center gap-3">
                <span className="relative inline-flex items-center justify-center w-5 h-5">
                  <Heart size={18} />
                  <span className="absolute -top-1.5 -right-[7px] min-w-[15px] h-[15px] px-1 bg-rust text-cream text-[9px] font-bold rounded-full inline-flex items-center justify-center leading-none border-[1.5px] border-cream">
                    0
                  </span>
                </span>
                <span>Wishlist</span>
              </span>
              <span className="text-muted">
                <ArrowRight />
              </span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
