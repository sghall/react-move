// @flow

import React from 'react'
import {
  applyRouterMiddleware,
  useRouterHistory,
  Router,
  Route,
  IndexRoute,
} from 'react-router'
import { createHashHistory } from 'history'
import { useScroll } from 'react-router-scroll'
import { titleize } from 'docs/src/utils/helpers'
import AppFrame from 'docs/src/components/AppFrame'
import AppContent from 'docs/src/components/AppContent'
import MarkdownDocs from 'docs/src/components/MarkdownDocs'
import ComponentDoc from 'docs/src/components/ComponentDoc'
import Home from 'docs/src/pages/Home'
import {
  requireMarkdown,
  requireDemo,
  demo,
  srcContext,
} from 'docs/src/components/files'

export default function AppRouter() {
  return (
    <Router
      history={useRouterHistory(createHashHistory)()}
      render={applyRouterMiddleware(useScroll())}
    >
      <Route title="React Move" path="/" component={AppFrame}>
        <IndexRoute dockDrawer component={Home} title={null} />
        <Route
          title="Getting Started"
          path="/getting-started"
          component={AppContent}
          nav
        >
          <Route
            title="Installation"
            path="/getting-started/installation"
            content={requireMarkdown('./getting-started/installation.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Features"
            path="/getting-started/features"
            content={requireMarkdown('./getting-started/features.md')}
            component={MarkdownDocs}
            nav
          />
        </Route>
        <Route
          title="Component API"
          path="/component-api"
          component={AppContent}
          nav
        >
          <Route
            title="NodeGroup"
            path="/component-api/node-group"
            code={srcContext('./createNodeGroup/index')}
            content={requireMarkdown('./component-api/node-group.md')}
            component={ComponentDoc}
            nav
          />
          <Route
            title="Animate"
            path="/component-api/animate"
            code={srcContext('./createAnimate/index')}
            content={requireMarkdown('./component-api/animate.md')}
            component={ComponentDoc}
            nav
          />
        </Route>
        <Route title="Demos" path="/demos" component={AppContent} nav>
          {demo.map(d => {
            return (
              <Route
                key={d.name}
                title={titleize(d.name)}
                path={`/demos/${d.name}`}
                content={requireDemo(d.path)}
                component={MarkdownDocs}
                demo={d}
                nav
              />
            )
          })}
        </Route>
      </Route>
    </Router>
  )
}
