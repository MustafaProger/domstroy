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
import { useWpCatalog } from "../hooks";
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

	const currentPage = useMemo(() => {
		const pageParam = Number(searchParams.get("page"));
		if (!Number.isFinite(pageParam) || pageParam < 1) return 1;
		return Math.floor(pageParam);
	}, [searchParams]);

	const {
		items,
		categories,
		total,
		totalPages,
		loading: productsLoading,
		error,
		categoriesLoading,
	} = useWpCatalog({
		page: currentPage,
		perPage: pageSize,
		search: searchTerm,
		categorySlug: selectedCategory,
	});

	const filteredProducts = useMemo(() => {
		const byStock =
			stockFilter === "all"
				? items
				: items.filter((product) =>
						stockFilter === "in" ? product.inStock : !product.inStock
				  );

		if (priceSort === "none") return byStock;

		return [...byStock].sort((a, b) => {
			const aPrice = parsePrice(a.price);
			const bPrice = parsePrice(b.price);
			if (aPrice === null && bPrice === null) return 0;
			if (aPrice === null) return 1;
			if (bPrice === null) return -1;
			return priceSort === "asc" ? aPrice - bPrice : bPrice - aPrice;
		});
	}, [items, stockFilter, priceSort]);

	const displayTotal = stockFilter === "all" ? total : filteredProducts.length;

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
	const productLinkQuery = useMemo(() => {
		const params = new URLSearchParams(searchParams);
		if (selectedCategory) {
			params.set("category", selectedCategory);
		} else {
			params.delete("category");
		}
		if (!params.get("page")) {
			params.set("page", String(currentPage));
		}
		return params.toString();
	}, [searchParams, selectedCategory, currentPage]);

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
				variant='breadCrumbs'
				className='liquid-glass-for-bread-crumbs'>
				<Container>
					<Breadcrumbs
						className='mt-4 mb-4'
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

			<Section
				variant='catalog'
				className='bg-secondary-100/60 border-t border-secondary-200/60'>
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
										Показано {displayTotal}{" "}
										{displayTotal === 1
											? "товар"
											: displayTotal > 1 && displayTotal < 5
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
							) : error ? (
								<Card className='p-12 text-center bg-white/80 border-secondary-200/70 shadow-sm'>
									<p className='text-secondary-600 text-body mb-4'>{error}</p>
									<Button
										variant='secondary'
										onClick={() => handleCategoryChange("")}>
										Посмотреть все товары
									</Button>
								</Card>
							) : filteredProducts.length > 0 ? (
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
									{filteredProducts.map((product) => (
										<ProductCard
											key={product.id}
											product={product}
											queryString={productLinkQuery}
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
