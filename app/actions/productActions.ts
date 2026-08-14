"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data;
}

export async function saveProduct(productData: any) {
  const supabase = await createClient();
  
  // Si no tiene id, es uno nuevo, generamos SKU si hace falta
  if (!productData.id && !productData.sku) {
    productData.sku = `SKU-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  }

  const { data, error } = await supabase
    .from("products")
    .upsert(productData, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Error saving product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true, data };
}

export async function uploadProductImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "No file provided" };

    const supabase = await createClient();
    
    // Generar un nombre único para la imagen
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
    const filePath = `images/${fileName}`;

    const { data, error } = await supabase.storage
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
  } catch (error: any) {
    console.error("Error uploading image:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}
