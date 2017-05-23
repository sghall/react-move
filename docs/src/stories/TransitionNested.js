/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
import _ from 'lodash'
//
import Transition from '../../../lib/Transition'
import Animate from '../../../lib/Animate'

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
          You can easily layer animation components within each other. Here, the background, the item positions, and the item opacities are all controlled with different nested components.
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

        <Animate
          data={{
            background: Math.random() > 0.5 ? '#6748cd' : '#1bc38d'
          }}
          immutable={false}
        >
          {data => (
            <div
              style={{
                padding: '20px',
                background: data.background,
                position: 'relative'
              }}
            >
              <Transition
                data={items}
                getKey={d => d.value}
                update={d => ({
                  translate: 1,
                  opacity: 1
                })}
                enter={d => ({
                  translate: 0,
                  opacity: 0
                })}
                leave={d => ({
                  translate: 2,
                  opacity: 0
                })}
                ignore={['opacity']}
              >
                {data => (
                  <div
                    style={{
                      height: 20 * 10 + 'px'
                    }}
                  >
                    {data.map(d => (
                      <div
                        key={d.key}
                        style={{
                          fontWeight: 'bold',
                          position: 'absolute',
                          transform: `translate(${100 * d.state.translate}px, ${20 * d.key}px)`,
                          color: 'white'
                        }}
                      >
                        <Animate
                          data={{
                            opacity: d.state.opacity
                          }}
                          immutable={false}
                        >
                          {data => {
                            return (
                              <span
                                style={{
                                  opacity: data.opacity
                                }}
                              >
                                {d.key} - {Math.round(d.progress * 100)}
                              </span>
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
      </div>
    )
  }
}

const source = require('!raw!./TransitionNested')
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
    (d, i) => Math.random() * 10 > i
  )
}
