import React, { Component } from 'react'
import _ from 'lodash'
//
import Animate from '../src/Animate'
//
import CodeHighlight from './components/codeHighlight.js'

class Line extends Component {
  constructor () {
    super()
    this.state = {
      flexDuration: false,
      items: makeItems()
    }
  }
  render () {
    return (
      <div>
        <p>
          By using a self-looping RAF animation loop, react-motion lets you control how to handle dropped frames with the "flexDuration" prop. If it is set to "true", dropped frames will lengthen the animation to ensure execution of every frame of the animation. Using the default ("false"), frames will drop intermittently to keep up with the duration of the animation.
        </p>

        <br />
        <br />

        <label>
          <input
            type='checkbox'
            value={this.state.flexDuration}
            onChange={e => this.setState({
              flexDuration: e.target.checked
            })}
          />
          flexDuration
        </label>

        <button
          onClick={() => this.setState({
            items: makeItems()
          })}
        >
          Randomize Data
        </button>

        <br />
        <br />

        {this.state.items.map((d, i) => (
          <Animate
            key={i}
            default={{
              scale: 0,
              color: 'blue',
              rotate: 0
            }}
            data={d}
            flexDuration={this.state.flexDuration}
          >
            {data => {
              return (
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    float: 'left'
                  }}
                >
                  <div
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                      textAlign: 'center',
                      borderRadius: ((data.rotate / 360) * 100) + 'px',
                      transform: `translate(${data.scale * 15}%, ${data.scale * 15}%) scale(${data.scale}) rotate(${data.rotate}deg)`,
                      background: data.color
                    }}
                  >
                    {Math.round(data.scale * 100)}
                  </div>
                </div>
              )
            }}
          </Animate>
        ))}

        <br />
        <br />

        <div style={{clear: 'both'}} />

        Code:
        <CodeHighlight>{() => `
<Animate
  key={i}
  default={{
    scale: 0,
    color: 'blue',
    rotate: 0
  }}
  data={d}
  flexDuration={this.state.flexDuration}
>
  {data => {
    return (
      <div
        style={{
          width: '30px',
          height: '30px',
          float: 'left'
        }}
      >
        <div
          style={{
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            borderRadius: ((data.rotate / 360) * 100) + 'px',
            transform: \`translate(\${data.scale * 15}%, \${data.scale * 15}%) scale(\${data.scale}) rotate(\${data.rotate}deg)\`,
            background: data.color
          }}
        >
          {Math.round(data.scale * 100)}
        </div>
      </div>
    )
  }}
</Animate>
        `}</CodeHighlight>

        <br />
        <br />
      </div>
    )
  }
}

export default () => <Line />

function makeItems () {
  return _.range(500).map(d => {
    const colorNum = Math.random()
    const color = colorNum > 0.6 ? 'red' : colorNum > 0.3 ? 'gold' : 'blue'
    return {
      scale: Math.random() * 1,
      color,
      rotate: Math.random() > 0.5 ? 360 : 0
    }
  })
}
