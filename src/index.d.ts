import * as React from "react";

export {
  Timing,
  Events,
  NameSpace,
  CustomInterpolator,
  PlainObject,
  PlainObjectFunction,
  Transition,
  TransitionFunction
} from './core';


export type GetInterpolator = (attr: string, begValue: any, endValue: any) => (t: number) => any

export { default as createAnimate } from './createAnimate';
export { default as createNodeGroup } from './createNodeGroup';
