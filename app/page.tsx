import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { Nav } from "@/components/sections/Nav";
import { CategoryStrip } from "@/components/sections/CategoryStrip";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { ShopByConcern } from "@/components/sections/ShopByConcern";
import { ShopByCategory } from "@/components/sections/ShopByCategory";
import { VitalAI } from "@/components/sections/VitalAI";
import { FeaturedTreatments } from "@/components/sections/FeaturedTreatments";
import { LimitedOffers } from "@/components/sections/LimitedOffers";
import { FeaturedApothecary } from "@/components/sections/FeaturedApothecary";
import { JourneyPromise } from "@/components/sections/JourneyPromise";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustStats } from "@/components/sections/TrustStats";
import { Journal } from "@/components/sections/Journal";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <CategoryStrip />
      <Hero />
      <Marquee />
      <ShopByConcern />
      <ShopByCategory />
      <VitalAI />
      <FeaturedTreatments />
      <LimitedOffers />
      <FeaturedApothecary />
      <JourneyPromise />
      <Testimonials />
      <TrustStats />
      <Journal />
      <CTA />
      <Footer />
    </>
  );
}
