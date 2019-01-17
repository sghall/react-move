// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Link from 'react-router/lib/Link'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Logo from './Logo'

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
      <Grid item xs={4} className={classes.root}>
        <Logo />
      </Grid>
      <Grid item xs={12} className={classes.root}>
        <Typography variant="h5">React Compound Slider</Typography>
      </Grid>
      <Grid item xs={12} className={classes.root}>
        <Button
          component={Link}
          variant="outlined"
          to="/slider-demos/horizontal"
        >
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
