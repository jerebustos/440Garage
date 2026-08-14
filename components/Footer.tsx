"use client";
import React from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function Footer() {
  // Coordenadas de Santa Rosa, La Pampa, Argentina
  const position = { lat: -36.6167, lng: -64.2833 };

  return (
    <footer id="contacto" className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <img src="/logo-new.png" alt="440Garage" className="w-48" />
          <p className="text-slate-400 text-lg">
            Queremos ayudarte a elegir tu instrumento inicial o dar el salto a uno profesional.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-slate-300">
            <div>
              <p className="font-bold text-white mb-1">Dirección:</p>
              <p>Av. San Martin 519, L6300BBF</p>
              <p>Santa Rosa, La Pampa</p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">Contacto:</p>
              <p>WhatsApp: +54 9 2954 39-6545</p>
              <p>Email: jorgerbustos@gmail.com</p>
            </div>
            <div className="sm:col-span-2">
              <p className="font-bold text-white mb-1">Horarios de Atención:</p>
              <p>Lunes a Viernes: 09:30 a 12:30 y 16:30 a 20:30</p>
              <p>Sábados: 09:30 a 13:00 | Domingo: Cerrado</p>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <a 
              href="https://www.instagram.com/440garage?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/440Garage/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-[#1877F2]"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a 
              href="https://wa.me/5492954396545?text=Hola!%20Vengo%20de%20la%20página%20web%20y%20quiero%20hacer%20una%20consulta." 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-[#25D366]"
              aria-label="WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a 
              href="mailto:jorgerbustos@gmail.com" 
              className="w-10 h-10 text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-gradient-to-r from-[#EA4335] to-[#D93025]"
              aria-label="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="h-80 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            src="https://maps.google.com/maps?q=Av.%20San%20Martin%20519,%20Santa%20Rosa,%20La%20Pampa,%20Argentina&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="Ubicación 440Garage en Google Maps"
            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </div>
      </div>
      <div className="mt-16 text-center text-slate-600 text-sm">
        &copy; {new Date().getFullYear()} 440Garage. Todos los derechos reservados.
      </div>
    </footer>
  );
}
