import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
	SEO,
	Container,
	Section,
	Card,
	Button,
	SkeletonCard,
	Breadcrumbs,
} from "../components";
import { useCategories, useProducts } from "../hooks";
import { CategoryChips } from "./catalog/CategoryChips";
import { CategorySidebar } from "./catalog/CategorySidebar";
import { CatalogFilters } from "./catalog/CatalogFilters";
import { CatalogPagination } from "./catalog/CatalogPagination";
import { ProductCard } from "./catalog/ProductCard";
import { getPaginationItems, parsePrice } from "./catalog/utils";

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

	const paginationItems = useMemo(
		() => getPaginationItems(totalPages, currentPage),
		[totalPages, currentPage]
	);
	const selectedCategoryName = selectedCategory
		? categories.find((c) => c.slug === selectedCategory)?.name ||
		  selectedCategory
		: "";

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
					<Breadcrumbs
						className='mb-4'
						glass
						items={[
							{ label: "Главная", href: "/" },
							{ label: "Каталог", href: "/catalog" },
							...(selectedCategoryName
								? [{ label: selectedCategoryName }]
								: []),
						]}
					/>
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
						<CategorySidebar
							categories={categories}
							loading={categoriesLoading}
							selectedCategory={selectedCategory}
							onCategoryChange={handleCategoryChange}
						/>

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

								<CategoryChips
									categories={categories}
									loading={categoriesLoading}
									selectedCategory={selectedCategory}
									onCategoryChange={handleCategoryChange}
								/>

								<CatalogFilters
									searchTerm={searchTerm}
									onSearchTermChange={setSearchTerm}
									stockFilter={stockFilter}
									onStockChange={handleStockChange}
									priceSort={priceSort}
									onPriceSortToggle={handlePriceSortToggle}
								/>
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
								<CatalogPagination
									currentPage={currentPage}
									totalPages={totalPages}
									pages={paginationItems}
									onPageChange={handlePageChange}
								/>
							)}
						</main>
					</div>
				</Container>
			</Section>
		</>
	);
}
