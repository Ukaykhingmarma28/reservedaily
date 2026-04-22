const items = [
  { t: "Vetted providers", k: "47 clinics" },
  { t: "Clinical-grade exosomes", k: "cGMP certified" },
  { t: "Certified outcomes", k: "Third-party verified" },
  { t: "Concierge booking", k: "7 days a week" },
  { t: "Member-only pricing", k: "Save up to 20%" },
  { t: "Lab-to-clinic continuity", k: "One record" },
  { t: "Regenerative medicine", k: "Peer-reviewed" },
];

export function Marquee() {
  const loop = [...items, ...items];
  return (
    <section className="bg-moss text-cream border-y border-line-2 overflow-hidden py-[18px]">
      <div
        className="flex gap-14 whitespace-nowrap w-max"
        style={{ animation: "rd-marquee 48s linear infinite" }}
      >
        {loop.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-3.5">
            <span className="ff text-[22px] font-light text-cream">{it.t}</span>
            <span className="text-[10px] tracking-[0.16em] uppercase opacity-65 font-medium">{it.k}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cream opacity-35 ml-3.5" />
          </span>
        ))}
      </div>
    </section>
  );
}
