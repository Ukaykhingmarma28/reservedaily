"use client";

import type { KeyTakeaway, TakeawayStatus } from "@/lib/vital/types";
import { Heart, Droplet, Bolt, Leaf } from "@/components/ui/icons";

const STATUS_STYLES: Record<TakeawayStatus, { bg: string; text: string; label: string }> = {
  good: { bg: "bg-berry/10", text: "text-[#3a8a5c]", label: "GOOD" },
  "needs-attention": { bg: "bg-rust/10", text: "text-rust", label: "NEEDS ATTENTION" },
  borderline: { bg: "bg-rust-soft/15", text: "text-rust", label: "BORDERLINE" },
  critical: { bg: "bg-red-500/10", text: "text-red-600", label: "CRITICAL" },
};

const ICON_STYLES: Record<KeyTakeaway["icon"], { bg: string; color: string }> = {
  heart: { bg: "bg-rust/10", color: "text-rust" },
  droplet: { bg: "bg-butter/15", color: "text-butter" },
  shield: { bg: "bg-berry/10", color: "text-berry" },
  leaf: { bg: "bg-berry/10", color: "text-berry" },
  zap: { bg: "bg-rust-soft/15", color: "text-rust" },
  bolt: { bg: "bg-butter/15", color: "text-butter" },
};

function TakeawayIcon({ icon, className }: { icon: KeyTakeaway["icon"]; className?: string }) {
  const size = 16;
  switch (icon) {
    case "heart": return <Heart size={size} className={className} />;
    case "droplet": return <Droplet size={size} className={className} />;
    case "bolt":
    case "zap": return <Bolt size={size} className={className} />;
    case "leaf": return <Leaf size={size} className={className} />;
    case "shield":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
  }
}

export function KeyTakeaways({ takeaways }: { takeaways: KeyTakeaway[] }) {
  return (
    <div
      className="rounded-2xl bg-gradient-to-b from-white to-paper/60 border border-line/40 p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)]"
      style={{ animation: "rd-card-stagger 0.5s ease-out 0.12s both" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-moss)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <h3 className="ff text-[14px] font-semibold text-ink tracking-[-0.01em]">Key Takeaways</h3>
      </div>

      {/* Takeaway rows */}
      <div className="divide-y divide-line/30">
        {takeaways.map((t) => {
          const status = STATUS_STYLES[t.status];
          const iconStyle = ICON_STYLES[t.icon];
          return (
            <div key={t.category} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
              <div className={`w-9 h-9 rounded-full ${iconStyle.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                <TakeawayIcon icon={t.icon} className={iconStyle.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-ink leading-tight">{t.title}</p>
                <p className="text-[11px] text-muted leading-relaxed mt-0.5">{t.description}</p>
              </div>
              <span className={`shrink-0 text-[8px] font-bold uppercase tracking-[0.06em] px-2 py-1 rounded-full whitespace-nowrap ${status.bg} ${status.text}`}>
                {status.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
