import { Product, Category, Testimonial } from "../types";

export const categories: Category[] = [
	{
		id: "1",
		name: "Цемент и бетон",
		slug: "cement-beton",
		description: "Высококачественный цемент и готовые бетонные смеси",
		image: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg",
		productCount: 15,
	},
	{
		id: "2",
		name: "Кирпичи и блоки",
		slug: "kirpichi-bloki",
		description: "Прочные кирпичи и бетонные блоки для строительства",
		image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
		productCount: 12,
	},
	{
		id: "3",
		name: "Сталь и железо",
		slug: "stal-zhelezo",
		description: "Арматура и металлические конструкции",
		image: "https://images.pexels.com/photos/262367/pexels-photo-262367.jpeg",
		productCount: 18,
	},
	{
		id: "4",
		name: "Инструменты и оборудование",
		slug: "instrumenty-oborudovanie",
		description: "Профессиональные строительные инструменты и оборудование",
		image: "https://images.pexels.com/photos/2663867/pexels-photo-2663867.jpeg",
		productCount: 25,
	},
	{
		id: "5",
		name: "Древесина и пиломатериалы",
		slug: "drevesina",
		description: "Качественные пиломатериалы и изделия из дерева",
		image: "https://images.pexels.com/photos/1884580/pexels-photo-1884580.jpeg",
		productCount: 10,
	},
	{
		id: "6",
		name: "Краски и покрытия",
		slug: "kraski-pokrytiya",
		description: "Премиальные краски и защитные покрытия",
		image: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg",
		productCount: 22,
	},
];

export const products: Product[] = [
	{
		id: "prod-001",
		title: "Портландцемент 50 кг",
		slug: "portlandcement-50kg",
		category: "Цемент и бетон",
		categoryId: "1",
		description:
			"Высококачественный портландцемент, подходящий для всех бетонных работ. Соответствует международным стандартам прочности и долговечности.",
		shortDescription: "Премиальный цемент для бетонных конструкций",
		images: [
			"https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg",
		],
		specifications: {
			weight: "50 кг",
			compressive_strength: "42.5 МПа",
			setting_time: "45 минут",
			fineness: "3000 см²/г",
			moisture_content: "<1%",
		},
		sku: "PC-50-001",
		inStock: true,
	},
	{
		id: "prod-002",
		title: "Бетонный блок 190×190×390 мм",
		slug: "betonnyy-blok-190x190x390",
		category: "Кирпичи и блоки",
		categoryId: "2",
		description:
			"Конструкционные бетонные блоки для несущих стен. Высокая прочность и отличная износостойкость.",
		shortDescription: "Несущие бетонные блоки",
		images: [
			"https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
		],
		specifications: {
			dimensions: "190 × 190 × 390 мм",
			compressive_strength: "4.5 МПа",
			weight: "10.5 кг",
			density: "1450 кг/м³",
			water_absorption: "8%",
		},
		sku: "CB-190-001",
		inStock: true,
	},
	{
		id: "prod-003",
		title: "Арматура 12 мм",
		slug: "armatura-12mm",
		category: "Сталь и железо",
		categoryId: "3",
		description:
			"Высокопрочная арматура для железобетонных конструкций. Соответствует всем строительным нормам.",
		shortDescription: "Арматура для строительных конструкций",
		images: [
			"https://images.pexels.com/photos/262367/pexels-photo-262367.jpeg",
		],
		specifications: {
			diameter: "12 мм",
			yield_strength: "500 МПа",
			tensile_strength: "650 МПа",
			weight_per_meter: "0.888 кг",
			grade: "Fe500",
		},
		sku: "SB-12-001",
		inStock: true,
	},
	{
		id: "prod-004",
		title: "Профессиональная дрель",
		slug: "professionalnaya-drel",
		category: "Инструменты и оборудование",
		categoryId: "4",
		description:
			"Мощная профессиональная дрель для строительных работ. Регулировка скорости и эргономичный дизайн.",
		shortDescription: "Промышленная дрель",
		images: [
			"https://images.pexels.com/photos/2663867/pexels-photo-2663867.jpeg",
		],
		specifications: {
			power: "800 Вт",
			no_load_speed: "0–3000 об/мин",
			chuck_capacity: "13 мм",
			weight: "2.5 кг",
			voltage: "220 В",
		},
		sku: "PD-800-001",
		inStock: true,
	},
	{
		id: "prod-005",
		title: "Фанера 18 мм (4×8 футов)",
		slug: "fanera-18mm-4x8",
		category: "Древесина и пиломатериалы",
		categoryId: "5",
		description:
			"Качественная фанера для опалубки и внутренних работ. Многослойная структура обеспечивает прочность.",
		shortDescription: "Фанера для строительства",
		images: [
			"https://images.pexels.com/photos/1884580/pexels-photo-1884580.jpeg",
		],
		specifications: {
			thickness: "18 мм",
			dimensions: "1220 × 2440 мм",
			grade: "BB",
			weight: "23 кг",
			adhesive_type: "Фенолформальдегидная",
		},
		sku: "PB-18-001",
		inStock: true,
	},
	{
		id: "prod-006",
		title: "Фасадная краска 20 л",
		slug: "fasadnaya-kraska-20l",
		category: "Краски и покрытия",
		categoryId: "6",
		description:
			"Премиальная фасадная краска с высокой устойчивостью к погодным условиям и ультрафиолету.",
		shortDescription: "Устойчивая фасадная краска",
		images: [
			"https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg",
		],
		specifications: {
			volume: "20 литров",
			coverage: "400 кв. футов на литр",
			finish: "Матовая / Сатиновая",
			drying_time: "4–6 часов",
			sheen: "Полуматовая",
		},
		sku: "EP-20-001",
		inStock: true,
	},
];

export const testimonials: Testimonial[] = [
	{
		id: "1",
		name: "Иван Петров",
		company: "Петров Строй",
		content:
			"Отличное качество материалов и быстрая доставка. Всегда заказываем здесь для строительных объектов.",
		rating: 5,
		image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
	},
	{
		id: "2",
		name: "Мария Иванова",
		company: "Иванова Инжиниринг",
		content:
			"Отличный сервис и адекватные цены. Материалы всегда приходят в идеальном состоянии.",
		rating: 5,
		image: "https://images.pexels.com/photos/1181267/pexels-photo-1181267.jpeg",
	},
	{
		id: "3",
		name: "Алексей Смирнов",
		company: "Смирнов и Ко",
		content:
			"Работаем уже более 3 лет. Стабильное качество и надежный поставщик.",
		rating: 5,
		image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
	},
	{
		id: "4",
		name: "Анна Кузнецова",
		company: "Кузнецова Девелопмент",
		content:
			"Большой выбор товаров и профессиональная поддержка клиентов. Рекомендую.",
		rating: 5,
		image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
	},
];

export const companyInfo = {
	name: "BuildMate",
	foundedYear: 1995,
	description:
		"BuildMate — надежный поставщик строительных материалов с более чем 25-летним опытом. Мы предлагаем качественную продукцию и высокий уровень сервиса.",
	phone: "+7 (900) 123-45-67",
	whatsapp: "+7 (900) 123-45-67",
	email: "info@buildmate.ru",
	address: "г. Москва, Промышленная улица, 12",
	hours:
		"Понедельник – Пятница: 08:00 – 18:00\nСуббота: 08:00 – 16:00\nВоскресенье: выходной",
	image: "https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg",
};
