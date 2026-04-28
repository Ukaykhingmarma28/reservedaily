import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = "https://stg-reservedaily.ukaykhing.com/wp-json";
const DATA_PATH = resolve(__dirname, "../data/products.json");
const BATCH_SIZE = 50;

// --- WooCommerce Store API types ---

type WcPrice = {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: { min_amount: string; max_amount: string } | null;
  currency_minor_unit: number;
};

type WcCategory = { id: number; name: string; slug: string };

type WcStoreProduct = {
  id: number;
  name: string;
  slug: string;
  type: string;
  permalink: string;
  on_sale: boolean;
  prices: WcPrice;
  average_rating: string;
  review_count: number;
  categories: WcCategory[];
  has_options: boolean;
  is_in_stock: boolean;
  short_description: string;
  description: string;
  add_to_cart: { text: string };
};

// --- Local Product types ---

type Variation = { label: string; meta: string; price: string; was?: string };

type Product = {
  id: string;
  section?: string | string[];
  type: "bookable" | "physical";
  tag: string;
  name: string;
  provider: string;
  location: string;
  rating: number;
  reviews: number;
  duration?: string;
  size?: string;
  art: "cell" | "leaf" | "droplet";
  color: string;
  category?: string;
  variationLabel?: string;
  variations?: Variation[];
  price?: string;
  was?: string;
};

// --- Category mapping (WC category name → app category) ---

const CATEGORY_MAP: Record<string, string> = {
  "Anti Aging & Aesthetics": "Anti Aging & Aesthetics",
  "Body Contouring & Sculpting": "Anti Aging & Aesthetics",
  "Skin Brightening & Glow": "Anti Aging & Aesthetics",
  "Non-Invasive Face Slimming": "Anti Aging & Aesthetics",
  "LED & High-Tech Beauty": "Anti Aging & Aesthetics",
  "Acne & Oil Control": "Anti Aging & Aesthetics",
  "Skin & Tissue Rejuvenation": "Anti Aging & Aesthetics",
  "Beauty & Personal Care": "Anti Aging & Aesthetics",
  "Beauty from Within": "Anti Aging & Aesthetics",
  "Hair Loss & Regrowth": "Anti Aging & Aesthetics",
  "Hair Loss Solutions": "Anti Aging & Aesthetics",

  "Regen & Functional Care": "Regen & Functional Care",
  "Anti-Aging & Longevity": "Regen & Functional Care",
  "Performance & Cellular Repair": "Regen & Functional Care",
  "Circulation & Detox Support": "Regen & Functional Care",

  "Health Check & Body Insights": "Health Check & Body Insights",
  "DNA & Genetic Wellness Reports": "Health Check & Body Insights",
  "Metabolic & Cardiovascular Screening": "Health Check & Body Insights",
  "Nutrient & Vitamin Panel": "Health Check & Body Insights",
  "Gut & Digestive Screening": "Health Check & Body Insights",
  "Immune & Inflammation Review": "Health Check & Body Insights",
  "Women's Hormone & Fertility Check": "Health Check & Body Insights",
  "Allergy Screening Packages": "Health Check & Body Insights",

  "Pain Relief & Body Recovery": "Pain Relief & Body Recovery",
  "Muscle & Recovery Therapy": "Pain Relief & Body Recovery",
  "Joint & Bone Mobility": "Pain Relief & Body Recovery",
  "Spine & Posture Correction": "Pain Relief & Body Recovery",
  "Traditional Body Therapy": "Pain Relief & Body Recovery",

  "Health Product & Supplements": "Health Product & Supplements",
  "Gut Health Supplements": "Health Product & Supplements",
  "Immune Support Blends": "Health Product & Supplements",
  "Energy & Vitality": "Health Product & Supplements",
  "Heart Health": "Health Product & Supplements",
  "Weight & Metabolism": "Health Product & Supplements",

  "Mind & Mood Balance": "Mind & Mood Balance",
  "Emotional Reset Coaching": "Mind & Mood Balance",
  "Stress & Burnout Reset": "Mind & Mood Balance",
  "Stress & Sleep Aids": "Mind & Mood Balance",
  "Energy & Mental Clarity": "Mind & Mood Balance",
  "Sleep & Relaxation": "Mind & Mood Balance",
};

const CATEGORY_ART: Record<string, "cell" | "leaf" | "droplet"> = {
  "Anti Aging & Aesthetics": "leaf",
  "Regen & Functional Care": "cell",
  "Health Check & Body Insights": "droplet",
  "Pain Relief & Body Recovery": "cell",
  "Health Product & Supplements": "droplet",
  "Mind & Mood Balance": "leaf",
};

