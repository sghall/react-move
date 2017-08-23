// @flow weak

export const EXAMPLE_STORE_KEY = 'webpack-sunburst'; // Redux store key

export const VIEW = [500, 500]; // ViewBox: Width, Height
export const TRBL = [0, 100, 100, 100]; // Margins: Top, Right, Bottom, Left

export const DIMS = [
  VIEW[0] - TRBL[1] - TRBL[3], // Adjusted dimensions width
  VIEW[1] - TRBL[0] - TRBL[2], // Adjusted dimensions height
];

export const RADIUS = Math.min(...DIMS) / 2;

export const PI = Math.PI;

export const COLORS = [
  '#6C6B74',
  '#2E303E',
  '#9199BE',
  '#54678F',
  '#212624',
  '#3A4751',
  '#1E272E',
  '#0A151D',
  '#030C12',
  '#253517',
  '#5D704E',
  '#324027',
  '#19280C',
  '#0D1903',
];
