import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	test: {
		environment: "jsdom", // Simulate a browser environment
		globals: true, // Allow using describe/test/expect globally
		setupFiles: "./src/setupTests.ts", // Setup file path
		css: true, // Allow CSS imports in components
	},
} as UserConfig);
