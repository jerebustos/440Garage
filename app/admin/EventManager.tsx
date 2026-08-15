"use client";

import React, { useState, useEffect } from "react";
import { getEvents, saveEvent, deleteEvent } from "../actions/eventActions";
import { uploadProductImage } from "../actions/productActions"; // Reusing the image upload function
import { Trash2, Edit, Plus, Image as ImageIcon, Save, X, Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  event_date: string;
  time: string;
  location: string;
  description: string;
  image_url: string;
}

export default function EventManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    event_date: "",
    time: "",
    location: "",
    description: "",
    image_url: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEvents();
  }, []);

  const openModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title || "",
        event_date: event.event_date || "",
        time: event.time || "",
        location: event.location || "",
        description: event.description || "",
        image_url: event.image_url || ""
      });
      setPreviewUrl(event.image_url || null);
    } else {
      setEditingEvent(null);
      setFormData({
        title: "",
        event_date: "",
        time: "",
        location: "",
        description: "",
        image_url: ""
      });
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      let finalImageUrl = formData.image_url;
      
      // Upload new image if selected
      if (selectedFile) {
        const fileData = new FormData();
        fileData.append("file", selectedFile);
        const uploadResult = await uploadProductImage(fileData);
        
        if (uploadResult.success && uploadResult.url) {
          finalImageUrl = uploadResult.url;
        } else {
          alert("Error subiendo la imagen: " + uploadResult.error);
          setIsSaving(false);
          return;
        }
      }
      
      const eventToSave = {
        ...(editingEvent ? { id: editingEvent.id } : {}),
        ...formData,
        image_url: finalImageUrl
      };
      
      const result = await saveEvent(eventToSave);
      
      if (result.success) {
        alert("Evento guardado con éxito");
        fetchEvents();
        closeModal();
      } else {
        alert("Error guardando el evento: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error inesperado al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que querés eliminar este evento?")) {
      try {
        const result = await deleteEvent(id);
        if (result.success) {
          fetchEvents();
        } else {
          alert("Error eliminando: " + result.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
          <Calendar className="text-gold" size={24} />
          Gestor de Eventos
        </h2>
        <button
          onClick={() => openModal()}
          className="bg-gold text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gold/90 transition-colors"
        >
          <Plus size={16} />
          Nuevo Evento
        </button>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-black/20 rounded-lg border border-dashed border-white/10">
          <p className="text-slate-400">No hay eventos cargados aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-black/40 border border-white/10 rounded-lg overflow-hidden group">
              <div className="h-40 w-full relative bg-zinc-800">
                {event.image_url ? (
                  <Image src={event.image_url} alt={event.title} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500">Sin foto</div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => openModal(event)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-400 backdrop-blur-sm">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white mb-2 line-clamp-1">{event.title}</h3>
                <div className="flex flex-col gap-1 text-sm text-slate-400">
                  <div className="flex items-center gap-2"><Calendar size={14} className="text-gold" /> {event.event_date}</div>
                  <div className="flex items-center gap-2"><Clock size={14} className="text-gold" /> {event.time}</div>
                  <div className="flex items-center gap-2"><MapPin size={14} className="text-gold" /> <span className="line-clamp-1">{event.location}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h3 className="font-bold text-lg text-white">{editingEvent ? "Editar Evento" : "Nuevo Evento"}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white p-1">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nombre del Evento *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-gold/50"
                  />
                </div>
                
                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Fecha (YYYY-MM-DD) *</label>
                  <input
                    type="date"
                    required
                    value={formData.event_date}
                    onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-gold/50"
                  />
                </div>
                
                {/* Time */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Horario *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: 18:00 hs"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-gold/50"
                  />
                </div>
                
                {/* Location */}
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ubicación *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Vereda 440Garage (San Martin 519)"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-gold/50"
                  />
                </div>
                
                {/* Description */}
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Descripción</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-gold/50 resize-none"
                  />
                </div>
                
                {/* Image Upload */}
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Foto / Flyer</label>
                  <div className="flex gap-4 items-center">
                    <div className="w-24 h-24 bg-black/50 border border-white/10 rounded-lg overflow-hidden flex items-center justify-center relative shrink-0">
                      {previewUrl ? (
                        <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                      ) : (
                        <ImageIcon className="text-slate-500" size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        id="event-image"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <label 
                        htmlFor="event-image"
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg text-sm cursor-pointer inline-block transition-colors"
                      >
                        Subir nueva imagen
                      </label>
                      <p className="text-xs text-slate-500 mt-2">Recomendado: formato cuadrado u horizontal (JPG/PNG).</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 transition-colors"
                  disabled={isSaving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-gold text-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-gold/90 transition-colors flex items-center gap-2"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save size={16} />
                  )}
                  {isSaving ? "Guardando..." : "Guardar Evento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
