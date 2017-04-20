import React from 'react'
import { configure, storiesOf } from '@kadira/storybook'

import './reset.css'
import './fonts.css'
import './layout.css'
import './prism.css'
import 'react-resizable/css/styles.css'
import 'github-markdown-css/github-markdown.css'
//
import Readme from '../README.md'
//
import Animate from '../stories/Animate.js'
import Easing from '../stories/Easing.js'
import Transition from '../stories/Transition.js'
import TransitionNested from '../stories/TransitionNested.js'
import TransitionStaggered from '../stories/TransitionStaggered.js'
import TransitionStaggeredGroups from '../stories/TransitionStaggeredGroups.js'
import TransitionClasses from '../stories/TransitionClasses.js'
import FlexDuration from '../stories/FlexDuration.js'
import CustomEasing from '../stories/CustomEasing.js'
import CustomDefaults from '../stories/CustomDefaults.js'
//
configure(() => {
  storiesOf('1. Docs')
    .add('Readme', () => {
      const ReadmeCmp = React.createClass({
        render () {
          return <span className='markdown-body' dangerouslySetInnerHTML={{__html: Readme}} />
        },
        componentDidMount () {
          global.Prism && global.Prism.highlightAll()
        }
      })
      return <ReadmeCmp />
    })
  storiesOf('2. Demos')
    .add('Animate', Animate)
    .add('Easing', Easing)
    .add('Transition', Transition)
    .add('Nested Transition', TransitionNested)
    .add('Staggered Transition', TransitionStaggered)
    .add('Staggered Group Transition', TransitionStaggeredGroups)
    .add('Transition with Classes', TransitionClasses)
    .add('Flex Duration (Frame Dropping)', FlexDuration)
    .add('Custom Easing', CustomEasing)
    .add('Custom Defaults', CustomDefaults)
}, module)
