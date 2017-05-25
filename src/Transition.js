import React, { Component } from 'react'
import now from 'performance-now'
import RAF from 'raf'
import { interpolate } from 'd3-interpolate'
import * as Easing from 'd3-ease'
//
import Utils from './Utils'

const msPerFrame = 1000 / 60

const defaults = {
  data: [],
  ignore: [],
  duration: 500,
  easing: 'easeCubicOut',
  enter: () => null,
  leave: () => null,
  onRest: () => null,
  stagger: null,
  flexDuration: false,
  immutable: true,
  staggerGroups: true,
}

// Used to make all the interpolators from origin to destination states
const makeInterpolators = (originState, destState, ignore) => {
  // Make sure we interpolate new and old keys
  const allKeys = dedupe(Object.keys(originState), Object.keys(destState))
  const interpolators = {}
  allKeys.forEach(key => {
    if (ignore.indexOf(key) > -1) {
      interpolators[key] = null
      return
    }
    if (originState[key] === destState[key]) {
      interpolators[key] = null
      return
    }
    interpolators[key] = interpolate(originState[key], destState[key])
  })
  return interpolators
}

export default class Transition extends Component {
  static defaultProps = defaults

  constructor () {
    super()
    this.items = []
    this.state = {
      items: [],
    }
  }

  componentWillMount () {
    this.unmounting = false
    this.animationID = null
    this.lastRenderTime = 0
  }

  componentDidMount () {
    this.pivot(this.props)
    this.ranFirst = true
  }

  componentWillReceiveProps (props) {
    this.pivot(props)
  }

  componentWillUnmount () {
    this.unmounting = true
    if (this.animationID != null) {
      RAF.cancel(this.animationID)
      this.animationID = null
    }
  }

  pivot (props) {
    const {
      getKey,
      data,
      easing,
      update,
      immutable,
      stagger,
      staggerGroups,
    } = props

    // Detect if we need to animate
    let noChanges = immutable
      ? this.props.data === data
      : Utils.deepEquals(this.props.data, data)

    // If this is the first time, animate regardless
    if (this.ranFirst && noChanges) {
      return
    }

    // Update the easing function
    this.easer = typeof easing === 'function'
      ? easing
      : Easing[easing] || Easing[defaults.easing]

    // Get the current items from the state (which is the visual
    // representation of our items)
    const currentItems = this.items

    // Get the new items with their keys and data
    let newItems = data.map((d, i) => {
      return {
        key: getKey(d, i),
        data: d,
      }
    })

    // Find items that are entering
    const enteringItems = newItems.filter(
      newItem =>
        !currentItems.find(currentItem => currentItem.key === newItem.key)
    )

    enteringItems.forEach((item, i) => {
      item.willEnter = true
    })

    // Find items that should leave
    const leavingItems = currentItems.filter(
      currentItem => !newItems.find(newItem => newItem.key === currentItem.key)
    )

    leavingItems.forEach((item, i) => {
      item.willLeave = true
    })

    // Find items that are staying
    const stayingItems = currentItems.filter(currentItem =>
      newItems.find(newItem => newItem.key === currentItem.key)
    )

    stayingItems.forEach(item => {
      // If the item was leaving, and is now staying, update it
      if (item.leaving) {
        item.willUpdate = true
      }
      // If the item's update function returns something new, update it
      const newDestState = update(item.data, item.key)
      if (!Utils.deepEquals(item.destState, newDestState)) {
        item.destState = newDestState
        item.willUpdate = true
      }
      item.willLeave = false
      item.willEnter = false
    })

    // Merge all of the items together and
    // give each item it's new origin/destination states
    // with corresponding interpolators
    this.items = mergeItems(currentItems, enteringItems)

    this.items.forEach((item, i) => {
      // Queue an update either immediately or using a staggerOffset
      let staggerOffset = 0
      // For staggering time based animations, we just need the index
      let staggerIndex = i + 1
      // But if we are staggering by group, we will instead need the index of the
      // item relative to its predecessors who share the same entering/leaving group
      if (stagger && staggerGroups) {
        staggerIndex = 0
        for (let ii = 0; ii < i; ii++) {
          const staggerItem = this.items[ii]
          if (
            staggerItem.willEnter === item.willEnter &&
            staggerItem.willLeave === item.willLeave
          ) {
            staggerIndex++
          }
        }
      }

      if (stagger) {
        // If its staggered, we need base the progress off of
        // the staggered time, instead of the currentTime
        staggerOffset = stagger * staggerIndex
      }

      // For every item that needs to be reset, set a new startTime
      if (item.willEnter || item.willLeave || item.willUpdate) {
        item.nextUpdate = staggerOffset ? now() + staggerOffset : true
      }
    })

    // Be sure to render the origin frame
    this.renderProgress()

    // Animate if needed
    this.animate()
  }

