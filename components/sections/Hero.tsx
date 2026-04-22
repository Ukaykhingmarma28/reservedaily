"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";

type Slide = {
  eyebrow: string;
  title: [string, string, string];
  sub: string;
  cta: string;
  img: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Vol. 01 · Regeneration",
    title: ["Reconnect with", "yourself", ", daily."],
    sub: "Malaysia's first curated wellness marketplace. Vetted treatments, from exosome regeneration to mind–mood balance.",
    cta: "SHOP WELLNESS",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1800&q=80&auto=format&fit=crop",
  },
  {
    eyebrow: "Vol. 02 · Intelligence",
    title: ["Wellness, read from", "your blood", "."],
    sub: "Upload your blood panel. Vital AI interprets your biomarkers and matches you with the exact providers your biology needs.",
    cta: "TRY VITAL AI",
    img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1800&q=80&auto=format&fit=crop",
  },
  {
    eyebrow: "Vol. 03 · Restoration",
    title: ["Age, on", "your terms", "."],
    sub: "HIFU, injectables, microneedling, PRP, the full aesthetic catalogue, every provider rigorously vetted for safety and results.",
    cta: "EXPLORE AESTHETICS",
    img: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=1800&q=80&auto=format&fit=crop",
  },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  const go = (n: number) => setI((n + slides.length) % slides.length);
  const s = slides[i];

  return (
    <section
      className="relative border-b border-line-2 h-[78vh] min-h-[600px] max-h-[820px] overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchRef.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchRef.current == null) return;
        const dx = e.changedTouches[0].clientX - touchRef.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
        touchRef.current = null;
      }}
    >
      {slides.map((slide, k) => (
        <div
          key={k}
          className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
            k === i ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={slide.img}
            alt=""
            fill
            priority={k === 0}
            sizes="100vw"
            className={`object-cover transition-transform ease-out ${k === i ? "scale-[1.04] duration-[7000ms]" : "scale-100"}`}
            style={{ filter: "brightness(0.78) saturate(0.92)" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,26,58,0.7)_0%,rgba(20,26,58,0.35)_50%,rgba(20,26,58,0.55)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,26,58,0.2)_0%,transparent_30%,transparent_70%,rgba(20,26,58,0.4)_100%)]" />
        </div>
      ))}

      <div className="relative z-[2] h-full max-w-[1400px] mx-auto px-6 md:px-10 flex items-center">
        <div className="max-w-[640px]">
          <div
            key={`e${i}`}
            className="flex items-center gap-3 text-[11px] text-butter tracking-[0.18em] uppercase font-semibold mb-8 [animation:rd-hero-fade_0.8s_ease_both]"
          >
            <span className="w-6 h-px bg-butter" />
            {s.eyebrow}
          </div>
          <h1
            key={`t${i}`}
            className="ff text-[clamp(52px,6.2vw,94px)] font-normal leading-[0.95] tracking-[-0.03em] text-cream mb-8 [animation:rd-hero-fade_0.9s_ease_both]"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            {s.title[0]}
            <br />
            <span className="ff text-butter">{s.title[1]}</span>
            {s.title[2]}
          </h1>
          <p
            key={`p${i}`}
            className="text-[17px] leading-[1.55] text-cream/85 max-w-[500px] mb-10 [animation:rd-hero-fade_1s_ease_both]"
          >
            {s.sub}
          </p>
          <div key={`b${i}`} className="flex gap-3 items-center [animation:rd-hero-fade_1.1s_ease_both]">
            <button className="bg-cream text-ink border-none px-7 py-[15px] text-[13px] font-semibold tracking-[0.06em] cursor-pointer flex items-center gap-2.5">
              {s.cta} <ArrowRight />
            </button>
            <button className="bg-transparent text-cream border border-cream/50 px-6 py-[14px] text-[13px] font-medium tracking-[0.06em] cursor-pointer">
              HOW IT WORKS
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-9 left-10 z-[3] flex items-center gap-5">
        <div className="flex gap-2">
          {slides.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Slide ${k + 1}`}
              className={`border-none p-0 cursor-pointer h-0.5 transition-all duration-[400ms] ${
                k === i ? "w-9 bg-butter" : "w-3 bg-cream/35"
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] text-cream/70 tracking-[0.14em] font-medium">
          {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      <div className="absolute bottom-8 right-6 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-6 z-[3] flex flex-row lg:flex-col gap-2.5">
        <button
          onClick={() => go(i - 1)}
          aria-label="Previous slide"
          className="w-11 h-11 border border-cream/40 bg-ink/30 text-cream cursor-pointer backdrop-blur flex items-center justify-center"
        >
          <span className="rotate-180 flex">
            <ArrowRight />
          </span>
        </button>
        <button
          onClick={() => go(i + 1)}
          aria-label="Next slide"
          className="w-11 h-11 border border-cream/40 bg-ink/30 text-cream cursor-pointer backdrop-blur flex items-center justify-center"
        >
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}
