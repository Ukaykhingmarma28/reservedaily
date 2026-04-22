import type { ReactNode } from "react";

type Tone = "moss" | "rust" | "butter" | "berry" | "ink" | "sage" | "muted";

type BadgeProps = {
  tone?: Tone;
  outline?: boolean;
  className?: string;
  children: ReactNode;
};

const solid: Record<Tone, string> = {
  moss: "bg-moss text-cream",
  rust: "bg-rust text-cream",
  butter: "bg-butter text-ink",
  berry: "bg-berry text-cream",
  ink: "bg-ink text-cream",
  sage: "bg-sage text-ink",
  muted: "bg-paper text-muted",
};

const outlined: Record<Tone, string> = {
  moss: "border border-moss text-moss bg-cream",
  rust: "border border-rust text-rust bg-cream",
  butter: "border border-butter text-ink bg-cream",
  berry: "border border-berry text-berry bg-cream",
  ink: "border border-ink text-ink bg-cream",
  sage: "border border-sage-2 text-ink bg-cream",
  muted: "border border-line text-muted bg-cream",
};

export function Badge({ tone = "ink", outline = false, className = "", children }: BadgeProps) {
  const palette = outline ? outlined[tone] : solid[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-1 rounded-[2px] leading-none ${palette} ${className}`}
    >
      {children}
    </span>
  );
}
