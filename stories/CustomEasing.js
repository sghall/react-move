import React, { Component } from 'react'
//
import Animate from '../src/Animate'

class Story extends Component {
  constructor () {
    super()
    this.state = {
      item: makeItem()
    }
  }
  render () {
    return (
      <div>
        <br />
        <br />

        <button
          onClick={() => this.setState({
            item: makeItem()
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
              left: 0,
              color: 'blue'
            }}
            data={this.state.item}
            duration={1000}
            easing={(t) => { // Chart's easeOutBounce function
              if ((t /= 1) < (1 / 2.75)) {
                return 1 * (7.5625 * t * t)
              } else if (t < (2 / 2.75)) {
                return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)
              } else if (t < (2.5 / 2.75)) {
                return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)
              }
              return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)
            }}
          >
            {data => {
              return (
                <div
                  style={{
                    float: 'left',
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                    borderRadius: '10px',
                    transform: `translate(${data.left * 300}%, 0%)`,
                    background: data.color
                  }}
                >
                  {Math.round(data.left * 100)}
                </div>
              )
            }}
          </Animate>
        </div>
      </div>
    )
  }
}

const source = require('!raw-loader!./CustomEasing')
const CodeHighlight = require('./components/codeHighlight').default
export default () => (
  <div>
    <Story />
    <br />
    <br />

    
    <CodeHighlight>{() => source}</CodeHighlight>
  </div>
)

function makeItem () {
  const colorNum = Math.random()
  const color = colorNum > 0.6 ? 'red' : colorNum > 0.3 ? 'gold' : 'blue'
  return {
    left: Math.random() * 1,
    color,
    rotate: Math.random() > 0.5 ? 360 : 0
  }
}
