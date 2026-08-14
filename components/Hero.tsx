"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative w-full h-[80vh] md:h-screen bg-black overflow-hidden flex items-center justify-center">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-0 pointer-events-none"></div>
      <div className="hero-text relative z-10 flex flex-col items-center justify-center text-white text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl font-bold tracking-widest max-w-5xl uppercase drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] text-gold mb-6"
        >
          TU MÚSICA, NUESTRA COMUNIDAD
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="mt-4 text-xl md:text-3xl font-light text-slate-200 tracking-wide max-w-3xl"
        >
          Instrumentos y equipamiento para darle vida a tus ideas y compartir con amigos.
        </motion.p>
      </div>
    </div>
  );
}
