import axios from "axios";
import { Product } from "../types";

const API_BASE_URL =
	import.meta.env.VITE_WORDPRESS_API_URL || "http://localhost:3000/api";

const client = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
});

export const productService = {
	async getProducts(): Promise<Product[]> {
		const response = await client.get("/products");
		return response.data;
	},

	async getProductBySlug(slug: string): Promise<Product | null> {
		const response = await client.get(`/products/${slug}`);
		return response.data;
	},

	async getProductsByCategory(categoryId: string): Promise<Product[]> {
		const response = await client.get(`/products/category/${categoryId}`);
		return response.data;
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
			const response = await client.post("/contact", data);
			return response.data;
		} catch (error) {
			console.error("Failed to submit contact form", error);
			throw error;
		}
	},
};
