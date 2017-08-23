// @flow weak
export const EXAMPLE_STORE_KEY = 'states-by-age';

export const VIEW = [500, 400]; // ViewBox: Width, Height
export const TRBL = [30, 20, 10, 30]; // Margins: Top, Right, Bottom, Left

export const DIMS = [
  VIEW[0] - TRBL[1] - TRBL[3], // Adjusted dimensions width
  VIEW[1] - TRBL[0] - TRBL[2], // Adjusted dimensions height
];

export const AGES = [
  'Under 5 Years',
  '5 to 13 Years',
  '14 to 17 Years',
  '18 to 24 Years',
  '16 Years and Over',
  '18 Years and Over',
  '15 to 44 Years',
  '45 to 64 Years',
  '65 Years and Over',
  '85 Years and Over',
];
