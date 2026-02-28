import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages публикует сайт по пути: https://user.github.io/<repo>/
// Мы подставим base автоматически через переменную окружения BASE_PATH в GitHub Actions.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH ?? "/",
});