import React from "react";
import CatalogClient from "@/components/CatalogClient";
import { mockProducts } from "@/lib/data/products";

export default function CatalogoPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="mb-12 flex flex-col items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground tracking-widest uppercase mb-6 drop-shadow-sm">
          Catálogo <span className="text-gold">Completo</span>
        </h1>
        <div className="w-24 h-1 bg-gold opacity-50"></div>
        <p className="mt-8 max-w-2xl text-slate-300 font-light text-lg">
          Explorá todo nuestro inventario. El equipo que elegís define tu estilo. Encontrá lo que necesitás para tu próxima fecha.
        </p>
      </div>
      
      <CatalogClient products={mockProducts} />
    </div>
  );
}
