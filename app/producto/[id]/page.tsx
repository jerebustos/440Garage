import React from "react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Wait for the Promise to resolve per Next 15+ rules for params
  const { id } = await params;
  
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    return notFound();
  }

  return (
    <main className="flex flex-col w-full min-h-screen bg-black">
      <Header forceSolid={true} />
      
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Image */}
          <div className="w-full relative bg-[#0a0a0a] min-h-[500px] flex items-center justify-center">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-slate-600 font-mono">Sin Imagen</span>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col justify-center">
            <span className="text-gold uppercase tracking-widest text-sm font-bold mb-4 block">
              {product.category || "Instrumento Especial"}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
              {product.name}
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              {product.description || "Un instrumento de precisión diseñado para aquellos que no aceptan compromisos en su sonido."}
            </p>
            
            <div className="text-4xl font-light text-white mb-10 tracking-wider">
              ${product.price.toLocaleString("es-AR")}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-gold text-black uppercase font-bold tracking-widest py-4 px-8 hover:bg-yellow-500 transition-colors">
                Añadir al Carrito
              </button>
              <button className="flex-1 bg-transparent border border-white/20 text-white uppercase font-bold tracking-widest py-4 px-8 hover:bg-white/5 transition-colors">
                Consultar
              </button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
