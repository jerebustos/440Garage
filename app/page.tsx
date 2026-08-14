import Hero from "@/components/Hero";
import MarqueePromos from "@/components/MarqueePromos";
import BrandMarquee from "@/components/BrandMarquee";
import CategoryGrid from "@/components/CategoryGrid";
import PromoBanner from "@/components/PromoBanner";
import LiveMusic from "@/components/LiveMusic";
import ClassesCarousel from "@/components/ClassesCarousel";
import ParallaxDivider from "@/components/ParallaxDivider";

export default async function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Hero />
      <MarqueePromos />
      
      {/* Banner Promocional / Gigantografía */}
      <PromoBanner />
      
      <BrandMarquee />
      <CategoryGrid />
      
      {/* Elemento visual extra y Sección de música en vivo */}
      <ParallaxDivider />
      <LiveMusic />
      <ClassesCarousel />
    </main>
  );
}
