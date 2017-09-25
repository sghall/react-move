// @flow weak
/* eslint react/no-multi-comp: 'off' */

import React, { PureComponent } from 'react';
import NodeGroup from 'react-move/NodeGroup';
import Surface from 'docs/src/components/Surface';
import { easeExpInOut } from 'd3-ease';
import { scaleBand } from 'd3-scale';
import { shuffle } from 'd3-array';

// **************************************************
//  SVG Layout
// **************************************************
const view = [1000, 250]; // [width, height]
const trbl = [10, 100, 10, 100]; // [top, right, bottom, left] margins

const dims = [ // Adjusted dimensions [width, height]
  view[0] - trbl[1] - trbl[3],
  view[1] - trbl[0] - trbl[2],
];

// **************************************************
//  Mock Data
// **************************************************
const mockData = [
  {
    name: 'Linktype',
    value: 45,
  }, {
    name: 'Quaxo',
    value: 53,
  }, {
    name: 'Skynoodle',
    value: 86,
  }, {
    name: 'Realmix',
    value: 36,
  }, {
    name: 'Jetpulse',
    value: 54,
  }, {
    name: 'Chatterbridge',
    value: 91,
  }, {
    name: 'Riffpedia',
    value: 67,
  }, {
    name: 'Layo',
    value: 12,
  }, {
    name: 'Oyoba',
    value: 69,
  }, {
    name: 'Ntags',
    value: 17,
  }, {
    name: 'Brightbean',
    value: 73,
  }, {
    name: 'Blogspan',
    value: 25,
  }, {
    name: 'Twitterlist',
    value: 73,
  }, {
    name: 'Rhycero',
    value: 67,
  }, {
    name: 'Trunyx',
    value: 52,
  }, {
    name: 'Browsecat',
    value: 90,
  }, {
    name: 'Skinder',
    value: 88,
  }, {
    name: 'Tagpad',
    value: 83,
  }, {
    name: 'Gabcube',
    value: 6,
  }, {
    name: 'Jabberstorm',
    value: 19,
  },
];


class Example extends PureComponent {
  state = {
    data: shuffle(mockData).slice(0, 15),
  }

  update = () => {
    this.setState({
      data: shuffle(mockData).slice(0, 15),
    });
  }

  render() {
    const scale = scaleBand()
      .rangeRound([0, dims[0]])
      .domain(this.state.data.map((d) => d.name))
      .padding(0.1);

    return (
      <div>
        <button onClick={this.update}>
          Update
        </button>
        <span style={{ margin: 5 }}>
          Bar Count: {this.state.data.length}
        </span>
        <Surface view={view} trbl={trbl}>
          <NodeGroup
            data={this.state.data}
            keyAccessor={(d) => d.name}

            start={() => ({
              opacity: 1e-6,
              x: 1e-6,
              fill: '#00cf77',
              width: scale.bandwidth(),
            })}

            enter={(data) => ({
              opacity: [0.5],
              x: [scale(data.name)],
              timing: { duration: 750, ease: easeExpInOut },
            })}

            update={(data) => ({
              opacity: [0.5],
              x: [scale(data.name)],
              fill: '#00a7d8',
              width: [scale.bandwidth()],
              timing: { duration: 750, ease: easeExpInOut },
            })}

            leave={() => ({
              opacity: [1e-6],
              x: [scale.range()[1]],
              fill: '#ff0063',
              timing: { duration: 750, ease: easeExpInOut },
            })}
          >
            {(nodes) => {
              return (
                <g>
                  {nodes.map(({ key, state }) => {
                    const { x, ...rest } = state;

                    return (
                      <g key={key} transform={`translate(${x},0)`}>
                        <rect
                          height={dims[1]}
                          {...rest}
                        />
                      </g>
                    );
                  })}
                </g>
              );
            }}
          </NodeGroup>
        </Surface>
      </div>
    );
  }
}

export default Example;
