"use client";

import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";

import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CatalogClientProps {
  products: Product[];
}

export default function CatalogClient({ products }: CatalogClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("recommended");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Extract unique categories, subcategories and brands
  const categoryTree = useMemo(() => {
    const tree: Record<string, Set<string>> = {};
    products.forEach(p => {
      if (p.category) {
        if (!tree[p.category]) tree[p.category] = new Set();
        if (p.subcategory) tree[p.category].add(p.subcategory);
      }
    });
    return tree;
  }, [products]);

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand).filter(Boolean))), [products]);

  const searchParams = useSearchParams();

  // Read URL params on mount or when they change (e.g. ?categoria=bateria)
  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat) {
      // Fixes cascading renders error while still initializing from URL
      setTimeout(() => setSelectedCategory(cat), 0);
    } else {
      setTimeout(() => setSelectedCategory(null), 0);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedSubcategory) {
      result = result.filter((p) => p.subcategory === selectedSubcategory);
    }
    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (sortBy === "price_asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, selectedCategory, selectedSubcategory, selectedBrand, sortBy]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedBrand(null);
    setSearchTerm("");
    // Limpiar URL si es necesario
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/catalogo');
    }
  };

  const renderSidebar = () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-white font-heading font-bold text-xl uppercase mb-4 tracking-wider flex justify-between items-center">
          Filtros
          {(selectedCategory || selectedBrand) && (
            <button aria-label="Limpiar filtros" onClick={clearFilters} className="text-xs text-gold font-normal hover:underline normal-case">
              Limpiar
            </button>
          )}
        </h3>
        <div className="w-12 h-[2px] bg-gold mb-6"></div>
      </div>

      <div>
        <h4 className="text-slate-200 font-semibold mb-3">Categorías</h4>
        <div className="flex flex-col gap-3">
          {Object.entries(categoryTree).map(([cat, subcats]) => (
            <div key={cat} className="flex flex-col gap-1">
              <label className="flex items-center gap-3 text-slate-400 hover:text-white cursor-pointer transition-colors">
                <input 
                  type="radio" 
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => {
                    if (selectedCategory === cat) {
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                    } else {
                      setSelectedCategory(cat);
                      setSelectedSubcategory(null);
                    }
                  }}
                  onClick={(e) => {
                    if (selectedCategory === cat) {
                      e.preventDefault();
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                    }
                  }}
                  className="w-4 h-4 accent-gold"
                />
                <span className={`capitalize ${selectedCategory === cat ? 'text-white font-medium' : ''}`}>
                  {cat.replace("-", " ")}
                </span>
              </label>

              {/* Subcategorías */}
              {selectedCategory === cat && Array.from(subcats).length > 0 && (
                <div className="ml-7 flex flex-col gap-2 mt-2 border-l-2 border-white/5 pl-4">
                  {Array.from(subcats).map(sub => (
                    <label key={sub} className="flex items-center gap-2 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors text-sm">
                      <input 
                        type="radio" 
                        name="subcategory"
                        checked={selectedSubcategory === sub}
                        onChange={() => setSelectedSubcategory(sub)}
                        onClick={(e) => {
                          if (selectedSubcategory === sub) {
                            e.preventDefault();
                            setSelectedSubcategory(null);
                          }
                        }}
                        className="w-3.5 h-3.5 accent-gold"
                      />
                      <span className={`${selectedSubcategory === sub ? 'text-gold font-medium' : ''}`}>
                        {sub}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-slate-200 font-semibold mb-3">Marcas</h4>
        <div className="flex flex-col gap-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 text-slate-400 hover:text-white cursor-pointer transition-colors">
                <input 
                  type="radio" 
                  name="brand"
                  checked={selectedBrand === brand}
                  onChange={() => setSelectedBrand(brand || null)}
                  onClick={(e) => {
                    if (selectedBrand === brand) {
                      e.preventDefault();
                      setSelectedBrand(null);
                    }
                  }}
                  className="w-4 h-4 accent-gold"
                />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-10">
      
      {/* Botón de filtros móvil */}
      <div className="md:hidden flex justify-between items-center mb-6">
        <button 
          aria-label="Filtros"
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 text-white bg-white/5 border border-white/10 px-4 py-2 rounded-lg"
        >
          <SlidersHorizontal size={18} />
          <span className="font-medium tracking-wide">Filtros</span>
        </button>
        <span className="text-slate-400">{filteredProducts.length} resultados</span>
      </div>

      {/* Sidebar Desktop */}
      <aside className="hidden md:block w-64 flex-shrink-0 border-r border-slate-800 pr-8">
        {renderSidebar()}
      </aside>

      {/* Modal Sidebar Móvil Animado */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 flex"
          >
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-80 max-w-[80%] bg-background h-full p-6 border-r border-slate-800 overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h3 className="text-white font-heading font-bold text-xl uppercase tracking-wider">Filtros</h3>
                <button aria-label="Cerrar filtros" onClick={() => setIsMobileFiltersOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              {renderSidebar()}
            </motion.div>
            <div className="flex-1" onClick={() => setIsMobileFiltersOpen(false)}></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar (Search & Sort) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex-1 max-w-md relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-gold transition-colors" size={20} />
            <input
              type="text"
              aria-label="Buscar productos"
              placeholder="Buscar modelos, marcas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="text-slate-400 hidden md:inline">{filteredProducts.length} resultados</span>
            <select 
              aria-label="Ordenar productos"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-background border border-white/10 text-slate-300 py-3 px-4 rounded-full focus:outline-none focus:border-gold/50 appearance-none min-w-[160px] cursor-pointer"
            >
              <option value="recommended">Recomendados</option>
              <option value="price_asc">Menor precio</option>
              <option value="price_desc">Mayor precio</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.image_url}
                brand={product.brand}
                is_used={product.is_used}
                is_outlet={product.is_outlet}
                stock={product.stock}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 px-6 bg-white/[0.02] rounded-2xl border border-white/5 text-center"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Music size={40} className="text-slate-500" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-2 tracking-wide">Sin Resultados</h3>
            <p className="text-slate-400 text-lg max-w-md mb-8">
              No encontramos ningún instrumento que coincida con tu búsqueda actual. Probá ajustando los filtros.
            </p>
            <button 
              onClick={clearFilters}
              className="bg-gold text-black font-semibold px-8 py-3 rounded-lg hover:bg-gold-400 transition-colors"
            >
              Limpiar todos los filtros
            </button>
          </motion.div>
        )}
      </div>

    </div>
  );
}
import { Product } from '@/lib/types';
