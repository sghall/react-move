// @flow

// ********************************************************
// MARKDOWN FILES
// ********************************************************
export const requireMarkdown = require.context(
  '../pages',
  true,
  /^((?![\\/]component-demos[\\/]).)*\.md$/,
)

// ********************************************************
// SRC CONTEXT
// ********************************************************
export const srcContext = require.context('!raw-loader!./PropsDescription', true)

// ********************************************************
// DEMO FILES
// ********************************************************
export const requireDemo = require.context('../pages/demos', true, /\.md$/)

export const demo = requireDemo.keys().map(n => ({
  path: n,
  name: n.replace(/.*\//, '').replace('.md', ''),
}))
