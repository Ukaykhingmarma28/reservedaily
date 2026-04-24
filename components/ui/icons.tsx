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

export function Send({ size = 18, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Paperclip({ size = 18, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ size = 18, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Calendar({ size = 16, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Upload({ size = 18, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FileText({ size = 18, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function MessageSquare({ size = 16, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Home({ size = 16, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Settings({ size = 16, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PanelLeft({ size = 16, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M9 3v18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function User({ size = 18, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base(size)} {...p}>
      <path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}
