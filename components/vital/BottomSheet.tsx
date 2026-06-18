"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Close } from "@/components/ui/icons";

/**
 * Bottom sheet used by the booking flow for multi-field input (location, time,
 * payment). Portaled to document.body so a transformed ancestor (the animated
 * chat card) can't trap its fixed positioning. Reduced-motion safe via CSS.
 */
export function BottomSheet({
  open,
  title,
  subtitle,
  onClose,
  children,
  footer,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px] animate-[rd-drawer-fade_0.2s_ease-out_both]"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full sm:max-w-[460px] bg-white rounded-t-[22px] sm:rounded-[22px] sm:mb-0 shadow-[0_-8px_40px_rgba(20,26,58,0.18)] flex flex-col max-h-[90dvh] sm:max-h-[82dvh] animate-[rd-sheet-up_0.34s_cubic-bezier(0.22,1,0.36,1)_both]"
      >
        {/* Grab handle */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden">
          <span className="h-1 w-9 rounded-full bg-line" />
        </div>

        {/* Header */}
        <div className="flex items-start gap-3 px-5 pt-2 sm:pt-5 pb-3 border-b border-line-2">
          <div className="min-w-0 flex-1">
            <h3 className="ff text-[16px] font-semibold text-ink tracking-[-0.01em] leading-snug">{title}</h3>
            {subtitle && <p className="text-[12px] text-muted leading-relaxed mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 -mr-1.5 flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-paper transition-colors"
          >
            <Close size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-5 py-4 flex-1">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="shrink-0 px-5 py-4 border-t border-line-2 bg-white rounded-b-[22px]">{footer}</div>
        )}
      </div>
    </div>,
    document.body,
  );
}
