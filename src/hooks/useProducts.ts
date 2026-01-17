import { useState, useEffect } from "react";
import { Product } from "../types";
import { fetchProductBySlug } from "../services/wp";

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
