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
      joined: any; // Timestamp or string
      responseTime: string;
      avatar: string;
    };
    createdAt: any; // Timestamp or string
    returnPolicy?: string;
    internationalShipping?: string;
    shippingInsurance?: string;
  }