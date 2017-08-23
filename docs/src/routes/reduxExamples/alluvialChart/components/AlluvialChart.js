// @flow weak

import React, { PureComponent } from 'react';
import TickGroup from 'resonance/TickGroup';
import NodeGroup from 'resonance/NodeGroup';
import Surface from 'docs/src/components/Surface';
import palette from 'docs/src/utils/palette';
import PropTypes from 'prop-types';
import { utcFormat } from 'd3-time-format';
import { format } from 'd3-format';
import { easeExpInOut } from 'd3-ease';
import { VIEW, TRBL, DIMS } from '../module/constants';

const dateFormat = utcFormat('%-d/%-m/%Y');
const numberFormat = format(',');

class AlluvialChart extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    duration: PropTypes.number.isRequired,
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
    const { data, xScale, duration } = this.props;
    const { yScale0, yScale1 } = this.state;

    return (
      <Surface view={VIEW} trbl={TRBL}>
        <g>
          {xScale.ticks(4).map((d) => {
            const date = dateFormat(d);

            return (
              <g opacity={0.6} key={date} transform={`translate(${xScale(d)})`}>
                <line
                  style={{ pointerEvents: 'none' }}
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={yScale1.range()[0]}
                  opacity={0.2}
                  stroke={palette.textColor}
                />
                <text
                  fontSize="8px"
                  textAnchor="middle"
                  fill={palette.textColor}
                  x={0}
                  y={-10}
                >{date}</text>
              </g>
            );
          })}
        </g>
        <TickGroup
          scale={yScale1}

          start={({ val }) => ({
            opacity: 1e-6,
            transform: `translate(0,${yScale0(val)})`,
          })}

          enter={({ val }) => ({
            opacity: [1e-6, 0.7],
            transform: [`translate(0,${yScale1(val)})`],
            timing: { duration, ease: easeExpInOut },
          })}

          update={({ val }) => ({
            opacity: [0.7],
            transform: [`translate(0,${yScale1(val)})`],
            timing: { duration, ease: easeExpInOut },
          })}

          leave={({ val }) => ({
            opacity: [1e-6],
            transform: [`translate(0,${yScale1(val)})`],
            timing: { duration, ease: easeExpInOut },
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
                    fontSize={'8px'}
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
            opacity: [0.7],
            timing: { duration, ease: easeExpInOut },
          })}

          update={({ path }) => ({
            opacity: [0.7],
            d: [path],
            timing: { duration, ease: easeExpInOut },
          })}

          leave={() => ({
            opacity: [1e-6],
            timing: { duration, ease: easeExpInOut },
          })}
        >
          {(nodes) => (
            <g>
              {nodes.map(({ key, data: { fill }, state }) => {
                return (
                  <path key={key} fill={fill} {...state} />
                );
              })}
            </g>
          )}
        </NodeGroup>
      </Surface>
    );
  }
}


export default AlluvialChart;
