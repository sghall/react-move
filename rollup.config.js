import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const input = 'src/index.js'
const globalName = 'ReactMove'

const globals = {
  react: 'React',
}

const umd = [
  {
    input,
    output: {
      file: `build/dist/${pkg.name}.js`,
      format: 'umd',
      exports: 'named',
      name: globalName,
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          ['transform-react-remove-prop-types', { mode: 'wrap' }],
          ['@babel/transform-runtime'],
        ],
      }),
      nodeResolve(),
      commonjs({
        include: /node_modules/,
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      sizeSnapshot(),
    ],
  },
  {
    input,
    output: {
      file: `build/dist/${pkg.name}.min.js`,
      format: 'umd',
      exports: 'named',
      name: globalName,
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          [
            'transform-react-remove-prop-types',
            { mode: 'remove', removeImport: true },
          ],
          ['@babel/transform-runtime'],
        ],
      }),
      nodeResolve(),
      commonjs({
        include: /node_modules/,
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser(),
      sizeSnapshot(),
    ],
  },
]

export default umd
