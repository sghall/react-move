// @flow weak
/* eslint max-len: "off" */

import React, { Component } from 'react';
import NodeGroup from '../NodeGroup';

type Props = {
  /**
   * A [contunous D3 scale](https://github.com/d3/d3-scale#continuous-scales) (i.e. has a "ticks" function). The scale prop is treated as immutable so the ticks will only update if prev.scale !== next.scale.
   */
  scale: (value: number) => number,
  /**
   * Approximate number of ticks to be rendered. This is passed directly through to the D3 scale ticks function.
   */
  tickCount: number,
  /**
   * A function that returns the starting state object. The function is passed the tick (the tick is passed as an object with a "val" key e.g. { val: 10.5 }) and the index.
   */
  start: (data: {}, index: number) => {} | Array<{}>,
  /**
   * A function that **returns an object or array of objects** describing how the state should transform on enter.  The function is passed the tick (the tick is passed as an object with a "val" key e.g. { val: 10.5 }) and index.
   */
  enter?: (data: {}, index: number) => {} | Array<{}>,
  /**
   * A function that **returns an object or array of objects** describing how the state should transform on update.  The function is passed the tick (the tick is passed as an object with a "val" key e.g. { val: 10.5 }) and index.
   */
  update?: (data: {}, index: number) => {} | Array<{}>,
  /**
   * A function that **returns an object or array of objects** describing how the state should transform on leave.  The function is passed the tick (the tick is passed as an object with a "val" key e.g. { val: 10.5 }) and index.
   */
  leave?: (data: {}, index: number) => {} | Array<{}>,
  /**
   * A function that renders the ticks. It should accept an array of ticks as its only argument.  Each tick is an object with the key, data ({ val: 10.5 }), state and a type of 'ENTER', 'UPDATE' or 'LEAVE'.
   */
  children: (nodes: Array<{}>) => {},
};

const tickKeyAccessor = (d) => `tick-${d.val}`;

class TickGroup extends Component {
  static defaultProps = {
    enter: () => {},
    update: () => {},
    leave: () => {},
  };

  state = {
    ticks: [],
  }

  componentDidMount() {
    const { scale, tickCount } = this.props;
    const ticks = scale.ticks ? scale.ticks(tickCount) : [];
    this.updateTicks(ticks.map((d) => ({ val: d })));
  }

  componentWillReceiveProps(next) {
    if (next.scale !== this.props.scale) {
      const { scale, tickCount } = next;
      const ticks = scale.ticks ? scale.ticks(tickCount) : [];
      this.updateTicks(ticks.map((d) => ({ val: d })));
    }
  }

  updateTicks(ticks) {
    this.setState(() => ({ ticks }));
  }

  props: Props

  render() {
    const { start, enter, update, leave, children } = this.props;

    return (
      <NodeGroup
        data={this.state.ticks}
        keyAccessor={tickKeyAccessor}
        start={start}
        enter={enter}
        update={update}
        leave={leave}
      >
        {children}
      </NodeGroup>
    );
  }
}

export default TickGroup;

