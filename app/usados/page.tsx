import ProductCard from "@/components/ProductCard";

export default function UsadosPage() {
  // Solo algunos productos de muestra para Usados
  const products = [
    {
      id: "3",
      name: "Martin D-28 Acoustic (Usada - Excelente Estado)",
      price: 2100000,
      image_url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80",
    },
    {
      id: "4",
      name: "Yamaha YFL-222 Flute (Usada)",
      price: 350000,
      image_url: "https://images.unsplash.com/photo-1582220107107-590dc8b0fa3f?auto=format&fit=crop&q=80",
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="mb-12 flex flex-col items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground tracking-widest uppercase mb-6 drop-shadow-sm">
          Instrumentos <span className="text-gold">Usados</span>
        </h1>
        <div className="w-24 h-1 bg-gold opacity-50"></div>
        <p className="mt-8 max-w-2xl text-slate-300 font-light text-lg">
          Equipos con historia. Instrumentos usados inspeccionados y puestos a punto por nuestros luthiers para que sigan haciendo ruido.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
    </div>
  );
}
