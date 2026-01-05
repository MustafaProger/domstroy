import { Product, Category, Testimonial } from "../types";

const baseCategories: Array<Omit<Category, "productCount">> = [
	{
		id: "1",
		name: "Цемент и бетон",
		slug: "cement-beton",
		description: "Высококачественный цемент и готовые бетонные смеси",
		image: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg",
	},
	{
		id: "2",
		name: "Кирпичи и блоки",
		slug: "kirpichi-bloki",
		description: "Прочные кирпичи и бетонные блоки для строительства",
		image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
	},
	{
		id: "3",
		name: "Сталь и железо",
		slug: "stal-zhelezo",
		description: "Арматура и металлические конструкции",
		image: "https://images.pexels.com/photos/262367/pexels-photo-262367.jpeg",
	},
	{
		id: "4",
		name: "Инструменты и оборудование",
		slug: "instrumenty-oborudovanie",
		description: "Профессиональные строительные инструменты и оборудование",
		image: "https://images.pexels.com/photos/2663867/pexels-photo-2663867.jpeg",
	},
	{
		id: "5",
		name: "Древесина и пиломатериалы",
		slug: "drevesina",
		description: "Качественные пиломатериалы и изделия из дерева",
		image: "https://images.pexels.com/photos/1884580/pexels-photo-1884580.jpeg",
	},
	{
		id: "6",
		name: "Краски и покрытия",
		slug: "kraski-pokrytiya",
		description: "Премиальные краски и защитные покрытия",
		image: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg",
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
		price: "650 RUB",
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
		inStock: false,
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
		price: "85 RUB",
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
		inStock: false,
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
		price: "1 200 RUB",
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
		price: "8 900 RUB",
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
		price: "2 150 RUB",
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
		price: "6 900 RUB",
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
		inStock: true,
	},
	{
		id: "prod-007",
		title: "Сухая смесь М300, 50 кг",
		slug: "sukhaya-smes-m300-50kg",
		category: "Цемент и бетон",
		categoryId: "1",
		description:
			"Универсальная сухая смесь для стяжек, кладки и мелкого ремонта. Устойчива к трещинообразованию.",
		shortDescription: "Универсальная смесь для строительных работ",
		price: "520 RUB",
		images: [
			"https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg",
		],
		specifications: {
			weight: "50 кг",
			strength_class: "М300",
			consumption: "18–20 кг/м²",
			setting_time: "2–3 часа",
			application_layer: "10–50 мм",
		},
		inStock: true,
	},
	{
		id: "prod-008",
		title: "Бетон М200, 1 м³",
		slug: "beton-m200-1m3",
		category: "Цемент и бетон",
		categoryId: "1",
		description:
			"Готовая бетонная смесь для фундаментов, дорожек и площадок. Стабильная прочность и удобная укладка.",
		shortDescription: "Готовый бетон для общестроительных работ",
		price: "5 200 RUB",
		images: [
			"https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg",
		],
		specifications: {
			class: "B15 (М200)",
			slump: "П3",
			density: "2300 кг/м³",
			max_aggregate: "20 мм",
			frost_resistance: "F100",
		},
		inStock: true,
	},
	{
		id: "prod-009",
		title: "Кирпич керамический полнотелый",
		slug: "kirpich-keramicheskiy-polnotelyy",
		category: "Кирпичи и блоки",
		categoryId: "2",
		description:
			"Классический полнотелый кирпич для несущих стен и перегородок. Надежный и долговечный материал.",
		shortDescription: "Полнотелый кирпич для кладки",
		price: "32 RUB",
		images: [
			"https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
		],
		specifications: {
			dimensions: "250 × 120 × 65 мм",
			strength: "М150",
			frost_resistance: "F50",
			water_absorption: "12%",
			weight: "3.5 кг",
		},
		inStock: true,
	},
	{
		id: "prod-010",
		title: "Газобетонный блок 600×200×300",
		slug: "gazobetonnyy-blok-600x200x300",
		category: "Кирпичи и блоки",
		categoryId: "2",
		description:
			"Легкие блоки для теплых стен. Удобные размеры для быстрой кладки и высокой теплоизоляции.",
		shortDescription: "Газобетонные блоки для наружных стен",
		price: "290 RUB",
		images: [
			"https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
		],
		specifications: {
			dimensions: "600 × 200 × 300 мм",
			density: "D500",
			strength: "B2.5",
			thermal_conductivity: "0.12 Вт/м·К",
			weight: "21 кг",
		},
		inStock: true,
	},
	{
		id: "prod-011",
		title: "Арматура 10 мм",
		slug: "armatura-10mm",
		category: "Сталь и железо",
		categoryId: "3",
		description:
			"Арматура для армирования железобетонных конструкций. Хорошая свариваемость и высокая прочность.",
		shortDescription: "Арматура для каркасов и фундаментов",
		price: "980 RUB",
		images: [
			"https://images.pexels.com/photos/262367/pexels-photo-262367.jpeg",
		],
		specifications: {
			diameter: "10 мм",
			grade: "A500C",
			length: "11.7 м",
			weight_per_meter: "0.617 кг",
			yield_strength: "500 МПа",
		},
		inStock: true,
	},
	{
		id: "prod-012",
		title: "Уголок стальной 50×50×5",
		slug: "ugolok-stalnoy-50x50x5",
		category: "Сталь и железо",
		categoryId: "3",
		description:
			"Равнополочный стальной уголок для каркасов, усилений и металлических конструкций.",
		shortDescription: "Уголок для металлоконструкций",
		price: "1 350 RUB",
		images: [
			"https://images.pexels.com/photos/262367/pexels-photo-262367.jpeg",
		],
		specifications: {
			size: "50 × 50 × 5 мм",
			length: "6 м",
			grade: "Ст3",
			weight_per_meter: "3.77 кг",
			coating: "Без покрытия",
		},
		inStock: true,
	},
	{
		id: "prod-013",
		title: "Перфоратор 1100 Вт",
		slug: "perforator-1100w",
		category: "Инструменты и оборудование",
		categoryId: "4",
		description:
			"Надежный перфоратор для бурения и долбления бетона. Подходит для интенсивной работы.",
		shortDescription: "Перфоратор для профессионального использования",
		price: "12 900 RUB",
		images: [
			"https://images.pexels.com/photos/2663867/pexels-photo-2663867.jpeg",
		],
		specifications: {
			power: "1100 Вт",
			impact_energy: "3.5 Дж",
			max_diameter: "28 мм",
			weight: "3.1 кг",
			modes: "3 режима",
		},
		inStock: true,
	},
	{
		id: "prod-014",
		title: "Лазерный уровень 360°",
		slug: "lazernyy-uroven-360",
		category: "Инструменты и оборудование",
		categoryId: "4",
		description:
			"Самовыравнивающийся лазерный уровень для точной разметки. Проецирует 360° плоскости.",
		shortDescription: "Лазерный уровень для точных измерений",
		price: "7 800 RUB",
		images: [
			"https://images.pexels.com/photos/2663867/pexels-photo-2663867.jpeg",
		],
		specifications: {
			range: "20–30 м",
			accuracy: "±0.2 мм/м",
			battery: "Li-Ion",
			protection: "IP54",
			mount: "1/4 и 5/8",
		},
		inStock: true,
	},
	{
		id: "prod-015",
		title: "Брус 50×150 мм",
		slug: "brus-50x150",
		category: "Древесина и пиломатериалы",
		categoryId: "5",
		description:
			"Сухой строганный брус для каркасного строительства и кровельных работ.",
		shortDescription: "Брус для каркасных конструкций",
		price: "750 RUB",
		images: [
			"https://images.pexels.com/photos/1884580/pexels-photo-1884580.jpeg",
		],
		specifications: {
			dimensions: "50 × 150 мм",
			length: "6 м",
			moisture: "12–14%",
			wood_type: "Сосна",
			grade: "1 сорт",
		},
		inStock: true,
	},
  
	{
		id: "prod-016",
		title: "Интерьерная краска 10 л",
		slug: "interernaya-kraska-10l",
		category: "Краски и покрытия",
		categoryId: "6",
		description:
			"Интерьерная краска для стен и потолков. Равномерное нанесение и стойкость к истиранию.",
		shortDescription: "Краска для внутренних работ",
		price: "3 900 RUB",
		images: [
			"https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg",
		],
		specifications: {
			volume: "10 литров",
			coverage: "12–14 м²/л",
			finish: "Матовая",
			drying_time: "2–4 часа",
			odor: "Низкий",
		},
		inStock: true,
	},
  
];

export const categories: Category[] = baseCategories.map((category) => ({
	...category,
	productCount: products.filter((product) => product.categoryId === category.id).length,
}));

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
	name: "ДомСтрой",
	foundedYear: 2006,
	description:
		"ДомСтрой — надежный поставщик строительных материалов с более чем 20-летним опытом. Мы предлагаем качественную продукцию и высокий уровень сервиса.",
	phone: "+7 996 997 92 39",
	whatsapp: "+7 996 997 92 39",
	telegram: "@Abuzarr222",
	email: "abuzarkamilov@gmail.com",
	address: "г. Москва, метро Саларьево, улица Адмирала Корнилова, квартал №17",
	hours: "",
};
