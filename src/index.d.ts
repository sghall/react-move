import * as React from "react";

export type GetInterpolator = (begValue?: any, endValue?: any, attr?: string, namespace?: string) => (t: number) => any

export { default as Animate } from './Animate';
export { default as NodeGroup } from './NodeGroup';