const CATEGORY_COLORS: string[] = ["#1a2659", "#f0a028", "#148c50"];

const DURATION_DEFAULTS: Record<string, string> = {
  "Anti Aging & Aesthetics": "60 min",
  "Regen & Functional Care": "75 min",
  "Health Check & Body Insights": "45 min",
  "Pain Relief & Body Recovery": "45 min",
  "Mind & Mood Balance": "60 min",
  "Health Product & Supplements": "30 min",
};

const BOOKABLE_CATEGORIES = new Set([
  "Anti Aging & Aesthetics",
  "Regen & Functional Care",
  "Health Check & Body Insights",
  "Pain Relief & Body Recovery",
  "Mind & Mood Balance",
]);

// --- Helpers ---

function decodeEntities(s: string): string {
  return s
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/‑/g, "-");
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[()%®™&]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function wcPriceToCents(priceStr: string, minorUnit: number): number {
  return parseInt(priceStr, 10) / Math.pow(10, minorUnit);
}

function formatRM(amount: number): string {
  const rounded = Math.round(amount);
  if (rounded >= 1000) {
    return `RM ${rounded.toLocaleString("en-US")}`;
  }
  return `RM ${rounded}`;
}

function extractSize(name: string): string | undefined {
  const match = name.match(
    /\((\d+\s*(?:ml|g|mg|kg|caps?|capsules?|tabs?|tablets?|sheets?|sachets?|gummies|softgels|lozenges|pcs?|pieces?|strips?|bottles?|packets?|boxes?))\)/i,
  );
  return match ? match[1] : undefined;
}

function resolveCategory(wcCategories: WcCategory[]): string {
  for (const cat of wcCategories) {
    const name = decodeEntities(cat.name);
    if (CATEGORY_MAP[name]) return CATEGORY_MAP[name];
  }
  return "Health Product & Supplements";
}

function isBookable(wcProduct: WcStoreProduct, appCategory: string): boolean {
  if (wcProduct.add_to_cart.text.toLowerCase().includes("book")) return true;
  const desc = (wcProduct.short_description + " " + wcProduct.description).toLowerCase();
  if (desc.includes("session") || desc.includes("treatment") || desc.includes("therapy") || desc.includes("drip")) return true;
  if (BOOKABLE_CATEGORIES.has(appCategory) && wcProduct.type !== "simple") return true;
  if (BOOKABLE_CATEGORIES.has(appCategory)) {
    const name = decodeEntities(wcProduct.name).toLowerCase();
    if (
      name.includes("drip") || name.includes("therapy") || name.includes("treatment") ||
      name.includes("session") || name.includes("package") || name.includes("screening") ||
      name.includes("combo") || name.includes("facial") || name.includes("peel") ||
      name.includes("iv ") || name.includes("reading") || name.includes("coaching") ||
      name.includes("consultation") || name.includes("hifu") || name.includes("prp") ||
      name.includes("laser") || name.includes("microneedling") || name.includes("lifting")
    ) return true;
  }
  return false;
}

let apothecaryCount = 0;

function assignSection(onSale: boolean, bookable: boolean, wcId: number): string {
  // Most recently created products → new-arrivals (regardless of sale status)
  if (wcId >= 92300) return "new-arrivals";

  if (onSale) return "limited-offers";

  // Distribute every 4th non-discounted product to featured-apothecary
  // so all categories get representation in the apothecary grid
  if (apothecaryCount % 4 === 0) {
    apothecaryCount++;
    return "featured-apothecary";
  }
  apothecaryCount++;

  if (bookable) return "featured-treatments";
  return "featured-apothecary";
}

function assignTag(wcProduct: WcStoreProduct): string {
  if (wcProduct.on_sale) {
    const regular = parseInt(wcProduct.prices.regular_price, 10);
    const sale = parseInt(wcProduct.prices.sale_price, 10);
    if (regular > 0 && sale > 0 && sale < regular) {
      const pct = Math.round(((regular - sale) / regular) * 100);
      return `-${pct}%`;
    }
    return "Sale";
  }
  return "Featured";
}

// --- Fetch helpers ---

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.json() as Promise<T>;
}

async function getAllProductIds(): Promise<number[]> {
  const ids: number[] = [];
  for (let page = 1; ; page++) {
    const url = `${BASE}/wp/v2/product?per_page=100&page=${page}&_fields=id`;
    try {
      const products = await fetchJson<{ id: number }[]>(url);
      if (products.length === 0) break;
      ids.push(...products.map((p) => p.id));
      console.log(`  Page ${page}: ${products.length} IDs (total: ${ids.length})`);
      if (products.length < 100) break;
    } catch {
      break;
    }
  }
  return ids;
}

