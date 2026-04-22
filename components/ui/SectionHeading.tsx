import type { ReactNode } from "react";

type As = "h1" | "h2" | "h3";
type Size = "display" | "xl" | "lg" | "md";

type SectionHeadingProps = {
  as?: As;
  size?: Size;
  tone?: "ink" | "cream" | "moss";
  className?: string;
  children: ReactNode;
};

const sizeClass: Record<Size, string> = {
  display: "text-[clamp(52px,6.2vw,94px)] leading-[0.95] tracking-[-0.03em]",
  xl: "text-[clamp(40px,4.6vw,72px)] leading-[1] tracking-[-0.025em]",
  lg: "text-[clamp(32px,3.4vw,52px)] leading-[1.05] tracking-[-0.02em]",
  md: "text-[clamp(26px,2.4vw,38px)] leading-[1.1] tracking-[-0.015em]",
};

const toneClass = {
  ink: "text-ink",
  cream: "text-cream",
  moss: "text-moss",
};

export function SectionHeading({
  as = "h2",
  size = "xl",
  tone = "ink",
  className = "",
  children,
}: SectionHeadingProps) {
  const Tag = as;
  return (
    <Tag
      className={`ff font-normal text-balance ${sizeClass[size]} ${toneClass[tone]} ${className}`}
    >
      {children}
    </Tag>
  );
}
