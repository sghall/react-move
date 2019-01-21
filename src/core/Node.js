import { interpolate, interpolateTransformSvg } from 'd3-interpolate'
import { BaseNode } from 'kapellmeister'

export default class Node extends BaseNode {
  getInterpolator(attr, begValue, endValue) {
    if (attr === 'transform') {
      return interpolateTransformSvg(begValue, endValue)
    }

    return interpolate(begValue, endValue)
  }
}