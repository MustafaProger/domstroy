import { Mail, Phone, MessageCircle, Send } from "lucide-react";

export const contactItems = [
	{
		label: "Телефон",
		value: "+7 996 997 92 39",
		href: "tel:+79969979239",
		Icon: Phone,
	},
	{
		label: "WhatsApp",
		value: "+7 996 997 92 39",
		href: "https://wa.me/79969979239",
		Icon: MessageCircle,
		external: true,
	},
	{
		label: "Email",
		value: "abuzarkamilov@gmail.com",
		href: "mailto:abuzarkamilov@gmail.com",
		Icon: Mail,
	},
	{
		label: "Telegram",
		value: "@Abuzarr222",
		href: "https://t.me/Abuzarr222",
		Icon: Send,
		external: true,
	},
];