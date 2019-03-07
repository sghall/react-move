import * as React from "react";
import { HashMap, GetInterpolator } from '..'

export interface IAnimateProps {
  show?: boolean;
  interpolation?: GetInterpolator;
  start: any;
  enter?: any;
  update?: any;
  leave?: any;
  children: (state: HashMap) => React.ReactElement<any>;
}

declare class IAnimate extends React.Component<IAnimateProps> { }

export default IAnimate
