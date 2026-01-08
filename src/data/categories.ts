import { Category } from "../types";
import { products } from "./products";

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

export const categoryLinks = [
	{ to: "/catalog?category=cement-beton&page=1", label: "Цемент и бетон" },
	{ to: "/catalog?category=kirpichi-bloki&page=1", label: "Кирпич и блоки" },
	{ to: "/catalog?category=stal-zhelezo&page=1", label: "Сталь и железо" },
	{
		to: "/catalog?category=instrumenty-oborudovanie&page=1",
		label: "Инструменты и оборудование",
	},
	{
		to: "catalog?category=drevesina&page=1",
		label: "Древесина и пиломатериалы Краски и покрытия",
	},
];

export const categories: Category[] = baseCategories.map((category) => ({
	...category,
	productCount: products.filter((product) => product.categoryId === category.id)
		.length,
}));
