import React, { Component } from 'react'
import _ from 'lodash'
//
import Transition from '../src/Transition'
//
import CodeHighlight from './components/codeHighlight.js'

const style = `
.item {
  transition: all 1s ease-out
}
.enter {
  color: lightgreen;
  transform: translateX(0px);
}
.stable {
  color: blue;
  transform: translateX(100px);
}
.leave {
  color: red;
  transform: translateX(200px);
}
`

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
        <style children={style} />

        <p>
          You can also use the Transition component to animate between classes. It's definitely not as common and much more difficult to maintain, but it is possible. :)
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

        <Transition
          data={items}
          getKey={d => d.value}
          update={d => ({
            className: 'stable'
          })}
          enter={d => ({
            className: 'enter'
          })}
          leave={d => ({
            className: 'leave'
          })}
          // duration={1000}
        >
          {data => (
            <ul>
              {data.map(d => (
                <li
                  key={d.key}
                  className={`item ${d.state.className}`}
                  style={{
                    fontWeight: 'bold'
                  }}
                >
                  {d.key}
                </li>
              ))}
            </ul>
          )}
        </Transition>

        <br />
        <br />

        Styles:
        <CodeHighlight>{() => style}</CodeHighlight>

        Code:
        <CodeHighlight>{() => `
<Transition
  data={items}
  getKey={d => d.value}
  update={d => ({
    className: 'stable'
  })}
  enter={d => ({
    className: 'enter'
  })}
  leave={d => ({
    className: 'leave'
  })}
  duration={1000}
>
  {data => (
    <ul>
      {data.map(d => (
        <li
          key={d.key}
          className={\`item \${d.state.className}\`}
          style={{
            fontWeight: 'bold'
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
