import React from 'react'
//
import ReactStory, { defaultProps } from 'react-story'

import './stories/utils/prism.css'

import Readme from './stories/Readme.js'

import Animate from './stories/Animate.js'
import Easing from './stories/Easing.js'
import Transition from './stories/Transition.js'
import TransitionNested from './stories/TransitionNested.js'
import TransitionStaggered from './stories/TransitionStaggered.js'
import TransitionStaggeredLinear from './stories/TransitionStaggeredLinear.js'
import TransitionClasses from './stories/TransitionClasses.js'
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
        StoryWrapper={props => (
          <defaultProps.StoryWrapper
            css={{
              padding: 0
            }}
          >
            <a
              href="//github.com/tannerlinsley/react-move"
              style={{
                display: 'block',
                textAlign: 'center',
                borderBottom: 'solid 3px #cccccc'
              }}
            >
              <img
                src="//npmcdn.com/react-move/media/Banner.png"
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
          </defaultProps.StoryWrapper>
        )}
        stories={[
          { name: 'Readme & Documentation', component: Readme },
          { name: 'Animate', component: Animate },
          { name: 'Easing', component: Easing },
          { name: 'Transition', component: Transition },
          { name: 'Nested Transition', component: TransitionNested },
          { name: 'Staggered Transition', component: TransitionStaggered },
          {
            name: 'Staggered Linear Transition',
            component: TransitionStaggeredLinear
          },
          { name: 'Transition with Classes', component: TransitionClasses },
          { name: 'Flex Duration (Frame Dropping)', component: FlexDuration },
          { name: 'Custom Easing', component: CustomEasing },
          { name: 'Custom Defaults', component: CustomDefaults }
        ]}
      />
    )
  }
}
