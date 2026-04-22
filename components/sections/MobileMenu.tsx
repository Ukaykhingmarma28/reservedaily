"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Bolt,
  Brain,
  ChevronDown,
  Close,
  Dna,
  Droplet,
  Heart,
  Leaf,
} from "@/components/ui/icons";
import { CATEGORIES, CATEGORY_STRIP_LINKS, type IconKey } from "@/lib/data";

const iconMap: Record<IconKey, React.ComponentType<{ size?: number }>> = {
  leaf: Leaf,
  droplet: Droplet,
  bolt: Bolt,
  brain: Brain,
  heart: Heart,
  dna: Dna,
};

function MobileLoginButton() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) el.showModal();
    else el.close();
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-paper text-ink border border-line px-4 py-3 text-[13px] font-semibold tracking-[0.03em] rounded-[2px]"
      >
        LOGIN
      </button>
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        className="fixed inset-0 z-[100] m-auto w-[90vw] max-w-[400px] border border-line bg-paper p-0 backdrop:bg-ink/40"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="ff text-lg font-medium text-ink m-0">Login</h3>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 flex items-center justify-center bg-transparent border border-line text-ink cursor-pointer hover:bg-sage/40 transition-colors"
            >
              &times;
            </button>
          </div>
          <p className="text-sm text-muted mb-5 m-0">Choose how you&apos;d like to sign in</p>
          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-ink text-cream text-sm font-semibold tracking-[0.04em] no-underline transition-colors hover:bg-moss"
            >
              Login as Member
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-transparent text-ink text-sm font-semibold tracking-[0.04em] border border-ink no-underline transition-colors hover:bg-ink hover:text-cream"
            >
              Login as Merchant
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}

