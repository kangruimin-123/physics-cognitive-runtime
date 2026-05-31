import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/physics-cognitive-runtime/",
  plugins: [react()],
});
