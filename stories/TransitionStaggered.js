import React, { Component } from 'react'
import _ from 'lodash'
//
import Transition from '../src/Transition'
import Animate from '../src/Animate'
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
          stagger={0.1}
          staggerGroups
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
                  {d.key} - {Math.round(d.percentage * 100)}
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
    color: 'blue'
  })}
  enter={d => ({
    translate: 0,
    opacity: 0,
    color: 'green'
  })}
  exit={d => ({
    translate: 2,
    opacity: 0,
    color: 'red'
  })}
  duration={1000}
>
  {data => (
    <ul style={{height: (20 * 10) + 'px'}}>
      {data.map(d => (
        <li
          key={d.key}
          style={{
            fontWeight: 'bold',
            position: 'absolute',
            transform: \`translate(\${100 * d.state.translate}px, \${20 * d.key}px)\`,
            opacity: d.state.opacity,
            color: d.state.color
          }}
        >
          {d.key}
        </li>
      ))}
    </ul>
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
