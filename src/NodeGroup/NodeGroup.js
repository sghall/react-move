import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { interval } from '../core/kapellmeister'
import Node from '../core/Node'
import mergeKeys from '../core/mergeKeys'
import { ENTER, UPDATE, LEAVE } from '../core/types'

class NodeGroup extends Component {
  state = {
    nodeKeys: [],
    nodeHash: {},
    nodes: [],
    data: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.data) {
      const { data, keyAccessor, start, enter, update, leave } = nextProps
      const { nodeKeys, nodeHash } = prevState

      const keyIndex = {}

      for (let i = 0; i < nodeKeys.length; i++) {
        keyIndex[nodeKeys[i]] = i
      }

      const nextKeyIndex = {}
      const nextNodeKeys = []

      for (let i = 0; i < data.length; i++) {
        const d = data[i]
        const k = keyAccessor(d, i)

        nextKeyIndex[k] = i
        nextNodeKeys.push(k)

        if (keyIndex[k] === undefined) {
          const node = new Node()
          node.key = k
          node.data = d
          node.type = ENTER
          nodeHash[k] = node
        }
      }

      for (let i = 0; i < nodeKeys.length; i++) {
        const k = nodeKeys[i]
        const n = nodeHash[k]

        if (nextKeyIndex[k] !== undefined) {
          n.data = data[nextKeyIndex[k]]
          n.type = UPDATE
        } else {
          n.type = LEAVE
        }
      }

      const mergedNodeKeys = mergeKeys(
        nodeKeys,
        keyIndex,
        nextNodeKeys,
        nextKeyIndex,
      )

      for (let i = 0; i < mergedNodeKeys.length; i++) {
        const k = mergedNodeKeys[i]
        const n = nodeHash[k]
        const d = n.data

        if (n.type === ENTER) {
          n.setState(start(d, nextKeyIndex[k]))
          n.animate(enter(d, nextKeyIndex[k]))
        } else if (n.type === LEAVE) {
          n.animate(leave(d, keyIndex[k]))
        } else {
          n.animate(update(d, nextKeyIndex[k]))
        }
      }

      return {
        data,
        nodes: mergedNodeKeys.map(key => {
          return nodeHash[key]
        }),
        nodeHash,
        nodeKeys: mergedNodeKeys,
      }
    }

    return null
  }

  componentDidMount() {
    this.startInterval()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data && !this.unmounting) {
      this.startInterval()
    }
  }

  startInterval() {
    if (!this.interval) {
      this.interval = interval(this.animate)
    } else {
      this.interval.restart(this.animate)
    }
  }

  componentWillUnmount() {
    const { nodeKeys, nodeHash } = this.state

    this.unmounting = true

    if (this.interval) {
      this.interval.stop()
    }

    nodeKeys.forEach(key => {
      nodeHash[key].stopAnimating()
    })
  }

  animate = () => {
    const { nodeKeys, nodeHash } = this.state

    if (this.unmounting) {
      return
    }

    let pending = false

    const nextNodeKeys = []
    const length = nodeKeys.length

    for (let i = 0; i < length; i++) {
      const k = nodeKeys[i]
      const n = nodeHash[k]

      const isAnimating = n.isAnimating()

      if (isAnimating) {
        pending = true
      }

      if (n.type === LEAVE && !isAnimating) {
        delete nodeHash[k]
      } else {
        nextNodeKeys.push(k)
      }
    }

    if (!pending) {
      this.interval.stop()
    }

    this.setState(() => ({
      nodeKeys: nextNodeKeys,
      nodes: nextNodeKeys.map(key => {
        return nodeHash[key]
      }),
    }))
  }

  interval = null
  unmounting = false

  render() {
    const renderedChildren = this.props.children(this.state.nodes)
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

NodeGroup.propTypes = {
  /**
   * An array.  The data prop is treated as immutable so the nodes will only update if prev.data !== next.data.
   */
  data: PropTypes.array.isRequired,
  /**
   * Function that returns a string key given the data and its index.  Used to track which nodes are entering, updating and leaving.
   */
  keyAccessor: PropTypes.func.isRequired,
  /**
   * A function that returns the starting state.  The function is passed the data and index and must return an object.
   */
  start: PropTypes.func.isRequired,
  /**
   * A function that **returns an object or array of objects** describing how the state should transform on enter.  The function is passed the data and index.
   */
  enter: PropTypes.func,
  /**
   * A function that **returns an object or array of objects** describing how the state should transform on update.  The function is passed the data and index.
   */
  update: PropTypes.func,
  /**
   * A function that **returns an object or array of objects** describing how the state should transform on leave.  The function is passed the data and index.
   */
  leave: PropTypes.func,
  /**
   * A function that renders the nodes. It should accept an array of nodes as its only argument.  Each node is an object with the key, data, state and a type of 'ENTER', 'UPDATE' or 'LEAVE'.
   */
  children: PropTypes.func.isRequired,
}

NodeGroup.defaultProps = {
  enter: () => {},
  update: () => {},
  leave: () => {},
}

export default NodeGroup
