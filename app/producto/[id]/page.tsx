import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, ChevronRight, Flame } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductById } from "@/app/actions/productActions";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch the actual product from the database
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Create some basic features since we don't have a features column yet
  const features = product.category ? [
    `Categoría: ${product.category}`,
    product.subcategory ? `Subcategoría: ${product.subcategory}` : null,
    product.brand ? `Marca: ${product.brand}` : null,
    product.is_used ? "Estado: Instrumento Usado" : "Estado: Nuevo",
    product.is_outlet ? "Producto en Outlet / Oferta especial" : null,
  ].filter(Boolean) : ["Producto de alta calidad", "Garantía de tienda"];

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-gold transition-colors">
            Inicio
          </Link>
          <ChevronRight size={14} />
          <Link href="/catalogo" className="hover:text-gold transition-colors">
            Catálogo
          </Link>
          {product.category && (
            <>
              <ChevronRight size={14} />
              <Link href={`/catalogo?categoria=${product.category}`} className="hover:text-gold transition-colors">
                {product.category}
              </Link>
            </>
          )}
          {product.subcategory && (
            <>
              <ChevronRight size={14} />
              <span className="text-slate-200">{product.subcategory}</span>
            </>
          )}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white flex items-center justify-center p-8 group">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105 p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="text-slate-400 font-mono flex items-center justify-center h-full">Sin Imagen</div>
              )}
              {/* Badges en la imagen */}
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                {product.is_used && (
                  <span className="bg-zinc-800/90 backdrop-blur-md border border-white/10 text-white text-xs uppercase font-bold tracking-widest px-4 py-2 rounded-full shadow-lg">
                    Usado
                  </span>
                )}
                {product.is_outlet && (
                  <span className="bg-red-900/90 backdrop-blur-md border border-red-500/30 text-white text-xs uppercase font-bold tracking-widest px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                    Outlet
                    <Flame size={14} className="text-orange-400 animate-flame" />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {product.brand && (
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-gold mb-2">
                {product.brand}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-wide text-white mb-4 leading-tight">
              {product.name}
            </h1>
            {product.stock === 0 ? (
              <p className="text-3xl font-bold text-red-500 mb-8 uppercase tracking-wide text-lg">
                Sin stock
              </p>
            ) : (
              <p className="text-3xl font-medium text-gold mb-8">
                ${product.price.toLocaleString("es-AR")}
              </p>
            )}

            {product.description && (
              <div className="prose prose-invert prose-slate max-w-none mb-10">
                <p className="text-slate-300 font-light leading-relaxed text-lg whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}

            <div className="mb-10">
              <h3 className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-4">Características</h3>
              <ul className="space-y-3">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 font-light">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-12">
              <AddToCartButton product={product} />
              {product.stock === 0 && (
                <p className="text-red-400 text-sm mt-2 font-medium">Actualmente sin stock.</p>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 text-slate-300">
                <Truck className="text-gold" size={24} />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase">Envío Seguro</span>
                  <span className="text-xs text-slate-400">A todo el país</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <ShieldCheck className="text-gold" size={24} />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase">Garantía Local</span>
                  <span className="text-xs text-slate-400">Trato directo con nosotros</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
