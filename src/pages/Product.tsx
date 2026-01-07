import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
	MessageCircle,
	Phone,
	Mail,
	Share2,
	ChevronLeft,
	ChevronRight,
	Send,
} from "lucide-react";
import {
	SEO,
	Container,
	Section,
	Button,
	Card,
	Loading,
	Badge,
} from "../components";
import { useProductBySlug } from "../hooks";
import { SPEC_LABELS } from "../features/product/constants";

export function Product() {
	const { slug = "" } = useParams();
	const { product, loading, error } = useProductBySlug(slug);
	const [selectedImage, setSelectedImage] = useState(0);

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

	const handlePrevImage = () => {
		setSelectedImage((prev) =>
			prev === 0 ? product.images.length - 1 : prev - 1
		);
	};

	const handleNextImage = () => {
		setSelectedImage((prev) =>
			prev === product.images.length - 1 ? 0 : prev + 1
		);
	};

	const formatSpecLabel = (key: string) => {
		if (SPEC_LABELS[key]) return SPEC_LABELS[key];
		const normalized = key.replace(/_/g, " ");
		return normalized.charAt(0).toUpperCase() + normalized.slice(1);
	};

	return (
		<>
			<SEO
				title={`${product.title} - ДомСтрой`}
				description={product.shortDescription}
				keywords={`${product.title}, ${product.category}, строительные материалы`}
			/>

			<Section
				variant='hero'
				className='bg-secondary-50 border-b border-secondary-200'>
				<Container>
					<div className='flex items-center gap-2 text-bodySm text-secondary-600'>
						<Link
							to='/'
							className='hover:text-primary-500'>
							Главная
						</Link>
						<span>/</span>
						<Link
							to='/catalog'
							className='hover:text-primary-500'>
							Каталог
						</Link>
						<span>/</span>
						<span>{product.title}</span>
					</div>
				</Container>
			</Section>

			<Section>
				<Container>
					<div className='grid lg:grid-cols-2 gap-12'>
						<div>
							<div className='mb-4 bg-secondary-100 rounded-2xl overflow-hidden flex items-center justify-center h-96 relative'>
								{product.images.length > 0 ? (
									<>
										<img
											src={product.images[selectedImage]}
											alt={product.title}
											className='w-full h-full object-cover'
										/>
										{product.images.length > 1 && (
											<>
												<button
													onClick={handlePrevImage}
													className='absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-secondary-100 transition-colors shadow-lg'
													aria-label='Предыдущее изображение'>
													<ChevronLeft size={24} />
												</button>
												<button
													onClick={handleNextImage}
													className='absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 hover:bg-secondary-100 transition-colors shadow-lg'
													aria-label='Следующее изображение'>
													<ChevronRight size={24} />
												</button>
											</>
										)}
									</>
								) : (
									<div className='text-secondary-400'>
										Изображение недоступно
									</div>
								)}
							</div>

							{product.images.length > 1 && (
								<div className='flex gap-2 overflow-x-auto'>
									{product.images.map((image, idx) => (
										<button
											key={idx}
											onClick={() => setSelectedImage(idx)}
											className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
												selectedImage === idx
													? "border-primary-500"
													: "border-secondary-200"
											}`}>
											<img
												src={image}
												alt={`${product.title} ${idx + 1}`}
												className='w-full h-full object-cover'
											/>
										</button>
									))}
								</div>
							)}
						</div>

						<div>
							<div className='mb-4'>
								<div className='flex items-start justify-between mb-4'>
									<div>
										<p className='text-primary-600 font-semibold text-caption uppercase mb-2'>
											{product.category}
										</p>
										<h1 className='text-h1 md:text-display font-bold text-secondary-900'>
											{product.title}
										</h1>
									</div>
									<button className='p-2 hover:bg-secondary-100 rounded-full transition-colors'>
										<Share2 size={24} />
									</button>
								</div>

								{product.price && (
									<p className='text-h2 font-semibold text-secondary-900 mb-3'>
										{product.price}
									</p>
								)}
								<p className='text-secondary-700 text-body mb-4'>
									{product.description}
								</p>

								<div className='flex items-center gap-4 mb-6 pb-6 border-b border-secondary-200'>
									{product.inStock ? (
										<Badge variant='success'>В наличии</Badge>
									) : (
										<Badge variant='warning'>Нет в наличии</Badge>
									)}
								</div>
							</div>

							<Card className='p-6 mb-8 bg-secondary-50'>
								<h3 className='text-h3 font-bold mb-4'>Характеристики</h3>
								<div className='space-y-3'>
									{Object.entries(product.specifications).map(
										([key, value]) => (
											<div
												key={key}
												className='flex justify-between items-start border-b border-secondary-200 pb-3'>
												<span className='font-semibold text-secondary-700 text-bodySm'>
													{formatSpecLabel(key)}
												</span>
												<span className='text-secondary-900 text-right text-bodySm'>
													{value}
												</span>
											</div>
										)
									)}
								</div>
							</Card>

							<div className='space-y-3 mb-8'>
								<h3 className='text-h3 font-bold'>Связаться с нами</h3>
								<a
									href='tel:+79969979239'
									className='btn-secondary flex items-center justify-center gap-2'>
									<Phone size={20} />
									Позвонить: +7 996 997 92 39
								</a>
								<a
									href='https://wa.me/79969979239'
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors'>
									<MessageCircle size={20} />
									Написать в WhatsApp
								</a>
								<a
									href='mailto:abuzarkamilov@gmail.com'
									className='btn-outline flex items-center justify-center gap-2'>
									<Mail size={20} />
									Написать на email
								</a>
								<a
									href='https://t.me/Abuzarr222'
									target='_blank'
									rel='noopener noreferrer'
									className='btn-outline flex items-center justify-center gap-2'>
									<Send size={20} />
									Написать в Telegram
								</a>
							</div>

							<Card className='p-6 bg-primary-50 border border-primary-200'>
								<h3 className='text-h3 font-bold text-secondary-900 mb-2'>
									Запросить расценку
								</h3>
								<p className='text-secondary-700 mb-4 text-bodySm'>
									Нужны большие объемы или специальные цены? Сообщите нам, и мы
									предоставим индивидуальную расценку.
								</p>
								<Link to={`/contact?product=${product.id}`}>
									<Button
										fullWidth
										variant='primary'>
										Запросить расценку на этот товар
									</Button>
								</Link>
							</Card>
						</div>
					</div>
				</Container>
			</Section>
		</>
	);
}
