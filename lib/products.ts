import productsJson from "@/data/products.json";
import type { Product } from "@/lib/data";

const allProducts: Product[] = productsJson.products as Product[];

export function getAllProducts(): Product[] {
  return allProducts;
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProductsBySection(section: string): Product[] {
  return allProducts.filter((p) => {
    if (Array.isArray(p.section)) return p.section.includes(section);
    return p.section === section;
  });
}

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter((p) => p.category === category);
}
