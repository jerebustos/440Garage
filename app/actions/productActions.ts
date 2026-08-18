"use server";

import { createClient, createAdminClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { productSchema } from "@/lib/validations";
import { checkIsAdmin } from "@/app/actions/authActions";

// Cliente público sin acceso a cookies para permitir el caché estático
const getPublicClient = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

export const getProducts = unstable_cache(
  async (category?: string, searchQuery?: string) => {
    const supabase = getPublicClient();
    let query = supabase.from("products").select("*").order("created_at", { ascending: false });
    
    if (category) {
      query = query.eq("category", category);
    }

    if (searchQuery) {
      query = query.ilike("name", `%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }
    return data;
  },
  ["products-cache"],
  { tags: ["products"], revalidate: 3600 }
);

export async function getProductById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
  return data;
}

export async function saveProduct(productData: Record<string, unknown>) {
  // Verificar autenticación primero
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return { success: false, error: "No autorizado. Debes ser administrador." };
  }

  // Usamos el cliente de admin para saltar las reglas de RLS temporalmente
  const supabase = await createAdminClient();
  
  // Validación Zod
  const parsed = productSchema.safeParse(productData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Datos inválidos" };
  }
  
  const validData = parsed.data;

  // Si no tiene id, es uno nuevo, generamos SKU si hace falta
  if (!validData.id && !validData.sku) {
    validData.sku = `SKU-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  }

  const { data, error } = await supabase
    .from("products")
    .upsert(validData, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Error saving product:", error);
    return { success: false, error: error.message };
  }

  // @ts-expect-error Next.js 16 typing
  revalidateTag("products");
  revalidatePath("/admin");
  return { success: true, data };
}

export async function uploadProductImage(formData: FormData) {
  try {
    // Verificar autenticación
    const isAdmin = await checkIsAdmin();
    if (!isAdmin) {
      return { success: false, error: "No autorizado. Debes ser administrador." };
    }

    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "No file provided" };

    const supabase = await createAdminClient();
    
    // Generar un nombre único para la imagen
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
    const filePath = `images/${fileName}`;

    const { error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error("Storage upload error:", error);
      return { success: false, error: error.message };
    }

    // Obtener la URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function deleteProduct(id: string) {
  // Verificar autenticación
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return { success: false, error: "No autorizado. Debes ser administrador." };
  }

  const supabase = await createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  
  // @ts-expect-error Next.js 16 typing
  revalidateTag("products");
  revalidatePath("/admin");
  return { success: true };
}
