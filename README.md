<div align="center">
  <a href="https://github.com/tannerlinsley/react-move" target="\_parent"><img src="https://unpkg.com/react-move@latest/media/Banner.png" alt="React Move Logo" style="width:450px;"/></a>
  <br />
  <br />
</div>

<a href="https://travis-ci.org/tannerlinsley/react-move" target="\_parent">
  <img alt="" src="https://travis-ci.org/tannerlinsley/react-move.svg?branch=master" />
</a>
<a href="https://npmjs.com/package/react-move" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/react-move.svg" />
</a>
<a href="https://react-chat-signup.herokuapp.com/" target="\_parent">
  <img alt="" src="https://img.shields.io/badge/slack-react--chat-blue.svg" />
</a>
<a href="https://github.com/tannerlinsley/react-move" target="\_parent">
  <img alt="" src="https://img.shields.io/github/stars/tannerlinsley/react-move.svg?style=social&label=Star" />
</a>
<a href="https://twitter.com/tannerlinsley" target="\_parent">
  <img alt="" src="https://img.shields.io/twitter/follow/tannerlinsley.svg?style=social&label=Follow" />
</a>readme

Beautifully and deterministically animate anything in react.

## Features

- **12kb!** (minified)
- Supports React-Native
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
- [Storybook](https://react-move.js.org/?selectedKind=2.%20Demos&selectedStory=Kitchen%20Sink&full=0&down=0&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel)

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
A component used for animating any property of any object.

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

##### Transition Staggering
With the `Transition` component you can stagger the timing of the items. Simply set the `stagger` prop to a number of milliseconds for each item to wait relative to it's preceding item.

##### Stagger by Group
With the `Transition` component in stagger mode, you can turn on `staggerGroups`, which will delay item animation relative to status groups instead of the entire list. The relative groups used in this mode are `entering`, `updating` and `leaving`.

## Duration
The default duration is set to `500` milliseconds. To customize the animation duration, pass the `duration` prop any positive number of milliseconds.

## Easing
##### Built-in Easings
To customize the easing for an animation, you can pass the `easing` prop a string that references any [d3-ease](https://github.com/d3/d3-ease) function.
##### Custom Easing Functions
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

## Flex Duration
If the animation loop gets over-saturated, normally frames will be dropped to keep up with the duration. If you would rather not drop frames and instead dynamically increase the duration of the animation to fit each frame, set the `flexDuration` prop to true

## Ignore keys
Anything and everything you pass to `data`, `update`, `enter`, and `leave` will be interpolated. If you have keys that you don't want interpolated, such as a regular string or a boolean, you can pass these keys to the `ignore` prop. For example:
```javascript
<Animate
  data={{
    interpolatedValue: 27
    name: 'Tanner'
  }}
  ignore={['name']}
/>
```

## Contributing
To suggest a feature, create an issue if it does not already exist.
If you would like to help develop a suggested feature follow these steps:

- Fork this repo
- `$ yarn`
- `$ yarn run storybook`
- Implement your changes to files in the `src/` directory
- View changes as you code via our <a href="https://github.com/storybooks/react-storybook" target="\_parent">React Storybook</a> `localhost:8000`
- Make changes to stories in `/stories`, or create a new one if needed
- Submit PR for review

#### Scripts

- `$ yarn run storybook` Runs the storybook server
- `$ yarn run test` Runs the test suite
- `$ yarn run prepublish` Builds for NPM distribution
- `$ yarn run docs` Builds the website/docs from the storybook for github pages

## Used By

<a href='https://nozzle.io' target="\_parent">
  <img src='https://nozzle.io/img/logo-blue.png' alt='Nozzle Logo' style='width:300px;'/>
</a>
