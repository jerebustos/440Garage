"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export default function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/producto/${id}`}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group flex flex-col gap-4 cursor-pointer bg-white/[0.02] border border-white/5 hover:border-gold/30 hover:bg-white/[0.04] p-4 rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-500 relative"
      >
        
        {/* Badge "Ver detalles" on hover */}
        <div className="absolute top-6 right-6 z-10 bg-gold/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          VER MÁS
        </div>

        {/* Image Container */}
        <div className="relative h-[350px] w-full bg-white/5 overflow-hidden rounded-lg">
          {imageUrl && !imgError ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              className="w-full h-full relative"
            >
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                onError={() => setImgError(true)}
              />
            </motion.div>
          ) : (
            <div className="text-slate-400 font-mono flex items-center justify-center h-full">Sin Imagen</div>
          )}
        </div>

        {/* Minimalist Details */}
        <div className="flex flex-col gap-1 mt-2">
          <h3 className="text-lg font-light text-slate-300 group-hover:text-gold transition-colors line-clamp-1">
            {name}
          </h3>
          <span className="text-xl font-medium text-white tracking-wide">
            ${price.toLocaleString("es-AR")}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
