import { useEffect, useMemo, useState } from "react";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import type { ContactEntry, ContactType, Contacts } from "../types";
import { fetchContacts } from "../services/contacts";

type ContactLinks = {
	phone: string;
	whatsapp: string;
	email: string;
	telegram: string;
};

type ContactValue = {
	value: string;
	href: string;
	external?: boolean;
};

type ContactGroup = {
	type: ContactType;
	label: string;
	Icon: typeof Phone;
	items: ContactValue[];
};

type ContactItem = {
	type: ContactType;
	label: string;
	Icon: typeof Phone;
	value: string;
	href: string;
	external?: boolean;
};

type ContactPrimary = {
	phone: string;
	whatsapp: string;
	email: string;
	telegram: string;
};

const normalizePhone = (value: string) => value.replace(/[^\d+]/g, "");
const extractDigits = (value: string) => value.replace(/\D/g, "");

const buildWhatsAppLink = (value: string) => {
	if (!value) return "";
	if (value.startsWith("http")) return value;
	const digits = extractDigits(value);
	return digits ? `https://wa.me/${digits}` : "";
};

const buildTelegramLink = (telegram: string) => {
	if (!telegram) return "";
	if (telegram.startsWith("http")) return telegram;
	const handle = telegram.startsWith("@") ? telegram.slice(1) : telegram;
	return handle ? `https://t.me/${handle}` : "";
};

const pickPrimaryValue = (entries: ContactEntry[], type: ContactType) =>
	entries.find((entry) => entry.type === type)?.value || "";

const CONTACT_META: Record<
	ContactType,
	{ label: string; Icon: typeof Phone }
> = {
	phone: { label: "Телефон", Icon: Phone },
	whatsapp: { label: "WhatsApp", Icon: MessageCircle },
	email: { label: "Email", Icon: Mail },
	telegram: { label: "Telegram", Icon: Send },
};

export function useContacts() {
	const [contacts, setContacts] = useState<Contacts | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const loadContacts = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await fetchContacts();
				if (isMounted) {
					setContacts(data);
					if (!data) {
						setError("Failed to load contacts");
					}
				}
			} catch (err) {
				if (isMounted) {
					setError(
						err instanceof Error
							? err.message
							: "Failed to load contacts"
					);
					setContacts(null);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		loadContacts();

		return () => {
			isMounted = false;
		};
	}, []);

	const entries = useMemo(() => contacts?.entries ?? [], [contacts]);

	const primary = useMemo<ContactPrimary>(() => {
		return {
			phone: pickPrimaryValue(entries, "phone"),
			whatsapp: pickPrimaryValue(entries, "whatsapp"),
			email: pickPrimaryValue(entries, "email"),
			telegram: pickPrimaryValue(entries, "telegram"),
		};
	}, [entries]);

	const links = useMemo<ContactLinks>(() => {
		const phone = primary.phone ? `tel:${normalizePhone(primary.phone)}` : "";
		const email = primary.email ? `mailto:${primary.email}` : "";
		const whatsapp = buildWhatsAppLink(primary.whatsapp || primary.phone);
		const telegram = buildTelegramLink(primary.telegram);

		return { phone, whatsapp, email, telegram };
	}, [primary]);

	const contactGroups = useMemo<ContactGroup[]>(() => {
		const toItems = (type: ContactType): ContactValue[] => {
			return entries
				.filter((entry) => entry.type === type)
				.map((entry) => {
					if (type === "phone") {
						const href = `tel:${normalizePhone(entry.value)}`;
						return href ? { value: entry.value, href } : null;
					}
					if (type === "email") {
						const href = `mailto:${entry.value}`;
						return href ? { value: entry.value, href } : null;
					}
					if (type === "whatsapp") {
						const href = buildWhatsAppLink(entry.value);
						return href
							? { value: entry.value, href, external: true }
							: null;
					}
					const href = buildTelegramLink(entry.value);
					return href ? { value: entry.value, href, external: true } : null;
				})
				.filter((item): item is ContactValue => !!item);
		};

		const groups: ContactGroup[] = [
			{
				type: "phone",
				label: "Телефон",
				Icon: Phone,
				items: toItems("phone"),
			},
			{
				type: "whatsapp",
				label: "WhatsApp",
				Icon: MessageCircle,
				items: toItems("whatsapp"),
			},
			{
				type: "email",
				label: "Email",
				Icon: Mail,
				items: toItems("email"),
			},
			{
				type: "telegram",
				label: "Telegram",
				Icon: Send,
				items: toItems("telegram"),
			},
		];

		return groups.filter((group) => group.items.length > 0);
	}, [entries]);

	const contactItems = useMemo<ContactItem[]>(() => {
		return entries
			.map((entry) => {
				const meta = CONTACT_META[entry.type];
				if (!meta) return null;
				if (entry.type === "phone") {
					const href = `tel:${normalizePhone(entry.value)}`;
					return href
						? {
								...meta,
								type: entry.type,
								value: entry.value,
								href,
						  }
						: null;
				}
				if (entry.type === "email") {
					const href = `mailto:${entry.value}`;
					return href
						? {
								...meta,
								type: entry.type,
								value: entry.value,
								href,
						  }
						: null;
				}
				if (entry.type === "whatsapp") {
					const href = buildWhatsAppLink(entry.value);
					return href
						? {
								...meta,
								type: entry.type,
								value: entry.value,
								href,
								external: true,
						  }
						: null;
				}
				const href = buildTelegramLink(entry.value);
				return href
					? {
							...meta,
							type: entry.type,
							value: entry.value,
							href,
							external: true,
					  }
					: null;
			})
			.filter((item): item is ContactItem => !!item);
	}, [entries]);

	return { contacts, loading, error, links, contactGroups, contactItems, primary };
}
