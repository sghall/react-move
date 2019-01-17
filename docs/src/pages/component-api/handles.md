##### Handles

The `Handles` component is used as a child of `Slider` to render the slider handles.
Your child function receives an array of handle objects and a function to get handle props.

Handle Object:

- id (string)
- value (number)
- percent (number 0 to 100)

###### Example Usage:
```jsx
import Slider, { Handles } from 'react-compound-slider'

<Slider
  ...
>
  ...
  <Handles>
    {({ handles, getHandleProps }) => (
      <div className="slider-handles">
        {handles.map(handle => (
          return (
            <div
              {...props}
              {...getHandleProps(handle.id)}
            />
          )
        ))}
      </div>
    )}
  </Handles>
  ...
</Slider>
```