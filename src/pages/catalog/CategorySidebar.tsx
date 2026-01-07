import type { Category } from "../../types";

type CategorySidebarProps = {
	categories: Category[];
	loading: boolean;
	selectedCategory: string;
	onCategoryChange: (slug: string) => void;
};

export function CategorySidebar({
	categories,
	loading,
	selectedCategory,
	onCategoryChange,
}: CategorySidebarProps) {
	return (
		<aside className='xl:col-span-1 hidden xl:block sticky top-24 self-start'>
			<div className='space-y-6'>
				<div className='bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-secondary-200/70 shadow-sm'>
					<h3 className='text-h3 font-bold mb-4'>Категории</h3>

					<button
						onClick={() => onCategoryChange("")}
						className={`block w-full text-left px-4 py-2 rounded-xl transition-colors text-bodySm ${
							!selectedCategory
								? "bg-primary-500 text-secondary-900 font-semibold"
								: "text-secondary-700 hover:bg-secondary-100"
						}`}>
						Все категории
					</button>

					{loading ? (
						<div className='space-y-2 mt-3'>
							{Array(4)
								.fill(null)
								.map((_, i) => (
									<div
										key={i}
										className='h-8 bg-secondary-200 rounded animate-pulse'></div>
								))}
						</div>
					) : (
						<div className='space-y-2 mt-3'>
							{categories.map((category) => (
								<button
									key={category.id}
									onClick={() => onCategoryChange(category.slug)}
									className={`block w-full text-left px-4 py-2 rounded-xl transition-colors text-bodySm ${
										selectedCategory === category.slug
											? "bg-primary-500 text-secondary-900 font-semibold"
											: "text-secondary-700 hover:bg-secondary-100"
									}`}>
									<span>{category.name}</span>
								</button>
							))}
						</div>
					)}
				</div>
			</div>
		</aside>
	);
}
