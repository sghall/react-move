[Checkout the project on Github](https://github.com/react-tools/react-move)

## NodeGroup  

The NodeGroup component allows you to create complex animated transitions in React.  You pass it an array of objects and a key accessor function and it will run your enter, update and leave transitions as the data updates.
The idea is similar to transition components like [react-transition-group](https://github.com/reactjs/react-transition-group) or [react-motion's TransitionMotion](https://github.com/chenglou/react-motion) but you use objects to express how you want your state to transition.
Not only can you can have independent duration, delay and easing for entering, updating and leaving but each individual key in your state can define its own timing.