##### Features

* Animate HTML, SVG & React-Native
* Fine-grained control of delay, duration and easing
* Animation lifecycle events: start, interrupt, end
* Custom tweening functions
* Awesome documentation and lots of examples
* Supported in React, React-Native & React-VR
* Supports TypeScript

##### React-Move vs React-Motion

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