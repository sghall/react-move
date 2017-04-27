import React, { Component } from 'react'
import _ from 'lodash'
//
import Transition from '../src/Transition'

class Story extends Component {
  constructor () {
    super()
    this.state = {
      items: makeItems()
    }
  }
  render () {
    const {
      items
    } = this.state
    return (
      <div>
        <p>
          Transitions can be staggered by having each item wait for its predecessor to reach the stagger point before starting it's own animation. Just set the "stagger" prop to the decimal percentage that you want the predecessor to have before starting. We also have "staggerGroups" turned on here, which staggers the items based on their entering or exit state instead of index
        </p>

        <br />
        <br />

        <button
          onClick={() => this.setState({
            items: makeItems()
          })}
        >
          Randomize Data
        </button>

        <br />
        <br />

        <Transition
          data={items}
          getKey={d => d.value}
          update={d => ({
            translate: 1,
            opacity: 1,
            color: 'grey'
          })}
          enter={d => ({
            translate: 0,
            opacity: 0,
            color: 'blue'
          })}
          leave={d => ({
            translate: 2,
            opacity: 0,
            color: 'red'
          })}
          stagger={100}
          // staggerGroups // staggers items relative to their 'entering', 'updating', or 'leaving' group
        >
          {data => (
            <div style={{height: (20 * 10) + 'px'}}>
              {data.map(d => (
                <div
                  key={d.key}
                  style={{
                    fontWeight: 'bold',
                    position: 'absolute',
                    transform: `translate(${100 * d.state.translate}px, ${20 * d.key}px)`,
                    color: d.state.color,
                    opacity: d.state.opacity
                  }}
                >
                  {d.key} - {Math.round(d.progress * 100)}
                </div>
              ))}
            </div>
          )}
        </Transition>

        <br />
        <br />

      </div>
    )
  }
}

const source = require('!raw-loader!./TransitionStaggered')
const CodeHighlight = require('./components/codeHighlight').default
export default () => (
  <div>
    <Story />
    <br />
    <br />

    
    <CodeHighlight>{() => source}</CodeHighlight>
  </div>
)

let include
function makeItems () {
  include = !include
  return _.filter(
    _.map(_.range(10), d => ({
      value: d
    })),
    // (d, i) => include
    (d, i) => Math.random() * 10 > i
  )
}
