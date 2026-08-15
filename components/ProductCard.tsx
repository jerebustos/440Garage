"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Check, Flame } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  brand?: string;
  is_used?: boolean;
  is_outlet?: boolean;
  stock?: number;
}

export default function ProductCard({ id, name, price, imageUrl, brand, is_used, is_outlet, stock = 1 }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group flex flex-col bg-white/[0.03] border border-white/5 hover:border-gold/40 hover:bg-white/[0.05] rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] transition-all duration-500 relative"
    >
      {/* Clickeable link to details that covers the entire card */}
      <Link href={`/producto/${id}`} className="absolute inset-0 z-20" aria-label={`Ver detalles de ${name}`} />

      {/* Badges Container */}
      <div className="absolute top-4 left-4 z-30 flex flex-col gap-2 pointer-events-none">
        {is_used && (
          <span className="bg-zinc-800/90 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow-lg">
            Usado
          </span>
        )}
        {is_outlet && (
          <span className="bg-red-900/90 backdrop-blur-md border border-red-500/30 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            Outlet
            <Flame size={12} className="text-orange-400 animate-flame" />
          </span>
        )}
      </div>

      {/* Image Container (White Background for Product Cutouts) */}
      <div className="relative h-[280px] sm:h-[320px] w-full bg-white overflow-hidden flex items-center justify-center">
        {imageUrl && !imgError ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="w-full h-full relative"
          >
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover mix-blend-multiply pointer-events-none"
              onError={() => setImgError(true)}
            />
          </motion.div>
        ) : (
          <div className="text-slate-400 font-mono flex items-center justify-center h-full">Sin Imagen</div>
        )}
        
        {/* Hover overlay gradient for aesthetic blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Minimalist Details */}
      <div className="flex flex-col gap-2 p-5 sm:p-6 z-30 pointer-events-none">
        {brand && (
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold/80">
            {brand}
          </span>
        )}
        <h3 className="text-base sm:text-lg font-medium text-slate-200 group-hover:text-white transition-colors line-clamp-2 leading-snug">
          {name}
        </h3>
        <div className="flex items-end justify-between mt-2">
          {stock === 0 ? (
            <span className="text-xl sm:text-2xl font-bold text-red-500 tracking-wide uppercase text-sm">
              Sin stock
            </span>
          ) : (
            <span className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              ${price.toLocaleString("es-AR")}
            </span>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 z-30 mt-auto relative">
        <button 
          disabled={stock === 0}
          onClick={(e) => {
            e.preventDefault(); // Prevent link navigation
            if (stock > 0 && !isAdded) {
              addItem({ id, name, price, imageUrl });
              setIsAdded(true);
              setTimeout(() => setIsAdded(false), 2000);
            }
          }}
          className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 font-medium tracking-wide group/btn cursor-pointer ${
            stock === 0 
              ? "bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed" 
              : isAdded 
                ? "bg-emerald-500 text-black border-emerald-400"
                : "bg-white/5 hover:bg-gold text-white hover:text-black border border-white/10 hover:border-gold"
          }`}
        >
          {isAdded ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <Check size={18} />
            </motion.div>
          ) : (
            <ShoppingCart size={18} className={stock > 0 ? "group-hover/btn:-translate-y-0.5 transition-transform" : ""} />
          )}
          <span>{stock === 0 ? "Agotado" : isAdded ? "¡Agregado!" : "Agregar al carrito"}</span>
        </button>
      </div>

    </motion.div>
  );
}
