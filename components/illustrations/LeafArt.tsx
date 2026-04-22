type LeafArtProps = { color?: string; bg?: string; className?: string };

export function LeafArt({ color = "#3d4a2a", bg = "#f4efe4", className }: LeafArtProps) {
  return (
    <svg viewBox="0 0 200 260" className={className} style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="200" height="260" fill={bg} />
      <g transform="translate(100 130)" opacity="0.85">
        <path d="M 0 -80 Q -60 -40 -60 20 Q -60 70 0 80 Q 60 70 60 20 Q 60 -40 0 -80 Z" fill={color} opacity="0.2" />
        <path d="M 0 -60 Q -40 -30 -40 20 Q -40 55 0 60 Q 40 55 40 20 Q 40 -30 0 -60 Z" fill={color} opacity="0.35" />
        <path d="M 0 -40 L 0 60" stroke={color} strokeWidth="1" opacity="0.5" />
        <path d="M 0 -20 Q 15 -15 25 0" stroke={color} strokeWidth="0.7" fill="none" opacity="0.5" />
        <path d="M 0 -20 Q -15 -15 -25 0" stroke={color} strokeWidth="0.7" fill="none" opacity="0.5" />
        <path d="M 0 10 Q 20 20 30 35" stroke={color} strokeWidth="0.7" fill="none" opacity="0.5" />
        <path d="M 0 10 Q -20 20 -30 35" stroke={color} strokeWidth="0.7" fill="none" opacity="0.5" />
      </g>
    </svg>
  );
}
