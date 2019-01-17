// @flow weak

import React from 'react'
import PropTypes from 'prop-types'

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
export function Handle({
  divOrButton: Comp,
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps,
}) {
  return (
    <Comp
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        top: `${percent}%`,
        position: 'absolute',
        marginLeft: -6,
        marginTop: -12,
        zIndex: 2,
        width: 24,
        height: 24,
        cursor: 'pointer',
        border: 0,
        borderRadius: '50%',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#ffc400',
      }}
      {...getHandleProps(id)}
    />
  )
}

Handle.propTypes = {
  divOrButton: PropTypes.oneOf(['div', 'button']).isRequired, // using button allows for keyboard events
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
}

Handle.defaultProps = {
  divOrButton: 'div',
}

// *******************************************************
// TRACK COMPONENT
// *******************************************************
export function Track({ source, target, getTrackProps }) {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#b28900',
        borderRadius: 7,
        cursor: 'pointer',
        width: 14,
        marginLeft: -1,
        top: `${source.percent}%`,
        height: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
}

Track.propTypes = {
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
  getTrackProps: PropTypes.func.isRequired,
}

// *******************************************************
// TICK COMPONENT
// *******************************************************
export function Tick({ tick, format }) {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: -0.5,
          marginLeft: 10,
          height: 1,
          width: 6,
          backgroundColor: 'rgb(200,200,200)',
          top: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: -5,
          marginLeft: 20,
          fontSize: 10,
          top: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  )
}

Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  format: PropTypes.func.isRequired,
}

Tick.defaultProps = {
  format: d => d,
}
