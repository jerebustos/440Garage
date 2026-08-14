import React from "react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/app/actions/productActions";

export default async function OutletPage() {
  const allProducts = await getProducts();
  // TODO: Add an 'is_outlet' column in DB or filter appropriately. For now we use the first 3 products as a demo.
  const products = allProducts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="mb-12 flex flex-col items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground tracking-widest uppercase mb-6 drop-shadow-sm">
          Outlet <span className="text-red-500">& Ofertas</span>
        </h1>
        <div className="w-24 h-1 bg-red-500 opacity-50"></div>
        <p className="mt-8 max-w-2xl text-slate-300 font-light text-lg">
          Oportunidades únicas. Productos nuevos con detalles estéticos o de exhibición a precios inmejorables.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
    </div>
  );
}
