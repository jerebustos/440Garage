"use client";

import React, { useState } from "react";
import ExcelImporter from "./ExcelImporter";
import ProductManager from "./ProductManager";
import { Database, FileSpreadsheet } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'import'>('catalog');

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-heading font-bold uppercase tracking-widest text-white mb-2">
              Panel de <span className="text-gold">Administración</span>
            </h1>
            <p className="text-slate-400 font-light text-lg">
              Gestioná tus productos y actualizá el stock.
            </p>
          </div>

          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                activeTab === 'catalog' 
                  ? 'bg-gold text-black' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Database size={16} />
              Catálogo
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                activeTab === 'import' 
                  ? 'bg-gold text-black' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileSpreadsheet size={16} />
              Importación Excel
            </button>
          </div>
        </div>

        {activeTab === 'catalog' ? <ProductManager /> : <ExcelImporter />}
      </div>
    </div>
  );
}
