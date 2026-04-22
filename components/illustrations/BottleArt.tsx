type BottleArtProps = { color?: string; bg?: string; className?: string };

export function BottleArt({ color = "#3d4a2a", bg = "#e8ead4", className }: BottleArtProps) {
  return (
    <svg viewBox="0 0 200 260" className={className} style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="200" height="260" fill={bg} />
      <g transform="translate(100 130)">
        <rect x="-34" y="-80" width="68" height="20" rx="2" fill={color} opacity="0.85" />
        <rect x="-28" y="-60" width="56" height="8" fill={color} opacity="0.4" />
        <path d="M -42 -52 L -42 88 Q -42 100 -30 100 L 30 100 Q 42 100 42 88 L 42 -52 Z" fill={color} />
        <rect x="-30" y="-5" width="60" height="70" fill={bg} opacity="0.12" />
        <text x="0" y="30" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="11" fontStyle="normal" fill={bg} letterSpacing="1">
          Reserve
        </text>
        <line x1="-22" y1="40" x2="22" y2="40" stroke={bg} strokeWidth="0.5" opacity="0.4" />
        <text x="0" y="54" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="5.5" fill={bg} letterSpacing="2.5">
          N°001 · REGEN
        </text>
      </g>
    </svg>
  );
}
