// @flow weak

import { shuffle } from 'd3-array';

export const EXAMPLE_STORE_KEY = 'packed-by-age';

export const VIEW = [500, 400]; // ViewBox: Width, Height
export const TRBL = [30, 20, 10, 30]; // Margins: Top, Right, Bottom, Left

export const COLORS = shuffle([
  '#12291F',
  '#3C564B',
  '#1E3129',
  '#091F16',
  '#02130C',
  '#121E26',
  '#3A4751',
  '#1E272E',
  '#0A151D',
  '#030C12',
  '#253517',
  '#5D704E',
  '#324027',
  '#19280C',
  '#0D1903',
]);

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
