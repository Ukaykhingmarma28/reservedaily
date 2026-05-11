import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getProductById } from "@/lib/products";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) {
    return { title: "Product Not Found | ReserveDaily" };
  }
  return {
    title: `${product.name} | ReserveDaily`,
    description: `${product.name} by ${product.provider} — ${product.type === "bookable" ? `Book your ${product.duration} session` : "Shop now"} at ReserveDaily.`,
    openGraph: {
      title: product.name,
      description: `${product.type === "bookable" ? "Reserve" : "Shop"} ${product.name} at ReserveDaily`,
      ...(product.image && { images: [{ url: product.image }] }),
    },
  };
}

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
