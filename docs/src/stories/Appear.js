/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
import _ from 'lodash'
//
import Appear from '../../../lib/Appear'

class Story extends Component {
  constructor() {
    super()
    this.state = {
      show: true
    }
  }
  render() {
    const { show } = this.state
    return (
      <div>
        <p>
          The "Appear" component easily enables enter/exit animations on a
          single element. Just toggle
        </p>

        <br />
        <br />

        <button
          onClick={() =>
            this.setState({
              show: !show
            })}
        >
          {show ? 'Hide' : 'Show'}
        </button>

        <br />
        <br />

        <Appear
          show={show}
          enter={{
            scale: 0,
            color: 'green',
            rotate: -90
          }}
          update={{
            scale: 1,
            color: 'blue',
            rotate: 0
          }}
          leave={{
            scale: 0,
            color: 'red',
            rotate: 90
          }}
          duration={2000}
          easing="easeElasticOut"
        >
          {data => {
            return (
              <div
                style={{
                  width: 100 * data.scale + 'px',
                  height: 100 * data.scale + 'px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                  borderRadius: data.rotate / 360 * 100 + 'px',
                  transform: `rotate(${data.rotate}deg)`,
                  background: data.color
                }}
              >
                {Math.round(data.scale * 100)}
              </div>
            )
          }}
        </Appear>
      </div>
    )
  }
}

const source = require('!raw!./Appear')
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
