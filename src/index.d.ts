import * as React from "react";

export {
  Timing,
  Events,
  CustomInterpolator,
  PlainObject,
  PlainObjectFunction,
  Transition,
  TransitionFunction
} from './core';


export type GetInterpolator = (begValue?: any, endValue?: any, attr?: string, namespace?: string) => (t: number) => any

export { default as createAnimate, IAnimate } from './createAnimate';
export { default as createNodeGroup, INodeGroup } from './createNodeGroup';
