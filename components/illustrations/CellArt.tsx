type CellArtProps = { color?: string; bg?: string; className?: string };

export function CellArt({ color = "#b85c2e", bg = "#f4efe4", className }: CellArtProps) {
  return (
    <svg viewBox="0 0 200 260" className={className} style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="200" height="260" fill={bg} />
      <g transform="translate(100 130)">
        <circle r="75" fill={color} opacity="0.12" />
        <circle r="55" fill={color} opacity="0.2" />
        <circle r="36" fill={color} opacity="0.35" />
        <circle r="20" fill={color} opacity="0.6" />
        <circle cx="-30" cy="-28" r="6" fill={color} opacity="0.8" />
        <circle cx="35" cy="-18" r="4" fill={color} opacity="0.7" />
        <circle cx="28" cy="38" r="5" fill={color} opacity="0.75" />
        <circle cx="-38" cy="32" r="3" fill={color} opacity="0.6" />
      </g>
    </svg>
  );
}
