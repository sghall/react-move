// @flow weak

import React, { PureComponent } from 'react';
import TickGroup from 'resonance/TickGroup';
import NodeGroup from 'resonance/NodeGroup';
import Surface from 'docs/src/components/Surface';
import palette from 'docs/src/utils/palette';
import PropTypes from 'prop-types';
import { format } from 'd3-format';
import { easePoly } from 'd3-ease';
import { VIEW, TRBL, DIMS } from '../module/constants';
import XAxis from './XAxis';

const numberFormat = format(',');

class StackedChart extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    duration: PropTypes.number.isRequired,
    activeSeries: PropTypes.string.isRequired,
  }

  state = {
    yScale0: this.props.yScale,
    yScale1: this.props.yScale,
  }

  componentWillReceiveProps(next) {
    this.setState(() => ({
      yScale0: this.props.yScale,
      yScale1: next.yScale,
    }));
  }

  render() {
    const { data, xScale, duration, activeSeries } = this.props;
    const { yScale0, yScale1 } = this.state;

    return (
      <Surface view={VIEW} trbl={TRBL}>
        <defs>
          <pattern id="hatch" patternUnits="userSpaceOnUse" width="4" height="4">
            <path
              d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
              style={{ stroke: palette.textColor, strokeWidth: 2, opacity: 0.5 }}
            />
          </pattern>
        </defs>
        <TickGroup
          scale={yScale1}

          start={(tick) => ({
            opacity: 1e-6,
            transform: `translate(0,${yScale0(tick.val)})`,
          })}

          enter={({ val }) => ({
            opacity: [1],
            transform: [`translate(0,${yScale1(val)})`],
            timing: { duration, ease: easePoly },
          })}

          update={({ val }) => ({
            opacity: [1],
            transform: [`translate(0,${yScale1(val)})`],
            timing: { duration, ease: easePoly },
          })}

          leave={({ val }) => ({
            opacity: [1e-6],
            transform: [`translate(0,${yScale1(val)})`],
            timing: { duration, ease: easePoly },
          })}
        >
          {(nodes) => (
            <g>
              {nodes.map(({ key, data: { val }, state }) => (
                <g key={key} {...state}>
                  <line
                    x1={0}
                    y1={0}
                    x2={DIMS[0]}
                    y2={0}
                    stroke={palette.textColor}
                    opacity={0.2}
                  />
                  <text
                    fontSize={'9px'}
                    textAnchor="end"
                    dy=".35em"
                    fill={palette.textColor}
                    x={-10}
                    y={0}
                  >{numberFormat(val)}</text>
                </g>
              ))}
            </g>
          )}
        </TickGroup>
        <NodeGroup
          data={data}
          keyAccessor={(d) => d.name}

          start={({ path }) => ({
            opacity: 1e-6,
            d: path,
          })}

          enter={() => ({
            opacity: [0.8],
            timing: { duration, ease: easePoly },
          })}

          update={({ path }) => ({
            opacity: [0.8],
            d: [path],
            timing: { duration, ease: easePoly },
          })}

          leave={({ path }) => ({
            opacity: [1e-6],
            d: [path],
            timing: { duration, ease: easePoly },
          })}
        >
          {(nodes) => (
            <g>
              {nodes.map(({ key, data: { name, fill }, state }) => (
                <path
                  key={key}
                  {...state}
                  fill={activeSeries === name ? 'url(#hatch)' : fill}
                />
              ))}
            </g>
          )}
        </NodeGroup>
        <XAxis xScale={xScale} yScale={yScale1} />
      </Surface>
    );
  }
}

export default StackedChart;
