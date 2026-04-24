"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage as ChatMessageType, WellnessPathId, RecommendedProduct } from "@/lib/vital/types";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

export function MessageList({
  messages,
  isTyping,
  onSelectWellnessPath,
  onSelectProduct,
  onSelectBookingSlot,
  onConfirmPayment,
}: {
  messages: ChatMessageType[];
  isTyping: boolean;
  onSelectWellnessPath: (pathId: WellnessPathId) => void;
  onSelectProduct: (rec: RecommendedProduct) => void;
  onSelectBookingSlot: (slotId: string) => void;
  onConfirmPayment: () => void;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);

  function handleScroll() {
    const el = containerRef.current;
    if (!el) return;
    userScrolledUp.current = el.scrollTop + el.clientHeight < el.scrollHeight - 100;
  }

  useEffect(() => {
    if (!userScrolledUp.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, isTyping]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 scroll-smooth"
    >
      <div className="max-w-[680px] mx-auto flex flex-col gap-5">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onSelectWellnessPath={onSelectWellnessPath}
            onSelectProduct={onSelectProduct}
            onSelectBookingSlot={onSelectBookingSlot}
            onConfirmPayment={onConfirmPayment}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
