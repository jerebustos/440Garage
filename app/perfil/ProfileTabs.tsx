"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { updateProfile } from "@/app/actions/profileActions";
import { User, Package, Heart, CheckCircle, Clock, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileTabsProps {
  initialProfile: any;
  orders: any[];
  favorites: any[];
}

export default function ProfileTabs({ initialProfile, orders, favorites }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<"datos" | "pedidos" | "favoritos">("datos");
  
  // Profile Form State
  const [profile, setProfile] = useState(initialProfile || {
    first_name: "", last_name: "", dni_cuit: "", phone: "", address: "", city: "", state: "", zip_code: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMsg({ type: "", text: "" });
    const res = await updateProfile(profile);
    if (res.success) {
      setMsg({ type: "success", text: "Perfil actualizado correctamente." });
    } else {
      setMsg({ type: "error", text: res.error || "Error al actualizar." });
    }
    setIsSaving(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completado': return <span className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs uppercase font-bold"><CheckCircle size={14}/> Completado</span>;
      case 'cancelado': return <span className="flex items-center gap-1 text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs uppercase font-bold"><XCircle size={14}/> Cancelado</span>;
      default: return <span className="flex items-center gap-1 text-gold bg-gold/10 px-2 py-1 rounded text-xs uppercase font-bold"><Clock size={14}/> Pendiente</span>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar / Tabs Navigation */}
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
        <button 
          onClick={() => setActiveTab("datos")}
          className={`flex items-center gap-3 p-4 rounded-xl transition-all font-medium ${activeTab === "datos" ? "bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.2)]" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}
        >
          <User size={20} />
          Mis Datos
        </button>
        <button 
          onClick={() => setActiveTab("pedidos")}
          className={`flex items-center gap-3 p-4 rounded-xl transition-all font-medium ${activeTab === "pedidos" ? "bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.2)]" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}
        >
          <Package size={20} />
          Mis Pedidos
        </button>
        <button 
          onClick={() => setActiveTab("favoritos")}
          className={`flex items-center gap-3 p-4 rounded-xl transition-all font-medium ${activeTab === "favoritos" ? "bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.2)]" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}
        >
          <Heart size={20} />
          Favoritos
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
        <AnimatePresence mode="wait">
          
          {/* TAB: DATOS */}
          {activeTab === "datos" && (
            <motion.div key="datos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="text-2xl font-bold text-white mb-6 font-heading">Mis Datos Personales</h2>
              {msg.text && (
                <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${msg.type === 'success' ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/50' : 'bg-red-500/20 text-red-200 border border-red-500/50'}`}>
                  {msg.text}
                </div>
              )}
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Nombre</label>
                    <input type="text" name="first_name" value={profile.first_name || ""} onChange={handleProfileChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Apellido</label>
                    <input type="text" name="last_name" value={profile.last_name || ""} onChange={handleProfileChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">DNI / CUIT</label>
                    <input type="text" name="dni_cuit" value={profile.dni_cuit || ""} onChange={handleProfileChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Teléfono</label>
                    <input type="text" name="phone" value={profile.phone || ""} onChange={handleProfileChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-slate-400 mb-2">Dirección de Envío</label>
                    <input type="text" name="address" value={profile.address || ""} onChange={handleProfileChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Ciudad</label>
                    <input type="text" name="city" value={profile.city || ""} onChange={handleProfileChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Provincia</label>
                      <input type="text" name="state" value={profile.state || ""} onChange={handleProfileChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">CP</label>
                      <input type="text" name="zip_code" value={profile.zip_code || ""} onChange={handleProfileChange} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button type="submit" disabled={isSaving} className="bg-gold text-black font-bold px-8 py-3 rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-50">
                    {isSaving ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* TAB: PEDIDOS */}
          {activeTab === "pedidos" && (
            <motion.div key="pedidos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="text-2xl font-bold text-white mb-6 font-heading">Historial de Pedidos</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package size={48} className="mx-auto text-white/10 mb-4" />
                  <p className="text-slate-400">Aún no has realizado ninguna compra o solicitud.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-black/40 border border-white/10 rounded-xl p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
                        <div>
                          <div className="text-sm text-slate-400 mb-1">
                            Pedido del {new Date(order.created_at).toLocaleDateString('es-AR')}
                          </div>
                          <div className="font-mono text-xs text-white/30">ID: {order.id.split('-')[0]}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-slate-400">Total</div>
                            <div className="text-lg font-bold text-white">${Number(order.total_amount).toLocaleString('es-AR')}</div>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {order.order_items.map((item: any) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="relative w-12 h-12 bg-white rounded flex-shrink-0 overflow-hidden">
                              {item.products?.image_url && (
                                <Image src={item.products.image_url} alt={item.products.name} fill className="object-cover mix-blend-multiply" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">{item.products?.name || 'Producto no disponible'}</p>
                              <p className="text-xs text-gold uppercase tracking-widest">{item.products?.brand}</p>
                            </div>
                            <div className="text-sm text-slate-300">
                              {item.quantity} x ${Number(item.price_at_purchase).toLocaleString('es-AR')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB: FAVORITOS */}
          {activeTab === "favoritos" && (
            <motion.div key="favoritos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="text-2xl font-bold text-white mb-6 font-heading">Mis Favoritos</h2>
              
              {favorites.length === 0 ? (
                <div className="text-center py-12">
                  <Heart size={48} className="mx-auto text-white/10 mb-4" />
                  <p className="text-slate-400 mb-4">Aún no tienes productos favoritos.</p>
                  <Link href="/catalogo" className="inline-block border border-gold/50 text-gold px-6 py-2 rounded-lg hover:bg-gold hover:text-black transition-colors">
                    Explorar Catálogo
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.map((fav: any) => {
                    const p = fav.products;
                    if (!p) return null;
                    return (
                      <Link key={p.id} href={`/producto/${p.id}`} className="block group">
                        <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden transition-all hover:border-gold/50 h-full flex flex-col">
                          <div className="relative h-40 w-full bg-white flex-shrink-0">
                            {p.image_url ? (
                              <Image src={p.image_url} alt={p.name} fill className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-slate-500">Sin Imagen</div>
                            )}
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <div className="text-[10px] text-gold font-bold uppercase tracking-widest mb-1">{p.brand}</div>
                            <h3 className="text-sm text-white font-medium line-clamp-2 mb-2">{p.name}</h3>
                            <p className="text-slate-300 mt-auto font-bold">${Number(p.price).toLocaleString('es-AR')}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
