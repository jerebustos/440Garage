"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createOrder(totalAmount: number, contactMethod: string, items: any[]) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 0. Recalcular precios desde la base de datos (seguridad)
    // Extraer los IDs de los productos solicitados
    const productIds = items.map(item => item.id);
    
    // Buscar los precios reales en la base de datos
    const { data: realProducts, error: productsError } = await supabase
      .from("products")
      .select("id, price, stock")
      .in("id", productIds);

    if (productsError || !realProducts) {
      throw new Error("Error al verificar los productos del catálogo.");
    }

    // Calcular el total real basado en los precios de la BD
    let realTotalAmount = 0;
    const orderItemsToInsert = [];

    for (const item of items) {
      const realProduct = realProducts.find(p => p.id === item.id);
      if (!realProduct) {
        throw new Error(`Producto no encontrado (ID: ${item.id})`);
      }
      
      // Multiplicar cantidad por el precio real
      realTotalAmount += realProduct.price * item.quantity;

      orderItemsToInsert.push({
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: realProduct.price // Usar precio real, NUNCA el del cliente
      });
    }

    // 1. Insertar la orden
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id || null,
        total_amount: realTotalAmount,
        contact_method: contactMethod,
        status: "pendiente"
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Insertar los items asignando el ID de la orden
    const finalOrderItems = orderItemsToInsert.map(item => ({
      ...item,
      order_id: order.id
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(finalOrderItems);

    if (itemsError) throw itemsError;

    revalidatePath("/perfil");
    return { success: true, orderId: order.id };
  } catch (error: any) {
    console.error("Order error:", error);
    return { success: false, error: error.message };
  }
}

export async function getMyOrders() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  // Hacer fetch de orders y sus items + datos del producto
  const { data } = await supabase
    .from("orders")
    .select(`
      *,
      order_items(
        id,
        quantity,
        price_at_purchase,
        products(name, image_url, brand)
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data || [];
}
