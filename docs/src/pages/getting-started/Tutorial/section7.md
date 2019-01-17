
You can specify exactly what the tick values should be as well.
Pass the values and get back the percentages to place them correctly.

```jsx
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

...
  <Slider
    rootStyle={sliderStyle}
    domain={[0, 100]}
    step={1}
    mode={2}
    values={[20, 60, 80]}
  >
    <Rail>
      {({ getRailProps }) => (
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
    <Tracks left={false} right={false}>
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
    <Ticks values={[0, 25, 50, 75, 100]}> // pass in an array of values
      {({ ticks }) => (
        <div className="slider-ticks">
          {ticks.map(tick => ( // get back ids, values and percents (to place them)
            <Tick key={tick.id} tick={tick} count={ticks.length} />
          ))}
        </div>
      )}
    </Ticks>
  </Slider>
...
```

The result of the code above looks like this:
