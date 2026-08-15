"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createOrder(totalAmount: number, contactMethod: string, items: any[]) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Permitimos que continúe aunque no haya user (fallará por RLS, pero no bloquea el frontend)
    
    // 1. Insertar la orden
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id || null,
        total_amount: totalAmount,
        contact_method: contactMethod,
        status: "pendiente"
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Insertar los items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

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
