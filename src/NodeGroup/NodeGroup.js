// @flow weak
/* eslint max-len: "off" */

import React, { Component } from 'react';
import { interval } from 'd3-timer';
import Node from '../Node';
import mergeKeys from '../core/mergeKeys';
import { ENTER, UPDATE, LEAVE } from '../core/types';
import { transition, stop } from '../core/transition';

class NodeGroup extends Component {
  static defaultProps = {
    enter: () => {},
    update: () => {},
    leave: () => {},
  };

  state = {
    nodes: [],
  }

  componentDidMount() {
    this.updateNodes(this.props);
  }

  componentWillReceiveProps(next) {
    if (next.data !== this.props.data) {
      this.updateNodes(next);
    }
  }

  componentWillUnmount() {
    this.unmounting = true;

    if (this.interval) {
      this.interval.stop();
    }

    this.nodeKeys.forEach((key) => {
      stop.call(this.nodeHash[key]);
    });
  }

  // props: Props;

  updateNodes(props) {
    const { data, keyAccessor, start, enter, update, leave } = props;

    const currKeyIndex = {};
    const currNodeKeys = this.nodeKeys;
    const currNodeKeysLength = this.nodeKeys.length;

    for (let i = 0; i < currNodeKeysLength; i++) {
      currKeyIndex[currNodeKeys[i]] = i;
    }

    const nextKeyIndex = {};
    const nextNodeKeys = [];

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const k = keyAccessor(d, i);

      nextKeyIndex[k] = i;
      nextNodeKeys.push(k);

      if (currKeyIndex[k] === undefined) {
        this.nodeHash[k] = new Node(k, d, ENTER);
      }
    }

    for (let i = 0; i < currNodeKeysLength; i++) {
      const k = currNodeKeys[i];
      const n = this.nodeHash[k];

      if (nextKeyIndex[k] !== undefined) {
        n.updateData(data[nextKeyIndex[k]]);
        n.updateType(UPDATE);
      } else {
        n.updateType(LEAVE);
      }
    }

    this.nodeKeys = mergeKeys(
      currNodeKeys,
      currKeyIndex,
      nextNodeKeys,
      nextKeyIndex,
    );

    for (let i = 0; i < this.nodeKeys.length; i++) {
      const k = this.nodeKeys[i];
      const n = this.nodeHash[k];
      const d = n.data;

      if (n.type === ENTER) {
        n.setState(start(d, nextKeyIndex[k]));
        transition.call(n, enter(d, nextKeyIndex[k]));
      } else if (n.type === LEAVE) {
        transition.call(n, leave(d, currKeyIndex[k]));
      } else {
        transition.call(n, update(d, nextKeyIndex[k]));
      }
    }

    if (!this.interval) {
      this.interval = interval(this.animate);
    } else {
      this.interval.restart(this.animate);
    }

    this.renderNodes();
  }

  animate = () => {
    if (this.unmounting) {
      return;
    }

    let pending = false;

    const nextNodeKeys = [];
    const length = this.nodeKeys.length;

    for (let i = 0; i < length; i++) {
      const k = this.nodeKeys[i];
      const n = this.nodeHash[k];

      if (n.TRANSITION_SCHEDULES) {
        pending = true;
      }

      if (n.type === LEAVE && !n.TRANSITION_SCHEDULES) {
        delete this.nodeHash[k];
      } else {
        nextNodeKeys.push(k);
      }
    }

    if (!pending) {
      this.interval.stop();
    }

    this.nodeKeys = nextNodeKeys;
    this.renderNodes();
  }

  nodeHash = {};
  nodeKeys = [];
  interval = null;
  unmounting = false;

  renderNodes() {
    this.setState(() => ({
      nodes: this.nodeKeys.map((key) => {
        return this.nodeHash[key];
      }),
    }));
  }

  render() {
    const renderedChildren = this.props.children(this.state.nodes);
    return renderedChildren && React.Children.only(renderedChildren);
  }
}

// type Props = {
//   /**
//    * An array.  The data prop is treated as immutable so the nodes will only update if prev.data !== next.data.
//    */
//   data: Array<any>,
//   /**
//    * Function that returns a string key given the data and its index.  Used to track which nodes are entering, updating and leaving.
//    */
//   keyAccessor: (data: {}, index: number) => string,
//   /**
//   * A function that returns the starting state.  The function is passed the data and index and must return an object.
//   */
//   start: (data: {}, index: number) => {} | Array<{}>,
//   /**
//    * A function that **returns an object or array of objects** describing how the state should transform on enter.  The function is passed the data and index.
//    */
//   enter?: (data: {}, index: number) => {} | Array<{}>,
//   /**
//    * A function that **returns an object or array of objects** describing how the state should transform on update.  The function is passed the data and index.
//    */
//   update?: (data: {}, index: number) => {} | Array<{}>,
//   /**
//    * A function that **returns an object or array of objects** describing how the state should transform on leave.  The function is passed the data and index.
//    */
//   leave?: (data: {}, index: number) => {} | Array<{}>,
//   /**
//    * A function that renders the nodes. It should accept an array of nodes as its only argument.  Each node is an object with the key, data, state and a type of 'ENTER', 'UPDATE' or 'LEAVE'.
//    */
//   children: (nodes: Array<{}>) => {},
// };


export default NodeGroup;
