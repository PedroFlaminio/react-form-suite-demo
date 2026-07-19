import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-form-builder": new URL(
        "../packages/react-form-builder/src/index.ts",
        import.meta.url,
      ).pathname,
    },
  },
});
