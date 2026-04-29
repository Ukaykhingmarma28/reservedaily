import type {
  BiomarkerResult,
  WellnessPath,
  RecommendedProduct,
  BookingSlot,
  KeyTakeaway,
  RecoveryPlanPhase,
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
  "Your lipid panel reveals significant cardiovascular risk. LDL cholesterol at 4.04 mmol/L is well above the recommended threshold of 2.58, while total cholesterol (5.8) and non-HDL cholesterol (4.69) are also elevated. Your TC/HDL ratio of 5.2 exceeds the target of 5.0. The positive news — kidney function (eGFR 101), liver enzymes, fasting glucose (5.4), electrolytes, and inflammatory markers are all within healthy ranges. This is an excellent foundation for targeted lipid intervention.";

export const MOCK_BIOMARKERS: BiomarkerResult[] = [
  {
    name: "LDL Cholesterol",
    value: 4.04,
    unit: "mmol/L",
    referenceRange: { low: 0, high: 2.58 },
    status: "high",
    category: "cardiovascular",
    explanation:
      "Significantly elevated at 1.57× the desirable upper limit. LDL is the primary driver of atherosclerotic plaque. Guidelines recommend aggressive reduction, particularly given the elevated total cholesterol and TC/HDL ratio.",
  },
  {
    name: "Total Cholesterol",
    value: 5.8,
    unit: "mmol/L",
    referenceRange: { low: 0, high: 5.2 },
    status: "high",
    category: "cardiovascular",
    explanation:
      "Above the desirable threshold. Combined with high LDL and non-HDL cholesterol, this indicates a lipid profile that warrants active management to reduce cardiovascular risk.",
  },
  {
    name: "Non-HDL Cholesterol",
    value: 4.69,
    unit: "mmol/L",
    referenceRange: { low: 0, high: 3.37 },
    status: "high",
    category: "cardiovascular",
    explanation:
      "Non-HDL captures all atherogenic lipoproteins (LDL + VLDL). At 4.69, this is 1.39× the upper limit and a strong independent predictor of cardiovascular events.",
  },
  {
    name: "TC/HDL Ratio",
    value: 5.2,
    unit: "",
    referenceRange: { low: 0, high: 5.0 },
    status: "high",
    category: "cardiovascular",
    explanation:
      "Just above the desirable threshold. This ratio reflects the balance between total and protective cholesterol — improving HDL or lowering LDL will bring this into range.",
  },
  {
    name: "HDL Cholesterol",
    value: 1.11,
    unit: "mmol/L",
    referenceRange: { low: 1.03, high: 2.0 },
    status: "normal",
    category: "cardiovascular",
    explanation:
      "Above the minimum threshold but could be higher for optimal cardiovascular protection. Regular exercise and omega-3 intake can help raise HDL levels.",
  },
  {
    name: "Triglyceride",
    value: 1.41,
    unit: "mmol/L",
    referenceRange: { low: 0, high: 1.68 },
    status: "normal",
    category: "cardiovascular",
    explanation:
      "Within normal limits. This is a positive finding — elevated triglycerides would compound the LDL-driven cardiovascular risk. Maintain through balanced diet and regular activity.",
  },
  {
    name: "Red Blood Cells",
    value: 4.55,
    unit: "×10¹²/L",
    referenceRange: { low: 4.60, high: 6.10 },
    status: "low",
    category: "overall",
    explanation:
      "Marginally below the reference range. Haemoglobin remains normal at 145 g/L, so oxygen-carrying capacity is preserved. Worth monitoring on repeat testing but not clinically concerning in isolation.",
  },
  {
    name: "Haemoglobin",
    value: 145,
    unit: "g/L",
    referenceRange: { low: 130, high: 170 },
    status: "normal",
    category: "overall",
    explanation:
      "Well within the healthy range for males. Confirms adequate iron stores and red cell function despite the marginally low RBC count.",
  },
  {
    name: "White Blood Cells",
    value: 7.3,
    unit: "×10⁹/L",
    referenceRange: { low: 4.0, high: 10.0 },
    status: "normal",
    category: "overall",
    explanation:
      "Normal white cell count indicating a healthy immune system with no signs of infection, inflammation, or immune compromise.",
  },
  {
    name: "Platelets",
    value: 287,
    unit: "×10⁹/L",
    referenceRange: { low: 150, high: 410 },
    status: "normal",
    category: "overall",
    explanation:
      "Healthy platelet count. No concerns regarding bleeding risk or clotting tendency.",
  },
  {
    name: "eGFR",
    value: 101,
    unit: "mL/min/1.73m²",
    referenceRange: { low: 90, high: 120 },
    status: "normal",
    category: "renal",
    explanation:
      "Excellent kidney filtration rate, well above the normal threshold of 90. Your kidneys are functioning optimally — an important positive finding for overall metabolic health.",
  },
  {
    name: "Creatinine",
    value: 82,
    unit: "µmol/L",
    referenceRange: { low: 50, high: 116 },
    status: "normal",
    category: "renal",
    explanation:
      "Within normal range, consistent with the healthy eGFR. Confirms normal kidney clearance with no signs of renal impairment.",
  },
  {
    name: "Uric Acid",
    value: 0.48,
    unit: "mmol/L",
    referenceRange: { low: 0.18, high: 0.47 },
    status: "high",
    category: "renal",
    explanation:
      "Borderline elevated — just 0.01 above the upper limit. Mildly raised uric acid can be associated with cardiovascular risk and gout susceptibility. Dietary modification (reducing purine-rich foods) is recommended.",
  },
  {
    name: "ALT",
    value: 41,
    unit: "U/L",
    referenceRange: { low: 0, high: 51 },
    status: "normal",
    category: "metabolic",
    explanation:
      "Within normal range, confirming healthy liver function. All other liver markers (AST 23, GGT 37, ALP 51, Bilirubin 16) are also normal — your liver is well-equipped to support lipid metabolism and detoxification.",
  },
  {
    name: "Fasting Glucose",
    value: 5.4,
    unit: "mmol/L",
    referenceRange: { low: 3.9, high: 6.0 },
    status: "normal",
    category: "metabolic",
    explanation:
      "Well within the normal fasting range, with no indication of prediabetes or impaired glucose tolerance. Metabolic glucose regulation is healthy.",
  },
  {
    name: "ESR",
    value: 6,
    unit: "mm/h",
    referenceRange: { low: 0, high: 21 },
    status: "normal",
    category: "overall",
    explanation:
      "Low ESR indicates no significant systemic inflammation. This is reassuring — chronic inflammation can accelerate atherosclerosis, so a low baseline is protective.",
  },
];

export const MOCK_SCORE_LABEL = "Fair" as const;

export const MOCK_KEY_TAKEAWAYS: KeyTakeaway[] = [
  {
    category: "cardiovascular",
    title: "Cardiovascular Risk — Elevated",
    description: "LDL at 4.04 mmol/L is 1.57× the upper limit. Combined with elevated total cholesterol (5.8) and non-HDL cholesterol (4.69), your lipid profile indicates significant cardiovascular risk requiring active management.",
    status: "needs-attention",
    icon: "heart",
  },
  {
    category: "renal",
    title: "Uric Acid — Borderline High",
    description: "Uric acid at 0.48 is just above the upper limit (0.47). Kidney function itself is excellent with eGFR at 101. Reducing purine-rich foods and staying well-hydrated can help normalise uric acid.",
    status: "borderline",
    icon: "zap",
  },
  {
    category: "nutritional",
    title: "Red Blood Cells — Slightly Low",
    description: "RBC count of 4.55 is marginally below the reference range (4.60–6.10). Haemoglobin remains normal at 145 g/L, so this is a monitoring point rather than an immediate concern.",
    status: "borderline",
    icon: "droplet",
  },
  {
    category: "overall",
    title: "Overall Health — Strong Foundation",
    description: "Kidney function (eGFR 101), liver enzymes, fasting glucose (5.4), electrolytes, and inflammatory markers are all within normal ranges. This is an excellent foundation for targeted lipid intervention.",
    status: "good",
    icon: "shield",
  },
];

export const MOCK_TOP_RECOMMENDATION =
  "Begin a cardiovascular wellness programme focused on lowering LDL cholesterol from 4.04 to below 2.58 mmol/L. IV-based lipid support therapies combined with targeted nutraceuticals can accelerate results alongside lifestyle modifications. Your strong kidney and liver function means your body is well-equipped to respond to treatment.";

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
    recommended: true,
  },
];

