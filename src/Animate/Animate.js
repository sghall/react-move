// @flow weak
/* eslint max-len: "off" */

import React, { Component } from 'react';
import { transition, stop } from '../core/transition';

type Props = {
  /**
   * The data prop is treated as immutable. The component will run the update transition if prev.data !== next.data.
   */
  data: any,
  /**
  * A function that returns the starting state.  The function is passed the data and must return an object.
  */
  start: (data: any) => {} | Array<{}>,
  /**
   * A function that **returns an object or array of objects** describing how the state should transform on enter.  The function is passed the data.
   */
  enter?: (data: any) => {} | Array<{}>,
  /**
   * A function that **returns an object or array of objects** describing how the state should transform on update.  The function is passed the data.
   */
  update?: (data: any) => {} | Array<{}>,
  /**
   * A function that renders the node.  The function is passed the data and state.
   */
  children: (data: any, state: {}) => {},
};

class Animate extends Component {
  static defaultProps = {
    enter: () => {},
    update: () => {},
  };

  state = this.props.start(this.props.data)

  componentDidMount() {
    const { data, enter } = this.props;

    if (enter && typeof enter === 'function') {
      transition.call(this, enter(data));
    }
  }

  componentWillReceiveProps(next) {
    if (next.data !== this.props.data) {
      this.update(next);
    }
  }

  componentWillUnmount() {
    stop.call(this);
  }

  props: Props;

  update(props) {
    const { data, update } = props;
    transition.call(this, update(data));
  }

  render() {
    const renderedChildren = this.props.children(this.props.data, this.state);
    return renderedChildren && React.Children.only(renderedChildren);
  }
}

export default Animate;
