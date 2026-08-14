import React from "react";
import Image from "next/image";
import Link from "next/link";

const topCategories = [
  {
    id: "pedales-accesorios",
    name: "Pedales y Accesorios",
    image: "/images/categories/pedales.jpg",
    link: "/catalogo?categoria=pedales",
  },
  {
    id: "cuerdas",
    name: "Instrumentos de Cuerda",
    image: "/images/categories/cuerdas.jpg",
    link: "/catalogo?categoria=cuerdas",
  },
  {
    id: "bateria-percusion",
    name: "Batería y Percusión",
    image: "/images/categories/bateria.jpg",
    link: "/catalogo?categoria=bateria",
  },
];

const bottomCategories = [
  {
    id: "teclados-pianos",
    name: "Teclados y Pianos",
    image: "/images/categories/teclados.jpg",
    link: "/catalogo?categoria=teclados",
  },
  {
    id: "vientos",
    name: "Instrumentos de Vientos",
    image: "/images/categories/vientos.jpg",
    link: "/catalogo?categoria=vientos",
  },
  {
    id: "microfonos-amplificadores",
    name: "Micrófonos y Amplificadores",
    image: "/images/categories/audio.jpg",
    link: "/catalogo?categoria=audio",
  },
  {
    id: "accesorios-audio",
    name: "Accesorios para Audio y Video",
    image: "/images/categories/accesorios.jpg",
    link: "/catalogo?categoria=accesorios",
  },
];

export default function CategoryGrid() {
  return (
    <section id="categorias" className="py-24 px-6 md:px-12 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground tracking-widest uppercase mb-6 drop-shadow-sm">
            Colección <span className="text-gold">Destacada</span>
          </h2>
          <div className="w-24 h-1 bg-gold opacity-50"></div>
          <p className="mt-8 max-w-2xl text-slate-300 font-light text-lg">
            Encontrá tu sonido. Equipate para la próxima fecha, armá tu setup y sumate a la zapada.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Fila superior: 3 tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topCategories.map((cat) => (
              <Link 
                key={cat.id} 
                href={cat.link}
                className="group relative h-[450px] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                {/* Imagen con filtro blanco y negro solo en desktop, a color en móvil y en hover */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
                {/* Gradiente oscuro sutil localizado arriba a la izquierda para texto */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/10 to-transparent opacity-60"></div>
                
                {/* Texto arriba a la izquierda con espacio a la derecha */}
                <div className="absolute top-6 left-6 pr-6 w-3/4">
                  <h3 className="text-white font-heading font-bold text-xl md:text-2xl tracking-wide drop-shadow-md">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Fila inferior: 4 tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bottomCategories.map((cat) => (
              <Link 
                key={cat.id} 
                href={cat.link}
                className="group relative h-[350px] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                {/* Imagen con filtro blanco y negro solo en desktop, a color en móvil y en hover */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
                {/* Gradiente oscuro sutil localizado arriba a la izquierda para texto */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/10 to-transparent opacity-60"></div>
                
                {/* Texto arriba a la izquierda con espacio a la derecha */}
                <div className="absolute top-6 left-6 pr-6 w-3/4">
                  <h3 className="text-white font-heading font-bold text-lg md:text-xl tracking-wide drop-shadow-md">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
