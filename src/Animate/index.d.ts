import * as React from "react";
import {
  HashMap,
  Config
} from 'kapellmeister';
import { GetInterpolator } from '..'

export interface IAnimateProps {
  /**
   * Boolean value that determines if the child should be rendered or not.
   */
  show?: boolean;
  /**
  * An object or function that returns an obejct to be used as the starting state. 
  */
  start: () => HashMap | HashMap;
  /**
   * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on enter.
   */
  enter?: () => (Config| Array<Config>) | Config | Array<Config>
  /**
   * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on update. ***Note:*** although not required, in most cases it make sense to specify an update prop to handle interrupted enter and leave Configs.
   */
  update?: () => (Config | Array<Config>) | Config | Array<Config>
  /**
   * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on leave.
   */
  leave?: () => (Config| Array<Config>) | Config | Array<Config>
  /**
   * A function that renders the node.  The function is passed the data and state.
   */
  children: (state: HashMap) => React.ReactElement<any>;
}

declare class IAnimate extends React.Component<IAnimateProps> { }

export default IAnimate
