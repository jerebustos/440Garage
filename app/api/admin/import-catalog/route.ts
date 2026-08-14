import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import * as xlsx from "xlsx";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Leer el archivo excel/csv
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Parsear la hoja a JSON
    const data = xlsx.utils.sheet_to_json(sheet);

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "El archivo está vacío o no se pudo leer" }, { status: 400 });
    }

    // Preparar el array de productos a insertar/actualizar
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productsToUpsert = data.map((row: any) => {
      // Normalizar nombres de columnas (pasar a minúsculas para facilitar)
      const normalizedRow: Record<string, any> = {};
      for (const key in row) {
        normalizedRow[key.toLowerCase().trim()] = row[key];
      }

      // Generar SKU si no viene en el excel (útil para empezar de cero)
      const sku = normalizedRow["sku"] || normalizedRow["código"] || `SKU-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      return {
        sku: sku.toString(),
        name: normalizedRow["nombre"] || normalizedRow["name"] || "Producto sin nombre",
        description: normalizedRow["descripción"] || normalizedRow["description"] || "",
        price: parseFloat(normalizedRow["precio"] || normalizedRow["price"] || "0"),
        stock: parseInt(normalizedRow["stock"] || normalizedRow["cantidad"] || "0", 10),
        image_url: normalizedRow["imagen"] || normalizedRow["image"] || normalizedRow["image_url"] || null,
      };
    });

    const supabase = await createClient();

    // Hacer upsert en Supabase basado en el SKU
    const { data: result, error } = await supabase
      .from("products")
      .upsert(productsToUpsert, { 
        onConflict: "sku",
        ignoreDuplicates: false 
      })
      .select();

    if (error) {
      console.error("Error de Supabase:", error);
      return NextResponse.json({ error: `Error en la base de datos: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Se procesaron ${productsToUpsert.length} productos correctamente.`,
      count: productsToUpsert.length
    });

  } catch (error: any) {
    console.error("Error procesando excel:", error);
    return NextResponse.json({ error: `Error interno: ${error.message}` }, { status: 500 });
  }
}
