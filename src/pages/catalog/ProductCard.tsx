import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card } from "../../components";
import type { Product } from "../../types";
import { formatPrice } from "./utils";

type ProductCardProps = {
	product: Product;
	queryString?: string;
};

export function ProductCard({ product, queryString }: ProductCardProps) {
	const [qty, setQty] = useState(1);
	const unitPrice = product.price
		? Number(product.price.replace(/[^\d]/g, ""))
		: null;
	const totalPrice = unitPrice !== null ? formatPrice(unitPrice * qty) : "";
	const productLink = `/product/${product.slug}${
		queryString ? `?${queryString}` : ""
	}`;

	const handleDecrement = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setQty((prev) => Math.max(1, prev - 1));
	};

	const handleIncrement = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setQty((prev) => prev + 1);
	};

	return (
		<Link
			to={productLink}
			className='h-full'>
			<Card
				hover
				className='group overflow-hidden h-full flex flex-col bg-white border-secondary-200/70 shadow-sm'>
				<div className='w-full h-48 overflow-hidden bg-secondary-100'>
					<img
						src={product.images[0]}
						alt={product.title}
						className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
					/>
				</div>
				<div className='p-5 flex flex-col flex-1'>
					<h3 className='font-medium text-base text-secondary-900 mb-3 min-h-[3rem]'>
						{product.title}
					</h3>
					<div className='mt-auto flex flex-col gap-3 pt-4 border-t border-secondary-200'>
						{unitPrice !== null ? (
							<div className='flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap'>
								<span className='text-secondary-900 font-semibold text-lg leading-tight'>
									{totalPrice}
								</span>
								<div className='flex items-center gap-2 sm:gap-1'>
									<button
										type='button'
										onClick={handleDecrement}
										disabled={qty === 1}
										aria-label='Уменьшить количество'
										className='h-8 w-8 text-base sm:h-6 sm:w-6 sm:text-sm rounded-lg border border-secondary-200 text-secondary-700 transition-all hover:bg-secondary-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'>
										-
									</button>
									<span className='min-w-[1.5rem] text-center text-bodySm font-semibold text-secondary-900'>
										{qty}
									</span>
									<button
										type='button'
										onClick={handleIncrement}
										aria-label='Увеличить количество'
										className='h-8 w-8 text-base sm:h-6 sm:w-6 sm:text-sm rounded-lg border border-secondary-200 text-secondary-700 transition-all hover:bg-secondary-100 active:scale-95'>
										+
									</button>
								</div>
							</div>
						) : (
							<span className='text-secondary-700 text-bodySm font-semibold'>
								Цена по запросу
							</span>
						)}
						<div className='flex items-center justify-between'>
							{product.inStock ? (
								<span className='text-caption font-semibold text-green-600'>
									В наличии
								</span>
							) : (
								<span className='text-caption font-semibold text-red-600'>
									Нет в наличии
								</span>
							)}
							<ArrowRight
								size={20}
								className='text-primary-500 transition-transform duration-300 group-hover:translate-x-1'
							/>
						</div>
					</div>
				</div>
			</Card>
		</Link>
	);
}
