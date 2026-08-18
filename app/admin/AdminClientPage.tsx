"use client";

import React, { useState } from "react";
import { LayoutDashboard, LogOut, Database, FileSpreadsheet, Calendar, Package } from "lucide-react";
import ExcelImporter from "./ExcelImporter";
import ProductManager from "./ProductManager";
import EventManager from "./EventManager";
import OrderManager from "./OrderManager";
import { logout } from "@/app/actions/authActions";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'import' | 'events' | 'orders'>('catalog');

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="bg-white/5 border-b border-white/10 p-6 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="text-gold" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-white uppercase tracking-widest">
                Panel de <span className="text-gold">Control</span>
              </h1>
              <p className="text-slate-400 text-sm">Gestiona tu catálogo y eventos</p>
            </div>
          </div>
          
          <form action={logout}>
            <button 
              type="submit"
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-slate-400 hover:text-red-400 transition-colors px-4 py-2 rounded-lg hover:bg-red-500/10"
            >
              <LogOut size={16} /> Salir
            </button>
          </form>
        </div>
      </header>

      <div className="container mx-auto px-6 max-w-6xl pt-12 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-heading font-bold uppercase tracking-widest text-white mb-2">
              Administración
            </h1>
            <p className="text-slate-400 font-light text-lg">
              Gestioná tus productos, inventario y eventos de la comunidad.
            </p>
          </div>

          <div className="flex flex-wrap bg-white/5 border border-white/10 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                activeTab === 'catalog' 
                  ? 'bg-gold text-black' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Database size={16} />
              <span className="hidden sm:inline">Catálogo</span>
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                activeTab === 'import' 
                  ? 'bg-gold text-black' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileSpreadsheet size={16} />
              <span className="hidden sm:inline">Importar</span>
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                activeTab === 'events' 
                  ? 'bg-gold text-black' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar size={16} />
              <span className="hidden sm:inline">Eventos</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                activeTab === 'orders' 
                  ? 'bg-gold text-black' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Package size={16} />
              <span className="hidden sm:inline">Pedidos</span>
            </button>
          </div>
        </div>

        {activeTab === 'catalog' && <ProductManager />}
        {activeTab === 'import' && <ExcelImporter />}
        {activeTab === 'events' && <EventManager />}
        {activeTab === 'orders' && <OrderManager />}
      </div>
    </div>
  );
}
