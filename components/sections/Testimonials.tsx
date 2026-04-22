"use client";

import { useEffect, useState } from "react";
import type { Review } from "@/lib/data";

const reviews: Review[] = [
  {
    q: "I'd been curious about exosome therapy for years but never knew where to start. ReserveDaily made it simple, credentials shown, pricing transparent, clinic excellent.",
    n: "Amira R.", r: "Marketing Director", city: "Kuala Lumpur",
    treatment: "Exosome IV Therapy", clinic: "Renewal Wellness", rating: 5, date: "March 2026",
  },
  {
    q: "As a physician, I was sceptical of marketplaces for medical services. The vetting here is rigorous, I've referred my own patients.",
    n: "Dr. Jason T.", r: "Sports Physician", city: "Penang",
    treatment: "Provider Partner", clinic: "Mountbatten Clinic", rating: 5, date: "February 2026",
  },
  {
    q: "The Vital AI preview sold me. Knowing my blood work could guide the right treatment changed how I think about wellness spending.",
    n: "Priya S.", r: "Entrepreneur", city: "Kuala Lumpur",
    treatment: "Vital AI + NAD+ Drip", clinic: "Atlas Longevity", rating: 5, date: "March 2026",
  },
  {
    q: "Booked my first HIFU facial with zero hassle. Concierge texted me a reschedule option, no phone calls, no awkward emails.",
    n: "Lina M.", r: "Architect", city: "Johor Bahru",
    treatment: "HIFU Ultraformer III", clinic: "Luna Aesthetics", rating: 5, date: "January 2026",
  },
  {
    q: "I travel for work, comparing clinics across KL and Penang on one screen saved me hours. Everything I needed was right there.",
    n: "Marcus W.", r: "Investment Banker", city: "Singapore",
    treatment: "Full-Body MRI Screen", clinic: "Prenetics Health", rating: 4, date: "February 2026",
  },
];

