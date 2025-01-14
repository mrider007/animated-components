import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import postcss from "@rollup/plugin-postcss";

export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    name: "animated-components",
    sourcemap: true, // Helps with debugging
  },
  external: ["react", "react-dom", "tailwindcss", "framer-motion"],
  plugins: [
    typescript({ tsconfig: "tsconfig.json" }),
    postcss({
      extensions: [".css"],
      minimize: true, // Minify CSS for production
    }),
  ],
});
