"use server";

import { createClient, createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { eventSchema } from "@/lib/validations";

export async function getEvents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }
  return data;
}

export async function saveEvent(eventData: Record<string, unknown>) {
  const supabase = await createAdminClient();
  
  const parsed = eventSchema.safeParse(eventData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Datos inválidos" };
  }

  const { data, error } = await supabase
    .from("events")
    .upsert(parsed.data, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Error saving event:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/eventos");
  revalidatePath("/");
  return { success: true, data };
}

export async function deleteEvent(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  
  if (error) {
    return { success: false, error: error.message };
  }
  
  revalidatePath("/admin");
  revalidatePath("/eventos");
  revalidatePath("/");
  return { success: true };
}