async function fetchProductBatch(ids: number[]): Promise<WcStoreProduct[]> {
  const include = ids.join(",");
  const url = `${BASE}/wc/store/v1/products?include=${include}&per_page=${ids.length}`;
  return fetchJson<WcStoreProduct[]>(url);
}

// --- Main mapping ---

function mapProduct(wc: WcStoreProduct, index: number, usedIds: Set<string>): Product {
  const productName = decodeEntities(wc.name);
  const appCategory = resolveCategory(wc.categories);
  const bookable = isBookable(wc, appCategory);
  const art = CATEGORY_ART[appCategory] ?? "droplet";
  const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

  let slug = toSlug(productName);
  if (!slug) slug = `product-${wc.id}`;
  let suffix = 2;
  const baseSlug = slug;
  while (usedIds.has(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix++;
  }
  usedIds.add(slug);

  const h = hashCode(productName);
  const rating = Math.round((4.5 + (h % 6) * 0.1) * 10) / 10;
  const reviews = 20 + (h % 481);

  const minorUnit = wc.prices.currency_minor_unit;
  const salePrice = wcPriceToCents(wc.prices.sale_price, minorUnit);
  const regularPrice = wcPriceToCents(wc.prices.regular_price, minorUnit);
  const mainPrice = wcPriceToCents(wc.prices.price, minorUnit);

  let price: string | undefined;
  let was: string | undefined;

  if (wc.prices.price_range) {
    const min = wcPriceToCents(wc.prices.price_range.min_amount, minorUnit);
    price = formatRM(min);
  } else if (mainPrice > 0) {
    price = formatRM(mainPrice);
  }

  if (wc.on_sale && regularPrice > salePrice && salePrice > 0) {
    price = formatRM(salePrice);
    was = formatRM(regularPrice);
  }

  const tag = assignTag(wc);
  const section = assignSection(wc.on_sale, bookable, wc.id);

  const product: Product = {
    id: slug,
    section,
    type: bookable ? "bookable" : "physical",
    tag,
    name: productName,
    provider: bookable ? "Reserve Daily Clinic" : "Reserve Daily",
    location: bookable ? "KL · Bangsar" : "Ships free · MY",
    rating,
    reviews,
    art,
    color,
    category: appCategory,
  };

  if (bookable) {
    product.duration = DURATION_DEFAULTS[appCategory] ?? "60 min";
  } else {
    product.size = extractSize(productName) ?? "1 unit";
  }

  if (price) product.price = price;
  if (was) product.was = was;

  return product;
}

// --- Entry point ---

async function main() {
  console.log("Starting fresh — replacing all existing products with staging data.\n");

  const usedIds = new Set<string>();
  const existingNames = new Set<string>();

  console.log("Fetching product IDs from WP REST API...");
  const allIds = await getAllProductIds();
  console.log(`  ${allIds.length} total product IDs\n`);

  console.log("Fetching product details from WC Store API...");
  const newProducts: Product[] = [];
  let skippedOutOfStock = 0;
  let skippedDuplicate = 0;
  let skippedTest = 0;
  let fetchErrors = 0;
  let globalIndex = 0;

  for (let i = 0; i < allIds.length; i += BATCH_SIZE) {
    const batchIds = allIds.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    try {
      const wcProducts = await fetchProductBatch(batchIds);
      console.log(`  Batch ${batchNum}: fetched ${wcProducts.length} products`);

      for (const wc of wcProducts) {
        if (!wc.is_in_stock) {
          skippedOutOfStock++;
          continue;
        }

        const decodedName = decodeEntities(wc.name);

        if (decodedName.toLowerCase() === "test" || wc.slug === "test") {
          skippedTest++;
          continue;
        }

        if (existingNames.has(decodedName.toLowerCase().trim())) {
          skippedDuplicate++;
          continue;
        }

        newProducts.push(mapProduct(wc, globalIndex, usedIds));
        globalIndex++;
      }
    } catch (err) {
      console.error(`  Batch ${batchNum} failed:`, err);
      fetchErrors++;
    }
  }

  writeFileSync(DATA_PATH, JSON.stringify({ products: newProducts }, null, 2) + "\n", "utf-8");

  console.log("\nDone!");
  console.log(`  Products added: ${newProducts.length}`);
  console.log(`  Skipped (out of stock): ${skippedOutOfStock}`);
  console.log(`  Skipped (duplicate name): ${skippedDuplicate}`);
  console.log(`  Skipped (test products): ${skippedTest}`);
  console.log(`  Fetch errors: ${fetchErrors}`);
  console.log(`  Total products: ${newProducts.length}`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
