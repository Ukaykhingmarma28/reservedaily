import type { BookingConfirmationPayload, PaymentConfirmationPayload } from "@/lib/vital/types";
import { Check, Calendar } from "@/components/ui/icons";

function SuccessBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-8 h-8 rounded-full bg-gradient-to-br from-moss to-moss-2 flex items-center justify-center shadow-[0_4px_12px_rgba(20,140,80,0.25)]">
        <Check size={14} className="text-cream" />
      </span>
      <span className="text-sm font-bold text-ink">{label}</span>
    </div>
  );
}

export function BookingConfirmation({ payload }: { payload: BookingConfirmationPayload }) {
  return (
    <div className="space-y-3.5">
      <SuccessBadge label="Appointment Confirmed" />

      <div className="border border-line/40 rounded-[10px] overflow-hidden">
        <div className="px-4 py-3 bg-paper/60 border-b border-line/20 flex items-center gap-2.5">
          <Calendar size={13} className="text-moss shrink-0" />
          <div>
            <p className="text-[13px] font-semibold text-ink">
              {new Date(payload.slot.date + "T00:00:00").toLocaleDateString("en-MY", {
                weekday: "long", month: "long", day: "numeric", year: "numeric",
              })}
            </p>
            <p className="text-[11px] text-muted mt-0.5">{payload.slot.time}</p>
          </div>
        </div>
        <div className="px-4 py-3 border-b border-line/20 bg-white">
          <p className="text-[9px] font-bold text-muted uppercase tracking-[0.1em] mb-1">Practitioner</p>
          <p className="text-[13px]">
            <span className="font-semibold text-ink">{payload.slot.practitioner}</span>
            <span className="text-muted ml-1.5">· {payload.slot.specialty}</span>
          </p>
        </div>
        <div className="px-4 py-3 flex items-center justify-between bg-white">
          <span className="text-[9px] font-bold text-muted uppercase tracking-[0.1em]">Confirmation</span>
          <span className="text-xs font-mono font-bold text-moss bg-moss/8 px-2.5 py-1 rounded-full">{payload.confirmationCode}</span>
        </div>
      </div>

      <p className="text-sm text-ink leading-relaxed">{payload.message}</p>
    </div>
  );
}

export function PaymentConfirmation({ payload }: { payload: PaymentConfirmationPayload }) {
  return (
    <div className="space-y-3.5">
      <div className="flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-moss to-moss-2 flex items-center justify-center shadow-[0_4px_12px_rgba(20,140,80,0.25)]">
          <Check size={14} className="text-cream" />
        </span>
        <div>
          <p className="text-[9px] font-bold text-moss uppercase tracking-[0.1em]">Payment Successful</p>
          <span className="text-sm font-bold text-ink">Order Confirmed</span>
        </div>
      </div>

      <div className="border border-line/40 rounded-[10px] overflow-hidden">
        <div className="px-4 py-3 bg-paper/60 border-b border-line/20">
          <p className="text-[13px] font-semibold text-ink">{payload.product.name}</p>
          <p className="text-[11px] text-muted mt-0.5">{payload.product.provider}</p>
        </div>
        <div className="divide-y divide-line/20 bg-white">
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-[9px] font-bold text-muted uppercase tracking-[0.1em]">Amount paid</span>
            <span className="ff text-base font-bold text-ink">{payload.currency} {payload.amountPaid.toFixed(2)}</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-[9px] font-bold text-muted uppercase tracking-[0.1em]">Payment</span>
            <span className="text-[13px] text-ink">{payload.paymentMethod}</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-[9px] font-bold text-muted uppercase tracking-[0.1em]">Order ID</span>
            <span className="text-xs font-mono font-bold text-moss bg-moss/8 px-2.5 py-1 rounded-full">{payload.orderId}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-ink leading-relaxed">{payload.message}</p>
    </div>
  );
}
