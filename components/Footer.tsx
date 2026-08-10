"use client";
import React from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function Footer() {
  // Coordenadas de Santa Rosa, La Pampa, Argentina
  const position = { lat: -36.6167, lng: -64.2833 };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <img src="/logo.svg" alt="440Garage" className="w-48" />
          <p className="text-slate-400 text-lg">
            Queremos ayudarte a elegir tu instrumento inicial o dar el salto a uno profesional.
          </p>
          <div className="text-slate-300">
            <p className="font-bold">Dirección:</p>
            <p>Av. San Martin 519, L6300BBF</p>
            <p>Santa Rosa, La Pampa, Argentina</p>
          </div>
          <div className="mt-4 flex gap-4">
            {/* Placeholder para Redes Sociales */}
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
              Ig
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
              Fb
            </div>
          </div>
        </div>

        <div className="h-80 w-full rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center bg-slate-900">
          {/* 
            Temporalmente deshabilitado para evitar el error 'InvalidKeyMapError' en consola.
            Cuando tengas una API Key de Google Maps válida, puedes restaurar este código:
            
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "TU_API_KEY"}>
              <Map defaultCenter={position} defaultZoom={15} gestureHandling={"greedy"} disableDefaultUI={true}>
                <Marker position={position} />
              </Map>
            </APIProvider>
          */}
          <p className="text-slate-500 font-light">Mapa de Google (Requiere API Key)</p>
        </div>
      </div>
      <div className="mt-16 text-center text-slate-600 text-sm">
        &copy; {new Date().getFullYear()} 440Garage. Todos los derechos reservados.
      </div>
    </footer>
  );
}
