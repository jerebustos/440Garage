"use client";
import React from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";

export default function CartDrawer() {
  const { 
    items, 
    isDrawerOpen, 
    toggleDrawer, 
    removeItem, 
    updateQuantity, 
    getCartTotal 
  } = useCartStore();

  const handleCheckout = () => {
    // Generate WhatsApp checkout message
    if (items.length === 0) return;
    
    let message = "Hola Garage 440! Me gustaría comprar los siguientes artículos:%0A%0A";
    items.forEach(item => {
      message += `- ${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toLocaleString('es-AR')}%0A`;
    });
    message += `%0ATotal: $${getCartTotal().toLocaleString('es-AR')}`;
    
    // You can replace this phone number with the actual business number
    const whatsappUrl = `https://wa.me/5492954000000?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleDrawer(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-background border-l border-black/10 z-[80] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/10">
              <h2 className="text-2xl font-heading font-bold text-foreground uppercase tracking-widest flex items-center gap-3">
                <ShoppingBag className="text-gold" /> Tu Carrito
              </h2>
              <button 
                onClick={() => toggleDrawer(false)}
                className="text-slate-500 hover:text-foreground transition-colors p-2"
                aria-label="Cerrar carrito"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="font-medium text-lg uppercase tracking-wider text-gold mb-2">¡Tu carrito está en silencio!</p>
                  <p className="text-sm text-slate-400">Agrega algo de equipo y vamos a hacer ruido.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-lg group hover:border-gold/30 transition-colors">
                    <div className="relative w-24 h-24 bg-white rounded-md overflow-hidden shrink-0">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover mix-blend-multiply"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">Sin img</div>
                      )}
                    </div>
                    
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-white font-medium line-clamp-2 leading-tight">{item.name}</h3>
                        <p className="text-gold font-semibold mt-1">${item.price.toLocaleString('es-AR')}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-white/20 rounded-md overflow-hidden bg-white/5">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-white/10 text-white transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-white">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-white/10 text-white transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-slate-500 hover:text-red-500 transition-colors p-2"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-zinc-900 border-t border-white/10 mt-auto">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-400 uppercase tracking-widest text-sm font-bold">Total</span>
                  <span className="text-3xl font-light text-white tracking-wider">${getCartTotal().toLocaleString('es-AR')}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-gold text-black uppercase font-bold tracking-widest py-4 px-8 hover:bg-yellow-500 transition-colors rounded-none"
                >
                  Finalizar Compra
                </button>
                <p className="text-center text-xs text-slate-500 mt-4 font-medium uppercase tracking-widest">
                  Continuarás tu compra por WhatsApp
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
