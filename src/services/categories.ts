import type { Category } from "../types";

type WpCategory = {
	id: number;
	name: string;
	slug: string;
	description?: string;
	count?: number;
	acf?: {
		image?: string | { url?: string | null } | null;
	};
};

const API_BASE_URL = (import.meta.env.VITE_WORDPRESS_API_URL || "").replace(
	/\/$/,
	""
);
const BASE_PATH = `${API_BASE_URL}/wp-json/wp/v2`;
const CATEGORY_ENDPOINT = `${BASE_PATH}/product_category?per_page=100&hide_empty=false`;

const resolveCategoryImage = (acf?: WpCategory["acf"]): string => {
	const image = acf?.image;
	if (!image) return "";
	if (typeof image === "string") return image;
	if (typeof image === "object") return image.url ?? "";
	return "";
};

const mapWpCategory = (category: WpCategory): Category => ({
	id: String(category.id),
	name: category.name,
	slug: category.slug,
	description: category.description || "",
	image: resolveCategoryImage(category.acf),
	productCount: category.count ?? 0,
});

const sortCategoriesByName = (categories: Category[]) =>
	categories.sort((a, b) =>
		a.name.localeCompare(b.name, "ru", { sensitivity: "base" })
	);

let categoriesCache: Category[] | null = null;
let categoriesPromise: Promise<Category[]> | null = null;

const loadCategories = async (): Promise<Category[]> => {
	const response = await fetch(CATEGORY_ENDPOINT);
	if (!response.ok) {
		throw new Error("Failed to fetch categories");
	}

	const data = (await response.json()) as WpCategory[];
	return sortCategoriesByName(data.map(mapWpCategory));
};

export const categoryService = {
	getCachedCategories(): Category[] | null {
		return categoriesCache;
	},

	clearCache(): void {
		categoriesCache = null;
		categoriesPromise = null;
	},

	async getCategories(): Promise<Category[]> {
		if (categoriesCache) {
			return categoriesCache;
		}

		if (!categoriesPromise) {
			categoriesPromise = loadCategories()
				.then((data) => {
					categoriesCache = data;
					return data;
				})
				.catch((error) => {
					categoriesPromise = null;
					throw error;
				});
		}

		return categoriesPromise;
	},

	async getCategoryBySlug(slug: string): Promise<Category | null> {
		const categories = await this.getCategories();
		return categories.find((category) => category.slug === slug) || null;
	},
};
