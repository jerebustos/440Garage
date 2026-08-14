"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock } from "lucide-react";

export default function EventosPage() {
  const events = [
    {
      id: 1,
      title: "Jam Session - Blues & Rock",
      date: "Sábado, 28 de Octubre",
      time: "18:00 hs",
      location: "Vereda 440Garage (San Martin 519)",
      description: "Traé tu guitarra y unite a la zapada. Contamos con amplificadores y batería base armada.",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Masterclass: Set-up de Guitarra",
      date: "Viernes, 3 de Noviembre",
      time: "19:00 hs",
      location: "Interior 440Garage",
      description: "Aprende los secretos para calibrar tu guitarra eléctrica en casa con nuestro luthier residente.",
      image: "https://images.unsplash.com/photo-1555546252-78d10b809a47?auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Demo de Pedales Boutique",
      date: "Sábado, 11 de Noviembre",
      time: "17:30 hs",
      location: "Interior 440Garage",
      description: "Probamos en vivo las últimas novedades de pedales nacionales e internacionales. Sorteos al finalizar.",
      image: "https://images.unsplash.com/photo-1563330232-571147cb2321?auto=format&fit=crop&q=80",
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="mb-12 flex flex-col items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground tracking-widest uppercase mb-6 drop-shadow-sm">
          Calendario de <span className="text-gold">Eventos</span>
        </h1>
        <div className="w-24 h-1 bg-gold opacity-50"></div>
        <p className="mt-8 max-w-2xl text-slate-300 font-light text-lg">
          Música en vivo, clínicas, charlas y jam sessions. Enterate de todo lo que pasa en nuestra comunidad.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col gap-8">
          {events.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:border-gold/30 transition-colors"
            >
              <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 md:hidden"></div>
              </div>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-4 font-heading">{event.title}</h3>
                
                <div className="flex flex-col gap-2 mb-4 text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-gold" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gold" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gold" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <p className="text-slate-300 font-light line-clamp-2 md:line-clamp-none">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
