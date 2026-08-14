import React from "react";

export default function ParallaxDivider() {
  return (
    <section 
      className="relative w-full h-[40vh] min-h-[300px] bg-fixed bg-center bg-cover flex items-center justify-center overflow-hidden border-y border-white/10"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550985543-f47f38aeea53?q=80&w=2000&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase tracking-widest drop-shadow-lg">
          El Arte en <span className="text-gold">Tus Manos</span>
        </h2>
        <div className="w-16 h-1 bg-gold mx-auto mt-6 opacity-75"></div>
      </div>
    </section>
  );
}
