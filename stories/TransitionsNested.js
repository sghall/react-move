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

        <Animate
          data={{
            background: Math.random() > 0.5 ? 'pink' : 'lightgrey'
          }}
          damping={14}
        >
          {data => (
            <div style={{background: data.background}}>
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
                // duration={1000}
                tension={50}
                damping={10}
                ignore={['opacity']}
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
                          color: d.state.color
                        }}
                      >
                        <Animate
                          data={{
                            opacity: d.state.opacity
                          }}
                        >
                          {data => {
                            // console.log(data.opacity)
                            return (
                              <span
                                style={{
                                  opacity: data.opacity
                                }}
                              >{d.key} - {d.state.opacity} - {data.opacity}</span>
                            )
                          }}
                        </Animate>
                      </div>
                    ))}
                  </div>
                )}
              </Transition>
            </div>
          )}
        </Animate>

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
