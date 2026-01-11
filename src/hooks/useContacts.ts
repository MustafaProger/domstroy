import { useEffect, useMemo, useState } from "react";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import type { Contacts } from "../types";
import { fetchContacts } from "../services/contacts";

type ContactItem = {
	label: string;
	value: string;
	href: string;
	Icon: typeof Phone;
	external?: boolean;
};

type ContactLinks = {
	phone: string;
	whatsapp: string;
	email: string;
	telegram: string;
};

const normalizePhone = (value: string) => value.replace(/[^\d+]/g, "");
const extractDigits = (value: string) => value.replace(/\D/g, "");

const buildWhatsAppLink = (whatsapp: string, phone: string) => {
	const source = whatsapp || phone;
	if (!source) return "";
	const digits = extractDigits(source);
	return digits ? `https://wa.me/${digits}` : "";
};

const buildTelegramLink = (telegram: string) => {
	if (!telegram) return "";
	if (telegram.startsWith("http")) return telegram;
	const handle = telegram.startsWith("@") ? telegram.slice(1) : telegram;
	return handle ? `https://t.me/${handle}` : "";
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

	const links = useMemo<ContactLinks>(() => {
		if (!contacts) {
			return {
				phone: "",
				whatsapp: "",
				email: "",
				telegram: "",
			};
		}

		const phone = contacts.phone ? `tel:${normalizePhone(contacts.phone)}` : "";
		const email = contacts.email ? `mailto:${contacts.email}` : "";
		const whatsapp = buildWhatsAppLink(contacts.whatsapp, contacts.phone);
		const telegram = buildTelegramLink(contacts.telegram);

		return { phone, whatsapp, email, telegram };
	}, [contacts]);

	const contactItems = useMemo<ContactItem[]>(() => {
		if (!contacts) return [];
		return [
			{
				label: "Телефон",
				value: contacts.phone,
				href: links.phone,
				Icon: Phone,
			},
			{
				label: "WhatsApp",
				value: contacts.phone || contacts.whatsapp,
				href: links.whatsapp,
				Icon: MessageCircle,
				external: true,
			},
			{
				label: "Email",
				value: contacts.email,
				href: links.email,
				Icon: Mail,
			},
			{
				label: "Telegram",
				value: contacts.telegram,
				href: links.telegram,
				Icon: Send,
				external: true,
			},
		].filter((item) => item.value && item.href);
	}, [contacts, links]);

	return { contacts, loading, error, links, contactItems };
}
