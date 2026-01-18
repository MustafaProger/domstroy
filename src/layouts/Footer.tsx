import { Link } from "react-router-dom";
import { Container } from "../components";
import { useCategories, useContacts } from "../hooks";
import { capitalizeFirstLetter } from "../utils/string";

const quickLinks = [
	{ to: "/", label: "Главная" },
	{ to: "/catalog", label: "Продукция" },
	{ to: "/contact", label: "Контакты" },
];

export function Footer() {
	const { footerGroups, loading } = useContacts();
	const {
		categories,
		loading: categoriesLoading,
		error: categoriesError,
	} = useCategories();

	return (
		<footer className='bg-secondary-900 text-white'>
			<div className='py-14'>
				<Container>
					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>
						<div>
							<h3 className='text-h3 font-bold mb-4 text-primary-400'>
								ДомСтрой
							</h3>
							<p className='text-secondary-300 mb-4 text-bodySm'>
								Высококачественные строительные материалы для ваших проектов с
								профессиональным сервисом.
							</p>
						</div>

						<div>
							<h4 className='font-semibold mb-4 text-body text-secondary-100'>
								Быстрые ссылки
							</h4>
							<ul className='space-y-2'>
								{quickLinks.map((link) => (
									<li key={link.to}>
										<Link
											to={link.to}
											className='text-secondary-300 hover:text-primary-400 transition-colors text-bodySm'>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div>
							<h4 className='font-semibold mb-4 text-body text-secondary-100'>
								Категории
							</h4>
							<ul className='space-y-2'>
								{categoriesLoading ? (
									Array(4)
										.fill(null)
										.map((_, index) => (
											<li
												key={index}
												className='h-4 bg-secondary-800/70 rounded animate-pulse'
											/>
										))
								) : categories.length > 0 ? (
									categories.map((category) => (
										<li key={category.id}>
											<Link
												to={`/catalog?category=${category.slug}&page=1`}
												className='text-secondary-300 hover:text-primary-400 transition-colors text-bodySm'>
												{capitalizeFirstLetter(category.name)}
											</Link>
										</li>
									))
								) : (
									<li className='text-secondary-400 text-bodySm'>
										{categoriesError
											? "Категории временно недоступны"
											: "Категории пока не добавлены"}
									</li>
								)}
							</ul>
						</div>

						<div>
							<h4 className='font-semibold mb-4 text-body text-secondary-100'>
								Контактная информация
							</h4>
							{loading ? (
								<div className='space-y-3'>
									{Array(3)
										.fill(null)
										.map((_, index) => (
											<div
												key={index}
												className='h-5 bg-secondary-800/70 rounded animate-pulse'
											/>
										))}
								</div>
							) : footerGroups.length > 0 ? (
								<div className='space-y-3'>
									{footerGroups.map(({ label, Icon, items }) => (
										<div
											key={label}
											className='flex items-start gap-3'>
											<Icon
												size={18}
												className='mt-1 text-primary-400 flex-shrink-0'
											/>
											<div>
												<p className='text-caption text-secondary-400'>{label}</p>
												<div className='space-y-1'>
													{items.map((item) => (
														<a
															key={`${label}-${item.value}`}
															href={item.href}
															target={item.external ? "_blank" : undefined}
															rel={
																item.external ? "noopener noreferrer" : undefined
															}
															className='block text-secondary-100 hover:text-primary-400 transition-colors text-bodySm'>
															{item.value}
														</a>
													))}
												</div>
											</div>
										</div>
									))}
								</div>
							) : null}
						</div>
					</div>

					<div className='border-t border-secondary-800 pt-8'>
						<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
							<p className='text-secondary-400 text-bodySm'>
								&copy; {new Date().getFullYear()} ДомСтрой
							</p>
						</div>
					</div>
				</Container>
			</div>
		</footer>
	);
}
