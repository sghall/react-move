// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MarkdownElement from 'docs/src/components/MarkdownElement'
import Demo from 'docs/src/components/Demo'

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

const headerRegexp = /---\n(.*)\n---/
const demoRegexp = /^demo='(.*)'$/
const emptyRegexp = /^\s*$/

function MarkdownDocs(props) {
  const { classes } = props

  const contents = props.content.default
    .replace(headerRegexp, '') // Remove header information
    .split(/^{{|}}$/gm) // Split markdown into an array, separating demos
    .filter(content => !emptyRegexp.test(content)) // Remove empty lines

  return (
    <div className={classes.root}>
      {contents.map(content => {
        if (demoRegexp.test(content)) {
          return <Demo key={content} demo={content.match(demoRegexp)[1]} />
        }

        return <MarkdownElement key={content} text={content} />
      })}
    </div>
  )
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
}

export default withStyles(styles)(MarkdownDocs)
