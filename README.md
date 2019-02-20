<div style="text-align:center;">
  <a href="https://github.com/react-tools/react-move" target="\_parent"><img src="https://github.com/react-tools/media/raw/master/logo-react-move.png" alt="React Table Logo" style="width:450px;"/></a>
</div>

# React-Move

Beautiful, data-driven animations for React. Just 4kb (gzipped)!
### [Documentation and Examples](https://react-move.js.org)

[![Build Status](https://travis-ci.org/react-tools/react-move.svg?branch=master)](https://travis-ci.org/react-tools/react-move)
[![npm version](https://img.shields.io/npm/v/react-move.svg)](https://www.npmjs.com/package/react-move)
[![npm downloads](https://img.shields.io/npm/dm/react-move.svg)](https://www.npmjs.com/package/react-move)
![gzip size](http://img.badgesize.io/https://npmcdn.com/react-move/dist/react-move.min.js?compression=gzip)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/react-tools/react-move/blob/master/LICENSE)

## Features

* Animate HTML, SVG & React-Native
* Fine-grained control of delay, duration and easing
* Animation lifecycle events: start, interrupt, end
* Custom tweening functions
* Awesome documentation and lots of examples
* Supports TypeScript

## Installation

```bash
// React ^0.14.9 || ^15.3.0 || ^16.0.0
npm install react-move
```

## React Move 5.0 is here.

### 5.0 Highlights
- React Move is now just **4kb (gzipped)! Almost 60% smaller.**
- Application developers and package maintainers can now make much smaller bundles.
- You can now use any interpolator you want which opens new creative doors for designers.
- Tons of performance improvements. 🚀 
- Much easier debugging of animations.

### Upgrading to 5.0

This version of React Move breaks the hard dependency on d3-interpolate. By default React Move will do numeric interpolation and apply easing functions.  **If you only need to do numeric interpolation you don't need to do anything. Just upgrade and done.**

To get the same interpolation found in React Move 2.x and 3.x which includes support for colors, paths and SVG transforms do this:

Install d3-interpolate:
```
npm install d3-interpolate
```

Then in your app:
```js
import { NodeGroup } from 'react-move'
import { interpolate, interpolateTransformSvg } from 'd3-interpolate'

...
<NodeGroup
  data={this.state.data}
  keyAccessor={(d) => d.name}

  start={(data, index) => ({
    ...
  })}

  enter={(data, index) => ([ // An array
    ...
  ])}

  update={(data) => ({
    ...
  })}

  leave={() => ({
    ...
  })}
  
  interpolation ={(begValue, endValue, attr) => { // pass as prop
    if (attr === 'transform') {
      return interpolateTransformSvg(begValue, endValue)
    }

    return interpolate(begValue, endValue)
  }}
>
  ...children
</NodeGroup>
```

The big change in this release is the `interpolation` prop. This function opens up a lot of doors to be more efficient and creative with your animations. You can also debug your animations much more easily by console logging in your `interpolation` function to check if your animations are working as expected. 

## Demos

* [CodeSandbox - Animated Bars](https://codesandbox.io/s/w0ol90x9z5) ([@animateddata](https://github.com/animateddata))
* [Blog Post by Peter Cook](https://frontendcharts.com/react-move-barchart/) 
* [CodeSandbox - Collapsible Tree](https://codesandbox.io/s/ww0xkyqonk) ([@techniq](https://github.com/techniq))
* [CodeSandbox - Draggable List](https://codesandbox.io/s/j2povnz8ly)
* [CodeSandbox - Circle Inferno](https://codesandbox.io/s/n033m6nw00)
* [CodeSandbox - Animated Mount/Unmount](https://codesandbox.io/s/9z04rpypny)
* [Examples](https://react-move.js.org)

# Documentation

The docs below are for version **5.x.x** of React-Move.

Older versions:

* [Version 1.x.x](https://github.com/react-tools/react-move/tree/v1.6.1)

The API for `NodeGroup` and `Animate` have not changed in 5.0, but if you want to refer back:
* [Version 2.x.x](https://github.com/react-tools/react-move/tree/v2.9.1)
* [Version 3.x.x](https://github.com/react-tools/react-move/tree/v3.1.0)
* [Version 4.x.x](https://github.com/react-tools/react-move/tree/v4.0.0)

# Getting Started

React Move exports just two components:
- NodeGroup - If you have an **array of items** that enter, update and leave
- Animate - If you have a **singe item** that enters, updates and leaves

## < NodeGroup />

### Component Props

| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| <span style="color: #31a148">data *</span> | array |  |  An array. The data prop is treated as immutable so the nodes will only update if prev.data !== next.data. |
| <span style="color: #31a148">keyAccessor *</span> | function |  |  Function that returns a string key given the data and its index. Used to track which nodes are entering, updating and leaving. |
| interpolation | function | numeric |  A function that returns an interpolator given the begin value, end value, attr and namespace. Defaults to numeric interpolation. See docs for more. |
| <span style="color: #31a148">start *</span> | function |  |  A function that returns the starting state. The function is passed the data and index and must return an object. |
| enter | function | () => {} |  A function that **returns an object or array of objects** describing how the state should transform on enter.  The function is passed the data and index. |
| update | function | () => {} |  A function that **returns an object or array of objects** describing how the state should transform on update.  The function is passed the data and index. |
| leave | function | () => {} |  A function that **returns an object or array of objects** describing how the state should transform on leave.  The function is passed the data and index. |
| <span style="color: #31a148">children *</span> | function |  |  A function that receives an array of nodes. |

## < Animate />

### Component Props

| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| show | bool | true |  Boolean value that determines if the child should be rendered or not. |
| interpolation | function | numeric |  A function that returns an interpolator given the begin value, end value, atrr and namespace. See docs for more. |
| start | union:<br>&nbsp;func<br>&nbsp;object<br> |  |  An object or function that returns an obejct to be used as the starting state. |
| enter | union:<br>&nbsp;func<br>&nbsp;array<br>&nbsp;object<br> |  |  An object, array of objects, or function that returns an object or array of objects describing how the state should transform on enter. |
| update | union:<br>&nbsp;func<br>&nbsp;array<br>&nbsp;object<br> |  |  An object, array of objects, or function that returns an object or array of objects describing how the state should transform on update. ***Note:*** although not required, in most cases it make sense to specify an update prop to handle interrupted enter and leave transitions. |
| leave | union:<br>&nbsp;func<br>&nbsp;array<br>&nbsp;object<br> |  |  An object, array of objects, or function that returns an object or array of objects describing how the state should transform on leave. |
| <span style="color: #31a148">children *</span> | function |  |  A function that receives the state. |

## Starting state

Before looking at the components it might be good to look at starting state.  You are going to be asked to define starting states for each item in your `NodeGroup` and `Animate` components. This is a key concept and probably the most error prone for developers working with React Move.  The starting state for each item is always **an object with string or number leaves**.  The leaf keys are referred to as "attrs" as in "attribute."  There are also "namespaces" which are a purely organizational concept.

Two rules to live by for starting states:
- Don't use the strings "timing" or "events" as an attr or namespace.
- There should never be an array anywhere in your object.

Example starting state:
```js
// GOOD
{
  attr1: 100,
  attr2: 200,
  attr3: '#dadada'
}

// BAD
{
  attr1: [100], // NO ARRAYS
  attr2: 200,
  attr3: '#dadada'
}
```

A more concrete example might be:
```js
{
  opacity: 0.1,
  x: 200,
  y: 100,
  color: '#dadada'
}
```

You can add "namespaces" to help organize your state:
```js
{
  attr1: 100,
  attr2: 200,
  attr3: '#ddaabb',
  namespace1: {
    attr1: 100,
    attr2: 200
  }
}
```
Or something like:
```js
{
  namespace1: {
    attr1: 100,
    attr2: 200
  },
  namespace2: {
    attr1: 100,
    attr2: 200
  }
}
```
You might use namespaces like so:
```js
{
  inner: {
    x: 100,
    y: 150,
    color: '#545454'
  },
  outer: {
    x: 300,
    y: 350,
    color: '#3e3e3e'
  }
}
```

#### Starting state in NodeGroup

In `NodeGroup` you are working with an array of items and you pass a start prop (a function) that receives the data item and its index.  The start prop will be called when that data item (identified by its key) enters.  Note it could leave and come back and that prop will be called again.  Immediately after the starting state is set your enter transition (optional) is called allowing you to transform that state.

```js
<NodeGroup
  data={data} // an array (required)
  keyAccessor={item => item.name} // function to get the key of each object (required)
  start={(item, index) => ({ // returns the starting state of node (required)
    ...
  })}
>
  {(nodes) => (
    ...
      {nodes.map(({ key, data, state }) => {
        ...
      })}
    ...
  )}
</NodeGroup>
```

#### Starting state in Animate

In `Animate` you are animating a single item and pass a start prop that is an object or a function.  The start prop will be called when that the item enters.  Note it could leave and come back by toggling the show prop.  Immediately after the starting state is set your enter transition (optional) is called allowing you to transform that state.

```js
<Animate
  start={{ // object or function
    ...
  }}
>
  {state => (
    ...
  )}
</Animate>
```

## Transitioning state

You return a config object or an array of config objects in your **enter**, **update** and **leave** props functions for both `NodeGroup` and `Animate`. Instead of simply returning the next state these objects describe how to transform the state. Each config object can specify its own duration, delay, easing and events independently.

There are two special keys you can use: **timing** and **events**. Both are optional.
Timing and events are covered in more detail below.

If you aren't transitioning anything then it wouldn't make sense to be using NodeGroup.
That said, it's convenient to be able to set a key to value when a node enters, updates or leaves without transitioning.
To support this you can return four different types of values to specify how you want to transform the state.

* `string or number`: Set the key to the value immediately with no transition.  Ignores all timing values.

* `array [value]`: Transition from the key's current value to the specified value. Value is a string or number.

* `array [value, value]`: Transition from the first value to the second value. Each value is a string or number.

* `function`: Function will be used as a custom tween function.


Example config object:
```js
{
  attr1: [200],
  attr2: 300,
  attr3: ['#dadada']
  timing: { duration: 300, delay: 100 }
}
```

Using namespaces:
```js
{
  attr1: [100],
  attr3: '#ddaabb',
  namespace1: {
    attr1: [300],
    attr2: 200
  },
  timing: { duration: 300, delay: 100 }
}
```

To have different timing for some keys use an array of config objects:
```js
[
  {
    attr1: [200, 500],
    timing: { duration: 300, delay: 100 }
  },
  {
    attr2: 300, // this item, not wrapped in an array, will be set immediately, so which object it's in doesn't matter
    attr3: ['#dadada']
    timing: { duration: 600 }
  },
]
```

### Example Transitions in NodeGroup

```js
<NodeGroup
  data={this.state.data}
  keyAccessor={(d) => d.name}

  start={(data, index) => ({
    opacity: 1e-6,
    x: 1e-6,
    fill: 'green',
    width: scale.bandwidth(),
  })}

  enter={(data, index) => ({
    opacity: [0.5], // transition opacity on enter
    x: [scale(data.name)], // transition x on on enter
    timing: { duration: 1500 }, // timing for transitions
  })}

  update={(data) => ({
    ...
  })}

  leave={() => ({
    ...
  })}
>
  {(nodes) => (
    ...
  )}
</NodeGroup>
```

Using an array of config objects:
```js
import { easeQuadInOut } from 'd3-ease';

...

<NodeGroup
  data={this.state.data}
  keyAccessor={(d) => d.name}

  start={(data, index) => ({
    opacity: 1e-6,
    x: 1e-6,
    fill: 'green',
    width: scale.bandwidth(),
  })}

  enter={(data, index) => ([ // An array
    {
      opacity: [0.5], // transition opacity on enter
      timing: { duration: 1000 }, // timing for transition
    },
    {
      x: [scale(data.name)], // transition x on on enter
      timing: { delay: 750, duration: 1500, ease: easeQuadInOut }, // timing for transition
    },
  ])}

  update={(data) => ({
    ...
  })}

  leave={() => ({
    ...
  })}
>
  {(nodes) => (
    ...
  )}
</NodeGroup>
```

## Timing

If there's no timing key in your object you'll get the timing defaults.
You can specify just the things you want to override on your timing key.

Here's the timing defaults...

```js
const defaultTiming = {
  delay: 0,
  duration: 250,
  ease: easeLinear
};
```

For the ease key, just provide the function. You can use any easing function, like those from d3-ease...

[List of ease functions exported from d3-ease](https://github.com/d3/d3-ease/blob/master/src/index.js)

## Events

You can add events on your config objects.  You can pass a function that will run when the transition starts, is interrupted (an update to the data occurs) or ends.

Using Events:
```js
{
  attr1: [100],
  attr3: '#ddaabb',
  namespace1: {
    attr1: [300],
    attr2: 200
  },
  timing: { duration: 300, delay: 100 },
  events: {
    start: () => {
      ..do stuff - use an arrow function to keep the context of the outer component
    },
    interrupt: () => {
      ..do stuff - use an arrow function to keep the context of the outer component
    },
    end: () => {
      ..do stuff - use an arrow function to keep the context of the outer component
    },
  }
}
```

### Interpolation

You can wire your components in `react-move` to handle different types of interpolation using the `interpolation` prop in both `NodeGroup` and `Animate`.  The code for interpolating strings or SVG paths can be bulky and, in many cases, it's not needed so by default components only handle numeric interpolation. 

Your `interpolation` prop is a function that should avoid a lot of logic and computation.  It will get called at high frequency when transitions fire in your components.  You get the begin and end values and what the attribute name (string) is.  You will also get the namespace string (less common) if you are using them in your state.  **See the sections on starting states and transitions for more on attrs and namespaces.**

#### Cadillac Interpolation  - Depends on d3-interpolate

To wire up a full service interpolation that will interpolate colors, paths, numbers and SVG transforms you can use a setup like this:

```
npm install react-move d3-interpolate
```

Then in your app:
```js
import { NodeGroup, Animate } from 'react-move'
import { interpolate, interpolateTransformSvg } from 'd3-interpolate'

...
<NodeGroup
  data={this.state.data}
  keyAccessor={(d) => d.name}

  start={(data, index) => ({
    ...
  })}

  enter={(data, index) => ([ // An array
    ...
  ])}

  update={(data) => ({
    ...
  })}

  leave={() => ({
    ...
  })}
  
  interpolation ={(begValue, endValue, attr, namespace) => { // pass as prop
    if (attr === 'transform') {
      return interpolateTransformSvg(begValue, endValue)
    }

    return interpolate(begValue, endValue)
  }}
>
  ...children
</NodeGroup>
```

This setup mimics how `d3.js` works for selecting interpolators and will not force you to think too much about the values your are using.  For example, if you use colors (in any format) they will be recognized and interpolated correctly. The `interpolate` function exported from d3-interpolate does a great job of guessing what you're trying to do and handles it for you but it also includes a lot of code (e.g. d3-color) that may not be needed for your project.

#### Numeric Interpolation Only - Default - No dependencies
 
To do numeric interpolation you don't need to do anything in your components.  The default numeric interpolator looks like this:

```js
// The default interpolator used in NodeGroup and Animate

const numeric = (beg, end) => {
  const a = +beg
  const b = +end - a
  
  return function(t) {
    return a + b * t
  } 
}

```

## React-Move vs React-Motion

* React-move allows you to define your animations using durations, delays and ease functions.
  In react-motion you use spring configurations to define your animations.

* React-move is designed to easily plugin interpolation for strings, numbers, colors, SVG paths and SVG transforms.
  With react-motion you can only interpolate numbers so you have to do a bit more work use colors, paths, etc.

* In react-move you can define different animations for entering, updating and leaving with the ability to specify delay, duration and ease on each individual key.
  React-motion allows you to define a spring configuration for each key in the "style" object.

* React-move has lifecycle events on its transitions.
  You can pass a function to be called on transition start, interrupt or end.
  React-motion has an "onRest" prop that fires a callback when the animation stops (just the `Motion` component not `TransitionMotion` or `StaggeredMotion`).

* React-move also allows you to pass your own custom tween functions. It's all springs in react-motion.

## Contributing

We love contributions from the community! Read the [contributing info here](https://github.com/react-tools/react-move/blob/master/CONTRIBUTING.md).

#### Run the repo locally

* Fork this repo
* `npm install`
* `cd docs`
* `npm install`
* `npm start`

#### Scripts

Run these from the root of the repo

* `npm run lint` Lints all files in src and docs
* `npm run test` Runs the test suite locally
* `npm run test:coverage` Get a coverage report in the console
* `npm run test:coverage:html` Get an HTML coverage report in coverage folder

Go to [live examples, code and docs](https://react-move.js.org)!
