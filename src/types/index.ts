
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  seller: {
    id: string;
    name: string;
  };
  stockQuantity: number;
  rating?: number;
  featured?: boolean;
  isNew?: boolean;
  discount?: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  rating?: number;
  students?: number;
  featured?: boolean;
  free?: boolean;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "card" | "qrcode" | "cash";
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role: "buyer" | "seller" | "admin";
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone?: string;
  isSeller: boolean;
}

export interface Category {
  id: string;
  name: string;
  image?: string;
  count?: number;
}
