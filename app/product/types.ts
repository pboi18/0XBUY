import { Timestamp } from "firebase/firestore";

export interface Product {
  id: string;
  title: string;
  price: number;
  condition: string;
  location: string;
  description: string;
  images: string[];
  specifications?: { name: string; value: string }[];
  reviews?: {
    user: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  seller: {
    name: string;
    rating: number;
    sales: number;
    joined: Timestamp | Date | string; // Explicitly typed
    responseTime: string;
    avatar: string;
  };
  createdAt: Timestamp | Date | string; // Explicitly typed
  returnPolicy?: string;
  internationalShipping?: string;
  shippingInsurance?: string;
}
