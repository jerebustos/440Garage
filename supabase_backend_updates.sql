-- 1. Crear tabla de favoritos
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Habilitar RLS en favoritos
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Políticas de favoritos (cada usuario maneja sus favoritos)
CREATE POLICY "Usuarios pueden ver sus propios favoritos" ON user_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden agregar favoritos" ON user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden eliminar sus favoritos" ON user_favorites FOR DELETE USING (auth.uid() = user_id);

-- 2. Crear tabla de Alertas del Admin
CREATE TABLE IF NOT EXISTS admin_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) NOT NULL, -- e.g., 'low_stock'
  message TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS en Alertas
ALTER TABLE admin_alerts ENABLE ROW LEVEL SECURITY;

-- Políticas de Alertas (Solo Admins)
CREATE POLICY "Admins pueden ver alertas" ON admin_alerts FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins pueden actualizar alertas" ON admin_alerts FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins pueden eliminar alertas" ON admin_alerts FOR DELETE USING (auth.jwt() ->> 'role' = 'admin');

-- 3. Crear Función y Trigger para Alerta de Stock
CREATE OR REPLACE FUNCTION check_low_stock()
RETURNS TRIGGER AS $$
BEGIN
  -- Si el stock baja a 0, insertar una alerta
  IF NEW.stock <= 0 AND OLD.stock > 0 THEN
    INSERT INTO admin_alerts (type, message, product_id)
    VALUES ('low_stock', 'El producto "' || NEW.name || '" se ha quedado sin stock.', NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Asegurarse de que no exista el trigger para evitar errores al re-ejecutar
DROP TRIGGER IF EXISTS product_stock_trigger ON products;

CREATE TRIGGER product_stock_trigger
AFTER UPDATE OF stock ON products
FOR EACH ROW
EXECUTE FUNCTION check_low_stock();
