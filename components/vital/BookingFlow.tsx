"use client";

import { useEffect, useRef, useState, type ReactNode, type SVGProps } from "react";
import type { BookingService } from "@/lib/vital/types";
import { Check, Star, Calendar, User as UserIcon, ArrowRight } from "@/components/ui/icons";
import { BottomSheet } from "./BottomSheet";
import {
  SERVICE_CONFIG,
  TRIAGE_SYMPTOMS,
  NON_DIAGNOSTIC_NOTE,
  TIME_OPTIONS,
  shareItemsFor,
  PROVIDERS,
  STATUS_LADDER,
  isInCoverage,
  buildQuote,
  formatRM,
} from "@/lib/vital/booking-data";

/* ------------------------------------------------------------------ */
/* Local icons (kept inline, matching the repo's hand-rolled SVG kit)  */
/* ------------------------------------------------------------------ */

type Ico = SVGProps<SVGSVGElement> & { size?: number };
const svg = (s: number) => ({ width: s, height: s, fill: "none" as const, "aria-hidden": true });

function MapPin({ size = 16, ...p }: Ico) {
  return (
    <svg viewBox="0 0 24 24" {...svg(size)} {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function Clock({ size = 16, ...p }: Ico) {
  return (
    <svg viewBox="0 0 24 24" {...svg(size)} {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ShieldAlert({ size = 16, ...p }: Ico) {
  return (
    <svg viewBox="0 0 24 24" {...svg(size)} {...p}>
      <path d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5C8 22.3 5 18.5 5 14V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 9v4M12 16h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function Phone({ size = 16, ...p }: Ico) {
  return (
    <svg viewBox="0 0 24 24" {...svg(size)} {...p}>
      <path d="M5 4h3l1.5 4.5L7.5 10a11 11 0 006.5 6.5l1.5-2L20 16v3a2 2 0 01-2 2A16 16 0 014 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function CreditCard({ size = 16, ...p }: Ico) {
  return (
    <svg viewBox="0 0 24 24" {...svg(size)} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function Pencil({ size = 12, ...p }: Ico) {
  return (
    <svg viewBox="0 0 24 24" {...svg(size)} {...p}>
      <path d="M16.5 4.5l3 3L8 19l-4 1 1-4 11.5-11.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function Stethoscope({ size = 16, ...p }: Ico) {
  return (
    <svg viewBox="0 0 24 24" {...svg(size)} {...p}>
      <path d="M6 3v5a4 4 0 008 0V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 16v1a5 5 0 0010 0v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

type WizardStep = "triage" | "reason" | "order-gate" | "who" | "location" | "time" | "consent" | "review";
type Phase = "wizard" | "matching" | "confirmed" | "emergency";

interface LocationData {
  type: "home" | "hotel";
  line: string;
  unit: string;
  hotel: string;
  room: string;
  notes: string;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function BookingFlow({ service }: { service: BookingService }) {
  const cfg = SERVICE_CONFIG[service];

  const [phase, setPhase] = useState<Phase>("wizard");
  const [editTarget, setEditTarget] = useState<WizardStep | null>(null);

  // collected data
  const [triagePassed, setTriagePassed] = useState(false);
  const [reasonId, setReasonId] = useState<string | null>(null);
  const [orderUploaded, setOrderUploaded] = useState(false);
  const [forWhom, setForWhom] = useState<"myself" | "someone" | null>(null);
  const [someoneName, setSomeoneName] = useState("");
  const [location, setLocation] = useState<LocationData | null>(null);
  const [timeId, setTimeId] = useState<string | null>(null);
  const defaultShare = shareItemsFor(service).filter((s) => s.defaultOn).map((s) => s.id);
  const [share, setShare] = useState<string[]>(defaultShare);
  const [consentDone, setConsentDone] = useState(false);

  // sheets
  const [sheet, setSheet] = useState<"location" | "time" | "payment" | null>(null);

  // matching / confirmed
  const [statusIndex, setStatusIndex] = useState(0);
  const [rating, setRating] = useState(0);

  const reason = cfg.reasons.find((r) => r.id === reasonId) ?? null;

  /* ---- derive the active wizard step from completeness ---- */
  function computeStep(): WizardStep {
    if (!triagePassed) return "triage";
    if (!reasonId) return "reason";
    if (reason?.needsOrder && !orderUploaded) return "order-gate";
    if (!forWhom) return "who";
    if (!location) return "location";
    if (!timeId) return "time";
    if (!consentDone) return "consent";
    return "review";
  }
  const activeStep = editTarget ?? computeStep();

  /* ---- matching simulation ---- */
  useEffect(() => {
    if (phase !== "matching") return;
    const t = setTimeout(() => {
      setStatusIndex(0);
      setPhase("confirmed");
    }, 3600);
    return () => clearTimeout(t);
  }, [phase]);

  /* ---- live status ladder ---- */
  useEffect(() => {
    if (phase !== "confirmed") return;
    if (statusIndex >= STATUS_LADDER.length - 1) return;
    const t = setTimeout(() => setStatusIndex((i) => Math.min(i + 1, STATUS_LADDER.length - 1)), 2900);
    return () => clearTimeout(t);
  }, [phase, statusIndex]);

  /* ---- handlers ---- */
  function clearEdit() {
    setEditTarget(null);
  }
  function selectReason(id: string) {
    if (id !== reasonId) setOrderUploaded(false);
    setReasonId(id);
    clearEdit();
  }

  const provider = PROVIDERS[service];
  const quote = buildQuote(service, reasonId);
  const completed = phase === "confirmed" && statusIndex >= STATUS_LADDER.length - 1;
  const timeLabel = TIME_OPTIONS.find((t) => t.id === timeId)?.label;

  /* ================================================================ */
  /* EMERGENCY — hard stop                                            */
  /* ================================================================ */
  if (phase === "emergency") {
    return (
      <div className="w-full">
        <CardHeader service={service} cfg={cfg} />
        <div className="mt-3 rounded-[14px] border border-rust/40 bg-rust/[0.06] p-4">
          <div className="flex items-center gap-2 text-rust">
            <ShieldAlert size={18} />
            <span className="ff text-[14px] font-semibold">This may be an emergency</span>
          </div>
          <p className="text-[13px] text-ink leading-relaxed mt-2">
            Based on what you selected, please don&apos;t wait for a home visit. Call emergency services now or go to
            the nearest emergency department.
          </p>
          <a
            href="tel:999"
            className="mt-3 flex items-center justify-center gap-2 h-11 rounded-[12px] bg-rust text-white font-semibold text-[14px] shadow-sm transition-transform active:scale-[0.98]"
          >
            <Phone size={16} /> Call 999
          </a>
          <button
            onClick={() => {
              setTriagePassed(false);
              setPhase("wizard");
            }}
            className="mt-2 w-full h-9 rounded-[10px] text-[12px] font-medium text-muted hover:text-ink transition-colors"
          >
            Back to safety check
          </button>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /* MATCHING                                                         */
  /* ================================================================ */
  if (phase === "matching") {
    return (
      <div className="w-full">
        <CardHeader service={service} cfg={cfg} />
        <CompletedTrail
          service={service}
          reasonLabel={reason?.label}
          forWhom={forWhom}
          someoneName={someoneName}
          location={location}
          timeLabel={timeLabel}
          locked
        />
        <div className="mt-3 rounded-[14px] border border-line-2 bg-paper/60 p-5 flex flex-col items-center text-center">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-moss/20 animate-[rd-vital-pulse_2s_ease-in-out_infinite]" />
            <span className="relative w-10 h-10 rounded-full bg-gradient-to-br from-moss to-moss-2 flex items-center justify-center text-cream">
              {service === "doctor" ? <Stethoscope size={18} /> : <PlusCross />}
            </span>
          </div>
          <p className="ff text-[14px] font-semibold text-ink mt-3">
            Finding {service === "doctor" ? "a doctor" : "a nurse"} near you
          </p>
          <p className="text-[12px] text-muted mt-1">Matching with verified providers in your area…</p>
          <div className="flex items-center gap-1 mt-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-moss/50"
                style={{ animation: `rd-typing-dot 1.2s ease-in-out ${i * 0.18}s infinite` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /* CONFIRMED + LIVE STATUS  (single card updating in place)         */
  /* ================================================================ */
  if (phase === "confirmed") {
    const stage = STATUS_LADDER[statusIndex];
    return (
      <div className="w-full">
        <CardHeader service={service} cfg={cfg} />
        <div className="mt-3 rounded-[16px] border border-line-2 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          {/* Provider */}
          <div className="flex items-start gap-3 p-4">
            <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-moss to-moss-2 text-cream flex items-center justify-center ff font-semibold text-[15px] tracking-tight">
              {provider.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="ff text-[14px] font-semibold text-ink truncate">{provider.name}</span>
                <span className="inline-flex items-center gap-0.5 text-berry shrink-0">
                  <Check size={11} />
                </span>
              </div>
              <p className="text-[11.5px] text-muted leading-snug mt-0.5">
                {provider.role} · {provider.reg}
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-muted">
                <span className="inline-flex items-center gap-1 text-rust">
                  <Star size={10} /> {provider.rating}
                </span>
                <span className="text-line">·</span>
                <span>{provider.visits} visits</span>
                <span className="text-line">·</span>
                <span>{provider.languages}</span>
              </div>
            </div>
          </div>

          {/* Status ladder */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-1">
              {STATUS_LADDER.map((s, i) => (
                <div
                  key={s.key}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i <= statusIndex ? "bg-moss" : "bg-line-2"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-2.5">
              <div key={stage.key} className="flex items-center gap-2 animate-[rd-status-in_0.35s_ease-out_both]">
                {!completed && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-moss opacity-60 animate-[rd-vital-pulse_2s_ease-in-out_infinite]" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-moss" />
                  </span>
                )}
                {completed && <span className="w-5 h-5 rounded-full bg-berry/15 text-berry flex items-center justify-center"><Check size={12} /></span>}
                <span className="ff text-[13.5px] font-semibold text-ink">{stage.label}</span>
              </div>
              <span className="text-[12px] text-muted font-medium tabular-nums">{stage.eta}</span>
            </div>
          </div>

          {/* Actions */}
          {!completed && (
            <div className="grid grid-cols-3 border-t border-line-2 divide-x divide-line-2">
              <ActionBtn label="Chat"><ChatBubble /></ActionBtn>
              <ActionBtn label="Call"><Phone size={15} /></ActionBtn>
              <ActionBtn label="Cancel" tone="muted"><span className="text-[15px] leading-none">×</span></ActionBtn>
            </div>
          )}
        </div>

        {/* Outcome */}
        {completed && <OutcomeCard service={service} reasonId={reasonId} rating={rating} setRating={setRating} />}

        <DisclaimerNote />
      </div>
    );
  }

  /* ================================================================ */
  /* WIZARD                                                           */
  /* ================================================================ */
  return (
    <div className="w-full">
      <CardHeader service={service} cfg={cfg} />

      {/* Echoed completed steps */}
      <CompletedTrail
        service={service}
        reasonLabel={reason?.label}
        forWhom={forWhom}
        someoneName={someoneName}
        location={location}
        timeLabel={timeLabel}
        activeStep={activeStep}
        onEdit={(step) => {
          if (step === "location") setSheet("location");
          else if (step === "time") setSheet("time");
          else setEditTarget(step);
        }}
      />

      {/* Active step */}
      <div className="mt-3">
        {activeStep === "triage" && (
          <TriageStep onSafe={() => setTriagePassed(true)} onEmergency={() => setPhase("emergency")} />
        )}

        {activeStep === "reason" && (
          <ChoiceStep
            prompt={cfg.reasonPrompt}
            options={cfg.reasons.map((r) => ({ id: r.id, label: r.label, badge: r.needsOrder ? "needs order" : undefined }))}
            selected={reasonId}
            onSelect={selectReason}
          />
        )}

        {activeStep === "order-gate" && (
          <OrderGate
            onUpload={() => {
              setOrderUploaded(true);
              clearEdit();
            }}
            onReason={() => {
              setReasonId(null);
              setEditTarget("reason");
            }}
          />
        )}

        {activeStep === "who" && (
          <WhoStep
            forWhom={forWhom}
            someoneName={someoneName}
            setSomeoneName={setSomeoneName}
            onConfirm={(who) => {
              setForWhom(who);
              clearEdit();
            }}
          />
        )}

        {activeStep === "location" && !location && (
          <PromptToOpen
            icon={<MapPin size={18} />}
            title="Where should we come?"
            sub="Add your home or hotel address and access notes."
            cta="Set location"
            onClick={() => setSheet("location")}
          />
        )}

        {activeStep === "time" && !timeId && (
          <PromptToOpen
            icon={<Clock size={18} />}
            title="When works for you?"
            sub="Choose ASAP or pick a scheduled slot."
            cta="Choose a time"
            onClick={() => setSheet("time")}
          />
        )}

        {activeStep === "consent" && (
          <ConsentStep
            service={service}
            selected={share}
            toggle={(id) =>
              setShare((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))
            }
            onConfirm={() => {
              setConsentDone(true);
              clearEdit();
            }}
          />
        )}

        {activeStep === "review" && (
          <ReviewStep
            cfg={cfg}
            quote={quote}
            location={location}
            timeLabel={timeLabel ?? ""}
            shareCount={share.length}
            onConfirm={() => setSheet("payment")}
          />
        )}
      </div>

      {/* ---- Sheets ---- */}
      <LocationSheet
        open={sheet === "location"}
        initial={location}
        onClose={() => setSheet(null)}
        onSave={(loc) => {
          setLocation(loc);
          setSheet(null);
          clearEdit();
        }}
      />
      <TimeSheet
        open={sheet === "time"}
        selected={timeId}
        onClose={() => setSheet(null)}
        onSave={(id) => {
          setTimeId(id);
          setSheet(null);
          clearEdit();
        }}
      />
      <PaymentSheet
        open={sheet === "payment"}
        total={quote.total}
        onClose={() => setSheet(null)}
        onPaid={() => {
          setSheet(null);
          setPhase("matching");
        }}
      />
    </div>
  );
}

/* ================================================================== */
/* Sub-components                                                     */
/* ================================================================== */

function CardHeader({ service, cfg }: { service: BookingService; cfg: (typeof SERVICE_CONFIG)[BookingService] }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-moss to-moss-2 text-cream flex items-center justify-center shrink-0 shadow-sm">
        {service === "doctor" ? <Stethoscope size={17} /> : <PlusCross />}
      </div>
      <div className="min-w-0">
        <p className="ff text-[14px] font-semibold text-ink leading-tight tracking-[-0.01em]">{cfg.label}</p>
        <p className="text-[11.5px] text-muted leading-tight">{cfg.tagline}</p>
      </div>
    </div>
  );
}

function CompletedTrail({
  service,
  reasonLabel,
  forWhom,
  someoneName,
  location,
  timeLabel,
  activeStep,
  onEdit,
  locked,
}: {
  service: BookingService;
  reasonLabel?: string;
  forWhom: "myself" | "someone" | null;
  someoneName: string;
  location: LocationData | null;
  timeLabel?: string;
  activeStep?: WizardStep;
  onEdit?: (step: WizardStep) => void;
  locked?: boolean;
}) {
  const rows: { step: WizardStep; icon: ReactNode; value: string }[] = [];
  if (reasonLabel && activeStep !== "reason")
    rows.push({ step: "reason", icon: service === "doctor" ? <Stethoscope size={14} /> : <PlusCross size={13} />, value: reasonLabel });
  if (forWhom && activeStep !== "who")
    rows.push({ step: "who", icon: <UserIcon size={14} />, value: forWhom === "myself" ? "For myself" : `For ${someoneName || "someone else"}` });
  if (location && activeStep !== "location")
    rows.push({
      step: "location",
      icon: <MapPin size={14} />,
      value: `${location.type === "home" ? "Home" : location.hotel || "Hotel"}${location.unit ? `, ${location.unit}` : ""}`,
    });
  if (timeLabel && activeStep !== "time") rows.push({ step: "time", icon: <Clock size={14} />, value: timeLabel });

  if (rows.length === 0) return null;

  return (
    <div className="mt-3 flex flex-col gap-1.5">
      {rows.map((r) => (
        <div
          key={r.step}
          className="flex items-center gap-2.5 rounded-[10px] bg-paper/70 border border-line-2 px-3 py-2 animate-[rd-status-in_0.3s_ease-out_both]"
        >
          <span className="w-6 h-6 rounded-full bg-white border border-line-2 text-moss flex items-center justify-center shrink-0">
            {r.icon}
          </span>
          <span className="flex-1 min-w-0 text-[12.5px] text-ink font-medium truncate">{r.value}</span>
          <span className="w-4 h-4 rounded-full bg-berry/15 text-berry flex items-center justify-center shrink-0">
            <Check size={9} />
          </span>
          {!locked && onEdit && (
            <button
              onClick={() => onEdit(r.step)}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-muted hover:text-moss transition-colors"
            >
              <Pencil size={11} /> Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function TriageStep({ onSafe, onEmergency }: { onSafe: () => void; onEmergency: () => void }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setChecked((cur) => {
      const next = new Set(cur);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  const any = checked.size > 0;

  return (
    <div className="rounded-[14px] border border-line-2 bg-white p-4">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-full bg-rust/12 text-rust flex items-center justify-center shrink-0">
          <ShieldAlert size={15} />
        </span>
        <p className="ff text-[13.5px] font-semibold text-ink">Quick safety check</p>
      </div>
      <p className="text-[12.5px] text-muted leading-relaxed mt-2">Are you experiencing any of these right now?</p>
      <div className="mt-3 flex flex-col gap-1.5">
        {TRIAGE_SYMPTOMS.map((s, i) => {
          const on = checked.has(i);
          return (
            <button
              key={s}
              onClick={() => toggle(i)}
              className={`flex items-center gap-2.5 rounded-[10px] border px-3 py-2.5 text-left transition-colors ${
                on ? "border-rust/50 bg-rust/[0.06]" : "border-line-2 bg-white hover:border-line"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${
                  on ? "bg-rust border-rust text-white" : "border-line"
                }`}
              >
                {on && <Check size={9} />}
              </span>
              <span className="text-[12.5px] text-ink leading-snug">{s}</span>
            </button>
          );
        })}
      </div>
      <button
        onClick={any ? onEmergency : onSafe}
        className={`mt-3 w-full h-11 rounded-[12px] font-semibold text-[13.5px] transition-transform active:scale-[0.98] ${
          any ? "bg-rust text-white" : "bg-moss text-cream"
        }`}
      >
        {any ? "Get emergency help" : "None of these — continue"}
      </button>
    </div>
  );
}

function ChoiceStep({
  prompt,
  options,
  selected,
  onSelect,
}: {
  prompt: string;
  options: { id: string; label: string; badge?: string }[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-[14px] border border-line-2 bg-white p-4">
      <p className="ff text-[13.5px] font-semibold text-ink">{prompt}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = o.id === selected;
          return (
            <button
              key={o.id}
              onClick={() => onSelect(o.id)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-colors active:scale-[0.97] ${
                on ? "border-moss bg-moss text-cream" : "border-line bg-white text-ink hover:border-moss/40 hover:bg-paper"
              }`}
            >
              {o.label}
              {o.badge && (
                <span className={`text-[9px] font-bold uppercase tracking-[0.05em] px-1.5 py-0.5 rounded-full ${on ? "bg-cream/20 text-cream" : "bg-rust/12 text-rust"}`}>
                  {o.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OrderGate({ onUpload, onReason }: { onUpload: () => void; onReason: () => void }) {
  return (
    <div className="rounded-[14px] border border-rust/40 bg-rust/[0.05] p-4">
      <div className="flex items-center gap-2 text-rust">
        <ShieldAlert size={16} />
        <span className="ff text-[13.5px] font-semibold">This needs a doctor&apos;s order</span>
      </div>
      <p className="text-[12.5px] text-ink leading-relaxed mt-2">
        For safety, this procedure requires a valid prescription or lab order before a nurse can be dispatched.
      </p>
      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <button
          onClick={onUpload}
          className="flex-1 h-10 rounded-[11px] bg-moss text-cream font-semibold text-[12.5px] transition-transform active:scale-[0.98]"
        >
          Upload order
        </button>
        <button
          onClick={onReason}
          className="flex-1 h-10 rounded-[11px] border border-line bg-white text-ink font-medium text-[12.5px] hover:bg-paper transition-colors"
        >
          Choose another procedure
        </button>
      </div>
    </div>
  );
}

function WhoStep({
  forWhom,
  someoneName,
  setSomeoneName,
  onConfirm,
}: {
  forWhom: "myself" | "someone" | null;
  someoneName: string;
  setSomeoneName: (v: string) => void;
  onConfirm: (who: "myself" | "someone") => void;
}) {
  const [local, setLocal] = useState<"myself" | "someone" | null>(forWhom);
  return (
    <div className="rounded-[14px] border border-line-2 bg-white p-4">
      <p className="ff text-[13.5px] font-semibold text-ink">Who is the visit for?</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {(["myself", "someone"] as const).map((w) => {
          const on = local === w;
          return (
            <button
              key={w}
              onClick={() => setLocal(w)}
              className={`h-10 rounded-[11px] border text-[12.5px] font-medium transition-colors ${
                on ? "border-moss bg-moss text-cream" : "border-line bg-white text-ink hover:bg-paper"
              }`}
            >
              {w === "myself" ? "Myself" : "Someone else"}
            </button>
          );
        })}
      </div>
      {local === "someone" && (
        <div className="mt-3">
          <label className="block text-[11px] font-medium text-muted mb-1.5">Their name</label>
          <input
            value={someoneName}
            onChange={(e) => setSomeoneName(e.target.value)}
            placeholder="e.g. Daniyah Yusof"
            className="w-full h-10 px-3 rounded-[10px] border border-line bg-white text-[13px] text-ink outline-none focus:border-moss/50 transition-colors"
          />
        </div>
      )}
      <button
        disabled={!local || (local === "someone" && !someoneName.trim())}
        onClick={() => local && onConfirm(local)}
        className="mt-3 w-full h-10 rounded-[11px] bg-moss text-cream font-semibold text-[12.5px] disabled:bg-line/50 disabled:text-muted/50 transition-transform active:scale-[0.98]"
      >
        Continue
      </button>
    </div>
  );
}

function ConsentStep({
  service,
  selected,
  toggle,
  onConfirm,
}: {
  service: BookingService;
  selected: string[];
  toggle: (id: string) => void;
  onConfirm: () => void;
}) {
  const items = shareItemsFor(service);
  return (
    <div className="rounded-[14px] border border-line-2 bg-white p-4">
      <p className="ff text-[13.5px] font-semibold text-ink">Share your health context?</p>
      <p className="text-[12px] text-muted leading-relaxed mt-1.5">
        Helps the {service === "doctor" ? "doctor" : "nurse"} arrive briefed. You choose what to share, per booking.
      </p>
      <div className="mt-3 flex flex-col gap-1.5">
        {items.map((it) => {
          const on = selected.includes(it.id);
          return (
            <button
              key={it.id}
              onClick={() => toggle(it.id)}
              className={`flex items-center gap-3 rounded-[11px] border px-3 py-2.5 text-left transition-colors ${
                on ? "border-moss/40 bg-moss/[0.04]" : "border-line-2 bg-white hover:border-line"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${
                  on ? "bg-moss border-moss text-cream" : "border-line"
                }`}
              >
                {on && <Check size={9} />}
              </span>
              <span className="min-w-0">
                <span className="block text-[12.5px] font-medium text-ink leading-tight">{it.label}</span>
                <span className="block text-[11px] text-muted leading-tight mt-0.5">{it.sub}</span>
              </span>
            </button>
          );
        })}
      </div>
      <button
        onClick={onConfirm}
        className="mt-3 w-full h-10 rounded-[11px] bg-moss text-cream font-semibold text-[12.5px] transition-transform active:scale-[0.98]"
      >
        {selected.length ? "Share & continue" : "Continue without sharing"}
      </button>
      <p className="text-[10.5px] text-muted/70 leading-relaxed mt-2 text-center">
        Consent is per booking and revocable. PDPA-compliant.
      </p>
    </div>
  );
}

function ReviewStep({
  cfg,
  quote,
  location,
  timeLabel,
  shareCount,
  onConfirm,
}: {
  cfg: (typeof SERVICE_CONFIG)[BookingService];
  quote: ReturnType<typeof buildQuote>;
  location: LocationData | null;
  timeLabel: string;
  shareCount: number;
  onConfirm: () => void;
}) {
  return (
    <div className="rounded-[16px] border border-line-2 bg-white overflow-hidden">
      <div className="px-4 pt-4 pb-3">
        <p className="ff text-[14px] font-semibold text-ink">Review your booking</p>
        <div className="mt-2.5 flex flex-col gap-1.5 text-[12.5px]">
          <ReviewLine label="Service" value={cfg.label} />
          <ReviewLine
            label="Location"
            value={location ? `${location.type === "home" ? "Home" : location.hotel || "Hotel"}${location.unit ? `, ${location.unit}` : ""}` : "—"}
          />
          <ReviewLine label="Time" value={timeLabel || "—"} />
          <ReviewLine label="Sharing" value={shareCount ? `${shareCount} item${shareCount > 1 ? "s" : ""}` : "Nothing"} />
        </div>
      </div>

      <div className="px-4 py-3 bg-paper/60 border-y border-line-2 flex flex-col gap-1.5">
        {quote.lines.map((l) => (
          <div key={l.label} className="flex items-center justify-between text-[12.5px]">
            <span className="text-muted">{l.label}</span>
            <span className="text-ink font-medium tabular-nums">{formatRM(l.amount)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-1.5 mt-0.5 border-t border-line-2">
          <span className="text-[12.5px] font-semibold text-ink">Total (hold)</span>
          <span className="ff text-[15px] font-bold text-moss tabular-nums">{formatRM(quote.total)}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-2 text-[11px] text-muted leading-relaxed">
          <span className="shrink-0 mt-0.5 text-moss"><Stethoscope size={13} /></span>
          <span>{NON_DIAGNOSTIC_NOTE}</span>
        </div>
        <button
          onClick={onConfirm}
          className="mt-3 w-full h-12 rounded-[13px] bg-moss text-cream font-semibold text-[14px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(26,38,89,0.22)] transition-transform active:scale-[0.98]"
        >
          Confirm &amp; authorize {formatRM(quote.total)} <ArrowRight size={15} />
        </button>
        <p className="text-[10.5px] text-muted/70 text-center mt-2">
          We place a hold now and only capture after the visit. Free cancellation up to dispatch.
        </p>
      </div>
    </div>
  );
}

function ReviewLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted shrink-0">{label}</span>
      <span className="text-ink font-medium text-right truncate">{value}</span>
    </div>
  );
}

function OutcomeCard({
  service,
  reasonId,
  rating,
  setRating,
}: {
  service: BookingService;
  reasonId: string | null;
  rating: number;
  setRating: (n: number) => void;
}) {
  const isDraw = service === "nurse" && reasonId === "blood-draw";
  return (
    <div className="mt-3 rounded-[16px] border border-berry/30 bg-berry/[0.04] overflow-hidden animate-[rd-status-in_0.4s_ease-out_both]">
      <div className="p-4">
        <div className="flex items-center gap-2 text-berry">
          <span className="w-6 h-6 rounded-full bg-berry/15 flex items-center justify-center"><Check size={12} /></span>
          <span className="ff text-[14px] font-semibold">Visit complete</span>
        </div>
        <p className="text-[12.5px] text-ink leading-relaxed mt-2">
          {isDraw
            ? "Specimen collected and sent to the lab. Results typically return within 24–48 hours and I'll update your recovery plan automatically."
            : "Your visit summary and any notes are saved to your VitalNow profile. Payment has been captured and a receipt sent."}
        </p>
        {isDraw && (
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white border border-line-2 px-3 py-1.5 text-[11.5px]">
            <span className="text-muted">Lab tracking</span>
            <span className="font-semibold text-ink tabular-nums">VN-LB-90417</span>
          </div>
        )}
      </div>

      {/* Rate */}
      <div className="px-4 py-3 border-t border-berry/20 bg-white/60">
        <p className="text-[12px] font-medium text-ink mb-1.5">How was your visit?</p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setRating(n)} className="p-0.5 transition-transform active:scale-90">
              <Star size={20} className={n <= rating ? "text-rust" : "text-line"} />
            </button>
          ))}
        </div>
      </div>

      {/* Follow-up */}
      <div className="px-4 py-3 border-t border-berry/20 flex flex-wrap gap-2">
        <FollowChip label="Book a follow-up" />
        <FollowChip label={isDraw ? "View recovery plan" : "Book a nurse re-test"} />
      </div>
    </div>
  );
}

function FollowChip({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[12px] font-medium text-ink hover:border-moss/40 hover:bg-paper transition-colors active:scale-[0.97]">
      {label} <ArrowRight size={12} className="text-muted" />
    </button>
  );
}

function PromptToOpen({
  icon,
  title,
  sub,
  cta,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  sub: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-[14px] border border-line-2 bg-white p-4">
      <div className="flex items-start gap-3">
        <span className="w-9 h-9 rounded-[10px] bg-moss/8 text-moss flex items-center justify-center shrink-0">{icon}</span>
        <div className="min-w-0 flex-1">
          <p className="ff text-[13.5px] font-semibold text-ink">{title}</p>
          <p className="text-[12px] text-muted leading-relaxed mt-0.5">{sub}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className="mt-3 w-full h-10 rounded-[11px] bg-moss text-cream font-semibold text-[12.5px] transition-transform active:scale-[0.98]"
      >
        {cta}
      </button>
    </div>
  );
}

/* ---- Sheets ---- */

function LocationSheet({
  open,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  initial: LocationData | null;
  onClose: () => void;
  onSave: (loc: LocationData) => void;
}) {
  const [type, setType] = useState<"home" | "hotel">(initial?.type ?? "home");
  const [line, setLine] = useState(initial?.line ?? "");
  const [unit, setUnit] = useState(initial?.unit ?? "");
  const [hotel, setHotel] = useState(initial?.hotel ?? "");
  const [room, setRoom] = useState(initial?.room ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [touched, setTouched] = useState(false);

  const addressMissing = line.trim().length === 0;
  const covered = !addressMissing && isInCoverage(line);
  const canSave = !addressMissing && covered && (type === "home" || hotel.trim().length > 0);

  function field(v: string, set: (s: string) => void, label: string, placeholder: string, required?: boolean) {
    const err = touched && required && v.trim().length === 0;
    return (
      <div>
        <label className="block text-[11px] font-medium text-muted mb-1.5">{label}</label>
        <input
          value={v}
          onChange={(e) => set(e.target.value)}
          placeholder={placeholder}
          className={`w-full h-10 px-3 rounded-[10px] border bg-white text-[13px] text-ink outline-none transition-colors ${
            err ? "border-rust focus:border-rust" : "border-line focus:border-moss/50"
          }`}
        />
        {err && <p className="text-[10.5px] text-rust mt-1">{label} is required</p>}
      </div>
    );
  }

  return (
    <BottomSheet
      open={open}
      title="Location & access"
      subtitle="Where the visit takes place"
      onClose={onClose}
      footer={
        <button
          onClick={() => {
            setTouched(true);
            if (canSave) onSave({ type, line, unit, hotel, room, notes });
          }}
          disabled={!addressMissing && !covered}
          className="w-full h-11 rounded-[12px] bg-moss text-cream font-semibold text-[13.5px] disabled:opacity-50 transition-transform active:scale-[0.98]"
        >
          Confirm location
        </button>
      }
    >
      <div className="flex flex-col gap-3.5">
        <div className="grid grid-cols-2 gap-2">
          {(["home", "hotel"] as const).map((t) => {
            const on = type === t;
            return (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`h-10 rounded-[11px] border text-[12.5px] font-medium capitalize transition-colors ${
                  on ? "border-moss bg-moss text-cream" : "border-line bg-white text-ink hover:bg-paper"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {type === "hotel" && field(hotel, setHotel, "Hotel name", "e.g. Aloft KL Sentral", true)}
        {field(line, setLine, "Address", "Street, area, city", true)}

        {/* coverage */}
        {!addressMissing && (
          <div
            className={`flex items-center gap-2 rounded-[10px] px-3 py-2 text-[11.5px] ${
              covered ? "bg-berry/8 text-berry" : "bg-rust/8 text-rust"
            }`}
          >
            {covered ? <Check size={12} /> : <ShieldAlert size={13} />}
            {covered ? "In our coverage area" : "We don't cover this area yet"}
          </div>
        )}
        {!addressMissing && !covered && (
          <button className="w-full h-9 rounded-[10px] border border-line text-[12px] font-medium text-ink hover:bg-paper transition-colors">
            Join the waitlist for this area
          </button>
        )}

        <div className="grid grid-cols-2 gap-2">
          {field(type === "hotel" ? room : unit, type === "hotel" ? setRoom : setUnit, type === "hotel" ? "Room no." : "Unit / floor", type === "hotel" ? "e.g. 1204" : "e.g. 12-3")}
          {field(notes, setNotes, "Access notes", "Gate code, call on arrival")}
        </div>
      </div>
    </BottomSheet>
  );
}

function TimeSheet({
  open,
  selected,
  onClose,
  onSave,
}: {
  open: boolean;
  selected: string | null;
  onClose: () => void;
  onSave: (id: string) => void;
}) {
  const [pick, setPick] = useState<string | null>(selected);
  return (
    <BottomSheet
      open={open}
      title="Date & time"
      subtitle="Soonest available or a scheduled slot"
      onClose={onClose}
      footer={
        <button
          onClick={() => pick && onSave(pick)}
          disabled={!pick}
          className="w-full h-11 rounded-[12px] bg-moss text-cream font-semibold text-[13.5px] disabled:opacity-50 transition-transform active:scale-[0.98]"
        >
          Confirm time
        </button>
      }
    >
      <div className="flex flex-col gap-2">
        {TIME_OPTIONS.map((o) => {
          const on = pick === o.id;
          return (
            <button
              key={o.id}
              disabled={!o.available}
              onClick={() => setPick(o.id)}
              className={`flex items-center justify-between rounded-[12px] border px-3.5 py-3 text-left transition-colors ${
                !o.available
                  ? "border-line-2 bg-paper/50 opacity-50 cursor-not-allowed"
                  : on
                    ? "border-moss bg-moss/[0.05]"
                    : "border-line-2 bg-white hover:border-line"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${o.mode === "asap" ? "bg-rust/12 text-rust" : "bg-moss/8 text-moss"}`}>
                  {o.mode === "asap" ? <Clock size={15} /> : <Calendar size={15} />}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-ink leading-tight">{o.label}</p>
                  <p className="text-[11px] text-muted leading-tight mt-0.5">{o.detail}</p>
                </div>
              </div>
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${on ? "bg-moss border-moss text-cream" : "border-line"}`}>
                {on && <Check size={9} />}
              </span>
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
}

function PaymentSheet({
  open,
  total,
  onClose,
  onPaid,
}: {
  open: boolean;
  total: number;
  onClose: () => void;
  onPaid: () => void;
}) {
  const [number, setNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function authorize() {
    if (number.trim().length < 12 || exp.trim().length < 4 || cvc.trim().length < 3) {
      setStatus("error");
      return;
    }
    setStatus("processing");
    timer.current = setTimeout(() => onPaid(), 1700);
  }

  const fieldCls = "w-full h-11 px-3 rounded-[10px] border border-line bg-white text-[13px] text-ink outline-none focus:border-moss/50 transition-colors tabular-nums";

  return (
    <BottomSheet
      open={open}
      title="Authorize payment"
      subtitle={`A hold of ${formatRM(total)} — captured only after your visit`}
      onClose={status === "processing" ? () => {} : onClose}
      footer={
        <button
          onClick={authorize}
          disabled={status === "processing"}
          className="w-full h-12 rounded-[13px] bg-moss text-cream font-semibold text-[14px] flex items-center justify-center gap-2 disabled:opacity-70 transition-transform active:scale-[0.98]"
        >
          {status === "processing" ? (
            <>
              <Spinner /> Authorizing…
            </>
          ) : (
            <>
              <CreditCard size={16} /> Authorize {formatRM(total)} hold
            </>
          )}
        </button>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          {["Card", "e-Wallet", "FPX"].map((m, i) => (
            <button
              key={m}
              className={`flex-1 h-9 rounded-[10px] border text-[12px] font-medium transition-colors ${
                i === 0 ? "border-moss bg-moss/[0.05] text-moss" : "border-line bg-white text-muted hover:bg-paper"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-[11px] font-medium text-muted mb-1.5">Card number</label>
          <input
            value={number}
            onChange={(e) => { setNumber(e.target.value); if (status === "error") setStatus("idle"); }}
            inputMode="numeric"
            placeholder="4242 4242 4242 4242"
            className={fieldCls}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-medium text-muted mb-1.5">Expiry</label>
            <input value={exp} onChange={(e) => { setExp(e.target.value); if (status === "error") setStatus("idle"); }} placeholder="MM/YY" className={fieldCls} />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-muted mb-1.5">CVC</label>
            <input value={cvc} onChange={(e) => { setCvc(e.target.value); if (status === "error") setStatus("idle"); }} placeholder="123" className={fieldCls} />
          </div>
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 rounded-[10px] bg-rust/8 text-rust px-3 py-2 text-[11.5px]">
            <ShieldAlert size={13} /> Check your card details and try again.
          </div>
        )}

        <p className="flex items-center gap-1.5 text-[10.5px] text-muted/70 leading-relaxed">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M7 1L2 3.5V6.5C2 9.55 4.13 12.36 7 13C9.87 12.36 12 9.55 12 6.5V3.5L7 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          Encrypted. This is a demo — no real charge is made.
        </p>
      </div>
    </BottomSheet>
  );
}

/* ---- tiny shared bits ---- */

function ActionBtn({ label, children, tone }: { label: string; children: ReactNode; tone?: "muted" }) {
  return (
    <button
      className={`flex items-center justify-center gap-1.5 py-2.5 text-[12px] font-medium transition-colors ${
        tone === "muted" ? "text-muted hover:text-rust hover:bg-rust/[0.04]" : "text-ink hover:bg-paper"
      }`}
    >
      <span className={tone === "muted" ? "" : "text-moss"}>{children}</span>
      {label}
    </button>
  );
}

function ChatBubble() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function PlusCross({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="animate-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DisclaimerNote() {
  return (
    <p className="mt-2.5 px-1 text-[10.5px] text-muted/70 leading-relaxed flex items-start gap-1.5">
      <span className="shrink-0 mt-0.5"><Stethoscope size={12} /></span>
      {NON_DIAGNOSTIC_NOTE}
    </p>
  );
}
