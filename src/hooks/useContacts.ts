import { useEffect, useMemo, useState } from "react";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import type { ContactEntry, ContactSet, ContactType, Contacts } from "../types";
import { getContacts } from "../services/contacts";
import { buildContactLinks } from "../utils/contactLinks";

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

const CONTACT_META: Record<
	ContactType,
	{ label: string; Icon: typeof Phone }
> = {
	phone: { label: "Телефон", Icon: Phone },
	whatsapp: { label: "WhatsApp", Icon: MessageCircle },
	email: { label: "Email", Icon: Mail },
	telegram: { label: "Telegram", Icon: Send },
};

const buildEntriesFromSet = (set?: ContactSet | null): ContactEntry[] => {
	if (!set) return [];
	return [
		set.phone ? { type: "phone", value: set.phone } : null,
		set.whatsapp ? { type: "whatsapp", value: set.whatsapp } : null,
		set.email ? { type: "email", value: set.email } : null,
		set.telegram ? { type: "telegram", value: set.telegram } : null,
	].filter((entry): entry is ContactEntry => !!entry);
};

const buildContactGroups = (sourceEntries: ContactEntry[]): ContactGroup[] => {
	const toItems = (type: ContactType): ContactValue[] => {
		return sourceEntries
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
};

const mergeEntries = (
	primaryEntries: ContactEntry[],
	secondaryEntries: ContactEntry[]
) => {
	const seen = new Set<string>();
	const merged: ContactEntry[] = [];

	const add = (entry: ContactEntry) => {
		const key = `${entry.type}:${entry.value}`;
		if (seen.has(key)) return;
		seen.add(key);
		merged.push(entry);
	};

	primaryEntries.forEach(add);
	secondaryEntries.forEach(add);

	return merged;
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
				const data = await getContacts();
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

	const mainEntries = useMemo(
		() => buildEntriesFromSet(contacts?.main),
		[contacts?.main]
	);
	const footerEntries = useMemo(
		() => buildEntriesFromSet(contacts?.footer),
		[contacts?.footer]
	);
	const combinedEntries = useMemo(
		() => mergeEntries(mainEntries, footerEntries),
		[mainEntries, footerEntries]
	);

	const mainLinks = useMemo(
		() =>
			buildContactLinks({
				phone: contacts?.main?.phone,
				whatsapp: contacts?.main?.whatsapp,
				email: contacts?.main?.email,
				telegram: contacts?.main?.telegram,
			}),
		[contacts?.main]
	);

	const footerLinks = useMemo(
		() =>
			buildContactLinks({
				phone: contacts?.footer?.phone,
				whatsapp: contacts?.footer?.whatsapp,
				email: contacts?.footer?.email,
				telegram: contacts?.footer?.telegram,
			}),
		[contacts?.footer]
	);

	const footerGroups = useMemo(
		() => buildContactGroups(footerEntries),
		[footerEntries]
	);

	const contactItems = useMemo<ContactItem[]>(() => {
		return combinedEntries
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
	}, [combinedEntries]);

	return {
		contacts,
		loading,
		error,
		mainLinks,
		footerLinks,
		footerGroups,
		contactItems,
	};
}
