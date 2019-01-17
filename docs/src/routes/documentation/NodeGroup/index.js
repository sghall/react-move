// @flow weak

import React from 'react'
import PropTypes from 'prop-types'
import CodeExample from 'docs/src/components/CodeExample'
import MarkdownElement from 'docs/src/components/MarkdownElement'
import PropTypeDescription from 'docs/src/components/PropTypeDescription'
import Example1 from './Example1'
import Example2 from './Example2'

const NodeGroupDocs = (props) => {
  const { route: { docContext, srcContext } } = props

  return (
    <div>
      <MarkdownElement text={docContext('./NodeGroup/README0.md')} />
      <PropTypeDescription code={srcContext('./NodeGroup/NodeGroup')} />
      <CodeExample
        code={docContext('./NodeGroup/Example1')}
        title="Example: Simple Bars"
      >
        <Example1 />
      </CodeExample>
      <CodeExample
        code={docContext('./NodeGroup/Example2')}
        title="Example: HTML"
      >
        <Example2 />
      </CodeExample>
      <MarkdownElement text={docContext('./NodeGroup/README1.md')} />
    </div>
  )
}

NodeGroupDocs.propTypes = {
  route: PropTypes.object.isRequired,
}

export default NodeGroupDocs
