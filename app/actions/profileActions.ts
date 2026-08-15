"use server";

import { createClient } from "@/lib/supabase/server";
import { ProfileSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
}

export async function updateProfile(formData: any) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Debes iniciar sesión para editar tu perfil" };
    }

    // Validar con Zod
    const validatedData = ProfileSchema.parse(formData);

    // Upsert
    const { error } = await supabase
      .from("user_profiles")
      .upsert({
        id: user.id,
        ...validatedData,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;

    revalidatePath("/perfil");
    return { success: true };
  } catch (error: any) {
    if (error.errors) {
      // Zod error
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: error.message };
  }
}
