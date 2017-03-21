import React from 'react'
import now from 'performance-now'
import RAF from 'raf'
import { interpolate } from 'd3-interpolate'
import * as Easing from 'd3-ease'
//
import { addIntertia } from './Animate'
//
const msPerFrame = 1000 / 60

const defaultEasing = 'easeCubicOut'

const TransitionMotion = React.createClass({
  getDefaultProps () {
    return {
      data: [],
      tension: 170,
      damping: 26,
      precision: 0.01,
      ignore: [],
      easing: defaultEasing,
      enter: () => null,
      leave: () => null,
      onRest: () => null,
      stagger: null
    }
  },

  getInitialState () {
    return {
      items: []
    }
  },

  componentWillMount () {
    this.unmounting = false
    this.animationID = null
    this.prevTime = 0
  },

  componentDidMount () {
    this.pivot(this.props)
    this.ranFirst = true
  },

  componentWillReceiveProps (props) {
    this.pivot(props)
  },

  componentWillUnmount () {
    this.unmounting = true
    if (this.animationID != null) {
      RAF.cancel(this.animationID)
      this.animationID = null
    }
  },

  pivot (props, first) {
    const {
      getKey,
      data,
      update,
      enter,
      leave,
      easing,
      ignore,
      duration
    } = props

    // Detect if we need to animate
    let noChanges = this.props.data === data

    // If this is the first time, animate regardless
    if (this.ranFirst && noChanges) {
      return
    }

    // Update the easing function
    this.easer = Easing[easing] || Easing[defaultEasing]

    // Get the original items from the current state
    const currentItems = this.state.items.map(d => ({
      ...d,
      entering: false, // Be sure to reset their status
      leaving: false
    }))

    // Get the new items with their keys and data
    const newItems = data.map((d, i) => {
      return {
        key: getKey(d, i),
        data: d,
        progress: 0,
        percentage: 0,
        progressVelocity: 0
      }
    })

    // Find items that are entering
    newItems.filter(
      destItem => !currentItems.find(
        originItem => originItem.key === destItem.key
      )
    ).forEach((item, i) => {
      item.entering = true
    })

    // Find items that are leaving
    currentItems.filter(
      originItem => !newItems.find(
        destItem => destItem.key === originItem.key
      )
    ).forEach((item, i) => {
      item.leaving = true
    })

    // Merge all of the items together
    this.allItems = mergeItems(currentItems, newItems)

    // Used to make all the interpolators from origin to destination states
    const makeInterpolators = (originState, destState) => {
      // Make sure we interpolate new and old keys
      const allKeys = dedupe(Object.keys(originState), Object.keys(destState))
      const interpolators = {}
      allKeys.forEach(key => {
        if (ignore.indexOf(key) > -1) {
          interpolators[key] = null
          return
        }
        interpolators[key] = interpolate(originState[key], destState[key])
      })
      return interpolators
    }

    // Give each items it's proper origin/destination states
    // and corresponding interpolators

    this.allItems = this.allItems.map((item, i) => {
      // If using duration, reset the progress on the item
      const progress = duration ? 0 : item.progress
      // If using physics, save current progress and increment destination progress
      const progressOrigin = item.progress
      const progressDestination = item.progress + 1

      const percentage = 0

      let originState
      let destState
      let interpolators

      if (item.leaving) {
        destState = leave(item.data, item.key)
        originState = item.state
        interpolators = makeInterpolators(originState, destState)
      } else if (item.entering) {
        destState = item.state || update(item.data, item.key)
        originState = enter(item.data, item.key) || destState
        interpolators = makeInterpolators(originState, destState)
      } else {
        let previous = currentItems.find(d => d.key === item.key)
        destState = update(item.data, item.key)
        originState = previous.state
        interpolators = makeInterpolators(originState, destState)
      }

      return {
        ...item,
        progress,
        progressOrigin,
        progressDestination,
        percentage,
        originState,
        destState,
        interpolators
      }
    })

    // Reset the startTime if using duration
    this.startTime = now()
    this.prevTime = now()

    // Animate if needed
    this.animate()
  },

  animate () {
    // If we're unmounting, bail out.
    if (this.unmounting) {
      return
    }

    // If we're already animated, bail out.
    if (this.animationID) {
      return
    }

    const {
      onRest,
      duration,
      tension,
      damping,
      precision,
      stagger,
      staggerGroups
    } = this.props

    if (!this.wasAnimating) {
      this.renderProgress()
    }

    this.animationID = RAF((timestamp) => {
      // Double check that we are still mounted, since RAF can perform
      // asyncronously sometimes
      if (this.unmounting) {
        return
      }

      let needsAnimation = true
      if (duration) {
        // this is for time based animations
        needsAnimation = this.state.items.reduce((d, item) => {
          return d || item.progress !== 1
        }, false)
      } else {
        // this is for physics based animations
        needsAnimation = this.state.items.reduce((d, item) => {
          return d || (item.progress !== item.progressDestination || item.progressVelocity !== 0)
        }, false)
      }

      // If the animation is complete, tie up any loose ends...
      if (!needsAnimation) {
        if (this.wasAnimating) {
          onRest()
        }

        this.animationID = null
        this.wasAnimating = false

        return
      }

      // It's time to animate!
      this.wasAnimating = true

      // Keep track of time
      let currentTime = timestamp || now()
      const timeSinceLastFrame = currentTime - this.prevTime
      this.prevTime = currentTime

      // more than 10 frames? they probably switched browser tabs
      // just carry on from this point in time
      if (timeSinceLastFrame > msPerFrame * 10) {
        this.startTime = now()
        this.animationID = null
        this.animate()
        return
      }

      // How many milliseconds behind are we?
      const timeToCatchUp = Math.max(Math.floor(timeSinceLastFrame - msPerFrame), 0)

      this.allItems = this.allItems.map((item, i) => {
        let progress = item.progress
        let progressVelocity = item.progressVelocity
        let progressDestination = item.progressDestination
        let percentage = item.percentage

        // If we need to stagger for physics based animations,
        // find the last item with the same enter/update/exit state
        if (!duration && stagger && i > 0) {
          for (let ii = i - 1; ii >= 0; ii--) {
            let staggerParent = this.allItems[ii]
            if (duration) {
              if (
                staggerParent.entering === item.entering &&
                staggerParent.exiting === item.exiting
              ) {
                staggerParent = this.allItems[ii]
              } else {
                staggerParent = null
              }
            }
            if (staggerParent) {
              // Only allow the destination to be set when the staggerParent reaches this stagger threshold
              progressDestination = staggerParent.percentage >= Math.min(stagger, 0.99)
              ? item.progressDestination
              : false
              break
            }
          }
        }

        // For staggering time based animations, we just need the index
        let staggerIndex = i + 1
        // But if we are staggering by group, we will instead need the type index of the item
        if (duration && stagger && staggerGroups) {
          staggerIndex = 0
          for (var ii = 0; ii < i; ii++) {
            let staggerItem = this.allItems[ii]
            if (
              staggerItem.entering === item.entering &&
              staggerItem.exiting === item.exiting
            ) {
              staggerIndex++
            }
          }
        }

        if (duration) {
          // Set the progress percentage
          if (stagger) {
            // If its staggered, we need base the percentage off of
            // the staggered time, instead of the currentTime
            progress = percentage = Math.min(
              (
                Math.max(
                  currentTime - // Adjusted Current time minus
                  (
                    (duration * stagger) * // percentage of duration times
                    staggerIndex // index
                  ),
                  this.startTime // but don't go below the original start time
                ) - this.startTime // minus the start time
              ) / duration, 1
            )
          } else {
            // or just calculate normal time based percentage
            progress = percentage = Math.min((currentTime - this.startTime) / duration, 1)
          }
        } else if (progressDestination !== false) {
          // If we are using physics, start by looping over any
          // frames we used to catch up. There will always be one frame,
          // but if we are behind, it could be more.
          const framesToCatchUp = Math.floor(timeToCatchUp / msPerFrame) + 1
          for (let ii = 0; ii < framesToCatchUp; ii++) {
            [progress, progressVelocity] = addIntertia(
              progress,
              progressVelocity,
              progressDestination,
              tension,
              damping,
              precision
            )
          }

          // To get the percentage, we take the spanProgress and divide it from the spanLength
          const span = item.progressDestination - item.progressOrigin // (7 - 3) == 4
          const spanProgress = progress - item.progressOrigin // (4 - 3) == 1
          percentage = spanProgress / span // 0.25
        }

        return {
          ...item,
          progress,
          progressVelocity,
          percentage
        }
      })

      // Render with the percentage
      this.renderProgress()

      // Mark the frame as done
      this.animationID = null

      this.animate()
    })
  },

  renderProgress () {
    const {
      duration
    } = this.props

    this.allItems = this.allItems
      .filter(item => // Remove the items that have exited
        (
          !item.leaving ||
          item.entering
        ) || (
          duration
            ? (
              item.progress !== 1
            )
            : (
              item.progress !== item.progressDestination ||
              item.progressVelocity !== 0
            )
        )
      )
      .map(item => {
        const state = {}
        const allKeys = dedupe(Object.keys(item.originState), Object.keys(item.destState))

        allKeys.forEach(key => {
          if (!item.percentage) {
            // If at absolute 0, draw the origin state
            state[key] = item.originState[key]
          } else if (!item.interpolators[key]) {
            // If ignored, skip right to the value
            state[key] = item.destState[key]
          } else {
            // Otherwise, interpolate with the progress
            state[key] = duration
              ? item.interpolators[key](this.easer(item.percentage))
              : item.interpolators[key](item.percentage)
          }
        })

        return {
          ...item,
          state
        }
      })

    this.setState({
      items: this.allItems
    })
  },

  render () {
    const renderedChildren = this.props.children(this.state.items)
    return renderedChildren && React.Children.only(renderedChildren)
  }
})

