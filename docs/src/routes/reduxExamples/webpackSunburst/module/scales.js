// @flow weak

import { arc } from 'd3-shape';
import { interpolate } from 'd3-interpolate';
import { scaleLinear, scaleSqrt } from 'd3-scale';
import { PI } from '../module/constants';

// The x and y scales are set and interpolated in the components/index
export const x = scaleLinear();
export const y = scaleSqrt();

export const path = arc()
  .startAngle((d) => Math.max(0, Math.min(2 * PI, x(d.x0))))
  .endAngle((d) => Math.max(0, Math.min(2 * PI, x(d.x1))))
  .innerRadius((d) => Math.max(0, y(d.y0)))
  .outerRadius((d) => Math.max(0, y(d.y1)));

export const getScaleInterpolators = (next) => ({
  xd: interpolate(x.domain(), next.xScale.domain()),
  yd: interpolate(y.domain(), next.yScale.domain()),
  yr: interpolate(y.range(), next.yScale.range()),
});

export function arcTween(data) {
  return () => {
    return path(data);
  };
}
