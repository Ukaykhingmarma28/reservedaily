"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage as ChatMessageType, WellnessPathId, RecommendedProduct } from "@/lib/vital/types";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

export function MessageList({
  messages,
  isTyping,
  onSelectWellnessPath,
  onBuildPlan,
  onExplainProduct,
}: {
  messages: ChatMessageType[];
  isTyping: boolean;
  onSelectWellnessPath: (pathId: WellnessPathId) => void;
  onBuildPlan: () => void;
  onExplainProduct: (rec: RecommendedProduct) => void;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [showJump, setShowJump] = useState(false);

  function handleScroll() {
    const el = containerRef.current;
    if (!el) return;
    const isNearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 100;
    userScrolledUp.current = !isNearBottom;
    setShowJump(!isNearBottom);
  }

  useEffect(() => {
    if (autoScroll && !userScrolledUp.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, isTyping, autoScroll]);

  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative flex-1 min-h-0">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto overflow-x-hidden px-3 sm:px-4 py-4 sm:py-6 scroll-smooth"
      >
        <div className="max-w-[680px] mx-auto flex flex-col gap-5">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onSelectWellnessPath={onSelectWellnessPath}
              onBuildPlan={onBuildPlan}
              onExplainProduct={onExplainProduct}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Auto-scroll toggle + jump to bottom */}
      <div className="absolute bottom-3 right-3 sm:right-5 flex items-center gap-1.5">
        {showJump && !autoScroll && (
          <button
            onClick={scrollToBottom}
            className="w-8 h-8 rounded-full bg-white border border-line/40 shadow-sm flex items-center justify-center text-muted hover:text-ink hover:border-line transition-colors"
            title="Jump to bottom"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v10M4 9l4 4 4-4" />
            </svg>
          </button>
        )}
        <button
          onClick={() => {
            const next = !autoScroll;
            setAutoScroll(next);
            if (next) scrollToBottom();
          }}
          className={`h-7 px-2.5 rounded-full text-[11px] font-medium border shadow-sm transition-colors ${
            autoScroll
              ? "bg-moss/10 text-moss border-moss/25 hover:bg-moss/15"
              : "bg-white text-muted border-line/40 hover:text-ink hover:border-line"
          }`}
          title={autoScroll ? "Auto-scroll is on" : "Auto-scroll is off"}
        >
          {autoScroll ? "Auto-scroll on" : "Auto-scroll off"}
        </button>
      </div>
    </div>
  );
}
