import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            less: {
                math: "parens-division",
            },
            scss: {
                api: "modern-compiler", // or "modern", "legacy"
                importers: [
                    // ...
                ],
            },
        },
    },
});
