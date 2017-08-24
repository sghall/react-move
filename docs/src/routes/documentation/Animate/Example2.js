// @flow weak
// example adpated from https://react-move.js.org/#/story/animate

import React, { PureComponent } from 'react';
import { range } from 'd3-array';
import { easeExpInOut } from 'd3-ease';
import Animate from 'react-move/Animate';

function getRandomColor() {
  return range(6).reduce((m) => {
    return `${m}${'0123456789ABCDEF'[Math.floor(Math.random() * 16)]}`;
  }, '#');
}

function getItems() {
  return range(5).map((d) => ({
    key: `id-${d}`,
    scale: Math.random() * 1,
    color: getRandomColor(),
    rotate: Math.random() > 0.5 ? 360 : 0,
  }));
}

class Example extends PureComponent {
  state = {
    items: getItems(),
  }

  update = () => {
    this.setState({
      items: getItems(),
    });
  }

  render() {
    const { items } = this.state;

    return (
      <div>
        <button onClick={this.update}>
          Update
        </button>
        <div style={{ height: '200px' }}>
          {items.map((d) => (
            <Animate
              key={d.key}

              start={({ scale, color, rotate }) => ({
                scale,
                color,
                rotate,
              })}

              update={({ scale, color, rotate }) => ({
                scale: [scale],
                color: [color],
                rotate: [rotate],
                timing: { duration: 500, ease: easeExpInOut },
              })}

              data={d}
            >
              {(data, { scale, color, rotate }) => {
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
                      borderRadius: `${(rotate / 360) * 100}px`,
                      transform: `translate(${scale * 50}%, ${scale * 50}%) scale(${scale}) rotate(${rotate}deg)`,
                      background: color,
                    }}
                  >
                    {Math.round(scale * 100)}
                  </div>
                );
              }}
            </Animate>
          ))}
        </div>
      </div>
    );
  }
}

export default Example;
