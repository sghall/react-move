module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: [
    'babel',
    'mocha',
    'flowtype',
  ],
  rules: {
    'arrow-body-style': 'off',
    'no-plusplus': 'off',
    'arrow-parens': ['error', 'always'], // airbnb use as-needed
    'consistent-this': ['error', 'self'],
    'object-curly-spacing': 'off', // use babel plugin rule
    'babel/object-curly-spacing': ['error', 'always'],
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'react/prefer-stateless-function': 'off',
    'react/no-unused-prop-types': 'off', // buggy
    'react/require-default-props': 'off', // airbnb use error
    'react/forbid-prop-types': 'off', // airbnb use error
    'react/jsx-filename-extension': ['error', {extensions: ['.js']}], // airbnb is using .jsx
    'react/no-direct-mutation-state': 'error', // airbnb is disabling this rule
    'react/sort-comp': [2, {
      order: [
        'static-methods',
        'lifecycle',
        'everything-else',
        '/^render.+$/',
        'render'
      ],
    }],
    'mocha/handle-done-callback': 'error',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-global-tests': 'error',
    'mocha/no-pending-tests': 'error',
    'mocha/no-skipped-tests': 'error',
    'jsx-a11y/no-static-element-interactions': 'off',
    'flowtype/require-valid-file-annotation': ['error', 'always'],
    'flowtype/require-parameter-type': 'off',
    'flowtype/require-return-type': 'off',
    'flowtype/space-after-type-colon': 'off',
    'flowtype/space-before-type-colon': 'off',
    'flowtype/type-id-match': 'off',
  },
};
