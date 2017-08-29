// @flow weak
/* eslint max-len: "off" */

import React, { Component } from 'react';
import { interval } from 'd3-timer';
import { transition, stop } from '../core/transition';

type Props = {
  /**
   * Boolean value that determines if the child should be mounted or not.
   */
  show: bool,
  /**
  * The starting state.
  */
  start: {},
  /**
   * An object or array of objects describing how the state should transform on enter.
   */
  enter?: {} | Array<{}>,
  /**
   * An object or array of objects describing how the state should transform on update. ***Note:*** although not required, in most cases it make sense to specify an update prop to handle interrupted enter and leave transitions.
   */
  update?: {} | Array<{}>,
  /**
   * An object or array of objects describing how the state should transform on leave.
   */
  leave?: {} | Array<{}>,
  /**
   * A function that renders the node.  The function is passed the data and state.
   */
  children: (state: {}) => {},
};

class Animate extends Component {
  static defaultProps = {
    show: true,
  }

  state = this.props.start

  componentWillMount() {
    if (this.props.show === true) {
      this.renderNull = false;
    }
  }

  componentDidMount() {
    const { enter, show } = this.props;

    if (enter && show === true) {
      transition.call(this, enter);
    }
  }

  componentWillReceiveProps(next) {
    const { show, start, enter, update, leave } = next;

    if (this.props.show === false && this.renderNull === true && show === true) {
      this.renderNull = false;

      this.setState(() => start, () => {
        if (enter) {
          transition.call(this, enter);
        }
      });
    } else if (this.props.show === true && show === false) {
      if (leave) {
        transition.call(this, leave);
        this.interval = interval(this.checkTransitionStatus);
      } else {
        this.renderNull = true;
        this.setState((prevState) => prevState); // force render as null
      }
    } else if (show === true && update && update !== this.props.update) {
      if (this.interval) {
        this.interval.stop();
      }

      transition.call(this, update);
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      this.interval.stop();
    }

    stop.call(this);
  }

  checkTransitionStatus = () => {
    if (!this.TRANSITION_SCHEDULES) {
      this.interval.stop();

      if (this.props.show === false) {
        this.renderNull = true;
        this.setState((prevState) => prevState); // force render as null
      }
    }
  }

  props: Props;

  interval = null;
  renderNull = true;

  render() {
    if (this.renderNull === true) {
      return null;
    }

    const renderedChildren = this.props.children(this.state);
    return renderedChildren && React.Children.only(renderedChildren);
  }
}

export default Animate;
