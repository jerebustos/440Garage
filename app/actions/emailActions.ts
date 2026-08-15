"use server";

import { Resend } from "resend";
import { QuoteEmailTemplate } from "@/components/EmailTemplates";
import { createClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendQuoteEmail(cartItems: any[], totalPrice: number, userEmail?: string) {
  try {
    let email = userEmail;

    // Si no se pasó email, intentar sacar del usuario autenticado
    if (!email) {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        email = user.email;
      }
    }

    if (!email) {
      return { success: false, error: "No se proporcionó un email válido y no hay sesión activa." };
    }

    const { data, error } = await resend.emails.send({
      // Para pruebas sin dominio verificado, Resend exige usar este remitente:
      from: "440Garage <onboarding@resend.dev>", 
      to: [email],
      subject: "Solicitud de Cotización - 440Garage",
      react: QuoteEmailTemplate({ customerEmail: email, cartItems, totalPrice }),
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
