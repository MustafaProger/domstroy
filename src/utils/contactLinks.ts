type RawContacts = {
	phone?: string;
	whatsapp?: string;
	email?: string;
	telegram?: string;
};

const normalizePhone = (value: string) => value.replace(/[^\d+]/g, "");
const extractDigits = (value: string) => value.replace(/\D/g, "");

export const buildWhatsAppLink = (value: string) => {
	if (!value) return "";
	if (value.startsWith("http")) return value;
	const digits = extractDigits(value);
	return digits ? `https://wa.me/${digits}` : "";
};

export const buildTelegramLink = (value: string) => {
	if (!value) return "";
	if (value.startsWith("http")) return value;
	const handle = value.startsWith("@") ? value.slice(1) : value;
	return handle ? `https://t.me/${handle}` : "";
};

export const buildContactLinks = (contacts: RawContacts) => {
	const phone = contacts.phone ? `tel:${normalizePhone(contacts.phone)}` : "";
	const email = contacts.email ? `mailto:${contacts.email}` : "";
	const whatsapp = buildWhatsAppLink(contacts.whatsapp || "");
	const telegram = buildTelegramLink(contacts.telegram || "");

	return { phone, whatsapp, email, telegram };
};
