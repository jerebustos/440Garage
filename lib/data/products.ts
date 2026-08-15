export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  brand: string;
  subcategory?: string;
  stock?: number;
  is_used?: boolean;
  is_outlet?: boolean;
  sku?: string;
  description?: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Fender Stratocaster American Pro II",
    price: 1850000,
    image_url: "https://images.unsplash.com/photo-1564186763535-ebb55ef3dcb6?auto=format&fit=crop&q=80",
    category: "cuerdas",
    brand: "Fender",
  },
  {
    id: "2",
    name: "Gibson Les Paul Standard 50s",
    price: 2400000,
    image_url: "https://images.unsplash.com/photo-1550985543-f47f38aeea53?auto=format&fit=crop&q=80",
    category: "cuerdas",
    brand: "Gibson",
  },
  {
    id: "3",
    name: "Martin D-28 Acoustic",
    price: 3100000,
    image_url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80",
    category: "cuerdas",
    brand: "Martin",
  },
  {
    id: "4",
    name: "Yamaha YFL-222 Flute",
    price: 450000,
    image_url: "https://images.unsplash.com/photo-1582220107107-590dc8b0fa3f?auto=format&fit=crop&q=80",
    category: "vientos",
    brand: "Yamaha",
  },
  {
    id: "5",
    name: "Roland TD-17KVX V-Drums",
    price: 1650000,
    image_url: "https://images.unsplash.com/photo-1552055627-90924036bf64?auto=format&fit=crop&q=80",
    category: "bateria-percusion",
    brand: "Roland",
  },
  {
    id: "6",
    name: "Korg Minilogue XD",
    price: 650000,
    image_url: "https://images.unsplash.com/photo-1598516086829-14e99f14b62d?auto=format&fit=crop&q=80",
    category: "teclados-pianos",
    brand: "Korg",
  },
  {
    id: "7",
    name: "Shure SM58 Micrófono Dinámico",
    price: 150000,
    image_url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80",
    category: "microfonos-amplificadores",
    brand: "Shure",
  },
  {
    id: "8",
    name: "Boss DS-1 Distortion",
    price: 85000,
    image_url: "https://images.unsplash.com/photo-1621217688461-460d37e289f0?auto=format&fit=crop&q=80",
    category: "pedales-accesorios",
    brand: "Boss",
  },
  {
    id: "9",
    name: "Fender Blues Junior IV",
    price: 950000,
    image_url: "https://images.unsplash.com/photo-1585807955561-eb118e7e1a3b?auto=format&fit=crop&q=80",
    category: "microfonos-amplificadores",
    brand: "Fender",
  },
  {
    id: "10",
    name: "Cuerdas Ernie Ball Regular Slinky",
    price: 15000,
    image_url: "https://images.unsplash.com/photo-1555543048-c8d76a74daeb?auto=format&fit=crop&q=80",
    category: "accesorios-audio",
    brand: "Ernie Ball",
  },
  {
    id: "11",
    name: "Batería Mapex Venus",
    price: 850000,
    image_url: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80",
    category: "bateria-percusion",
    brand: "Mapex",
  },
  {
    id: "12",
    name: "Teclado Yamaha PSR-E373",
    price: 320000,
    image_url: "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80",
    category: "teclados-pianos",
    brand: "Yamaha",
  }
];
