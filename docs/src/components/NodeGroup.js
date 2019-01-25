import { createNodeGroup } from 'react-move'
import { interpolate, interpolateTransformSvg } from 'd3-interpolate'

export default createNodeGroup(function getInterpolator(begValue, endValue, attr) {
  if (attr === 'transform') {
    return interpolateTransformSvg(begValue, endValue)
  }

  return interpolate(begValue, endValue)
}, 'DocsNodeGroup')