"use client";

import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/data/products";
import { Search, SlidersHorizontal, X } from "lucide-react";

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

  // Read URL params on mount (e.g. ?categoria=bateria)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("categoria");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, []);

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

  const Sidebar = () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-white font-heading font-bold text-xl uppercase mb-4 tracking-wider flex justify-between items-center">
          Filtros
          {(selectedCategory || selectedBrand) && (
            <button onClick={clearFilters} className="text-xs text-gold font-normal hover:underline normal-case">
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
                      // Allow unselecting category by clicking it again
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                    } else {
                      setSelectedCategory(cat);
                      setSelectedSubcategory(null);
                    }
                  }}
                  // Fix Next.js warning by using onClick instead of onChange for toggle ability on radios, or just a custom button.
                  // But standard radio works for selection. For toggle, we can just use the click handler.
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
                  onChange={() => setSelectedBrand(brand)}
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
      <div className="md:hidden flex justify-between items-center mb-4">
        <button 
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700"
        >
          <SlidersHorizontal size={18} /> Filtros
        </button>
        <span className="text-slate-400">{filteredProducts.length} resultados</span>
      </div>

      {/* Sidebar Desktop */}
      <aside className="hidden md:block w-64 flex-shrink-0 border-r border-slate-800 pr-8">
        <Sidebar />
      </aside>

      {/* Modal Sidebar Móvil */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[70] bg-black/80 flex">
          <div className="w-80 max-w-[80%] bg-background h-full p-6 border-r border-slate-800 overflow-y-auto">
            <div className="flex justify-end mb-6">
              <button onClick={() => setIsMobileFiltersOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <Sidebar />
          </div>
          <div className="flex-1" onClick={() => setIsMobileFiltersOpen(false)}></div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar (Search & Sort) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="relative w-full sm:w-72">
            <input 
              type="text" 
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-gold transition-colors"
            />
            <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="text-slate-400 hidden md:inline">{filteredProducts.length} resultados</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-gold w-full sm:w-auto"
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
          <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-slate-800 border-dashed">
            <p className="text-slate-400 text-lg">No encontramos productos que coincidan con tu búsqueda.</p>
            <button 
              onClick={clearFilters}
              className="mt-4 text-gold hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
