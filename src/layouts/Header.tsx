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

	const headerClasses = mobileMenuOpen
		? "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-secondary-200/70 shadow-sm transition-all duration-300 ease-out"
		: isHome && !isScrolled
			? "fixed top-0 left-0 right-0 z-50 bg-transparent border-transparent shadow-none transition-all duration-300 ease-out"
			: "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-secondary-200/70 shadow-sm transition-all duration-300 ease-out";

	const linkClasses = mobileMenuOpen
		? "text-secondary-900 hover:text-primary-500 text-bodySm font-medium transition-colors"
		: isHome && !isScrolled
			? "text-white/90 hover:text-primary-400 text-bodySm font-medium transition-colors"
			: "text-secondary-900 hover:text-primary-500 text-bodySm font-medium transition-colors";

	const brandClasses = mobileMenuOpen
		? "flex items-center gap-3 text-h3 font-bold text-secondary-900 hover:text-primary-500 transition-colors"
		: isHome && !isScrolled
			? "flex items-center hover:text-primary-400 gap-3 text-h3 font-bold text-white transition-colors"
			: "flex items-center gap-3 text-h3 font-bold text-secondary-900 hover:text-primary-500 transition-colors";

	useEffect(() => {
		if (!mobileMenuOpen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [mobileMenuOpen]);

	return (
		<>
			<button
				type='button'
				aria-label='Закрыть меню'
				className={`fixed inset-0 z-40 bg-secondary-900/70 transition-opacity duration-300 ease-in-out ${
					mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				}`}
				onClick={() => setMobileMenuOpen(false)}
			/>
			<header className={headerClasses}>
			<Container>
				<div className='flex items-center justify-between py-4'>
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
						className={`md:hidden p-2 rounded-lg transition-all duration-300 ease-out ${
							mobileMenuOpen
								? "hover:bg-secondary-100 text-secondary-900 bg-secondary-100/70 shadow-sm"
								: isHome && !isScrolled
									? "hover:bg-white/10 text-white"
									: "hover:bg-secondary-100 text-secondary-900"
						}`}
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label='Переключить меню'>
						<span
							className={`block transition-transform duration-300 ease-out ${
								mobileMenuOpen ? "rotate-90" : "rotate-0"
							}`}>
							{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</span>
					</button>
				</div>
			</Container>

			<div
				className={`md:hidden border-t border-secondary-200 bg-white text-secondary-900 transition-all duration-300 ease-in-out origin-top ${
					mobileMenuOpen
						? "max-h-[70vh] opacity-100 translate-y-0"
						: "max-h-0 opacity-0 -translate-y-1 pointer-events-none"
				}`}>
				<Container>
					<div className='py-4 flex flex-col gap-4 max-h-[70vh] overflow-y-auto'>
						{menuItems.map((item) => (
							<Link
								key={item.href}
								to={item.href}
								className='text-secondary-900 hover:text-primary-500 font-medium py-2'
								onClick={() => setMobileMenuOpen(false)}>
								{item.label}
							</Link>
						))}
					</div>
				</Container>
			</div>
		</header>
		</>
	);
}
