import type { AnalysisPayload, BiomarkerResult } from "@/lib/vital/types";
import { HealthScoreGauge } from "./analysis/HealthScoreGauge";
import type { ScoreFactor } from "./analysis/HealthScoreGauge";
import { KeyTakeaways } from "./analysis/KeyTakeaways";
import { BiomarkerSummary } from "./analysis/BiomarkerSummary";
import { TopRecommendation } from "./analysis/TopRecommendation";

function deriveScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Attention";
}

function deriveScoreFactors(biomarkers: BiomarkerResult[]): ScoreFactor[] {
  const factors: ScoreFactor[] = [];
  const flagged = biomarkers.filter((m) => m.status !== "normal");
  const normal = biomarkers.filter((m) => m.status === "normal");

  for (const m of flagged) {
    factors.push({
      label: m.name,
      impact: m.status === "critical" ? "critical" : m.status === "high" || m.status === "low" ? "negative" : "negative",
      value: `${m.value} ${m.unit}`,
      ref: m.referenceRange.high >= 900
        ? `> ${m.referenceRange.low}`
        : m.referenceRange.low > 0
          ? `${m.referenceRange.low}–${m.referenceRange.high}`
          : `< ${m.referenceRange.high}`,
    });
  }

  const normalCategories = new Map<string, string[]>();
  for (const m of normal) {
    const cat = m.category ?? "other";
    if (!normalCategories.has(cat)) normalCategories.set(cat, []);
    normalCategories.get(cat)!.push(m.name);
  }
  for (const [cat, names] of normalCategories) {
    const catLabel = cat === "cardiovascular" ? "Cardiovascular" : cat === "renal" ? "Renal" : cat === "metabolic" ? "Metabolic" : cat === "overall" ? "Haematology" : cat;
    factors.push({
      label: `${catLabel}: ${names.join(", ")}`,
      impact: "positive",
    });
  }

  return factors;
}

export function AnalysisCard({ payload }: { payload: AnalysisPayload }) {
  const scoreLabel = payload.scoreLabel ?? deriveScoreLabel(payload.overallScore);
  const summary = payload.summary.length > 360
    ? payload.summary.slice(0, 360).replace(/\s+\S*$/, "") + "..."
    : payload.summary;
  const scoreFactors = deriveScoreFactors(payload.biomarkers);

  return (
    <div className="flex flex-col gap-3 w-full">
      <HealthScoreGauge
        score={payload.overallScore}
        scoreLabel={scoreLabel}
        summary={summary}
        scoreFactors={scoreFactors}
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
