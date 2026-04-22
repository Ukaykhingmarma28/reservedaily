type ProfileArtProps = { bg?: string; skin?: string; className?: string };

export function ProfileArt({ bg = "#d9dcbf", skin = "#e8c9a6", className }: ProfileArtProps) {
  return (
    <svg viewBox="0 0 200 260" className={className} style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="200" height="260" fill={bg} />
      <g transform="translate(100 130)">
        <circle cx="0" cy="-20" r="45" fill={skin} />
        <path d="M -55 90 Q -55 30 0 30 Q 55 30 55 90 Z" fill={skin} />
        <path
          d="M -45 -50 Q -50 -70 -30 -75 Q 0 -85 30 -75 Q 50 -70 45 -50 Q 50 -30 45 -10 L 45 0 Q 20 -5 0 -5 Q -20 -5 -45 0 L -45 -10 Q -50 -30 -45 -50 Z"
          fill="#3a3935"
          opacity="0.88"
        />
        <ellipse cx="-15" cy="-20" rx="2" ry="2.5" fill="#1a1a17" />
        <ellipse cx="15" cy="-20" rx="2" ry="2.5" fill="#1a1a17" />
        <path d="M -10 0 Q 0 4 10 0" stroke="#1a1a17" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
