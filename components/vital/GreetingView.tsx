"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { Sparkle, Upload, ChevronRight, Send, Paperclip } from "@/components/ui/icons";
import { GREETING_TEXT } from "@/lib/vital/mock-data";

const SUGGESTED_PROMPTS = [
  "What vitamins should I take daily?",
  "IV drip benefits",
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

  function handlePromptClick(prompt: string) {
    onSend(prompt);
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 lg:py-14 relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center max-w-[520px] w-full gap-6">
        {/* Glass orb */}
        <div
          className="w-[68px] h-[68px] rounded-full relative"
          style={{ animation: "rd-fade-up 0.5s ease-out both" }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-moss/40 via-sage/50 to-berry/30 blur-[6px]" />
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-moss/20 via-cream to-sage/30 backdrop-blur-sm border border-white/60 shadow-[0_8px_32px_rgba(26,38,89,0.12),inset_0_1px_2px_rgba(255,255,255,0.8)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkle size={22} className="text-moss drop-shadow-sm" />
          </div>
        </div>

        {/* Headline */}
        <div
          className="flex flex-col gap-2"
          style={{ animation: "rd-fade-up 0.5s ease-out 0.06s both" }}
        >
          <h1 className="ff text-[clamp(22px,4.5vw,28px)] font-semibold text-ink tracking-[-0.02em] leading-[1.25]">
            Hi! I&apos;m Vital AI.
            <br />
            How can I help you today?
          </h1>
          <p className="text-[13px] text-muted leading-relaxed max-w-[380px] mx-auto">
            {GREETING_TEXT}
          </p>
        </div>

        {/* Quick Actions */}
        <div
          className="w-full space-y-2.5"
          style={{ animation: "rd-fade-up 0.5s ease-out 0.12s both" }}
        >
          <p className="text-[10px] font-bold text-muted tracking-[0.08em] uppercase text-left">
            Quick Actions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <QuickAction
              icon={<Upload size={16} className="text-white" />}
              gradient="from-moss/80 to-moss-2/70"
              label="Analyse Blood Report"
              onClick={onStartUpload}
            />
            <QuickAction
              icon={<Sparkle size={16} className="text-white" />}
              gradient="from-berry/60 to-berry/40"
              label="Browse Treatments"
              onClick={onBrowseTreatments}
            />
            <QuickAction
              icon={<Sparkle size={16} className="text-white" />}
              gradient="from-sage-2/70 to-sage/50"
              label="Ask a Health Question"
              onClick={onStartChat}
            />
          </div>
        </div>

        {/* Real input bar */}
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
              placeholder="Ask me anything about your health..."
              className="flex-1 bg-transparent border-none outline-none text-[13px] text-ink placeholder:text-muted/50"
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
              onClick={() => handlePromptClick(prompt)}
              className="text-[11px] text-muted font-medium px-3 py-1.5 rounded-full border border-line/50 bg-white hover:bg-paper hover:border-line hover:text-ink transition-all duration-200"
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
          End-to-end encrypted · Never shared with third parties
        </p>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  gradient,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  gradient: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 p-2.5 rounded-[10px] border border-line/40 bg-white text-left transition-all duration-200 hover:border-line hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] active:scale-[0.98] group"
    >
      <div className={`w-9 h-9 rounded-[8px] bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-sm`}>
        {icon}
      </div>
      <span className="text-[12px] font-semibold text-ink leading-tight flex-1">{label}</span>
      <ChevronRight size={10} className="text-muted/50 shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}
