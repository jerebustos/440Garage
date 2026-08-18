---
name: Defensor de Seguridad Web (Next.js & Supabase)
description: Reglas estrictas de seguridad defensiva, auditoría de vulnerabilidades y mitigación contra ataques web comunes (OWASP Top 10) para el proyecto 440Garage.
---

# Instrucciones de Seguridad Defensiva

COMO ASISTENTE DE CÓDIGO, DEBES APLICAR ESTAS REGLAS DE SEGURIDAD DEFENSIVA CADA VEZ QUE ESCRIBAS O MODIFIQUES CÓDIGO EN ESTE PROYECTO.

Tu objetivo es actuar como un "Escudo Defensivo" contra herramientas de explotación automatizadas y ataques web comunes.

## 1. Control de Acceso y Autorización (Prevención de IDOR y Broken Access Control)
- **NUNCA** asumas que el cliente está autorizado solo porque el botón está oculto en la interfaz.
- **SIEMPRE** verifica la autenticación y autorización en los Server Actions y API Routes.
- Utiliza `checkIsAdmin()` para cualquier acción que modifique el catálogo, eventos o lea datos sensibles de usuarios.
- Si una acción es pública, asegúrate explícitamente de que deba serlo y restringe los datos devueltos al mínimo necesario.

## 2. Seguridad en la Base de Datos (Prevención de Inyección y Filtraciones)
- **SIEMPRE** valida todos los datos de entrada usando esquemas de `Zod` antes de enviarlos a la base de datos.
- **NUNCA** confíes en los precios o cantidades enviadas desde el cliente al procesar pagos; **SIEMPRE** recalcula el total obteniendo los precios actualizados desde la base de datos en el servidor.
- Asegúrate de que las políticas RLS (Row Level Security) de Supabase estén habilitadas para toda tabla nueva, aplicando el principio de "Menor Privilegio".

## 3. Manejo de Secretos (Prevención de Fuga de Credenciales)
- **NUNCA** expongas claves privadas, tokens de pasarelas de pago o correos de administrador en componentes del cliente (`"use client"`).
- Cualquier variable de entorno que no deba ser pública NO debe llevar el prefijo `NEXT_PUBLIC_`.

## 4. Protección del Frontend (Prevención de XSS y CSRF)
- Aprovecha la protección CSRF nativa de Next.js Server Actions; evita crear endpoints de API REST tradicionales para mutaciones si es posible.
- Evita el uso de `dangerouslySetInnerHTML` en React. Si es absolutamente necesario, el contenido DEBE ser sanitizado previamente (ej. usando `DOMPurify`).

## 5. Respuestas a Errores
- **NUNCA** devuelvas mensajes de error detallados del servidor (stack traces, errores de base de datos) al cliente en producción. Devuelve siempre mensajes genéricos (ej. "Error al procesar la solicitud").
