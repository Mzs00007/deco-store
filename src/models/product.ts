export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  specifications: Record<string, string>;
  category: string;
  stock: number;
  reviews?: Array<{
    id: string;
    rating: number;
    comment: string;
    author: string;
    date: string;
  }>;
  createdAt: string;
  updatedAt: string;
} 