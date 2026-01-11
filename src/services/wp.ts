import type { Category, Product } from "../types";

type FetchProductsParams = {
	page?: number;
	perPage?: number;
	search?: string;
	categoryId?: string;
};

type WpRenderedField = {
	rendered?: string;
};

type WpProduct = {
	id: number;
	slug: string;
	title?: WpRenderedField;
	excerpt?: WpRenderedField;
	content?: WpRenderedField;
	acf?: {
		price?: string | number | null;
		in_stock?: boolean | number | string | null;
		characteristics_text?: string | null;
	};
	product_category?: number[];
	_embedded?: {
		"wp:featuredmedia"?: Array<{
			source_url?: string;
		}>;
	};
};

type WpCategory = {
	id: number;
	name: string;
	slug: string;
	description?: string;
	count?: number;
};

type FetchProductsResult = {
	items: Product[];
	total: number;
	totalPages: number;
};

const BASE_PATH = "/wp-json/wp/v2";

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();

const mapWpProduct = (product: WpProduct): Product => {
	const featuredImage =
		product._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
	const categoryIds = Array.isArray(product.product_category)
		? product.product_category.map((id) => String(id))
		: [];
	const price = product.acf?.price;
	const inStockValue = product.acf?.in_stock;
	const characteristicsText = product.acf?.characteristics_text;
	const inStock =
		inStockValue === true ||
		inStockValue === 1 ||
		inStockValue === "1" ||
		inStockValue === "true";

	return {
		id: String(product.id),
		title: product.title?.rendered ? stripHtml(product.title.rendered) : "",
		slug: product.slug || "",
		category: "",
		categoryId: categoryIds[0] || "",
		categoryIds,
		price: price !== null && price !== undefined ? String(price) : undefined,
		description: product.content?.rendered
			? stripHtml(product.content.rendered)
			: "",
		shortDescription: product.excerpt?.rendered
			? stripHtml(product.excerpt.rendered)
			: "",
		images: featuredImage ? [featuredImage] : [],
		specifications: {},
		inStock,
		characteristicsText:
			typeof characteristicsText === "string" ? characteristicsText : "",
	};
};

export async function fetchProducts({
	page = 1,
	perPage = 9,
	search,
	categoryId,
}: FetchProductsParams): Promise<FetchProductsResult> {
	const params = new URLSearchParams({
		_embed: "1",
		per_page: String(perPage),
		page: String(page),
	});

	if (search) {
		params.set("search", search);
	}
	if (categoryId) {
		params.set("product_category", categoryId);
	}

	const response = await fetch(`${BASE_PATH}/product?${params.toString()}`);
	if (!response.ok) {
		throw new Error("Failed to fetch products");
	}

	const total = Number(response.headers.get("X-WP-Total") || "0");
	const totalPages = Number(response.headers.get("X-WP-TotalPages") || "0");
	const data = (await response.json()) as WpProduct[];

	return {
		items: data.map(mapWpProduct),
		total,
		totalPages,
	};
}

export async function fetchProductCategories(): Promise<Category[]> {
	const response = await fetch(`${BASE_PATH}/product_category?per_page=100`);
	if (!response.ok) {
		throw new Error("Failed to fetch categories");
	}

	const data = (await response.json()) as WpCategory[];

	return data.map((category) => ({
		id: String(category.id),
		name: category.name,
		slug: category.slug,
		description: category.description || "",
		image: "",
		productCount: category.count ?? 0,
	}));
}

export async function fetchProductBySlug(
	slug: string
): Promise<Product | null> {
	const response = await fetch(
		`${BASE_PATH}/product?slug=${encodeURIComponent(slug)}&_embed=1`
	);
	if (!response.ok) {
		throw new Error("Failed to fetch product");
	}

	const data = (await response.json()) as WpProduct[];
	const product = data[0];
	return product ? mapWpProduct(product) : null;
}
