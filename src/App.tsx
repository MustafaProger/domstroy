import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./layouts";
import { Home, Catalog, Product, Contact } from "./pages";
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
	return (
		<Router>
			<ScrollToTop />
			<Layout>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/catalog'
						element={<Catalog />}
					/>
					<Route
						path='/product/:slug'
						element={<Product />}
					/>
					<Route
						path='/contact'
						element={<Contact />}
					/>
					<Route
						path='*'
						element={<Home />}
					/>
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
