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
export const srcContext = require.context('!raw-loader!../../../src', true)

// ********************************************************
// SLIDER DEMO FILES
// ********************************************************
export const requireSliderDemo = require.context(
  '../pages/slider-demos',
  true,
  /\.md$/,
)

export const sliderDemo = requireSliderDemo.keys().map(n => ({
  path: n,
  name: n.replace(/.*\//, '').replace('.md', ''),
}))
