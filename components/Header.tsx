"use client";

import React, { useState, useEffect } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import CartDrawer from "./CartDrawer";

interface HeaderProps {
  forceSolid?: boolean;
}

export default function Header({ forceSolid = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  // Zustand store
  const { getCartCount, toggleDrawer } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // The video is sticky inside an 80vh/100vh container.
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solidBackground = forceSolid || isScrolled;

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between pointer-events-auto transition-colors duration-500 ${solidBackground ? "bg-background/90 backdrop-blur-md border-b border-black/5" : "bg-transparent"}`}>
        
        {/* Desktop Nav (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8 text-white font-medium z-50">
          {[
            { name: "Inicio", path: "/" },
            { name: "Catálogo", path: "/catalogo" },
            { name: "Usados", path: "/usados" },
            { name: "Outlet", path: "/outlet" },
            { name: "Eventos", path: "/eventos" }
          ].map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link key={link.path} href={link.path} className={`relative group transition-colors ${isActive ? "text-gold" : "hover:text-gold"}`}>
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-gold transition-all duration-300 ease-out ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger (hidden on desktop) */}
        <button
          aria-label="Abrir menú"
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden text-white hover:text-gray-300 transition-colors z-50"
        >
          <Menu size={28} />
        </button>

        {/* Center: Logo & Name */}
        <Link href="/" aria-label="Inicio" className="flex items-center gap-3 z-50 group absolute left-1/2 -translate-x-1/2">
          <div className="relative h-12 w-28">
            <Image
              src="/logo-new.png"
              alt="Garage Logo"
              fill
              priority
              sizes="112px"
              className="object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          <span className={`font-heading font-bold text-2xl tracking-wide hidden sm:block ${solidBackground ? "text-foreground" : "text-white drop-shadow-md"}`}>
            440Garage
          </span>
        </Link>

        {/* Right: Cart & Contact */}
        <div className="flex items-center gap-6 z-50 text-white">
          <Link href="#contacto" className="hidden md:block relative group hover:text-gold transition-colors font-medium">
            Contacto
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>
          <button 
            aria-label="Ver carrito" 
            className="hover:text-gold transition-colors relative"
            onClick={() => toggleDrawer()}
          >
            <ShoppingCart size={28} />
            {mounted && getCartCount() > 0 && (
              <span className="absolute -top-1 -right-2 bg-gold text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>
      </header>
      
      {/* Global Cart Drawer */}
      <CartDrawer />

      {/* Fullscreen Overlay Menu (Mobile Only) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="md:hidden fixed inset-0 z-[60] bg-background/95 backdrop-blur-md flex flex-col justify-center items-center pointer-events-auto"
          >
            <button
              aria-label="Cerrar menú"
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-foreground hover:text-gray-600 transition-colors"
            >
              <X size={40} />
            </button>
            <nav className="flex flex-col items-center gap-8 text-3xl font-heading font-bold text-foreground uppercase tracking-wider">
              {[
                { name: "Inicio", path: "/" },
                { name: "Catálogo", path: "/catalogo" },
                { name: "Usados", path: "/usados" },
                { name: "Outlet", path: "/outlet" },
                { name: "Eventos", path: "/eventos" }
              ].map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link key={link.path} href={link.path} onClick={() => setIsMenuOpen(false)} className={`relative group transition-colors ${isActive ? "text-gold" : "hover:text-gold"}`}>
                    {link.name}
                    <span className={`absolute -bottom-2 left-0 h-[3px] bg-gold transition-all duration-300 ease-out ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                  </Link>
                );
              })}
              <Link href="#contacto" onClick={() => setIsMenuOpen(false)} className="relative group hover:text-gold transition-colors">
                Contacto
                <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-gold transition-all duration-300 ease-out group-hover:w-full"></span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
