// @flow weak
/* eslint global-require: 0 */

import Home from './Home';
import AppFrame from '../components/AppFrame';
import AnimateDocs from './documentation/Animate';
import NodeGroupDocs from './documentation/NodeGroup';
import Simple from './examples/Simple';
import Charts from './examples/Charts';
import DraggableList from './examples/DraggableList';

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
      ],
    },
    {
      path: 'examples',
      indexRoute: {
        onEnter(nextState, replace) {
          replace('/examples/pie-charts');
        },
      },
      childRoutes: [
        {
          path: '/examples/draggable-list',
          component: DraggableList,
        },
        {
          path: '/examples/simple',
          exampleContext,
          component: Simple,
        },
        {
          path: '/examples/charts',
          exampleContext,
          component: Charts,
        },
      ],
    },
  ],
};

export default routes;
