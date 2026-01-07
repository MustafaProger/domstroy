import { ArrowLeft, ArrowRight } from "lucide-react";

type CatalogPaginationProps = {
	currentPage: number;
	totalPages: number;
	pages: number[];
	onPageChange: (page: number) => void;
};

export function CatalogPagination({
	currentPage,
	totalPages,
	pages,
	onPageChange,
}: CatalogPaginationProps) {
	return (
		<div className='mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2'>
			<button
				type='button'
				onClick={() => onPageChange(Math.max(1, currentPage - 1))}
				disabled={currentPage === 1}
				aria-label='Предыдущая страница'
				className=' text-secondary-700 flex items-center justify-center transition-colors hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed'>
				<ArrowLeft size={18} />
			</button>
			{pages.map((page) => (
				<button
					key={page}
					className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border transition-colors ${
						page === currentPage
							? "bg-primary-500 text-secondary-900 border-primary-500 font-semibold"
							: "border-secondary-200 text-secondary-700 hover:bg-secondary-50"
					}`}
					onClick={() => onPageChange(page)}>
					{page}
				</button>
			))}
			<button
				type='button'
				onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
				disabled={currentPage === totalPages}
				aria-label='Следующая страница'
				className=' text-secondary-700 flex items-center justify-center transition-colors hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed'>
				<ArrowRight size={18} />
			</button>
		</div>
	);
}
