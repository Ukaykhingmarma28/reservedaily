import type { Product } from "@/lib/data";
import type {
  BiomarkerResult,
  WellnessPath,
  RecommendedProduct,
  BookingSlot,
} from "./types";

export const GREETING_TEXT =
  "Upload a blood test report for AI-powered analysis, browse treatments, or ask me anything about wellness.";

export const UPLOAD_INSTRUCTIONS =
  "Upload your blood test report as a PDF or image (JPG, PNG). I'll extract your biomarkers and provide a personalised analysis.";

export const FREE_CHAT_WELCOME =
  "Ask me anything about wellness treatments, supplements, or ReserveDaily services. I'm here to help.";

export const BROWSE_TREATMENTS_WELCOME =
  "Let's find the right treatment for you. Select a wellness path below to see personalised recommendations.";

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

// --- Bookable treatments (type: "bookable") ---

const ironIV: Product = {
  type: "bookable",
  tag: "IV Therapy",
  name: "Iron IV Infusion",
  provider: "Klinik Esthetika",
  location: "Mont Kiara, KL",
  rating: 4.8,
  reviews: 124,
  duration: "45 min",
  art: "cell",
  color: "#4a7c6f",
  category: "Energy & Vitality",
  price: "RM 380",
};

const vitDDrip: Product = {
  type: "bookable",
  tag: "IV Therapy",
  name: "Vitamin D3 + K2 Drip",
  provider: "Vitality Wellness KL",
  location: "Bangsar, KL",
  rating: 4.9,
  reviews: 89,
  duration: "30 min",
  art: "leaf",
  color: "#6b8f71",
  category: "Energy & Vitality",
  price: "RM 280",
};

const b12Injection: Product = {
  type: "bookable",
  tag: "Injection",
  name: "B12 Methylcobalamin Shot",
  provider: "The Wellness Clinic PJ",
  location: "Petaling Jaya",
  rating: 4.7,
  reviews: 203,
  duration: "15 min",
  art: "cell",
  color: "#7a6b8f",
  category: "Energy & Vitality",
  price: "RM 120",
};

const nadDrip: Product = {
  type: "bookable",
  tag: "Premium IV",
  name: "NAD+ Recovery Drip",
  provider: "Reviv Malaysia",
  location: "KLCC, KL",
  rating: 4.6,
  reviews: 67,
  duration: "90 min",
  art: "cell",
  color: "#8f6b6b",
  category: "Anti-Aging & Longevity",
  price: "RM 850",
};

const glutathioneDrip: Product = {
  type: "bookable",
  tag: "IV Therapy",
  name: "Glutathione IV Drip",
  provider: "GlowMed Clinic",
  location: "Sri Hartamas, KL",
  rating: 4.8,
  reviews: 156,
  duration: "40 min",
  art: "leaf",
  color: "#6b8f8f",
  category: "Immune Boost",
  price: "RM 350",
};

const vitCIV: Product = {
  type: "bookable",
  tag: "IV Therapy",
  name: "High-Dose Vitamin C IV",
  provider: "Vitality Wellness KL",
  location: "Bangsar, KL",
  rating: 4.7,
  reviews: 178,
  duration: "45 min",
  art: "cell",
  color: "#8f8f6b",
  category: "Immune Boost",
  price: "RM 220",
};

// --- Physical products (type: "physical") ---

const vitD3Supplement: Product = {
  type: "physical",
  tag: "Supplement",
  name: "Vitamin D3 5000 IU + K2",
  provider: "ReserveDaily Essentials",
  location: "Ships from KL",
  rating: 4.9,
  reviews: 312,
  size: "60 capsules",
  art: "leaf",
  color: "#6b8f71",
  category: "Energy & Vitality",
  price: "RM 89",
  was: "RM 120",
};

const ironBisglycinate: Product = {
  type: "physical",
  tag: "Supplement",
  name: "Iron Bisglycinate 25mg",
  provider: "ReserveDaily Essentials",
  location: "Ships from KL",
  rating: 4.7,
  reviews: 187,
  size: "90 capsules",
  art: "cell",
  color: "#8f6b7a",
  category: "Energy & Vitality",
  price: "RM 65",
};

