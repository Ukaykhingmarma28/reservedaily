"use client";

import { useEffect, useRef, useState } from "react";

function SitePreferences() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [country, setCountry] = useState("Malaysia");
  const [language, setLanguage] = useState("English (UK)");
  const [currency, setCurrency] = useState("MYR (RM)");
  const [units, setUnits] = useState("Metric (kg, cm)");

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
        className="hidden lg:flex items-center gap-1.5 bg-transparent border-none text-cream/90 text-[11px] cursor-pointer hover:text-cream transition-colors tracking-[0.02em]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>MY</span>
        <span className="w-px h-3 bg-cream/30" />
        <span>EN</span>
        <span className="w-px h-3 bg-cream/30" />
        <span>MYR</span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        className="fixed inset-0 z-[100] m-auto w-[90vw] max-w-[500px] border border-line bg-paper p-0 rounded-lg backdrop:bg-ink/40"
      >
        <div className="p-7">
          <div className="flex items-center justify-between mb-7">
            <h3 className="ff text-xl font-semibold text-ink m-0">Site Preferences</h3>
            <button
              onClick={() => setOpen(false)}
              className="w-9 h-9 flex items-center justify-center bg-transparent border-none text-ink cursor-pointer text-2xl leading-none hover:text-muted transition-colors"
            >
              &times;
            </button>
          </div>

          <div className="flex flex-col gap-5">
            <label className="relative border border-line rounded-md px-4 pt-5 pb-3 block">
              <span className="absolute -top-2.5 left-3 bg-paper px-1 text-[11px] text-muted">Country / Region</span>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-ink appearance-none cursor-pointer"
              >
                <option>Malaysia</option>
                <option>Singapore</option>
                <option>Thailand</option>
                <option>Indonesia</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>

            <label className="relative border border-line rounded-md px-4 pt-5 pb-3 block">
              <span className="absolute -top-2.5 left-3 bg-paper px-1 text-[11px] text-muted">Language</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-ink appearance-none cursor-pointer"
              >
                <option>English (UK)</option>
                <option>Bahasa Melayu</option>
                <option>中文</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>

            <label className="relative border border-line rounded-md px-4 pt-5 pb-3 block">
              <span className="absolute -top-2.5 left-3 bg-paper px-1 text-[11px] text-muted">Currency</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-ink appearance-none cursor-pointer"
              >
                <option>MYR (RM)</option>
                <option>SGD (S$)</option>
                <option>USD ($)</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>

            <label className="relative border border-line rounded-md px-4 pt-5 pb-3 block">
              <span className="absolute -top-2.5 left-3 bg-paper px-1 text-[11px] text-muted">Units of Measure</span>
              <select
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-ink appearance-none cursor-pointer"
              >
                <option>Metric (kg, cm)</option>
                <option>Imperial (lb, in)</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-7">
            <div className="border border-line rounded-md p-4 text-center">
              <p className="text-xs text-muted m-0 mb-3">Available Payment Methods</p>
              <div className="flex justify-center gap-2 text-muted text-[10px]">
                <span className="border border-line rounded px-2 py-1">Visa</span>
                <span className="border border-line rounded px-2 py-1">MC</span>
                <span className="border border-line rounded px-2 py-1">FPX</span>
              </div>
            </div>
            <div className="border border-line rounded-md p-4 text-center">
              <p className="text-xs text-muted m-0 mb-3">Available Delivery Methods</p>
              <div className="flex justify-center gap-2 text-muted text-[10px]">
                <span className="border border-line rounded px-2 py-1">J&T</span>
                <span className="border border-line rounded px-2 py-1">Skynet</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-7">
            <button
              onClick={() => setOpen(false)}
              className="py-3.5 border border-line bg-transparent text-ink text-sm font-semibold cursor-pointer rounded-md transition-colors hover:bg-sage/40"
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className="py-3.5 border-none bg-moss text-cream text-sm font-semibold cursor-pointer rounded-md transition-colors hover:bg-moss-2"
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export function AnnouncementBar() {
  return (
    <div className="bg-moss text-cream py-[9px] px-5 text-xs tracking-[0.02em]">
      <div className="max-w-[1760px] mx-auto flex items-center justify-between">
        <SitePreferences />
        <span className="flex-1 text-center">
          ✦ Vital AI launches Q1 2026,{" "}
          <a href="#vital" className="text-butter underline underline-offset-2">
            join the waitlist
          </a>
        </span>
        <span className="hidden lg:block w-[100px]" />
      </div>
    </div>
  );
}
