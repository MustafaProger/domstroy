import type { Category } from "../../types";

type CategoryChipsProps = {
	categories: Category[];
	loading: boolean;
	selectedCategory: string;
	onCategoryChange: (slug: string) => void;
};

export function CategoryChips({
	categories,
	loading,
	selectedCategory,
	onCategoryChange,
}: CategoryChipsProps) {
	return (
		<div className='xl:hidden'>
			<div className='flex gap-2 flex-wrap -mx-4 px-4'>
				<button
					onClick={() => onCategoryChange("")}
					className={`whitespace-nowrap px-4 py-2 rounded-full border text-bodySm transition-colors ${
						!selectedCategory
							? "bg-primary-500 text-secondary-900 border-primary-500 font-semibold"
							: "bg-white/90 text-secondary-700 border-secondary-200/70 hover:bg-secondary-100"
					}`}>
					Все категории
				</button>
				{loading ? (
					Array(4)
						.fill(null)
						.map((_, i) => (
							<div
								key={i}
								className='h-9 w-24 rounded-full bg-secondary-200 animate-pulse flex-shrink-0'
							/>
						))
				) : categories.length > 0 ? (
					categories.map((category) => (
						<button
							key={category.id}
							onClick={() => onCategoryChange(category.slug)}
							className={`whitespace-nowrap px-4 py-2 rounded-full border text-bodySm transition-colors ${
								selectedCategory === category.slug
									? "bg-primary-500 text-secondary-900 border-primary-500 font-semibold"
									: "bg-white/90 text-secondary-700 border-secondary-200/70 hover:bg-secondary-100"
							}`}>
							{category.name}
						</button>
					))
				) : (
					<span className='text-bodySm text-secondary-500'>
						Категории пока недоступны
					</span>
				)}
			</div>
		</div>
	);
}
