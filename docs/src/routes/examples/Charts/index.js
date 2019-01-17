// @flow weak

import React from 'react'
import PropTypes from 'prop-types'
import CodeExample from 'docs/src/components/CodeExample'
import DonutChart1 from './DonutChart1'
import DonutChart2 from './DonutChart2'

const Example = (props) => {
  const { route: { exampleContext } } = props

  return (
    <div>
      <CodeExample
        code={exampleContext('./Charts/DonutChart1')}
        title="Example 1: Donut Chart"
      >
        <DonutChart1 />
      </CodeExample>
      <CodeExample
        code={exampleContext('./Charts/DonutChart2')}
        title="Example 2: Donut Chart w/ Entering/Leaving"
      >
        <DonutChart2 />
      </CodeExample>
    </div>
  )
}

Example.propTypes = {
  route: PropTypes.object.isRequired,
}

export default Example
