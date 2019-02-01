import * as React from "react";
import {
  HashMap
} from 'kapellmeister';
import { GetInterpolator } from '..'

export interface IAnimateProps {
  show?: boolean;
  interpolation?: GetInterpolator;
  start: () => HashMap | HashMap;
  enter?: () => (HashMap| Array<HashMap>) | HashMap | Array<HashMap>;
  update?: () => (HashMap | Array<HashMap>) | HashMap | Array<HashMap>;
  leave?: () => (HashMap| Array<HashMap>) | HashMap | Array<HashMap>;
  children: (state: HashMap) => React.ReactElement<any>;
}

declare class IAnimate extends React.Component<IAnimateProps> { }

export default IAnimate
