import React from "react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/app/actions/productActions";
import Image from "next/image";
import { Product } from "@/lib/data/products";

export default async function OutletPage() {
  const allProducts = await getProducts();
  const products = allProducts.filter((p: Product) => p.is_outlet);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="w-full relative h-[30vh] md:h-[45vh] mb-12 pt-20">
        <Image 
          src="/banner-outlet.jpg" 
          alt="Outlet y Ofertas" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
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
              brand={product.brand}
              is_used={product.is_used}
              is_outlet={product.is_outlet}
              stock={product.stock}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
