import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import postcss from 'rollup-plugin-postcss';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    name: 'my-animated-components',
  },
  external: ['react', 'react-dom', 'tailwindcss', 'framer-motion','fs', 'path'],
  plugins: [
    typescript({ tsconfig: 'tsconfig.json' }),
    postcss({
      extensions: ['.css'],
    }),
  ],
});
