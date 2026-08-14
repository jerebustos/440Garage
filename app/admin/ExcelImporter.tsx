"use client";

import React, { useState } from "react";
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ExcelImporter() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setMessage(null);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await fetch("/api/admin/import-catalog", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setFile(null); // Reset file on success
      } else {
        setMessage({ type: "error", text: data.error || "Error al subir el archivo" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Error de red o de servidor." });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-10">
      <div className="mb-10">
        <h2 className="text-2xl font-heading uppercase text-white tracking-widest mb-2">
          Importación <span className="text-gold">Masiva</span>
        </h2>
        <p className="text-slate-400 font-light text-sm mb-6">
          Sube tu archivo de Excel o CSV para actualizar el stock y los productos de la tienda de forma masiva.
        </p>
        <div>
          <a 
            href="/plantilla_productos.xlsx" 
            download 
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gold text-sm font-medium transition-colors"
          >
            <FileSpreadsheet size={16} />
            Descargar Plantilla Excel
          </a>
        </div>
      </div>

      {message && (
        <div className={`mb-8 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {message.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <p className="font-medium">{message.text}</p>
        </div>
      )}

      {/* Drag & Drop Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-colors duration-300 ${
          dragActive ? "border-gold bg-gold/5" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={isUploading}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
              setMessage(null);
            }
          }}
        />

        {!file ? (
          <>
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <UploadCloud size={40} className="text-gold" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-2">Arrastra tu archivo aquí</h3>
            <p className="text-slate-400 font-light mb-6">o haz clic para seleccionar un archivo de tu equipo</p>
            <div className="flex gap-4 text-xs font-mono text-slate-500 uppercase tracking-wider">
              <span className="bg-white/5 px-3 py-1 rounded">.CSV</span>
              <span className="bg-white/5 px-3 py-1 rounded">.XLSX</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6">
              <FileSpreadsheet size={40} className="text-gold" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">{file.name}</h3>
            <p className="text-slate-400 font-light mb-8">
              {(file.size / 1024).toFixed(2)} KB • Listo para procesar
            </p>
            <button 
              onClick={(e) => {
                e.preventDefault();
                handleUpload();
              }}
              disabled={isUploading}
              className="bg-gold text-black uppercase font-bold tracking-widest py-3 px-8 hover:bg-yellow-500 transition-colors z-20 relative disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Procesando...
                </>
              ) : (
                "Importar Productos"
              )}
            </button>
          </div>
        )}
      </motion.div>

      {/* Instructions */}
      <div className="mt-12 bg-white/[0.02] border border-white/5 rounded-xl p-6">
        <h3 className="text-sm font-medium text-white mb-4 uppercase tracking-widest flex items-center gap-2">
          <AlertCircle size={16} className="text-gold" />
          Requisitos del Formato
        </h3>
        <ul className="space-y-3 text-slate-300 font-light text-sm">
          <li className="flex items-start gap-3">
            <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
            <span>El archivo debe incluir las columnas: <strong>Nombre</strong>, <strong>Precio</strong> y <strong>Categoría</strong>.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
            <span>Los precios deben ser números sin símbolos de moneda.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
            <span>Opcional: <strong>SKU</strong>, <strong>Marca</strong>, <strong>Subcategoría</strong> e <strong>Imagen</strong> (link).</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
