import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types";
import { fetchProducts } from "../services/wp";
import { useCategories } from "./useCategories";

type UseWpCatalogParams = {
	page: number;
	perPage: number;
	search: string;
	categorySlug: string;
};

export function useCatalog({
	page,
	perPage,
	search,
	categorySlug,
}: UseWpCatalogParams) {
	const [items, setItems] = useState<Product[]>([]);
	const [total, setTotal] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const {
		categories,
		loading: categoriesLoading,
	} = useCategories();

	const categoryId = useMemo(() => {
		if (!categorySlug) return "";
		return categories.find((category) => category.slug === categorySlug)?.id || "";
	}, [categories, categorySlug]);

	useEffect(() => {
		let isMounted = true;

		const loadProducts = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetchProducts({
					page,
					perPage,
					search: search.trim() || undefined,
					categoryId: categoryId || undefined,
				});
				if (isMounted) {
					setItems(response.items);
					setTotal(response.total);
					setTotalPages(response.totalPages);
				}
			} catch (err) {
				if (isMounted) {
					setError(
						err instanceof Error ? err.message : "Failed to load products"
					);
					setItems([]);
					setTotal(0);
					setTotalPages(0);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		if (categorySlug && !categoryId) {
			if (categoriesLoading) {
				return;
			}
			setItems([]);
			setTotal(0);
			setTotalPages(0);
			setLoading(false);
			return;
		}

		loadProducts();

		return () => {
			isMounted = false;
		};
	}, [page, perPage, search, categoryId, categorySlug, categoriesLoading]);

	return {
		items,
		categories,
		total,
		totalPages,
		loading,
		error,
		categoriesLoading,
	};
}
