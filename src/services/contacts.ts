import type { Contacts } from "../types";

type ContactsResponse = {
	id: number;
	fields?: Partial<Contacts>;
};

let cachedContacts: Contacts | null = null;
let pendingRequest: Promise<Contacts | null> | null = null;

const CONTACTS_ENDPOINT = "/wp-json/site/v1/contacts";

const normalizeContacts = (data: ContactsResponse): Contacts | null => {
	const fields = data.fields;
	if (!fields) return null;
	return {
		phone: fields.phone?.trim() || "",
		whatsapp: fields.whatsapp?.trim() || "",
		email: fields.email?.trim() || "",
		telegram: fields.telegram?.trim() || "",
	};
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
