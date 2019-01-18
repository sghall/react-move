// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Link from 'react-router/lib/Link'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import logo from './logo-react-move.png'

const styles = () => ({
  root: {
    marginTop: 30,
    textAlign: 'center',
  },
})

function Home(props) {
  const classes = props.classes

  return (
    <Grid container alignItems="center" justify="space-around">
      <Grid item xs={10} className={classes.root}>
        <img
          style={{ marginLeft: '10%' }}
          width="80%"
          src={logo}
          alt="react-move"
        />
      </Grid>
      <Grid item xs={12} className={classes.root}>
        <Button component={Link} variant="outlined" to="/demos/node-group">
          Demos
        </Button>
      </Grid>
    </Grid>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)
