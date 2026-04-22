import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "pill" | "wide-pill" | "outline-ink";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

const variantClass: Record<Variant, string> = {
  primary:
    "bg-ink text-cream hover:bg-moss transition-colors font-semibold tracking-[0.03em]",
  secondary:
    "bg-cream text-ink border border-line hover:border-ink transition-colors font-medium",
  ghost:
    "bg-transparent text-ink hover:text-moss underline-offset-4 hover:underline font-medium",
  pill:
    "bg-paper text-ink border border-line rounded-[40px] hover:bg-sage transition-colors font-medium",
  "wide-pill":
    "bg-ink text-cream rounded-full hover:bg-moss transition-colors font-semibold tracking-[0.03em]",
  "outline-ink":
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-cream transition-colors font-semibold tracking-[0.03em]",
};

const sizeClass: Record<Size, string> = {
  sm: "text-[11px] px-3 py-2",
  md: "text-xs px-4 py-2.5",
  lg: "text-[13px] px-6 py-3.5",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const radius = variant === "pill" || variant === "wide-pill" ? "" : "rounded-[2px]";
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 cursor-pointer leading-none ${variantClass[variant]} ${sizeClass[size]} ${radius} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
