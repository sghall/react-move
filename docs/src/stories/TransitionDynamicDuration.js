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
          The "Transition" component supports a 'getDuration' prop that supplies you the item and item key and expects you to return the duration for that item. Thus, you can easily customize the duration of individual items. This overrides the global 'duration' prop.
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
          getDuration={(item, key) => (item.value & 2 ? 300 : 800)}
          update={d => ({
            translate: 1,
            opacity: 1,
            color: `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`
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
        >
          {data => {
            return (
              <div style={{ height: 20 * 10 + 'px', position: 'relative' }}>
                {data.map(d => {
                  return (
                    <div
                      key={d.key}
                      style={{
                        fontWeight: 'bold',
                        position: 'absolute',
                        transform: `translate(${100 * d.state.translate}px, ${20 * d.key}px)`,
                        opacity: d.state.opacity,
                        color: d.state.color
                      }}
                    >
                      {d.key} - {Math.round(d.progress * 100)}
                    </div>
                  )
                })}
              </div>
            )
          }}
        </Transition>
      </div>
    )
  }
}

const source = require('!raw!./Transition')
const CodeHighlight = require('./components/codeHighlight').default
export default () => (
  <div>
    <Story />
    <br />
    <br />

    <CodeHighlight>{() => source}</CodeHighlight>
  </div>
)

function makeItems() {
  return _.filter(
    _.map(_.range(11), d => ({
      value: d
    })),
    (d, i) => i > Math.random() * 10
  )
}
