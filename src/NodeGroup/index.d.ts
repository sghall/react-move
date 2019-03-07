import * as React from "react";
import { HashMap, GetInterpolator } from '..'

export interface INodeGroupProps {
  data: Array<any>;
  keyAccessor: (data: any, index: number) => string | number;
  interpolation?: GetInterpolator;
  start: (data: any, index: number) => HashMap;
  enter?: (data: any, index: number) => (HashMap | Array<HashMap>);
  update?: (data: any, index: number) => (HashMap | Array<HashMap>);
  leave?: (data: any, index: number) => (HashMap | Array<HashMap>);
  children: (nodes: Array<any>) => React.ReactElement<any>;
}

export declare class INodeGroup extends React.Component<INodeGroupProps> { }

export default INodeGroup