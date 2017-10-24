// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import CodeExample from 'docs/src/components/CodeExample';
import DonutChart1 from './DonutChart1';

const Example = (props) => {
  const { route: { exampleContext } } = props;

  return (
    <div>
      <CodeExample
        code={exampleContext('./PieCharts/DonutChart1')}
        title="Example 1: Donut Chart"
      >
        <DonutChart1 />
      </CodeExample>
    </div>
  );
};

Example.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Example;
