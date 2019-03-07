import * as React from 'react';
import { Config } from 'kapellmeister';
import { GetInterpolator } from '..';

export type MakeState<T> = { [P in keyof T]: T[P] extends number | string ? T[P] | T[P][] : MakeState<T[P]> };

export interface INodeGroupProps<T = any, State = any> {
  data: T[];
  keyAccessor: (data: T, index: number) => string | number;
  start: (data: T, index: number) => State & Partial<Config>;
  enter?: (data: T, index: number) => MakeState<State> & Partial<Config>;
  update?: (data: T, index: number) => MakeState<State> & Partial<Config>;
  leave?: (data: T, index: number) => (MakeState<State> & Partial<Config>) | undefined;
  children: (nodes: T & { key: string | number; data: T; state: State }[]) => React.ReactElement<any>;
}

export declare class INodeGroup<T = any, State = any> extends React.Component<INodeGroupProps<T, State>> {}

export default INodeGroup;
