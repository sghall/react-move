// @flow weak
// example from https://github.com/veltman/flubber

import React, { PureComponent } from 'react';
import { feature } from 'topojson';
import { easeExpInOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import { interpolate } from 'flubber';
import Surface from 'docs/src/components/Surface'; // this is just a responsive SVG
import statesJSON from './states.json';

// **************************************************
//  SVG Layout
// **************************************************
const view = [1000, 450]; // [width, height]
const trbl = [10, 10, 10, 10]; // [top, right, bottom, left] margins

class Example extends PureComponent {
  state = {
    loop: true,
    states: feature(statesJSON, statesJSON.objects.states)
      .features.map((d) => {
        return d.geometry.coordinates[0];
      }),
  }

  update = () => { // take the first one, put it at the end
    if (this.state.loop) {
      this.setState(({ states }) => ({
        states: [
          ...states.slice(1),
          states[0],
        ],
      }));
    }
  }

  toggleLoop = () => {
    this.setState(({ loop }) => {
      return { loop: !loop };
    }, this.update);
  }

  render() {
    const { update, toggleLoop, state: { states, loop } } = this;
    const interpolator = interpolate(states[0], states[1]);

    return (
      <div>
        <button onClick={toggleLoop}>
          {loop ? 'stop' : 'loop'}
        </button>
        <Surface view={view} trbl={trbl}>
          <Animate

            start={{
              opacity: 1,
              d: interpolator(0),
            }}

            enter={[
              {
                opacity: [0.7],
                timing: { duration: 1000 },
              },
              {
                d: interpolator,
                timing: { delay: 1000, duration: 1000, ease: easeExpInOut },
                events: { end: update },
              },
            ]}

            update={{
              d: interpolator,
              timing: { delay: 200, duration: 1000, ease: easeExpInOut },
              events: { end: update },
            }}
          >
            {(state) => {
              return (
                <g transform="translate(100, 0) scale(0.8)">
                  <path
                    fill="steelblue"
                    {...state}
                  />
                </g>
              );
            }}
          </Animate>
        </Surface>
      </div>
    );
  }
}

export default Example;
