import type { BookingService } from "./types";

/**
 * Mock data + copy for the in-chat On-Demand Doctor / Nurse booking flow.
 * Entirely client-side and simulated — no real dispatch, payment, or PHI.
 * Kept separate from mock-data.ts so the booking widget owns its own content.
 */

export interface ServiceConfig {
  service: BookingService;
  label: string;
  tagline: string;
  intro: string;
  reasonPrompt: string;
  reasons: ReasonChip[];
  /** RM, the flat call-out fee shown before procedure/consult lines */
  travelFee: number;
}

export interface ReasonChip {
  id: string;
  label: string;
  /** nurse-only: procedures requiring a doctor's order before booking */
  needsOrder?: boolean;
  /** RM, the per-reason service fee */
  fee: number;
  feeLabel: string;
  /** RM, optional consumables line (e.g. drip kit) */
  consumables?: { label: string; amount: number };
}

export const TRIAGE_SYMPTOMS = [
  "Chest pain or pressure",
  "Trouble breathing",
  "Face droop, weakness or slurred speech",
  "Severe or uncontrolled bleeding",
] as const;

export const NON_DIAGNOSTIC_NOTE =
  "VitalNow explains and arranges care — the attending clinician diagnoses and treats. This is a non-diagnostic concierge service.";

export const SERVICE_CONFIG: Record<BookingService, ServiceConfig> = {
  doctor: {
    service: "doctor",
    label: "On-Demand Doctor",
    tagline: "Consultation at your home or hotel",
    intro:
      "I'll arrange a registered doctor to come to you. It takes about a minute — first a quick safety check, then a few details. You can edit any step before you pay.",
    reasonPrompt: "What's the visit for?",
    travelFee: 20,
    reasons: [
      { id: "consult", label: "General consult", fee: 150, feeLabel: "Consult fee" },
      { id: "results", label: "Discuss my results", fee: 150, feeLabel: "Consult fee" },
      { id: "unwell", label: "Sick or unwell", fee: 150, feeLabel: "Consult fee" },
      { id: "other", label: "Something else", fee: 150, feeLabel: "Consult fee" },
    ],
  },
  nurse: {
    service: "nurse",
    label: "On-Demand Nurse",
    tagline: "Certified nurse visit at your location",
    intro:
      "I'll arrange a certified nurse to visit you. First a quick safety check, then the procedure and a few details. You can edit any step before you pay.",
    reasonPrompt: "Which procedure do you need?",
    travelFee: 20,
    reasons: [
      {
        id: "blood-draw",
        label: "Blood draw",
        fee: 90,
        feeLabel: "Blood draw",
        consumables: { label: "Draw kit", amount: 15 },
      },
      {
        id: "iv-drip",
        label: "IV drip",
        needsOrder: true,
        fee: 180,
        feeLabel: "IV therapy",
        consumables: { label: "Drip kit", amount: 35 },
      },
      {
        id: "injection",
        label: "Injection",
        needsOrder: true,
        fee: 70,
        feeLabel: "Administration",
        consumables: { label: "Sharps & meds handling", amount: 10 },
      },
      {
        id: "wound-care",
        label: "Wound care",
        fee: 120,
        feeLabel: "Wound care",
        consumables: { label: "Dressing kit", amount: 20 },
      },
      {
        id: "obs",
        label: "Follow-up obs",
        fee: 80,
        feeLabel: "Observation visit",
      },
    ],
  },
};

export interface VisitTimeOption {
  id: string;
  mode: "asap" | "schedule";
  label: string;
  detail: string;
  available: boolean;
}

export const TIME_OPTIONS: VisitTimeOption[] = [
  { id: "asap", mode: "asap", label: "ASAP", detail: "Soonest available, est. 45–60 min", available: true },
  { id: "today-pm", mode: "schedule", label: "Today, 4:30 PM", detail: "2 slots left", available: true },
  { id: "today-eve", mode: "schedule", label: "Today, 7:00 PM", detail: "Fully booked", available: false },
  { id: "tmrw-am", mode: "schedule", label: "Tomorrow, 9:15 AM", detail: "Open", available: true },
  { id: "tmrw-pm", mode: "schedule", label: "Tomorrow, 2:00 PM", detail: "Open", available: true },
];

export interface ShareItem {
  id: string;
  label: string;
  sub: string;
  defaultOn: boolean;
}

export function shareItemsFor(service: BookingService): ShareItem[] {
  const base: ShareItem[] = [
    { id: "summary", label: "AI health summary", sub: "Your VitalNow profile so far", defaultOn: true },
    { id: "report", label: "Recent blood report", sub: "Blood Report.pdf · 1.2 MB", defaultOn: true },
  ];
  if (service === "nurse") {
    base.push({ id: "order", label: "Doctor's order", sub: "Lab requisition · Order.pdf", defaultOn: true });
  }
  return base;
}

export interface Provider {
  name: string;
  role: string;
  reg: string;
  languages: string;
  rating: number;
  visits: number;
  /** initials shown in the avatar tile */
  initials: string;
}

export const PROVIDERS: Record<BookingService, Provider> = {
  doctor: {
    name: "Dr. Aisha Rahman",
    role: "Family Medicine",
    reg: "MMC reg. 48217",
    languages: "EN · BM",
    rating: 4.9,
    visits: 312,
    initials: "AR",
  },
  nurse: {
    name: "Nurse Farah Idris",
    role: "Certified Phlebotomy",
    reg: "Nursing Board 22-09183",
    languages: "EN · BM · 中文",
    rating: 4.9,
    visits: 488,
    initials: "FI",
  },
};

/** Live status ladder — the single confirmed card updates through these in place. */
export interface StatusStage {
  key: string;
  label: string;
  eta: string;
}

export const STATUS_LADDER: StatusStage[] = [
  { key: "assigned", label: "Assigned", eta: "ETA ~38 min" },
  { key: "en-route", label: "En route", eta: "ETA ~22 min" },
  { key: "arrived", label: "Arrived", eta: "At your door" },
  { key: "in-visit", label: "In visit", eta: "In progress" },
  { key: "completed", label: "Completed", eta: "Visit complete" },
];

/** Coverage check — addresses mentioning these read as in-area, others fall back. */
const COVERED_AREAS = [
  "kuala lumpur", "kl", "petaling", "pj", "selangor", "bangsar", "mont kiara",
  "cheras", "ampang", "subang", "damansara", "shah alam", "klcc", "bukit",
];

export function isInCoverage(address: string): boolean {
  const a = address.toLowerCase();
  return COVERED_AREAS.some((c) => a.includes(c));
}

export interface PriceQuote {
  lines: { label: string; amount: number }[];
  total: number;
}

export function buildQuote(service: BookingService, reasonId: string | null): PriceQuote {
  const cfg = SERVICE_CONFIG[service];
  const reason = cfg.reasons.find((r) => r.id === reasonId) ?? cfg.reasons[0];
  const lines: { label: string; amount: number }[] = [{ label: reason.feeLabel, amount: reason.fee }];
  if (reason.consumables) lines.push({ label: reason.consumables.label, amount: reason.consumables.amount });
  lines.push({ label: "Travel", amount: cfg.travelFee });
  const total = lines.reduce((sum, l) => sum + l.amount, 0);
  return { lines, total };
}

export function formatRM(amount: number): string {
  return `RM ${amount.toLocaleString("en-MY")}`;
}
