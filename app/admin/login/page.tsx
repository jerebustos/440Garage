import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { checkIsAdmin } from "@/app/actions/authActions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Acceso Administrativo | Garage 440",
  description: "Iniciar sesión en el panel de control",
};

export default async function LoginPage() {
  const isAdmin = await checkIsAdmin();
  if (isAdmin) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-gold transition-colors mb-8 text-sm uppercase tracking-widest font-semibold">
          <ArrowLeft size={16} /> Volver a la tienda
        </Link>
        
        <div className="bg-white/5 border border-white/10 p-8 sm:p-12 rounded-2xl backdrop-blur-md shadow-2xl flex flex-col items-center">
          <h1 className="text-3xl font-heading font-bold uppercase tracking-widest text-white text-center">
            Garage <span className="text-gold">440</span>
          </h1>
          <p className="text-slate-400 mt-2 text-center text-sm uppercase tracking-wider">
            Acceso Administrativo
          </p>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
