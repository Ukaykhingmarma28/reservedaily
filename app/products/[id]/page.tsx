import { notFound } from "next/navigation";
import { getAllProducts, getProductById } from "@/lib/products";
import { generateProductDetail } from "@/lib/pdp-mock";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { Nav } from "@/components/sections/Nav";
import { CategoryStrip } from "@/components/sections/CategoryStrip";
import { Footer } from "@/components/sections/Footer";
import { Breadcrumbs } from "@/components/pdp/Breadcrumbs";
import { ProductHero } from "@/components/pdp/ProductHero";
import { ProductTabs } from "@/components/pdp/ProductTabs";
import { FrequentlyBought } from "@/components/pdp/FrequentlyBought";
import { SimilarItems } from "@/components/pdp/SimilarItems";
import { CustomerReviews } from "@/components/pdp/CustomerReviews";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }));
}

type Props = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const detail = generateProductDetail(product);

  const isBookable = product.type === "bookable";
  const tabs = isBookable
    ? [
        { label: "Overview", content: detail.description },
        { label: "How it works", content: detail.suggestedUse },
        { label: "What to expect", content: detail.highlights },
        { label: "Important info", content: detail.warnings },
      ]
    : [
        { label: "Overview", content: detail.description },
        { label: "Suggested use", content: detail.suggestedUse },
        { label: "Ingredients", content: detail.ingredients },
        { label: "Warnings", content: detail.warnings },
      ];

  return (
    <>
      <AnnouncementBar />
      <Nav />
      <CategoryStrip />
      <main className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Breadcrumbs category={product.category ?? "Products"} productName={product.name} />
        <ProductHero
          product={product}
          description={detail.description}
          highlights={detail.highlights}
        />
        <FrequentlyBought products={detail.frequentlyBoughtWith} />
        <ProductTabs tabs={tabs} />
        <SimilarItems products={detail.similarItems} />
        <CustomerReviews
          reviews={detail.reviews}
          avgRating={detail.avgRating}
          ratingBreakdown={detail.ratingBreakdown}
          totalReviews={product.reviews}
        />
      </main>
      <Footer />
    </>
  );
}
