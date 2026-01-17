import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SpecItem } from "../../utils/characteristics";
import { normalizeWpBullets, sanitizeHtml } from "../../utils/html";

type TabKey = "description" | "characteristics";

type ProductDetailsProps = {
	contentHtml: string;
	characteristics: SpecItem[];
};

const COLLAPSED_HEIGHT = 320;

export function ProductDetails({
	contentHtml,
	characteristics,
}: ProductDetailsProps) {
	const [activeTab, setActiveTab] = useState<TabKey | null>("description");
	const [isExpanded, setIsExpanded] = useState(true);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const contentRef = useRef<HTMLDivElement | null>(null);
	const sanitizedContent = useMemo(
		() => sanitizeHtml(normalizeWpBullets(contentHtml)),
		[contentHtml]
	);
	const desktopTab = activeTab ?? "description";

	useEffect(() => {
		if (typeof window === "undefined") return;
		const target = contentRef.current;
		if (!target) return;
		const frame = window.requestAnimationFrame(() => {
			const isTooTall = target.scrollHeight > COLLAPSED_HEIGHT + 8;
			setIsOverflowing(isTooTall);
		});
		return () => window.cancelAnimationFrame(frame);
	}, [sanitizedContent]);

	const descriptionBlock = sanitizedContent ? (
		<div className='space-y-3'>
			<div
				ref={contentRef}
				className={`product-prose ${
					isOverflowing && !isExpanded ? "max-h-[320px] overflow-hidden" : ""
				}`}
				dangerouslySetInnerHTML={{ __html: sanitizedContent }}
			/>
			{isOverflowing && (
				<button
					type='button'
					onClick={() => setIsExpanded((prev) => !prev)}
					className='text-primary-600 font-semibold text-bodySm hover:text-primary-700'>
					{isExpanded ? "Свернуть" : "Показать полностью"}
				</button>
			)}
		</div>
	) : (
		<p className='text-secondary-600 text-bodySm md:text-body'>
			Описание пока не добавлено
		</p>
	);

	const characteristicsBlock =
		characteristics.length > 0 ? (
			<div className='space-y-3'>
				{characteristics.map((item) => (
					<div
						key={`${item.label}-${item.value}`}
						className='rounded-xl border border-secondary-200/70 bg-white/80 p-3 sm:p-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md'>
						<div className='grid gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]'>
							<span className='text-secondary-600 text-bodySm font-semibold'>
								{item.label}
							</span>
							<span className='text-secondary-900 text-bodySm md:text-body'>
								{item.value}
							</span>
						</div>
					</div>
				))}
			</div>
		) : (
			<p className='text-secondary-600 text-bodySm md:text-body'>
				Характеристики не указаны
			</p>
		);

	const toggleAccordion = (tab: TabKey) => {
		setActiveTab((prev) => (prev === tab ? null : tab));
	};

	return (
		<section className='glass-panel rounded-3xl p-4 sm:p-6'>
			<div className='hidden md:flex flex-wrap gap-2 border-b border-secondary-200/70'>
				<button
					type='button'
					onClick={() => setActiveTab("description")}
					className={`px-4 py-3 text-bodySm font-semibold transition-colors border-b-2 ${
						desktopTab === "description"
							? "border-primary-500 text-secondary-900"
							: "border-transparent text-secondary-500 hover:text-secondary-700"
					}`}>
					Описание
				</button>
				<button
					type='button'
					onClick={() => setActiveTab("characteristics")}
					className={`px-4 py-3 text-bodySm font-semibold transition-colors border-b-2 ${
						desktopTab === "characteristics"
							? "border-primary-500 text-secondary-900"
							: "border-transparent text-secondary-500 hover:text-secondary-700"
					}`}>
					Характеристики
				</button>
			</div>

			<div className='hidden md:block mt-6'>
				{desktopTab === "description" ? descriptionBlock : characteristicsBlock}
			</div>

			<div className='md:hidden space-y-3'>
				<div className='rounded-2xl border border-secondary-200/70 bg-white/80'>
					<button
						type='button'
						onClick={() => toggleAccordion("description")}
						className='w-full flex items-center justify-between px-4 py-3 text-secondary-900 text-bodySm font-semibold'>
						Описание
						<ChevronDown
							size={18}
							className={`transition-transform ${
								activeTab === "description" ? "rotate-180" : ""
							}`}
						/>
					</button>
					{activeTab === "description" && (
						<div className='px-4 pb-4'>{descriptionBlock}</div>
					)}
				</div>

				<div className='rounded-2xl border border-secondary-200/70 bg-white/80'>
					<button
						type='button'
						onClick={() => toggleAccordion("characteristics")}
						className='w-full flex items-center justify-between px-4 py-3 text-secondary-900 text-bodySm font-semibold'>
						Характеристики
						<ChevronDown
							size={18}
							className={`transition-transform ${
								activeTab === "characteristics" ? "rotate-180" : ""
							}`}
						/>
					</button>
					{activeTab === "characteristics" && (
						<div className='px-4 pb-4'>{characteristicsBlock}</div>
					)}
				</div>
			</div>
		</section>
	);
}
