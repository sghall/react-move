import { createAnimate } from 'react-move'
import { interpolate, interpolateTransformSvg } from 'd3-interpolate'

export default createAnimate(function getInterpolator(attr, begValue, endValue) {
  if (attr === 'transform') {
    return interpolateTransformSvg(begValue, endValue)
  }

  return interpolate(begValue, endValue)
})