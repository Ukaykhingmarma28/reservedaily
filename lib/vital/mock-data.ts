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
  "Atherogenic dyslipidaemia with elevated LDL (4.04 mmol/L), total cholesterol (5.8), non-HDL cholesterol (4.69), and TC/HDL ratio (5.2) — placing you at intermediate-to-high 10-year cardiovascular risk. Renal, hepatic, glycaemic, haematological, and inflammatory markers are reassuringly normal. The primary recommendation is lifestyle modification with targeted nutraceutical support, with reassessment at 3 months.";

export const MOCK_BIOMARKERS: BiomarkerResult[] = [
  {
    name: "LDL Cholesterol",
    value: 4.04,
    unit: "mmol/L",
    referenceRange: { low: 0, high: 2.58 },
    status: "high",
    category: "cardiovascular",
    explanation:
      "At 4.04 mmol/L, this falls at the upper end of 'borderline high' per NCEP ATP III classification (3.36–4.11 mmol/L), functionally treated as high. For an intermediate-risk patient, the ESC/EAS target is < 2.6 mmol/L — you are 55% above goal. LDL is the primary driver of atherosclerotic plaque formation.",
  },
  {
    name: "Total Cholesterol",
    value: 5.8,
    unit: "mmol/L",
    referenceRange: { low: 0, high: 5.2 },
    status: "high",
    category: "cardiovascular",
    explanation:
      "Exceeds the desirable threshold of 5.2 mmol/L. Combined with elevated LDL and non-HDL cholesterol, this confirms an atherogenic lipid profile. The concordance of multiple elevated lipid markers increases cardiovascular risk beyond what any single marker indicates alone.",
  },
  {
    name: "Non-HDL Cholesterol",
    value: 4.69,
    unit: "mmol/L",
    referenceRange: { low: 0, high: 3.37 },
    status: "high",
    category: "cardiovascular",
    explanation:
      "Non-HDL captures all atherogenic lipoproteins (LDL + VLDL + IDL + remnant particles). A 2020 JAMA Cardiology meta-analysis found non-HDL is a stronger predictor of cardiovascular events than LDL alone. At 4.69, you are 39% above the recommended target of < 3.37 mmol/L.",
  },
  {
    name: "TC/HDL Ratio",
    value: 5.2,
    unit: "",
    referenceRange: { low: 0, high: 5.0 },
    status: "high",
    category: "cardiovascular",
    explanation:
      "The Castelli Risk Index at 5.2 places you in the 'moderate risk' tier for males (average risk is 4.4–5.0, moderate is 5.0–5.9). This ratio is an independent predictor of coronary artery disease per the Framingham Offspring Study. Reducing LDL or raising HDL will improve this ratio.",
  },
  {
    name: "HDL Cholesterol",
    value: 1.11,
    unit: "mmol/L",
    referenceRange: { low: 1.03, high: 2.0 },
    status: "normal",
    category: "cardiovascular",
    explanation:
      "Clears the minimum risk-factor threshold (1.03) but is suboptimal — the desirable range for cardiovascular protection is ≥ 1.55 mmol/L. In the context of elevated LDL, a higher HDL would provide better counterbalance against atherogenic burden. Regular exercise is the most effective lifestyle intervention for raising HDL.",
  },
  {
    name: "Triglyceride",
    value: 1.41,
    unit: "mmol/L",
    referenceRange: { low: 0, high: 1.68 },
    status: "normal",
    category: "cardiovascular",
    explanation:
      "Within normal limits — a positive finding. Your dyslipidaemia is LDL-dominant rather than mixed (triglyceride-driven), which is an important distinction for treatment strategy. Normal triglycerides indicate the atherogenic burden is primarily from LDL cholesterol particles.",
  },
  {
    name: "Red Blood Cells",
    value: 4.55,
    unit: "×10¹²/L",
    referenceRange: { low: 4.60, high: 6.10 },
    status: "low",
    category: "overall",
    explanation:
      "Marginally below the reference range by 1.1% — well within analytical and biological imprecision. Haemoglobin is normal at 145 g/L, confirming adequate oxygen-carrying capacity. This is clinically insignificant and requires no action or workup.",
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
      "Borderline elevated at 0.01 above the upper limit. A 2018 JAMA Internal Medicine meta-analysis linked hyperuricaemia to a 20% increased coronary heart disease risk, though Mendelian randomisation studies suggest it may be a marker rather than a cause. Reduce purine-rich foods, fructose, and alcohol; increase low-fat dairy and hydration.",
  },
  {
    name: "ALT",
    value: 41,
    unit: "U/L",
    referenceRange: { low: 0, high: 51 },
    status: "normal",
    category: "metabolic",
    explanation:
      "Within normal range. All liver markers are normal (AST 23, GGT 37, ALP 51, Bilirubin 16), confirming healthy hepatic function. This is relevant because the liver is the primary organ for cholesterol metabolism and clearance — healthy liver function supports both lifestyle and pharmacological lipid interventions.",
  },
  {
    name: "Fasting Glucose",
    value: 5.4,
    unit: "mmol/L",
    referenceRange: { low: 3.9, high: 6.0 },
    status: "normal",
    category: "metabolic",
    explanation:
      "Well within the normal fasting range (prediabetes threshold is 6.1 mmol/L per Malaysian CPG 2020). Healthy glucose metabolism means your dyslipidaemia is not insulin resistance–driven, which is a favourable prognostic indicator for treatment response.",
  },
  {
    name: "ESR",
    value: 6,
    unit: "mm/h",
    referenceRange: { low: 0, high: 21 },
    status: "normal",
    category: "overall",
    explanation:
      "Low ESR indicates no significant systemic inflammation. This is reassuring — chronic inflammation accelerates atherosclerosis and LDL oxidation. A low inflammatory baseline means your elevated LDL has not yet triggered a significant vascular inflammatory response.",
  },
];

