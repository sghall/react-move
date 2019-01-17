import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { interval } from 'd3-timer'
import { transition, stop } from '../core/transition'

class Animate extends Component {
  static defaultProps = {
    show: true,
  }

  state =
    typeof this.props.start === 'function'
      ? this.props.start()
      : this.props.start

  componentWillMount() {
    if (this.props.show === true) {
      this.renderNull = false
    }
  }

  componentDidMount() {
    const { enter, show } = this.props

    if (enter && show === true) {
      transition.call(this, typeof enter === 'function' ? enter() : enter)
    }
  }

  componentWillReceiveProps(next) {
    const { show, start, enter, update, leave } = next

    if (
      this.props.show === false &&
      this.renderNull === true &&
      show === true
    ) {
      this.renderNull = false

      this.setState(
        () => (typeof start === 'function' ? start() : start),
        () => {
          if (enter) {
            transition.call(this, typeof enter === 'function' ? enter() : enter)
          }
        },
      )
    } else if (this.props.show === true && show === false) {
      if (leave) {
        transition.call(this, typeof leave === 'function' ? leave() : leave)
        this.interval = interval(this.checkTransitionStatus)
      } else {
        this.renderNull = true
        this.setState(prevState => prevState) // force render as null
      }
    } else if (show === true && update) {
      if (this.interval) {
        this.interval.stop()
      }

      transition.call(this, typeof update === 'function' ? update() : update)
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      this.interval.stop()
    }

    stop.call(this)
  }

  checkTransitionStatus = () => {
    if (!this.TRANSITION_SCHEDULES) {
      this.interval.stop()

      if (this.props.show === false) {
        this.renderNull = true
        this.setState(prevState => prevState) // force render as null
      }
    }
  }

  // props: Props;

  interval = null
  renderNull = true

  render() {
    if (this.renderNull === true) {
      return null
    }

    const renderedChildren = this.props.children(this.state)
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Animate.propTypes = {
  /**
   * Boolean value that determines if the child should be rendered or not.
   */
  show: PropTypes.bool.isRequired,
  /**
  * An object or function that returns an obejct to be used as the starting state.
  */
  start: PropTypes.func.isRequired,
  /**
   * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on enter.
   */
  enter: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.object
  ]),
  /**
   * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on update. ***Note:*** although not required, in most cases it make sense to specify an update prop to handle interrupted enter and leave transitions.
   */
  update: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.object
  ]),
  /**
   * An object, array of objects, or function that returns an object or array of objects describing how the state should transform on leave.
   */
  leave: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.object
  ]),
  /**
   * A function that renders the node.  The function is passed the data and state.
   */
  children: PropTypes.func.isRequired
}

export default Animate
