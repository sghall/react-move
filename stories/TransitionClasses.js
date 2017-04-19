import React, { Component } from 'react'
import _ from 'lodash'
//
import source from '!raw-loader!./CustomEasing'
import Transition from '../src/Transition'
//
import CodeHighlight from './components/codeHighlight'

const style = `
.item {
  transition: all .4s ease-in-out
}
.enter {
  color: lightgreen;
  opacity: 0;
  transform: translateX(0px);
}
.stable {
  color: blue;
  opacity: 1;
  transform: translateX(100px);
}
.leave {
  color: red;
  opacity: 0;
  transform: translateX(200px);
}
`

class Story extends Component {
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
          The "Transition" component also allows you to toggle data without animation. Here, we are toggling the "className" prop!
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
          ignore={['className']} // This is to supress interpolation on the className string
          duration={400} // This duration must be the same as your css transition :)
          stagger={100}
        >
          {data => (
            <div style={{
              height: (20 * 10) + 'px',
              position: 'relative'
            }}>
              {data.map(d => (
                <div
                  key={d.key}
                  className={`item ${d.state.className}`}
                  style={{
                    fontWeight: 'bold',
                    position: 'absolute',
                    top: 20 * d.key
                  }}
                >
                  {d.key}
                </div>
              ))}
            </div>
          )}
        </Transition>

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

function makeItems () {
  return _.filter(
    _.map(_.range(10), d => ({
      value: d
    })),
    (d, i) => i > Math.random() * 10
  )
}
