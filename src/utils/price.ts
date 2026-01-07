export const formatPrice = (value: number, currency = "₽") => {
	const formatted = new Intl.NumberFormat("ru-RU").format(value);
	const suffix = currency.trim();
	return suffix ? `${formatted} ${suffix}` : formatted;
};

export const parsePrice = (price?: string) => {
	if (!price) return null;
	const numeric = Number(price.replace(/[^\d]/g, ""));
	return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
};
