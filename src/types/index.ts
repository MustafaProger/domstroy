export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryId: string;
  price?: string;
  description: string;
  shortDescription: string;
  images: string[];
  specifications: Record<string, string>;
  inStock: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

export interface CompanyInfo {
  name: string;
  foundedYear: number;
  description: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  email: string;
  address: string;
  hours: string;
  image: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'inquiry' | 'quote' | 'general';
}

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  keywords?: string;
}
