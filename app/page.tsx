import Hero from "@/components/Hero";
import MarqueePromos from "@/components/MarqueePromos";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch products (Server-Side)
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <main className="flex flex-col w-full min-h-screen">
      <Hero />
      <MarqueePromos />
      <ProductGrid products={products || []} />
      <Footer />
    </main>
  );
}
