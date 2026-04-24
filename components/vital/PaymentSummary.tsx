import type { PaymentSummaryPayload } from "@/lib/vital/types";
import { Check } from "@/components/ui/icons";

export function PaymentSummary({
  payload,
  onConfirmPayment,
}: {
  payload: PaymentSummaryPayload;
  onConfirmPayment: () => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-[10px] font-bold text-muted uppercase tracking-[0.1em]">Order Summary</p>

      {/* Product + price breakdown */}
      <div className="border border-line/40 rounded-[10px] overflow-hidden">
        <div className="px-4 py-3.5 flex items-center justify-between border-b border-line/20 bg-paper/50">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">{payload.product.name}</p>
            <p className="text-[11px] text-muted mt-0.5">{payload.product.provider}</p>
          </div>
          <span className="ff text-base font-semibold text-ink shrink-0 ml-3">{payload.product.price}</span>
        </div>

        <div className="px-4 py-3 space-y-2 text-[13px] bg-white">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span className="text-ink font-medium tabular-nums">RM {payload.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Service fee</span>
            <span className="text-ink font-medium tabular-nums">RM {payload.serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2.5 border-t border-line/30">
            <span className="font-semibold text-ink">Total</span>
            <span className="ff text-base font-bold text-ink tabular-nums">RM {payload.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div className="flex items-center gap-3 p-3.5 rounded-[10px] border border-line/40 bg-white">
        <div className="w-10 h-6 rounded-[4px] bg-gradient-to-br from-ink/10 to-ink/5 border border-line/30 flex items-center justify-center">
          <span className="text-[8px] font-black text-ink tracking-wide">VISA</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-ink">Visa ending ····4242</p>
          <p className="text-[10px] text-muted mt-0.5">Default payment method</p>
        </div>
        <Check size={14} className="text-moss shrink-0" />
      </div>

      {/* CTA */}
      <button
        onClick={onConfirmPayment}
        className="w-full text-center text-sm font-semibold text-cream bg-moss py-3.5 rounded-[10px] hover:bg-moss/90 transition-all active:scale-[0.98] shadow-[0_4px_14px_rgba(26,38,89,0.15)]"
      >
        Pay RM {payload.total.toFixed(2)}
      </button>

      <p className="text-[9px] text-muted text-center leading-relaxed">
        Payment processed securely. You will not be charged in this demo.
      </p>
    </div>
  );
}
