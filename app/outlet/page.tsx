import ProductCard from "@/components/ProductCard";

export default function OutletPage() {
  const products = [
    {
      id: "5",
      name: "Roland TD-17KVX V-Drums (Outlet - Caja Abierta)",
      price: 1450000,
      image_url: "https://images.unsplash.com/photo-1552055627-90924036bf64?auto=format&fit=crop&q=80",
    },
    {
      id: "6",
      name: "Korg Minilogue XD (Outlet)",
      price: 550000,
      image_url: "https://images.unsplash.com/photo-1598516086829-14e99f14b62d?auto=format&fit=crop&q=80",
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="mb-12 flex flex-col items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground tracking-widest uppercase mb-6 drop-shadow-sm">
          Zona <span className="text-gold">Outlet</span>
        </h1>
        <div className="w-24 h-1 bg-gold opacity-50"></div>
        <p className="mt-8 max-w-2xl text-slate-300 font-light text-lg">
          Oportunidades únicas. Productos nuevos con detalles estéticos o de exhibición a un precio imbatible.
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
