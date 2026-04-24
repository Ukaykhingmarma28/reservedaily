"use client";

import Link from "next/link";
import { Plus, MessageSquare, Home, Settings, Sparkle, Close } from "@/components/ui/icons";

const MOCK_HISTORY = [
  { id: "today-1", title: "Blood Report Analysis", group: "Today" },
  { id: "today-2", title: "Energy & Vitality Plan", group: "Today" },
  { id: "yest-1", title: "Vitamin D Consultation", group: "Yesterday" },
  { id: "prev-1", title: "IV Therapy Options", group: "Previous 7 days" },
  { id: "prev-2", title: "Supplement Guide", group: "Previous 7 days" },
  { id: "prev-3", title: "Immune Boost Query", group: "Previous 7 days" },
];

function groupHistory() {
  const groups: { label: string; items: typeof MOCK_HISTORY }[] = [];
  for (const item of MOCK_HISTORY) {
    const last = groups[groups.length - 1];
    if (last && last.label === item.group) {
      last.items.push(item);
    } else {
      groups.push({ label: item.group, items: [item] });
    }
  }
  return groups;
}

export function Sidebar({
  open,
  onClose,
  onNewChat,
}: {
  open: boolean;
  onClose: () => void;
  onNewChat: () => void;
}) {
  const groups = groupHistory();

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-ink/20 backdrop-blur-[2px] z-40 lg:hidden animate-[rd-fade-up_0.15s_ease-out]"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed lg:relative z-50 top-0 left-0 h-dvh w-[260px] bg-white border-r border-line/30 flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-line/20 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-moss to-moss-2 flex items-center justify-center shadow-sm">
              <Sparkle size={13} className="text-cream" />
            </span>
            <span className="ff font-semibold text-[14px] text-ink tracking-[-0.01em]">Vital AI</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-[6px] text-muted hover:text-ink hover:bg-paper transition-colors"
          >
            <Close size={16} />
          </button>
        </div>

        {/* New Chat button */}
        <div className="px-3 pt-3 pb-1 shrink-0">
          <button
            onClick={() => { onNewChat(); onClose(); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] border border-line/50 bg-paper/50 hover:bg-paper hover:border-line text-ink text-[13px] font-medium transition-all duration-200 active:scale-[0.98]"
          >
            <Plus size={14} />
            New chat
          </button>
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-3">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] font-bold text-muted uppercase tracking-[0.1em] px-2 mb-1">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item, i) => (
                  <button
                    key={item.id}
                    className={`w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-[6px] text-[13px] transition-colors duration-150 group ${
                      i === 0 && group.label === "Today"
                        ? "bg-paper text-ink font-medium"
                        : "text-muted hover:bg-paper/60 hover:text-ink"
                    }`}
                  >
                    <MessageSquare size={14} className="shrink-0 opacity-50 group-hover:opacity-70" />
                    <span className="truncate">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom navigation */}
        <div className="border-t border-line/20 px-2 py-2 space-y-0.5 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-[6px] text-[13px] text-muted hover:bg-paper hover:text-ink transition-colors no-underline"
          >
            <Home size={15} className="shrink-0" />
            Reserve Daily
          </Link>
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[6px] text-[13px] text-muted hover:bg-paper hover:text-ink transition-colors text-left">
            <Settings size={15} className="shrink-0" />
            Settings
          </button>
        </div>

        {/* User section */}
        <div className="border-t border-line/20 px-3 py-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center text-cream text-[11px] font-bold shrink-0">
              U
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-ink truncate">User</p>
              <p className="text-[10px] text-muted truncate">Free plan</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
