import { SEO, Container } from "../components";

const styles = {
	containerPoint: "mb-10",
	titlePoint: "text-secondary-900 mb-3 text-2xl leading-relaxed",
	textPoint: "leading-relaxed",
};

const { containerPoint, titlePoint, textPoint } = styles;

export function PrivacyPolicy() {
	return (
		<>
			<SEO
				title='Политика конфиденциальности - ДомСтрой'
				description='Политика конфиденциальности ДомСтрой: как мы собираем и используем данные посетителей сайта.'
				keywords='политика конфиденциальности, персональные данные, домстрой'
			/>

			<section className='bg-secondary-50 border-b border-secondary-200 py-8 md:py-12'>
				<Container>
					<h1 className='text-h1 md:text-h1'>Политика конфиденциальности</h1>
					<p className='text-secondary-600 mt-2 max-w-2xl text-body-sm md:text-body'>
						Настоящая политика определяет порядок обработки информации о
						посетителях сайта.
					</p>
				</Container>
			</section>

			<section className='section-padding'>
				<Container>
					<div className='space-y-6 text-secondary-700 text-body-sm md:text-body'>
						<div className={containerPoint}>
							<h2 className={titlePoint}>1. Общие положения</h2>
							<p className={textPoint}>
								Сайт ДомСтрой является витриной строительных материалов для B2B
								и розничных клиентов. Регистрация и формы обратной связи на
								сайте отсутствуют. Взаимодействие с компанией осуществляется по
								телефону, электронной почте, WhatsApp или Telegram.
							</p>
						</div>

						<div className={containerPoint}>
							<h2 className={titlePoint}>2. Состав обрабатываемых данных</h2>
							<ul className='list-disc pl-5 space-y-1'>
								<li className={textPoint}>
									Технические данные, автоматически передаваемые при посещении
									сайта (например, IP-адрес, тип браузера, сведения об
									устройстве, дата и время посещения).
								</li>
								<li>Файлы cookies и данные аналитики посещений.</li>
								<li className={textPoint}>
									Сведения, передаваемые пользователем при обращении по
									телефону, email, WhatsApp или Telegram.
								</li>
							</ul>
							<p className={`mt-5 ${textPoint}`}>
								IP-адрес может фиксироваться в журналах сервера/хостинга и
								использоваться для обеспечения безопасности и стабильной работы
								сайта.
							</p>
						</div>

						<div className={containerPoint}>
							<h2 className={titlePoint}>3. Цели обработки данных</h2>
							<ul className='list-disc pl-5 space-y-1'>
								<li>Связь с клиентом и обработка обращений.</li>
								<li>Подготовка ответов и коммерческих предложений.</li>
								<li>Аналитика и улучшение работы сайта.</li>
							</ul>
						</div>

						<div className={containerPoint}>
							<h2 className={titlePoint}>
								4. Передача данных третьим сервисам
							</h2>
							<p className={textPoint}>
								Для обеспечения работы сайта и коммуникаций данные могут
								передаваться аналитическим сервисам, мессенджерам (WhatsApp,
								Telegram), а также провайдеру хостинга и техническим
								подрядчикам.
							</p>
						</div>

						<div className={containerPoint}>
							<h2 className={titlePoint}>5. Защита данных</h2>
							<p className={textPoint}>
								Компания принимает необходимые технические и организационные
								меры для защиты данных от несанкционированного доступа, утечек и
								иных рисков.
							</p>
						</div>

						<div className={containerPoint}>
							<h2 className={titlePoint}>6. Права пользователя</h2>
							<ul className='list-disc pl-5 space-y-1'>
								<li>Запросить сведения о данных, которые обрабатываются.</li>
								<li>Попросить уточнить или обновить данные.</li>
								<li>
									Попросить удалить данные, если это не противоречит
									обязательным требованиям.
								</li>
							</ul>
						</div>

						<div className={containerPoint}>
							<h2 className={titlePoint}>7. Контакты</h2>
							<p>
								По вопросам обработки данных:{" "}
								<a href='mailto:abuzarkamilov@gmail.com'>
									abuzarkamilov@gmail.com
								</a>{" "}
								и<a href='tel:+79969979239'> +7 996 997 92 39</a>.
							</p>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
}
