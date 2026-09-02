import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const useLocalLibrary = mode === "workspace";

  return {
    base: command === "build" ? "/react-form-suite-demo/" : "/",
    plugins: [react()],
    resolve: {
      alias: useLocalLibrary
        ? [
            {
              find: "react-form-suite",
              replacement: new URL(
                "../packages/react-form-suite/src/index.ts",
                import.meta.url,
              ).pathname,
            },
          ]
        : [],
    },
  };
});
