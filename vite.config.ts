import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
      "~": path.resolve(__dirname, "app"),
      "#types": path.resolve(__dirname, "src/types"),
      "#components": path.resolve(__dirname, "src/components"),
      "#services": path.resolve(__dirname, "src/services")
    },
  },
});
