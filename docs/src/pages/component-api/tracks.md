##### Tracks

The `Tracks` component is used as a child of `Slider` to render the slider tracks.
Your child function receives an array of track objects and a function to get track props.

Any slider has handles + 1 possible tracks.  A single value slider has two possible tracks: left and right.
A range slider (two handles) adds another between the two handles and so has three possible tracks.
The tracks data is streamed to this component as the slider updates allowing you to render the tracks however you like.

Track Object:

- id (string)
- source (object)
	- id (string)
	- value (number)
	- percent (number 0 to 100)
- target (object)
	- id (string)
	- value (number)
	- percent (number 0 to 100)

###### Example Usage:
```jsx
import Slider, { Tracks } from 'react-compound-slider'

<Slider
  ...
>
  ...
  <Tracks left={false} right={false}>  // you can toggle the left and right tracks
    {({ tracks, getTrackProps }) => (
      <div className="slider-tracks">
        {tracks.map(({ id, source, target }) => (
          return (
            <div
              {...props}
              {...getTrackProps()}
            />
          )
        ))}
      </div>
    )}
  </Tracks>
  ...
</Slider>
```