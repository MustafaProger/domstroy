import type { Product } from "../types";

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
		"wp:term"?: Array<
			Array<{
				id?: number;
				slug?: string;
				name?: string;
				taxonomy?: string;
			}>
		>;
	};
};

type FetchProductsResult = {
	items: Product[];
	total: number;
	totalPages: number;
};

const API_BASE_URL = (
	import.meta.env.VITE_WORDPRESS_API_URL || "https://domstroy-api.ru"
).replace(/\/$/, "");
const BASE_PATH = `${API_BASE_URL}/wp-json/wp/v2`;

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();

const extractCategoryTerms = (product: WpProduct) => {
	const groups = product._embedded?.["wp:term"] ?? [];
	const flat = groups.flatMap((group) => group || []);
	const terms = flat.filter(
		(term) => !term.taxonomy || term.taxonomy === "product_category"
	);

	return terms
		.map((term) => ({
			id: String(term.id ?? ""),
			name: term.name ?? "",
			slug: term.slug ?? "",
		}))
		.filter((term) => term.id && term.slug && term.name);
};

const mapWpProduct = (product: WpProduct): Product => {
	const featuredImage =
		product._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
	const categoryIds = Array.isArray(product.product_category)
		? product.product_category.map((id) => String(id))
		: [];
	const categoryTerms = extractCategoryTerms(product);
	const categoryIdsFromTerms = categoryTerms.map((term) => term.id);
	const combinedCategoryIds = Array.from(
		new Set([...categoryIds, ...categoryIdsFromTerms])
	);
	const price = product.acf?.price;
	const inStockValue = product.acf?.in_stock;
	const characteristicsText = product.acf?.characteristics_text;
	const inStock =
		inStockValue === true ||
		inStockValue === 1 ||
		inStockValue === "1" ||
		inStockValue === "true";
	const primaryCategoryName = categoryTerms[0]?.name ?? "";

	return {
		id: String(product.id),
		title: product.title?.rendered ? stripHtml(product.title.rendered) : "",
		slug: product.slug || "",
		category: primaryCategoryName,
		categoryId: combinedCategoryIds[0] || "",
		categoryIds: combinedCategoryIds,
		categories: categoryTerms,
		acf: product.acf ?? undefined,
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
