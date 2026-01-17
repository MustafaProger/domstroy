import { SEO, Container, Section, Card } from "../components";
import { useContacts } from "../hooks";

export function Contact() {
	const { contactItems, loading } = useContacts();

	return (
		<>
			<SEO
				title='Контакты - ДомСтрой'
				description='Свяжитесь со СтройМатериалами для расценок, запросов о продукции и поддержки клиентов. Доступны телефон, email, WhatsApp и Telegram.'
				keywords='контакты, поддержка, расценка, запрос'
			/>

			<Section
				variant='contacts'
				className='liquid-glass-for-bread-crumbs'>
				<Container>
					<h1>Свяжитесь с нами</h1>
					<p className='text-secondary-600 mt-2 max-w-xl text-bodySm md:text-body'>
						Свяжитесь с нашей командой для расценок, запросов или любых вопросов
						о нашей продукции и услугах
					</p>
				</Container>
			</Section>

			<Section className='bg-secondary-100/60 border-t border-secondary-200/60'>
				<Container>
					<div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12'>
						{loading
							? Array(4)
									.fill(null)
									.map((_, index) => (
										<Card
											key={index}
											className='feature-card transition-all duration-300'>
											<div className='h-12 w-12 rounded-full bg-secondary-200/70 animate-pulse mx-auto mb-4' />
											<div className='h-5 w-32 bg-secondary-200/70 animate-pulse mx-auto mb-3 rounded' />
											<div className='h-4 w-40 bg-secondary-200/70 animate-pulse mx-auto rounded' />
										</Card>
									))
							: contactItems.map(
									({ label, value, href, Icon: Icon, external }) => (
										<Card
											key={`${label}-${value}`}
											className='feature-card transition-all duration-300'>
											<Icon className='w-12 h-12 text-primary-500 mx-auto mb-4' />
											<h3 className='text-h3 font-bold mb-2 text-center'>
												{label}
											</h3>
											<a
												href={href}
												target={external ? "_blank" : undefined}
												rel={external ? "noopener noreferrer" : undefined}
												className='text-secondary-600 hover:text-primary-500 font-semibold text-bodySm text-center'>
												{value}
											</a>
										</Card>
									)
							  )}
					</div>

					<Card className='p-0 overflow-hidden'>
						<iframe
							title='Карта'
							src='https://yandex.ru/map-widget/v1/?um=constructor%3Adedb77a49f9fda2ac38f0164aaea67d0384e09cca3b6033832268d3ad24cbf29&amp;source=constructor'
							className='w-full h-[400px] border-0'
							loading='lazy'
							referrerPolicy='no-referrer-when-downgrade'
						/>
					</Card>
				</Container>
			</Section>
		</>
	);
}
