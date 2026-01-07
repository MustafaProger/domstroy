import { Link } from "react-router-dom";

type BreadcrumbItem = {
	label: string;
	href?: string;
};

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
	return (
		<div className={className}>
			<div className='inline-flex max-w-full items-center rounded-full bg-white/60 backdrop-blur-xl border border-white/40 px-3 py-2 shadow-sm'>
				<nav
					aria-label='Breadcrumbs'
					className='text-bodySm text-secondary-500 min-w-0'>
					<ol className='flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0 leading-snug'>
						{items.map((item, index) => {
							const isLast = index === items.length - 1;
							return (
								<li
									key={`${item.label}-${index}`}
									className='flex items-center min-w-0 gap-2'>
									{item.href && !isLast ? (
										<Link
											to={item.href}
											className='hover:text-primary-500 transition-colors truncate'>
											{item.label}
										</Link>
									) : (
										<span
											className={`truncate ${
												isLast
													? "text-secondary-600 max-w-[12rem] sm:max-w-none truncate"
													: ""
											}`}>
											{item.label}
										</span>
									)}
									{!isLast && (
										<span className='text-secondary-500' aria-hidden='true'>
											›
										</span>
									)}
								</li>
							);
						})}
					</ol>
				</nav>
			</div>
		</div>
	);
}
