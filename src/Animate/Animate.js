// @flow weak
/* eslint max-len: "off" */

import React, { Component } from 'react';

//

import NodeGroup from '../NodeGroup';

type Props = {
  /**
   * Boolean value that determines if the child should be rendered or not.
   */
  show: bool,
  /**
  * An object or function that returns an obejct to be used as the starting state.
  */
  start: {} | () => {},
  /**
   * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on enter.
   */
  enter?: {} | Array<{}> | () => {},
  /**
   * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on update. ***Note:*** although not required, in most cases it make sense to specify an update prop to handle interrupted enter and leave transitions.
   */
  update?: {} | Array<{}> | () => {},
  /**
   * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on leave.
   */
  leave?: {} | Array<{}> | () => {},
  /**
   * A function that renders the node.  The function is passed the data and state.
   */
  children: (state: {}) => {},
};

class Animate extends Component {
  static defaultProps = {
    show: true,
  };

  render() {
    const {
      show,
      start,
      enter,
      update,
      leave,
      children,
      render,
      Component: Comp,
      ...rest
    } = this.props;

    return (
      <NodeGroup
        data={show ? [true] : []}
        keyAccessor={(d) => d}
        start={typeof start === 'function' ? start : () => start}
        enter={typeof enter === 'function' ? enter : () => enter}
        update={typeof update === 'function' ? update : () => update}
        leave={typeof leave === 'function' ? leave : () => leave}
      >
        {(inters) => {
          if (!inters.length) {
            return null;
          }
          let rendered;
          if (Comp) {
            rendered = React.createElement(Comp, null, {
              ...rest,
              ...inters[0].state,
            });
          } else {
            rendered = (render || children)(inters[0].state);
          }
          return rendered ? React.Children.only(rendered) : null;
        }}
      </NodeGroup>
    );
  }
}

export default Animate;
