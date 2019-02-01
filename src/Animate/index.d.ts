import * as React from "react";
import {
  HashMap,
  Config
} from 'kapellmeister';
import { GetInterpolator } from '..'

export interface IAnimateProps {
  show?: boolean;
  interpolation?: GetInterpolator;
  start: () => HashMap | HashMap;
  enter?: () => (Config| Array<Config>) | Config | Array<Config>;
  update?: () => (Config | Array<Config>) | Config | Array<Config>;
  leave?: () => (Config| Array<Config>) | Config | Array<Config>;
  children: (state: HashMap) => React.ReactElement<any>;
}

declare class IAnimate extends React.Component<IAnimateProps> { }

export default IAnimate
