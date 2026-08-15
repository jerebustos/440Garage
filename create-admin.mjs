import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Cargar las variables de entorno manualmente para el script
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envConfig = fs.readFileSync(envLocalPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1]] = match[2];
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Faltan las variables de entorno de Supabase en .env.local.");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  const email = "admin@440garage.com";
  const password = "Garage440!Admin";

  console.log(`Creando usuario administrador: ${email}...`);

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true, // Auto confirmar
  });

  if (error) {
    if (error.message.includes("User already registered")) {
      console.log("El usuario ya existe. Modificando contraseña para asegurar acceso...");
      
      // Update existing user
      const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
      const existingUser = usersData.users.find(u => u.email === email);
      
      if (existingUser) {
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
          existingUser.id,
          { password: password }
        );
        if (updateError) {
          console.error("Error al actualizar la contraseña:", updateError);
        } else {
          console.log("Contraseña del usuario existente actualizada con éxito.");
        }
      }
    } else {
      console.error("Error creando el usuario:", error.message);
    }
  } else {
    console.log("¡Usuario creado con éxito!");
    console.log("ID del usuario:", data.user.id);
  }
}

main();
