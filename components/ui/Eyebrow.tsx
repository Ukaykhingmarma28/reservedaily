import type { ReactNode } from "react";

type EyebrowProps = {
  tone?: "moss" | "ink" | "muted" | "cream";
  withLine?: boolean;
  className?: string;
  children: ReactNode;
};

const toneClass = {
  moss: "text-moss",
  ink: "text-ink",
  muted: "text-muted",
  cream: "text-cream/70",
};

export function Eyebrow({ tone = "moss", withLine = true, className = "", children }: EyebrowProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneClass[tone]} ${className}`}
    >
      {withLine && <span className="inline-block h-px w-8 bg-current opacity-60" />}
      <span>{children}</span>
    </div>
  );
}
