import {
	useState,
	useMemo,
	useEffect,
	useRef,
	type MouseEvent,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
	ArrowRight,
	Search,
	ArrowDown,
	ArrowUp,
	ArrowLeft,
} from "lucide-react";
import {
	SEO,
	Container,
	Section,
	Card,
	Button,
	SkeletonCard,
} from "../components";
import { useCategories, useProducts } from "../hooks";
import type { Product } from "../types";

const getCurrencySuffix = (price?: string) => {
	if (!price) return "";
	const cleaned = price.replace(/[0-9\s.,]/g, "").trim();
	if (!cleaned) return "";
	if (cleaned.includes("₽") || cleaned.toUpperCase() === "RUB") return "₽";
	return cleaned;
};

const formatPrice = (value: number, currency?: string) => {
	const formatted = new Intl.NumberFormat("ru-RU").format(value);
	return currency ? `${formatted} ${currency}` : formatted;
};

function ProductCard({ product }: { product: Product }) {
	const [qty, setQty] = useState(1);
	const unitPrice = product.price
		? Number(product.price.replace(/[^\d]/g, ""))
		: null;
	const currency = product.price ? getCurrencySuffix(product.price) || "₽" : "";
	const totalPrice =
		unitPrice !== null ? formatPrice(unitPrice * qty, currency) : "";

	const handleDecrement = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setQty((prev) => Math.max(1, prev - 1));
	};

	const handleIncrement = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setQty((prev) => prev + 1);
	};

	return (
		<Link
			to={`/product/${product.slug}`}
			className='h-full'>
			<Card
				hover
				className='group overflow-hidden h-full flex flex-col bg-white border-secondary-200/70 shadow-sm'>
				<div className='w-full h-48 overflow-hidden bg-secondary-100'>
					<img
						src={product.images[0]}
						alt={product.title}
						className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
					/>
				</div>
				<div className='p-5 flex flex-col flex-1'>
					<h3 className='font-medium text-base text-secondary-900 mb-3 min-h-[3rem]'>
						{product.title}
					</h3>
					<div className='mt-auto flex flex-col gap-3 pt-4 border-t border-secondary-200'>
						{product.price && unitPrice !== null && (
							<div className='flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap'>
								<span className='text-secondary-900 font-semibold text-lg leading-tight'>
									{totalPrice}
								</span>
								<div className='flex items-center gap-2 sm:gap-1'>
									<button
										type='button'
										onClick={handleDecrement}
										disabled={qty === 1}
										aria-label='Уменьшить количество'
										className='h-8 w-8 text-base sm:h-6 sm:w-6 sm:text-sm rounded-lg border border-secondary-200 text-secondary-700 transition-all hover:bg-secondary-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'>
										-
									</button>
									<span className='min-w-[1.5rem] text-center text-bodySm font-semibold text-secondary-900'>
										{qty}
									</span>
									<button
										type='button'
										onClick={handleIncrement}
										aria-label='Увеличить количество'
										className='h-8 w-8 text-base sm:h-6 sm:w-6 sm:text-sm rounded-lg border border-secondary-200 text-secondary-700 transition-all hover:bg-secondary-100 active:scale-95'>
										+
									</button>
								</div>
							</div>
						)}
						<div className='flex items-center justify-between'>
							{product.inStock ? (
								<span className='text-caption font-semibold text-green-600'>
									В наличии
								</span>
							) : (
								<span className='text-caption font-semibold text-red-600'>
									Нет в наличии
								</span>
							)}
							<ArrowRight
								size={20}
								className='text-primary-500 transition-transform duration-300 group-hover:translate-x-1'
							/>
						</div>
					</div>
				</div>
			</Card>
		</Link>
	);
}

