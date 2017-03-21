# react-move

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
</a>

Beautifully animate anything in react with interia or time + easing.

## Features

- **12kb!** (minified)

## [Demo](https://tannerlinsley.github.io/react-animate/?selectedKind=2.%20Demos&selectedStory=Kitchen%20Sink&full=0&down=0&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel)

## Installation
```bash
$ yarn add react-move
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
    color: 'blue',
    rotate: 0
  }}
  // Update your data to whatever you want
  data={{
    scale: Math.random() * 1,
    color: ['red', 'blue', 'yellow'].find((d, i) => i === Math.round(Math.random() * 2)),
    rotate: Math.random() > 0.5 ? 360 : 0
  }}
  // Set the params for inertia animation
  tension={100}
  damping={5}
  // or simply use a duration
  duration={800}
  easing='easeQuadIn' // anything from https://github.com/d3/d3-ease
>
  {data => { // the child function is passed the current state of the data as an object
    return (
      <div
        style={{
          borderRadius: ((data.rotate / 360) * 100) + 'px',
          transform: `translate(${data.scale * 50}%, ${data.scale * 50}%) scale(${data.scale}) rotate(${data.rotate}deg)`,
          background: data.color
        }}
      >
        {Math.round(data.scale * 100) / 100}
      </div>
    )
  }}
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
  getKey={d => d}
  // the "update" function returns the items normal state to animate
  update={d => ({
    translate: 1,
    opacity: 1,
    color: 'grey'
  })}
  // the "enter" function returns the items origin state when entering
  enter={d => ({
    translate: 0,
    opacity: 0,
    color: 'blue'
  })}
  // the "leave" function returns the items destination state when leaving
  leave={d => ({
    translate: 2,
    opacity: 0,
    color: 'red'
  })}
  // Set the params for inertia animation
  tension={100}
  damping={5}
  // or simply use a duration
  duration={800}
  easing='easeQuadIn' // anything from https://github.com/d3/d3-ease
  // you can also stagger by a percentage of the animation
  stagger={0.3}
  staggerGroup // use this prop to stagger by enter/exit/update group index instead of by overall index
>
  {data => { // the child function is passed an array of items to be displayed
    // data[0] === { key: 0, data: 0, state: {...} }
    return (
      <div style={{height: (20 * 10) + 'px'}}>
        {data.map(d => {
          return (
            <div
              key={d.key}
              style={{
                position: 'absolute',
                transform: `translate(${100 * d.state.translate}px, ${20 * d.key}px)`,
                opacity: d.state.opacity,
                color: d.state.color
              }}
            >
              {d.data} - {Math.round(d.percentage * 100)}
            </div>
          )
        })}
      </div>
    )
  }}
</Transition>
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

<!-- ## Used By

<a href='https://nozzle.io' target="\_parent">
  <img src='https://nozzle.io/img/logo-blue.png' alt='Nozzle Logo' style='width:300px;'/>
</a> -->
