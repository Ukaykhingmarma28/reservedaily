import type {
  BiomarkerResult,
  WellnessPath,
  RecommendedProduct,
  BookingSlot,
} from "./types";
import { getProductById } from "@/lib/products";

export const GREETING_TEXT =
  "Upload a blood test report for AI-powered analysis, browse treatments, or ask me anything about wellness.";

export const UPLOAD_INSTRUCTIONS =
  "Upload your blood test report as a PDF or image (JPG, PNG). I'll extract your biomarkers and provide a personalised analysis.";

export const FREE_CHAT_WELCOME =
  "Ask me anything about wellness treatments, supplements, or ReserveDaily services. I'm here to help.";

export const BROWSE_TREATMENTS_WELCOME =
  "Let's find the right treatment for you. Select a wellness path below to see personalised recommendations.";

export const NURSE_BOOKING_WELCOME =
  "Our on-demand nurses are certified professionals who come to your home or hotel. Select a convenient time slot below:";

export const DOCTOR_BOOKING_WELCOME =
  "Our on-demand doctors provide consultations and treatments at your location. Select a convenient time slot below:";

export const ANALYSIS_SUMMARY =
  "Based on your blood panel, I've identified a few areas that need attention. Your Vitamin D and iron levels are below optimal range, and there's mild inflammation indicated by elevated hs-CRP. The good news — your thyroid function, blood sugar control, and most other markers look solid. Let's focus on addressing the deficiencies.";

export const MOCK_BIOMARKERS: BiomarkerResult[] = [
  {
    name: "Vitamin D",
    value: 18,
    unit: "ng/mL",
    referenceRange: { low: 30, high: 100 },
    status: "low",
    explanation:
      "Below optimal range. Low Vitamin D is linked to fatigue, weak bones, and reduced immunity.",
  },
  {
    name: "hs-CRP",
    value: 3.8,
    unit: "mg/L",
    referenceRange: { low: 0, high: 1.0 },
    status: "high",
    explanation:
      "Elevated — indicates systemic inflammation. May be linked to diet, stress, or underlying conditions.",
  },
  {
    name: "Ferritin",
    value: 12,
    unit: "ng/mL",
    referenceRange: { low: 20, high: 200 },
    status: "low",
    explanation:
      "Low iron stores. Can cause fatigue, hair loss, and reduced exercise tolerance.",
  },
  {
    name: "HbA1c",
    value: 5.2,
    unit: "%",
    referenceRange: { low: 4.0, high: 5.6 },
    status: "normal",
    explanation:
      "Within normal range. Good blood sugar control over the past 3 months.",
  },
  {
    name: "TSH",
    value: 2.1,
    unit: "mIU/L",
    referenceRange: { low: 0.4, high: 4.0 },
    status: "normal",
    explanation: "Thyroid function is normal. No concerns here.",
  },
  {
    name: "Vitamin B12",
    value: 180,
    unit: "pg/mL",
    referenceRange: { low: 200, high: 900 },
    status: "low",
    explanation:
      "Slightly below range. Low B12 can cause fatigue, numbness, and cognitive fog.",
  },
  {
    name: "Total Cholesterol",
    value: 210,
    unit: "mg/dL",
    referenceRange: { low: 0, high: 200 },
    status: "high",
    explanation:
      "Mildly elevated. Consider dietary adjustments and recheck in 3 months.",
  },
  {
    name: "Cortisol (AM)",
    value: 16,
    unit: "mcg/dL",
    referenceRange: { low: 6, high: 23 },
    status: "normal",
    explanation: "Morning cortisol is within range. Stress axis functioning normally.",
  },
];

export const MOCK_WELLNESS_PATHS: WellnessPath[] = [
  {
    id: "anti-aging",
    label: "Anti Aging & Aesthetics",
    description: "HIFU & Lasers, Injectables, Skin Boosters",
    iconKey: "leaf",
    recommended: false,
  },
  {
    id: "health-check",
    label: "Health Check & Body Insights",
    description: "Blood Panels, Genetic Testing, Hormone Panels",
    iconKey: "droplet",
    recommended: true,
  },
  {
    id: "supplements",
    label: "Health Product & Supplements",
    description: "Vitamins, Minerals, Adaptogens, Collagen",
    iconKey: "bolt",
    recommended: true,
  },
  {
    id: "mind-mood",
    label: "Mind & Mood Balance",
    description: "Nootropics, Sleep Stack, Therapy",
    iconKey: "brain",
    recommended: false,
  },
  {
    id: "pain-recovery",
    label: "Pain Relief & Body Recovery",
    description: "Cryotherapy, Red Light, PRP Joint",
    iconKey: "heart",
    recommended: false,
  },
  {
    id: "regen",
    label: "Regen & Functional Care",
    description: "Exosome Therapy, Stem Cell, Peptides, NAD+",
    iconKey: "dna",
    recommended: false,
  },
];

