import type { Product } from "@/lib/data";
import { getProductsByCategory } from "@/lib/products";

export type MockReview = {
  name: string;
  date: string;
  rating: number;
  text: string;
  verified: boolean;
};

export type PackageOption = {
  label: string;
  meta: string;
  price: string;
  was?: string;
};

export type ProductSpec = { label: string; value: string };

export type SupplementFactRow = {
  nutrient: string;
  amount: string;
  dailyValue: string;
};

export type ProductSpecification = { text: string; checked?: boolean };

export type ProductInformation = {
  overviewBullets: string[];
  overviewText: string;
  supplementFacts?: {
    servingSize: string;
    servingsPerContainer: string;
    rows: SupplementFactRow[];
  };
  treatmentFacts?: {
    sessionType: string;
    duration: string;
    consultation: string;
    rows: { label: string; value: string }[];
  };
  specifications: ProductSpecification[];
  suggestedUse: string;
  otherIngredients: string;
  warnings: string[];
  disclaimer: string;
  manufacturerUrl: string;
};

export type ProductDetail = {
  description: string;
  highlights: string[];
  suggestedUse: string;
  ingredients: string[];
  warnings: string[];
  reviews: MockReview[];
  avgRating: number;
  ratingBreakdown: number[];
  frequentlyBoughtWith: Product[];
  similarItems: Product[];
  aiSummary: string;
  specs: ProductSpec[];
  certifications: string[];
  categoryRanks: string[];
  soldLast30Days: string;
  packageOptions: PackageOption[];
  productInformation: ProductInformation;
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function pickN<T>(arr: T[], n: number, rand: () => number): T[] {
  const shuffled = [...arr].sort(() => rand() - 0.5);
  return shuffled.slice(0, n);
}

const REVIEW_NAMES = [
  "Sarah L.", "James K.", "Aisha M.", "Wei Lin T.", "Priya R.",
  "Marcus D.", "Fatimah H.", "Daniel C.", "Nurul A.", "Ryan P.",
  "Mei Ling W.", "Ahmad S.", "Jessica T.", "Kumar V.", "Siti N.",
  "David L.", "Farah Z.", "Benjamin G.", "Ananya K.", "Hafiz M.",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function generateDescription(p: Product): string {
  if (p.type === "bookable") {
    const descs: Record<string, string> = {
      "Anti Aging & Aesthetics": `${p.name} is a physician-led aesthetic treatment designed to target visible signs of ageing with clinical precision. Performed at ${p.provider} in ${p.location}, this procedure uses advanced technology to stimulate collagen production and restore skin elasticity. Each session is tailored to your skin profile for optimal results.`,
      "Health Check & Body Insights": `${p.name} provides a comprehensive diagnostic assessment at ${p.provider}. Our clinical team in ${p.location} uses lab-grade equipment to deliver actionable health insights. Results are reviewed by a licensed physician and returned within 48 hours.`,
      "Mind & Mood Balance": `${p.name} is a guided therapeutic session at ${p.provider} in ${p.location}. Our certified practitioners create a personalised protocol targeting stress, sleep quality, and cognitive clarity. Each session builds on the last for cumulative benefit.`,
      "Pain Relief & Body Recovery": `${p.name} at ${p.provider} in ${p.location} uses evidence-based modalities to accelerate recovery and reduce chronic pain. Our therapists assess your condition and apply targeted interventions for lasting relief.`,
      "Regen & Functional Care": `${p.name} is a regenerative medicine protocol offered at ${p.provider} in ${p.location}. Using cutting-edge biologics and precision medicine, this treatment targets cellular repair and functional optimisation under physician supervision.`,
    };
    return descs[p.category ?? ""] ?? `${p.name} is a premium treatment available at ${p.provider} in ${p.location}. Administered by certified practitioners with a focus on safety and efficacy.`;
  }

  const descs: Record<string, string> = {
    "Health Product & Supplements": `${p.name} is a physician-formulated supplement manufactured under GMP-certified conditions. Each batch is third-party tested for purity and potency. Designed to support daily wellness with clinically studied ingredients at therapeutic doses.`,
    "Anti Aging & Aesthetics": `${p.name} is a dermatologist-grade skincare product formulated with active ingredients at clinical concentrations. Suitable for daily use as part of a comprehensive anti-ageing protocol. Paraben-free and dermatologically tested.`,
    "Pain Relief & Body Recovery": `${p.name} is a recovery-focused product designed to complement clinical treatments. Formulated with bioavailable ingredients that support the body's natural repair processes.`,
  };
  return descs[p.category ?? ""] ?? `${p.name} from ${p.provider} is a premium health product. Formulated with quality ingredients and manufactured to pharmaceutical standards.`;
}

function generateHighlights(p: Product, rand: () => number): string[] {
  const common = ["Third-party tested for purity", "GMP-certified manufacturing"];
  if (p.type === "bookable") {
    const pool = [
      "Performed by licensed practitioners",
      "Personalised treatment protocol",
      "Non-invasive with minimal downtime",
      "Results visible within 2-4 weeks",
      "Complimentary consultation included",
      "Post-treatment care kit provided",
      "FDA-cleared technology",
    ];
    return pickN(pool, 4, rand);
  }
  const pool = [
    ...common,
    "Clinically studied ingredients",
    "No artificial colours or flavours",
    "Free from major allergens",
    "Suitable for daily use",
    "Pharmaceutical-grade purity",
    "Sustainably sourced",
  ];
  return pickN(pool, 4, rand);
}

function generateSuggestedUse(p: Product): string {
  if (p.type === "bookable") {
    return `Book your ${p.duration ?? "60 min"} session at ${p.provider}, ${p.location}. Arrive 10 minutes early for consultation. A course of 3-6 sessions is recommended for optimal results, spaced 2-4 weeks apart. Your practitioner will advise on the best protocol for your needs.`;
  }
  return "Take as directed by your healthcare provider. Typically 1-2 capsules daily with food, or as indicated on the label. Store in a cool, dry place away from direct sunlight. Do not exceed the recommended dose.";
}

function generateIngredients(p: Product, rand: () => number): string[] {
  if (p.type === "bookable") return [];

  const pools: Record<string, string[]> = {
    "Health Product & Supplements": [
      "Vitamin D3 (Cholecalciferol) 2000 IU", "Vitamin C (Ascorbic Acid) 500mg",
      "Zinc (as Zinc Picolinate) 25mg", "Magnesium (as Magnesium Glycinate) 200mg",
      "Omega-3 Fish Oil 1000mg", "CoQ10 (Ubiquinol) 100mg",
      "Turmeric Extract (95% Curcuminoids) 500mg", "Probiotics (10 Billion CFU)",
      "B-Complex (Methylated Forms)", "Iron (as Ferrous Bisglycinate) 18mg",
      "Selenium (as L-Selenomethionine) 200mcg", "Ashwagandha Extract (KSM-66) 600mg",
    ],
    "Anti Aging & Aesthetics": [
      "Retinol 0.5%", "Hyaluronic Acid (Multi-Weight) 2%",
      "Niacinamide 10%", "Vitamin C (L-Ascorbic Acid) 15%",
      "Peptide Complex (Matrixyl 3000)", "Ceramide NP 1%",
      "Squalane (Plant-Derived)", "Azelaic Acid 10%",
      "Alpha Arbutin 2%", "Bakuchiol 1%",
    ],
  };

  const pool = pools[p.category ?? ""] ?? pools["Health Product & Supplements"];
  const base = pickN(pool, 5 + Math.floor(rand() * 4), rand);
  base.push("Vegetable Cellulose Capsule", "Rice Flour", "Silicon Dioxide");
  return base;
}

function generateAiSummary(p: Product): string {
  if (p.type === "bookable") {
    return `${p.name} is a clinician-supervised treatment at ${p.provider}. Sessions are tailored to your goals with structured aftercare and follow-up guidance included.`;
  }
  return `${p.name} is formulated for daily wellness support with clinically studied actives. Designed for consistent use as part of a broader health protocol recommended by your practitioner.`;
}

function generateSpecs(p: Product, rand: () => number): ProductSpec[] {
  const months = ["Jun 2027", "Aug 2027", "Oct 2027", "Dec 2027"];
  if (p.type === "bookable") {
    return [
      { label: "Session length", value: p.duration ?? "60 min" },
      { label: "Clinic location", value: p.location },
      { label: "Consultation", value: "Included" },
      { label: "Recovery window", value: pick(["Same day", "24–48 hrs", "3–5 days"], rand) },
    ];
  }
  return [
    { label: "Portion size", value: p.size ?? "1 serving" },
    { label: "Total servings", value: pick(["30", "60", "90", "120"], rand) },
    { label: "Best before", value: pick(months, rand) },
    { label: "Country of origin", value: pick(["USA", "Australia", "Malaysia", "Switzerland"], rand) },
  ];
}

function generateCertifications(p: Product, rand: () => number): string[] {
  if (p.type === "bookable") {
    return pickN(
      ["Licensed clinic", "Physician-led", "FDA-cleared devices", "Sterile protocol", "Post-care kit"],
      4,
      rand,
    );
  }
  return pickN(
    ["Vegetarian", "Vegan", "GMP certified", "Halal", "Non-GMO", "Gluten-free", "Third-party tested"],
    4,
    rand,
  );
}

function generateCategoryRanks(p: Product, rand: () => number): string[] {
  const cat = p.category ?? "Wellness";
  const ranks = [2, 3, 5, 8, 12];
  const n = 2 + Math.floor(rand() * 2);
  return pickN(ranks, n, rand).map((r) => `#${r} in ${cat}`);
}

function generateSoldCount(rand: () => number): string {
  const n = 1200 + Math.floor(rand() * 88000);
  return `${n.toLocaleString("en-MY")}+ sold in 30 days`;
}

function generatePackageOptions(p: Product, _rand: () => number): PackageOption[] {
  if (p.variations?.length) {
    return p.variations.map((v) => ({
      label: v.label,
      meta: v.meta,
      price: v.price,
      was: v.was,
    }));
  }

  const base = p.price ?? "RM 0";
  if (p.type === "bookable") {
    return [
      { label: "Single session", meta: p.duration ?? "60 min", price: base, was: p.was },
      {
        label: "3-session course",
        meta: "Save 12% · best value",
        price: base.replace(/\d+/, (m) => String(Math.round(Number(m) * 2.64))),
      },
    ];
  }

  return [
    { label: p.size ?? "1 unit", meta: "Standard pack", price: base, was: p.was },
    {
      label: "Twin pack",
      meta: "Save 8%",
      price: base.replace(/\d+/, (m) => String(Math.round(Number(m) * 1.84))),
    },
  ];
}

function generateProductInformation(
  p: Product,
  rand: () => number,
  highlights: string[],
  description: string,
  suggestedUse: string,
  ingredients: string[],
  warnings: string[],
): ProductInformation {
  const months = ["Jun 2027", "Aug 2027", "Oct 2027", "Dec 2027"];
  const bestBefore = pick(months, rand);
  const servings = pick(["30", "60", "90", "120"], rand);
  const code = p.id.slice(0, 8).toUpperCase();
  const upc = `${100000 + Math.floor(rand() * 899999)}${Math.floor(rand() * 10)}`;

  const specifications: ProductSpecification[] = [
    { text: "100% authentic — satisfaction guarantee", checked: true },
    { text: `Best before: ${bestBefore}` },
    { text: `Product code: RD-${code}` },
    { text: `UPC: ${upc}` },
    { text: `Package quantity: ${p.size ?? "1 unit"}` },
    { text: `Dimensions: ${pick(["6 × 6 × 12 cm", "5 × 5 × 10 cm", "8 × 4 × 14 cm"], rand)}` },
    { text: `Ships from: ${p.location}`, checked: true },
  ];

  if (p.type === "bookable") {
    return {
      overviewBullets: highlights,
      overviewText: description,
      treatmentFacts: {
        sessionType: p.category ?? "Treatment",
        duration: p.duration ?? "60 min",
        consultation: "Included",
        rows: [
          { label: "Provider", value: p.provider },
          { label: "Location", value: p.location },
          { label: "Consultation", value: "Pre-session assessment" },
          { label: "Aftercare", value: "Kit & follow-up guidance" },
        ],
      },
      specifications: specifications.filter((s) => !s.text.startsWith("UPC")),
      suggestedUse,
      otherIngredients:
        `This treatment is delivered at ${p.provider}, ${p.location}. Protocols follow physician-led standards with sterile technique and licensed practitioners.`,
      warnings,
      disclaimer:
        "Treatment outcomes vary by individual. ReserveDaily facilitates booking with independent licensed providers. This information is not medical advice — consult your physician before treatment.",
      manufacturerUrl: "https://reservedaily.ukaykhing.com",
    };
  }

  const primary = ingredients[0] ?? "Active ingredient";
  const amountMg = pick(["100 mg", "150 mg", "200 mg", "250 mg", "500 mg"], rand);
  const dv = pick(["38%", "42%", "48%", "50%", "67%"], rand);

  const otherList = ingredients.slice(1, 6).join(", ");
  const otherIngredients = `${otherList}. Manufactured in a GMP-certified facility. Contains no artificial colours or flavours. Store in a cool, dry place.`;

  return {
    overviewBullets: highlights,
    overviewText: description,
    supplementFacts: {
      servingSize: p.size ?? "1 capsule",
      servingsPerContainer: servings,
      rows: [
        { nutrient: primary, amount: amountMg, dailyValue: dv },
        ...ingredients.slice(1, 3).map((ing) => ({
          nutrient: ing.split("(")[0].trim(),
          amount: pick(["50 mg", "25 mg", "10 mg", "5 mg"], rand),
          dailyValue: pick(["—", "12%", "8%", "6%"], rand),
        })),
      ],
    },
    specifications,
    suggestedUse,
    otherIngredients,
    warnings,
    disclaimer:
      "While we strive to ensure product information is correct, manufacturers may alter ingredient lists or packaging. Actual product packaging and materials may contain additional or different information. Always read labels, warnings, and directions before use — not intended to diagnose, treat, cure, or prevent any disease.",
    manufacturerUrl: "https://reservedaily.ukaykhing.com",
  };
}

function generateWarnings(p: Product): string[] {
  if (p.type === "bookable") {
    return [
      "Not suitable for pregnant or breastfeeding individuals without physician clearance.",
      "Inform your practitioner of any medical conditions, medications, or implants before treatment.",
      "Mild redness or sensitivity may occur post-treatment. Follow aftercare instructions provided.",
      "Individual results may vary. Consult your physician if you have concerns.",
    ];
  }
  return [
    "Consult your healthcare provider before use if you are pregnant, nursing, or taking medication.",
    "Keep out of reach of children.",
    "Do not use if safety seal is broken or missing.",
    "Discontinue use and consult a physician if adverse reactions occur.",
    "This product is not intended to diagnose, treat, cure, or prevent any disease.",
  ];
}

function generateReviews(p: Product, rand: () => number): MockReview[] {
  const count = 8 + Math.floor(rand() * 5);
  const positiveTexts = [
    `Been using ${p.name} for 3 months now and the results speak for themselves. Genuinely impressed.`,
    `My practitioner recommended this and I'm glad I listened. Noticeable difference within weeks.`,
    "Excellent quality. You can tell this is properly formulated, not just marketing hype.",
    "This has become a staple in my routine. Consistent results every time.",
    `Worth every ringgit. ${p.provider} really delivers on quality.`,
    "I was sceptical at first but the results convinced me. Will definitely repurchase.",
    "Fast delivery, well-packaged, and the product itself is top-notch.",
    "My skin/health has noticeably improved since starting this. Highly recommend.",
    "Clean ingredients, no fillers. Exactly what I was looking for.",
    `Tried several alternatives before finding ${p.name}. This one actually works.`,
    "The quality is pharmaceutical grade. You can feel the difference.",
    "Recommended this to three friends already. They all love it too.",
  ];
  const neutralTexts = [
    "Decent product. Works as expected but nothing extraordinary.",
    "Good quality but a bit pricey. Would buy again on sale.",
    "Takes a while to see results but they do come eventually.",
  ];
  const negativeTexts = [
    "Not bad but didn't see the dramatic results I expected.",
  ];

  const reviews: MockReview[] = [];
  for (let i = 0; i < count; i++) {
    const r = rand();
    let rating: number;
    let text: string;
    if (r < 0.45) { rating = 5; text = pick(positiveTexts, rand); }
    else if (r < 0.75) { rating = 4; text = pick(positiveTexts, rand); }
    else if (r < 0.9) { rating = 3; text = pick(neutralTexts, rand); }
    else { rating = 2; text = pick(negativeTexts, rand); }

    const month = Math.floor(rand() * 12);
    const day = 1 + Math.floor(rand() * 28);
    const year = rand() > 0.5 ? 2026 : 2025;

    reviews.push({
      name: pick(REVIEW_NAMES, rand),
      date: `${MONTHS[month]} ${day}, ${year}`,
      rating,
      text,
      verified: rand() > 0.2,
    });
  }

  return reviews;
}

export function generateProductDetail(product: Product): ProductDetail {
  const seed = hash(product.id);
  const rand = seededRandom(seed);

  const reviews = generateReviews(product, rand);
  const totalRating = reviews.reduce((s, r) => s + r.rating, 0);
  const avgRating = Math.round((totalRating / reviews.length) * 10) / 10;

  const breakdown = [0, 0, 0, 0, 0];
  reviews.forEach((r) => { breakdown[r.rating - 1]++; });

  const categoryProducts = getProductsByCategory(product.category ?? "")
    .filter((p) => p.id !== product.id);
  const shuffled = [...categoryProducts].sort(() => rand() - 0.5);

  const description = generateDescription(product);
  const highlights = generateHighlights(product, rand);
  const suggestedUse = generateSuggestedUse(product);
  const ingredients = generateIngredients(product, rand);
  const warnings = generateWarnings(product);

  return {
    description,
    highlights,
    suggestedUse,
    ingredients,
    warnings,
    reviews,
    avgRating,
    ratingBreakdown: breakdown.reverse(),
    frequentlyBoughtWith: shuffled.slice(0, 6),
    similarItems: shuffled.slice(6, 14),
    aiSummary: generateAiSummary(product),
    specs: generateSpecs(product, rand),
    certifications: generateCertifications(product, rand),
    categoryRanks: generateCategoryRanks(product, rand),
    soldLast30Days: generateSoldCount(rand),
    packageOptions: generatePackageOptions(product, rand),
    productInformation: generateProductInformation(
      product,
      rand,
      highlights,
      description,
      suggestedUse,
      ingredients,
      warnings,
    ),
  };
}
