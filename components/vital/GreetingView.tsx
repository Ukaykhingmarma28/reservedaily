"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { Upload, Send, Paperclip, User, Heart, Sparkle } from "@/components/ui/icons";
import Image from "next/image";
import { GREETING_TEXT } from "@/lib/vital/mock-data";

const SUGGESTED_PROMPTS = [
  "What vitamins should I take daily?",
  "IV drip benefits for recovery",
  "Best supplements for energy",
];

export function GreetingView({
  onStartUpload,
  onStartChat,
  onBrowseTreatments,
  onSend,
}: {
  onStartUpload: () => void;
  onStartChat: () => void;
  onBrowseTreatments: () => void;
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center px-5 sm:px-6 py-8 lg:py-14 relative overflow-y-auto">
      <div className="relative z-10 flex flex-col items-center text-center max-w-[520px] w-full gap-7 my-auto">
        {/* Logo */}
        <div style={{ animation: "rd-fade-up 0.5s ease-out both" }}>
          <Image src="/vital-logo.svg" alt="VitalNow AI" width={52} height={52} className="drop-shadow-sm" />
        </div>

        {/* Headline */}
        <div
          className="flex flex-col gap-2.5"
          style={{ animation: "rd-fade-up 0.5s ease-out 0.06s both" }}
        >
          <h1 className="ff text-[clamp(22px,4.5vw,28px)] font-semibold text-ink tracking-[-0.02em] leading-[1.25]">
            Hi! I&apos;m VitalNow AI.
            <br />
            How can I help you today?
          </h1>
          <p className="text-[13px] text-muted leading-relaxed max-w-[360px] mx-auto">
            {GREETING_TEXT}
          </p>
        </div>

        {/* Quick Actions */}
        <div
          className="w-full space-y-3"
          style={{ animation: "rd-fade-up 0.5s ease-out 0.12s both" }}
        >
          <p className="text-[10px] font-bold text-muted tracking-[0.08em] uppercase text-left">
            Quick Actions
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <QuickAction
              icon={<Upload size={18} className="text-white" />}
              bg="bg-rust"
              label="Analyse Blood Report"
              desc="Upload your blood panel for AI analysis"
              onClick={onStartUpload}
            />
            <QuickAction
              icon={<Sparkle size={18} className="text-white" />}
              bg="bg-berry"
              label="Browse Treatments"
              desc="IV drips, injections & supplements"
              onClick={onBrowseTreatments}
            />
            <QuickAction
              icon={<User size={18} className="text-white" />}
              bg="bg-moss-2"
              label="Book On-Demand Doctor"
              desc="Doctor consultations at home or hotel"
              onClick={() => onSend("I'd like to book an on-demand doctor consultation")}
            />
            <QuickAction
              icon={<Heart size={18} className="text-white" />}
              bg="bg-butter"
              label="Book On-Demand Nurse"
              desc="Certified nurse visits at your location"
              onClick={() => onSend("I'd like to book an on-demand nurse visit")}
            />
          </div>
        </div>

        {/* Input bar */}
        <div
          className="w-full"
          style={{ animation: "rd-fade-up 0.5s ease-out 0.18s both" }}
        >
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-[12px] border border-line/50 bg-white shadow-sm focus-within:border-moss/40 focus-within:shadow-[0_0_0_3px_rgba(26,38,89,0.04)] transition-all duration-200">
            <button
              onClick={onStartUpload}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-[6px] text-muted hover:text-ink hover:bg-paper transition-colors"
            >
              <Paperclip size={16} />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about supplements, treatments, or symptoms..."
              className="flex-1 bg-transparent border-none outline-none text-base lg:text-[13px] text-ink placeholder:text-muted/50"
            />
            <button
              onClick={handleSend}
              disabled={!text.trim()}
              className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-[8px] transition-all duration-200 ${
                text.trim()
                  ? "bg-moss text-cream shadow-sm hover:bg-moss/90 active:scale-95"
                  : "bg-line/40 text-muted/40 cursor-not-allowed"
              }`}
            >
              <Send size={14} />
            </button>
          </div>
        </div>

        {/* Suggested prompts */}
        <div
          className="w-full flex flex-wrap items-center gap-1.5 justify-center"
          style={{ animation: "rd-fade-up 0.5s ease-out 0.24s both" }}
        >
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onSend(prompt)}
              className="text-[11px] text-muted font-medium px-3 py-1.5 rounded-full border border-line/50 bg-white hover:bg-paper hover:border-line hover:text-ink transition-all duration-200 active:scale-[0.97]"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Trust note */}
        <p
          className="text-[10px] text-muted/60 flex items-center gap-1.5"
          style={{ animation: "rd-fade-up 0.5s ease-out 0.3s both" }}
        >
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M7 1L2 3.5V6.5C2 9.55 4.13 12.36 7 13C9.87 12.36 12 9.55 12 6.5V3.5L7 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          End-to-end encrypted. Never shared with third parties.
        </p>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  bg,
  label,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  bg: string;
  label: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-3 p-4 pb-5 rounded-[12px] border border-line/30 bg-white text-left transition-all duration-200 hover:border-line/60 hover:shadow-[0_2px_12px_rgba(0,0,0,0.05)] active:scale-[0.98]"
    >
      <div className={`w-11 h-11 rounded-[10px] ${bg} flex items-center justify-center shrink-0 shadow-sm`}>
        {icon}
      </div>
      <div>
        <span className="block text-[13px] font-bold text-ink leading-snug tracking-[-0.01em]">{label}</span>
        <span className="block text-[11.5px] text-muted leading-[1.45] mt-1">{desc}</span>
      </div>
    </button>
  );
}
