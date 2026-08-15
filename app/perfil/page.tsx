import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import ProfileTabs from "./ProfileTabs";
import { getMyOrders } from "@/app/actions/orderActions";
import { getProfile } from "@/app/actions/profileActions";

export default async function PerfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch favoritos
  const { data: favorites } = await supabase
    .from("user_favorites")
    .select("product_id, products(id, name, price, image_url, brand)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch orders
  const orders = await getMyOrders();

  // Fetch profile
  const profile = await getProfile();

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-1">Mi Perfil</h1>
            <p className="text-slate-400">{user.email}</p>
          </div>
          <LogoutButton />
        </div>

        <ProfileTabs 
          initialProfile={profile} 
          orders={orders} 
          favorites={favorites || []} 
        />
      </div>
    </div>
  );
}
