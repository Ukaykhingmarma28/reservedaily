import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "cream" | "paper" | "sage" | "ink" | "moss";
  bordered?: boolean;
  hoverLift?: boolean;
  children: ReactNode;
};

const toneClass = {
  cream: "bg-cream text-ink",
  paper: "bg-paper text-ink",
  sage: "bg-sage text-ink",
  ink: "bg-ink text-cream",
  moss: "bg-moss text-cream",
};

export function Card({
  tone = "cream",
  bordered = true,
  hoverLift = false,
  className = "",
  children,
  ...rest
}: CardProps) {
  const border = bordered ? "border border-line-2" : "";
  const hover = hoverLift
    ? "transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(20,26,58,0.08)]"
    : "";
  return (
    <div
      className={`rounded-[10px] overflow-hidden ${toneClass[tone]} ${border} ${hover} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