const VITAL_RECOMMENDATIONS: Record<string, { productId: string; reason: string }[]> = {
  "anti-aging": [
    { productId: "nad-iv-drip", reason: "NAD+ supports endothelial function and vascular repair — important when your TC/HDL ratio is elevated at 5.2, indicating arterial stress that also affects skin and cellular ageing." },
    { productId: "whitening-antioxidant-anti-aging-iv-drip", reason: "High-dose glutathione IV to counteract the oxidative stress that elevated LDL cholesterol (4.04 mmol/L) places on your vascular system, while supporting skin health and radiance." },
    { productId: "crystal-tomato-plus-supplements", reason: "Daily oral antioxidant for ongoing free-radical defence between IV sessions — supports skin clarity while providing systemic antioxidant protection against lipid oxidation." },
  ],
  "health-check": [
    { productId: "multi-vitamin-replenish-iv-drip", reason: "Comprehensive micronutrient IV to optimise the metabolic pathways involved in cholesterol processing. Your strong liver and kidney function (eGFR 101) means excellent IV absorption and clearance." },
    { productId: "bone-booster-im-vitamin-d3-support", reason: "Vitamin D plays a role in cardiovascular health beyond bone metabolism. IM injection ensures reliable D3 levels, which research links to improved lipid profiles and arterial function." },
    { productId: "vitamin-d-jab", reason: "Maintenance D3 to support cardiovascular and immune function. Vitamin D deficiency is associated with higher LDL levels — optimising D3 status complements your lipid management plan." },
    { productId: "magnesium-bisglycinate-750mg-60-capsules-150mg-elemental", reason: "Magnesium supports over 300 enzyme reactions including cholesterol metabolism. Glycinate form offers excellent absorption and also helps manage the borderline uric acid (0.48 mmol/L)." },
  ],
  "supplements": [
    { productId: "live-conscious-omegawell-omega-3-fish-oil", reason: "Your LDL is 4.04 and total cholesterol is 5.8 — omega-3s are clinically proven to lower triglycerides, raise HDL (yours is borderline at 1.11), and reduce cardiovascular inflammation." },
    { productId: "magnesium-bisglycinate-750mg-60-capsules-150mg-elemental", reason: "Glycinate form for best absorption. Supports cholesterol metabolism, blood pressure regulation, and may help with your borderline uric acid (0.48 mmol/L)." },
    { productId: "thera-c-advanced-curcumin-complex", reason: "Curcumin reduces systemic inflammation and has been shown to improve endothelial function — directly relevant when LDL is elevated at 4.04 mmol/L and driving vascular oxidative stress." },
    { productId: "theragut-precision-prebiotic-probiotic-supplement", reason: "Emerging research links gut microbiome health to cholesterol metabolism. A balanced gut flora improves bile acid processing, which is the body's primary mechanism for clearing excess cholesterol." },
    { productId: "vitamin-d-jab", reason: "Optimal vitamin D levels support cardiovascular health and are associated with improved lipid profiles. Your otherwise excellent organ function (eGFR 101, ALT 41) means you'll respond well to supplementation." },
  ],
  "mind-mood": [
    { productId: "magnesium-bisglycinate-750mg-60-capsules-150mg-elemental", reason: "Managing cardiovascular risk can be stressful. Magnesium glycinate calms the nervous system, improves sleep quality, and supports the metabolic pathways involved in cholesterol processing." },
    { productId: "brain-booster-iv-drip-ginkgo-support", reason: "Ginkgo biloba improves cerebral and peripheral blood flow — particularly beneficial when LDL-driven lipid deposits may affect vascular flexibility. Also supports mental clarity and focus." },
    { productId: "snooze-d-stress-iv-drip", reason: "Quality sleep is essential for lipid metabolism — poor sleep increases LDL and total cholesterol. This blend of magnesium, B-vitamins, and calming amino acids supports restorative rest." },
  ],
  "pain-recovery": [
    { productId: "nad-iv-drip", reason: "NAD+ directly fuels cellular repair enzymes and supports vascular endothelial recovery. Particularly relevant when elevated LDL (4.04) may be causing subclinical arterial inflammation." },
    { productId: "immune-booster-iv-drip-germany", reason: "German-formulated high-dose vitamin C + zinc IV supports immune-mediated tissue repair and provides antioxidant protection against LDL-driven oxidative damage to blood vessels." },
    { productId: "whitening-antioxidant-anti-aging-iv-drip", reason: "Glutathione reduces oxidative damage from chronic dyslipidaemia. With your strong liver function (ALT 41, AST 23), your body can effectively utilise this master antioxidant for vascular recovery." },
  ],
  "regen": [
    { productId: "nad-iv-drip", reason: "NAD+ is foundational for cellular regeneration — supports mitochondrial function and DNA repair, addressing the vascular stress caused by sustained elevated LDL at 4.04 mmol/L." },
    { productId: "cell-renewal-iv-drip", reason: "Targeted amino acids and growth factors to accelerate cellular turnover — supports vascular endothelial renewal, which is critical when lipid levels are driving arterial wall stress." },
    { productId: "vitality-enhancer-iv-drip", reason: "Full-spectrum IV with B12, minerals, and trace elements — supports overall energy and metabolic function while your body works to normalise cholesterol levels." },
    { productId: "whitening-antioxidant-anti-aging-iv-drip", reason: "Glutathione IV to clear the oxidative load from chronic dyslipidaemia. Your excellent liver function (ALT 41, GGT 37) means strong glutathione recycling capacity." },
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
    date: "2026-05-02",
    time: "10:00 AM",
    practitioner: "Dr. Sarah Lim",
    specialty: "IV Therapy Specialist",
    available: true,
  },
  {
    id: "s2",
    date: "2026-05-02",
    time: "2:30 PM",
    practitioner: "Dr. Ahmad Razak",
    specialty: "Functional Medicine",
    available: true,
  },
  {
    id: "s3",
    date: "2026-05-03",
    time: "9:00 AM",
    practitioner: "Dr. Sarah Lim",
    specialty: "IV Therapy Specialist",
    available: true,
  },
  {
    id: "s4",
    date: "2026-05-03",
    time: "11:30 AM",
    practitioner: "Dr. Mei Chen",
    specialty: "Nutritional Medicine",
    available: true,
  },
  {
    id: "s5",
    date: "2026-05-05",
    time: "10:00 AM",
    practitioner: "Dr. Ahmad Razak",
    specialty: "Functional Medicine",
    available: false,
  },
  {
    id: "s6",
    date: "2026-05-05",
    time: "3:00 PM",
    practitioner: "Dr. Mei Chen",
    specialty: "Nutritional Medicine",
    available: true,
  },
];