function Stars({ r, size = 12 }: { r: number; size?: number }) {
  return (
    <div className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={n <= r ? "var(--color-moss)" : "none"}
          stroke={n <= r ? "var(--color-moss)" : "var(--color-line)"}
          strokeWidth="1"
          aria-hidden
        >
          <path
            d="M10 1.5l2.5 5.3 5.8.8-4.2 4 1 5.8L10 14.7l-5.1 2.7 1-5.8-4.2-4 5.8-.8z"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <div
      className="rounded-full bg-sage-2 text-moss inline-flex items-center justify-center ff font-medium tracking-[-0.02em] flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {name.charAt(0)}
    </div>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 8000);
    return () => clearInterval(t);
  }, [paused]);

  const c = reviews[i];
  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="py-14 lg:py-24 px-6 md:px-10 bg-paper border-b border-line-2"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-4 lg:gap-10 lg:items-end mb-6 lg:mb-10">
          <div>
            <div className="flex items-center gap-3 text-[11px] text-moss tracking-[0.18em] uppercase font-semibold mb-3 lg:mb-4">
              <span className="w-6 h-px bg-moss" />
              Verified member reviews
            </div>
            <h2
              className="ff text-[clamp(28px,7vw,38px)] lg:text-[clamp(40px,4vw,58px)] font-normal tracking-[-0.025em] leading-tight text-ink text-balance"
            >
              What our members <span className="ff text-moss">are saying</span>.
            </h2>
          </div>
          <div className="flex items-center gap-3 lg:gap-4 lg:pb-1">
            <div
              className="ff text-[32px] lg:text-[40px] font-normal leading-none text-ink tracking-[-0.025em]"
            >
              {avgRating}
              <span className="text-muted text-[0.45em]">/5</span>
            </div>
            <div className="border-l border-line-2 pl-3 lg:pl-4">
              <Stars r={5} size={11} />
              <div className="text-[10px] lg:text-[11px] text-ink-2 mt-1">
                <span className="font-semibold text-ink">1,284</span> verified reviews ·{" "}
                <b className="text-moss">98%</b> recommend
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: single review card */}
        <div className="lg:hidden">
          <div
            key={`mq-${i}`}
            className="bg-cream border border-line p-5 [animation:rd-rev-fade_500ms_cubic-bezier(0.22,1,0.36,1)]"
          >
            <div className="flex items-center gap-2 mb-4">
              <Stars r={c.rating} size={11} />
              <span className="text-[10px] text-muted">· Verified · {c.date}</span>
            </div>
            <p
              className="ff text-[17px] font-normal tracking-[-0.01em] leading-[1.4] text-ink m-0 mb-5"
            >
              <span className="ff text-moss">&ldquo;</span>
              {c.q}
              <span className="ff text-moss">&rdquo;</span>
            </p>
            <div className="pt-4 border-t border-line-2 flex items-center gap-3">
              <Avatar name={c.n} size={36} />
              <div className="flex-1 min-w-0">
                <div className="ff text-sm font-medium tracking-[-0.01em] text-ink">{c.n}</div>
                <div className="text-[10px] text-ink-2 mt-px">{c.r} · {c.city}</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-line-2">
              <div className="text-[11px] text-muted">
                <span className="ff text-[12px] text-ink">{c.treatment}</span>
                <span className="text-[10px]"> at {c.clinic}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: two-column grid */}
        <div className="hidden lg:grid grid-cols-[1.6fr_1fr] bg-cream border border-line overflow-hidden">
          <div
            key={`q-${i}`}
            className="p-9 border-r border-line-2 flex flex-col justify-between min-h-[280px] [animation:rd-rev-fade_500ms_cubic-bezier(0.22,1,0.36,1)]"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-[18px]">
                <Stars r={c.rating} size={13} />
                <span className="text-[11px] text-muted">· Verified · {c.date}</span>
              </div>
              <p
                className="ff text-[clamp(19px,1.5vw,24px)] font-normal tracking-[-0.01em] leading-[1.4] text-ink m-0"
              >
                <span className="ff text-moss">&ldquo;</span>
                {c.q}
                <span className="ff text-moss">&rdquo;</span>
              </p>
            </div>
            <div className="mt-7 pt-5 border-t border-line-2 flex items-center gap-3.5">
              <Avatar name={c.n} size={40} />
              <div className="flex-1 min-w-0">
                <div className="ff text-base font-medium tracking-[-0.01em] text-ink">{c.n}</div>
                <div className="text-[11px] text-ink-2 mt-px">
                  {c.r} · {c.city}
                </div>
              </div>
              <div className="text-right text-[11px] text-muted">
                <div className="ff text-[13px] text-ink">{c.treatment}</div>
                <div className="mt-px text-[10px]">at {c.clinic}</div>
              </div>
            </div>
          </div>

          <div className="bg-paper p-3.5 flex flex-col gap-0.5">
            {reviews.map((r, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`text-left p-3 cursor-pointer flex gap-2.5 items-center transition-colors font-sans flex-1 border ${
                  idx === i ? "bg-cream border-line" : "bg-transparent border-transparent"
                }`}
              >
                <Avatar name={r.n} size={28} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-semibold text-ink tracking-[-0.01em]">{r.n}</span>
                    <Stars r={r.rating} size={9} />
                  </div>
                  <div className="text-[11px] text-ink-2 leading-[1.4] overflow-hidden text-ellipsis whitespace-nowrap">
                    {r.q.replace(/^["']|["']$/g, "")}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-4 lg:mt-5">
          <div className="flex gap-1.5">
            {reviews.map((_, j) => (
              <button
                key={j}
                onClick={() => setI(j)}
                aria-label={`Review ${j + 1}`}
                className={`border-none p-0 cursor-pointer h-0.5 transition-all duration-300 ${
                  j === i ? "w-6 bg-ink" : "w-2 bg-line"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setI((x) => (x - 1 + reviews.length) % reviews.length)}
              aria-label="Previous review"
              className="w-8 h-8 lg:w-[34px] lg:h-[34px] border border-line bg-cream cursor-pointer flex items-center justify-center text-ink"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => setI((x) => (x + 1) % reviews.length)}
              aria-label="Next review"
              className="w-8 h-8 lg:w-[34px] lg:h-[34px] border border-ink bg-ink text-cream cursor-pointer flex items-center justify-center"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
