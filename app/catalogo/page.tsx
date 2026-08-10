import React from "react";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function CatalogoPage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const { categoria } = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("products").select("*");
  
  if (categoria && categoria !== "Todas") {
    query = query.eq("category", categoria);
  }

  const { data: products } = await query;

  // Derive categories from products for the menu, or use fixed ones for now
  const categories = ["Todas", "Guitarras", "Bajos", "Baterías", "Audio Pro"];

  return (
    <main className="flex flex-col min-h-screen bg-black w-full">
      {/* 
        We pass forceSolid to Header if it supports it, otherwise 
        since it's a separate page, we might want to ensure it has a background.
      */}
      <div className="w-full">
        <Header forceSolid={true} />
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
          Catálogo Completo
        </h1>

        {/* Categories Menu */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => {
            const isActive = categoria === cat || (!categoria && cat === "Todas");
            return (
              <Link 
                key={cat} 
                href={cat === "Todas" ? "/catalogo" : `/catalogo?categoria=${cat}`}
                className={`px-6 py-2 uppercase tracking-widest text-sm font-bold border transition-colors ${
                  isActive 
                    ? "border-gold text-gold" 
                    : "border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.image_url}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 py-20 border border-slate-800 border-dashed">
            No se encontraron productos en esta categoría.
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
