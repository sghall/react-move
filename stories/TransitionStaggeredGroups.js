import React, { Component } from 'react'
import _ from 'lodash'
//
import Transition from '../src/Transition'
//
import CodeHighlight from './components/codeHighlight.js'

class Line extends Component {
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
          Stagger groups behave relative to the 'entering', 'updating' and 'leaving' groups. This way items coming in and out can start to animate at the same time, rather than waiting for the other to complete.
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
          staggerGroups // staggers items relative to their 'entering', 'updating', or 'leaving' group
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

        Code:
        <CodeHighlight>{() => `
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
    staggerGroups // staggers items relative to their 'entering', 'updating', or 'leaving' group
  >
    {data => (
      <div style={{height: (20 * 10) + 'px'}}>
        {data.map(d => (
          <div
            key={d.key}
            style={{
              fontWeight: 'bold',
              position: 'absolute',
              transform: \`translate(\${100 * d.state.translate}px, \${20 * d.key}px)\`,
              color: d.state.color,
              opacity: d.state.opacity
            }}
          >
            {d.key} - {Math.round(d.percentage * 100)}
          </div>
        ))}
      </div>
    )}
  </Transition>
        `}</CodeHighlight>

        <br />
        <br />
      </div>
    )
  }
}

export default () => <Line />

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
