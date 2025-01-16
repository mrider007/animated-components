import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import postcss from 'rollup-plugin-postcss';
import path from "path";

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    name: 'my-animated-components',
    sourcemap: true,
  },
  external: ['react', 'react-dom', 'tailwindcss', 'framer-motion'],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.jsx", "src/**/*.js"],
    }),
    postcss({
      extensions: ['.css'],
      extract: path.resolve('dist/style.css'),
      minimize: true, 
    }),
  ],
});
