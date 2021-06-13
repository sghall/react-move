// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import PropsDescription from 'docs/src/components/PropsDescription'
import MarkdownElement from 'docs/src/components/MarkdownElement'

const styles = {
  root: {
    marginBottom: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
}

function ComponentDoc({ classes, code, content }) {
  return (
    <div className={classes.root}>
      <MarkdownElement text={content.default} />
      <PropsDescription code={code.default} />
    </div>
  )
}

ComponentDoc.propTypes = {
  classes: PropTypes.object.isRequired,
  code: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
}

export default withStyles(styles)(ComponentDoc)
