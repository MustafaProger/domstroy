import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Container } from "../components";

const menuItems = [
	{ label: "Главная", href: "/" },
	{ label: "Каталог", href: "/catalog" },
	{ label: "Контакты", href: "/contact" },
];

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const { pathname } = useLocation();
	const isHome = pathname === "/";

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 8);
		};
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const headerClasses =
		isHome && !isScrolled
			? "fixed top-0 left-0 right-0 z-50 bg-transparent border-transparent shadow-none transition-colors duration-300"
			: "fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-secondary-200/70 shadow-sm transition-colors duration-300";

	const linkClasses =
		isHome && !isScrolled
			? "text-white/90 hover:text-primary-500 text-bodySm font-medium transition-colors"
			: "text-secondary-900 hover:text-primary-500 text-bodySm font-medium transition-colors";

	const brandClasses =
		isHome && !isScrolled
			? "flex items-center hover:text-primary-500 gap-3 text-h3 font-bold text-white transition-colors"
			: "flex items-center gap-3 text-h3 font-bold text-secondary-900 hover:text-primary-500 transition-colors";

	return (
		<header className={headerClasses}>
			<Container className='flex items-center justify-between py-4'>
				<Link
					to='/'
					className={brandClasses}>
					<img
						src='/icon.png'
						alt='ДомСтрой'
						className='h-8 w-8 object-contain'
					/>
					ДомСтрой
				</Link>

				<nav className='hidden md:flex items-center gap-8'>
					{menuItems.map((item) => (
						<Link
							key={item.href}
							to={item.href}
							className={linkClasses}>
							{item.label}
						</Link>
					))}
				</nav>

				<button
					className={`md:hidden p-2 rounded-lg transition-colors ${
						isHome && !isScrolled
							? "hover:bg-white/10 text-white"
							: "hover:bg-secondary-100 text-secondary-900"
					}`}
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label='Переключить меню'>
					{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</Container>

			{mobileMenuOpen && (
				<div
					className={`md:hidden border-t ${
						isHome && !isScrolled
							? "border-white/10 bg-secondary-900/95 text-white"
							: "border-secondary-200 bg-secondary-50"
					}`}>
					<Container className='py-4 flex flex-col gap-4'>
						{menuItems.map((item) => (
							<Link
								key={item.href}
								to={item.href}
								className={`${
									isHome && !isScrolled
										? "text-white/90 hover:text-white"
										: "text-secondary-900 hover:text-primary-500"
								} font-medium py-2`}
								onClick={() => setMobileMenuOpen(false)}>
								{item.label}
							</Link>
						))}
					</Container>
				</div>
			)}
		</header>
	);
}
