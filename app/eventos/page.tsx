import React from "react";
import { getEvents } from "../actions/eventActions";
import EventCard from "@/components/EventCard"; // Use correct path alias
import Image from "next/image";

export default async function EventosPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="w-full relative h-[30vh] md:h-[45vh] mb-12 pt-20">
        <Image 
          src="/banner-eventos.jpg" 
          alt="Calendario de Eventos" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6">
        {events.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-slate-400 text-lg">Actualmente no hay eventos programados. ¡Volvé pronto!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {events.map((event: any, index: number) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
