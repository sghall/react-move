// @flow weak

import React from 'react';
import NodeGroup from 'resonance/NodeGroup';
import PropTypes from 'prop-types';
import { easeLinear } from 'd3-ease';
import { arcTween } from '../module/scales';
import Arc from './Arc';

const Sunburst = (props) => {
  const { data, path, duration, activePath, setActivePath, setActiveNode } = props;

  return (
    <NodeGroup
      data={data}
      keyAccessor={(d) => d.filePath}

      start={(node) => ({
        opacity: 0.6,
        d: path(node),
      })}

      update={(node) => {
        if (node.noTransition) {
          return {
            opacity: 0.6,
            d: path(node), // returns string value
          };
        }

        return {
          opacity: node.angle === 0 ? [1e-6] : 0.6,
          d: arcTween(node), // returns custom tween
          timing: { duration, ease: easeLinear },
        };
      }}
    >
      {(nodes) => (
        <g>
          {nodes.map(({ key, data: node, state }) => (
            <Arc
              key={key}
              node={node}
              {...state}
              activePath={activePath}
              setActivePath={setActivePath}
              setActiveNode={setActiveNode}
            />
          ))}
        </g>
      )}
    </NodeGroup>
  );
};

Sunburst.propTypes = {
  data: PropTypes.array.isRequired,
  path: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  activePath: PropTypes.string.isRequired,
  setActivePath: PropTypes.func.isRequired,
  setActiveNode: PropTypes.func.isRequired,
};

export default Sunburst;
