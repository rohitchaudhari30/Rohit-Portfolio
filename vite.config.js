import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
    base: process.env.GITHUB_REPOSITORY ? "/".concat(process.env.GITHUB_REPOSITORY.split("/")[1], "/") : "./",
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        sourcemap: false,
    },
});
