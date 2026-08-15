"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LiveMusic() {
  return (
    <section className="py-24 px-6 md:px-12 bg-background border-t border-black/5 relative overflow-hidden">
      
      {/* Elementos decorativos adaptados para tema claro */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold font-mono tracking-widest text-sm uppercase mb-3 block">Comunidad 440</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground uppercase mb-6 drop-shadow-sm">
              La Música <br className="hidden md:block" /> Sale a la <span className="text-gold">Calle</span>
            </h2>
            <p className="text-slate-600 font-light text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              &quot;Creemos que la música en vivo es el corazón de nuestra cultura.&quot; Nuestra vereda se transforma en un escenario improvisado donde músicos locales comparten su arte. Únete a nuestras famosas &quot;Jam Sessions&quot; al aire libre.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/eventos" className="bg-gold text-white px-8 py-3 font-medium uppercase tracking-wider hover:bg-gold-600 transition-colors duration-300">
                Próximos Eventos
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Video Phone Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 w-full flex justify-center items-center z-10"
        >
          {/* Phone Frame */}
          <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center">
            {/* Notch */}
            <div className="absolute top-0 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>
            
            <video 
              src="/musica-calle.mp4"
              className="w-full h-full object-cover rounded-[2.5rem]"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
