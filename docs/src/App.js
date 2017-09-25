// @flow weak

import React from 'react';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import routes from './routes';

export default () => {
  return (
    <Router
      history={useRouterHistory(createHashHistory)()}
      onUpdate={() => window.scrollTo(0, 0)}
    >
      {routes}
    </Router>
  );
};
