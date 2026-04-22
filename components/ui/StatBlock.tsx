type StatBlockProps = {
  n: string;
  l: string;
  tone?: "ink" | "cream" | "moss";
  size?: "md" | "lg";
  className?: string;
};

const toneClass = {
  ink: { number: "text-ink", label: "text-muted" },
  cream: { number: "text-cream", label: "text-cream/70" },
  moss: { number: "text-moss", label: "text-ink-2" },
};

const sizeClass = {
  md: "text-[clamp(32px,3vw,48px)]",
  lg: "text-[clamp(44px,4.2vw,68px)]",
};

export function StatBlock({ n, l, tone = "ink", size = "md", className = "" }: StatBlockProps) {
  const palette = toneClass[tone];
  return (
    <div className={className}>
      <div className={`ff font-normal tracking-[-0.02em] leading-none ${sizeClass[size]} ${palette.number}`}>
        {n}
      </div>
      <div
        className={`mt-3 text-[11px] font-medium uppercase tracking-[0.14em] ${palette.label}`}
      >
        {l}
      </div>
    </div>
  );
}
