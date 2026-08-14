"use client";
import React from "react";
import { motion } from "framer-motion";

export default function BrandMarquee() {
  const brands = [
    "FENDER", "GIBSON", "ROLAND", "YAMAHA", "KORG", "MARSHALL", "IBANEZ", "PRS", "MARTIN", "TAYLOR"
  ];
  
  // Duplicate for seamless infinite scrolling
  const marqueeItems = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="w-full bg-background py-12 overflow-hidden flex items-center border-y border-black/5 relative">
      {/* Gradient masks for smooth edge fading */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex whitespace-nowrap gap-16 items-center"
        animate={{ x: [0, -2000] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35,
        }}
      >
        {marqueeItems.map((brand, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-300 tracking-widest uppercase hover:text-gold transition-colors duration-500 cursor-default">
              {brand}
            </span>
            {/* Diamond Separator */}
            <div className="w-2 h-2 bg-gold rotate-45 opacity-50" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
