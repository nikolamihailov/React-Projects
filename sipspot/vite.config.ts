import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        // "@/hooks/useMediaQuery" -> src/hooks/useMediaQuery (paths mirrored in tsconfig.json)
        alias: [{ find: /^@\//, replacement: "/src/" }],
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            },
        },
    },
});
