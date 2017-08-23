// @flow weak
/* eslint-env mocha */

import { assert } from 'chai';
import {
  interpolateRgb,
  interpolateNumber,
  interpolateString,
  interpolateTransformSvg,
} from 'd3-interpolate';
import { getInterpolator } from './tween';

describe('getInterpolator', () => {
  it('returns interpolateTransformSvg if attr is transform` ', () => {
    assert.strictEqual(getInterpolator('transform', 'translate(1,1)'), interpolateTransformSvg);
  });

  it('returns interpolateNumber if value is a number` ', () => {
    assert.strictEqual(getInterpolator('x', 5), interpolateNumber);
  });

  it('returns interpolateRgb if value is given as a hex value` ', () => {
    assert.strictEqual(getInterpolator('fill', '#fff'), interpolateRgb);
  });

  it('returns interpolateRgb if value is given as an rgb value` ', () => {
    assert.strictEqual(getInterpolator('fill', 'rgb(0,0,0)'), interpolateRgb);
  });

  it('returns interpolateRgb if value is given as an rgba value` ', () => {
    assert.strictEqual(getInterpolator('fill', 'rgba(255,255,255, 0.5)'), interpolateRgb);
  });

  it('otherwise returns interpolateString` ', () => {
    assert.strictEqual(getInterpolator('x', 'else'), interpolateString);
  });
});

