import { ArrowRight, Check } from "@/components/ui/icons";

export function CTA() {
  return (
    <section className="py-16 lg:py-28 px-6 md:px-10 bg-cream border-b border-line-2 relative overflow-hidden">
      <svg
        aria-hidden
        viewBox="0 0 520 520"
        className="absolute -right-[140px] -bottom-[160px] w-[320px] h-[320px] lg:w-[560px] lg:h-[560px] opacity-55 pointer-events-none"
      >
        {[240, 200, 160, 120, 80, 40].map((r, i) => (
          <circle
            key={r}
            cx="260"
            cy="260"
            r={r}
            fill="none"
            stroke="var(--color-moss)"
            strokeWidth="0.7"
            opacity={0.35 - i * 0.04}
            strokeDasharray={i % 2 ? "3 4" : "0"}
          />
        ))}
      </svg>

      <div className="max-w-[1400px] mx-auto relative z-[1]">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-4 lg:gap-20 lg:items-end pb-8 lg:pb-12 border-b border-line-2">
          <div>
            <div className="flex items-center gap-3 text-[11px] text-moss tracking-[0.18em] uppercase font-semibold mb-4 lg:mb-6">
              <span className="w-6 h-px bg-moss" />
              Start with a conversation
            </div>
            <h2
              className="ff text-[clamp(36px,9vw,48px)] lg:text-[clamp(48px,5.5vw,86px)] font-normal tracking-[-0.03em] leading-[0.96] text-ink text-balance m-0 max-w-[900px]"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              Your first <span className="ff text-moss">consult</span>
              <br />
              is on us<span className="ff text-moss">.</span>
            </h2>
          </div>
          <p className="text-sm lg:text-base leading-[1.55] text-ink-2 max-w-[360px] m-0 lg:pb-2">
            Create a free account and book a 20-minute concierge call with a licensed practitioner. No payment, no
            commitment, just a plan you can trust.
          </p>
        </div>

        <div className="pt-6 lg:pt-10 flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-5">
          <a
            href="#"
            className="flex items-end justify-between gap-5 p-6 lg:p-9 lg:pb-8 bg-ink text-cream no-underline transition-transform duration-200 relative overflow-hidden hover:-translate-y-0.5"
          >
            <svg
              aria-hidden
              viewBox="0 0 400 120"
              className="absolute -right-10 top-5 w-[260px] h-20 opacity-25"
            >
              <path
                d="M0 60 L60 60 L80 20 L100 90 L130 50 L180 60 L220 60 L250 10 L280 100 L320 60 L400 60"
                stroke="var(--color-butter)"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
            <div className="relative z-[1]">
              <div className="text-[10px] text-butter tracking-[0.16em] uppercase font-semibold mb-2.5 lg:mb-3.5">
                Recommended · Free
              </div>
              <div
                className="ff text-[22px] lg:text-[clamp(28px,2.6vw,38px)] font-normal tracking-[-0.025em] leading-[1.05] mb-1.5 lg:mb-2.5"
                style={{ fontVariationSettings: '"opsz" 144' }}
              >
                Book a free <span className="ff text-butter">consultation</span>
              </div>
              <div className="text-[12px] lg:text-[13px] text-cream/70 leading-[1.5] max-w-[380px]">
                20 min · video or WhatsApp · with a licensed practitioner. Walk away with a plan, not a pitch.
              </div>
            </div>
            <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-full bg-butter text-ink flex items-center justify-center flex-shrink-0 relative z-[1]">
              <ArrowRight size={18} />
            </div>
          </a>

          <a
            href="#"
            className="flex items-end justify-between gap-5 p-6 lg:p-9 lg:pb-8 bg-paper text-ink border border-line no-underline transition-colors relative overflow-hidden hover:border-ink"
          >
            <div className="relative z-[1]">
              <div className="text-[10px] text-moss tracking-[0.16em] uppercase font-semibold mb-2.5 lg:mb-3.5">
                Set up · 60 seconds
              </div>
              <div
                className="ff text-[22px] lg:text-[clamp(28px,2.6vw,38px)] font-normal tracking-[-0.025em] leading-[1.05] mb-1.5 lg:mb-2.5"
                style={{ fontVariationSettings: '"opsz" 144' }}
              >
                Create your <span className="ff text-moss">account</span>
              </div>
              <div className="text-[12px] lg:text-[13px] text-ink-2 leading-[1.5] max-w-[380px]">
                Save providers, track bookings, and unlock Vital AI to read your labs. No credit card required.
              </div>
            </div>
            <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-full bg-sage text-moss flex items-center justify-center border border-line-2 flex-shrink-0 relative z-[1]">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                <circle cx="10" cy="7" r="3.2" stroke="currentColor" strokeWidth="1.4" />
                <path
                  d="M3.5 17c.8-3.1 3.4-5 6.5-5s5.7 1.9 6.5 5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </a>
        </div>

        <div className="mt-5 lg:mt-6 pt-5 lg:pt-6 border-t border-line-2 flex flex-col lg:flex-row justify-between lg:items-center gap-4 lg:gap-5 text-[11px] lg:text-xs text-ink-2">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 lg:items-center">
            <span className="inline-flex items-center gap-2">
              <span className="text-moss">
                <Check />
              </span>
              No credit card required
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-moss">
                <Check />
              </span>
              Licensed Malaysian practitioners
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-moss">
                <Check />
              </span>
              Cancel or reschedule free
            </span>
          </div>
          <span className="ff text-[12px] lg:text-[13px] text-moss">Reserve your path to wellness.</span>
        </div>
      </div>
    </section>
  );
}
