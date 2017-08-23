// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { utcFormat } from 'd3-time-format';
import palette from 'docs/src/utils/palette';

const dateFormat = utcFormat('%-d/%-m/%Y');

class XAxis extends Component {
  static propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { xScale, yScale } = this.props;

    return (
      <g>
        {this.props.xScale.ticks(4).map((d) => {
          const date = dateFormat(d);
          return (
            <g opacity={0.6} key={date} transform={`translate(${xScale(d)})`}>
              <line
                style={{ pointerEvents: 'none' }}
                x1={0}
                y1={0}
                x2={0}
                y2={yScale.range()[0]}
                opacity={0.2}
                stroke={palette.textColor}
              />
              <text
                fontSize="9px"
                textAnchor="middle"
                fill={palette.textColor}
                x={0}
                y={-10}
              >{date}</text>
            </g>
          );
        })}
      </g>
    );
  }
}

export default XAxis;
