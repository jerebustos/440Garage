"use client";

import { useState } from "react";
import { login } from "@/app/actions/authActions";
import { Lock, Mail, Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8 w-full max-w-sm mx-auto">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-lg text-center font-medium">
          {error}
        </div>
      )}

      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gold text-black uppercase font-bold tracking-widest py-4 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
      >
        {isPending ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Ingresando...</span>
          </>
        ) : (
          "Ingresar al Panel"
        )}
      </button>
    </form>
  );
}
