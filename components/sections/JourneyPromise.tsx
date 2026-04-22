const pillars = [
  {
    t: "Approved partners",
    d: "Every clinic credentialed, inspected, and reviewed quarterly. We decline 7 of every 10 that apply.",
  },
  {
    t: "Transparent pricing",
    d: "Published prices. No hidden consult fees. No upsells at the door, what you book is what you pay.",
  },
  {
    t: "Integrated journey",
    d: "Medical, recovery, and daily habits in one account, Vital AI weaves your labs into every booking.",
  },
];

export function JourneyPromise() {
  return (
    <section className="py-14 lg:py-24 px-6 md:px-10 bg-cream border-b border-line-2">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-4 lg:gap-[60px] lg:items-end mb-8 lg:mb-14">
          <div>
            <div className="flex items-center gap-3 text-[11px] text-moss tracking-[0.18em] uppercase font-semibold mb-3 lg:mb-[18px]">
              <span className="w-6 h-px bg-moss" />
              Our promise
            </div>
            <h2
              className="ff text-[clamp(28px,7vw,38px)] lg:text-[clamp(40px,4vw,58px)] font-normal text-ink tracking-[-0.025em] leading-tight text-balance"
            >
              Your wellness <span className="ff text-moss">recovery</span> partner.
            </h2>
          </div>
          <p className="text-sm lg:text-base leading-[1.55] text-ink-2 max-w-[520px] lg:justify-self-end">
            Wellness that works, wherever you are. Medical-grade care, concierge booking, and one place to
            watch it all add up over time.
          </p>
        </div>

        {/* Mobile: stacked cards */}
        <div className="flex flex-col gap-3 lg:hidden">
          {/* 99% stat card */}
          <div className="bg-moss text-cream p-6 relative overflow-hidden flex items-center gap-5">
            <svg
              aria-hidden
              viewBox="0 0 200 200"
              className="absolute -right-8 -bottom-8 w-[160px] h-[160px] opacity-50"
            >
              {[90, 72, 54, 36, 18].map((r, j) => (
                <circle
                  key={j}
                  cx="100"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke="var(--color-butter)"
                  strokeWidth="0.6"
                  opacity={0.25 + j * 0.08}
                  strokeDasharray={j % 2 ? "2 3" : "0"}
                />
              ))}
            </svg>
            <div className="relative z-[1] shrink-0">
              <div
                className="ff text-[52px] font-normal tracking-[-0.04em] leading-[0.9]"
              >
                99
                <span className="text-[0.45em] align-top ml-0.5">%</span>
              </div>
            </div>
            <div className="relative z-[1]">
              <div className="text-[10px] text-butter tracking-[0.18em] uppercase font-semibold mb-1">
                Members returning
              </div>
              <div className="text-[11px] text-cream/70 leading-[1.5]">
                Client satisfaction, measured 90 days post-booking.
              </div>
            </div>
          </div>

          {/* Pillar cards */}
          {pillars.map((p, i) => (
            <div
              key={p.t}
              className="flex gap-4 items-start py-4 border-b border-line-2"
            >
              <div className="ff text-[12px] text-moss tracking-[-0.01em] shrink-0 pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div
                  className="ff text-[17px] font-normal tracking-[-0.02em] text-ink leading-[1.15] mb-1.5"
                >
                  {p.t}
                </div>
                <div className="text-[13px] text-ink-2 leading-[1.55]">{p.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: original 4-column grid */}
        <div className="hidden lg:grid grid-cols-[repeat(3,1fr)_0.85fr] border-y border-line-2">
          {pillars.map((p, i) => (
            <div
              key={p.t}
              className={`py-8 pr-7 ${i === 0 ? "pl-0" : "pl-7"} border-r border-line-2 flex flex-col gap-3.5`}
            >
              <div className="ff text-[13px] text-moss tracking-[-0.01em]">
                {String(i + 1).padStart(2, "0")} / 03
              </div>
              <div
                className="ff text-[22px] font-normal tracking-[-0.02em] text-ink leading-[1.15]"
              >
                {p.t}
              </div>
              <div className="text-sm text-ink-2 leading-[1.55]">{p.d}</div>
            </div>
          ))}

          <div className="bg-moss text-cream p-8 relative overflow-hidden flex flex-col justify-between -m-px">
            <svg
              aria-hidden
              viewBox="0 0 200 200"
              className="absolute -right-10 -bottom-10 w-[200px] h-[200px] opacity-50"
            >
              {[90, 72, 54, 36, 18].map((r, j) => (
                <circle
                  key={j}
                  cx="100"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke="var(--color-butter)"
                  strokeWidth="0.6"
                  opacity={0.25 + j * 0.08}
                  strokeDasharray={j % 2 ? "2 3" : "0"}
                />
              ))}
            </svg>
            <div className="relative z-[1]">
              <div className="text-[10px] text-butter tracking-[0.18em] uppercase font-semibold mb-3.5">
                Members returning
              </div>
              <div
                className="ff text-[clamp(64px,5vw,80px)] font-normal tracking-[-0.04em] leading-[0.9]"
              >
                99
                <span className="text-[0.45em] align-top ml-0.5">%</span>
              </div>
            </div>
            <div className="relative z-[1] text-xs text-cream/70 leading-[1.5] mt-4">
              Client satisfaction, measured 90 days post-booking.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
