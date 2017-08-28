// @flow weak
// example from https://github.com/veltman/flubber

import React, { PureComponent } from 'react';
import { range } from 'd3-array';
import { easeExpInOut } from 'd3-ease';
import Animate from 'react-move/Animate';

function getRandomColor() {
  return range(6).reduce((m) => {
    return `${m}${'0123456789ABCDEF'[Math.floor(Math.random() * 16)]}`;
  }, '#');
}

class Example extends PureComponent {
  state = {
    show: false,
    color: 'green',
  }

  updateShow = () => {
    this.setState((prev) => ({ show: !prev.show }));
  }

  updateColor = () => {
    this.setState(() => ({ show: true, color: getRandomColor() }));
  }

  render() {
    const { updateShow, updateColor, state: { show, color } } = this;

    return (
      <div>
        <button onClick={updateShow}>
          {show ? 'unmount' : 'mount'}
        </button>
        <button onClick={updateColor}>
          Change Color
        </button>
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
            timing: { duration: 1000, ease: easeExpInOut },
          }}

          leave={[
            {
              backgroundColor: ['red'],
              timing: { duration: 1000, ease: easeExpInOut },
            },
            {
              opacity: [0],
              timing: { duration: 2000, ease: easeExpInOut },
            },
          ]}
        >
          {({ opacity, backgroundColor }) => {
            return (
              <div style={{ height: 100, width: 100, opacity, backgroundColor }} />
            );
          }}
        </Animate>
      </div>
    );
  }
}

export default Example;
