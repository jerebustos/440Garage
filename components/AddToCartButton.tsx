"use client";
import React from "react";
import { useCartStore } from "@/store/useCartStore";

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

  const handleAddToCart = () => {
    if (product.stock === 0) return;
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
        disabled={product.stock === 0}
        onClick={handleAddToCart}
        className={`flex-1 uppercase font-bold tracking-widest py-4 px-8 transition-colors ${
          product.stock === 0
            ? "bg-white/5 text-slate-500 cursor-not-allowed"
            : "bg-gold text-black hover:bg-yellow-500"
        }`}
      >
        {product.stock === 0 ? "Agotado" : "Añadir al Carrito"}
      </button>
      <button className="flex-1 bg-transparent border border-white/20 text-white uppercase font-bold tracking-widest py-4 px-8 hover:bg-white/5 transition-colors">
        Consultar
      </button>
    </div>
  );
}
