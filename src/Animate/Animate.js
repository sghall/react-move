// @flow weak
/* eslint max-len: "off" */

import React, { Component } from 'react';
import { transition, stop } from '../core/transition';

type Props = {
  /**
   * The show prop is used to optionally toggle the visibility and enter/leave states.
   */
  show: boolean,
  /**
  * An object or array representing the starting state.
  */
  enter: {} | Array<{}>,
  /**
   * An object or array representing the updated state. When changed, an animation will be triggered to transition to the new state.
   */
  update?: {} | Array<{}>,
  /**
   * An object or array representing the leaving state.
   */
  leave?: {} | Array<{}>,
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

  state = this.props.enter;

  componentDidMount() {
    const { show, enter } = this.props;

    if (show && enter) {
      transition.call(this, enter);
    }
  }

  componentWillReceiveProps(next) {
    // TODO: immutable `update` object or deep change detection?
    if (next.show !== this.props.show) {
      this.update(next);
    }
  }

  componentWillUnmount() {
    stop.call(this);
  }

  props: Props;

  update(props) {
    const { show, update } = props;
    // TODO: how to unmount the component is `show === false`
    transition.call(this, update);
  }

  render() {
    const renderedChildren = this.props.children(this.state);
    return renderedChildren && React.Children.only(renderedChildren);
  }
}

export default Animate;
