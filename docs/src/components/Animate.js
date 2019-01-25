import { createAnimate } from 'react-move'
import { interpolate, interpolateTransformSvg } from 'd3-interpolate'

export default createAnimate(function getInterpolator(begValue, endValue, attr) {
  if (attr === 'transform') {
    return interpolateTransformSvg(begValue, endValue)
  }

  return interpolate(begValue, endValue)
}, 'DocsAnimate')