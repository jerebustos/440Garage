"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export default function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  return (
    <Link href={`/producto/${id}`}>
      <motion.div
        className="group flex flex-col gap-4 cursor-pointer"
      >
        {/* Image Container - No borders or rounded corners for an edgy, modern look */}
        <div className="relative h-[400px] w-full bg-[#0a0a0a] overflow-hidden">
          {imageUrl ? (
            <motion.img
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full opacity-85 group-hover:opacity-100 transition-opacity duration-500"
            />
          ) : (
            <div className="text-slate-600 font-mono flex items-center justify-center h-full">Sin Imagen</div>
          )}
        </div>

        {/* Minimalist Details */}
        <div className="flex flex-col gap-1">
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