const b12Sublingual: Product = {
  type: "physical",
  tag: "Supplement",
  name: "B12 Methylcobalamin 1000mcg",
  provider: "Thorne Research",
  location: "Ships from KL",
  rating: 4.8,
  reviews: 245,
  size: "60 lozenges",
  art: "cell",
  color: "#7a6b8f",
  category: "Energy & Vitality",
  price: "RM 95",
};

const glutathioneCapsules: Product = {
  type: "physical",
  tag: "Antioxidant",
  name: "Liposomal Glutathione 500mg",
  provider: "Quicksilver Scientific",
  location: "Ships from KL",
  rating: 4.6,
  reviews: 98,
  size: "30 softgels",
  art: "leaf",
  color: "#6b8f8f",
  category: "Immune Boost",
  price: "RM 180",
};

const zincSupplement: Product = {
  type: "physical",
  tag: "Mineral",
  name: "Zinc Picolinate 30mg",
  provider: "ReserveDaily Essentials",
  location: "Ships from KL",
  rating: 4.5,
  reviews: 92,
  size: "120 capsules",
  art: "cell",
  color: "#6b7a8f",
  category: "Immune Boost",
  price: "RM 45",
};

const magnesiumComplex: Product = {
  type: "physical",
  tag: "Supplement",
  name: "Magnesium Glycinate 400mg",
  provider: "Thorne Research",
  location: "Ships from KL",
  rating: 4.8,
  reviews: 267,
  size: "90 capsules",
  art: "leaf",
  color: "#6b8f71",
  category: "Mental Clarity & Stress",
  price: "RM 110",
};

// --- Product recommendations by wellness path ---

export const PRODUCTS_BY_PATH: Record<string, RecommendedProduct[]> = {
  "anti-aging": [
    { product: nadDrip, reason: "Cellular energy restoration for longevity and mitochondrial function." },
    { product: glutathioneDrip, reason: "Master antioxidant for cellular repair and anti-aging." },
    { product: glutathioneCapsules, reason: "Daily antioxidant maintenance for long-term cellular health." },
  ],
  "health-check": [
    { product: ironIV, reason: "Directly addresses your low ferritin for faster iron repletion." },
    { product: vitDDrip, reason: "High-dose Vitamin D IV to rapidly restore your levels from 18 to optimal." },
    { product: vitD3Supplement, reason: "Daily maintenance to keep Vitamin D levels optimal after IV therapy." },
    { product: ironBisglycinate, reason: "Gentle daily iron supplement to maintain ferritin between IV sessions." },
  ],
  "supplements": [
    { product: vitD3Supplement, reason: "Daily Vitamin D to restore your levels from 18 to optimal range." },
    { product: ironBisglycinate, reason: "Gentle daily iron to maintain ferritin between clinical sessions." },
    { product: b12Sublingual, reason: "Sublingual B12 for daily support — absorbs faster than oral tablets." },
    { product: zincSupplement, reason: "Essential trace mineral for immune function and thyroid support." },
    { product: magnesiumComplex, reason: "Supports sleep quality, stress response, and over 300 enzymes." },
    { product: glutathioneCapsules, reason: "Daily liposomal glutathione for sustained antioxidant support." },
  ],
  "mind-mood": [
    { product: magnesiumComplex, reason: "Calming mineral that supports sleep quality and stress response." },
    { product: b12Injection, reason: "B12 supports cognitive function and mood regulation." },
    { product: b12Sublingual, reason: "Daily B12 maintenance for mental clarity." },
  ],
  "pain-recovery": [
    { product: nadDrip, reason: "NAD+ accelerates cellular repair and reduces inflammation post-injury." },
    { product: glutathioneDrip, reason: "Reduces oxidative stress that slows recovery from injury." },
    { product: vitCIV, reason: "High-dose Vitamin C supports collagen synthesis and tissue repair." },
  ],
  "regen": [
    { product: nadDrip, reason: "Cellular energy restoration for longevity and mitochondrial function." },
    { product: glutathioneDrip, reason: "Master antioxidant for cellular repair and regeneration." },
    { product: b12Injection, reason: "Quick B12 boost to support nerve regeneration and energy." },
    { product: glutathioneCapsules, reason: "Daily antioxidant maintenance for long-term cellular health." },
  ],
};

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
