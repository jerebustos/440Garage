"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function PromoBanner() {
  const [isAdmin] = useState(false); // In a real app, verify user sessionfecto
  const [currentIndex, setCurrentIndex] = useState(0);

  // En el futuro, estas imágenes vendrán de Supabase. 
  // Por ahora, dejamos la que subiste como la primera (y única) para que no haya imagen rota en el slide 2 y 3.
  // Cuando tengas más, solo tienes que agregarlas a este array.
  const images = [
    "/banner-promocional.jpg",
  ];

  const handleEditClick = () => {
    alert("Próximamente: Abrir panel para subir múltiples imágenes al carrusel.");
  };

  // Lógica del carrusel automático (cambia cada 5 segundos si hay más de 1 imagen)
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full bg-black flex items-center justify-center">
      
      {/* Botón Admin */}
      {isAdmin && (
        <button 
          onClick={handleEditClick}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 px-4 py-2 rounded-md font-mono text-xs md:text-sm tracking-widest transition-all shadow-lg flex items-center gap-2 cursor-pointer"
        >
          <span>✏️</span> MODIFICAR
        </button>
      )}

      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full relative flex"
        >
          {images.length > 0 && (
            <Image 
              src={images[currentIndex]}
              alt={`Promoción ${currentIndex + 1}`}
              width={1920}
              height={1080}
              priority
              className="w-full h-auto object-contain"
              sizes="100vw"
            />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Indicadores del carrusel (solo se muestran si hay más de 1 imagen) */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-gold scale-125" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
