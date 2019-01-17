module.exports = {
  env: {
    esm: {
      exclude: /node_modules/,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        ['transform-react-remove-prop-types', { mode: 'wrap' }],
        ['@babel/transform-runtime', { useESModules: true }],
      ],
    },
    cjs: {
      exclude: /node_modules/,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
          },
        ],
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        ['transform-react-remove-prop-types', { mode: 'wrap' }],
      ],
    },
    test: {
      exclude: /node_modules/,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
          },
        ],
        '@babel/preset-react',
      ],
      plugins: ['@babel/plugin-proposal-class-properties'],
    },
    coverage: {
      exclude: /node_modules/,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
          },
        ],
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-istanbul',
      ],
    },
  },
}
