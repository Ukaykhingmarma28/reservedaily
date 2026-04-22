import type { HTMLAttributes, ReactNode } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "narrow" | "default" | "wide" | "full";
  children: ReactNode;
};

const sizeClass = {
  narrow: "max-w-[960px]",
  default: "max-w-[1200px]",
  wide: "max-w-[1400px]",
  full: "max-w-[1760px]",
};

export function Container({
  size = "default",
  className = "",
  children,
  ...rest
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-6 md:px-10 ${sizeClass[size]} ${className}`} {...rest}>
      {children}
    </div>
  );
}
