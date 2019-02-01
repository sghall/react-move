
#### Getting Started

React Move exports just two components:
- NodeGroup - If you have an **array of items** that enter, update and leave
- Animate - If you have a **singe item** that enters, updates and leaves

###### Starting state

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

###### Starting state in NodeGroup

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

###### Starting state in Animate

In `Animate` you are animating a single item and pass a start prop that is an object or a function.  The start prop will be called when that the item enters.  Note it could leave and come back by toggling the show prop.  Immediately after the starting state is set your enter transition (optional) is called allowing you to transform that state.

##### Transitioning state

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

###### Example Transitions in NodeGroup

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

##### Timing

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

##### Events

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

##### Interpolation

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

###### Numeric Interpolation Only - Default - No dependencies
 
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
