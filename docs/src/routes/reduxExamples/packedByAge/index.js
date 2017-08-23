// @flow weak
/* eslint global-require: "off" */

import { EXAMPLE_STORE_KEY } from './module/constants';

export default (store, injectReducer) => ({
  path: `/redux-examples/${EXAMPLE_STORE_KEY}`,
  getComponent(nextState, cb) {
    const Example = require('./components').default;
    const reducer = require('./module').default;

    injectReducer(store, { key: EXAMPLE_STORE_KEY, reducer });
    cb(null, Example);
  },
});
