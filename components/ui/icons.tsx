import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  fill: "none" as const,
  "aria-hidden": true,
  focusable: false,
});

export function ArrowRight({ size = 14, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...base(size)} {...p}>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Plus({ size = 12, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 12 12" {...base(size)} {...p}>
      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Star({ size = 12, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 14 14" width={size} height={size} fill="currentColor" aria-hidden focusable={false} {...p}>
      <path d="M7 1l1.5 4h4l-3.3 2.4 1.3 4L7 9l-3.5 2.4 1.3-4L1.5 5h4z" />
    </svg>
  );
}

export function Check({ size = 12, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 14 14" {...base(size)} {...p}>
      <path
        d="M2 7l3.5 3.5L12 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Leaf({ size = 16, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M20 4C10 4 4 10 4 20h2c.6-3 2.2-5.4 4.6-7.4.8-.8 1.2-.3.6.6C9.2 15.2 8 18 7.6 20h.8c2.4 0 5.6-1.2 8-3.6C18.8 14 20 10.8 20 4z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export function Dna({ size = 16, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M6 4c0 6 12 8 12 16M18 4c0 6-12 8-12 16M8 7h8M7 10h10M8 14h8M9 17h6"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function Droplet({ size = 16, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path d="M12 3c0 0-7 7-7 12a7 7 0 0014 0c0-5-7-12-7-12z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Heart({ size = 16, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M12 20s-7-4.5-7-10.5A4 4 0 0112 7a4 4 0 017 2.5C19 15.5 12 20 12 20z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function Bolt({ size = 16, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path d="M13 3L5 14h6l-2 7 9-11h-6l1-7z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Brain({ size = 16, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M12 5c-3 0-5 2-5 4 0 1-1 1-1 3s1 2 1 3c0 2 2 4 5 4s5-2 5-4c0-1 1-1 1-3s-1-2-1-3c0-2-2-4-5-4zM12 5v14M9 9c1 0 2 1 2 2M15 9c-1 0-2 1-2 2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function Search({ size = 14, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...base(size)} {...p}>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Cart({ size = 14, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...base(size)} {...p}>
      <path
        d="M2 2h2l1.5 9a1 1 0 001 .8h6a1 1 0 001-.8L15 5H5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="14" r="1" fill="currentColor" />
      <circle cx="12.5" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

export function ChevronDown({ size = 10, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function ChevronRight({ size = 10, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Menu({ size = 18, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Spa({ size = 16, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M12 21c-4-4-8-7.5-8-11a8 8 0 0116 0c0 3.5-4 7-8 11z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13c-2-2-4-3.5-4-5.5a4 4 0 018 0c0 2-2 3.5-4 5.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Close({ size = 18, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
