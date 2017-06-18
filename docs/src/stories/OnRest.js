/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
import _ from 'lodash'
//
import Animate from '../../../lib/Animate'
import Transition from '../../../lib/Transition'

class Story extends Component {
  constructor() {
    super()
    this.state = {
      notifications: [],
      item: {
        data: 0
      },
      items: makeItems()
    }
  }
  render() {
    const { notifications, item } = this.state
    return (
      <div>
        <p>
          For both 'Animate' and 'Transition' components, you can use the 'onRest' prop to trigger a function every time an animation is complete (or every item's animation in the case of Transition).
        </p>

        <br />
        <br />

        <button
          onClick={() =>
            this.setState({
              item: {
                data: Math.random()
              }
            })}
        >
          Randomize Data
        </button>

        <br />
        <br />

        <div
          style={{
            height: '120px'
          }}
        >
          <Animate
            default={{
              data: 0
            }}
            data={item}
            onRest={() => {
              this.setState({
                notifications: [Math.random()]
              })
            }}
          >
            {({ data }) => {
              return (
                <div>
                  {Math.round(data * 100)}
                </div>
              )
            }}
          </Animate>
        </div>
        <Transition
          data={notifications}
          getKey={d => d}
          enter={item => ({
            opacity: 1,
            left: 0,
            scale: 1
          })}
          update={item => ({
            opacity: 0,
            left: 100,
            scale: 4
          })}
          duration={800}
        >
          {items => (
            <div style={{ position: 'relative' }}>
              {items.map(item => (
                <div
                  key={item.data}
                  style={{
                    position: 'absolute',
                    opacity: item.state.opacity,
                    transform: `translateX(${item.state.left}px) scale(${item.state.scale})`,
                    WebkitTransform: `translateX(${item.state.left}px) scale(${item.state.scale})`
                  }}
                >
                  Done!
                </div>
              ))}
            </div>
          )}
        </Transition>
      </div>
    )
  }
}

const source = require('!raw!./OnRest')
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
  return _.range(5).map(d => {
    const colorNum = Math.random()
    const color = colorNum > 0.6 ? 'red' : colorNum > 0.3 ? 'gold' : 'blue'
    return {
      scale: Math.random() * 1,
      color,
      rotate: Math.random() > 0.5 ? 360 : 0
    }
  })
}
