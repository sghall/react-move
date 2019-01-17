// @flow weak
/* eslint-env mocha */

import { assert } from 'chai'
import {
  interpolate,
  interpolateTransformSvg,
} from 'd3-interpolate'
import { getInterpolator } from './tween'

describe('getInterpolator', () => {
  it('returns interpolateTransformSvg if attr is transform` ', () => {
    assert.strictEqual(getInterpolator('transform'), interpolateTransformSvg)
  })

  it('returns interpolate if attr is anything else` ', () => {
    assert.strictEqual(getInterpolator('x'), interpolate)
  })
})

