import { notFound } from "next/navigation";
import { getAllProducts, getProductById } from "@/lib/products";
import { generateProductDetail } from "@/lib/pdp-mock";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { Nav } from "@/components/sections/Nav";
import { CategoryStrip } from "@/components/sections/CategoryStrip";
import { Footer } from "@/components/sections/Footer";
import { ProductPdpShell } from "@/components/pdp/ProductHero";
import { FrequentlyBought } from "@/components/pdp/FrequentlyBought";
import { ProductInformation } from "@/components/pdp/ProductInformation";
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

  return (
    <>
      <AnnouncementBar />
      <Nav />
      <CategoryStrip />
      <main className="max-w-[1400px] mx-auto px-6 md:px-10">
        <ProductPdpShell
          product={product}
          description={detail.description}
          aiSummary={detail.aiSummary}
          specs={detail.specs}
          certifications={detail.certifications}
          categoryRanks={detail.categoryRanks}
          soldLast30Days={detail.soldLast30Days}
          packageOptions={detail.packageOptions}
          avgRating={detail.avgRating}
          similarHighlight={detail.similarItems[0]}
          comboProducts={detail.frequentlyBoughtWith}
        />
        <FrequentlyBought products={detail.frequentlyBoughtWith} />
        <ProductInformation info={detail.productInformation} />
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
