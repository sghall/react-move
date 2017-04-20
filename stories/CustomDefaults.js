import React, { Component } from 'react'
//
import Animate from '../src/Animate'
//
import source from '!raw-loader!./CustomDefaults'
import CodeHighlight from './components/codeHighlight'

Object.assign(Animate.defaults, {
  duration: 3000,
  easing: 'easeBackOut'
})

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

        Source:
        <CodeHighlight>{() => source}</CodeHighlight>

        <br />
        <br />
      </div>
    )
  }
}

export default () => <Story />

function makeItem () {
  const colorNum = Math.random()
  const color = colorNum > 0.6 ? 'red' : colorNum > 0.3 ? 'gold' : 'blue'
  return {
    left: Math.random() * 1,
    color,
    rotate: Math.random() > 0.5 ? 360 : 0
  }
}
