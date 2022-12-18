import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
    },
  },
  base: mode === "production" ? "/UML/" : "",
}));
