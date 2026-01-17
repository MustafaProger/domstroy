import { useState, useEffect, useRef } from "react";
import { Category } from "../types";
import { categoryService } from "../services/categories";

export function useCategories() {
	const cachedCategoriesRef = useRef(categoryService.getCachedCategories());
	const [categories, setCategories] = useState<Category[]>(
		cachedCategoriesRef.current ?? []
	);
	const [loading, setLoading] = useState(!cachedCategoriesRef.current);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchCategories = async () => {
			try {
				if (!cachedCategoriesRef.current) {
					setLoading(true);
				}
				setError(null);
				const data = await categoryService.getCategories();
				if (isMounted) {
					setCategories(data);
				}
			} catch (err) {
				if (isMounted) {
					setError(
						err instanceof Error ? err.message : "Failed to load categories"
					);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		fetchCategories();

		return () => {
			isMounted = false;
		};
	}, []);

	return { categories, loading, error };
}
