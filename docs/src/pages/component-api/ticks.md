##### Ticks

The `Ticks` component is used as a child of `Slider` to render slider ticks.
Your child function receives an array of tick objects.

Tick Object:

- id (string)
- value (number)
- percent (number 0 to 100)

###### Example Usage:
```jsx
import Slider, { Ticks } from 'react-compound-slider'

<Slider
  ...
>
  ...
  <Ticks count={15}> // generates nice tick mark values
    {({ ticks }) => (
      <div className="slider-ticks">
        {ticks.map(tick => (
          ...render your tick here
        ))}
      </div>
    )}
  </Ticks>
  ...
</Slider>
```

### Passing in your own tick values
```jsx
import Slider, { Ticks } from 'react-compound-slider'

<Slider
  ...
>
  ...
  <Ticks values={[10, 20, 30]}> // pass in your own values
    {({ ticks }) => (
      <div className="slider-ticks">
        {ticks.map(tick => (
          ...render your tick here
        ))}
      </div>
    )}
  </Ticks>
  ...
</Slider>
```