const VITAL_RECOMMENDATIONS: Record<string, { productId: string; reason: string }[]> = {
  "anti-aging": [
    { productId: "nad-iv-drip", reason: "Cellular energy restoration for longevity and mitochondrial function." },
    { productId: "whitening-antioxidant-anti-aging-iv-drip", reason: "Master antioxidant for cellular repair and anti-aging." },
    { productId: "crystal-tomato-plus-supplements", reason: "Daily antioxidant maintenance for long-term cellular health." },
  ],
  "health-check": [
    { productId: "multi-vitamin-replenish-iv-drip", reason: "Directly addresses your low ferritin and nutrient gaps for faster repletion." },
    { productId: "bone-booster-im-vitamin-d3-support", reason: "Vitamin D3 injection to rapidly restore your levels from 18 to optimal." },
    { productId: "vitamin-d-jab", reason: "Quick Vitamin D boost to maintain levels after initial treatment." },
    { productId: "magnesium-bisglycinate-750mg-60-capsules-150mg-elemental", reason: "Daily mineral supplement to support overall nutrient balance." },
  ],
  "supplements": [
    { productId: "vitamin-d-jab", reason: "Vitamin D injection to restore your levels from 18 to optimal range." },
    { productId: "magnesium-bisglycinate-750mg-60-capsules-150mg-elemental", reason: "Daily magnesium for sleep quality, stress response, and enzyme support." },
    { productId: "live-conscious-omegawell-omega-3-fish-oil", reason: "Omega-3 for daily cardiovascular and cognitive support." },
    { productId: "zinc-vitality-iv-drip", reason: "Essential zinc for immune function and thyroid support." },
    { productId: "thera-c-advanced-curcumin-complex", reason: "Advanced curcumin for daily anti-inflammatory and antioxidant support." },
    { productId: "theragut-precision-prebiotic-probiotic-supplement", reason: "Prebiotic and probiotic blend for gut health and nutrient absorption." },
  ],
  "mind-mood": [
    { productId: "magnesium-bisglycinate-750mg-60-capsules-150mg-elemental", reason: "Calming mineral that supports sleep quality and stress response." },
    { productId: "brain-booster-iv-drip-ginkgo-support", reason: "Ginkgo-infused IV drip to support cognitive function and mental clarity." },
    { productId: "snooze-d-stress-iv-drip", reason: "Targeted IV therapy for stress reduction and better sleep." },
  ],
  "pain-recovery": [
    { productId: "nad-iv-drip", reason: "NAD+ accelerates cellular repair and reduces inflammation post-injury." },
    { productId: "whitening-antioxidant-anti-aging-iv-drip", reason: "Reduces oxidative stress that slows recovery from injury." },
    { productId: "immune-booster-iv-drip-germany", reason: "Immune-boosting IV to support tissue repair and recovery." },
  ],
  "regen": [
    { productId: "nad-iv-drip", reason: "Cellular energy restoration for longevity and mitochondrial function." },
    { productId: "whitening-antioxidant-anti-aging-iv-drip", reason: "Master antioxidant for cellular repair and regeneration." },
    { productId: "vitality-enhancer-iv-drip", reason: "Energy and vitality boost to support nerve regeneration." },
    { productId: "cell-renewal-iv-drip", reason: "Cellular renewal therapy for long-term regenerative health." },
  ],
};

export const PRODUCTS_BY_PATH: Record<string, RecommendedProduct[]> = Object.fromEntries(
  Object.entries(VITAL_RECOMMENDATIONS).map(([path, recs]) => [
    path,
    recs.map(({ productId, reason }) => ({
      product: getProductById(productId)!,
      reason,
    })),
  ]),
);

