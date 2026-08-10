---
name: tienda-instrumentos-stack
description: Reglas principales de arquitectura y diseño para el e-commerce de instrumentos musicales. Úsalo siempre que vayas a crear o modificar componentes, base de datos o lógica de negocio.
---

# Skill: Arquitectura de Tienda de Instrumentos

## Reglas de Interfaz (UI/UX)
- **Visuales**: La web debe ser 90% visual y cinematográfica. No uses diseños genéricos.
- **Animaciones**: Implementa "scroll-driven animations" fluidas. 
- **Estilo**: Usa Tailwind CSS con un enfoque vanguardista, moderno y premium, ideal para vender instrumentos musicales.

## Reglas de Backend y Base de Datos
- **Stack**: Usa estrictamente Next.js (App Router) y Supabase.
- **Catálogo Dinámico**: Todo producto o promoción debe consultarse directamente desde las tablas de Supabase.
- **Seguridad RLS**: Mantén políticas estrictas (Row Level Security) en Supabase para que solo el rol administrador pueda alterar el inventario o los precios.

## Funcionalidades Críticas
- **Panel Excel**: Las actualizaciones masivas de precios se harán mediante la lectura de un archivo Excel (`.xlsx`), parseado en un Route Handler de Next.js (`/api/upload`) que ejecutará un upsert en Supabase.
- **Ubicación**: Integra un mapa de Google Maps apuntando a la tienda física en Santa Rosa, La Pampa.
