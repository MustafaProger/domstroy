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

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  keywords?: string;
}
