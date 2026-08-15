"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function MarqueePromos() {
  const [promos, setPromos] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    async function fetchPromos() {
      const supabase = createClient();
      // Only fetch active promotions and join with products
      const { data, error } = await supabase
        .from("promotions")
        .select(`
          discount_percentage,
          end_date,
          products ( name )
        `)
        .eq("is_active", true);
        
      if (data && !error) {
        setPromos(data);
      }
    }
    fetchPromos();
  }, []);

  if (promos.length === 0) {
    return null; // Don't show marquee if there are no promos
  }

  // Duplicate items for seamless loop
  const marqueeItems = [...promos, ...promos, ...promos, ...promos];

  return (
    <div className="w-full bg-blue-600 py-3 overflow-hidden flex items-center border-y border-blue-500">
      <motion.div
        className="flex whitespace-nowrap gap-10"
        animate={{ x: [0, -1035] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {marqueeItems.map((promo, i) => (
          <div key={i} className="flex items-center gap-4 text-white font-semibold text-xl">
            <span className="text-yellow-300">{promo.discount_percentage}% OFF</span>
            <span>en {promo.products?.name}</span>
            <span className="opacity-50">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