export const MOCK_NURSE_SLOTS: BookingSlot[] = [
  {
    id: "ns1",
    date: "2026-05-02",
    time: "9:00 AM",
    practitioner: "Nurse Aisha Rahman",
    specialty: "IV Therapy & Wellness",
    available: true,
  },
  {
    id: "ns2",
    date: "2026-05-02",
    time: "1:00 PM",
    practitioner: "Nurse Priya Nair",
    specialty: "Home Care & Injections",
    available: true,
  },
  {
    id: "ns3",
    date: "2026-05-03",
    time: "10:00 AM",
    practitioner: "Nurse Aisha Rahman",
    specialty: "IV Therapy & Wellness",
    available: true,
  },
  {
    id: "ns4",
    date: "2026-05-03",
    time: "3:00 PM",
    practitioner: "Nurse Priya Nair",
    specialty: "Home Care & Injections",
    available: false,
  },
  {
    id: "ns5",
    date: "2026-05-05",
    time: "11:00 AM",
    practitioner: "Nurse Aisha Rahman",
    specialty: "IV Therapy & Wellness",
    available: true,
  },
];

export const MOCK_DOCTOR_SLOTS: BookingSlot[] = [
  {
    id: "ds1",
    date: "2026-05-02",
    time: "10:00 AM",
    practitioner: "Dr. Sarah Lim",
    specialty: "Functional Medicine",
    available: true,
  },
  {
    id: "ds2",
    date: "2026-05-02",
    time: "3:00 PM",
    practitioner: "Dr. Ahmad Razak",
    specialty: "General Practitioner",
    available: true,
  },
  {
    id: "ds3",
    date: "2026-05-03",
    time: "9:30 AM",
    practitioner: "Dr. Sarah Lim",
    specialty: "Functional Medicine",
    available: true,
  },
  {
    id: "ds4",
    date: "2026-05-03",
    time: "2:00 PM",
    practitioner: "Dr. Mei Chen",
    specialty: "Nutritional Medicine",
    available: true,
  },
  {
    id: "ds5",
    date: "2026-05-05",
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

export const MOCK_RECOVERY_PHASES: RecoveryPlanPhase[] = [
  {
    phaseNumber: 1,
    title: "Cardiovascular Reset",
    weekRange: "Weeks 1–4",
    goal: "Lower LDL cholesterol aggressively through IV lipid support, anti-inflammatory therapy, and foundational supplementation. Establish a heart-healthy baseline.",
    treatments: [
      {
        productId: "cardiovascular-health-iv-drip",
        name: "Cardiovascular Health IV Drip",
        frequency: "2× / Week",
        bullets: [
          "Targeted lipid-lowering micronutrients via IV",
          "Supports LDL reduction from 4.04 toward < 2.58",
          "Enhances vascular endothelial function",
        ],
      },
      {
        productId: "inflamrelief-iv-drip",
        name: "InflamRelief IV Drip",
        frequency: "Weekly",
        bullets: [
          "Glutathione + Vitamin C + ALA + Magnesium",
          "Protects arterial walls during active lipid management",
          "Reduces oxidative stress from dyslipidaemia",
        ],
      },
      {
        name: "Baseline Lipid & Inflammatory Panel",
        frequency: "Once at Week 4",
        bullets: [
          "Recheck LDL, Total Cholesterol, Non-HDL, TC/HDL ratio",
          "Track inflammatory markers (hsCRP)",
          "Measure early response to treatment protocol",
        ],
      },
    ],
    expectedBenefits: [
      { label: "Improved energy & circulation", timeline: "Week 1–2" },
      { label: "Reduced oxidative stress markers", timeline: "Week 2–3" },
      { label: "Measurable LDL reduction", timeline: "Week 4" },
    ],
    supplementStack: {
      morning: [
        { name: "Omega-3 Fish Oil (High EPA)", dosage: "2,000 mg" },
        { name: "Berberine", dosage: "500 mg" },
        { name: "Vitamin D3 + K2", dosage: "5,000 IU" },
        { name: "Citrus Bergamot", dosage: "500 mg" },
      ],
      night: [
        { name: "Magnesium Glycinate", dosage: "400 mg" },
        { name: "CoQ10", dosage: "200 mg" },
        { name: "Curcumin Phytosome", dosage: "500 mg" },
      ],
    },
    lifestyleGuidance: [
      "Adopt a heart-healthy Mediterranean-style diet",
      "Reduce saturated fat, trans fat, and processed foods",
      "Increase soluble fibre (oats, legumes, fruits) to 10–25g daily",
      "30 min moderate cardio 5 days/week (walking, cycling, swimming)",
      "Hydrate: 2.5–3L water daily to support uric acid clearance",
    ],
    monitoring: [
      "Weekly vitals check-in via app",
      "Food and exercise journal",
      "Lipid panel + hsCRP at Week 4",
    ],
  },
  {
    phaseNumber: 2,
    title: "Vascular Repair & Optimisation",
    weekRange: "Weeks 5–12",
    goal: "Deepen cellular repair with NAD+ and regenerative therapies. Sustain lipid improvements while addressing vascular endothelial damage from chronic dyslipidaemia.",
    treatments: [
      {
        productId: "nad-iv-therapy",
        name: "NAD+ IV Infusion",
        frequency: "Weekly",
        bullets: [
          "Restores endothelial function at the cellular level",
          "Supports mitochondrial energy for cardiovascular repair",
          "Enhances DNA repair mechanisms",
        ],
      },
      {
        productId: "cardiovascular-health-iv-drip",
        name: "Cardiovascular Health IV Drip",
        frequency: "Weekly",
        bullets: [
          "Maintenance dose to sustain Phase 1 lipid improvements",
          "Continued micronutrient support for cholesterol metabolism",
          "Ongoing vascular protection",
        ],
      },
      {
        name: "Advanced Lipid & Metabolic Panel",
        frequency: "Week 10–12",
        bullets: [
          "Full lipid profile including ApoB and Lp(a)",
          "hsCRP, fasting insulin, uric acid recheck",
          "Track progress and adjust protocol",
        ],
      },
    ],
    expectedBenefits: [
      { label: "Sustained energy throughout day", timeline: "Week 6–7" },
      { label: "Improved vascular flexibility", timeline: "Week 8–10" },
      { label: "Target: LDL below 3.0 mmol/L", timeline: "Week 10–12" },
    ],
    supplementStack: {
      morning: [
        { name: "Berberine", dosage: "500 mg" },
        { name: "CoQ10", dosage: "200 mg" },
        { name: "Omega-3 (High EPA)", dosage: "2,000 mg" },
        { name: "Citrus Bergamot", dosage: "500 mg" },
        { name: "Vitamin D3 + K2", dosage: "5,000 IU" },
      ],
      night: [
        { name: "Magnesium Glycinate", dosage: "400 mg" },
        { name: "Aged Garlic Extract", dosage: "600 mg" },
        { name: "Curcumin Phytosome", dosage: "500 mg" },
        { name: "NAC (N-Acetyl Cysteine)", dosage: "600 mg" },
        { name: "Nattokinase", dosage: "2,000 FU" },
      ],
    },
    lifestyleGuidance: [
      "Continue heart-healthy Mediterranean diet",
      "Increase exercise to 150 min/week cardio + 2× strength training",
      "Reduce refined carbs, sugar, and deep-fried foods",
      "Increase vegetables, fibre, omega-3 rich fish (salmon, mackerel)",
      "7–8 hours quality sleep nightly",
      "Manage stress through mindfulness or meditation",
    ],
    monitoring: [
      "Full lipid panel + ApoB at Week 10–12",
      "Uric acid recheck (target < 0.47 mmol/L)",
      "Adjust protocol based on progress",
    ],
  },
  {
    phaseNumber: 3,
    title: "Maintenance & Cardiovascular Longevity",
    weekRange: "Weeks 13–24",
    goal: "Consolidate lipid improvements with regenerative therapies and quarterly monitoring. Target: LDL below 2.58, TC/HDL ratio below 5.0, maintain all other panels in normal range.",
    treatments: [
      {
        productId: "nad-iv-therapy",
        name: "NAD+ IV Infusion",
        frequency: "Biweekly",
        bullets: [
          "Sustained NAD+ levels for ongoing vascular health",
          "Long-term cellular energy and DNA repair support",
          "Supports cardiovascular longevity",
        ],
      },
      {
        productId: "exosomes-therapy",
        name: "Exosome Therapy",
        frequency: "Monthly",
        bullets: [
          "Deep cellular regeneration for vascular tissue",
          "Long-term inflammation modulation",
          "Supports endothelial repair and immune balance",
        ],
      },
      {
        name: "Comprehensive Cardiovascular Panel",
        frequency: "Quarterly",
        bullets: [
          "Full lipid profile, ApoB, Lp(a), hsCRP",
          "Uric acid, liver and kidney function recheck",
          "Measure long-term cardiovascular risk reduction",
        ],
      },
    ],
    expectedBenefits: [
      { label: "LDL target achieved (< 2.58)", timeline: "Month 4–5" },
      { label: "Normalised TC/HDL ratio", timeline: "Month 5–6" },
      { label: "Sustained cardiovascular protection", timeline: "Month 6+" },
    ],
    supplementStack: {
      morning: [
        { name: "Omega-3 Fish Oil", dosage: "2,000 mg" },
        { name: "CoQ10", dosage: "200 mg" },
        { name: "Vitamin D3 + K2", dosage: "5,000 IU" },
        { name: "Citrus Bergamot", dosage: "500 mg" },
      ],
      night: [
        { name: "Magnesium Glycinate", dosage: "400 mg" },
        { name: "Aged Garlic Extract", dosage: "600 mg" },
        { name: "Nattokinase", dosage: "2,000 FU" },
      ],
    },
    lifestyleGuidance: [
      "Maintain Mediterranean diet as long-term lifestyle",
      "Continue 150+ min/week exercise with Zone 2 cardio focus",
      "Annual advanced cardiovascular screening",
      "Quarterly Vital AI lipid reassessment",
      "Maintain hydration for uric acid management",
    ],
    monitoring: [
      "Monthly Vital AI progress review",
      "Quarterly comprehensive lipid panel",
      "Annual cardiovascular risk assessment",
    ],
  },
];

export const MOCK_RECOVERY_CLOSING =
  "Your blood work reveals a clear and actionable path forward. With excellent kidney function (eGFR 101), healthy liver enzymes, and normal glucose levels, your body has an outstanding foundation for responding to targeted lipid therapy. Most patients with your profile see meaningful LDL reduction within the first 8 weeks. Your future cardiovascular health starts today.";
