import type { AnalysisPayload } from "@/lib/vital/types";
import { HealthScoreGauge } from "./analysis/HealthScoreGauge";
import { KeyTakeaways } from "./analysis/KeyTakeaways";
import { BiomarkerSummary } from "./analysis/BiomarkerSummary";
import { TopRecommendation } from "./analysis/TopRecommendation";

function deriveScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Attention";
}

export function AnalysisCard({ payload }: { payload: AnalysisPayload }) {
  const scoreLabel = payload.scoreLabel ?? deriveScoreLabel(payload.overallScore);
  const summary = payload.summary.length > 360
    ? payload.summary.slice(0, 360).replace(/\s+\S*$/, "") + "..."
    : payload.summary;

  return (
    <div className="flex flex-col gap-3 w-full">
      <HealthScoreGauge
        score={payload.overallScore}
        scoreLabel={scoreLabel}
        summary={summary}
      />
      {payload.keyTakeaways && payload.keyTakeaways.length > 0 && (
        <KeyTakeaways takeaways={payload.keyTakeaways} />
      )}
      <BiomarkerSummary biomarkers={payload.biomarkers} />
      {payload.topRecommendation && (
        <TopRecommendation recommendation={payload.topRecommendation} />
      )}
    </div>
  );
}
