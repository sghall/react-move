import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  content: theme.mixins.gutters({
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
  }),
  [theme.breakpoints.up(948)]: {
    content: {
      maxWidth: 900,
    },
  },
})

function AppContent(props) {
  const { className, classes, children } = props

  return (
    <div className={classNames(classes.content, className)}>{children}</div>
  )
}

AppContent.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  route: PropTypes.object.isRequired,
}

export default withStyles(styles)(AppContent)
