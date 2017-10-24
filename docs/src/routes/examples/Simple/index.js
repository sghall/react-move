// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import CodeExample from 'docs/src/components/CodeExample';
import Toggle from './Toggle';
import Bars1 from './Bars1';
import Bars2 from './Bars2';
import Bars3 from './Bars3';
import Circles from './Circles';

const Example = (props) => {
  const { route: { exampleContext } } = props;

  return (
    <div>
      <iframe
        title="Draggable List"
        src="https://codesandbox.io/embed/j2povnz8ly"
        style={{ width: '100%', height: '500px', border: 0, borderRadius: 4, overflow: 'hidden' }}
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
      <CodeExample
        code={exampleContext('./Simple/Toggle')}
        title="Example 1: Basic Toggle"
      >
        <Toggle />
      </CodeExample>
      <CodeExample
        code={exampleContext('./Simple/Bars1')}
        title="Example 2: Simple Bars"
      >
        <Bars1 />
      </CodeExample>
      <CodeExample
        code={exampleContext('./Simple/Bars2')}
        title="Example 3: Bars w/ More Complex Timing"
      >
        <Bars2 />
      </CodeExample>
      <CodeExample
        code={exampleContext('./Simple/Bars3')}
        title="Example 4: Passing Arrays of Transitions"
      >
        <Bars3 />
      </CodeExample>
      <CodeExample
        code={exampleContext('./Simple/Circles')}
        title="Example 5: Namespacing State"
      >
        <Circles />
      </CodeExample>
    </div>
  );
};

Example.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Example;