export function Catalog() {
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedCategory = searchParams.get("category") || "";
	const stockParam = searchParams.get("stock");
	const stockFilter =
		stockParam === "in" || stockParam === "out" ? stockParam : "all";
	const [searchTerm, setSearchTerm] = useState("");
	const sortParam = searchParams.get("sort");
	const priceSort =
		sortParam === "price_asc"
			? "asc"
			: sortParam === "price_desc"
			? "desc"
			: "none";
	const pageSize = 9;
	const listTopRef = useRef<HTMLDivElement | null>(null);
	const isFirstRender = useRef(true);
	const isFirstFilterSync = useRef(true);

	const { categories, loading: categoriesLoading } = useCategories();
	const { products, loading: productsLoading } = useProducts();
	const currentPage = useMemo(() => {
		const pageParam = Number(searchParams.get("page"));
		if (!Number.isFinite(pageParam) || pageParam < 1) return 1;
		return Math.floor(pageParam);
	}, [searchParams]);

	const parsePrice = (price?: string) => {
		if (!price) return null;
		const numeric = Number(price.replace(/[^\d]/g, ""));
		return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
	};

	const filteredProducts = useMemo(() => {
		const categoryName = categories.find(
			(c) => c.slug === selectedCategory
		)?.name;
		const byCategory = selectedCategory
			? products.filter((p) => p.category === categoryName)
			: products;
		const byStock =
			stockFilter === "all"
				? byCategory
				: byCategory.filter((product) =>
						stockFilter === "in" ? product.inStock : !product.inStock
				  );
		const query = searchTerm.trim().toLowerCase();
		const searched = query
			? byStock.filter((product) => {
					const haystack =
						`${product.title} ${product.shortDescription} ${product.category}`.toLowerCase();
					return haystack.includes(query);
			  })
			: byStock;

		if (priceSort === "none") return searched;

		return [...searched].sort((a, b) => {
			const aPrice = parsePrice(a.price);
			const bPrice = parsePrice(b.price);
			if (aPrice === null && bPrice === null) return 0;
			if (aPrice === null) return 1;
			if (bPrice === null) return -1;
			return priceSort === "asc" ? aPrice - bPrice : bPrice - aPrice;
		});
	}, [
		products,
		categories,
		selectedCategory,
		stockFilter,
		searchTerm,
		priceSort,
	]);

	const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

	const paginatedProducts = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize;
		return filteredProducts.slice(startIndex, startIndex + pageSize);
	}, [filteredProducts, currentPage, pageSize]);

	useEffect(() => {
		if (isFirstFilterSync.current) {
			isFirstFilterSync.current = false;
			return;
		}
		if (currentPage === 1) return;
		const params = new URLSearchParams(searchParams);
		params.set("page", "1");
		setSearchParams(params);
	}, [searchTerm]);

	useEffect(() => {
		if (productsLoading) return;
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		const frame = window.requestAnimationFrame(() => {
			const target = listTopRef.current;
			if (!target) return;
			const header = document.querySelector("header");
			const headerOffset =
				header instanceof HTMLElement ? header.offsetHeight : 0;
			const targetTop =
				target.getBoundingClientRect().top + window.scrollY - headerOffset - 16;
			window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
		});
		return () => window.cancelAnimationFrame(frame);
	}, [currentPage, productsLoading]);

	const handlePriceSortToggle = () => {
		const params = new URLSearchParams(searchParams);
		if (priceSort === "none") {
			params.set("sort", "price_asc");
		} else if (priceSort === "asc") {
			params.set("sort", "price_desc");
		} else {
			params.delete("sort");
		}
		params.set("page", "1");
		setSearchParams(params);
	};

	const getPaginationItems = () => {
		const items: number[] = [];
		if (totalPages <= 5) {
			for (let page = 1; page <= totalPages; page += 1) items.push(page);
			return items;
		}

		const startPage = Math.min(
			Math.max(1, currentPage),
			Math.max(1, totalPages - 4)
		);

		for (let page = startPage; page <= startPage + 4; page += 1) {
			items.push(page);
		}

		return items;
	};

	const handleCategoryChange = (slug: string) => {
		const params = new URLSearchParams(searchParams);

		if (!slug || slug === selectedCategory) {
			params.delete("category");
		} else {
			params.set("category", slug);
		}

		params.set("page", "1");

		setSearchParams(params);
		setSearchTerm("");
	};

	const handleStockChange = (value: "all" | "in" | "out") => {
		const params = new URLSearchParams(searchParams);
		if (value === "all") {
			params.delete("stock");
		} else {
			params.set("stock", value);
		}
		params.set("page", "1");
		setSearchParams(params);
	};

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams);
		const nextPage = Math.max(1, page);
		params.set("page", String(nextPage));
		setSearchParams(params);
	};

	return (
		<>
			<SEO
				title='Каталог продукции - ДомСтрой'
				description='Просмотрите наш полный каталог строительных материалов, включая цемент, кирпич, сталь и инструменты.'
				keywords='строительные материалы, товары, каталог'
			/>

			<Section
				variant='hero'
				className='bg-gradient-to-b from-secondary-100/90 via-secondary-50 to-secondary-50 border-b border-secondary-200/70'>
				<Container>
					<div className='flex items-center gap-2 mb-4 text-bodySm text-secondary-600'>
						<Link
							to='/'
							className='hover:text-primary-500'>
							Главная
						</Link>
						<span>/</span>
						<span>Каталог</span>
					</div>
					<h1>Каталог продукции</h1>
					<p className='text-secondary-600 mt-2 max-w-xl text-bodySm md:text-body'>
						Изучите наш полный ассортимент высококачественных строительных
						материалов
					</p>
				</Container>
			</Section>

			<Section className='bg-secondary-100/60 border-t border-secondary-200/60'>
				<Container>
					<div className='grid lg:grid-cols-4 gap-8 items-start'>
						<aside className='xl:col-span-1 hidden xl:block sticky top-24 self-start'>
							<div className='space-y-6'>
								<div className='bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-secondary-200/70 shadow-sm'>
									<h3 className='text-h3 font-bold mb-4'>Категории</h3>

									<button
										onClick={() => handleCategoryChange("")}
										className={`block w-full text-left px-4 py-2 rounded-xl transition-colors text-bodySm ${
											!selectedCategory
												? "bg-primary-500 text-secondary-900 font-semibold"
												: "text-secondary-700 hover:bg-secondary-100"
										}`}>
										Все категории
									</button>

									{categoriesLoading ? (
										<div className='space-y-2 mt-3'>
											{Array(4)
												.fill(null)
												.map((_, i) => (
													<div
														key={i}
														className='h-8 bg-secondary-200 rounded animate-pulse'></div>
												))}
										</div>
									) : (
										<div className='space-y-2 mt-3'>
											{categories.map((category) => (
												<button
													key={category.id}
													onClick={() => handleCategoryChange(category.slug)}
													className={`block w-full text-left px-4 py-2 rounded-xl transition-colors text-bodySm ${
														selectedCategory === category.slug
															? "bg-primary-500 text-secondary-900 font-semibold"
															: "text-secondary-700 hover:bg-secondary-100"
													}`}>
													<span>{category.name}</span>
												</button>
											))}
										</div>
									)}
								</div>
							</div>
						</aside>

						<main className='xl:col-span-3 lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-3xl border border-secondary-200/60 p-4 sm:p-6 shadow-sm'>
							<div className='mb-10 flex flex-col gap-6'>
								<div ref={listTopRef}>
									<h2 className='text-h2 font-bold text-secondary-900'>
										{selectedCategory
											? categories.find((c) => c.slug === selectedCategory)
													?.name || "Товары"
											: "Все товары"}
									</h2>
									<p className='text-secondary-600 mt-1 text-bodySm'>
										Показано {filteredProducts.length}{" "}
										{filteredProducts.length === 1
											? "товар"
											: filteredProducts.length > 1 &&
											  filteredProducts.length < 5
											? "товара"
											: "товаров"}
									</p>
								</div>

								<div className='xl:hidden'>
									<div className='flex gap-2 flex-wrap -mx-4 px-4'>
										<button
											onClick={() => handleCategoryChange("")}
											className={`whitespace-nowrap px-4 py-2 rounded-full border text-bodySm transition-colors ${
												!selectedCategory
													? "bg-primary-500 text-secondary-900 border-primary-500 font-semibold"
													: "bg-white/90 text-secondary-700 border-secondary-200/70 hover:bg-secondary-100"
											}`}>
											Все категории
										</button>
										{categoriesLoading
											? Array(4)
													.fill(null)
													.map((_, i) => (
														<div
															key={i}
															className='h-9 w-24 rounded-full bg-secondary-200 animate-pulse flex-shrink-0'
														/>
													))
											: categories.map((category) => (
													<button
														key={category.id}
														onClick={() => handleCategoryChange(category.slug)}
														className={`whitespace-nowrap px-4 py-2 rounded-full border text-bodySm transition-colors ${
															selectedCategory === category.slug
																? "bg-primary-500 text-secondary-900 border-primary-500 font-semibold"
																: "bg-white/90 text-secondary-700 border-secondary-200/70 hover:bg-secondary-100"
														}`}>
														{category.name}
													</button>
											  ))}
									</div>
								</div>

								<div className='w-full'>
									<div className='flex w-full flex-col gap-3 sm:flex-row sm:items-center'>
										<div className='relative w-full sm:flex-1'>
											<Search
												className='absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400'
												size={18}
											/>
											<input
												value={searchTerm}
												onChange={(event) => setSearchTerm(event.target.value)}
												placeholder='Поиск товаров'
												aria-label='Поиск товаров'
												className='h-12 w-full rounded-xl border border-secondary-300/70 bg-white/90 pl-10 pr-4 text-bodySm text-secondary-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors'
											/>
										</div>
										<div className='flex w-full gap-3 sm:w-auto'>
											<div className='relative flex-1 sm:w-44 sm:flex-none'>
												<select
													value={stockFilter}
													onChange={(event) =>
														handleStockChange(
															event.target.value as "all" | "in" | "out"
														)
													}
													aria-label='Наличие'
													className='h-12 w-full appearance-none rounded-xl border border-secondary-300/70 bg-white/90 pl-3 pr-10 text-bodySm text-secondary-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors'>
													<option value='all'>Наличие: все</option>
													<option value='in'>Наличие: в наличии</option>
													<option value='out'>Наличие: нет</option>
												</select>
												<span
													aria-hidden='true'
													className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full ${
														stockFilter === "in"
															? "bg-green-500"
															: stockFilter === "out"
															? "bg-red-500"
															: "bg-secondary-300"
													}`}
												/>
											</div>
											<Button
												variant='outline'
												size='sm'
												onClick={handlePriceSortToggle}
												className='h-12 flex-1 sm:w-36 sm:flex-none font-normal'>
												<span className='flex items-center justify-center gap-2'>
													Цена
													{priceSort === "asc" && <ArrowDown size={16} />}
													{priceSort === "desc" && <ArrowUp size={16} />}
												</span>
											</Button>
										</div>
									</div>
								</div>
							</div>

							{productsLoading ? (
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
									{Array(6)
										.fill(null)
										.map((_, i) => (
											<SkeletonCard key={i} />
										))}
								</div>
							) : filteredProducts.length > 0 ? (
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
									{paginatedProducts.map((product) => (
										<ProductCard
											key={product.id}
											product={product}
										/>
									))}
								</div>
							) : (
								<Card className='p-12 text-center bg-white/80 border-secondary-200/70 shadow-sm'>
									<p className='text-secondary-600 text-body mb-4'>
										Товары в этой категории не найдены
									</p>
									<Button
										variant='secondary'
										onClick={() => handleCategoryChange("")}>
										Посмотреть все товары
									</Button>
								</Card>
							)}

							{filteredProducts.length > 0 && totalPages > 1 && (
								<div className='mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2'>
									<button
										type='button'
										onClick={() =>
											handlePageChange(Math.max(1, currentPage - 1))
										}
										disabled={currentPage === 1}
										aria-label='Предыдущая страница'
										className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-secondary-200 text-secondary-700 flex items-center justify-center transition-colors hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed'>
										<ArrowLeft size={18} />
									</button>
									{getPaginationItems().map((page) => (
										<button
											key={page}
											className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border transition-colors ${
												page === currentPage
													? "bg-primary-500 text-secondary-900 border-primary-500 font-semibold"
													: "border-secondary-200 text-secondary-700 hover:bg-secondary-50"
											}`}
											onClick={() => handlePageChange(page)}>
											{page}
										</button>
									))}
									<button
										type='button'
										onClick={() =>
											handlePageChange(Math.min(totalPages, currentPage + 1))
										}
										disabled={currentPage === totalPages}
										aria-label='Следующая страница'
										className='w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-secondary-200 text-secondary-700 flex items-center justify-center transition-colors hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed'>
										<ArrowRight size={18} />
									</button>
								</div>
							)}
						</main>
					</div>
				</Container>
			</Section>
		</>
	);
}
