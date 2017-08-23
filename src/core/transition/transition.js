// @flow weak

import { now as timeNow } from 'd3-timer';
import once from 'lodash.once';
import tween from './tween';
import schedule from './schedule';

let id = 0;

export function newId() {
  return ++id;
}

// from https://github.com/d3/d3-ease/blob/master/src/linear.js
function linear(t) {
  return +t;
}

export const preset = {
  time: null,
  delay: 0,
  duration: 250,
  ease: linear,
};

function scheduleTransitions(config = {}) {
  const transitions = { ...config };

  const events = transitions.events || {};
  delete transitions.events;

  // each event handler should be called only once
  Object.keys(events).forEach((d) => {
    if (typeof events[d] !== 'function') {
      throw new Error('Event handlers must be a function');
    } else {
      events[d] = once(events[d]);
    }
  });

  const timing = transitions.timing || {};
  delete transitions.timing;

  Object.keys(transitions).forEach((stateKey) => {
    const tweens = [];

    if (
      typeof transitions[stateKey] === 'object' &&
      Array.isArray(transitions[stateKey]) === false
    ) {
      Object.keys(transitions[stateKey]).forEach((attr) => {
        const val = transitions[stateKey][attr];

        if (Array.isArray(val)) {
          if (val.length === 1) {
            tweens.push(tween.call(this, stateKey, attr, val[0]));
          } else {
            this.setState((state) => {
              return { [stateKey]: { ...state[stateKey], [attr]: val[0] } };
            });

            tweens.push(tween.call(this, stateKey, attr, val[1]));
          }
        } else if (typeof val === 'function') {
          const getResonanceCustomTween = () => {
            const resonanceCustomTween = (t) => {
              this.setState((state) => {
                return { [stateKey]: { ...state[stateKey], [attr]: val(t) } };
              });
            };

            return resonanceCustomTween;
          };

          tweens.push(getResonanceCustomTween);
        } else {
          this.setState((state) => {
            return { [stateKey]: { ...state[stateKey], [attr]: val } };
          });
          // This assures any existing transitions are stopped
          tweens.push(tween.call(this, stateKey, attr, val));
        }
      });
    } else {
      const val = transitions[stateKey];

      if (Array.isArray(val)) {
        if (val.length === 1) {
          tweens.push(tween.call(this, null, stateKey, val[0]));
        } else {
          this.setState(() => {
            return { [stateKey]: val[0] };
          });

          tweens.push(tween.call(this, null, stateKey, val[1]));
        }
      } else if (typeof val === 'function') {
        const getResonanceCustomTween = () => {
          const resonanceCustomTween = (t) => {
            this.setState(() => {
              return { [stateKey]: val(t) };
            });
          };

          return resonanceCustomTween;
        };

        tweens.push(getResonanceCustomTween);
      } else {
        this.setState(() => {
          return { [stateKey]: val };
        });
        // This assures any existing transitions are stopped
        tweens.push(tween.call(this, null, stateKey, val));
      }
    }

    const timingConfig = { ...preset, ...timing, time: timeNow() };
    schedule(this, stateKey, newId(), timingConfig, tweens, events);
  });
}

export default function transition(config) {
  if (Array.isArray(config)) {
    config.forEach((c) => {
      scheduleTransitions.call(this, c);
    });
  } else {
    scheduleTransitions.call(this, config);
  }
}
