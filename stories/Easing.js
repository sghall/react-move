import React, { Component } from 'react'
//
import Animate from '../src/Animate'
//
import CodeHighlight from './components/codeHighlight.js'

class Line extends Component {
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
            duration={2000}
            easing='easeElasticOut'
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

        <br />
        <br />

        Code:
        <CodeHighlight>{() => `
<Animate
  default={{
    left: 0,
    color: 'blue'
  }}
  data={this.state.item}
  duration={2000}
  easing='easeElasticOut'
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
          transform: \`translate(\${data.left * 300}%, 0%)\`,
          background: data.color
        }}
      >
        {Math.round(data.left * 100)}
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

function makeItem () {
  const colorNum = Math.random()
  const color = colorNum > 0.6 ? 'red' : colorNum > 0.3 ? 'gold' : 'blue'
  return {
    left: Math.random() * 1,
    color,
    rotate: Math.random() > 0.5 ? 360 : 0
  }
}
