import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SEO, Container, Section, Button } from "../components";

const REDIRECT_DELAY_MS = 2500;

export function NotFound() {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = window.setTimeout(() => {
			navigate("/", { replace: true });
		}, REDIRECT_DELAY_MS);

		return () => window.clearTimeout(timer);
	}, [navigate]);

	return (
		<>
			<SEO
				title='Страница не найдена - ДомСтрой'
				description='Запрошенная страница не найдена. Вы будете перенаправлены на главную.'
				keywords='404, страница не найдена'
			/>
			<Section className='min-h-[70vh] bg-secondary-50/70 flex items-center'>
				<Container className='text-center'>
					<div className='mx-auto max-w-2xl rounded-3xl bg-white/90 border border-secondary-200/70 shadow-sm px-6 py-10 sm:px-10'>
						<p className='text-primary-500 text-bodySm font-semibold tracking-[0.3em] mb-3'>
							404
						</p>
						<h1 className='text-h1 mb-4'>Страница не найдена</h1>
						<p className='text-secondary-600 mb-8 text-bodySm md:text-body'>
							Такого адреса не существует. Через несколько секунд вы будете
							перенаправлены на главную страницу.
						</p>
						<Button
							as='a'
							href='/'
							variant='secondary'>
							Вернуться на главную
						</Button>
					</div>
				</Container>
			</Section>
		</>
	);
}
