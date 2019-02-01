import React, { PureComponent } from 'react'
import { NodeGroup } from 'react-move'
import Surface from 'docs/src/components/Surface'
import { scaleBand, scaleLinear } from 'd3-scale'
import { shuffle, max } from 'd3-array'
import { easeExpInOut, easePoly } from 'd3-ease'

// **************************************************
//  SVG Layout
// **************************************************
const view = [1000, 250] // [width, height]
const trbl = [10, 10, 10, 10] // [top, right, bottom, left] margins

const dims = [ // Adjusted dimensions [width, height]
  view[0] - trbl[1] - trbl[3],
  view[1] - trbl[0] - trbl[2],
]

// **************************************************
//  Data
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
    data: shuffle(mockData).slice(0, Math.floor(Math.random() * ((mockData.length * 0.7) - (5 + 1))) + 5),
  }

  update = () => {
    this.setState({
      data: shuffle(mockData).slice(0, Math.floor(Math.random() * ((mockData.length * 0.7) - (5 + 1))) + 5),
    })
  }

  render() {
    const xScale = scaleBand()
      .rangeRound([0, dims[0]])
      .domain(this.state.data.map((d) => d.name))
      .padding(0.1)

    const yScale = scaleLinear()
      .rangeRound([dims[1], 0])
      .domain([0, max(this.state.data.map((d) => d.value))])

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
              x: 0,
              fill: '#00cf77',
              width: xScale.bandwidth(),
              height: 0,
            })}

            enter={(node, index) => ([ // An array!!
              {
                opacity: [0.8],
                width: [xScale.bandwidth()],
                height: [yScale(node.value)],
                timing: { duration: 1000 },
              },
              {
                x: [xScale(node.name)],
                timing: { duration: 100 * index, ease: easePoly },
              },
            ])}

            update={(node) => ([ // An array!!
              {
                opacity: [0.8],
                fill: ['#00a7d8', 'grey'],
                timing: { duration: 2000 },
              },
              {
                x: [xScale(node.name)],
                timing: { duration: 2000, ease: easeExpInOut },
              },
              {
                width: [xScale.bandwidth()],
                timing: { duration: 500 },
              },
              {
                height: [yScale(node.value)],
                timing: { delay: 2000, duration: 500 },
                events: { // Events!!
                  end() {
                    this.setState({ fill: 'steelblue' })
                  },
                },
              },
            ])}

            leave={() => ({
              opacity: [1e-6],
              fill: '#ff0063',
              timing: { duration: 1000 },
            })}
          >
            {(nodes) => {
              return (
                <g>
                  {nodes.map(({ key, data, state }) => {
                    const { x, height, ...rest } = state

                    return (
                      <g key={key} transform={`translate(${x},0)`}>
                        <rect
                          y={height}
                          height={dims[1] - height}
                          {...rest}
                        />
                        <text
                          x="0"
                          y="20"
                          fill="#fff"
                          transform="rotate(90 5,20)"
                        >{`x: ${Math.round(x)}`}</text>
                        <text
                          x="0"
                          y="5"
                          fill="#fff"
                          transform="rotate(90 5,20)"
                        >{`value: ${data.value}`}</text>
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
