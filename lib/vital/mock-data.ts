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


export const ANALYSIS_SUMMARY =
  "Your blood panel reveals three interconnected areas of concern. HbA1c at 6.7% confirms diabetes, with fasting glucose also elevated at 6.8 mmol/L. Your lipid profile shows significantly raised total cholesterol (7.19) and LDL (5.2) — both well above target, especially for a diabetic patient. Your eGFR at 55 mL/min indicates Stage 3a chronic kidney disease, with creatinine confirming reduced clearance. Haemoglobin is mildly low at 13.4, which can be linked to kidney function. The positive news — electrolytes, liver enzymes, hepatitis screening, and PSA are all normal. This profile needs proactive management to protect your kidneys and cardiovascular system.";

export const MOCK_BIOMARKERS: BiomarkerResult[] = [
  {
    name: "HbA1c",
    value: 6.7,
    unit: "%",
    referenceRange: { low: 4.0, high: 6.0 },
    status: "high",
    explanation:
      "Above the diabetes threshold of 6.5%. Indicates average blood sugar has been elevated over the past 2–3 months, consistent with Type 2 diabetes. Requires active management through diet, exercise, and possibly medication.",
  },
  {
    name: "Total Cholesterol",
    value: 7.19,
    unit: "mmol/L",
    referenceRange: { low: 0, high: 5.2 },
    status: "high",
    explanation:
      "Significantly elevated at nearly 1.4× the desirable upper limit. Combined with high LDL, this substantially increases cardiovascular risk — particularly important given the diabetic status.",
  },
  {
    name: "LDL Cholesterol",
    value: 5.2,
    unit: "mmol/L",
    referenceRange: { low: 0, high: 2.6 },
    status: "high",
    explanation:
      "Twice the optimal threshold. LDL is the primary driver of atherosclerotic plaque formation. For a diabetic patient, guidelines recommend aggressive LDL reduction below 1.8 mmol/L.",
  },
  {
    name: "eGFR",
    value: 55,
    unit: "mL/min",
    referenceRange: { low: 90, high: 120 },
    status: "low",
    explanation:
      "Estimated at Stage 3a chronic kidney disease. Kidney filtration is moderately reduced. This needs monitoring every 3–6 months as both diabetes and high cholesterol accelerate kidney decline.",
  },
  {
    name: "Creatinine",
    value: 119,
    unit: "µmol/L",
    referenceRange: { low: 64, high: 104 },
    status: "high",
    explanation:
      "Elevated above the reference range, confirming reduced kidney clearance. Consistent with the low eGFR finding and warrants nephrology follow-up.",
  },
  {
    name: "Fasting Glucose",
    value: 6.8,
    unit: "mmol/L",
    referenceRange: { low: 3.5, high: 6.0 },
    status: "high",
    explanation:
      "Above fasting reference range. Together with the elevated HbA1c, this confirms impaired glucose regulation requiring intervention.",
  },
  {
    name: "Haemoglobin",
    value: 13.4,
    unit: "g/dL",
    referenceRange: { low: 14.0, high: 18.0 },
    status: "low",
    explanation:
      "Mildly below the male reference range. In the context of reduced kidney function, this could indicate early anaemia of chronic kidney disease — the kidneys produce less erythropoietin.",
  },
  {
    name: "Triglycerides",
    value: 1.8,
    unit: "mmol/L",
    referenceRange: { low: 0, high: 1.7 },
    status: "high",
    explanation:
      "Slightly above threshold. Elevated triglycerides combined with high LDL and borderline HDL form an atherogenic lipid profile. Dietary changes — particularly reducing refined carbs — can help.",
  },
  {
    name: "HDL Cholesterol",
    value: 1.16,
    unit: "mmol/L",
    referenceRange: { low: 1.0, high: 1.5 },
    status: "normal",
    explanation:
      "Just above the minimum threshold. Ideally should be higher for cardiovascular protection. Regular exercise and omega-3 intake can help raise HDL levels.",
  },
  {
    name: "Sodium",
    value: 139,
    unit: "mmol/L",
    referenceRange: { low: 135, high: 145 },
    status: "normal",
    explanation:
      "Within normal limits. Electrolyte balance is well maintained despite reduced kidney function.",
  },
  {
    name: "Potassium",
    value: 4.3,
    unit: "mmol/L",
    referenceRange: { low: 3.5, high: 5.0 },
    status: "normal",
    explanation:
      "Normal. Important to continue monitoring given kidney function — the kidneys regulate potassium excretion and impairment can cause dangerous elevations.",
  },
  {
    name: "PSA",
    value: 1.81,
    unit: "ng/mL",
    referenceRange: { low: 0, high: 4.0 },
    status: "normal",
    explanation:
      "Well within normal range for age. No prostate concerns indicated. Routine screening recommended annually for men over 50.",
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
    { productId: "nad-iv-drip", reason: "Your eGFR at 55 and HbA1c at 6.7% indicate accelerated cellular ageing from metabolic stress — NAD+ restores mitochondrial function and supports cellular repair in diabetic and kidney-compromised patients." },
    { productId: "whitening-antioxidant-anti-aging-iv-drip", reason: "High-dose glutathione IV to counteract the oxidative stress that elevated blood sugar and cholesterol place on your vascular system, while supporting skin health." },
    { productId: "crystal-tomato-plus-supplements", reason: "Daily oral antioxidant for ongoing free-radical defence between IV sessions — particularly important when metabolic markers are elevated." },
  ],
  "health-check": [
    { productId: "multi-vitamin-replenish-iv-drip", reason: "Your haemoglobin is low at 13.4 g/dL and kidney function is reduced — this IV delivers iron, B-vitamins, and essential minerals directly, bypassing any absorption issues." },
    { productId: "bone-booster-im-vitamin-d3-support", reason: "Reduced kidney function (eGFR 55) impairs Vitamin D activation. IM injection bypasses both gut and renal pathways for direct bioavailable D3 support." },
    { productId: "vitamin-d-jab", reason: "Maintenance D3 jab to support calcium metabolism and immune function — especially important given your Stage 3a CKD, which affects vitamin D processing." },
    { productId: "magnesium-bisglycinate-750mg-60-capsules-150mg-elemental", reason: "Magnesium supports insulin sensitivity (relevant to your HbA1c of 6.7%) and over 300 enzyme reactions including blood pressure regulation." },
  ],
  "supplements": [
    { productId: "vitamin-d-jab", reason: "Your reduced kidney function (eGFR 55) impairs vitamin D metabolism — injection delivery ensures adequate levels without relying on compromised renal activation." },
    { productId: "magnesium-bisglycinate-750mg-60-capsules-150mg-elemental", reason: "Glycinate form for best absorption. Clinically shown to improve insulin sensitivity — directly relevant to your HbA1c of 6.7% and fasting glucose of 6.8." },
    { productId: "live-conscious-omegawell-omega-3-fish-oil", reason: "Your total cholesterol is 7.19 and LDL is 5.2 — omega-3s help lower triglycerides (yours at 1.8), raise HDL, and reduce cardiovascular inflammation." },
    { productId: "thera-c-advanced-curcumin-complex", reason: "Curcumin reduces systemic inflammation and has nephroprotective properties — particularly relevant given your eGFR of 55 mL/min." },
    { productId: "theragut-precision-prebiotic-probiotic-supplement", reason: "Gut health directly affects metabolic markers. Emerging research links gut microbiome balance to improved glycaemic control and cholesterol metabolism." },
  ],
  "mind-mood": [
    { productId: "magnesium-bisglycinate-750mg-60-capsules-150mg-elemental", reason: "Managing diabetes and kidney disease is stressful. Magnesium glycinate calms the nervous system, improves sleep quality, and supports insulin sensitivity." },
    { productId: "brain-booster-iv-drip-ginkgo-support", reason: "Elevated blood sugar can affect cognitive function over time. This ginkgo + B-vitamin IV supports neural blood flow and mental clarity." },
    { productId: "snooze-d-stress-iv-drip", reason: "Chronic metabolic conditions disrupt sleep and stress recovery. This blend of magnesium, B-vitamins, and calming aminos supports restorative rest." },
  ],
  "pain-recovery": [
    { productId: "nad-iv-drip", reason: "NAD+ directly fuels cellular repair enzymes. Your metabolic profile (diabetes + reduced kidney function) means tissue repair is slower and needs targeted support." },
    { productId: "immune-booster-iv-drip-germany", reason: "German-formulated high-dose vitamin C + zinc IV to support immune-mediated tissue repair — important when metabolic stress is elevated." },
    { productId: "whitening-antioxidant-anti-aging-iv-drip", reason: "Glutathione reduces oxidative damage from chronic hyperglycaemia and dyslipidaemia, supporting your body's recovery capacity." },
  ],
  "regen": [
    { productId: "nad-iv-drip", reason: "NAD+ is foundational for cellular regeneration — addresses the mitochondrial dysfunction caused by sustained elevated glucose and compromised kidney clearance." },
    { productId: "cell-renewal-iv-drip", reason: "Targeted amino acids and growth factors to accelerate stem cell activity — supports kidney and vascular tissue turnover." },
    { productId: "vitality-enhancer-iv-drip", reason: "Full-spectrum IV with B12, iron, and trace minerals — directly addresses your low haemoglobin (13.4) and supports energy levels." },
    { productId: "whitening-antioxidant-anti-aging-iv-drip", reason: "Glutathione IV to clear the oxidative load from chronic hyperglycaemia — unblocking your body's natural regenerative pathways." },
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
