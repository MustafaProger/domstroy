import { Link } from "react-router-dom";
import { Container } from "../components";
import { categoryLinks } from "../data/categories";
import { contactItems } from "../data/contacts";

const quickLinks = [
	{ to: "/", label: "Главная" },
	{ to: "/catalog", label: "Продукция" },
	{ to: "/contact", label: "Контакты" },
];

export function Footer() {
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
								{categoryLinks.map((link) => (
									<li key={link.label}>
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
								Контактная информация
							</h4>
							<div className='space-y-3'>
								{contactItems.map(({ label, value, href, Icon, external }) => (
									<div
										key={label}
										className='flex items-start gap-3'>
										<Icon
											size={18}
											className='mt-1 text-primary-400 flex-shrink-0'
										/>
										<div>
											<p className='text-caption text-secondary-400'>{label}</p>
											<a
												href={href}
												target={external ? "_blank" : undefined}
												rel={external ? "noopener noreferrer" : undefined}
												className='text-secondary-100 hover:text-primary-400 transition-colors text-bodySm'>
												{value}
											</a>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='border-t border-secondary-800 pt-8'>
						<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
							<div className='flex gap-6'>
								<Link
									to='/privacy-policy'
									className='text-secondary-400 hover:text-primary-400 transition-colors text-bodySm'>
									Политика конфиденциальности
								</Link>
							</div>
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
