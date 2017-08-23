// @flow weak

import React, { PureComponent } from 'react';
import TickGroup from 'resonance/TickGroup';
import NodeGroup from 'resonance/NodeGroup';
import Surface from 'docs/src/components/Surface';
import palette from 'docs/src/utils/palette';
import PropTypes from 'prop-types';
import { format } from 'd3-format';
import { easePoly, easeExp } from 'd3-ease';
import { VIEW, TRBL, DIMS } from '../module/constants';

const percentFormat = format('.1%');

class BarChart extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    duration: PropTypes.number.isRequired,
  }

  state = {
    xScale0: this.props.xScale,
    xScale1: this.props.xScale,
  }

  componentWillReceiveProps(next) {
    this.setState(() => ({
      xScale0: this.props.xScale,
      xScale1: next.xScale,
    }));
  }

  render() {
    const { data, yScale, duration } = this.props;
    const { xScale0, xScale1 } = this.state;

    return (
      <Surface view={VIEW} trbl={TRBL}>
        <TickGroup
          scale={this.props.xScale}

          start={({ val }) => ({
            opacity: 1e-6,
            transform: `translate(${xScale0(val)},0)`,
          })}

          enter={({ val }) => ({
            opacity: [1],
            transform: [`translate(${xScale1(val)},0)`],
            timing: { duration, ease: easeExp },
          })}

          update={({ val }) => ({
            opacity: [1],
            transform: [`translate(${xScale1(val)},0)`],
            timing: { duration, ease: easeExp },
          })}

          leave={({ val }) => ({
            opacity: [1e-6],
            transform: [`translate(${xScale1(val)},0)`],
            timing: { duration, ease: easeExp },
          })}
        >
          {(nodes) => (
            <g>
              {nodes.map(({ key, data: { val }, state }) => (
                <g key={key} {...state}>
                  <line
                    x1={0}
                    y1={0}
                    x2={0}
                    y2={DIMS[1]}
                    stroke={palette.textColor}
                    opacity={0.2}
                  />
                  <text
                    x={0}
                    y={-5}
                    textAnchor="middle"
                    fill={palette.textColor}
                    fontSize="10px"
                  >{percentFormat(val)}</text>
                </g>
              ))}
            </g>
          )}
        </TickGroup>
        <NodeGroup
          data={data}
          keyAccessor={(d) => d.name}

          start={(node) => ({
            node: {
              opacity: 1e-6,
              transform: 'translate(0,500)',
            },
            rect: {
              width: node.xVal,
              height: yScale.bandwidth(),
            },
            text: {
              x: node.xVal - 3,
            },
          })}

          enter={(node) => ({
            node: {
              opacity: [1e-6, 1],
              transform: ['translate(0,500)', `translate(0,${node.yVal})`],
            },
            rect: { width: node.xVal, height: yScale.bandwidth() },
            text: { x: node.xVal - 3 },
            timing: { duration, ease: easePoly },
          })}

          update={(node) => ({
            node: {
              opacity: [1],
              transform: [`translate(0,${node.yVal})`],
            },
            rect: { width: [node.xVal], height: [yScale.bandwidth()] },
            text: { x: [node.xVal - 3] },
            timing: { duration, ease: easePoly },
          })}

          leave={() => ({
            node: {
              opacity: [1e-6],
              transform: ['translate(0,500)'],
            },
            timing: { duration, ease: easePoly },
          })}
        >
          {(nodes) => (
            <g>
              {nodes.map(({ key, data: { name, xVal }, state }) => (
                <g key={key} {...state.node}>
                  <rect
                    fill={palette.primary1Color}
                    opacity={0.4}
                    {...state.rect}
                  />
                  <text
                    dy="0.35em"
                    x={-15}
                    textAnchor="middle"
                    fill={palette.textColor}
                    fontSize={10}
                    y={yScale.bandwidth() / 2}
                  >{name}</text>
                  <text
                    textAnchor="end"
                    dy="0.35em"
                    fill="white"
                    fontSize={10}
                    y={yScale.bandwidth() / 2}
                    {...state.text}
                  >{percentFormat(xScale1.invert(xVal))}</text>
                </g>
              ))}
            </g>
          )}
        </NodeGroup>
      </Surface>
    );
  }
}

export default BarChart;
