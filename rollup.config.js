import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';

const config = {
  input: 'src/components/tour-widget/index.ts',
  output: [
    {
      file: 'dist/tour-widget.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/tour-widget.umd.js',
      format: 'umd',
      name: 'TourWidget',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    postcss({
      extract: 'tour-widget.css',
      minimize: true,
      modules: false,
    }),
    resolve({
      browser: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    terser({
      compress: {
        drop_console: true,
      },
    }),
  ],
};

export default config;
