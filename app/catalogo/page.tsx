import React, { Suspense } from "react";
import CatalogClient from "@/components/CatalogClient";
import { getProducts } from "@/app/actions/productActions";
import Image from "next/image";

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : undefined;
  
  const products = await getProducts(undefined, q);
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="w-full relative h-[30vh] md:h-[45vh] mb-12 pt-20">
        <Image 
          src="/banner-catalogo.jpg" 
          alt="Catálogo Completo" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
      </div>
      
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Cargando catálogo...</div>}>
        <CatalogClient products={products} />
      </Suspense>
    </div>
  );
}
