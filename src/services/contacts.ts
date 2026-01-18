import type { ContactKey, ContactSet, Contacts } from "../types";

type ContactsResponse = {
	id: number;
	fields?: {
		contacts?: string;
	};
};

let cachedContacts: Contacts | null = null;
let pendingRequest: Promise<Contacts | null> | null = null;

const API_BASE_URL = (
	import.meta.env.VITE_WORDPRESS_API_URL || "https://domstroy-api.ru"
).replace(/\/$/, "");
const CONTACTS_ENDPOINT = `${API_BASE_URL}/wp-json/site/v1/contacts`;

const CONTACT_KEYS: ContactKey[] = [
	"phone_footer",
	"email_footer",
	"whatsapp_footer",
	"telegram_footer",
	"phone_main",
	"email_main",
	"whatsapp_main",
	"telegram_main",
];
const CONTACT_KEY_SET = new Set(CONTACT_KEYS);

const cleanContactValue = (value?: string) => {
	const trimmed = value?.trim();
	return trimmed ? trimmed : undefined;
};

const parseContactsText = (raw: string): Partial<Record<ContactKey, string>> => {
	const result: Partial<Record<ContactKey, string>> = {};
	if (!raw) return result;

	raw
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean)
		.forEach((line) => {
			const match = line.match(/^([^:]+):\s*(.+)$/);
			if (!match) return;
			const key = match[1].trim().toLowerCase();
			if (!CONTACT_KEY_SET.has(key as ContactKey)) return;
			const value = cleanContactValue(match[2]);
			if (!value) return;
			result[key as ContactKey] = value;
		});

	return result;
};

const buildContactSet = (
	scope: "main" | "footer",
	all: Partial<Record<ContactKey, string>>
): ContactSet => {
	const phone = all[`phone_${scope}`];
	const email = all[`email_${scope}`];
	const whatsapp = all[`whatsapp_${scope}`];
	const telegram = all[`telegram_${scope}`];

	return {
		phone,
		email,
		whatsapp,
		telegram,
	};
};

const normalizeContacts = (data: ContactsResponse): Contacts | null => {
	const rawText = data.fields?.contacts?.trim() || "";
	const all = parseContactsText(rawText);
	if (Object.keys(all).length === 0) return null;

	const main = buildContactSet("main", all);
	const footer = buildContactSet("footer", all);

	return { main, footer, all };
};

export async function getContacts(): Promise<Contacts | null> {
	if (cachedContacts) return cachedContacts;
	if (pendingRequest) return pendingRequest;

	pendingRequest = fetch(CONTACTS_ENDPOINT)
		.then(async (response) => {
			if (!response.ok) {
				throw new Error("Failed to fetch contacts");
			}
			return (await response.json()) as ContactsResponse;
		})
		.then((data) => {
			const contacts = normalizeContacts(data);
			if (contacts) {
				cachedContacts = contacts;
			}
			return contacts;
		})
		.catch(() => null)
		.finally(() => {
			pendingRequest = null;
		});

	return pendingRequest;
}
