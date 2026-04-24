"use client";

import { useRef } from "react";
import { Search } from "./icons";

type SearchInputProps = {
  placeholder?: string;
  kbd?: string;
  className?: string;
  defaultValue?: string;
  onSubmit?: (value: string) => void;
};

export function SearchInput({
  placeholder = "Search treatments, providers, or supplements...",
  kbd = "⌘K",
  className = "",
  defaultValue,
  onSubmit,
}: SearchInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(ref.current?.value ?? "");
      }}
      className={`flex items-center gap-2.5 bg-paper border border-line rounded-[2px] px-4 py-2.5 ${className}`}
    >
      <span className="text-muted">
        <Search />
      </span>
      <input
        ref={ref}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none text-base lg:text-sm text-ink placeholder:text-muted"
      />
      {kbd && (
        <kbd className="text-[10px] text-muted border border-line px-1.5 py-0.5 rounded-[2px] tracking-[0.04em] font-sans">
          {kbd}
        </kbd>
      )}
    </form>
  );
}
