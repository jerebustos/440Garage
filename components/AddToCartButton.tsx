"use client";
import React, { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
    stock?: number;
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (product.stock === 0 || isAdded) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image_url,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button 
        disabled={product.stock === 0}
        onClick={handleAddToCart}
        className={`flex-1 uppercase flex items-center justify-center gap-3 font-bold tracking-widest py-4 px-8 transition-colors ${
          product.stock === 0
            ? "bg-white/5 text-slate-500 cursor-not-allowed"
            : isAdded
              ? "bg-emerald-500 text-black border-emerald-400"
              : "bg-gold text-black hover:bg-yellow-500"
        }`}
      >
        {isAdded ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Check size={20} />
          </motion.div>
        ) : null}
        {product.stock === 0 ? "Agotado" : isAdded ? "¡Agregado!" : "Añadir al Carrito"}
      </button>
      <button className="flex-1 bg-transparent border border-white/20 text-white uppercase font-bold tracking-widest py-4 px-8 hover:bg-white/5 transition-colors">
        Consultar
      </button>
    </div>
  );
}
