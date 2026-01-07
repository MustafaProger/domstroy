export const getCurrencySuffix = (price?: string) => {
	if (!price) return "";
	const cleaned = price.replace(/[0-9\s.,]/g, "").trim();
	if (!cleaned) return "";
	if (cleaned.includes("₽") || cleaned.toUpperCase() === "RUB") return "₽";
	return cleaned;
};

export const formatPrice = (value: number, currency?: string) => {
	const formatted = new Intl.NumberFormat("ru-RU").format(value);
	return currency ? `${formatted} ${currency}` : formatted;
};

export const parsePrice = (price?: string) => {
	if (!price) return null;
	const numeric = Number(price.replace(/[^\d]/g, ""));
	return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
};

export const getPaginationItems = (
	totalPages: number,
	currentPage: number
) => {
	const items: number[] = [];
	if (totalPages <= 5) {
		for (let page = 1; page <= totalPages; page += 1) items.push(page);
		return items;
	}

	const startPage = Math.min(
		Math.max(1, currentPage),
		Math.max(1, totalPages - 4)
	);

	for (let page = startPage; page <= startPage + 4; page += 1) {
		items.push(page);
	}

	return items;
};