export default TransitionMotion

// Taken from react-motion's mergeDiff (https://github.com/chenglou/react-motion/blob/446a8d0130072c4a59fec1ab788bfc2cc5c5b788/src/mergeDiff.js)
function mergeItems (prev, next) {
  let prevKeyIndex = {}
  for (let i = 0; i < prev.length; i++) {
    prevKeyIndex[prev[i].key] = i
  }
  let nextKeyIndex = {}
  for (let i = 0; i < next.length; i++) {
    nextKeyIndex[next[i].key] = i
  }
  // Merge the arrays
  let allItems = []
  for (let i = 0; i < next.length; i++) {
    allItems[i] = next[i]
  }
  for (let i = 0; i < prev.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(nextKeyIndex, prev[i].key)) {
      allItems.push(prev[i])
    }
  }
  // now all the items all present. Core sorting logic to have the right order
  return allItems.sort(function (a, b) {
    let nextOrderA = nextKeyIndex[a.key]
    let nextOrderB = nextKeyIndex[b.key]
    let prevOrderA = prevKeyIndex[a.key]
    let prevOrderB = prevKeyIndex[b.key]
    if (nextOrderA != null && nextOrderB != null) {
      // both keys in next
      return nextKeyIndex[a.key] - nextKeyIndex[b.key]
    } else if (prevOrderA != null && prevOrderB != null) {
      // both keys in prev
      return prevKeyIndex[a.key] - prevKeyIndex[b.key]
    } else if (nextOrderA != null) {
      // key a in next, key b in prev
      // how to determine the order between a and b? We find a "pivot" (term
      // abuse), a key present in both prev and next, that is sandwiched between
      // a and b. In the context of our above example, if we're comparing a and
      // d, b's (the only) pivot
      for (let i = 0; i < next.length; i++) {
        let pivot = next[i].key
        if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
          continue
        }
        if (
          nextOrderA < nextKeyIndex[pivot] && prevOrderB > prevKeyIndex[pivot]
        ) {
          return -1
        } else if (
          nextOrderA > nextKeyIndex[pivot] && prevOrderB < prevKeyIndex[pivot]
        ) {
          return 1
        }
      }
      // pluggable. default to: next bigger than prev
      return 1
    }
    // prevOrderA, nextOrderB
    for (let i = 0; i < next.length; i++) {
      let pivot = next[i].key
      if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
        continue
      }
      if (
        nextOrderB < nextKeyIndex[pivot] && prevOrderA > prevKeyIndex[pivot]
      ) {
        return 1
      } else if (
        nextOrderB > nextKeyIndex[pivot] && prevOrderA < prevKeyIndex[pivot]
      ) {
        return -1
      }
    }
    // pluggable. default to: next bigger than prev
    return -1
  })
}

function dedupe (...arrs) {
  const allItems = arrs.reduce((a, b) => a.concat(b), [])
  for (let i = 0; i < allItems.length; ++i) {
    for (let j = i + 1; j < allItems.length; ++j) {
      if (allItems[i] === allItems[j]) {
        allItems.splice(j--, 1)
      }
    }
  }
  return allItems
}
