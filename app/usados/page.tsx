import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/app/actions/productActions";
import Image from "next/image";

export default async function UsadosPage() {
  const allProducts = await getProducts();
  const products = allProducts.filter((p: any) => p.is_used);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="w-full relative h-[30vh] md:h-[45vh] mb-12 pt-20">
        <Image 
          src="/banner-usados.jpg" 
          alt="Instrumentos Usados" 
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
