export { formatPrice, parsePrice } from "../../utils/price";

export const getPaginationItems = (totalPages: number, currentPage: number) => {
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
