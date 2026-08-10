"use client";

import React, { useState, useEffect } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
  forceSolid?: boolean;
}

export default function Header({ forceSolid = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The video is sticky inside a 250vh container. It leaves the viewport at roughly 1.5x the window height.
      if (window.scrollY > window.innerHeight * 1.5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solidBackground = forceSolid || isScrolled;

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between pointer-events-auto transition-colors duration-500 ${solidBackground ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"}`}>
        
        {/* Desktop Nav (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8 text-white font-medium z-50 mix-blend-difference">
          <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
          <Link href="#productos" className="hover:text-gold transition-colors">Instrumentos</Link>
          <Link href="#promociones" className="hover:text-gold transition-colors">Promociones</Link>
        </nav>

        {/* Mobile Hamburger (hidden on desktop) */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden text-white hover:text-gray-300 transition-colors z-50 mix-blend-difference"
        >
          <Menu size={28} />
        </button>

        {/* Center: Logo & Name */}
        <Link href="/" className="flex items-center gap-3 z-50 mix-blend-difference group absolute left-1/2 -translate-x-1/2">
          <img
            src={solidBackground ? "/logo.jpg" : "/logo-transparent.png"}
            alt="Garage Logo"
            className="h-10 w-auto object-cover group-hover:scale-105 transition-transform"
            style={{ clipPath: "ellipse(48% 46% at 50% 50%)" }}
          />
          <span className="text-white font-heading font-bold text-2xl tracking-wide hidden sm:block">
            Garage
          </span>
        </Link>

        {/* Right: Cart & Contact */}
        <div className="flex items-center gap-6 z-50 mix-blend-difference text-white">
          <Link href="#contacto" className="hidden md:block hover:text-gold transition-colors font-medium">
            Contacto
          </Link>
          <button className="hover:text-gold transition-colors relative">
            <ShoppingCart size={28} />
            <span className="absolute -top-1 -right-2 bg-gold text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu (Mobile Only) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="md:hidden fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex flex-col justify-center items-center pointer-events-auto"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-400 transition-colors"
            >
              <X size={40} />
            </button>
            <nav className="flex flex-col items-center gap-8 text-3xl font-heading font-bold text-white uppercase tracking-wider">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-gold transition-colors">Inicio</Link>
              <Link href="#productos" onClick={() => setIsMenuOpen(false)} className="hover:text-gold transition-colors">Instrumentos</Link>
              <Link href="#promociones" onClick={() => setIsMenuOpen(false)} className="hover:text-gold transition-colors">Promociones</Link>
              <Link href="#contacto" onClick={() => setIsMenuOpen(false)} className="hover:text-gold transition-colors">Contacto</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
