
Pretty cool, but you can't click on the rail.

Let's fix that...

##### Rail

```jsx
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'

...
  <Slider
    rootStyle={sliderStyle}
    domain={[0, 100]}
    step={1}
    mode={2}
    values={[30]}
  >
    <Rail>
      {({ getRailProps }) => (  // adding the rail props sets up events on the rail
        <div style={railStyle} {...getRailProps()} /> 
      )}
    </Rail>
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

The result of the code above looks like this.  You can now click on the track (blue) or the rail (grey).
