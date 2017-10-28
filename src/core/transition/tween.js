// @flow weak
import { interpolate, interpolateTransformSvg } from 'd3-interpolate';

function getTween(nameSpace, attr, value1) {
  return function tween() {
    const value0 = nameSpace ? this.state[nameSpace][attr] : this.state[attr];

    if (value0 === value1) {
      return null;
    }

    const i = attr === 'transform' ? interpolateTransformSvg(value0, value1) : interpolate(value0, value1);

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

export default function (nameSpace, attr, value) {
  return getTween.call(this, nameSpace, attr, value);
}
