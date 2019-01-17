// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import pink from '@material-ui/core/colors/pink'
import deepOrange from '@material-ui/core/colors/deepOrange'
import { lightTheme, darkTheme, setPrismTheme } from '../utils/prism'
import AppRouter from './AppRouter'

function AppContainer(props) {
  const { dark } = props

  const theme = createMuiTheme({
    typography: {
      suppressWarning: true,
    },
    palette: {
      primary: pink,
      secondary: grey,
      accent: deepOrange,
      type: dark ? 'dark' : 'light',
    },
  })

  /* eslint-disable-next-line */
  console.log('theme: ', theme)

  if (dark) {
    setPrismTheme(darkTheme)
  } else {
    setPrismTheme(lightTheme)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  )
}

AppContainer.propTypes = {
  dark: PropTypes.bool.isRequired,
}

const ConnectedApp = connect(state => ({ dark: state.dark }))(AppContainer)

function App() {
  return <ConnectedApp />
}

export default App
