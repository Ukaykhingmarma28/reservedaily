import type { ChatMessage as ChatMessageType, WellnessPathId, RecommendedProduct, RecoveryPlanPayload } from "@/lib/vital/types";
import Image from "next/image";
import { User } from "@/components/ui/icons";
import { UploadPreview } from "./UploadPreview";
import { AnalysisCard } from "./AnalysisCard";
import { WellnessPathSelector } from "./WellnessPathSelector";
import { ProductRecommendation } from "./ProductRecommendation";
import { RecoveryPlanCard } from "./RecoveryPlanCard";
import { BookingFlow } from "./BookingFlow";

export function ChatMessage({
  message,
  onSelectWellnessPath,
  onBuildPlan,
  onExplainProduct,
}: {
  message: ChatMessageType;
  onSelectWellnessPath: (pathId: WellnessPathId) => void;
  onBuildPlan: () => void;
  onExplainProduct: (rec: RecommendedProduct) => void;
}) {
  const isUser = message.role === "user";
  const isRich = [
    "analysis", "wellness-paths", "recovery-plan", "product-recommendations", "booking",
  ].includes(message.type);

  return (
    <div
      className={`flex gap-2.5 items-start animate-[rd-msg-in_0.3s_cubic-bezier(0.22,1,0.36,1)_both] ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden ${
          isRich && !isUser ? "hidden sm:flex" : ""
        } ${isUser ? "bg-ink shadow-[0_2px_6px_rgba(20,26,58,0.18)]" : ""}`}
      >
        {isUser ? (
          <User size={13} className="text-cream" />
        ) : (
          <Image src="/vital-logo.svg" alt="VitalNow AI" width={30} height={30} className="w-full h-full object-contain" />
        )}
      </div>

      <div className={`min-w-0 ${isRich ? "w-full sm:max-w-[calc(100%-44px)]" : "max-w-[78%]"}`}>
        <div
          className={`${isRich ? "p-3 sm:p-4" : "px-4 py-2.5"} ${
            isUser
              ? "rounded-[16px_16px_4px_16px] bg-moss text-cream shadow-[0_2px_10px_rgba(26,38,89,0.14)]"
              : isRich
                ? "rounded-2xl sm:rounded-[4px_16px_16px_16px] bg-white border border-line-2 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                : "rounded-[4px_16px_16px_16px] bg-white text-ink border border-line-2 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
          }`}
        >
          <MessageContent
            message={message}
            onSelectWellnessPath={onSelectWellnessPath}
            onBuildPlan={onBuildPlan}
            onExplainProduct={onExplainProduct}
          />
        </div>

        <p className={`text-[10px] text-muted/60 mt-1 mx-1.5 tracking-[0.01em] ${isUser ? "text-right" : "text-left"}`}>
          {message.timestamp.toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}

function MessageContent({
  message,
  onSelectWellnessPath,
  onBuildPlan,
  onExplainProduct,
}: {
  message: ChatMessageType;
  onSelectWellnessPath: (pathId: WellnessPathId) => void;
  onBuildPlan: () => void;
  onExplainProduct: (rec: RecommendedProduct) => void;
}) {
  const { payload } = message;

  switch (payload.kind) {
    case "text":
      return <p className="text-[14px] leading-[1.65] whitespace-pre-wrap m-0">{payload.text}</p>;

    case "file-upload":
      return <UploadPreview payload={payload} />;

    case "analysis":
      return <AnalysisCard payload={payload} />;

    case "wellness-paths":
      return <WellnessPathSelector payload={payload} onSelect={onSelectWellnessPath} onBuildPlan={onBuildPlan} />;

    case "recovery-plan":
      return (
        <RecoveryPlanCard
          payload={payload as RecoveryPlanPayload}
          onExplainProduct={onExplainProduct}
        />
      );

    case "product-recommendations":
      return <ProductRecommendation payload={payload} onExplainProduct={onExplainProduct} />;

    case "booking":
      return <BookingFlow service={payload.service} />;

    case "typing":
      return null;

    default:
      return null;
  }
}
