import { AppContainer } from 'react-hot-loader'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const docs = (state = { dark: false }, action) => {
  if (action.type === 'TOGGLE_THEME_SHADE') {
    return Object.assign({}, state, { dark: !state.dark })
  }
  return state
}

const store = createStore(docs)
const rootEl = document.querySelector('#app')

const render = Component => {
  ReactDOM.render(
    <AppContainer
      errorReporter={({ error }) => {
        throw error
      }}
    >
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl,
  )
}

render(App)

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default // eslint-disable-line global-require
    render(NextApp)
  })
}
