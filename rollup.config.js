import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import json from 'rollup-plugin-json';
import nodeBuiltIns from 'rollup-plugin-node-builtins';
import nodeGlobals from 'rollup-plugin-node-globals';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default {
  input: './src/index.ts',
  plugins: [
    json(),
    nodeResolve({
      jsnext: true,
      main: true,
      preferBuiltins: false,
    }),
    commonjs(),
    nodeBuiltIns(),
    nodeGlobals(),
    typescript({
      typescript: require('typescript'),
    }),
    babel({
      plugins: ['babel-plugin-transform-custom-element-classes'],
      babelrc: false,
      exclude: 'node_modules/core-js/**',
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              browsers: ['> 1%', 'Chrome 41', 'not IE 11'],
            },
            useBuiltIns: 'usage',
          },
        ],
      ],
      runtimeHelpers: true,
    }),
    process.env.NODE_ENV === 'production' ? uglify() : {},
  ],
  output: {
    file: './dist/talkie.js',
    format: 'umd',
    name: 'talkie',
    sourcemap: true,
  },
  watch: {
    clearScreen: false,
  },
};
