import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cdn from "vite-plugin-cdn-import";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cdn({
      prodUrl: "https://unpkg.com/{name}@{version}/{path}",
      modules: ["axios"],
    }),
  ],
});
