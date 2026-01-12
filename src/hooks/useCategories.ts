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

export function useCategoryBySlug(slug: string) {
	const [category, setCategory] = useState<Category | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchCategory = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await categoryService.getCategoryBySlug(slug);
				if (isMounted) {
					setCategory(data);
					if (!data) {
						setError("Category not found");
					}
				}
			} catch (err) {
				if (isMounted) {
					setError(
						err instanceof Error ? err.message : "Failed to load category"
					);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		if (slug) {
			fetchCategory();
		}

		return () => {
			isMounted = false;
		};
	}, [slug]);

	return { category, loading, error };
}
