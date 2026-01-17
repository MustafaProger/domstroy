import type { ContactEntry, ContactType, Contacts } from "../types";

type ContactsResponse = {
	id: number;
	contacts?: string;
	fields?: {
		contacts?: string;
		contacts_text?: string;
		contacts_list?: string;
		phone?: string;
		whatsapp?: string;
		email?: string;
		telegram?: string;
	};
};

let cachedContacts: Contacts | null = null;
let pendingRequest: Promise<Contacts | null> | null = null;

const API_BASE_URL = (
	import.meta.env.VITE_WORDPRESS_API_URL || "https://domstroy-api.ru"
).replace(/\/$/, "");
const CONTACTS_ENDPOINT = `${API_BASE_URL}/wp-json/site/v1/contacts`;

const TYPE_ALIASES: Record<string, ContactType> = {
	phone: "phone",
	tel: "phone",
	telephone: "phone",
	телефон: "phone",
	whatsapp: "whatsapp",
	wa: "whatsapp",
	ватсап: "whatsapp",
	вотсап: "whatsapp",
	email: "email",
	"e-mail": "email",
	mail: "email",
	почта: "email",
	telegram: "telegram",
	tg: "telegram",
	телеграм: "telegram",
};

const normalizeType = (value: string): ContactType | null => {
	const key = value.trim().toLowerCase();
	return TYPE_ALIASES[key] ?? null;
};

const parseContactsText = (raw: string): ContactEntry[] => {
	if (!raw) return [];
	return raw
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean)
		.map((line) => {
			const match = line.match(/^([^:]+):\s*(.+)$/);
			if (!match) return null;
			const type = normalizeType(match[1]);
			if (!type) return null;
			const value = match[2].trim();
			if (!value) return null;
			return { type, value };
		})
		.filter((entry): entry is ContactEntry => !!entry);
};

const normalizeContacts = (data: ContactsResponse): Contacts | null => {
	const rawText =
		data.fields?.contacts_text?.trim() ||
		data.fields?.contacts?.trim() ||
		data.fields?.contacts_list?.trim() ||
		data.contacts?.trim() ||
		"";
	const fromText = rawText ? parseContactsText(rawText) : [];
	const entries = fromText.length
		? fromText
		: [
				data.fields?.phone
					? { type: "phone", value: data.fields.phone.trim() }
					: null,
				data.fields?.whatsapp
					? { type: "whatsapp", value: data.fields.whatsapp.trim() }
					: null,
				data.fields?.email
					? { type: "email", value: data.fields.email.trim() }
					: null,
				data.fields?.telegram
					? { type: "telegram", value: data.fields.telegram.trim() }
					: null,
		  ].filter((entry): entry is ContactEntry => !!entry);

	if (!entries.length) return null;
	return { entries, rawText: rawText || undefined };
};

export async function fetchContacts(): Promise<Contacts | null> {
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
