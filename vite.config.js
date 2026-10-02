import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig(function (_a) {
    var command = _a.command;
    return ({
        base: command === "serve" ? "/" : "/Rohit-Portfolio/",
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
});
