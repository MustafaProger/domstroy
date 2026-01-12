import { useMemo, useRef, useState, type MouseEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { MessageCircle, Phone, Mail, Send } from "lucide-react";
import {
	SEO,
	Container,
	Section,
	Button,
	Loading,
	Badge,
	Breadcrumbs,
} from "../components";
import { useCategories, useContacts, useProductBySlug } from "../hooks";
import { SPEC_LABELS } from "../features/product/constants";
import { formatPrice } from "../utils/price";

export function Product() {
	const { slug = "" } = useParams();
	const [searchParams] = useSearchParams();
	const { product, loading, error } = useProductBySlug(slug);
	const { categories } = useCategories();
	const { links: contactLinks, loading: contactsLoading } = useContacts();
	const [selectedImage, setSelectedImage] = useState(0);
	const sliderRef = useRef<HTMLDivElement | null>(null);
	const [qty, setQty] = useState(1);

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

	const handleSlideSelect = (index: number) => {
		setSelectedImage(index);
		const slider = sliderRef.current;
		if (!slider) return;
		slider.scrollTo({
			left: slider.clientWidth * index,
			behavior: "smooth",
		});
	};

	const handleSliderScroll = () => {
		const slider = sliderRef.current;
		if (!slider) return;
		const index = Math.round(slider.scrollLeft / slider.clientWidth);
		if (index !== selectedImage) {
			setSelectedImage(index);
		}
	};

	const formatSpecLabel = (key: string) => {
		if (SPEC_LABELS[key]) return SPEC_LABELS[key];
		const normalized = key.replace(/_/g, " ");
		return normalized.charAt(0).toUpperCase() + normalized.slice(1);
	};

	const characteristics = useMemo(() => {
		const raw = product?.characteristicsText?.trim();
		if (!raw) return [];

		return raw
			.split(/\r?\n/)
			.map((line) => line.trim())
			.filter(Boolean)
			.map((line) => {
				const dividerIndex = line.indexOf(":");
				if (dividerIndex === -1) return null;
				const name = line.slice(0, dividerIndex).trim();
				const value = line.slice(dividerIndex + 1).trim();
				if (!name || !value) return null;
				return { name, value };
			})
			.filter(
				(item): item is { name: string; value: string } => item !== null
			);
	}, [product?.characteristicsText]);

	const categorySlugParam = searchParams.get("category") || "";
	const catalogParams = useMemo(() => {
		const params = new URLSearchParams();
		params.set("page", searchParams.get("page") || "1");
		const stock = searchParams.get("stock");
		const sort = searchParams.get("sort");
		if (stock) params.set("stock", stock);
		if (sort) params.set("sort", sort);
		if (categorySlugParam) params.set("category", categorySlugParam);
		return params.toString();
	}, [searchParams, categorySlugParam]);
	const catalogLink = `/catalog?${catalogParams}`;

	const categoryFromQuery = useMemo(() => {
		if (!categorySlugParam) return null;
		const fromList = categories.find(
			(category) => category.slug === categorySlugParam
		);
		if (fromList) {
			return { name: fromList.name, slug: fromList.slug };
		}
		const fromProduct = product?.categories?.find(
			(category) => category.slug === categorySlugParam
		);
		if (fromProduct) {
			return { name: fromProduct.name, slug: fromProduct.slug };
		}
		return { name: categorySlugParam, slug: categorySlugParam };
	}, [categorySlugParam, categories, product?.categories]);

	const categoryFromProduct = useMemo(() => {
		if (!product) return null;
		const fromProduct = product.categories?.[0];
		if (fromProduct) {
			return { name: fromProduct.name, slug: fromProduct.slug };
		}
		const ids = product.categoryIds ?? [];
		const fallbackId = ids[0] || product.categoryId;
		if (!fallbackId) return null;
		const match = categories.find((category) => category.id === fallbackId);
		return match ? { name: match.name, slug: match.slug } : null;
	}, [product, categories]);

	const activeCategory = categoryFromQuery ?? categoryFromProduct;
	const categoryName = activeCategory?.name || product?.category || "";

	const unitPrice = product?.price
		? Number(product.price.replace(/[^\d]/g, ""))
		: null;
	const totalPrice = unitPrice !== null ? formatPrice(unitPrice * qty) : "";
	const hasContactLinks =
		!!contactLinks.email ||
		!!contactLinks.phone ||
		!!contactLinks.whatsapp ||
		!!contactLinks.telegram;

	if (loading) return <Loading />;

	if (error || !product) {
		return (
			<Section variant='hero'>
				<Container>
					<div className='text-center'>
						<h1 className='text-h1 font-bold text-secondary-900 mb-4'>
							Товар не найден
						</h1>
						<p className='text-secondary-600 mb-8 text-bodySm'>
							Товар, который вы ищете, не существует или был удален.
						</p>
						<Link to='/catalog'>
							<Button variant='secondary'>Вернуться в каталог</Button>
						</Link>
					</div>
				</Container>
			</Section>
		);
	}

	const specEntries = Object.entries(product.specifications);

	return (
		<>
			<SEO
				title={`${product.title} - ДомСтрой`}
				description={product.shortDescription}
				keywords={`${product.title}, ${categoryName}, строительные материалы`}
			/>

			<Section
				variant='breadCrumbs'
				className='liquid-glass-for-bread-crumbs pb-4'>
				<Container>
					<Breadcrumbs
						className='mt-4 mb-4'
						items={[
							{ label: "Главная", href: "/" },
							{ label: "Каталог", href: catalogLink },
							...(activeCategory
								? [
										{
											label: activeCategory.name,
											href: `/catalog?category=${activeCategory.slug}&page=1`,
										},
								  ]
								: []),
							{ label: product.title },
						]}
					/>
				</Container>
			</Section>

			<Section className='!pt-0 !md:pt-0'>
				<Container className='space-y-8'>
					<div className='grid lg:grid-cols-[1fr_1fr] gap-6 sm:gap-8 lg:gap-10 items-start'>
						<div className='w-full'>
							<div className='glass-panel rounded-3xl overflow-hidden relative aspect-[4/3] w-full'>
								{product.images.length > 0 ? (
									<div
										ref={sliderRef}
										onScroll={handleSliderScroll}
										className='flex h-full w-full overflow-x-auto scroll-smooth snap-x snap-mandatory'>
										{product.images.map((image, idx) => (
											<div
												key={`${image}-${idx}`}
												className='snap-center shrink-0 w-full h-full'>
												<img
													src={image}
													alt={`${product.title} ${idx + 1}`}
													className='w-full h-full object-cover'
													loading='lazy'
												/>
											</div>
										))}
									</div>
								) : (
									<div className='text-secondary-400'>
										Изображение недоступно
									</div>
								)}
							</div>

							{product.images.length > 1 && (
								<div className='mt-4 flex items-center justify-center gap-2'>
									{product.images.map((_, idx) => (
										<button
											key={idx}
											type='button'
											onClick={() => handleSlideSelect(idx)}
											aria-label={`Перейти к слайду ${idx + 1}`}
											className={`h-2.5 w-2.5 rounded-full transition-colors ${
												selectedImage === idx
													? "bg-primary-500"
													: "bg-secondary-300"
											}`}></button>
									))}
								</div>
							)}
						</div>

						<div className='space-y-6'>
							<h1 className='text-2xl lg:text-3xl font-semibold leading-tight text-secondary-900 lg:flex-1'>
								{product.title}
							</h1>
							{product.inStock ? (
								<Badge variant='success'>В наличии</Badge>
							) : (
								<Badge variant='danger'>Нет в наличии</Badge>
							)}
							<div className='flex flex-wrap items-center gap-6'>
								<p className='text-3xl sm:text-4xl font-semibold text-secondary-900'>
									{totalPrice}
								</p>
								<div className='flex items-center gap-2 sm:gap-1'>
									<button
										type='button'
										onClick={handleDecrement}
										disabled={qty === 1}
										aria-label='Уменьшить количество'
										className='h-10 w-10 text-base sm:h-8 sm:w-8 sm:text-sm rounded-lg border border-secondary-200 text-secondary-700 transition-all hover:bg-secondary-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'>
										-
									</button>
									<span className='min-w-[2rem] text-center text-lg font-semibold text-secondary-900'>
										{qty}
									</span>
									<button
										type='button'
										onClick={handleIncrement}
										aria-label='Увеличить количество'
										className='h-10 w-10 text-base sm:h-8 sm:w-8 sm:text-sm rounded-lg border border-secondary-200 text-secondary-700 transition-all hover:bg-secondary-100 active:scale-95'>
										+
									</button>
								</div>
							</div>

							<p className='text-secondary-600 text-bodySm md:text-body line-clamp-3'>
								{product.shortDescription || product.description}
							</p>
						</div>
					</div>

					{characteristics.length > 0 ? (
						<div className=''>
							<div className='glass-panel rounded-2xl p-4 sm:p-6'>
								<h3 className='text-xl lg:text-2xl font-semibold text-secondary-900 mb-8'>
									Характеристики
								</h3>
								<div className='grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3'>
									{characteristics.map((item) => (
										<div
											key={item.name}
											className='flex items-start justify-between gap-3 border-b border-secondary-200/60 pb-2'>
											<span className='font-semibold text-secondary-700 text-bodySm'>
												{item.name}
											</span>
											<span className='text-secondary-900 text-right text-bodySm'>
												{item.value}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					) : specEntries.length > 0 ? (
						<div className=''>
							<div className='glass-panel rounded-2xl p-4 sm:p-6'>
								<h3 className='text-xl lg:text-2xl font-semibold text-secondary-900 mb-8'>
									Характеристики
								</h3>
								<div className='grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3'>
									{specEntries.map(([key, value]) => (
										<div
											key={key}
											className='flex items-start justify-between gap-3 border-b border-secondary-200/60 pb-2'>
											<span className='font-semibold text-secondary-700 text-bodySm'>
												{formatSpecLabel(key)}
											</span>
											<span className='text-secondary-900 text-right text-bodySm'>
												{value}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					) : null}

					{!contactsLoading && hasContactLinks ? (
						<div className='glass-panel rounded-2xl p-4 sm:p-5'>
							<h3 className='text-xl lg:text-2xl font-semibold text-secondary-900 mb-6'>
								Связаться с нами
							</h3>
							<div className='grid gap-3 sm:grid-cols-2 md:grid-cols-4'>
								{contactLinks.email ? (
									<Button
										as='a'
										href={contactLinks.email}
										className='w-full flex items-center justify-center gap-2'>
										<Mail size={18} />
										Email
									</Button>
								) : null}
								{contactLinks.phone ? (
									<Button
										as='a'
										href={contactLinks.phone}
										variant='secondary'
										className='w-full flex items-center justify-center gap-2'>
										<Phone size={18} />
										Позвонить
									</Button>
								) : null}
								{contactLinks.whatsapp ? (
									<Button
										as='a'
										href={contactLinks.whatsapp}
										target='_blank'
										rel='noopener noreferrer'
										className='w-full flex items-center justify-center gap-2 text-white bg-[#27D366] hover:bg-[#27C366]'>
										<MessageCircle size={18} />
										WhatsApp
									</Button>
								) : null}
								{contactLinks.telegram ? (
									<Button
										as='a'
										href={contactLinks.telegram}
										target='_blank'
										rel='noopener noreferrer'
										className='w-full flex items-center justify-center gap-2 text-white bg-[#3490EC] hover:bg-[#3284d7]'>
										<Send size={18} />
										Telegram
									</Button>
								) : null}
							</div>
						</div>
					) : null}
				</Container>
			</Section>
		</>
	);
}
