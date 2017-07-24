<div align="center">
  <a href="https://github.com/tannerlinsley/react-move"><img src="https://unpkg.com/react-move@latest/media/banner.png" alt="React Move Logo" style="width:450px;"/></a>
</div>

<a href="https://travis-ci.org/tannerlinsley/react-move">
  <img alt="" src="https://travis-ci.org/tannerlinsley/react-move.svg?branch=master" />
</a>
<a href="https://npmjs.com/package/react-move">
  <img alt="" src="https://img.shields.io/npm/dm/react-move.svg" />
</a>
<a href="https://react-chat-signup.herokuapp.com/">
  <img alt="" src="https://img.shields.io/badge/slack-react--chat-blue.svg" />
</a>
<a href="https://github.com/tannerlinsley/react-move">
  <img alt="" src="https://img.shields.io/github/stars/tannerlinsley/react-move.svg?style=social&label=Star" />
</a>
<a href="https://twitter.com/tannerlinsley">
  <img alt="" src="https://img.shields.io/twitter/follow/tannerlinsley.svg?style=social&label=Follow" />
</a>
<a href="https://cash.me/$tannerlinsley">
  <img alt="" src="https://img.shields.io/badge/%24-Donate-brightgreen.svg" />
</a>
<a href="https://cdnjs.com/libraries/react-move">
  <img alt="" src="https://img.shields.io/cdnjs/v/react-move.svg" />
</a>
<a href="https://www.npmjs.com/package/react-move">
  <img alt="" src="https://img.shields.io/npm/v/react-move.svg" />
</a>

#### Beautifully and deterministically animate anything in React.

## Features

