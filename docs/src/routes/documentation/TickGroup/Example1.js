// @flow weak

import React from 'react';
import Surface from 'docs/src/components/Surface';

/**
 * A simple example of `Surface` component.
 * By adopting the the convention of defining view and trbl props
 * it makes it easier to reason about the placement of child elements.
 * Note how the rect element has no translation and is drawn with the correct margins around it
 */
const color = 'rgba(0,0,0,0.3)';

const view = [1000, 250]; // view [width, height] fed to SVG viewbox attribute
const trbl = [10, 10, 10, 100]; // Margins [top, right, bottom, left] for the SVG

const dims = [ // The usable dimensions.
  view[0] - trbl[1] - trbl[3],
  view[1] - trbl[0] - trbl[2],
];

const Exmaple1 = () => (
  <Surface
    view={view}
    trbl={trbl}
    style={{ backgroundColor: color }}
  >
    <rect width={dims[0]} height={dims[1]} fill={color} />
  </Surface>
);

export default Exmaple1;
