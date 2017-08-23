// @flow weak

import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import makeRootReducer from './reducers';
import { updateLocation } from './location';

export default (initialState = {}) => {
  const middleware = [thunk];
  const reduxTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line

  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== 'production') {
    if (reduxTools && typeof reduxTools === 'function') {
      composeEnhancers = reduxTools;
    }
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  store.asyncReducers = {};
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};

