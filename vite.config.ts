import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [solidPlugin(), tsconfigPaths()],
	root: 'src',
	server: {
		port: 7070
	},
	build: {
		target: 'esnext',
		outDir: '../dist',
	},
	css: {
		modules: {
			localsConvention: 'dashesOnly'
		}
	}
});
