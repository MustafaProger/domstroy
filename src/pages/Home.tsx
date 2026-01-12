import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
	SEO,
	Container,
	Section,
	Button,
	Card,
	SkeletonCard,
} from "../components";
import { useCategories, useContacts } from "../hooks";
import { HOME_FEATURES } from "../features/home/constants";

export function Home() {
	const {
		categories,
		loading: categoriesLoading,
		error: categoriesError,
	} = useCategories();
	const { links: contactLinks, loading: contactsLoading } = useContacts();

	return (
		<>
			<SEO
				title='ДомСтрой - Премиальные строительные материалы'
				description='Высококачественные строительные материалы включая цемент, кирпич, сталь и инструменты. Быстрая доставка и конкурентные цены.'
				keywords='строительные материалы, цемент, кирпич, сталь, инструменты, поставки'
			/>

			<Section
				variant='hero'
				className='hero-section'>
				<div
					className='hero-overlay'
					aria-hidden='true'
				/>
				<Container className='relative z-10 text-center'>
					<h1 className='text-h1 mb-4 text-white md:text-display'>
						Премиальные строительные <br /> материалы для каждого проекта
					</h1>
					<p className='text-body text-secondary-200 mb-8 max-w-2xl mx-auto'>
						Надежный поставщик высококачественных строительных материалов.
						Быстрая доставка, конкурентные цены и профессиональный сервис.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						{contactLinks.whatsapp ? (
							<a
								href={contactLinks.whatsapp}
								target='_blank'
								rel='noopener noreferrer'
								className='btn-outline text-white bg-white/10 border-white/60 hover:bg-white hover:text-black w-60 m-auto sm:m-[0]'>
								Написать в WhatsApp
							</a>
						) : contactsLoading ? (
							<div className='h-12 w-60 rounded-xl bg-white/20 animate-pulse m-auto sm:m-[0]' />
						) : (
							<span className='btn-outline text-white/70 bg-white/10 border-white/40 w-60 m-auto sm:m-[0] cursor-not-allowed'>
								Написать в WhatsApp
							</span>
						)}
						<Button
							as='a'
							href='/catalog'
							className='btn-outline-yellow w-60 group m-auto sm:m-[0] bg-primary-500/10'>
							Каталог
							<ArrowRight
								className='inline translate-x-1 group-hover:translate-x-2 transition-transform duration-300'
								size={20}
							/>
						</Button>
					</div>
				</Container>
			</Section>

			<Section>
				<Container>
					<div className='grid lg:grid-cols-[1fr_auto_auto] gap-12 items-center'>
						<div>
							<h2 className='mb-8 text-h2 md:text-h1'>Наша история</h2>
							<p className='text-secondary-700 mb-4 leading-relaxed'>
								Основанная в 2006 году, компания ДомСтрой начала с простой
								миссии: предоставлять высококачественные строительные материалы
								по справедливым ценам. То, что начиналось как небольшое
								предприятие, выросло в одного из самых надежных поставщиков
								региона для строительных профессионалов.
							</p>
							<p className='text-secondary-700 mb-4 leading-relaxed'>
								За {new Date().getFullYear() - 2006} лет мы
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
						<div
							className='hidden lg:block h-full w-px bg-secondary-200/80'
							aria-hidden='true'
						/>
						<div
							className='lg:hidden h-px w-full bg-secondary-200/80'
							aria-hidden='true'
						/>
						<div className='space-y-10 lg:pt-2 text-center lg:text-left'>
							<div>
								<p className='text-h1 md:text-display font-extrabold text-primary-500'>
									20+
								</p>
								<p className='mt-2 text-secondary-600 text-bodySm'>
									Надёжный поставщик в отрасли
								</p>
							</div>
							<div>
								<p className='text-h1 md:text-display font-extrabold text-primary-500'>
									1500+
								</p>
								<p className='mt-2 text-secondary-600 text-bodySm'>
									Строительные профессионалы и компании
								</p>
							</div>
							<div>
								<p className='text-h1 md:text-display font-extrabold text-primary-500'>
									300+
								</p>
								<p className='mt-2 text-secondary-600 text-bodySm'>
									Полный ассортимент материалов
								</p>
							</div>
						</div>
					</div>
				</Container>
			</Section>

			<Section className='bg-secondary-50'>
				<Container>
					<div className='mb-12 text-center'>
						<h2 className='text-h2 md:text-h1'>Почему выбирают нас</h2>
						<p className='text-secondary-600 mt-4 max-w-xl mx-auto text-bodySm md:text-body'>
							Мы преданы успеху вашего проекта благодаря качественным материалам
							и профессиональному сервису
						</p>
					</div>

					<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{HOME_FEATURES.map(({ number, title, description, icon: Icon }) => (
							<Card
								key={number}
								className='feature-card transition-all duration-300'>
								<div className='flex flex-col items-start mb-4'>
									<div className='feature-number'>{number}</div>
									<span className='h-1 w-10 bg-primary-500 rounded-full' />
								</div>

								<Icon className='w-12 h-12 text-primary-500 mx-auto mb-4' />

								<h3 className='text-h3 font-bold mb-2 text-center'>{title}</h3>

								<p className='text-secondary-600 text-bodySm text-center'>
									{description}
								</p>
							</Card>
						))}
					</div>
				</Container>
			</Section>

			<Section>
				<Container>
					<div className='mb-12 text-center'>
						<h2 className='text-h2 md:text-h1'>Категории продукции</h2>
						<p className='text-secondary-600 mt-4 max-w-xl mx-auto text-bodySm md:text-body'>
							Изучите наш полный ассортимент строительных материалов,
							организованный по категориям
						</p>
					</div>

					<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{categoriesLoading ? (
							Array(6)
								.fill(null)
								.map((_, i) => <SkeletonCard key={i} />)
						) : categories.length > 0 ? (
							categories.slice(0, 6).map((category) => (
								<Link
									key={category.id}
									to={`/catalog?category=${category.slug}&page=1`}>
									<Card
										hover
										className='overflow-hidden h-full'>
										<div className='w-full h-48 overflow-hidden bg-secondary-100'>
											{category.image ? (
												<img
													src={category.image}
													alt={category.name}
													className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
												/>
											) : (
												<div
													className='w-full h-full bg-gradient-to-br from-primary-100 via-secondary-100 to-secondary-200'
													aria-hidden='true'
												/>
											)}
										</div>
										<div className='p-6'>
											<h3 className='text-h3 font-bold text-secondary-900 mb-2'>
												{category.name}
											</h3>
											<p className='text-secondary-600 text-bodySm mb-4'>
												{category.description}
											</p>
											<div className='flex items-center justify-between'>
												<span className='text-bodySm font-semibold text-primary-600'>
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
							))
						) : (
							<Card className='col-span-full p-8 text-center bg-white/80 border-secondary-200/70 shadow-sm'>
								<p className='text-secondary-600 text-body'>
									{categoriesError
										? "Категории временно недоступны"
										: "Категории пока не добавлены"}
								</p>
							</Card>
						)}
					</div>
				</Container>
			</Section>

			<Section variant='form'>
				<Container>
					<div className='mx-auto max-w-3xl rounded-2xl border border-secondary-200 bg-white px-8 py-10 text-center sm:px-10'>
						<h2 className='text-secondary-900 mb-4 text-h2 md:text-h1'>
							Готовы начать?
						</h2>
						<p className='text-secondary-700 text-body mb-8'>
							Поможем подобрать материалы, рассчитать объём и предложить
							оптимальные условия поставки
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							{contactLinks.whatsapp ? (
								<Link
									to={contactLinks.whatsapp}
									target='_blank'
									rel='noopener noreferrer'
									className='btn-outline border-secondary-900/50 hover:bg-secondary-50'>
									Обсудить заказ
								</Link>
							) : contactsLoading ? (
								<div className='h-11 w-44 rounded-xl bg-secondary-200/70 animate-pulse' />
							) : (
								<span className='btn-outline border-secondary-900/30 text-secondary-500 cursor-not-allowed'>
									Обсудить заказ
								</span>
							)}
							{contactLinks.phone ? (
								<Button
									as='a'
									href={contactLinks.phone}
									className='group'>
									Позвонить сейчас
									<ArrowRight
										className='inline translate-x-1 group-hover:translate-x-2 transition-transform duration-300'
										size={20}
									/>
								</Button>
							) : contactsLoading ? (
								<div className='h-11 w-44 rounded-xl bg-secondary-200/70 animate-pulse' />
							) : (
								<span className='btn-primary px-6 py-3 text-bodySm md:text-body font-semibold rounded-xl opacity-60 cursor-not-allowed'>
									Позвонить сейчас
								</span>
							)}
						</div>
					</div>
				</Container>
			</Section>
		</>
	);
}
