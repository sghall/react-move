// @flow weak
/* eslint no-console: "off" */

const execSync = require('child_process').execSync

console.log('Building CJS modules...')
execSync(
  'cross-env BABEL_ENV=cjs babel src -d build --ignore "src/**/*.spec.js"',
)

console.log('Building ESM modules...')
execSync(
  'cross-env BABEL_ENV=esm babel src -d build/es --ignore "src/**/*.spec.js"',
)

console.log('Building UMD files...')
execSync('rollup -c')
