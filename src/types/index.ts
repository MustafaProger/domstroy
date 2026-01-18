export interface Category {
	id: string;
	name: string;
	slug: string;
	description: string;
	image: string;
	productCount: number;
}

export interface Product {
	id: string;
	title: string;
	slug: string;
	category: string;
	categoryId: string;
	categoryIds?: string[];
	categories?: Array<{
		id: string;
		name: string;
		slug: string;
	}>;
	acf?: Record<string, unknown>;
	price?: string;
	description: string;
	shortDescription: string;
	contentHtml?: string;
	excerptHtml?: string;
	images: string[];
	specifications: Record<string, string>;
	inStock: boolean;
	characteristicsText?: string;
}

export interface PageMeta {
	title: string;
	description: string;
	ogImage?: string;
	canonical?: string;
	keywords?: string;
}

export type ContactType = "phone" | "whatsapp" | "email" | "telegram";

export interface ContactEntry {
	type: ContactType;
	value: string;
}

export type ContactKey =
	| "phone_footer"
	| "email_footer"
	| "whatsapp_footer"
	| "telegram_footer"
	| "phone_main"
	| "email_main"
	| "whatsapp_main"
	| "telegram_main";

export interface ContactSet {
	phone?: string;
	whatsapp?: string;
	email?: string;
	telegram?: string;
}

export interface Contacts {
	main: ContactSet;
	footer: ContactSet;
	all: Partial<Record<ContactKey, string>>;
}
