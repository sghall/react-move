/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
import _ from 'lodash'
//
import Transition from '../../../lib/Transition'
import Animate from '../../../lib/Animate'

const width = 300

class Story extends Component {
  constructor() {
    super()
    this.randomize = this.randomize.bind(this)
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    this.randomize()
  }
  randomize() {
    const min = 0
    const max = Math.round(Math.random() * width)

    this.setState({
      items: makeItems(min, max),
      max,
      prevMax: this.state.max || width
    })
  }
  render() {
    const { items, max, prevMax } = this.state

    if (!items.length) {
      return null
    }

    return (
      <div>
        <p>
          You can easily layer animation components within each other. Here, the
          background, the item positions, and the item opacities are all
          controlled with different nested components.
        </p>

        <br />
        <br />

        <button onClick={() => this.randomize()}>Randomize Data</button>

        <br />
        <br />

        <Animate
          data={{
            one: Math.round(Math.random() * 20)
          }}
        >
          {({ one }) => {
            return (
              <div
                style={{
                  background: 'rgba(0,0,0,.2)',
                  position: 'relative',
                  transform: `translateX(${one}px)`
                }}
              >
                <Transition
                  data={items}
                  getKey={(d, i) => String(d)}
                  update={function(d) {
                    return {
                      tick: d / max * width,
                      visibility: 1,
                      color: 'black'
                    }
                  }}
                  enter={d => ({
                    tick: d / prevMax * width,
                    visibility: 0,
                    color: 'blue'
                  })}
                  leave={d => ({
                    tick: d / max * width,
                    visibility: 0,
                    color: 'red'
                  })}
                  duration={500}
                >
                  {inters => {
                    return (
                      <div>
                        <pre>
                          <code>
                            {inters
                              .map(d => Math.round(d.state.tick))
                              .toString()}
                          </code>
                        </pre>
                        {inters.map((inter, index) => {
                          return (
                            <div
                              key={inter.key}
                              style={{
                                opacity: inter.state.visibility,
                                position: 'absolute',
                                transform: `translateX(${inter.state.tick}px)`,
                                color: inter.state.color
                              }}
                            >
                              {inter.data}
                            </div>
                          )
                        })}
                      </div>
                    )
                  }}
                </Transition>
              </div>
            )
          }}
        </Animate>
      </div>
    )
  }
}

const source = require('!raw!./TransitionNested')
const CodeHighlight = require('./components/codeHighlight').default
export default () =>
  <div>
    <Story />
    <br />
    <br />

    <CodeHighlight>
      {() => source}
    </CodeHighlight>
  </div>

function makeItems(min, max) {
  const tickStep = 10
  let tick = 0
  const ticks = []
  while (tick <= max) {
    ticks.push(tick)
    tick += tickStep
  }
  return ticks
}
