import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(255),
  description: z.string().optional(),
  price: z.coerce.number().positive("El precio debe ser mayor a 0"),
  stock: z.coerce.number().int().nonnegative("El stock no puede ser negativo"),
  category: z.string().min(1, "La categoría es requerida"),
  brand: z.string().optional(),
  sku: z.string().optional(),
  image_url: z.string().url("URL de imagen inválida").optional().or(z.literal("")),
  is_used: z.boolean().default(false),
  is_outlet: z.boolean().default(false),
});

export const eventSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, "El título debe tener al menos 3 caracteres").max(255),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  event_date: z.string().min(1, "La fecha es requerida"),
  event_time: z.string().optional(),
  location: z.string().min(1, "La ubicación es requerida"),
  image_url: z.string().url("URL de imagen inválida").optional().or(z.literal("")),
  is_active: z.boolean().default(true),
  ticket_url: z.string().url("URL de entrada inválida").optional().or(z.literal("")),
});

// Profile Schema
export const ProfileSchema = z.object({
  first_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").optional().or(z.literal("")),
  last_name: z.string().min(2, "El apellido debe tener al menos 2 caracteres").optional().or(z.literal("")),
  dni_cuit: z.string().min(7, "El DNI o CUIT debe ser válido").optional().or(z.literal("")),
  phone: z.string().min(6, "Teléfono inválido").optional().or(z.literal("")),
  address: z.string().min(4, "Dirección inválida").optional().or(z.literal("")),
  city: z.string().min(2, "Ciudad inválida").optional().or(z.literal("")),
  state: z.string().min(2, "Provincia inválida").optional().or(z.literal("")),
  zip_code: z.string().min(3, "Código postal inválido").optional().or(z.literal("")),
});