  animate () {
    // If we're unmounting, bail out.
    if (this.unmounting) {
      return
    }

    // If we're already animated, bail out.
    if (this.animationID) {
      return
    }

    const { duration, flexDuration, ignore, enter, leave, update } = this.props

    this.animationID = RAF(() => {
      // Double check that we are still mounted, since RAF can perform
      // asyncronously sometimes
      if (this.unmounting) {
        return
      }

      // Keep track of time
      let currentTime = now()

      this.items = this.items.filter(
        item => !(!item.willEnter && item.leaving && item.progress === 1)
      )

      const needsAnimation = this.items.some(
        item => item.nextUpdate || item.progress < 1
      )

      // If the animation is complete, tie up any loose ends...
      if (!needsAnimation) {
        this.animationID = null
        this.wasAnimating = false
        return
      }

      // It's time to animate!
      this.wasAnimating = true

      // If we using flexDuration, add however many milliseconds behind we are to the flexAmount to offset
      // any dropped frames
      const timeSinceLastFrame = currentTime - this.lastRenderTime
      currentTime += flexDuration
        ? Math.max(Math.floor(timeSinceLastFrame - msPerFrame), 0)
        : 0

      this.items.forEach((item, i) => {
        // If the item is ready to be updated, do it now
        if (
          item.nextUpdate === true ||
          (item.nextUpdate && item.nextUpdate <= currentTime)
        ) {
          item.entering = false
          item.leaving = false
          item.updating = false
          // Update leaving, entering, and changed items with their new origins,
          // destinations and interpolators
          if (item.willEnter) {
            item.willEnter = false
            item.entering = true
            item.destState = item.state || update(item.data, item.key)
            item.originState = enter(item.data, item.key) || item.destState
            item.interpolators = makeInterpolators(
              item.originState,
              item.destState,
              ignore
            )
          } else if (item.willLeave) {
            item.willLeave = false
            item.leaving = true
            item.destState = leave(item.data, item.key)
            item.originState = item.state || enter(item.data, item.key)
            item.interpolators = makeInterpolators(
              item.originState,
              item.destState,
              ignore
            )
          } else if (item.willUpdate) {
            item.willUpdate = false
            item.updating = true
            item.originState = item.state || enter(item.data, item.key)
            item.interpolators = makeInterpolators(
              item.originState,
              item.destState,
              ignore
            )
          }

          // For every item that needs to be reset, set a new startTime and durtaion
          item.startTime = now()
          item.nextUpdate = false
          item.duration = duration
        }

        // Set the progress
        let progress = item.startTime
          ? (currentTime - item.startTime) / item.duration
          : 0

        // Make sure progress is between 0 and 1
        progress = Math.max(Math.min(progress, 1), 0)

        item.progress = progress
      })

      // Render with the progress
      this.renderProgress()

      // Update the lastRenderTime
      this.lastRenderTime = currentTime

      // Mark the frame as done
      this.animationID = null

      this.animate()
    })
  }

  renderProgress () {
    // Don't show items that are entering
    const items = this.items.filter(item => item.originState && item.destState)

    items.forEach(item => {
      item.state = {}
      const allKeys = dedupe(
        Object.keys(item.originState || {}),
        Object.keys(item.destState || {})
      )

      allKeys.forEach(key => {
        if (!item.progress) {
          // If at absolute 0, draw the origin state
          item.state[key] = item.originState[key]
        } else if (!item.interpolators[key]) {
          // If ignored, skip right to the value
          item.state[key] = item.destState[key]
        } else {
          // Otherwise, interpolate with the progress
          item.state[key] = item.interpolators[key](this.easer(item.progress))
        }
      })
    })

    this.setState({ items })
  }

  render () {
    const renderedChildren = this.props.children(this.state.items)
    return renderedChildren && React.Children.only(renderedChildren)
  }
}

// Taken from react-motion's mergeDiff (https://github.com/chenglou/react-motion/blob/446a8d0130072c4a59fec1ab788bfc2cc5c5b788/src/mergeDiff.js)
function mergeItems (prev, next) {
  const prevKeyIndex = {}
  for (let i = 0; i < prev.length; i++) {
    prevKeyIndex[prev[i].key] = i
  }
  const nextKeyIndex = {}
  for (let i = 0; i < next.length; i++) {
    nextKeyIndex[next[i].key] = i
  }
  // Merge the arrays
  const allItems = []
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
    const nextOrderA = nextKeyIndex[a.key]
    const nextOrderB = nextKeyIndex[b.key]
    const prevOrderA = prevKeyIndex[a.key]
    const prevOrderB = prevKeyIndex[b.key]
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
        const pivot = next[i].key
        if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
          continue
        }
        if (
          nextOrderA < nextKeyIndex[pivot] &&
          prevOrderB > prevKeyIndex[pivot]
        ) {
          return -1
        } else if (
          nextOrderA > nextKeyIndex[pivot] &&
          prevOrderB < prevKeyIndex[pivot]
        ) {
          return 1
        }
      }
      // pluggable. default to: next bigger than prev
      return 1
    }
    // prevOrderA, nextOrderB
    for (let i = 0; i < next.length; i++) {
      const pivot = next[i].key
      if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
        continue
      }
      if (
        nextOrderB < nextKeyIndex[pivot] &&
        prevOrderA > prevKeyIndex[pivot]
      ) {
        return 1
      } else if (
        nextOrderB > nextKeyIndex[pivot] &&
        prevOrderA < prevKeyIndex[pivot]
      ) {
        return -1
      }
    }
    // pluggable. default to: next bigger than prev
    return -1
  })
}

Transition.defaults = defaults

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
