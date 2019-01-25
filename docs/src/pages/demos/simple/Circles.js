import React, { PureComponent } from 'react'
import NodeGroup from 'docs/src/components/NodeGroup'
import Surface from 'docs/src/components/Surface'
import { easeExpInOut } from 'd3-ease'
import { scaleBand } from 'd3-scale'
import { shuffle } from 'd3-array'

// **************************************************
//  SVG Layout
// **************************************************
const view = [1000, 350] // [width, height]
const trbl = [150, 10, 50, 10] // [top, right, bottom, left] margins

const dims = [ // Adjusted dimensions [width, height]
  view[0] - trbl[1] - trbl[3],
  view[1] - trbl[0] - trbl[2],
]

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
  },
]

// **************************************************
//  Example
// **************************************************
class Example extends PureComponent {
  state = {
    data: shuffle(mockData).slice(0, Math.floor(Math.random() * ((mockData.length + 2) - (5 + 1))) + 5),
  }

  update = () => {
    this.setState({
      data: shuffle(mockData).slice(0, Math.floor(Math.random() * ((mockData.length + 2) - (5 + 1))) + 5),
    })
  }

  render() {
    const scale = scaleBand()
      .rangeRound([0, dims[0]])
      .domain(this.state.data.map((d) => d.name))
      .padding(0.1)

    return (
      <div>
        <button onClick={this.update}>
          Update
        </button>
        <span style={{ margin: 5 }}>
          Circle Count: {this.state.data.length}
        </span>
        <Surface view={view} trbl={trbl}>
          <NodeGroup
            data={this.state.data}
            keyAccessor={(d) => d.name}

            start={() => ({
              g: {
                opacity: 1e-6,
                transform: 'translate(0,0)',
              },
              circle: {
                r: 1e-6,
                strokeWidth: 1e-6,
                fill: '#00cf77',
              },
            })}

            enter={(data, index) => ({
              g: {
                opacity: [0.8],
                transform: [`translate(${scale(data.name) + (scale.bandwidth() / 2)},0)`],
              },
              circle: {
                r: [scale.bandwidth() / 2],
                strokeWidth: [(index + 1) * 2],
                fill: '#00cf77',
              },
              timing: { duration: 1000, ease: easeExpInOut },
            })}

            update={(data, index) => ({
              g: {
                opacity: [0.8],
                transform: [`translate(${scale(data.name) + (scale.bandwidth() / 2)},0)`],
              },
              circle: {
                r: [scale.bandwidth() / 2],
                strokeWidth: [(index + 1) * 2],
                fill: '#00a7d8',
              },
              timing: { duration: 1000, ease: easeExpInOut },
            })}

            leave={() => ({
              g: {
                opacity: [1e-6],
              },
              circle: {
                fill: '#ff0063',
              },
              timing: { duration: 1000, ease: easeExpInOut },
            })}
          >
            {(nodes) => {
              return (
                <g>
                  {nodes.map(({ key, data, state }) => {
                    return (
                      <g key={key} {...state.g}>
                        <circle
                          stroke="grey"
                          cy={dims[1] / 2}
                          {...state.circle}
                        />
                        <text
                          x="0"
                          y="20"
                          fill="#fff"
                          transform="rotate(-45 5,20)"
                        >{`x: ${state.g.transform}`}</text>
                        <text
                          x="0"
                          y="5"
                          fill="#fff"
                          transform="rotate(-45 5,20)"
                        >{`name: ${data.name}`}</text>
                      </g>
                    )
                  })}
                </g>
              )
            }}
          </NodeGroup>
        </Surface>
      </div>
    )
  }
}

export default Example
