"use client";

import { useState } from "react";
import { ChevronDown } from "@/components/ui/icons";

type TabContent = { label: string; content: string | string[] };

export function ProductTabs({ tabs }: { tabs: TabContent[] }) {
  const [active, setActive] = useState(0);

  return (
    <section className="py-10 lg:py-16 border-t border-line-2">
      {/* Desktop tabs */}
      <div className="hidden lg:block">
        <div className="flex gap-0 border-b border-line-2 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              className={`px-5 py-3.5 text-[12px] font-semibold tracking-[0.06em] uppercase cursor-pointer transition-colors border-b-2 -mb-px ${
                i === active
                  ? "border-ink text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="max-w-[720px]">
          <TabBody content={tabs[active].content} />
        </div>
      </div>

      {/* Mobile accordion */}
      <div className="lg:hidden flex flex-col">
        {tabs.map((tab, i) => {
          const open = i === active;
          return (
            <div key={tab.label} className="border-b border-line-2">
              <button
                onClick={() => setActive(open ? -1 : i)}
                className="w-full flex items-center justify-between py-4 text-[12px] font-semibold tracking-[0.06em] uppercase cursor-pointer text-ink"
              >
                {tab.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
              {open && (
                <div className="pb-5">
                  <TabBody content={tab.content} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TabBody({ content }: { content: string | string[] }) {
  if (typeof content === "string") {
    return <p className="text-[13px] lg:text-sm text-ink-2 leading-relaxed">{content}</p>;
  }
  return (
    <ul className="space-y-1.5">
      {content.map((item, i) => (
        <li key={i} className="text-[13px] lg:text-sm text-ink-2 leading-relaxed flex items-start gap-2">
          <span className="text-muted mt-1 shrink-0">·</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
