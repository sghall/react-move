### Usage

A typical usage of Animate looks like this...

```js
<Animate
  show=true

  start={{ // the starting state (required)
    ...
  }}

  enter={{ // how to transform state on enter (optional)
    ...
  }}

  update={{ // how to transform node state on update (optional)
    ...
  }}

  leave={{ // how to transform node state on leave (optional)
    ...
  }}
>
  {(state) => { // the only child of Animate should be a function to render the state (required)
    ...
  }}
</Animate>
```

The component allows you to set a starting state (the "start" prop) and then specify how to transform that state on enter, update and leave.

### Transitions

You specify an object or an array of objects in your enter, update and leave props.
Instead of simply returning the next state these objects describe how to transform the state.
This is far more powerful than just returning a state object.  By approaching it this way, you can describe really complex transformations and handle interrupts easily.

If you're familiar with D3, this approach mimics selection/transition behavior.  In D3 your are really describing how the state should look on enter, update and exit and how to get there: set the value immediately or transition to it.
D3 deals with the fact that transitions might be in-flight or the key is already at that value in the background without you having to worry about that.
The Animate component takes the same approach but it's done in idiomatic React.

Each object can specify its own duration, delay, easing and events independently.
To support that, inside your object there are two special keys you can use:  **timing** and **events**.  Both are optional.
Timing and events are covered in more detail below.
The rest of the keys in each object are assumed to be keys in your state.

If you aren't transitioning anything then it wouldn't make sense to be using Animate.
That said, like in D3, it's also convenient to be able to set a key to value when a node enters or updates without transitioning.
To support this you can return four different types of values to specify how you want to transform the state.

* `string or number`: Set the key to the value immediately with no transition.

* `array [value]`: Transition from the key's current value to the specified value. Value is a string or number.

* `array [value, value]`: Transition from the first value to the second value. Each value is a string or number.

* `function`: Function will be used as a custom tween function.

In all cases above a "string" can be a color, path, transform (the key must be called "transform" see below), etc and it will be interpolated using the correct interpolator.
See the interpolators section below.

## Timing

If there's no timing key in your object you'll get the timing defaults.
You can specify just the things you want to override on your timing key. 

Here's the timing defaults...
```js
const defaultTiming = {
  delay: 0,
  duration: 250,
  ease: easeLinear,
};
```
For the ease key, just provide the function.  You can use any easing function, like those from d3-ease...

[List of ease functions exported from d3-ease](https://github.com/d3/d3-ease/blob/master/index.js)

## Passing an array of objects

You can also pass arrays of objects.  Each object can define its own timing and it will be applied to any transitions in the object.

```js
import { easeExpInOut } from 'd3-ease';

...
<Animate
  show={show}

  start={{
    opacity: 0,
    backgroundColor: color,
  }}

  enter={{
    ...
  }}

  update={{
    ...
  }}

  leave={[ // an array!
    {
      backgroundColor: ['red'],
      timing: { duration: 500, ease: easeExpInOut },
    },
    {
      opacity: [0],
      timing: { delay: 500, duration: 500, ease: easeExpInOut },
    },
  ]}
>
  {({ opacity, backgroundColor }) => {
    ...
  }}
</Animate>
```

## Events

The events are the same as those on D3 transitions. You can fire a function on transition start, interrupt or end.

```js
<Animate
  start={{
    ...
  }}

  enter={[
    {
      opacity: [0.7],
      timing: { duration: 1000 },
    },
    {
      d: interpolator,
      timing: { delay: 1000, duration: 1000, ease: easeExpInOut },
      events: { end: update }, // an event - call update function on transition end
    },
  ]}

  update={{
    d: interpolator,
    timing: { delay: 200, duration: 1000, ease: easeExpInOut },
    events: { end: update }, // an event - call update function on transition end
  }}
>
  {(state) => {
    ...
  }}
</Animate>
```

## Interpolators

Interpolators are inferred from what you specify in your transition object.

With the exceptions of "events" and "timing" you can name the keys that are transitioning whatever you want, but if you use the key "transform" it indicates that you want to use D3's SVG transform interpolator.
Beyond that, the value will determine the interpolator.  This is essentailly how D3 picks interpolators.

The logic is as follows:
1. If the value is a function, it will be used as a custom tween function.
2. Then the key and value are passed to the function below:

```js
import {
  interpolateRgb,
  interpolateNumber,
  interpolateString,
  interpolateTransformSvg,
} from 'd3-interpolate';
import { color } from 'd3-color';

export function getInterpolator(key, value) {
  if (key === 'transform') {
    return interpolateTransformSvg;
  } else if (typeof value === 'number') {
    return interpolateNumber;
  } else if (value instanceof color || color(value) !== null) {
    return interpolateRgb;
  }

  return interpolateString;
}
```

## Namespacing your state

You don't have to keep your state flat either.
You can create "namespaces" that allow you to organize state in a way that makes sense for your component.
See the bottom of the NodeGroup component docs for examples of this.  It works exactly the same with the Animate component.
