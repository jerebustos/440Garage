import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, ChevronRight } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Mock data for the frontend layout purposes
  const product = {
    id: id,
    name: "Fender Stratocaster American Professional II",
    price: 1850000,
    description:
      "La American Professional II Stratocaster se nutre de más de sesenta años de innovación, inspiración y evolución para satisfacer las exigencias de los músicos de hoy en día. Nuestro popular mástil Deep \"C\" ahora luce bordes de diapasón lisos, un acabado satinado \"Super-Natural\" y un talón de mástil esculpido de nuevo cuño para una sensación sumamente cómoda.",
    features: [
      "Tres pastillas V-Mod II single-coil Stratocaster",
      "Trémolo mejorado de 2 puntos con bloque de acero laminado en frío",
      "Mástil con perfil Deep \"C\"",
      "Cejilla de hueso; 22 trastes narrow-tall",
      "Incluye estuche rígido Elite Molded",
    ],
    image_url: "https://images.unsplash.com/photo-1564186763535-ebb55ef3dcb6?auto=format&fit=crop&q=80",
    stock: 5,
    category: "Guitarras Eléctricas",
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-gold transition-colors">
            Inicio
          </Link>
          <ChevronRight size={14} />
          <Link href="/#productos" className="hover:text-gold transition-colors">
            Catálogo
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-200">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Thumbnail placeholders */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border ${i === 1 ? 'border-gold' : 'border-white/10 hover:border-white/30'} transition-colors bg-white/5`}>
                   <Image
                    src={product.image_url}
                    alt={`Thumbnail ${i}`}
                    fill
                    className="object-cover opacity-80 hover:opacity-100"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-wide text-white mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-medium text-gold mb-8">
              ${product.price.toLocaleString("es-AR")}
            </p>

            <div className="prose prose-invert prose-slate max-w-none mb-10">
              <p className="text-slate-300 font-light leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="mb-10">
              <h3 className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-4">Características Clave</h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
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