type Props = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [country, setCountry] = useState("Malaysia");
  const [language, setLanguage] = useState("English (UK)");
  const [currency, setCurrency] = useState("MYR (RM)");
  const [units, setUnits] = useState("Metric (kg, cm)");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-[80]">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
        style={{ animation: "rd-drawer-fade 180ms ease-out" }}
        aria-hidden
      />
      <aside
        className="absolute inset-y-0 right-0 w-full max-w-sm bg-cream shadow-[0_24px_60px_-20px_rgba(20,26,58,0.28)] flex flex-col"
        style={{ animation: "rd-drawer-slide 200ms ease-out" }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between h-[68px] px-5 border-b border-line-2 shrink-0">
          <Image src="/logo.png" alt="Reserve Daily" width={120} height={30} className="h-8 w-auto" />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 inline-flex items-center justify-center text-ink rounded-[2px] border border-line bg-paper"
          >
            <Close />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {prefsOpen ? (
            <div className="px-5 py-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="ff text-lg font-semibold text-ink m-0">Site Preferences</h3>
                <button
                  onClick={() => setPrefsOpen(false)}
                  className="w-9 h-9 flex items-center justify-center bg-transparent border-none text-ink cursor-pointer text-2xl leading-none"
                >
                  &times;
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <label className="relative border border-line rounded-md px-4 pt-5 pb-3 block">
                  <span className="absolute -top-2.5 left-3 bg-cream px-1 text-[11px] text-muted">Country / Region</span>
                  <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-transparent border-none outline-none text-sm text-ink appearance-none cursor-pointer">
                    <option>Malaysia</option>
                    <option>Singapore</option>
                    <option>Thailand</option>
                    <option>Indonesia</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </label>

                <label className="relative border border-line rounded-md px-4 pt-5 pb-3 block">
                  <span className="absolute -top-2.5 left-3 bg-cream px-1 text-[11px] text-muted">Language</span>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full bg-transparent border-none outline-none text-sm text-ink appearance-none cursor-pointer">
                    <option>English (UK)</option>
                    <option>Bahasa Melayu</option>
                    <option>中文</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </label>

                <label className="relative border border-line rounded-md px-4 pt-5 pb-3 block">
                  <span className="absolute -top-2.5 left-3 bg-cream px-1 text-[11px] text-muted">Currency</span>
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full bg-transparent border-none outline-none text-sm text-ink appearance-none cursor-pointer">
                    <option>MYR (RM)</option>
                    <option>SGD (S$)</option>
                    <option>USD ($)</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </label>

                <label className="relative border border-line rounded-md px-4 pt-5 pb-3 block">
                  <span className="absolute -top-2.5 left-3 bg-cream px-1 text-[11px] text-muted">Units of Measure</span>
                  <select value={units} onChange={(e) => setUnits(e.target.value)} className="w-full bg-transparent border-none outline-none text-sm text-ink appearance-none cursor-pointer">
                    <option>Metric (kg, cm)</option>
                    <option>Imperial (lb, in)</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </label>
              </div>

              <div className="mt-6 border border-line rounded-md p-4 text-center">
                <p className="text-xs text-muted m-0 mb-3">Available Delivery Methods</p>
                <div className="flex justify-center gap-2 text-muted text-[10px]">
                  <span className="border border-line rounded px-2.5 py-1.5">J&T</span>
                  <span className="border border-line rounded px-2.5 py-1.5">Skynet</span>
                </div>
              </div>

              <div className="mt-3 border border-line rounded-md p-4 text-center">
                <p className="text-xs text-muted m-0 mb-3">Available Payment Methods</p>
                <div className="flex flex-wrap justify-center gap-2 text-muted text-[10px]">
                  <span className="border border-line rounded px-2.5 py-1.5">Touch n Go</span>
                  <span className="border border-line rounded px-2.5 py-1.5">Visa</span>
                  <span className="border border-line rounded px-2.5 py-1.5">MC</span>
                  <span className="border border-line rounded px-2.5 py-1.5">AMEX</span>
                  <span className="border border-line rounded px-2.5 py-1.5">JCB</span>
                  <span className="border border-line rounded px-2.5 py-1.5">Maestro</span>
                  <span className="border border-line rounded px-2.5 py-1.5">FPX</span>
                  <span className="border border-line rounded px-2.5 py-1.5">GrabPay</span>
                  <span className="border border-line rounded px-2.5 py-1.5">G Pay</span>
                  <span className="border border-line rounded px-2.5 py-1.5">Apple Pay</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => setPrefsOpen(false)}
                  className="py-3 border border-line bg-transparent text-ink text-sm font-semibold cursor-pointer rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setPrefsOpen(false)}
                  className="py-3 border-none bg-moss text-cream text-sm font-semibold cursor-pointer rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="px-5 py-5 flex flex-col gap-2.5 border-b border-line-2">
                <a
                  href="#vital"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 no-underline bg-ink text-cream px-4 py-3 text-[13px] font-semibold tracking-[0.04em] rounded-[2px]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-butter" />
                  Vital AI
                </a>
                <MobileLoginButton />
              </div>

              <nav className="px-5 py-2 border-b border-line-2">
                {CATEGORY_STRIP_LINKS.map((l) => (
                  <a
                    key={l}
                    href="#"
                    onClick={onClose}
                    className="flex items-center justify-between py-3.5 text-[15px] text-ink font-medium no-underline border-b border-line-2 last:border-b-0"
                  >
                    <span>{l}</span>
                    <span className="text-muted">
                      <ArrowRight />
                    </span>
                  </a>
                ))}
              </nav>

              <div className="px-5 py-4 border-b border-line-2">
                <div className="text-[10px] text-muted tracking-[0.18em] uppercase font-semibold pb-2">
                  Shop by category
                </div>
                {CATEGORIES.map((c) => {
                  const Icon = iconMap[c.iconKey];
                  const isOpen = expanded === c.name;
                  return (
                    <div key={c.name} className="border-b border-line-2 last:border-b-0">
                      <button
                        onClick={() => setExpanded(isOpen ? null : c.name)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between py-3.5 text-left"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-moss w-4 flex justify-center">
                            <Icon />
                          </span>
                          <span className="text-[14px] text-ink font-medium">{c.name}</span>
                        </span>
                        <span
                          className={`text-ink-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        >
                          <ChevronDown size={14} />
                        </span>
                      </button>
                      {isOpen && (
                        <div className="pb-3 pl-7 flex flex-col">
                          {c.sub.map((s) => (
                            <a
                              key={s}
                              href="#"
                              onClick={onClose}
                              className="text-[13px] text-ink-2 no-underline py-2 flex items-center gap-2"
                            >
                              <span className="w-[3px] h-[3px] rounded-full bg-moss" />
                              {s}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="px-5 py-5 border-b border-line-2">
                <a
                  href="#"
                  onClick={onClose}
                  aria-label="Wishlist"
                  className="flex items-center justify-between py-2 text-[14px] text-ink font-medium no-underline"
                >
                  <span className="flex items-center gap-3">
                    <span className="relative inline-flex items-center justify-center w-5 h-5">
                      <Heart size={18} />
                      <span className="absolute -top-1.5 -right-[7px] min-w-[15px] h-[15px] px-1 bg-rust text-cream text-[9px] font-bold rounded-full inline-flex items-center justify-center leading-none border-[1.5px] border-cream">
                        0
                      </span>
                    </span>
                    <span>Wishlist</span>
                  </span>
                  <span className="text-muted">
                    <ArrowRight />
                  </span>
                </a>
              </div>

              <div className="px-5 py-4">
                <button
                  onClick={() => setPrefsOpen(true)}
                  className="flex items-center gap-2 bg-transparent border-none text-ink-2 text-[13px] cursor-pointer p-0"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>MY</span>
                  <span className="w-px h-3 bg-line" />
                  <span>EN</span>
                  <span className="w-px h-3 bg-line" />
                  <span>MYR</span>
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
