import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		exclude: ["lucide-react"],
	},
	server: {
		proxy: {
			"/wp-json": {
				target: "http://domstroy-wd.local",
				changeOrigin: true,
			},
			"/wp-content": {
				target: "http://domstroy-wd.local",
				changeOrigin: true,
			},
		},
	},
});
