import { Sparkle, ChevronRight } from "@/components/ui/icons";

export function TopRecommendation({ recommendation }: { recommendation: string }) {
  return (
    <div style={{ animation: "rd-card-stagger 0.5s ease-out 0.36s both" }}>
      <div className="rounded-2xl bg-gradient-to-br from-moss to-moss-2 p-5 shadow-[0_4px_20px_rgba(22,33,62,0.25)]">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkle size={16} className="text-rust-soft" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="ff text-[13px] font-semibold text-cream/90 tracking-[-0.01em]">Top Recommendation</h3>
            <p className="text-[12px] text-cream/70 leading-[1.65] mt-1.5">{recommendation}</p>
          </div>
          <ChevronRight size={14} className="text-cream/30 shrink-0 mt-3" />
        </div>
      </div>
      <p className="text-[10px] text-muted/50 text-center mt-3">
        VitalNow AI can make mistakes. Please verify health recommendations.
      </p>
    </div>
  );
}
