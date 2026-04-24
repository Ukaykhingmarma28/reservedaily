import type { WellnessPathsPayload, WellnessPathId } from "@/lib/vital/types";
import { Leaf, Droplet, Bolt, Brain, Heart, Dna } from "@/components/ui/icons";

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
}: {
  payload: WellnessPathsPayload;
  onSelect: (pathId: WellnessPathId) => void;
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
    </div>
  );
}
