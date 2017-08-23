// @flow weak

import {
  interpolateRgb,
  interpolateNumber,
  interpolateString,
  interpolateTransformSvg,
} from 'd3-interpolate';
import { color } from 'd3-color';

function getTween(nameSpace, attr, interpol, value1) {
  return function tween() {
    const value0 = nameSpace ? this.state[nameSpace][attr] : this.state[attr];

    if (value0 === value1) {
      return null;
    }

    const i = interpol(value0, value1);

    let stateTween;

    if (nameSpace === null) {
      stateTween = (t) => {
        this.setState(() => {
          return { [attr]: i(t) };
        });
      };
    } else {
      stateTween = (t) => {
        this.setState((state) => {
          return { [nameSpace]: { ...state[nameSpace], [attr]: i(t) } };
        });
      };
    }

    return stateTween;
  };
}

export function getInterpolator(attr, value) {
  if (attr === 'transform') {
    return interpolateTransformSvg;
  } else if (typeof value === 'number') {
    return interpolateNumber;
  } else if (value instanceof color || color(value) !== null) {
    return interpolateRgb;
  }

  return interpolateString;
}

export default function (nameSpace, attr, value) {
  return getTween.call(this, nameSpace, attr, getInterpolator(attr, value), value);
}
