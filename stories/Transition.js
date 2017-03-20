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
          Transition can be used to animate just about anything. Here is an example:
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
          damping={10}
          // duration={1000}
        >
          {data => {
            return (
              <ul style={{height: (20 * 10) + 'px'}}>
                {data.map(d => {
                  // console.log(d.state)
                  return (
                    <li
                      key={d.key}
                      style={{
                        fontWeight: 'bold',
                        position: 'absolute',
                        transform: `translate(${100 * d.state.translate}px, ${20 * d.key}px)`,
                        opacity: d.state.opacity,
                        color: d.state.color
                      }}
                    >
                      {d.key}
                    </li>
                  )
                })}
              </ul>
            )
          }}
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

function makeItems () {
  return _.filter(
    _.map(_.range(10), d => ({
      value: d
    })),
    (d, i) => i > Math.random() * 10
  )
}
