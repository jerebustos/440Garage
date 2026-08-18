import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import * as xlsx from "xlsx";

import { checkIsAdmin } from "@/app/actions/authActions";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Check auth, verify user is admin
    const isAdmin = await checkIsAdmin();
    
    if (!isAdmin) {
      return NextResponse.json({ error: "No autorizado." }, { status: 403 });
    }

    // Parse formData to get the Excel file
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Parse Excel
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Extract JSON data
    // Expected headers: sku, name, description, price, stock, image_url
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Record<string, any>[] = xlsx.utils.sheet_to_json(sheet);
    
    if (data.length === 0) {
      return NextResponse.json({ error: "El archivo está vacío o mal formateado" }, { status: 400 });
    }

    // Upsert into Supabase products table
    const { data: upsertData, error } = await supabase
      .from("products")
      .upsert(
        data.map(item => ({
          sku: item.sku,
          name: item.name,
          description: item.description || null,
          price: parseFloat(item.price),
          stock: parseInt(item.stock, 10) || 0,
          image_url: item.image_url || null,
          updated_at: new Date().toISOString(),
        })),
        { onConflict: 'sku' } // Assuming sku is unique and we update if it exists
      );

    if (error) {
      console.error("Supabase upsert error:", error);
      return NextResponse.json({ error: "Error al actualizar la base de datos" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Se han procesado ${data.length} productos con éxito.` 
    });
    
  } catch (error: unknown) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
