
Better, but still not too impressive.  Let's add a dark blue track on the left hand side and make it clickable.

##### Tracks

A slider always has handles + 1 possible tracks.
The `Tracks` component sends you an array of source/target values for each possible track.
The first source will always be value equal to the min and the percentage zero.
The last target will always be value equal to the max and the percentage 100.
You can use the `left` and `right` props to eliminate the outer tracks as a convenience, but the tracks are just an array that you can manipulate however you want.

```jsx
import { Slider, Handles, Tracks }  from 'react-compound-slider'

function Track({ source, target, getTrackProps }) { // your own track component
  return (
    <div
      style={{
        position: 'absolute',
        height: 10,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: '#546C91',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()} // this will set up events if you want it to be clickeable (optional)
    />
  )
}

...
  <Slider
    rootStyle={sliderStyle}
    domain={[0, 100]}
    step={1}
    mode={2}
    values={[30]}
  >
    <div style={railStyle} />
    <Handles>
      {({ handles, getHandleProps }) => (
        <div className="slider-handles">
          {handles.map(handle => (
            <Handle
              key={handle.id}
              handle={handle}
              getHandleProps={getHandleProps}
            />
          ))}
        </div>
      )}
    </Handles>
    <Tracks right={false}>
      {({ tracks, getTrackProps }) => (
        <div className="slider-tracks">
          {tracks.map(({ id, source, target }) => (
            <Track
              key={id}
              source={source}
              target={target}
              getTrackProps={getTrackProps}
            />
          ))}
        </div>
      )}
    </Tracks>
  </Slider>
...
```

The result of the code above looks like this:
