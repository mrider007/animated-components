import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import postcss from 'rollup-plugin-postcss';
import path from "path";
import dts from "rollup-plugin-dts";


export default defineConfig([{
  input: 'src/index.ts',
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "es",
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom', 'tailwindcss', 'framer-motion'],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    postcss({
      extensions: ['.css'],
      extract: path.resolve('dist/style.css'),
      minimize: true, 
    }),
  ],
  
},
{
  input: "src/index.ts",
  output: [{ file: "dist/index.d.ts", format: "es" }],
  plugins: [dts()],
},
]);
