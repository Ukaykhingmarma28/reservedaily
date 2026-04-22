import type { JournalPost } from "@/lib/data";

type Kind = JournalPost["art"];

export function PlaceholderArt({ kind }: { kind: Kind }) {
  if (kind === "rings") {
    return (
      <svg viewBox="0 0 400 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="block">
        <rect width="400" height="260" fill="var(--color-sage)" />
        {Array.from({ length: 8 }).map((_, k) => (
          <circle
            key={k}
            cx="200"
            cy="130"
            r={18 + k * 14}
            fill="none"
            stroke="var(--color-moss)"
            strokeWidth="0.8"
            opacity={0.5 - k * 0.04}
            strokeDasharray={k % 2 ? "3 3" : "0"}
          />
        ))}
        <circle cx="200" cy="130" r="6" fill="var(--color-moss)" />
      </svg>
    );
  }
  if (kind === "pulse") {
    return (
      <svg viewBox="0 0 400 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="block">
        <rect width="400" height="260" fill="var(--color-butter)" />
        <path
          d="M0 170 L50 170 L70 100 L90 200 L120 130 L160 170 L210 170 L240 60 L270 210 L320 170 L400 170"
          stroke="var(--color-moss)"
          strokeWidth="1.8"
          fill="none"
        />
        <circle cx="240" cy="60" r="4" fill="var(--color-moss)" />
      </svg>
    );
  }
  if (kind === "page") {
    return (
      <svg viewBox="0 0 400 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="block">
        <rect width="400" height="260" fill="var(--color-cream)" />
        <defs>
          <pattern id="jgdots" patternUnits="userSpaceOnUse" width="14" height="14">
            <circle cx="2" cy="2" r="1" fill="var(--color-moss)" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="400" height="260" fill="url(#jgdots)" />
        <g transform="translate(200,130)">
          <rect x="-80" y="-50" width="160" height="100" fill="var(--color-paper)" stroke="var(--color-moss)" strokeWidth="0.8" />
          <line x1="-65" y1="-30" x2="65" y2="-30" stroke="var(--color-moss)" strokeWidth="0.5" opacity="0.4" />
          <line x1="-65" y1="-15" x2="40" y2="-15" stroke="var(--color-moss)" strokeWidth="0.5" opacity="0.4" />
          <line x1="-65" y1="0" x2="55" y2="0" stroke="var(--color-moss)" strokeWidth="0.5" opacity="0.4" />
          <line x1="-65" y1="15" x2="30" y2="15" stroke="var(--color-moss)" strokeWidth="0.5" opacity="0.4" />
          <rect x="-65" y="28" width="30" height="12" fill="var(--color-moss)" opacity="0.8" />
        </g>
      </svg>
    );
  }
  if (kind === "weave") {
    return (
      <svg viewBox="0 0 400 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="block">
        <rect width="400" height="260" fill="var(--color-sage)" />
        {Array.from({ length: 14 }).map((_, k) => (
          <path
            key={k}
            d={`M${-40 + k * 40} 0 Q${10 + k * 40} 130 ${-40 + k * 40} 260`}
            stroke="var(--color-moss)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.55"
          />
        ))}
      </svg>
    );
  }
  if (kind === "grid") {
    return (
      <svg viewBox="0 0 400 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="block">
        <rect width="400" height="260" fill="var(--color-paper)" />
        {Array.from({ length: 10 }).flatMap((_, r) =>
          Array.from({ length: 16 }).map((__, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * 26}
              y={r * 26}
              width="14"
              height="14"
              fill="var(--color-moss)"
              opacity={((r * c) % 7) / 20 + 0.05}
            />
          ))
        )}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 260" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="block">
      <rect width="400" height="260" fill="var(--color-cream)" />
      {Array.from({ length: 12 }).map((_, k) => (
        <path
          key={k}
          d={`M0 ${40 + k * 16} Q100 ${20 + k * 16} 200 ${40 + k * 16} T400 ${40 + k * 16}`}
          stroke="var(--color-moss)"
          strokeWidth="0.7"
          fill="none"
          opacity={0.5 - k * 0.03}
        />
      ))}
    </svg>
  );
}
