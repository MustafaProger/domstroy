import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search, ArrowDown, ArrowUp } from "lucide-react";
import {
	SEO,
	Container,
	Section,
	Card,
	Button,
	SkeletonCard,
} from "../components";
import { useCategories, useProducts } from "../hooks";

export function Catalog() {
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedCategory = searchParams.get("category") || "";
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [priceSort, setPriceSort] = useState<"none" | "asc" | "desc">("none");
	const pageSize = 9;

	const { categories, loading: categoriesLoading } = useCategories();
	const { products, loading: productsLoading } = useProducts();

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
		const query = searchTerm.trim().toLowerCase();
		const searched = query
			? byCategory.filter((product) => {
					const haystack =
						`${product.title} ${product.shortDescription} ${product.category}`.toLowerCase();
					return haystack.includes(query);
			  })
			: byCategory;

		if (priceSort === "none") return searched;

		return [...searched].sort((a, b) => {
			const aPrice = parsePrice(a.price);
			const bPrice = parsePrice(b.price);
			if (aPrice === null && bPrice === null) return 0;
			if (aPrice === null) return 1;
			if (bPrice === null) return -1;
			return priceSort === "asc" ? aPrice - bPrice : bPrice - aPrice;
		});
	}, [products, categories, selectedCategory, searchTerm, priceSort]);

	const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

	const paginatedProducts = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize;
		return filteredProducts.slice(startIndex, startIndex + pageSize);
	}, [filteredProducts, currentPage, pageSize]);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedCategory, searchTerm, priceSort]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, [currentPage]);

	const handlePriceSortToggle = () => {
		setPriceSort((prev) =>
			prev === "none" ? "asc" : prev === "asc" ? "desc" : "none"
		);
	};

	const getPaginationItems = () => {
		const items: Array<number | "ellipsis"> = [];
		if (totalPages <= 5) {
			for (let page = 1; page <= totalPages; page += 1) items.push(page);
			return items;
		}

		const startPage = Math.max(2, Math.min(currentPage - 1, totalPages - 3));
		const endPage = Math.min(totalPages - 1, startPage + 2);

		items.push(1);

		if (startPage > 2) items.push("ellipsis");

		for (let page = startPage; page <= endPage; page += 1) {
			items.push(page);
		}

		if (endPage < totalPages - 1) items.push("ellipsis");
		items.push(totalPages);
		return items;
	};

	const handleCategoryChange = (slug: string) => {
		const params = new URLSearchParams(searchParams);

		if (slug === selectedCategory) {
			params.delete("category");
		} else {
			params.set("category", slug);
		}

		params.set("page", "1");

		setSearchParams(params);
		setSearchTerm("");
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
													<div className='flex justify-between items-center'>
														<span>{category.name}</span>
														<span className='text-caption font-semibold opacity-75'>
															({category.productCount})
														</span>
													</div>
												</button>
											))}
										</div>
									)}
								</div>
							</div>
						</aside>

						<main className='xl:col-span-3 lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-3xl border border-secondary-200/60 p-4 sm:p-6 shadow-sm'>
							<div className='mb-10 flex flex-col gap-6'>
								<div>
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
									<div className='flex w-full flex-row items-center gap-2 sm:gap-3'>
										<div className='relative flex-1 min-w-0'>
											<Search
												className='absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400'
												size={18}
											/>
											<input
												value={searchTerm}
												onChange={(event) => setSearchTerm(event.target.value)}
												placeholder='Поиск товаров'
												aria-label='Поиск товаров'
												className='w-full rounded-xl border border-secondary-300/70 bg-white/90 pl-10 pr-4 py-2.5 text-bodySm text-secondary-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors'
											/>
										</div>
										<Button
											variant='outline'
											size='sm'
											onClick={handlePriceSortToggle}
											className='shrink-0 w-auto min-w-[92px]'>
											<span className='flex items-center gap-2'>
												Цена
												{priceSort === "asc" && <ArrowDown size={16} />}
												{priceSort === "desc" && <ArrowUp size={16} />}
											</span>
										</Button>
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
										<Link
											key={product.id}
											to={`/product/${product.slug}`}>
											<Card
												hover
												className='overflow-hidden h-full flex flex-col bg-white border-secondary-200/70 shadow-sm'>
												<div className='w-full h-40 sm:h-48 overflow-hidden bg-secondary-100'>
													<img
														src={product.images[0]}
														alt={product.title}
														className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
													/>
												</div>
												<div className='p-5 flex-grow flex flex-col'>
													<p className='text-caption font-semibold text-primary-600 uppercase mb-2'>
														{product.category}
													</p>
													<h3 className='text-h3 font-bold text-secondary-900 mb-2 line-clamp-2'>
														{product.title}
													</h3>
													{product.price && (
														<p className='text-secondary-900 font-semibold mb-2 text-bodySm'>
															{product.price}
														</p>
													)}
													<p className='text-bodySm text-secondary-600 mb-4 flex-grow line-clamp-3'>
														{product.shortDescription}
													</p>
													<div className='flex items-center justify-between pt-4 border-t border-secondary-200'>
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
															size={16}
															className='text-primary-500'
														/>
													</div>
												</div>
											</Card>
										</Link>
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
										className='sr-only'
										onClick={() =>
											setCurrentPage((prev) => Math.max(1, prev - 1))
										}
										disabled={currentPage === 1}
										aria-label='Предыдущая страница'
									/>
									{getPaginationItems().map((item, index) => {
										if (item === "ellipsis") {
											return (
												<span
													key={`ellipsis-${index}`}
													className='text-secondary-500'>
													...
												</span>
											);
										}
										const page = item;
										return (
											<button
												key={page}
												className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border transition-colors ${
													page === currentPage
														? "bg-primary-500 text-secondary-900 border-primary-500 font-semibold"
														: "border-secondary-200 text-secondary-700 hover:bg-secondary-50"
												}`}
												onClick={() => setCurrentPage(page)}>
												{page}
											</button>
										);
									})}
									<button
										type='button'
										className='sr-only'
										onClick={() =>
											setCurrentPage((prev) => Math.min(totalPages, prev + 1))
										}
										disabled={currentPage === totalPages}
										aria-label='Следующая страница'
									/>
								</div>
							)}
						</main>
					</div>
				</Container>
			</Section>
		</>
	);
}