export const MOCK_BOOKING_SLOTS: BookingSlot[] = [
  {
    id: "s1",
    date: "2026-04-28",
    time: "10:00 AM",
    practitioner: "Dr. Sarah Lim",
    specialty: "IV Therapy Specialist",
    available: true,
  },
  {
    id: "s2",
    date: "2026-04-28",
    time: "2:30 PM",
    practitioner: "Dr. Ahmad Razak",
    specialty: "Functional Medicine",
    available: true,
  },
  {
    id: "s3",
    date: "2026-04-29",
    time: "9:00 AM",
    practitioner: "Dr. Sarah Lim",
    specialty: "IV Therapy Specialist",
    available: true,
  },
  {
    id: "s4",
    date: "2026-04-29",
    time: "11:30 AM",
    practitioner: "Dr. Mei Chen",
    specialty: "Nutritional Medicine",
    available: true,
  },
  {
    id: "s5",
    date: "2026-04-30",
    time: "10:00 AM",
    practitioner: "Dr. Ahmad Razak",
    specialty: "Functional Medicine",
    available: false,
  },
  {
    id: "s6",
    date: "2026-04-30",
    time: "3:00 PM",
    practitioner: "Dr. Mei Chen",
    specialty: "Nutritional Medicine",
    available: true,
  },
];

export const MOCK_NURSE_SLOTS: BookingSlot[] = [
  {
    id: "ns1",
    date: "2026-04-28",
    time: "9:00 AM",
    practitioner: "Nurse Aisha Rahman",
    specialty: "IV Therapy & Wellness",
    available: true,
  },
  {
    id: "ns2",
    date: "2026-04-28",
    time: "1:00 PM",
    practitioner: "Nurse Priya Nair",
    specialty: "Home Care & Injections",
    available: true,
  },
  {
    id: "ns3",
    date: "2026-04-29",
    time: "10:00 AM",
    practitioner: "Nurse Aisha Rahman",
    specialty: "IV Therapy & Wellness",
    available: true,
  },
  {
    id: "ns4",
    date: "2026-04-29",
    time: "3:00 PM",
    practitioner: "Nurse Priya Nair",
    specialty: "Home Care & Injections",
    available: false,
  },
  {
    id: "ns5",
    date: "2026-04-30",
    time: "11:00 AM",
    practitioner: "Nurse Aisha Rahman",
    specialty: "IV Therapy & Wellness",
    available: true,
  },
];

export const MOCK_DOCTOR_SLOTS: BookingSlot[] = [
  {
    id: "ds1",
    date: "2026-04-28",
    time: "10:00 AM",
    practitioner: "Dr. Sarah Lim",
    specialty: "Functional Medicine",
    available: true,
  },
  {
    id: "ds2",
    date: "2026-04-28",
    time: "3:00 PM",
    practitioner: "Dr. Ahmad Razak",
    specialty: "General Practitioner",
    available: true,
  },
  {
    id: "ds3",
    date: "2026-04-29",
    time: "9:30 AM",
    practitioner: "Dr. Sarah Lim",
    specialty: "Functional Medicine",
    available: true,
  },
  {
    id: "ds4",
    date: "2026-04-29",
    time: "2:00 PM",
    practitioner: "Dr. Mei Chen",
    specialty: "Nutritional Medicine",
    available: true,
  },
  {
    id: "ds5",
    date: "2026-04-30",
    time: "10:00 AM",
    practitioner: "Dr. Ahmad Razak",
    specialty: "General Practitioner",
    available: false,
  },
];

export const QA_RESPONSES: Record<string, string> = {
  price:
    "Our treatments range from RM 45 for supplements to RM 850 for premium IV therapy. Pricing depends on the treatment type and clinic. Would you like me to recommend something within your budget?",
  location:
    "ReserveDaily partners with clinics across Kuala Lumpur, Petaling Jaya, and Mont Kiara. Each treatment listing shows the clinic location. Would you like to see options near you?",
  clinic:
    "We work with certified wellness clinics including Vitality Wellness KL, The Wellness Clinic PJ, GlowMed Clinic, and Reviv Malaysia. All practitioners are licensed medical professionals.",
  appointment:
    "You can book appointments directly through Vital AI after selecting a treatment. I'll show you available time slots with our partner practitioners.",
  vitamin:
    "Vitamin deficiencies are very common and treatable. The most effective approach depends on the specific vitamin — IV therapy provides faster absorption than oral supplements. Upload your blood report and I can give you specific recommendations.",
  iv:
    "IV therapy delivers nutrients directly into your bloodstream, bypassing the digestive system for near-100% absorption. Sessions typically take 30-60 minutes. Our partner clinics offer a range of IV drips for energy, immunity, anti-aging, and recovery.",
  supplement:
    "ReserveDaily offers both clinical treatments (IV drips, injections) and take-home supplements. Clinical treatments provide faster results, while supplements support long-term maintenance. I can help you find the right combination.",
  default:
    "That's a great question. I can help with information about our wellness treatments, booking appointments, understanding blood test results, and general health guidance. Would you like to upload a blood report for a personalised analysis, or ask about a specific treatment?",
};
