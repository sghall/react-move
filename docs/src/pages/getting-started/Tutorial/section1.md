##### Slider

Let's start by setting up a slider and just rendering a center rail.
In this example the slider is horizontal so we just need to give it a width.
The library itself contains absolutley no styles so it's critical to make sure you give your slider its width or height (if vertically oriented).
You can do that by passing the slider a rootStyle prop for inline styles or a className prop.

In ES6 enviroments you can import the components like this:
```jsx
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

```

###### Start with Rendering Just a Rail

```jsx
import { Slider } from 'react-compound-slider'

const sliderStyle = {  // Give the slider some width
  position: 'relative',
  width: '100%',
  height: 80,
  border: '1px solid steelblue',
}

const railStyle = { 
  position: 'absolute',
  width: '100%',
  height: 10,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: '#8B9CB6',
}

...
<Slider
	rootStyle={sliderStyle} // inline styles for the outer div. Can also use className prop.
	domain={[0, 100]}
	values={[10]}
 >
	<div style={railStyle} /> // Add a rail as a child.  Later we'll make it interactive.
</Slider>
...
```

The result of the code above looks like this:
