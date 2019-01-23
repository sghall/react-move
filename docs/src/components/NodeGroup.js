import { createNodeGroup } from 'react-move'
import { interpolate, interpolateTransformSvg } from 'd3-interpolate'

export default createNodeGroup(function getInterpolator(attr, begValue, endValue) {
  if (attr === 'transform') {
    return interpolateTransformSvg(begValue, endValue)
  }

  return interpolate(begValue, endValue)
}, 'DocsNodeGroup')