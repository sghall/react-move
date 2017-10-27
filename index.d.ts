import * as React from "react";

/**
 * Timing must be placed on the "timing" key in the transition.
 */
export interface ITiming {
  delay?: number;
  duration?: number;
  ease?: (t: number) => number;
}

/**
 * Events must be placed on the "events" key in the transition.
 */
export interface IEvents {
  start?: () => void;
  interrupt?: () => void;
  end?: () => void;
}

export interface CustomInterpolator {
  (t: number): any;
}

export interface NameSpace {
  [key: string]: Array<number> | Array<string> | number | string  | CustomInterpolator ;
}

export interface Transition {
  [key: string]: Array<number> | Array<string> | number | string | CustomInterpolator | NameSpace | IEvents | ITiming;
};

export interface TransitionFunction {
  (): Transition | Array<Transition>;
}

export interface PlainObject {
  [key: string]: number | string | PlainObject;
}

export interface PlainObjectFunction {
  (): PlainObject;
}

export interface IAnimateProps {
  /**
   * Boolean value that determines if the child should be rendered or not.
   */
  show?: boolean;
  /**
  * An object or function that returns an obejct to be used as the starting state. 
  */
  start: PlainObjectFunction | PlainObject;
  /**
   * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on enter.
   */
  enter?: TransitionFunction | Transition | Array<Transition>
  /**
   * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on update. ***Note:*** although not required, in most cases it make sense to specify an update prop to handle interrupted enter and leave transitions.
   */
  update?: TransitionFunction | Transition | Array<Transition>
  /**
   * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on leave.
   */
  leave?: TransitionFunction | Transition | Array<Transition>
  /**
   * A function that renders the node.  The function is passed the data and state.
   */
  children: (state: PlainObject) => React.ReactElement<any>;
}

export declare class Animate extends React.Component<IAnimateProps> { }

export interface INodeGroupProps {
  /**
   * An array.  The data prop is treated as immutable so the nodes will only update if prev.data !== next.data.
   */
  data: Array<any>;
  /**
   * Function that returns a string key given a data object and its index.  Used to track which nodes are entering, updating and leaving.
   */
  keyAccessor: (data: any, index: number) => string;
  /**
  * A function that returns the starting state.  The function is passed the data and index and must return an object.
  */
  start: (data: any, index: number) => PlainObject;
  /**
   * A function that **returns an object or array of objects** describing how the state should transform on enter.  The function is passed the data and index.
   */
  enter?: (data: any, index: number) => Transition | Array<Transition>;
  /**
   * A function that **returns an object or array of objects** describing how the state should transform on update.  The function is passed the data and index.
   */
  update?: (data: any, index: number) => Transition | Array<Transition>;
  /**
   * A function that **returns an object or array of objects** describing how the state should transform on leave.  The function is passed the data and index.
   */
  leave?: (data: any, index: number) => Transition | Array<Transition>;
  /**
   * A function that renders the nodes. It should accept an array of nodes as its only argument.  Each node is an object with the key, data, state and a type of 'ENTER', 'UPDATE' or 'LEAVE'.
   */
  children: (nodes: Array<any>) => React.ReactElement<any>;
}

export declare class NodeGroup extends React.Component<INodeGroupProps> { }
