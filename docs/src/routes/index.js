// @flow weak
/* eslint global-require: 0 */

import Home from './Home';
import AppFrame from '../components/AppFrame';
import AnimateDocs from './documentation/Animate';
import NodeGroupDocs from './documentation/NodeGroup';
import TickGroupDocs from './documentation/TickGroup';
import store, { injectReducer } from '../store';
import Simple from './examples/Simple';
import PieCharts from './examples/PieCharts';

const docContext = require.context('!raw-loader!./documentation', true);
const srcContext = require.context('!raw-loader!../../../src', true);
const exampleContext = require.context('!raw-loader!./examples', true);

const routes = {
  path: '/',
  component: AppFrame,
  indexRoute: {
    title: null,
    component: Home,
    dockDrawer: true,
  },
  childRoutes: [
    {
      path: 'documentation',
      indexRoute: {
        onEnter(nextState, replace) {
          replace('/documentation/node-group');
        },
      },
      childRoutes: [
        {
          path: '/documentation/animate',
          docContext,
          srcContext,
          component: AnimateDocs,
        },
        {
          path: '/documentation/node-group',
          docContext,
          srcContext,
          component: NodeGroupDocs,
        },
        {
          path: '/documentation/tick-group',
          docContext,
          srcContext,
          component: TickGroupDocs,
        },
      ],
    },
    {
      path: 'documentation',
      indexRoute: {
        onEnter(nextState, replace) {
          replace('/examples/pie-charts');
        },
      },
      childRoutes: [
        {
          path: '/examples/simple',
          exampleContext,
          component: Simple,
        },
        {
          path: '/examples/pie-charts',
          exampleContext,
          component: PieCharts,
        },
      ],
    },
    {
      path: 'redux-examples',
      indexRoute: {
        onEnter(nextState, replace) {
          replace('/redux-examples/alphabet');
        },
      },
      childRoutes: [
        require('./reduxExamples/alphabet').default(store, injectReducer),
        require('./reduxExamples/statesByAge').default(store, injectReducer),
        require('./reduxExamples/packedByAge').default(store, injectReducer),
        require('./reduxExamples/stackedArea').default(store, injectReducer),
        require('./reduxExamples/alluvialChart').default(store, injectReducer),
        require('./reduxExamples/webpackSunburst').default(store, injectReducer),
      ],
    },
  ],
};

export default routes;
