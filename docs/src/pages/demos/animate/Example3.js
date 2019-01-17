import React, { PureComponent } from 'react'
import { range } from 'd3-array'
import { easeExpInOut } from 'd3-ease'
import Animate from 'react-move/Animate'

function getRandomColor() {
  return range(6).reduce((m) => {
    return `${m}${'0123456789ABCDEF'[Math.floor(Math.random() * 16)]}`
  }, '#')
}

class Example extends PureComponent {
  state = {
    show: false,
    color: '#00cf77',
  }

  updateShow = () => {
    this.setState((prev) => ({ show: !prev.show }))
  }

  updateColor = () => {
    this.setState(() => ({ show: true, color: getRandomColor() }))
  }

  render() {
    const { updateShow, updateColor, state: { show, color } } = this

    return (
      <div>
        <button onClick={updateShow}>
          Toggle
        </button>
        {show ? (
          <button onClick={updateColor}>
            Update Color
          </button>
        ) : null}
        <Animate
          show={show}

          start={{
            opacity: 0,
            backgroundColor: color,
          }}

          enter={{
            opacity: [1],
            timing: { duration: 1000, ease: easeExpInOut },
          }}

          update={{
            opacity: [1],
            backgroundColor: [color],
            timing: { duration: 500, ease: easeExpInOut },
          }}

          leave={[
            {
              backgroundColor: ['#ff0063'],
              timing: { duration: 500, ease: easeExpInOut },
            },
            {
              opacity: [0],
              timing: { delay: 500, duration: 500, ease: easeExpInOut },
            },
          ]}
        >
          {({ opacity, backgroundColor }) => {
            return (
              <div style={{
                opacity,
                width: 200,
                height: 200,
                marginTop: 10,
                color: 'white',
                backgroundColor,
              }}
              >
                {opacity.toFixed(3)}
              </div>
            )
          }}
        </Animate>
      </div>
    )
  }
}

export default Example
