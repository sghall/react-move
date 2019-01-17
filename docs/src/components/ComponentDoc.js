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

function ComponentDoc({ classes, route: { code, content } }) {
  return (
    <div className={classes.root}>
      <MarkdownElement text={content} />
      <PropsDescription code={code} />
    </div>
  )
}

ComponentDoc.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.shape({
    code: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
}

export default withStyles(styles)(ComponentDoc)
