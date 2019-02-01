// example from https://bl.ocks.org/mbostock/3885705

import React, { PureComponent } from 'react'
import { NodeGroup } from 'react-move'
import Surface from 'docs/src/components/Surface' // this is just a responsive SVG
import { scaleLinear, scaleBand } from 'd3-scale'
import { easeExpInOut } from 'd3-ease'
import { ascending, max } from 'd3-array'

// **************************************************
//  SVG Layout
// **************************************************
const view = [1000, 450] // [width, height]
const trbl = [10, 10, 30, 10] // [top, right, bottom, left] margins

const dims = [ // Adjusted dimensions [width, height]
  view[0] - trbl[1] - trbl[3],
  view[1] - trbl[0] - trbl[2],
]

// **************************************************
//  Mock Data
// **************************************************
const letters = [
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02780 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02022 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06973 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00747 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02517 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00098 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06333 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.01037 },
  { letter: 'W', frequency: 0.02465 },
  { letter: 'X', frequency: 0.00150 },
  { letter: 'Y', frequency: 0.01971 },
  { letter: 'Z', frequency: 0.00074 },
]

const y = scaleLinear()
  .range([dims[1], 0])
  .domain([0, max(letters, (d) => d.frequency)])

class Example extends PureComponent {
  state = {
    sortAlpha: true,
  }

  update = () => {
    this.setState((state) => ({
      sortAlpha: !state.sortAlpha,
    }))
  }

  render() {
    const { sortAlpha } = this.state

    const sorted = letters.sort(sortAlpha ?
      (a, b) => ascending(a.letter, b.letter) :
      (a, b) => b.frequency - a.frequency,
    ).slice(0)

    const scale = scaleBand()
      .rangeRound([0, dims[0]])
      .domain(sorted.map((d) => d.letter))
      .padding(0.1)

    const width = scale.bandwidth()

    return (
      <div style={{ width: '100%' }}>
        <button onClick={this.update}>
          {`Sort ${sortAlpha ? 'Value' : 'Alpha'}`}
        </button>
        <Surface view={view} trbl={trbl}>
          <NodeGroup
            data={sorted}
            keyAccessor={(d) => d.letter}

            start={() => ({
              opacity: 1e-6,
              x: 1e-6,
            })}

            enter={(d) => ({
              opacity: [0.7],
              x: [scale(d.letter)],
              timing: { duration: 750, ease: easeExpInOut },
            })}

            update={(d, i) => ({
              opacity: [0.7],
              x: [scale(d.letter)],
              timing: { duration: 750, delay: i * 50, ease: easeExpInOut },
            })}

            leave={() => ({
              opacity: [1e-6],
              x: [scale.range()[1]],
              timing: { duration: 750, ease: easeExpInOut },
            })}
          >
            {(nodes) => (
              <g>
                {nodes.map(({ key, data, state: { x, opacity } }) => (
                  <g key={key} transform={`translate(${x},0)`}>
                    <rect
                      height={dims[1] - y(data.frequency)}
                      y={y(data.frequency)}
                      fill="#ff69b4"
                      width={width}
                      opacity={opacity}
                    />
                    <text
                      x={scale.bandwidth() / 2}
                      y={dims[1] + 15}
                      dx="-.35em"
                      fill="#dadada"
                    >{data.letter}</text>
                  </g>
                ))}
              </g>
            )}
          </NodeGroup>
        </Surface>
      </div>
    )
  }
}

export default Example
