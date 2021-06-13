import * as React from "react"
import { HashMap, GetInterpolator } from '..'

export interface INodeGroupProps<T> {
  data: Array<T>
  keyAccessor: (data: T, index: number) => string | number
  interpolation?: GetInterpolator
  start: (data: T, index: number) => HashMap
  enter?: (data: T, index: number) => HashMap | Array<HashMap>
  update?: (data: T, index: number) => HashMap | Array<HashMap>
  leave?: (data: T, index: number) => HashMap | Array<HashMap>
  children: (nodes: Array<any>) => React.ReactElement<any>
}

export declare class INodeGroup<T> extends React.Component<
  INodeGroupProps<T>
> {}

export default INodeGroup
