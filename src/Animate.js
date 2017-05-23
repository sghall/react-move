import React, { Component } from 'react'
import now from 'performance-now'
import RAF from 'raf'
import { interpolate } from 'd3-interpolate'
import * as Easing from 'd3-ease'
//
import Utils from './Utils'
//
const msPerFrame = 1000 / 60

const defaults = {
  data: {},
  ignore: [],
  duration: 500,
  easing: 'easeCubicOut',
  onRest: () => null,
  flexDuration: false,
  immutable: true,
}

export default class Animate extends Component {
  static defaultProps = defaults
  constructor (props) {
    super()
    const { default: defaultState, data } = props
    this.destination = data
    this.state = {
      current: defaultState || data,
    }
  }

  componentWillMount () {
    this.wasAnimating = false
    this.animationID = null
    this.lastRenderTime = 0
    this.interpolators = {}
    this.progress = 0
  }

  componentDidMount () {
    this.pivot(this.props)
    this.ranFirst = true
  }

  componentWillReceiveProps (props) {
    this.pivot(props)
  }

  componentWillUnmount () {
    if (this.animationID != null) {
      RAF.cancel(this.animationID)
      this.animationID = null
    }
  }

  pivot (props) {
    const { data, easing, ignore, immutable } = props

    // Detect non-change render
    let needsUpdate = immutable
      ? this.props.data !== data
      : !Utils.deepEquals(this.props.data, data)

    if (this.ranFirst && !needsUpdate) {
      return
    }

    // Update the easing function
    this.easer = typeof easing === 'function'
      ? easing
      : Easing[easing] || Easing[defaults.easing]

    // Update the origins and destinations
    this.origin = this.state.current
    this.destination = data

    // Update the interpolators
    for (let key in this.destination) {
      if (!Object.prototype.hasOwnProperty.call(this.destination, key)) {
        continue
      }
      if (ignore.indexOf(key) > -1) {
        this.interpolators[key] = null
        continue
      }
      if (this.origin[key] === this.destination[key]) {
        this.interpolators[key] = null
        continue
      }
      this.interpolators[key] = interpolate(
        this.origin[key],
        this.destination[key]
      )
    }

    // Reset the startTime and the progress
    this.startTime = now()
    this.progress = 0
    if (!this.wasAnimating) {
      this.lastRenderTime = now()
    }

    // Be sure to render the origin frame
    this.renderProgress()

    // Animate if needed
    this.animate()
  }

  animate () {
    if (this.animationID) {
      return
    }

    const { onRest, duration, flexDuration } = this.props

    this.animationID = RAF(() => {
      // If the animation is complete, tie up any loose ends...
      if (this.progress >= 1) {
        if (this.wasAnimating) {
          onRest()
        }

        // no need to cancel animationID here shouldn't have any in flight
        this.animationID = null
        this.wasAnimating = false
        return
      }

      // It's time to animate!
      this.wasAnimating = true

      // Keep track of time
      let currentTime = now()
      const timeSinceLastFrame = currentTime - this.lastRenderTime

      // Are we using flexDuration?
      if (flexDuration) {
        // Add however many milliseconds behind we are to the startTime to offset
        // any dropped frames
        this.startTime += Math.max(
          Math.floor(timeSinceLastFrame - msPerFrame),
          0
        )
      }

      // Update the progress
      this.progress = Math.max(
        Math.min((currentTime - this.startTime) / duration, 1),
        0
      )

      // Render the progress
      this.renderProgress()

      // Update the lastRenderTime
      this.lastRenderTime = currentTime

      // Mark the frame as done
      this.animationID = null

      // Try to animate again
      this.animate()
    })
  }

  renderProgress () {
    const { data, duration } = this.props

    const newCurrent = {}

    // Then use the percentage and easer to interpolate to the destination
    for (let key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        continue
      }

      // If ignored or no change needed, skip right to the value
      if (this.interpolators[key] === null) {
        newCurrent[key] = data[key]
      } else {
        // Otherwise, interpolate with the progress
        newCurrent[key] = duration
          ? this.interpolators[key](this.easer(this.progress))
          : this.interpolators[key](this.progress)
      }
    }

    this.setState({
      current: newCurrent,
    })
  }

  render () {
    const renderedChildren = this.props.children(this.state.current)
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

Animate.defaults = defaults
