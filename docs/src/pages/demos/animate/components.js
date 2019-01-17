// @flow weak

import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

// *******************************************************
// RAIL COMPONENT
// *******************************************************

const railStyle = theme => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: 14,
    borderRadius: 7,
    cursor: 'pointer',
    backgroundColor: theme.palette.grey[500],
  },
})

function RailComponent({ classes, getRailProps }) {
  return <div className={classes.root} {...getRailProps()} />
}

RailComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  getRailProps: PropTypes.func.isRequired,
}

export const Rail = withStyles(railStyle)(RailComponent)

// *******************************************************
// HANDLE COMPONENT
// *******************************************************

const handleStyle = theme => ({
  root: {
    position: 'absolute',
    marginLeft: '-11px',
    marginTop: '-6px',
    zIndex: 2,
    width: 24,
    height: 24,
    cursor: 'pointer',
    borderRadius: '50%',
    boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
    border: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
})

function HandleComponent({
  divOrButton: Comp,
  domain: [min, max],
  handle: { id, value, percent },
  classes,
  getHandleProps,
}) {
  return (
    <Comp
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      className={classes.root}
      style={{ left: `${percent}%` }}
      {...getHandleProps(id)}
    />
  )
}

HandleComponent.propTypes = {
  divOrButton: PropTypes.oneOf(['div', 'button']).isRequired,
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  getHandleProps: PropTypes.func.isRequired,
}

HandleComponent.defaultProps = {
  divOrButton: 'div',
}

export const Handle = withStyles(handleStyle)(HandleComponent)

// *******************************************************
// TRACK COMPONENT
// *******************************************************

const trackStyle = theme => ({
  root: {
    position: 'absolute',
    height: 14,
    zIndex: 1,
    borderRadius: 7,
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main,
  },
})

function TrackComponent({ classes, source, target, getTrackProps }) {
  return (
    <div
      className={classes.root}
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
}

TrackComponent.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  getTrackProps: PropTypes.func.isRequired,
}

export const Track = withStyles(trackStyle)(TrackComponent)

// *******************************************************
// TICK COMPONENT
// *******************************************************

const tickStyle = theme => ({
  tick: {
    position: 'absolute',
    marginTop: 14,
    width: 1,
    height: 5,
    backgroundColor: theme.palette.text.primary,
  },
  label: {
    position: 'absolute',
    marginTop: 22,
    textAlign: 'center',
  },
})

export function TickComponent({ classes, tick, count, format }) {
  return (
    <div>
      <div className={classes.tick} style={{ left: `${tick.percent}%` }} />
      <Typography
        className={classes.label}
        style={{
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </Typography>
    </div>
  )
}

TickComponent.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired,
}

TickComponent.defaultProps = {
  format: d => d,
}

export const Tick = withStyles(tickStyle)(TickComponent)
