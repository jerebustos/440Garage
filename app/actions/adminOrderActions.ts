"use server";

import { createClient, createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAllOrders() {
  const authClient = await createClient();

  // Verificar admin status (opcional pero recomendado)
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return { success: false, data: [] };

  const supabase = await createAdminClient();

  // Fetch orders sin join a user_profiles (porque la FK apunta a auth.users)
  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        id,
        quantity,
        price_at_purchase,
        products (name, brand, sku)
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin orders:", error);
    return { success: false, data: [] };
  }

  // Fetch profiles manualmente
  const userIds = orders?.map(o => o.user_id).filter(Boolean) || [];
  let finalData = orders || [];
  
  if (userIds.length > 0) {
    const { data: profiles } = await supabase
      .from("user_profiles")
      .select("id, first_name, last_name, phone, address, city, state, zip_code, dni_cuit")
      .in("id", userIds);

    // Obtener emails de auth.users usando permisos de administrador
    const { data: authData } = await supabase.auth.admin.listUsers();
    const authUsers = authData.users || [];

    finalData = finalData.map(order => {
      const authUser = authUsers.find(u => u.id === order.user_id);
      const profile = profiles?.find(p => p.id === order.user_id) || {};

      return {
        ...order,
        user_profiles: {
          ...profile,
          email: authUser?.email || null
        }
      };
    });
  }

  return { success: true, data: finalData };
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const authClient = await createClient();
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) return { success: false, error: "No autorizado" };

    const supabase = await createAdminClient();
    
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) throw error;

    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteOrder(orderId: string) {
  try {
    const authClient = await createClient();
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) return { success: false, error: "No autorizado" };

    const supabase = await createAdminClient();
    
    // Al borrar la orden, los order_items se borrarán en cascada si está configurado en supabase (ON DELETE CASCADE)
    // Si no, podemos forzar el borrado de order_items primero
    await supabase.from("order_items").delete().eq("order_id", orderId);
    
    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId);

    if (error) throw error;

    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
