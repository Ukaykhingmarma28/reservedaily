const stats = [
  { n: "120+", l: "Vetted clinic partners" },
  { n: "50,000+", l: "Treatments booked" },
  { n: "4.8", l: "Average rating" },
  { n: "100%", l: "Doctor-certified listings" },
];

export function TrustStats() {
  return (
    <section className="py-16 px-6 md:px-10 bg-cream border-b border-line-2">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 border-y border-line-2">
        {stats.map((s, i) => (
          <div
            key={s.n}
            className={`px-7 py-8 flex flex-col gap-2.5 ${
              i < stats.length - 1 ? "lg:border-r border-line-2" : ""
            } ${i % 2 === 0 ? "border-r lg:border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""}`}
          >
            <div
              className="ff text-[clamp(36px,3vw,48px)] font-normal tracking-[-0.03em] leading-none text-ink"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              {s.n}
            </div>
            <div className="text-xs text-ink-2 tracking-[0.04em] uppercase font-medium">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
