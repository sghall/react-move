// @flow weak

import React from 'react';
import Surface from 'docs/src/components/Surface';

/**
 * This example shows how surfaces will conform to their containers
 * NOTE: Bootstrap grid CSS is loaded on this page and are used to define the layout below
 */
const color = 'rgba(0,0,0,0.3)';

const view = [1000, 250]; // view [width, height] fed to SVG viewbox attribute
const trbl = [10, 10, 10, 100]; // Margins [top, right, bottom, left] for the SVG

const dims = [ // The usable dimensions.
  view[0] - trbl[1] - trbl[3],
  view[1] - trbl[0] - trbl[2],
];

const GreySurface = () => (
  <Surface
    view={view}
    trbl={trbl}
    style={{ backgroundColor: color }}
  >
    <rect width={dims[0]} height={dims[1]} fill={color} />
  </Surface>
);

const Example2 = () => (
  <div className="row">
    {[1, 2, 3, 4].map((d) => (
      <div key={d} className="col-md-3 col-sm-6" style={{ padding: 2 }}>
        <GreySurface />
      </div>
    ))}
  </div>
);

export default Example2;
