"use client";

import React, { useState, useEffect } from "react";
import { getProducts, saveProduct, uploadProductImage, deleteProduct } from "@/app/actions/productActions";
import { Plus, Edit2, Trash2, Image as ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";


const INSTRUMENT_CATEGORIES: Record<string, string[]> = {
  "Instrumentos de Cuerda": ["Guitarras Eléctricas", "Guitarras Acústicas", "Bajos", "Ukeleles", "Violines"],
  "Pianos y Teclados": ["Pianos Digitales", "Sintetizadores", "Controladores MIDI", "Teclados de Acompañamiento"],
  "Percusión": ["Baterías Acústicas", "Baterías Electrónicas", "Platillos", "Redoblantes", "Percusión Latina"],
  "Audio Profesional": ["Interfaces de Audio", "Monitores de Estudio", "Micrófonos", "Auriculares", "Consolas"],
  "Amplificadores y Efectos": ["Amplificadores de Guitarra", "Amplificadores de Bajo", "Pedales de Efecto", "Pedaleras Multiefecto"],
  "Accesorios": ["Cables", "Cuerdas", "Púas", "Correas", "Soportes", "Fundas y Estuches"]
};

const COMMON_BRANDS = [
  "Fender", "Gibson", "Ibanez", "Yamaha", "Roland", "Korg", "Boss", "Marshall", 
  "Shure", "Audio-Technica", "Focusrite", "Pearl", "Zildjian", "Epiphone", 
  "Squier", "Cort", "Casio", "M-Audio", "Behringer", "Vox", "Orange", "Otra"
];

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    subcategory: "",
    price: 0,
    stock: 0,
    sku: "",
    description: "",
    image_url: "",
    is_used: false,
    is_outlet: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const handleOpenModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        category: product.category || "",
        subcategory: product.subcategory || "",
        price: product.price || 0,
        stock: product.stock || 0,
        sku: product.sku || "",
        description: product.description || "",
        image_url: product.image_url || "",
        is_used: !!product.is_used,
        is_outlet: !!product.is_outlet,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "", brand: "", category: "", subcategory: "",
        price: 0, stock: 0, sku: "", description: "", image_url: "",
        is_used: false, is_outlet: false,
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let finalImageUrl = formData.image_url;

      // Si el usuario seleccionó una imagen nueva, subirla primero
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        const uploadRes = await uploadProductImage(uploadData);
        if (uploadRes.success && uploadRes.url) {
          finalImageUrl = uploadRes.url;
        } else {
          alert("Error subiendo la imagen: " + uploadRes.error);
          setIsSaving(false);
          return;
        }
      }

      const productToSave: Record<string, any> = {
        ...formData,
        image_url: finalImageUrl,
      };
      if (editingProduct?.id) {
        productToSave.id = editingProduct.id;
      }

      const res = await saveProduct(productToSave);
      
      if (res.success) {
        setIsModalOpen(false);
        fetchProducts(); // recargar lista
      } else {
        alert("Error guardando el producto: " + res.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error inesperado al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro que querés eliminar este producto?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-heading uppercase text-white tracking-widest mb-2">
            Gestión de <span className="text-gold">Catálogo</span>
          </h2>
          <p className="text-slate-400 font-light text-sm">
            Añadí, editá o eliminá productos manualmente y subí sus fotos.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gold text-black uppercase font-bold tracking-widest py-2.5 px-6 hover:bg-yellow-500 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Nuevo
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-gold" size={40} />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-black/20 rounded-xl border border-white/5">
          <ImageIcon className="mx-auto text-slate-500 mb-4" size={48} />
          <h3 className="text-white text-lg font-medium mb-2">Catálogo Vacío</h3>
          <p className="text-slate-400 mb-6">No tenés ningún producto cargado todavía.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-300">
            <thead className="text-xs uppercase tracking-wider text-slate-500 bg-white/5">
              <tr>
                <th className="px-4 py-4 rounded-tl-lg">Foto</th>
                <th className="px-4 py-4">Producto</th>
                <th className="px-4 py-4">Marca / Categoría</th>
                <th className="px-4 py-4">Precio</th>
                <th className="px-4 py-4">Stock</th>
                <th className="px-4 py-4 rounded-tr-lg text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    {product.image_url ? (
                      <div className="relative w-12 h-12 rounded overflow-hidden bg-black/50 border border-white/10">
                        <Image src={product.image_url} alt={product.name} fill sizes="48px" className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded bg-black/50 border border-white/10 flex items-center justify-center text-slate-600">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{product.name}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">{product.sku}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">{product.brand || '-'}</div>
                    <div className="text-xs text-slate-400">{product.category} {product.subcategory ? `> ${product.subcategory}` : ''}</div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gold">
                    ${Number(product.price).toLocaleString('es-AR')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${(product.stock || 0) > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {product.stock || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(product)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-3xl my-8 relative flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0">
              <h3 className="text-xl font-heading uppercase text-white font-bold tracking-widest">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Columna 1: Info Básica */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Nombre</label>
                    <input 
                      type="text" required
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-gold outline-none transition-colors" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Precio ($)</label>
                      <input 
                        type="number" required min="0" step="0.01"
                        value={formData.price} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-gold outline-none transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Stock</label>
                      <input 
                        type="number" required min="0"
                        value={formData.stock} onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-gold outline-none transition-colors" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Marca</label>
                    <select 
                      value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-gold outline-none transition-colors appearance-none" 
                    >
                      <option value="">Selecciona una marca...</option>
                      {COMMON_BRANDS.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Categoría</label>
                      <select 
                        required
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: ""})}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-gold outline-none transition-colors appearance-none" 
                      >
                        <option value="">Selecciona...</option>
                        {Object.keys(INSTRUMENT_CATEGORIES).map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Subcategoría</label>
                      <select 
                        value={formData.subcategory} onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                        disabled={!formData.category}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-gold outline-none transition-colors appearance-none disabled:opacity-50" 
                      >
                        <option value="">Selecciona...</option>
                        {formData.category && INSTRUMENT_CATEGORIES[formData.category] ? (
                          INSTRUMENT_CATEGORIES[formData.category].map(sc => (
                            <option key={sc} value={sc}>{sc}</option>
                          ))
                        ) : null}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">SKU (Opcional)</label>
                    <input 
                      type="text" placeholder="Si se deja vacío, se auto-genera"
                      value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-slate-300 font-mono text-sm focus:border-gold outline-none transition-colors" 
                    />
                  </div>

                  <div className="flex gap-6 mt-2 bg-black/30 p-4 rounded-lg border border-white/5">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={formData.is_used} 
                          onChange={(e) => setFormData({...formData, is_used: e.target.checked})}
                          className="w-5 h-5 appearance-none border-2 border-slate-600 rounded bg-black/50 checked:bg-gold checked:border-gold transition-colors"
                        />
                        {formData.is_used && <div className="absolute w-2 h-3 border-r-2 border-b-2 border-black rotate-45 -mt-1"></div>}
                      </div>
                      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Instrumento Usado</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={formData.is_outlet} 
                          onChange={(e) => setFormData({...formData, is_outlet: e.target.checked})}
                          className="w-5 h-5 appearance-none border-2 border-slate-600 rounded bg-black/50 checked:bg-gold checked:border-gold transition-colors"
                        />
                        {formData.is_outlet && <div className="absolute w-2 h-3 border-r-2 border-b-2 border-black rotate-45 -mt-1"></div>}
                      </div>
                      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">En Outlet / Oferta</span>
                    </label>
                  </div>
                </div>

                {/* Columna 2: Foto y Descripción */}
                <div className="space-y-4 flex flex-col">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Foto del Producto</label>
                    
                    <div className="relative border-2 border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-black/30 hover:bg-black/50 transition-colors h-48 group">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setImageFile(e.target.files[0]);
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      
                      {imageFile ? (
                        <div className="absolute inset-0 p-2">
                          <div className="relative w-full h-full rounded-lg overflow-hidden border border-gold/50">
                            <Image src={URL.createObjectURL(imageFile)} alt="Preview" fill sizes="200px" className="object-cover" />
                          </div>
                        </div>
                      ) : formData.image_url ? (
                        <div className="absolute inset-0 p-2">
                          <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/20 group-hover:opacity-50 transition-opacity">
                            <Image src={formData.image_url} alt="Current" fill sizes="200px" className="object-cover" />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="bg-black/80 text-white text-xs px-3 py-1.5 rounded font-medium">Cambiar Foto</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="text-slate-500 mb-2" size={32} />
                          <span className="text-sm text-slate-400 font-medium">Haz clic o arrastra una imagen</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Descripción</label>
                    <textarea 
                      value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full flex-1 min-h-[120px] bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition-colors resize-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-4 shrink-0">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-lg text-white font-medium hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" disabled={isSaving}
                  className="bg-gold text-black uppercase font-bold tracking-widest py-2.5 px-8 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? <Loader2 className="animate-spin" size={18} /> : null}
                  {isSaving ? 'Guardando...' : 'Guardar Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import { Product } from '@/lib/types';
