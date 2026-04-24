import type { ChatMessage as ChatMessageType, WellnessPathId, RecommendedProduct } from "@/lib/vital/types";
import { Sparkle, User } from "@/components/ui/icons";
import { UploadPreview } from "./UploadPreview";
import { AnalysisCard } from "./AnalysisCard";
import { WellnessPathSelector } from "./WellnessPathSelector";
import { ProductRecommendation } from "./ProductRecommendation";
import { BookingForm } from "./BookingForm";
import { BookingConfirmation, PaymentConfirmation } from "./BookingConfirmation";
import { PaymentSummary } from "./PaymentSummary";

export function ChatMessage({
  message,
  onSelectWellnessPath,
  onSelectProduct,
  onSelectBookingSlot,
  onConfirmPayment,
}: {
  message: ChatMessageType;
  onSelectWellnessPath: (pathId: WellnessPathId) => void;
  onSelectProduct: (rec: RecommendedProduct) => void;
  onSelectBookingSlot: (slotId: string) => void;
  onConfirmPayment: () => void;
}) {
  const isUser = message.role === "user";
  const isRich = [
    "analysis", "wellness-paths", "product-recommendations",
    "booking-form", "booking-confirmation",
    "payment-summary", "payment-confirmation",
  ].includes(message.type);

  return (
    <div
      className={`flex gap-2.5 items-start animate-[rd-msg-in_0.3s_cubic-bezier(0.22,1,0.36,1)_both] ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
          isUser
            ? "bg-ink shadow-[0_2px_6px_rgba(20,26,58,0.18)]"
            : "bg-gradient-to-br from-moss to-moss-2 shadow-[0_2px_8px_rgba(26,38,89,0.22)]"
        }`}
      >
        {isUser ? (
          <User size={13} className="text-cream" />
        ) : (
          <Sparkle size={13} className="text-cream" />
        )}
      </div>

      {/* Bubble */}
      <div className={`min-w-0 ${isRich ? "max-w-[calc(100%-44px)]" : "max-w-[78%]"}`}>
        <div
          className={`${isRich ? "p-4" : "px-4 py-2.5"} ${
            isUser
              ? "rounded-[16px_16px_4px_16px] bg-moss text-cream shadow-[0_2px_10px_rgba(26,38,89,0.14)]"
              : isRich
                ? "rounded-[4px_16px_16px_16px] bg-white border border-line-2 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                : "rounded-[4px_16px_16px_16px] bg-white text-ink border border-line-2 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
          }`}
        >
          <MessageContent
            message={message}
            onSelectWellnessPath={onSelectWellnessPath}
            onSelectProduct={onSelectProduct}
            onSelectBookingSlot={onSelectBookingSlot}
            onConfirmPayment={onConfirmPayment}
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
  onSelectProduct,
  onSelectBookingSlot,
  onConfirmPayment,
}: {
  message: ChatMessageType;
  onSelectWellnessPath: (pathId: WellnessPathId) => void;
  onSelectProduct: (rec: RecommendedProduct) => void;
  onSelectBookingSlot: (slotId: string) => void;
  onConfirmPayment: () => void;
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
      return <WellnessPathSelector payload={payload} onSelect={onSelectWellnessPath} />;

    case "product-recommendations":
      return <ProductRecommendation payload={payload} onSelectProduct={onSelectProduct} />;

    case "booking-form":
      return <BookingForm payload={payload} onSelectSlot={onSelectBookingSlot} />;

    case "booking-confirmation":
      return <BookingConfirmation payload={payload} />;

    case "payment-summary":
      return <PaymentSummary payload={payload} onConfirmPayment={onConfirmPayment} />;

    case "payment-confirmation":
      return <PaymentConfirmation payload={payload} />;

    case "typing":
      return null;

    default:
      return null;
  }
}
