import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return (
      <section id="productos" className="py-32 text-center border-t border-white/5">
        <p className="text-2xl font-light text-slate-400">Nuestro catálogo se está afinando. Vuelve pronto.</p>
      </section>
    );
  }

  return (
    <section id="productos" className="py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground tracking-widest uppercase mb-6 drop-shadow-sm">
            Colección <span className="text-gold">Destacada</span>
          </h2>
          <div className="w-24 h-1 bg-gold opacity-50"></div>
          <p className="mt-8 max-w-2xl text-slate-300 font-light text-lg">
            El equipo que elegís define tu estilo. Explorá nuestra selección y encontrá lo que necesitás para tu próxima fecha.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
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
      </div>
    </section>
  );
}
