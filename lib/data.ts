import type { ReactNode } from "react";

export type Category = {
  name: string;
  iconKey: "leaf" | "droplet" | "bolt" | "brain" | "heart" | "dna";
  sub: string[];
};

export const CATEGORIES: Category[] = [
  {
    name: "Anti Aging & Aesthetics",
    iconKey: "leaf",
    sub: ["HIFU & Lasers", "Injectables", "Microneedling", "Chemical Peels", "Skin Boosters"],
  },
  {
    name: "Health Check & Body Insights",
    iconKey: "droplet",
    sub: ["Blood Panels", "Genetic Testing", "Gut Microbiome", "Hormone Panels", "Heavy Metals"],
  },
  {
    name: "Health Product & Supplements",
    iconKey: "bolt",
    sub: ["Vitamins", "Minerals", "Adaptogens", "Collagen", "Protein"],
  },
  {
    name: "Mind & Mood Balance",
    iconKey: "brain",
    sub: ["Nootropics", "Sleep Stack", "Meditation", "Therapy", "Ketamine Clinic"],
  },
  {
    name: "Pain Relief & Body Recovery",
    iconKey: "heart",
    sub: ["Cryotherapy", "Red Light", "Shockwave", "Sports Massage", "PRP Joint"],
  },
  {
    name: "Regen & Functional Care",
    iconKey: "dna",
    sub: ["Exosome Therapy", "Stem Cell", "Peptides", "PRP / PRF", "NAD+ Therapy"],
  },
];

export const CATEGORY_STRIP_LINKS = [
  "Home",
  "Shop",
  "Journal",
  "Clinics",
  "Treatments",
  "Insights",
  "For Providers",
];

export type Variation = { label: string; meta: string; price: string; was?: string };

export type Product = {
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

export type Review = {
  q: string;
  n: string;
  r: string;
  city: string;
  treatment: string;
  clinic: string;
  rating: number;
  date: string;
};

export type JournalPost = {
  cat: string;
  t: string;
  d: string;
  read: string;
  date: string;
  author: string;
  art: "rings" | "pulse" | "page" | "weave" | "grid" | "wave";
};

export type IconKey = Category["iconKey"];
export type { ReactNode };
