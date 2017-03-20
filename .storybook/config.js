import React from 'react'
import { configure, storiesOf } from '@kadira/storybook'

import './reset.css'
import './fonts.css'
import './layout.css'
import '../stories/utils/prism.css'
import 'react-resizable/css/styles.css'
import 'github-markdown-css/github-markdown.css'
//
import Readme from '../README.md'
//
import Transition from '../stories/Transition.js'
import TransitionClasses from '../stories/TransitionClasses.js'
import TransitionsNested from '../stories/TransitionsNested.js'
import Animate from '../stories/Animate.js'
import ChatHeads from '../stories/ChatHeads.js'
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
    .add('Transition', Transition)
    .add('Transition with Classes', TransitionClasses)
    .add('Nested Transitions', TransitionsNested)
    .add('Animate', Animate)
    .add('Chat Heads', ChatHeads)
}, module)
