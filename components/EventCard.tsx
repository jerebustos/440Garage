"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import Image from "next/image";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    event_date: string;
    time: string;
    location: string;
    description: string;
    image_url: string;
  };
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  // Format the date (e.g., from "2023-10-28" to "Sábado, 28 de Octubre")
  const formatDate = (dateString: string) => {
    try {
      // Create date by appending T00:00:00 to avoid timezone shift issues
      const date = new Date(`${dateString}T12:00:00`);
      
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      };
      
      const formatted = new Intl.DateTimeFormat('es-AR', options).format(date);
      // Capitalize first letter (e.g. "sábado, 28 de octubre" -> "Sábado, 28 de octubre")
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    } catch (e) {
      return dateString; // fallback to original string if error
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:border-gold/30 transition-colors"
    >
      <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-black/50">
        {event.image_url ? (
          <Image 
            src={event.image_url} 
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500">
            Sin foto
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 md:hidden"></div>
      </div>
      
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-white mb-4 font-heading">{event.title}</h3>
        
        <div className="flex flex-col gap-2 mb-4 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-gold" />
            <span className="capitalize">{formatDate(event.event_date)}</span>
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
        
        {event.description && (
          <p className="text-slate-300 font-light whitespace-pre-wrap">
            {event.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
