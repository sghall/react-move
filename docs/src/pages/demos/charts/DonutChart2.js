import { scaleOrdinal } from 'd3-scale'
import { arc, pie } from 'd3-shape'
import { shuffle } from 'd3-array'
import { easeExpOut } from 'd3-ease'
import sortBy from 'lodash/sortBy'
import Surface from 'docs/src/components/Surface'
import React, { PureComponent } from 'react'
import { NodeGroup } from 'react-move'

const colors = scaleOrdinal()
  .range(['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'])

// **************************************************
//  SVG Layout
// **************************************************
const view = [1000, 550] // [width, height]
const trbl = [10, 10, 10, 10] // [top, right, bottom, left] margins

const dims = [ // Adjusted dimensions [width, height]
  view[0] - trbl[1] - trbl[3],
  view[1] - trbl[0] - trbl[2],
]

const mockData = [
  {
    name: 'Linktype',
  }, {
    name: 'Quaxo',
  }, {
    name: 'Skynoodle',
  }, {
    name: 'Realmix',
  }, {
    name: 'Jetpulse',
  }, {
    name: 'Chatterbridge',
  }, {
    name: 'Riffpedia',
  }, {
    name: 'Layo',
  }, {
    name: 'Oyoba',
  },
]

const radius = (dims[1] / 2) * 0.70

const pieLayout = pie()
  .value((d) => d.value)
  .sort(null)

const innerArcPath = arc()
  .innerRadius(radius * 0.8)
  .outerRadius(radius * 1.0)

const outerArcPath = arc()
  .innerRadius(radius * 1.2)
  .outerRadius(radius * 1.2)

function mid(d) {
  return Math.PI > (d.startAngle + (d.endAngle - d.startAngle))
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - (min + 1))) + min
}

function getArcs() {
  const data = shuffle(mockData).slice(0, getRandom(5, 10))
    .map(({ name }) => ({ name, value: getRandom(10, 100) }))

  return pieLayout(sortBy(data, (d) => d.name))
}

class Example extends PureComponent {
  state = {
    arcs: getArcs(),
  }

  update = (e) => {
    e.preventDefault()
    e.stopPropagation()

    this.setState(() => ({
      arcs: getArcs(),
    }))
  }

  render() {
    const { arcs } = this.state

    return (
      <div>
        <button onClick={this.update}>
          Update
        </button>
        <Surface view={view} trbl={trbl}>
          <g transform={`translate(${dims[0] / 2}, ${dims[1] / 2})`}>
            <NodeGroup
              data={arcs}
              keyAccessor={(d) => d.data.name}

              start={({ startAngle }) => ({
                startAngle,
                endAngle: startAngle,
              })}

              enter={({ endAngle }) => ({
                endAngle: [endAngle],
                timing: { duration: 1000, delay: 350, ease: easeExpOut },
              })}

              update={({ startAngle, endAngle }) => ({
                startAngle: [startAngle],
                endAngle: [endAngle],
                timing: { duration: 350, ease: easeExpOut },
              })}
            >
              {(nodes) => {
                return (
                  <g>
                    {nodes.map(({ key, data, state }) => {
                      const p1 = outerArcPath.centroid(state)
                      const p2 = [
                        mid(state) ? p1[0] + (radius * 0.5) : p1[0] - (radius * 0.5),
                        p1[1],
                      ]
                      return (
                        <g key={key}>
                          <path
                            d={innerArcPath(state)}
                            fill={colors(data.data.name)}
                            opacity={0.9}
                          />
                          <text
                            dy="4px"
                            fontSize="12px"
                            fill="#fff"
                            transform={`translate(${p2.toString()})`}
                            textAnchor={mid(state) ? 'start' : 'end'}
                          >{data.data.name}</text>
                          <polyline
                            fill="none"
                            stroke="rgba(255,255,255,0.5)"
                            points={`${innerArcPath.centroid(state)},${p1},${p2.toString()}`}
                          />
                        </g>
                      )
                    })}
                  </g>
                )
              }}
            </NodeGroup>
          </g>
        </Surface>
      </div>
    )
  }
}

export default Example

