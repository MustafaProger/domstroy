import axios from 'axios';
import { Product, Category, Testimonial } from '../types';
import { products, categories, testimonials, companyInfo } from '../data/products';

const API_BASE_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'http://localhost:3000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await client.get('/products');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch from API, using dummy data');
      return products;
    }
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const response = await client.get(`/products/${slug}`);
      return response.data;
    } catch (error) {
      return products.find((p) => p.slug === slug) || null;
    }
  },

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
      const response = await client.get(`/products/category/${categoryId}`);
      return response.data;
    } catch (error) {
      return products.filter((p) => p.categoryId === categoryId);
    }
  },
};

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await client.get('/categories');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch categories from API, using dummy data');
      return categories;
    }
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      const response = await client.get(`/categories/${slug}`);
      return response.data;
    } catch (error) {
      return categories.find((c) => c.slug === slug) || null;
    }
  },
};

export const testimonialService = {
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const response = await client.get('/testimonials');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch testimonials from API, using dummy data');
      return testimonials;
    }
  },
};

export const contactService = {
  async submitContactForm(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    type: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const response = await client.post('/contact', data);
      return response.data;
    } catch (error) {
      console.error('Failed to submit contact form', error);
      throw error;
    }
  },
};

export const companyService = {
  async getCompanyInfo() {
    try {
      const response = await client.get('/company');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch company info from API, using dummy data');
      return companyInfo;
    }
  },
};
