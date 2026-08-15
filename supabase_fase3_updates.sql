-- ==========================================
-- FASE 3: PERFILES Y PEDIDOS
-- Ejecutar en Supabase SQL Editor
-- ==========================================

-- 1. Crear tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  dni_cuit VARCHAR(50),
  phone VARCHAR(50),
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(20),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS en user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de user_profiles
CREATE POLICY "Usuarios pueden ver su propio perfil" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuarios pueden insertar su propio perfil" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Usuarios pueden actualizar su propio perfil" ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger para auto-crear perfil cuando un usuario se registra (opcional pero recomendado)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Eliminar si ya existe para recrearlo limpio
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==========================================

-- 2. Crear tabla de Pedidos (Orders)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pendiente', -- pendiente, completado, cancelado
  contact_method VARCHAR(50), -- whatsapp, email
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS en orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Políticas de orders
CREATE POLICY "Usuarios pueden ver sus propios pedidos" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden crear sus propios pedidos" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins pueden ver todos los pedidos" ON orders FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- ==========================================

-- 3. Crear tabla de Detalles de Pedido (Order Items)
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_at_purchase DECIMAL(12,2) NOT NULL
);

-- Habilitar RLS en order_items
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Políticas de order_items
-- El usuario puede ver items si el order_id le pertenece a él (haciendo join con orders)
CREATE POLICY "Usuarios pueden ver items de sus pedidos" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Usuarios pueden insertar items de sus pedidos" ON order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Admins pueden ver todos los items" ON order_items FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');
