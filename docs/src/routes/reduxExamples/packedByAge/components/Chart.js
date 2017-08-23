// @flow weak

import React from 'react';
import NodeGroup from 'resonance/NodeGroup';
import Surface from 'docs/src/components/Surface';
import PropTypes from 'prop-types';
import { scaleOrdinal } from 'd3-scale';
import { easeExpInOut } from 'd3-ease';
import { VIEW, TRBL, AGES, COLORS } from '../module/constants';

const colors = scaleOrdinal()
  .range(COLORS).domain(AGES);

const getFill = ({ name, depth }, sortKey) => {
  const age = name.slice(5);

  if (age === sortKey) {
    return 'red';
  }

  return depth === 2 ? colors(age) : 'rgba(127,127,127,0.5)';
};

const Chart = (props) => {
  const { data, sortKey, duration } = props;

  return (
    <Surface view={VIEW} trbl={TRBL}>
      <NodeGroup
        data={data}
        keyAccessor={(d) => d.name}

        start={(node) => ({
          node: {
            opacity: 1e-6,
            transform: `translate(${node.x},${node.y})`,
          },
          circle: {
            r: 1e-6,
            fill: getFill(node, sortKey),
          },
        })}

        enter={(node) => {
          const d0 = node.depth === 0 ? 0 : duration;
          const d1 = node.depth === 0 ? 0 : duration * 2;

          return {
            node: {
              opacity: [0.8],
              transform: `translate(${node.x},${node.y})`,
            },
            circle: { fill: getFill(node, sortKey), r: [node.r] },
            timing: { duration: d0, delay: d1, ease: easeExpInOut },
          };
        }}

        update={(node) => ([
          {
            circle: { fill: getFill(node, sortKey), r: [node.r] },
            timing: { duration, delay: duration },
          },
          {
            node: {
              opacity: [0.8],
              transform: [`translate(${node.x},${node.y})`],
            },
            timing: { duration, delay: duration, ease: easeExpInOut },
          },
        ])}

        leave={() => ({
          node: {
            opacity: [1e-6],
          },
          circle: { fill: 'rgba(0,0,0,0.3)' },
          timing: { duration, ease: easeExpInOut },
        })}
      >
        {(nodes) => (
          <g>
            {nodes.map(({ key, data: { name, depth, r }, state, type }) => (
              <g
                key={key}
                {...state.node}
                style={{ pointerEvents: type === 'LEAVE' ? 'none' : 'all' }}
              >
                <title>{name}</title>
                <circle
                  stroke="rgba(0,0,0,0.2)"
                  {...state.circle}
                />
                <text
                  fill="white"
                  dy="0.3em"
                  fontSize="10px"
                  textAnchor="middle"
                >
                  {(depth === 2 && r > 10) ? name.slice(0, 2) : ''}
                </text>
              </g>
            ))}
          </g>
        )}
      </NodeGroup>
    </Surface>
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  sortKey: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};

export default Chart;
