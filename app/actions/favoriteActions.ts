"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(productId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Debes iniciar sesión para agregar a favoritos" };
  }

  // Verificar si ya es favorito
  const { data: existing } = await supabase
    .from("user_favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (existing) {
    // Quitar
    const { error } = await supabase.from("user_favorites").delete().eq("id", existing.id);
    if (error) return { success: false, error: error.message };
  } else {
    // Agregar
    const { error } = await supabase.from("user_favorites").insert({ user_id: user.id, product_id: productId });
    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/catalogo");
  revalidatePath("/perfil");
  revalidatePath("/");
  return { success: true };
}

export async function getFavorites() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("user_favorites")
    .select("product_id")
    .eq("user_id", user.id);

  return data ? data.map(f => f.product_id) : [];
}
