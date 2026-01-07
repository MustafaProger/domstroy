import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { Button } from "../../components";

type CatalogFiltersProps = {
	searchTerm: string;
	onSearchTermChange: (value: string) => void;
	stockFilter: "all" | "in" | "out";
	onStockChange: (value: "all" | "in" | "out") => void;
	priceSort: "none" | "asc" | "desc";
	onPriceSortToggle: () => void;
};

export function CatalogFilters({
	searchTerm,
	onSearchTermChange,
	stockFilter,
	onStockChange,
	priceSort,
	onPriceSortToggle,
}: CatalogFiltersProps) {
	return (
		<div className='w-full'>
			<div className='flex w-full flex-col gap-3 sm:flex-row sm:items-center'>
				<div className='relative w-full sm:flex-1'>
					<Search
						className='absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400'
						size={18}
					/>
					<input
						value={searchTerm}
						onChange={(event) => onSearchTermChange(event.target.value)}
						placeholder='Поиск товаров'
						aria-label='Поиск товаров'
						className='h-12 w-full rounded-xl border border-secondary-300/70 bg-white/90 pl-10 pr-4 text-bodySm text-secondary-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors'
					/>
				</div>
				<div className='flex w-full gap-3 sm:w-auto'>
					<div className='relative flex-1 sm:w-44 sm:flex-none'>
						<select
							value={stockFilter}
							onChange={(event) =>
								onStockChange(event.target.value as "all" | "in" | "out")
							}
							aria-label='Наличие'
							className='h-12 w-full appearance-none rounded-xl border border-secondary-300/70 bg-white/90 pl-3 pr-10 text-bodySm text-secondary-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors'>
							<option value='all'>Наличие: все</option>
							<option value='in'>Наличие: в наличии</option>
							<option value='out'>Наличие: нет</option>
						</select>
						<span
							aria-hidden='true'
							className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full ${
								stockFilter === "in"
									? "bg-green-500"
									: stockFilter === "out"
									? "bg-red-500"
									: "bg-secondary-300"
							}`}
						/>
					</div>
					<Button
						variant='outline'
						size='sm'
						onClick={onPriceSortToggle}
						className='h-12 flex-1 sm:w-36 sm:flex-none font-normal'>
						<span className='flex items-center justify-center gap-2'>
							Цена
							{priceSort === "asc" && <ArrowDown size={16} />}
							{priceSort === "desc" && <ArrowUp size={16} />}
						</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
