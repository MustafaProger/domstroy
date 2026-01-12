import { useState, useEffect } from "react";
import { Product } from "../types";
import { productService } from "../services/api";
import { fetchProductBySlug } from "../services/wp";

export function useProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await productService.getProducts();
				setProducts(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to load products"
				);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return { products, loading, error };
}

export function useProductBySlug(slug: string) {
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await fetchProductBySlug(slug);
				setProduct(data);
				if (!data) {
					setError("Product not found");
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load product");
			} finally {
				setLoading(false);
			}
		};

		if (slug) {
			fetchProduct();
		}
	}, [slug]);

	return { product, loading, error };
}

export function useProductsByCategory(categoryId: string) {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await productService.getProductsByCategory(categoryId);
				setProducts(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to load products"
				);
			} finally {
				setLoading(false);
			}
		};

		if (categoryId) {
			fetchProducts();
		}
	}, [categoryId]);

	return { products, loading, error };
}
