const ALLOWED_TAGS = new Set([
	"h2",
	"h3",
	"p",
	"ul",
	"ol",
	"li",
	"strong",
	"em",
	"b",
	"i",
	"br",
	"hr",
	"blockquote",
	"a",
]);

export const stripHtml = (value: string) =>
	value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const normalizeWpBullets = (value: string) => {
	if (!value) return "";
	return value.replace(
		/(?:<p>\s*(?:&bull;|•)\s*[\s\S]*?<\/p>\s*)+/gi,
		(match) => {
			const items: string[] = [];
			match.replace(
				/<p>\s*(?:&bull;|•)\s*([\s\S]*?)<\/p>/gi,
				(_line, content) => {
					const trimmed = String(content).trim();
					if (trimmed) items.push(`<li>${trimmed}</li>`);
					return "";
				}
			);
			return items.length ? `<ul>${items.join("")}</ul>` : match;
		}
	);
};

export const sanitizeHtml = (value: string) => {
	if (!value) return "";
	const withoutScripts = value
		.replace(/<script[\s\S]*?<\/script>/gi, "")
		.replace(/<style[\s\S]*?<\/style>/gi, "");

	return withoutScripts.replace(
		/<\/?([a-z0-9]+)([^>]*)>/gi,
		(match, tag, attributes) => {
			const tagName = String(tag).toLowerCase();
			if (!ALLOWED_TAGS.has(tagName)) return "";
			const isClosing = match.startsWith("</");
			if (isClosing) return `</${tagName}>`;
			if (tagName === "a") {
				const hrefMatch = String(attributes).match(
					/href\s*=\s*(['"])(.*?)\1/i
				);
				const href = hrefMatch ? hrefMatch[2].trim() : "";
				const safeHref =
					/^https?:\/\//i.test(href) || href.startsWith("/") ? href : "";
				if (!safeHref) return "<a>";
				const isExternal = /^https?:\/\//i.test(safeHref);
				return `<a href="${safeHref}"${
					isExternal ? ' target="_blank" rel="noopener noreferrer nofollow"' : ""
				}>`;
			}
			return `<${tagName}>`;
		}
	);
};
