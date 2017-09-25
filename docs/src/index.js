// @flow weak

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

// debugging
window.React = React;

ReactDOM.render(
  <AppContainer errorReporter={({ error }) => { throw error; }}>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('app'),
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line global-require

    ReactDOM.render(
      <AppContainer errorReporter={({ error }) => { throw error; }}>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById('app'),
    );
  });
}
