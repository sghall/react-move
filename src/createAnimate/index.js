import React, { Component } from 'react'
import PropTypes from 'prop-types'
import configNodeGroup from '../configNodeGroup'

const keyAccessor = () => '$$key$$'

export default function configAnimate(getInterpolater) {
  const NodeGroup = configNodeGroup(getInterpolater)

  return class Animate extends Component {
    static propTypes = {
      /**
       * Boolean value that determines if the child should be rendered or not.
       */
      show: PropTypes.bool.isRequired,
      /**
       * An object or function that returns an obejct to be used as the starting state.
       */
      start: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      /**
       * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on enter.
       */
      enter: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.array,
        PropTypes.object,
      ]),
      /**
       * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on update. ***Note:*** although not required, in most cases it make sense to specify an update prop to handle interrupted enter and leave transitions.
       */
      update: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.array,
        PropTypes.object,
      ]),
      /**
       * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on leave.
       */
      leave: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.array,
        PropTypes.object,
      ]),
      /**
       * A function that renders the node.  The function is passed the data and state.
       */
      children: PropTypes.func.isRequired,
    }

    static defaultProps = {
      show: true,
    }

    render() {
      const { show, start, enter, update, leave, children } = this.props
      const data = typeof start === 'function' ? start() : start

      return (
        <NodeGroup
          data={show ? [data] : []}
          start={() => data}
          keyAccessor={keyAccessor}
          enter={typeof enter === 'function' ? enter : () => enter}
          update={typeof update === 'function' ? update : () => update}
          leave={typeof leave === 'function' ? leave : () => leave}
        >
          {nodes => {
            if (!nodes[0]) {
              return null
            }
    
            const renderedChildren = children(nodes[0].state)
            return renderedChildren && React.Children.only(renderedChildren)
          }}
        </NodeGroup>
      )
    }
  }
}
