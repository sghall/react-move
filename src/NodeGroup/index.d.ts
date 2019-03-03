import * as React from "react";
import {
  Config,
} from 'kapellmeister';
import { GetInterpolator } from '..'

export type AddArrayLike<T> = unknown extends T ? Config | Config[] : {
  [P in keyof T]: T[P] | T[P][]
}

export interface INodeGroupProps<T = unknown, State = unknown> {
  data: T[];
  keyAccessor: (data: T, index: number) => string | number;
  interpolation?: GetInterpolator;
  start: (data: T, index: number) =>  unknown extends State ? Config : State;
  enter?: (data: T, index: number) => AddArrayLike<State>;
  update?: (data: T, index: number) => AddArrayLike<State>;
  leave?: (data: T, index: number) => AddArrayLike<State>;
  children: (nodes: T & { key: string | number, data: T, state: unknown extends State ? Config : State }[]) => React.ReactElement<any>;
}

export declare class INodeGroup<T = unknown, State = unknown> extends React.Component<INodeGroupProps<T, State>> { }

export default INodeGroup
