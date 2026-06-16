import { v4 as uuidv4 } from 'uuid';

// In-memory data store
let products = [
  {
    id: uuidv4(),
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and studio-quality sound.',
    price: 299.99,
    category: 'Electronics',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Ergonomic Mechanical Keyboard',
    description: 'Compact TKL layout with Cherry MX switches, RGB backlighting, and aluminum frame for ultimate typing comfort.',
    price: 149.99,
    category: 'Electronics',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    createdAt: new Date('2024-01-20').toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 7-day battery life.',
    price: 199.99,
    category: 'Wearables',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    createdAt: new Date('2024-02-01').toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof 360° speaker with 24-hour playtime, built-in microphone, and deep bass performance.',
    price: 89.99,
    category: 'Electronics',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    createdAt: new Date('2024-02-10').toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Ultra-Wide Curved Monitor',
    description: '34-inch ultrawide QHD display with 144Hz refresh rate, 1ms response time, and HDR10 support.',
    price: 649.99,
    category: 'Electronics',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    createdAt: new Date('2024-02-15').toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Minimalist Leather Backpack',
    description: 'Genuine leather backpack with USB charging port, laptop compartment up to 15", and anti-theft design.',
    price: 129.99,
    category: 'Accessories',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    createdAt: new Date('2024-03-01').toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Standing Desk Converter',
    description: 'Height-adjustable desk riser with dual monitor support, cable management, and smooth pneumatic lift.',
    price: 249.99,
    category: 'Furniture',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop',
    createdAt: new Date('2024-03-10').toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Wireless Charging Pad',
    description: 'Fast 15W Qi wireless charger compatible with all Qi-enabled devices. Includes foreign object detection.',
    price: 39.99,
    category: 'Accessories',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    createdAt: new Date('2024-03-20').toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Smart Home Hub',
    description: 'Central hub for all your smart home devices. Supports Zigbee, Z-Wave, Wi-Fi, and Bluetooth protocols.',
    price: 119.99,
    category: 'Smart Home',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    createdAt: new Date('2024-04-01').toISOString(),
  },
];

// Model methods
export const findAll = () => products;

export const findById = (id) => products.find((p) => p.id === id);

export const create = (data) => {
  const product = {
    id: uuidv4(),
    ...data,
    createdAt: new Date().toISOString(),
  };
  products.push(product);
  return product;
};

export const update = (id, data) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...data, id, updatedAt: new Date().toISOString() };
  return products[index];
};

export const remove = (id) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
};

export const getCategories = () => [...new Set(products.map((p) => p.category))];
