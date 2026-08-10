import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  envConfig.split('\n').forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1]] = match[2].trim().replace(/^"|"$/g, '');
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// If we have a service role key we'd use that to bypass RLS, but ANON KEY is fine if INSERT RLS allows it (which the summary said was fixed)
const supabase = createClient(supabaseUrl, supabaseKey);

const mockProducts = [
  {
    name: 'Fender Stratocaster American Professional II',
    price: 1850000,
    image_url: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Gibson Les Paul Standard 50s',
    price: 3200000,
    image_url: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Yamaha Revstar Professional',
    price: 2100000,
    image_url: 'https://images.unsplash.com/photo-1514115456208-410a7019e061?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Batería Pearl Masters Maple Complete',
    price: 4500000,
    image_url: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=600&auto=format&fit=crop'
  }
];

async function seed() {
  console.log('Inserting mock products...');
  const { data, error } = await supabase
    .from('products')
    .insert(mockProducts)
    .select();

  if (error) {
    console.error('Error inserting products:', error);
  } else {
    console.log('Successfully inserted', data?.length, 'products!');
  }
}

seed();
