import React from 'react'
//
import ReactStory, { defaultProps } from 'react-story'

import './stories/utils/prism.css'

import Readme from './stories/Readme.js'

import Animate from './stories/Animate.js'
import Appear from './stories/Appear.js'
import Transition from './stories/Transition.js'
import TransitionNested from './stories/TransitionNested.js'
import TransitionStaggered from './stories/TransitionStaggered.js'
import TransitionStaggeredLinear from './stories/TransitionStaggeredLinear.js'
import TransitionDynamicDuration from './stories/TransitionDynamicDuration.js'
import TransitionDynamicEasing from './stories/TransitionDynamicEasing.js'
import TransitionClasses from './stories/TransitionClasses.js'
import Easing from './stories/Easing.js'
import OnRest from './stories/OnRest.js'
import FlexDuration from './stories/FlexDuration.js'
import CustomEasing from './stories/CustomEasing.js'
import CustomDefaults from './stories/CustomDefaults.js'

export default class App extends React.Component {
  render() {
    return (
      <ReactStory
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
        pathPrefix="story/"
        StoryWrapper={props =>
          <defaultProps.StoryWrapper
            css={{
              padding: 0
            }}
          >
            <a
              href="//github.com/react-tools/react-move"
              style={{
                display: 'block',
                textAlign: 'center',
                borderBottom: 'solid 3px #cccccc'
              }}
            >
              <img
                src="//github.com/react-tools/media/raw/master/logo-react-move.png"
                alt="React Table Logo"
                style={{
                  width: '200px',
                  padding: '5px'
                }}
              />
            </a>
            <div
              {...props}
              style={{
                padding: '10px'
              }}
            />
          </defaultProps.StoryWrapper>}
        stories={[
          { name: 'Readme & Documentation', component: Readme },
          { name: 'Animate', component: Animate },
          { name: 'Appear', component: Appear },
          { name: 'Transition', component: Transition },
          { name: 'Nested Transition', component: TransitionNested },
          { name: 'Staggered Transition', component: TransitionStaggered },
          {
            name: 'Staggered Linear Transition',
            component: TransitionStaggeredLinear
          },
          {
            name: 'Transition - Dynamic Duration',
            component: TransitionDynamicDuration
          },
          {
            name: 'Transition - Dynamic Easing',
            component: TransitionDynamicEasing
          },
          { name: 'Transition with Classes', component: TransitionClasses },
          { name: 'Easing', component: Easing },
          { name: 'onRest Callbacks', component: OnRest },
          { name: 'Flex Duration (Frame Dropping)', component: FlexDuration },
          { name: 'Custom Easing', component: CustomEasing },
          { name: 'Custom Defaults', component: CustomDefaults }
        ]}
      />
    )
  }
}
