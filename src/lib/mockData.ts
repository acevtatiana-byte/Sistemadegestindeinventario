export interface Product {
  id: string;
  barcode: string;
  name: string;
  quantity: number;
  expiryDate: string;
  purchasePrice: number;
  salePrice: number;
  category: string;
}

export interface Sale {
  id: string;
  date: string;
  products: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    barcode: "7501234567890",
    name: "Coca Cola 600ml",
    quantity: 45,
    expiryDate: "2025-12-15",
    purchasePrice: 12.5,
    salePrice: 18.0,
    category: "Bebidas",
  },
  {
    id: "2",
    barcode: "7501234567891",
    name: "Sabritas Original 45g",
    quantity: 8,
    expiryDate: "2025-06-20",
    purchasePrice: 8.0,
    salePrice: 14.0,
    category: "Snacks",
  },
  {
    id: "3",
    barcode: "7501234567892",
    name: "Leche Lala 1L",
    quantity: 2,
    expiryDate: "2025-01-10",
    purchasePrice: 18.0,
    salePrice: 25.0,
    category: "Lácteos",
  },
  {
    id: "4",
    barcode: "7501234567893",
    name: "Pan Bimbo Blanco",
    quantity: 25,
    expiryDate: "2024-12-05",
    purchasePrice: 30.0,
    salePrice: 42.0,
    category: "Panadería",
  },
  {
    id: "5",
    barcode: "7501234567894",
    name: "Aceite 1-2-3 900ml",
    quantity: 15,
    expiryDate: "2026-03-15",
    purchasePrice: 35.0,
    salePrice: 48.0,
    category: "Abarrotes",
  },
  {
    id: "6",
    barcode: "7501234567895",
    name: "Arroz Verde Valle 1kg",
    quantity: 30,
    expiryDate: "2026-08-20",
    purchasePrice: 20.0,
    salePrice: 28.0,
    category: "Abarrotes",
  },
  {
    id: "7",
    barcode: "7501234567896",
    name: "Frijoles La Sierra 1kg",
    quantity: 5,
    expiryDate: "2026-05-15",
    purchasePrice: 22.0,
    salePrice: 32.0,
    category: "Abarrotes",
  },
  {
    id: "8",
    barcode: "7501234567897",
    name: "Jabón Zote 200g",
    quantity: 40,
    expiryDate: "2027-01-01",
    purchasePrice: 12.0,
    salePrice: 18.0,
    category: "Limpieza",
  },
];

export const mockSales: Sale[] = [
  {
    id: "1",
    date: "2024-11-22",
    products: [
      { productId: "1", name: "Coca Cola 600ml", quantity: 3, price: 18.0 },
      { productId: "2", name: "Sabritas Original 45g", quantity: 2, price: 14.0 },
    ],
    total: 82.0,
  },
  {
    id: "2",
    date: "2024-11-22",
    products: [
      { productId: "3", name: "Leche Lala 1L", quantity: 1, price: 25.0 },
      { productId: "4", name: "Pan Bimbo Blanco", quantity: 1, price: 42.0 },
    ],
    total: 67.0,
  },
  {
    id: "3",
    date: "2024-11-21",
    products: [
      { productId: "5", name: "Aceite 1-2-3 900ml", quantity: 1, price: 48.0 },
    ],
    total: 48.0,
  },
  {
    id: "4",
    date: "2024-11-21",
    products: [
      { productId: "1", name: "Coca Cola 600ml", quantity: 5, price: 18.0 },
      { productId: "8", name: "Jabón Zote 200g", quantity: 2, price: 18.0 },
    ],
    total: 126.0,
  },
  {
    id: "5",
    date: "2024-11-20",
    products: [
      { productId: "6", name: "Arroz Verde Valle 1kg", quantity: 2, price: 28.0 },
      { productId: "7", name: "Frijoles La Sierra 1kg", quantity: 1, price: 32.0 },
    ],
    total: 88.0,
  },
  {
    id: "6",
    date: "2024-11-19",
    products: [
      { productId: "1", name: "Coca Cola 600ml", quantity: 4, price: 18.0 },
      { productId: "2", name: "Sabritas Original 45g", quantity: 3, price: 14.0 },
    ],
    total: 114.0,
  },
  {
    id: "7",
    date: "2024-11-18",
    products: [
      { productId: "3", name: "Leche Lala 1L", quantity: 2, price: 25.0 },
    ],
    total: 50.0,
  },
  {
    id: "8",
    date: "2024-11-17",
    products: [
      { productId: "4", name: "Pan Bimbo Blanco", quantity: 3, price: 42.0 },
      { productId: "8", name: "Jabón Zote 200g", quantity: 1, price: 18.0 },
    ],
    total: 144.0,
  },
  {
    id: "9",
    date: "2024-11-16",
    products: [
      { productId: "1", name: "Coca Cola 600ml", quantity: 6, price: 18.0 },
    ],
    total: 108.0,
  },
];

export const dailySalesData = [
  { date: "16 Nov", ventas: 108 },
  { date: "17 Nov", ventas: 144 },
  { date: "18 Nov", ventas: 50 },
  { date: "19 Nov", ventas: 114 },
  { date: "20 Nov", ventas: 88 },
  { date: "21 Nov", ventas: 174 },
  { date: "22 Nov", ventas: 149 },
];
