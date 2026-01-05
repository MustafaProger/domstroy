import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
	const { pathname } = useLocation();
	const isHome = pathname === "/";

	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<main className={`flex-grow ${isHome ? null : "pt-[72px]"}`}>
				{children}
			</main>
			<Footer />
		</div>
	);
}
