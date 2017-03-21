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
import Animate from '../stories/Animate.js'
import Transition from '../stories/Transition.js'
import TransitionNested from '../stories/TransitionNested.js'
import TransitionStaggered from '../stories/TransitionStaggered.js'
import TransitionClasses from '../stories/TransitionClasses.js'
// import ChatHeads from '../stories/ChatHeads.js'
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
    .add('Transition', Transition)
    .add('Nested Transition', TransitionNested)
    .add('Staggered Transition', TransitionStaggered)
    .add('Transition with Classes', TransitionClasses)
    // .add('Chat Heads', ChatHeads)
}, module)
