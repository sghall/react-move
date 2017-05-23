/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
import _ from 'lodash'
//
import Transition from '../../../lib/Transition'

class Story extends Component {
  constructor() {
    super()
    this.state = {
      items: makeItems()
    }
  }
  render() {
    const { items } = this.state
    return (
      <div>
        <p>
          Stagger groups behave relative to the 'entering', 'updating' and 'leaving' groups. If you would prefer that items come in and out linearly, rather than in their respective groups, you can turn 'staggerGroups' off.
        </p>

        <br />
        <br />

        <button
          onClick={() =>
            this.setState({
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
          staggerGroups={false} // staggers items linearly instead of by group
        >
          {data => (
            <div style={{ height: 20 * 10 + 'px', position: 'relative' }}>
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
      </div>
    )
  }
}

const source = require('!raw!./TransitionStaggeredLinear')
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
function makeItems() {
  include = !include
  return _.filter(
    _.map(_.range(10), d => ({
      value: d
    })),
    // (d, i) => include
    (d, i) => Math.random() * 10 > i
  )
}
