"use client";

import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "@/app/actions/adminOrderActions";
import { ChevronDown, ChevronUp, Package, Clock, CheckCircle, XCircle, User, Mail, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OrderManager() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await getAllOrders();
    if (res.success) {
      setOrders(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const res = await updateOrderStatus(orderId, newStatus);
    if (res.success) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } else {
      alert("Error al actualizar el estado");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completado': return <span className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-xs uppercase font-bold"><CheckCircle size={14}/> Completado</span>;
      case 'cancelado': return <span className="flex items-center gap-1 text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs uppercase font-bold"><XCircle size={14}/> Cancelado</span>;
      default: return <span className="flex items-center gap-1 text-gold bg-gold/10 px-2 py-1 rounded text-xs uppercase font-bold"><Clock size={14}/> Pendiente</span>;
    }
  };

  if (loading) {
    return <div className="text-white text-center py-12">Cargando pedidos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white font-heading">Gestión de Pedidos</h2>
        <div className="text-sm text-slate-400">Total: {orders.length} pedidos</div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <Package className="mx-auto text-white/20 mb-4" size={48} />
          <p className="text-slate-400">No hay pedidos registrados en el sistema.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;
            const profile = order.user_profiles || {};

            return (
              <div key={order.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                {/* Header / Summary */}
                <div 
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-black/50 p-3 rounded-lg">
                      <Package className="text-gold" size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">
                        ${Number(order.total_amount).toLocaleString('es-AR')}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <span>ID: {order.id.split('-')[0]}</span>
                        <span>•</span>
                        <span>{new Date(order.created_at).toLocaleString('es-AR')}</span>
                        <span>•</span>
                        <span className="uppercase text-gold font-bold">{order.contact_method}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-between md:justify-end">
                    {getStatusBadge(order.status)}
                    <button className="text-slate-400 hover:text-white">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/10 bg-black/30"
                    >
                      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* Left Col: User Data */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-white/10 pb-2">
                            Datos del Cliente
                          </h3>
                          
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <User className="text-slate-500 mt-0.5" size={16} />
                              <div>
                                <div className="text-sm text-white font-medium">
                                  {profile.first_name || profile.last_name 
                                    ? `${profile.first_name || ''} ${profile.last_name || ''}` 
                                    : "Nombre no registrado"}
                                </div>
                                {profile.dni_cuit && <div className="text-xs text-slate-400">DNI/CUIT: {profile.dni_cuit}</div>}
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Mail className="text-slate-500 mt-0.5" size={16} />
                              <div className="text-sm text-white">{profile.email || "Email no registrado"}</div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Phone className="text-slate-500 mt-0.5" size={16} />
                              <div className="text-sm text-white">{profile.phone || "Teléfono no registrado"}</div>
                            </div>

                            <div className="flex items-start gap-3">
                              <MapPin className="text-slate-500 mt-0.5" size={16} />
                              <div>
                                <div className="text-sm text-white">{profile.address || "Dirección no registrada"}</div>
                                {(profile.city || profile.state || profile.zip_code) && (
                                  <div className="text-xs text-slate-400">
                                    {profile.city}, {profile.state} ({profile.zip_code})
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 mt-4 border-t border-white/10">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cambiar Estado</label>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleStatusChange(order.id, 'pendiente')}
                                className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${order.status === 'pendiente' ? 'bg-gold text-black' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                              >
                                Pendiente
                              </button>
                              <button 
                                onClick={() => handleStatusChange(order.id, 'completado')}
                                className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${order.status === 'completado' ? 'bg-emerald-500 text-black' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                              >
                                Completado
                              </button>
                              <button 
                                onClick={() => handleStatusChange(order.id, 'cancelado')}
                                className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${order.status === 'cancelado' ? 'bg-red-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Right Col: Order Items */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest border-b border-white/10 pb-2">
                            Detalle del Pedido
                          </h3>
                          
                          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {order.order_items?.map((item: any) => (
                              <div key={item.id} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                                <div className="flex-1 min-w-0 pr-4">
                                  <div className="text-sm text-white font-medium truncate">
                                    {item.products?.name || "Producto no encontrado"}
                                  </div>
                                  <div className="text-xs text-slate-400">
                                    {item.products?.brand} {item.products?.sku ? `| SKU: ${item.products.sku}` : ''}
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <div className="text-sm text-white font-bold">
                                    {item.quantity}x ${Number(item.price_at_purchase).toLocaleString('es-AR')}
                                  </div>
                                  <div className="text-xs text-gold font-bold">
                                    ${(item.quantity * Number(item.price_at_purchase)).toLocaleString('es-AR')}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
