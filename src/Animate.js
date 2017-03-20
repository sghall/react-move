import React from 'react'
import now from 'performance-now'
import RAF from 'raf'
import { interpolate } from 'd3-interpolate'
import * as Easing from 'd3-ease'
//
const msPerFrame = 1000 / 60

const defaultEasing = 'easeCubicOut'

export default React.createClass({
  getDefaultProps () {
    return {
      data: {},
      tension: 170,
      damping: 26,
      precision: 0.01,
      ignore: [],
      easing: defaultEasing,
      onRest: () => null
    }
  },
  getInitialState () {
    const {
      default: defaultState,
      data
    } = this.props
    // Remove any springs from the default data
    this.origin = defaultState || data
    this.destination = data
    // Start velocity map off with zeros
    return {
      current: this.origin
    }
  },

  componentWillMount () {
    this.wasAnimating = false
    this.animationID = null
    this.prevTime = 0
    this.accumulatedTime = 0
    this.interpolators = {}
    this.progress = 0
    this.progressOrigin = 0
    this.progressVelocity = 0
    this.progressDestination = 0
  },

  componentDidMount () {
    this.pivot(this.props)
    this.ranFirst = true
  },

  componentWillReceiveProps (props) {
    this.pivot(props)
  },

  componentWillUnmount () {
    if (this.animationID != null) {
      RAF.cancel(this.animationID)
      this.animationID = null
    }
  },

  pivot (props) {
    const {
      data,
      easing,
      ignore,
      duration
    } = props

    // Detect non-change render
    let needsUpdate = false
    for (let key in data) {
      if (!Object.prototype.hasOwnProperty.call(this.destination, key)) {
        continue
      }
      if (this.props.data[key] !== data[key]) {
        needsUpdate = true
      }
    }

    if (this.ranFirst && !needsUpdate) {
      return
    }

    // Update the easing function
    this.easer = Easing[easing] || Easing[defaultEasing]

    // Update the origins and destinations
    this.origin = {...this.state.current}
    this.destination = {...data}
    this.progressOrigin = this.progress
    this.progressDestination = this.progressOrigin + 1

    // Update the interpolators
    for (let key in this.destination) {
      if (!Object.prototype.hasOwnProperty.call(this.destination, key)) {
        continue
      }
      if (ignore.indexOf(key) > -1) {
        this.interpolators[key] = null
        continue
      }
      this.interpolators[key] = interpolate(this.origin[key], this.destination[key])
    }

    // Reset the startTime and (if using duration) the progress
    if (duration) {
      this.startTime = now()
      this.progress = 0
    }

    // Be sure to render the origin frame
    this.updateProgress(0)

    // Animate if needed
    this.animate()
  },

  animate () {
    if (this.animationID) {
      return
    }

    const {
      onRest,
      duration,
      tension,
      damping,
      precision
    } = this.props

    this.animationID = RAF((timestamp) => {
      // If the animation is complete, tie up any loose ends...
      if (
        duration && this.progress === 1 || // this is for duration based animation
        ( // this is for inertia based animations
          !duration &&
          this.progressVelocity === 0 &&
          this.progress === this.progressDestination
        )
      ) {
        if (this.wasAnimating) {
          onRest()
        }

        // no need to cancel animationID here shouldn't have any in flight
        this.animationID = null
        this.wasAnimating = false
        this.accumulatedTime = 0
        return
      }

      // It's time to animate!
      this.wasAnimating = true

      // Keep track of time
      let currentTime = timestamp || now()
      const timeSinceLastFrame = currentTime - this.prevTime
      this.prevTime = currentTime
      this.accumulatedTime = this.accumulatedTime + timeSinceLastFrame

      // more than 10 frames? they probably switched browser tabs
      // just carry on from this point in time
      if (this.accumulatedTime > msPerFrame * 10) {
        // TODO: need to adjust startTime here for intertia based animation
        this.startTime = now()
        this.accumulatedTime = 0
        this.animationID = null
        this.animate()
        return
      }

      // How many milliseconds behind are we?
      const timeToCatchUp = Math.max(Math.floor(this.accumulatedTime - msPerFrame), 0)
      // Add that to the previous time and currentTime
      currentTime += timeToCatchUp
      // Make sure the previous time is caught up too
      this.prevTime = this.prevTime + timeToCatchUp

      let percentage

      if (duration) {
        // If we are using a duration, set the progress with time
        this.progress = percentage = Math.min((currentTime - this.startTime) / duration, 1)
      } else {
        // If we are using inertia, start by looping over any
        // frames we used to catch up. There will always be one frame,
        // but if we are behind, it could be more.
        const framesToCatchUp = Math.floor(timeToCatchUp / msPerFrame) + 1
        let newProgress = this.progress
        let newProgressVelocity = this.progressVelocity
        for (var i = 0; i < framesToCatchUp; i++) {
          [newProgress, newProgressVelocity] = addIntertia(
            newProgress,
            newProgressVelocity,
            this.progressDestination,
            tension,
            damping,
            precision
          )
        }
        this.progress = newProgress
        this.progressVelocity = newProgressVelocity

        const span = this.progressDestination - this.progressOrigin // (7 - 3) == 4
        const progress = this.progress - this.progressOrigin // (4 - 3) == 1
        percentage = progress / span // 0.25
      }

      this.updateProgress(percentage)

      // Mark the frame as done
      this.animationID = null
      // Reset the accumulatedTime
      this.accumulatedTime = 0

      this.animate()
    })
  },

  updateProgress (percentage) {
    const {
      data,
      duration
    } = this.props

    const newCurrent = {}

    // Then use the percentage and easer to interpolate to the destination
    for (let key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        continue
      }

      // If ignored, skip right to the value
      if (!this.interpolators[key]) {
        newCurrent[key] = data[key]
      } else {
        // Otherwise, interpolate with the progress
        newCurrent[key] = duration
          ? this.interpolators[key](this.easer(percentage))
          : this.interpolators[key](percentage)
      }
    }

    this.setState({
      current: newCurrent
    })
  },

  render () {
    const renderedChildren = this.props.children(this.state.current)
    return renderedChildren && React.Children.only(renderedChildren)
  }
})

// Borrowed from https://github.com/chenglou/react-motion/blob/master/src/stepper.js
let reusedTuple = [0, 0]
const framePct = msPerFrame / 1000
export function addIntertia (
  progress,
  velocity,
  destination,
  tension,
  damping,
  precision
) {
   // Spring force in kg / s^2
  const Fspring = -tension * (progress - destination) // 0.5

  // Damping, in kg / s
  const Fdamper = -damping * velocity // 0

  const resolved = Fspring + Fdamper // 9

  const newVelocity = velocity + resolved * framePct
  const newProgress = progress + newVelocity * framePct

  if (Math.abs(newVelocity) < precision && Math.abs(newProgress - destination) < precision) {
    reusedTuple[0] = destination
    reusedTuple[1] = 0
    return reusedTuple
  }

  reusedTuple[0] = newProgress
  reusedTuple[1] = newVelocity
  return reusedTuple
}
