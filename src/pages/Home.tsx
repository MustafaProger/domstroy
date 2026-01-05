import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, TrendingUp, Heart } from "lucide-react";
import { SEO, Container, Button, Card, SkeletonCard } from "../components";
import { useCategories } from "../hooks";
import { companyInfo } from "../data/products";

const features = [
	{
		number: "01",
		title: "Качество",
		description:
			"Продукты соответствуют международным стандартам и проходят контроль качества",
		icon: Award,
	},
	{
		number: "02",
		title: "Поддержка",
		description: "Наша команда предоставляет профессиональные консультации",
		icon: Users,
	},
	{
		number: "03",
		title: "Цены",
		description: "Лучшие цены на рынке без компромиссов в качестве",
		icon: TrendingUp,
	},
	{
		number: "04",
		title: "Надежность",
		description:
			"Быстрая доставка и стабильный сервис, на который можно положиться",
		icon: Heart,
	},
];

export function Home() {
	const { categories, loading: categoriesLoading } = useCategories();

	return (
		<>
			<SEO
				title='ДомСтрой - Премиальные строительные материалы'
				description='Высококачественные строительные материалы включая цемент, кирпич, сталь и инструменты. Быстрая доставка и конкурентные цены.'
				keywords='строительные материалы, цемент, кирпич, сталь, инструменты, поставки'
			/>

			<section className='hero-section'>
				<div
					className='hero-overlay'
					aria-hidden='true'
				/>
				<Container className='relative z-10 text-center'>
					<h1 className='text-h1 mb-4 text-white md:text-display'>
						Премиальные строительные <br /> материалы для каждого проекта
					</h1>
					<p className='text-body md:text-h3 text-secondary-200 mb-8 max-w-2xl mx-auto'>
						Надежный поставщик высококачественных строительных материалов.
						Быстрая доставка, конкурентные цены и профессиональный сервис.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button
							as='a'
							href='/catalog'
							variant='primary'>
							Каталог
							<ArrowRight
								className='inline ml-2'
								size={20}
							/>
						</Button>
						<a
							href='https://wa.me/79969979239'
							target='_blank'
							rel='noopener noreferrer'
							className='btn-secondary text-center'>
							Написать в WhatsApp
						</a>
					</div>
				</Container>
			</section>

			<section className='section-padding'>
				<Container>
					<div className='grid lg:grid-cols-2 gap-12 items-center'>
						<div>
							<h2 className='mb-4'>Наша история</h2>
							<p className='text-secondary-700 mb-4 leading-relaxed'>
								Основанная в 2006 году, компания ДомСтрой начала с простой
								миссии: предоставлять высококачественные строительные материалы
								по справедливым ценам. То, что начиналось как небольшое
								предприятие, выросло в одного из самых надежных поставщиков
								региона для строительных профессионалов.
							</p>
							<p className='text-secondary-700 mb-4 leading-relaxed'>
								За {new Date().getFullYear() - companyInfo.foundedYear} лет мы
								построили прочные отношения с подрядчиками, строительными
								компаниями и индивидуальными строителями. Наша приверженность
								качеству, надежности и исключительному обслуживанию клиентов
								сделала нас предпочтительным выбором для тысяч проектов.
							</p>
							<p className='text-secondary-700 leading-relaxed'>
								Сегодня мы работаем на современном объекте, укомплектованном
								более чем 300 строительными продуктами, поддерживаемые командой
								опытных профессионалов, преданных вашему успеху.
							</p>
						</div>
						<div>
							<img
								src='/img/about-us.png'
								alt='Объект ДомСтрой'
								className='rounded-lg shadow-lg w-full h-96 object-cover'
							/>
						</div>
					</div>
				</Container>
			</section>

			<section className='bg-secondary-50 py-12 md:py-16'>
				<Container>
					<div className='mb-12 text-center'>
						<h2>Почему выбирают нас</h2>
						<p className='text-secondary-600 mt-4 max-w-xl mx-auto'>
							Мы преданы успеху вашего проекта благодаря качественным материалам
							и профессиональному сервису
						</p>
					</div>

					<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{features.map(({ number, title, description, icon: Icon }) => (
							<Card
								key={number}
								className='feature-card'>
								<div className='flex flex-col items-start mb-4'>
									<div className='feature-number'>{number}</div>
									<span className='h-1 w-10 bg-primary-500 rounded-full' />
								</div>

								<Icon className='w-12 h-12 text-primary-500 mx-auto mb-4' />

								<h3 className='font-bold text-lg mb-2 text-center'>{title}</h3>

								<p className='text-secondary-600 text-sm text-center leading-relaxed'>
									{description}
								</p>
							</Card>
						))}
					</div>
				</Container>
			</section>

			<section className='section-padding'>
				<Container>
					<div className='mb-12 text-center'>
						<h2>Категории продукции</h2>
						<p className='text-secondary-600 mt-4 max-w-xl mx-auto'>
							Изучите наш полный ассортимент строительных материалов,
							организованный по категориям
						</p>
					</div>

					<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{categoriesLoading
							? Array(6)
									.fill(null)
									.map((_, i) => <SkeletonCard key={i} />)
							: categories.slice(0, 6).map((category) => (
									<Link
										key={category.id}
										to={`/catalog?category=${category.slug}`}>
										<Card
											hover
											className='overflow-hidden h-full'>
											<div className='w-full h-48 overflow-hidden bg-secondary-100'>
												<img
													src={category.image}
													alt={category.name}
													className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
												/>
											</div>
											<div className='p-6'>
												<h3 className='text-xl font-bold text-secondary-900 mb-2'>
													{category.name}
												</h3>
												<p className='text-secondary-600 text-sm mb-4'>
													{category.description}
												</p>
												<div className='flex items-center justify-between'>
													<span className='text-sm font-semibold text-primary-600'>
														{category.productCount} товаров
													</span>
													<ArrowRight
														size={18}
														className='text-primary-500'
													/>
												</div>
											</div>
										</Card>
									</Link>
							  ))}
					</div>
				</Container>
			</section>

			<section className='bg-secondary-100 py-12 md:py-16'>
				<Container>
					<div className='grid sm:grid-cols-3 gap-8'>
						<div className='text-center'>
							<Award className='w-12 h-12 mx-auto text-primary-500 mb-4' />
							<h3 className='font-bold text-lg mb-2'>20+ лет</h3>
							<p className='text-secondary-700'>Надежный поставщик в отрасли</p>
						</div>
						<div className='text-center'>
							<Users className='w-12 h-12 mx-auto text-primary-500 mb-4' />
							<h3 className='font-bold text-lg mb-2'>1500+ клиентов</h3>
							<p className='text-secondary-700'>
								Строительные профессионалы и компании
							</p>
						</div>
						<div className='text-center'>
							<TrendingUp className='w-12 h-12 mx-auto text-primary-500 mb-4' />
							<h3 className='font-bold text-lg mb-2'>300+ товаров</h3>
							<p className='text-secondary-700'>
								Полный ассортимент материалов
							</p>
						</div>
					</div>
				</Container>
			</section>

			<section className='bg-primary-500 text-secondary-900 py-12 md:py-16'>
				<Container className='text-center'>
					<h2 className='text-white mb-4'>Готовы начать?</h2>
					<p className='text-white text-lg mb-8 max-w-2xl mx-auto'>
						Свяжитесь с нами сегодня для получения расценки или обсуждения ваших
						потребностей в строительных материалах
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<a
							href='tel:+79969979239'
							className='btn-secondary text-center'>
							Позвонить сейчас
						</a>
						<Link
							to='/contact'
							className='btn-outline text-center'>
							Запросить расценку
						</Link>
					</div>
				</Container>
			</section>
		</>
	);
}
