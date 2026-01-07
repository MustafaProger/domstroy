import { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { useCategories, useProductBySlug } from "../hooks";
import { SPEC_LABELS } from "../features/product/constants";
import { formatPrice, parsePrice } from "../utils/price";

export function Product() {
	const { slug = "" } = useParams();
	const { product, loading, error } = useProductBySlug(slug);
	const { categories } = useCategories();
	const [selectedImage, setSelectedImage] = useState(0);
	const sliderRef = useRef<HTMLDivElement | null>(null);

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

	const categorySlug = useMemo(() => {
		if (!product) return "";
		const match = categories.find(
			(category) => category.name === product.category
		);
		return match?.slug || "";
	}, [categories, product]);

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

	const priceValue = parsePrice(product.price);
	const formattedPrice = priceValue
		? formatPrice(priceValue)
		: "Цена по запросу";
	const specEntries = Object.entries(product.specifications);

	return (
		<>
			<SEO
				title={`${product.title} - ДомСтрой`}
				description={product.shortDescription}
				keywords={`${product.title}, ${product.category}, строительные материалы`}
			/>

			<Section
				variant='default'
				className='liquid-glass-for-bread-crumbs pb-4'>
				<Container>
					<Breadcrumbs
						className='mt-4 mb-4'
						items={[
							{ label: "Главная", href: "/" },
							{ label: "Каталог", href: "/catalog" },
							...(categorySlug
								? [
										{
											label: product.category,
											href: `/catalog?category=${categorySlug}`,
										},
								  ]
								: [{ label: product.category, href: "/catalog" }]),
							{ label: product.title },
						]}
					/>
				</Container>
			</Section>

			<Section className='pt-0 md:pt-0'>
				<Container>
					<div className='grid lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-8 lg:gap-10 items-start'>
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
							<div className='flex flex-wrap items-center gap-3'>
								<p className='text-2xl sm:text-3xl font-semibold text-secondary-900'>
									{formattedPrice}
								</p>
								{product.inStock ? (
									<Badge variant='success'>В наличии</Badge>
								) : (
									<Badge variant='danger'>Нет в наличии</Badge>
								)}
							</div>
							<p className='text-secondary-600 text-bodySm md:text-body line-clamp-3'>
								{product.shortDescription || product.description}
							</p>

							<div className='glass-panel rounded-2xl p-4 sm:p-5'>
								<h3 className='text-xl lg:text-2xl font-semibold text-secondary-900 mb-6'>
									Связаться с нами
								</h3>
								<div className='grid gap-3 sm:grid-cols-2'>
									<Button
										as='a'
										href='https://wa.me/79969979239'
										target='_blank'
										rel='noopener noreferrer'
										className='w-full flex items-center justify-center gap-2 text-white bg-[#27D366] hover:bg-[#27C366]'>
										<MessageCircle size={18} />
										WhatsApp
									</Button>
									<Button
										as='a'
										href='https://t.me/Abuzarr222'
										target='_blank'
										rel='noopener noreferrer'
										className='w-full flex items-center justify-center gap-2 text-white bg-[#3490EC] hover:bg-[#3284d7]'>
										<Send size={18} />
										Telegram
									</Button>
									<Button
										as='a'
										href='tel:+79969979239'
										variant='secondary'
										className='w-full flex items-center justify-center gap-2'>
										<Phone size={18} />
										Позвонить
									</Button>
									<Button
										as='a'
										href='mailto:abuzarkamilov@gmail.com'
										className='w-full flex items-center justify-center gap-2'>
										<Mail size={18} />
										Email
									</Button>
								</div>
							</div>
						</div>
					</div>

					<div className='mt-8 sm:mt-10'>
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
				</Container>
			</Section>
		</>
	);
}
