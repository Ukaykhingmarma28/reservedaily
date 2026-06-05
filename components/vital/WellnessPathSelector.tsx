import type { WellnessPathsPayload, WellnessPathId } from "@/lib/vital/types";
import { Leaf, Droplet, Bolt, Brain, Heart, Dna, Sparkle } from "@/components/ui/icons";

const iconMap = {
  leaf: Leaf,
  droplet: Droplet,
  bolt: Bolt,
  brain: Brain,
  heart: Heart,
  dna: Dna,
} as const;

export function WellnessPathSelector({
  payload,
  onSelect,
  onBuildPlan,
}: {
  payload: WellnessPathsPayload;
  onSelect: (pathId: WellnessPathId) => void;
  onBuildPlan: () => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-ink leading-relaxed">{payload.prompt}</p>

      {/* Category circles — matches homepage ShopByCategory */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-4">
        {payload.paths.map((path) => {
          const Icon = iconMap[path.iconKey];
          return (
            <button
              key={path.id}
              onClick={() => onSelect(path.id)}
              className="flex flex-col items-center gap-2 group relative"
            >
              {path.recommended && (
                <span className="absolute -top-1 right-0 lg:right-1 text-[7px] font-bold text-white bg-moss px-1.5 py-[2px] rounded-full uppercase tracking-[0.06em] shadow-sm z-10">
                  Rec
                </span>
              )}
              <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-active:scale-95 ${
                path.recommended
                  ? "bg-moss/10 group-hover:bg-moss/15"
                  : "bg-sage group-hover:bg-sage-2"
              }`}>
                <Icon size={24} className="text-moss transition-transform group-hover:scale-110" />
              </div>
              <span className="text-[10px] lg:text-[11px] font-medium text-ink text-center leading-tight max-w-[80px]">
                {path.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Divider — "or" */}
      <div className="flex items-center gap-3 mt-1">
        <div className="flex-1 h-px bg-line/40" />
        <span className="text-[10px] font-medium text-muted/60 uppercase tracking-[0.08em]">or</span>
        <div className="flex-1 h-px bg-line/40" />
      </div>

      {/* Personalized Health Plan CTA — premium dark card */}
      <div className="relative">
        {/* Ambient glow beneath the card */}
        <div className="absolute -inset-x-2 -bottom-2 h-8 bg-moss/20 blur-xl rounded-full pointer-events-none" />

        <button onClick={onBuildPlan} className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-moss via-moss-2 to-[#1e3070] px-4 py-3.5 flex items-center gap-3.5 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-soft focus-visible:ring-offset-2">

          {/* Subtle top-edge highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent pointer-events-none" />

          {/* Sparkle icon */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-rust-soft/30 blur-md scale-110 pointer-events-none" />
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-rust/80 to-rust-soft/60 flex items-center justify-center shadow-[0_2px_12px_rgba(240,160,40,0.4)]">
              <Sparkle size={18} className="text-cream drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" />
            </div>
          </div>

          {/* Text body */}
          <div className="flex-1 min-w-0 text-left">
            <p className="ff text-[13.5px] font-bold text-cream tracking-[-0.01em] leading-none">
              Build My Recovery Plan
            </p>
            <p className="text-[10.5px] text-cream/55 leading-tight mt-1 font-normal">
              Phased planning first, then matched treatments & products
            </p>
          </div>

          {/* Arrow — translates right on hover */}
          <div className="shrink-0 w-7 h-7 rounded-full bg-cream/10 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-cream/60">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
