"use client";
import React from "react";
import { useCartStore } from "@/store/useCartStore";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image_url,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button 
        onClick={handleAddToCart}
        className="flex-1 bg-gold text-black uppercase font-bold tracking-widest py-4 px-8 hover:bg-yellow-500 transition-colors"
      >
        Añadir al Carrito
      </button>
      <button className="flex-1 bg-transparent border border-white/20 text-white uppercase font-bold tracking-widest py-4 px-8 hover:bg-white/5 transition-colors">
        Consultar
      </button>
    </div>
  );
}