export const MOCK_SCORE_LABEL = "Fair" as const;

export const MOCK_KEY_TAKEAWAYS: KeyTakeaway[] = [
  {
    category: "cardiovascular",
    title: "Lipid Panel — Intermediate-to-High Risk",
    description: "Four concordant lipid markers elevated: LDL 4.04 (borderline high per ATP III), total cholesterol 5.8, non-HDL 4.69, and TC/HDL ratio 5.2. This atherogenic lipid profile places you at intermediate-to-high 10-year cardiovascular risk. Lifestyle modification is first-line therapy.",
    status: "needs-attention",
    icon: "heart",
  },
  {
    category: "renal",
    title: "Uric Acid — Borderline Elevated",
    description: "Uric acid at 0.48 mmol/L is marginally above the upper limit (0.47). Associated with a modest increase in cardiovascular risk per meta-analysis data. Kidney function is excellent (eGFR 101). Dietary modification — reducing purine-rich foods, fructose, and alcohol — is recommended.",
    status: "borderline",
    icon: "zap",
  },
  {
    category: "metabolic",
    title: "Glucose & Liver — All Normal",
    description: "Fasting glucose 5.4 mmol/L (well below prediabetes threshold of 6.1). All liver enzymes within range (ALT 41, AST 23, GGT 37). Your dyslipidaemia is not driven by insulin resistance or hepatic dysfunction — a favourable indicator for treatment response.",
    status: "good",
    icon: "leaf",
  },
  {
    category: "overall",
    title: "Haematology & Inflammation — Reassuring",
    description: "Haemoglobin 145 g/L, WBC 7.3, platelets 287, ESR 6 — all well within range. Marginally low RBC (4.55 vs ref 4.60) is clinically insignificant given normal haemoglobin. No systemic inflammation detected, meaning elevated LDL has not yet triggered a vascular inflammatory cascade.",
    status: "good",
    icon: "shield",
  },
];

