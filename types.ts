export interface User {
    id: string
    name: string
    email: string
}

export interface Billboard {
    id: string
    label: string
    imageUrl: string
}

export interface Category {
    id: string
    name: string
    billboard: Billboard;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    category: Category;
    price: string;
    isFeatured: boolean;
    size: Size;
    color: Color;
    images: Image[];
}


export interface Image {
    id: string
    url: string
}

export interface Size {
    id: string
    name: string
    value: string
}

export interface Color {
    id: string
    name: string
    value: string
}

export interface Review {
  id: string;
  rating: number
  comment: string;
  productId: string;
  customerId: string;
  createdAt: string;
  updatedAt?: string;
  images?: ReviewImage[];
  customer?: {
    id: string;
    username: string;
  };
}

export interface ReviewImage {
  id: string;
  reviewId: string;
  url: string;
  createdAt: string;
  updatedAt?: string;
}