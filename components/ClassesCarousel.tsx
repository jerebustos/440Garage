"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const classImages = [
  "/clases/623690838_1488258756634334_681843298525701005_n.jpg",
  "/clases/626623284_1489902513136625_4270007790756992393_n.jpg",
  "/clases/627578596_1489902533136623_2301113238424636903_n.jpg",
  "/clases/653721426_1528443302615879_3851083081635382687_n.jpg",
  "/clases/656818890_1535476521912557_1214410253360248598_n.jpg",
  "/clases/656852630_1536474385146104_2050834992757009822_n.jpg",
  "/clases/657181805_1537768201683389_1358062108591701507_n.jpg",
  "/clases/658170962_1539631964830346_8476562945753080579_n.jpg",
  "/clases/663246435_1547413254052217_6892085962148476381_n.jpg"
];

export default function ClassesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % classImages.length);
    }, 4000); // Rotate every 4 seconds
    return () => clearInterval(timer);
  }, [isHovered]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % classImages.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + classImages.length) % classImages.length);

  return (
    <section className="py-24 bg-black" id="clases">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Lado Izquierdo: Carrusel de Imagenes */}
          <div 
            className="relative w-full h-[450px] md:h-[600px] group bg-transparent flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={classImages[currentIndex]}
                alt={`Clase promocion ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 m-auto max-w-full max-h-full rounded-2xl shadow-2xl"
              />
            </AnimatePresence>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white border border-white/20 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white border border-white/20 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {classImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-colors shadow-sm ${idx === currentIndex ? "bg-gold scale-110" : "bg-slate-300 hover:bg-slate-400"}`}
                  aria-label={`Ir a imagen ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Lado Derecho: Titulo y descripcion */}
          <div className="flex flex-col justify-center text-left">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Clases con amigos de <span className="text-gold">440Garage</span>
            </h2>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              Sumate a nuestra comunidad de músicos y aprendé con profesores que entienden tu pasión. No importa si recién estás dando tus primeros pasos en la música o si buscás perfeccionar tu técnica, acá vas a encontrar el espacio ideal para crecer.
            </p>
            <p className="text-lg text-white font-bold mb-10 leading-relaxed">
              ¡La música siempre es mejor cuando se comparte entre amigos!
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
