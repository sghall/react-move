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
import Tutorial from 'docs/src/pages/getting-started/Tutorial'
import {
  requireMarkdown,
  requireSliderDemo,
  sliderDemo,
  srcContext,
} from 'docs/src/components/files'

export default function AppRouter() {
  return (
    <Router
      history={useRouterHistory(createHashHistory)()}
      render={applyRouterMiddleware(useScroll())}
    >
      <Route title="React Compound Slider" path="/" component={AppFrame}>
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
          <Route
            title="Tutorial"
            path="/getting-started/tutorial"
            component={Tutorial}
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
            title="Slider"
            path="/component-api/slider"
            code={srcContext('./NodeGroup/NodeGroup')}
            content={requireMarkdown('./component-api/slider.md')}
            component={ComponentDoc}
            nav
          />
          <Route
            title="Rail"
            path="/component-api/rail"
            code={srcContext('./Animate/Animate')}
            content={requireMarkdown('./component-api/rail.md')}
            component={ComponentDoc}
            nav
          />
        </Route>
        <Route
          title="Slider Demos"
          path="/slider-demos"
          component={AppContent}
          nav
        >
          {sliderDemo.map(demo => {
            return (
              <Route
                key={demo.name}
                title={titleize(demo.name)}
                path={`/slider-demos/${demo.name}`}
                content={requireSliderDemo(demo.path)}
                component={MarkdownDocs}
                demo={demo}
                nav
              />
            )
          })}
        </Route>
      </Route>
    </Router>
  )
}
