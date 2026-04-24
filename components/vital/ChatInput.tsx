"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Send, Paperclip } from "@/components/ui/icons";

export function ChatInput({
  onSend,
  onFileUpload,
  disabled,
}: {
  onSend: (text: string) => void;
  onFileUpload: (file: File) => void;
  disabled?: boolean;
}) {
  const [text, setText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
      e.target.value = "";
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }

  const canSend = text.trim().length > 0 && !disabled;

  return (
    <div className="shrink-0 px-4 pb-4 pt-2">
      <div className="max-w-[680px] mx-auto">
        <div className="bg-white rounded-2xl border border-line/40 shadow-[0_2px_16px_rgba(0,0,0,0.06)] px-3 py-2.5">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Reply..."
            rows={1}
            className="w-full resize-none bg-transparent border-none outline-none text-base lg:text-[14px] text-ink placeholder:text-muted/40 leading-relaxed disabled:opacity-30 mb-1"
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={disabled}
              className="w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-paper transition-colors disabled:opacity-30"
            >
              <Paperclip size={16} />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,image/png,image/jpeg,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 active:scale-90 ${
                canSend
                  ? "bg-moss text-cream shadow-sm hover:bg-moss/90"
                  : "text-muted/30 cursor-not-allowed"
              }`}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
        <p className="text-center text-[10px] text-muted/40 mt-2">
          Vital AI can make mistakes. Please verify health recommendations.
        </p>
      </div>
    </div>
  );
}
