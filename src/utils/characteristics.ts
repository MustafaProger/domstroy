export type SpecItem = {
	label: string;
	value: string;
};

export const parseCharacteristics = (text: string): SpecItem[] => {
	if (!text) return [];

	const unique = new Map<string, SpecItem>();

	text
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean)
		.forEach((line) => {
			const dividerIndex = line.indexOf(":");
			if (dividerIndex === -1) return;
			const label = line.slice(0, dividerIndex).trim();
			const value = line.slice(dividerIndex + 1).trim();
			if (!label || !value) return;
			if (!unique.has(label)) {
				unique.set(label, { label, value });
			}
		});

	return Array.from(unique.values());
};
