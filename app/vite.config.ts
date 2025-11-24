import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom", // Simulate a browser environment
		globals: true, // Allow using describe/test/expect globally
		setupFiles: "./src/setupTests.ts", // Setup file path
		css: true, // Allow CSS imports in components
	},
} as UserConfig);