- **12kb!** (minified)
- Supported in React, React-Native & React-VR
- Animate anything you want
- List Transitions eg. "enter", "update", and "leaving"
- Staggering and Stagger Groups
- Custom Easing
- Supports auto interpolation of
  - Numbers
  - Colors
  - SVG paths
  - Any string with embedded numbers
  - Arrays of any of these
  - Objects of any of these
  - Arrays of objects of any of these... you get the point
  - Anything [d3-interpolate](https://github.com/d3/d3-interpolate) can handle

## Demos
- [Codepen](http://codepen.io/tannerlinsley/pen/dWYEwd?editors=0010)
- [Storybook](https://react-move.js.org)
- [`<Animated />` Scrimba Tutorial](https://scrimba.com/casts/cast-1924)

## Installation
```bash
$ yarn add react-move
# or
$ npm install react-move --only=dev
```
##### CDN
```html
<script src='https://npmcdn.com/react-move@latest/react-move.js'></script>
```



## Animate
A component for animating any single object.
##### Props
- `data={ Object }` | *Required*
  - An object of keys that that you wish to animate. When these values are changed, each and every value in this object will be interpolated (unless its key is found in the `ignore` prop)
- `default={ Object }`
  - An object of keys to be used as the initial state of the animation.
- `duration={ Number }` | `500`
  - The duration in milliseconds for each item to animate
- `easing={ string | function }` | `easeCubicOut`
  - A string that references a [d3-ease](https://github.com/d3/d3-ease) function, or a custom easing function that receives a progress decimal and returns a new progress decimal.
- `onRest={ Function }` | `() => null`
  - A function that is called every time the animation sequence is completed.
- `ignore={ []String }` | `false`
  - Any keys found in this array will not be interpolated, and instead will be immediately set to the new value
- `flexDuration={ Boolean }` | `false`
  - Avoid dropping frames at all cost by dynamically increasing the duration of the animation loop becomes overwhelmed.
- `immutable={ Boolean }` | `true`
  - By default, strict equality `===` between the old `data` and new `data` is used to detect when an animation should occur. If you wish, you can disable `immutable` mode which falls back to using `JSON.stringify` to determine if an animation should occur.

##### Example
```javascript
import React from 'react'
import { Animate } from 'react-move'

<Animate
  // Set some default data
  default={{
    scale: 0,
    color: 'blue'
  }}
  // Update your data to whatever you want
  data={{
    scale: Math.random() * 1,
    color: _.sample(['red', 'blue', 'yellow']),
  }}
  duration={800}
  easing='easeQuadIn' // anything from https://github.com/d3/d3-ease
>
  {data => (
    <div
      style={{
        transform: `scale(${data.scale})`,
        background: data.color
      }}
    >
      {data.scale * 100}
    </div>
  )}
</Animate>
```



## Transition
A component that enables animating multiple elements, including enter and exit animations.
##### Props
- `data={ []Objects }` | `[]` | *Required*
  - An array of objects you wish to track. These are not necessarily the exact values you wish to animate, but will used to produce the animated values.
- `getKey={ function }` | `(item, i) => i`
  - A function that returns a unique identifier for each item. This is used to track `enter`, `update` and `leave` states/groups.
- `update={ function }` | *Required*
  - A function that returns the state for an item if it is neither `entering` or `leaving` the list of items.
- `enter={ function }` | `() => null`
  - A function that returns the state for an item if it is `entering` the list of items. If nothing is returned, the `update` state is used.
- `leave={ function }` | `() => null`
  - A function that returns the state for an item if it is `leaving` the list of items. If nothing is returned, the `update` state is used.
- `duration={ Number }` | `500`
  - The duration in milliseconds for each item to animate
- `easing={ String | Function }` | `easeCubicOut`
  - A string that references a [d3-ease](https://github.com/d3/d3-ease) function
  - A custom easing function that receives a progress decimal and returns a new progress decimal.
- `getDuration={ Function }` | `(item, key) => null`
  - A function that receives each `item` and its `key` and returns the duration in milliseconds for the item to animate
  - Overrides the `duration` prop.
- `getEasing={ Function }` | `(item, key) => null`
  - A function that receives each `item` and its `key` and returns either:
    - Astring that references a [d3-ease](https://github.com/d3/d3-ease) function
    - A custom easing function that receives a progress decimal and returns a new progress decimal.
  - Overrides the `easing` prop.
- `stagger={ Number }` | `0`
  - Number of milliseconds for each item to wait relative to it's preceding item.
- `staggerGroups={ Boolean }` | `true`
  - If staggering, will delay item animations relative to status groups instead of the entire list. The relative groups used in this mode are `entering`, `updating` and `leaving`.
- `onRest={ Function }` | `(item, key) => null`
  - A function that is called every time an item completes its animation sequence. It is passed the item and its corresponding key.
- `ignore={ []String }` | `false`
  - Any keys found in this array will not be interpolated, and instead will be immediately set to the new value
- `flexDuration={ Boolean }` | `false`
  - Avoid dropping frames at all cost by dynamically increasing the duration of the animation loop becomes overwhelmed.

##### Example
```javascript
import React from 'react'
import { Transition } from 'react-move'

const items = _.filter(items, (d, i) => i > Math.random() * 10)

<Transition
  // pass an array of items to "data"
  data={items}
  // use "getKey" to return a unique ID for each item
  getKey={(item, index) => index}
  // the "update" function returns the items normal state to animate
  update={item => ({
    translate: 1,
    opacity: 1,
    color: 'grey'
  })}
  // the "enter" function returns the items origin state when entering
  enter={item => ({
    translate: 0,
    opacity: 0,
    color: 'blue'
  })}
  // the "leave" function returns the items destination state when leaving
  leave={item => ({
    translate: 2,
    opacity: 0,
    color: 'red'
  })}
  //
  duration={800}
  easing='easeQuadIn' // anything from https://github.com/d3/d3-ease
  stagger={200} // you can also stagger by a percentage of the animation
  staggerGroup // use this prop to stagger by enter/exit/update group index instead of by overall index
>
  {data => ( // the child function is passed an array of itemStates
    <div>
      {data.map(item => {
        // data[0] === { key: 0, data: 0, state: {...} }
        return (
          <div
            key={item.key}
            style={{
              transform: `translateX(${100 * item.state.translate}px)`,
              opacity: item.state.opacity,
              color: item.state.color
            }}
          >
            {item.data} - {Math.round(item.percentage * 100)}
          </div>
        )
      })}
    </div>
  )}
</Transition>
```



## Appear
A component that enables simple entering and exiting of a single element.
##### Props
- `show={ Boolean }` | `true` | *Required*
  - An array of objects you wish to track. These are not necessarily the exact values you wish to animate, but will used to produce the animated values.
- `update={ object }` | *Required*
  - An object that represents the regular state when `show === true`.
- `enter={ object }`
  - An object that represents the `entering` state when `show === false`.
- `leave={ object }`
  - An object that represents the `leaving` state when `show === false`.
- `duration={ Number }` | `500`
  - The duration in milliseconds for each item to animate
- `easing={ String | Function }` | `easeCubicOut`
  - A string that references a [d3-ease](https://github.com/d3/d3-ease) function
  - A custom easing function that receives a progress decimal and returns a new progress decimal.
- `onRest={ Function }` | `(item, key) => null`
  - A function that is called any time interpolation comes to a halt.
- `ignore={ []String }` | `false`
  - Any keys found in this array will not be interpolated, and instead will be immediately set to the new value
- `flexDuration={ Boolean }` | `false`
  - Avoid dropping frames at all cost by dynamically increasing the duration of the animation loop becomes overwhelmed.

##### Example
```javascript
import React from 'react'
import { Appear } from 'react-move'

<Appear
  show={true}
  enter={{
    scale: 0,
    color: 'green',
    rotate: -90
  }}
  update={{
    scale: 1,
    color: 'blue',
    rotate: 0
  }}
  leave={{
    scale: 0,
    color: 'red',
    rotate: 90
  }}
>
  {data => {
    return (
      <div
        style={{
          width: 100 * data.scale + 'px',
          height: 100 * data.scale + 'px',
          transform: `rotate(${data.rotate}deg)`,
          background: data.color,
          color: 'white'
        }}
      />
    )
  }}
</Appear>
```


## Custom Easing
If you would rather use a different easing function or just build your own, you can! Simply pass a function to the `easing` prop and you're off!
```javascript
<Animate
  easing={(t) => { // This is Chart.js's easeOutBounce function :)
    if ((t /= 1) < (1 / 2.75)) {
      return 1 * (7.5625 * t * t)
    } else if (t < (2 / 2.75)) {
      return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)
    } else if (t < (2.5 / 2.75)) {
      return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)
    }
    return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)
  }}
>
```

## Physics Easing
Using one of our favorite tools called [Springer](https://github.com/tannerlinsley/springer), you can effortlessly build your own realistic spring-based easing functions, and achieve a look and feel similar that of React-Motion.
```javascript
import React from 'react'
import { Animate } from 'react-move'
import Springer from 'springer'

const normalSpring = Springer()
const hardSpring = Springer(0.9, 0.3)
const wobblySpring = Springer(0.5, 0.9)

<Animate
  easing={wobblySpring}
/>
```

*Notes: Springer does not deliver eventual and interruptible animation. For animations requiring those characteristics, we suggest using [React-Motion](https://github.com/chenglou/react-motion).*

## Custom Defaults
Want to change the defaults for either `Animate` or `Transition`?
```javascript
import { Animate, Transition } from 'react-move'


// Before using either component, change any property in the Component's 'defaults' object
Object.assign(Animate.defaults, {
  duration: 3000,
  easing: 'easeElasticOut'
})

Object.assign(Transition.defaults, {
  stagger: 100
})


// Or create your own wrapped versions!
class MyAnimate extends React.Component {
  render () {
    return (  
      <Animate
        duration={3000}
        easing='easeElasticOut'
        {...this.props}
      />
    )
  }
}

class MyTransition extends React.Component {
  render () {
    return (  
      <Transition
        stagger={100}
        {...this.props}
      />
    )
  }
}
```

## Contributing
To suggest a feature, create an issue if it does not already exist.
If you would like to help develop a suggested feature follow these steps:

- Fork this repo
- Install dependencies with `$ yarn`
- Auto-build files as you edit with `$ yarn run watch`
- Implement your changes to files in the `src/` directory
- Run the <a href="https://github.com/tannerlinsley/react-story">React Story</a> locally with `$ yarn run docs`
- View changes as you edit `docs/src`,
- Submit PR for review

#### Scripts

- `$ yarn run watch` Watches files and builds via babel
- `$ yarn run docs` Runs the storybook server
- `$ yarn run test` Runs the test suite

## Used By

<a href='https://nozzle.io' target="\_parent">
  <img src='https://nozzle.io/img/logo-blue.png' alt='Nozzle Logo' style='width:300px;'/>
</a>