export const MOCK_TOP_RECOMMENDATION =
  "Lifestyle modification is first-line: adopt a Mediterranean or DASH-style diet, increase soluble fibre to 10–25 g/day, add plant sterols (2 g/day), and aim for 150+ minutes of moderate exercise weekly. Targeted nutraceuticals — berberine, omega-3, and citrus bergamot — have clinical evidence for LDL reduction. Reassess lipid panel at 3 months. Your excellent kidney and liver function supports strong treatment response.";

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
    title: "Lifestyle Foundation & Nutraceuticals",
    weekRange: "Weeks 1–4",
    goal: "Establish evidence-based dietary and supplement protocol as first-line therapy per ESC/EAS guidelines. IV micronutrient support to optimise metabolic pathways involved in cholesterol processing.",
    treatments: [
      {
        productId: "cardiovascular-health-iv-drip",
        name: "Cardiovascular Wellness IV",
        frequency: "2× / Week",
        bullets: [
          "Magnesium, B-complex, Vitamin C & taurine support",
          "Optimises metabolic pathways for cholesterol processing",
          "Supports vascular endothelial function",
        ],
      },
      {
        productId: "inflamrelief-iv-drip",
        name: "Antioxidant & Anti-Inflammatory IV",
        frequency: "Weekly",
        bullets: [
          "Glutathione + Vitamin C + ALA + Magnesium",
          "Antioxidant support against LDL oxidation",
          "Vascular wellness and recovery support",
        ],
      },
      {
        productId: "sea-buckthorn-omega-7-supplement-malaysia",
        name: "Cardiberry Omega-7 (Sea Buckthorn)",
        frequency: "Daily",
        bullets: [
          "Palmitoleic acid (omega-7) supports healthy lipid metabolism",
          "Anti-inflammatory properties reduce vascular oxidative stress",
          "Complements omega-3 for comprehensive fatty acid support",
        ],
      },
      {
        name: "Baseline Lipid & Inflammatory Panel",
        frequency: "Once at Week 4",
        bullets: [
          "Recheck LDL, Total Cholesterol, Non-HDL, TC/HDL ratio",
          "Add hsCRP and ApoB for refined risk stratification",
          "Measure early response to lifestyle + supplement protocol",
        ],
      },
    ],
    expectedBenefits: [
      { label: "Dietary adaptation established", timeline: "Week 1–2" },
      { label: "Berberine reaches steady-state levels", timeline: "Week 2–3" },
      { label: "First measurable lipid changes expected", timeline: "Week 4" },
    ],
    supplementStack: {
      morning: [
        { name: "Berberine", dosage: "500 mg (3× daily with meals)" },
        { name: "Plant Sterols / Stanols", dosage: "2 g/day (with food)" },
        { name: "Omega-3 EPA/DHA", dosage: "2,000 mg" },
        { name: "Cardiberry Omega-7", dosage: "1 capsule" },
        { name: "Psyllium Husk (soluble fibre)", dosage: "10 g" },
      ],
      night: [
        { name: "Citrus Bergamot", dosage: "500 mg" },
        { name: "Magnesium Glycinate", dosage: "400 mg" },
        { name: "CoQ10", dosage: "200 mg" },
      ],
    },
    lifestyleGuidance: [
      "Mediterranean or DASH-style diet — proven to lower LDL 10–15%",
      "Reduce saturated fat to < 7% of calories; eliminate trans fat",
      "Increase soluble fibre (oats, legumes, barley) to 10–25 g/day",
      "150 min/week moderate cardio (brisk walking, cycling, swimming)",
      "Hydrate 2.5–3L daily to support uric acid clearance (0.48 mmol/L)",
    ],
    monitoring: [
      "Weekly vitals check-in via app",
      "Food and exercise journal",
      "Full lipid panel + hsCRP + ApoB at Week 4",
    ],
  },
  {
    phaseNumber: 2,
    title: "Optimisation & Progress Assessment",
    weekRange: "Weeks 5–12",
    goal: "Intensify supplement protocol based on Week 4 results. Add cellular wellness support. Meta-analysis data suggests berberine alone can reduce LDL by ~0.65 mmol/L — combined with diet and plant sterols, a 1.0–1.5 mmol/L reduction is achievable.",
    treatments: [
      {
        productId: "nad-iv-therapy",
        name: "NAD+ Cellular Wellness Infusion",
        frequency: "Weekly",
        bullets: [
          "Supports mitochondrial function and cellular energy",
          "Preclinical evidence for vascular endothelial support",
          "Complements lifestyle and nutraceutical protocol",
        ],
      },
      {
        productId: "cardiovascular-health-iv-drip",
        name: "Cardiovascular Wellness IV",
        frequency: "Weekly",
        bullets: [
          "Maintenance micronutrient support",
          "Magnesium and B-vitamin replenishment",
          "Supports ongoing metabolic optimisation",
        ],
      },
      {
        name: "Advanced Lipid & Metabolic Panel",
        frequency: "Week 10–12",
        bullets: [
          "Full lipid profile including ApoB and Lp(a)",
          "hsCRP, fasting insulin, uric acid recheck",
          "Assess whether pharmacotherapy is needed if LDL > 2.6",
        ],
      },
    ],
    expectedBenefits: [
      { label: "Sustained energy and exercise capacity", timeline: "Week 6–7" },
      { label: "Improved lipid ratios on trend", timeline: "Week 8–10" },
      { label: "Target: LDL reduction of 1.0+ mmol/L from baseline", timeline: "Week 12" },
    ],
    supplementStack: {
      morning: [
        { name: "Berberine", dosage: "500 mg (3× daily with meals)" },
        { name: "Plant Sterols / Stanols", dosage: "2 g/day" },
        { name: "Omega-3 (High EPA)", dosage: "2,000 mg" },
        { name: "Psyllium Husk", dosage: "10 g" },
        { name: "Vitamin D3 + K2", dosage: "5,000 IU" },
      ],
      night: [
        { name: "Citrus Bergamot", dosage: "1,000 mg" },
        { name: "Magnesium Glycinate", dosage: "400 mg" },
        { name: "Aged Garlic Extract", dosage: "600 mg" },
        { name: "CoQ10", dosage: "200 mg" },
      ],
    },
    lifestyleGuidance: [
      "Continue Mediterranean / DASH diet as established habit",
      "Increase to 150+ min/week cardio + 2× strength training",
      "Increase omega-3 rich fish to 2–3 servings/week (salmon, mackerel)",
      "7–8 hours quality sleep — poor sleep increases LDL and cortisol",
      "Reduce purine-rich foods and alcohol for uric acid management",
    ],
    monitoring: [
      "Full lipid panel + ApoB + Lp(a) at Week 10–12",
      "Uric acid recheck (target ≤ 0.47 mmol/L)",
      "Clinical review: discuss pharmacotherapy if targets not met",
    ],
  },
  {
    phaseNumber: 3,
    title: "Maintenance & Long-Term Monitoring",
    weekRange: "Weeks 13–24",
    goal: "Sustain lifestyle changes and supplement protocol. Quarterly lipid monitoring. If LDL remains above 2.6 mmol/L at Week 12, discuss statin therapy with your physician per ESC/EAS guidelines for intermediate-risk patients.",
    treatments: [
      {
        productId: "nad-iv-therapy",
        name: "NAD+ Cellular Wellness Infusion",
        frequency: "Biweekly",
        bullets: [
          "Maintenance cellular energy support",
          "Supports long-term vascular wellness",
          "Complements ongoing lifestyle protocol",
        ],
      },
      {
        productId: "exosomes-therapy",
        name: "Regenerative Cellular Therapy",
        frequency: "Monthly",
        bullets: [
          "Advanced cellular regeneration support",
          "Immune modulation and tissue recovery",
          "Emerging longevity and wellness therapy",
        ],
      },
      {
        name: "Comprehensive Cardiovascular Panel",
        frequency: "Quarterly",
        bullets: [
          "Full lipid profile, ApoB, Lp(a), hsCRP",
          "Uric acid, liver and kidney function recheck",
          "Track long-term cardiovascular risk trajectory",
        ],
      },
    ],
    expectedBenefits: [
      { label: "Lipid targets on track or achieved", timeline: "Month 4–5" },
      { label: "Improved TC/HDL ratio (target < 5.0)", timeline: "Month 5–6" },
      { label: "Sustained cardiovascular risk reduction", timeline: "Month 6+" },
    ],
    supplementStack: {
      morning: [
        { name: "Plant Sterols / Stanols", dosage: "2 g/day" },
        { name: "Omega-3 Fish Oil", dosage: "2,000 mg" },
        { name: "Vitamin D3 + K2", dosage: "5,000 IU" },
        { name: "Psyllium Husk", dosage: "10 g" },
      ],
      night: [
        { name: "Citrus Bergamot", dosage: "500 mg" },
        { name: "Magnesium Glycinate", dosage: "400 mg" },
        { name: "Aged Garlic Extract", dosage: "600 mg" },
      ],
    },
    lifestyleGuidance: [
      "Mediterranean diet as permanent lifestyle — not a temporary intervention",
      "Maintain 150+ min/week moderate exercise as lifelong habit",
      "Annual advanced cardiovascular screening (consider CAC score)",
      "Quarterly Vital AI reassessment to track biomarker trends",
      "Continue hydration and low-purine diet for uric acid maintenance",
    ],
    monitoring: [
      "Quarterly comprehensive lipid panel",
      "Annual cardiovascular risk reassessment",
      "Discuss pharmacotherapy options at any point if targets not met",
    ],
  },
];

export const MOCK_RECOVERY_CLOSING =
  "Your blood work reveals a clear and actionable path forward. With excellent kidney function (eGFR 101), healthy liver enzymes, and normal glucose levels, your body has an outstanding foundation for responding to targeted lipid therapy. Most patients with your profile see meaningful LDL reduction within the first 8 weeks. Your future cardiovascular health starts today.";
