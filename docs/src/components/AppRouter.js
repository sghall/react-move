import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  IndexRoute,
  Switch,
} from 'react-router-dom'
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

export function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <AppFrame>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/getting-started/installation">
                <MarkdownDocs
                  content={requireMarkdown('./getting-started/installation.md')}
                />
              </Route>
              <Route path="/getting-started/features">
                <MarkdownDocs
                  content={requireMarkdown('./getting-started/features.md')}
                />
              </Route>
              <Route path="/component-api/node-group">
                <ComponentDoc
                  code={srcContext('./NodeGroup/index')}
                  content={requireMarkdown('./component-api/node-group.md')}
                />
              </Route>
              <Route path="/component-api/animate">
                <ComponentDoc
                  code={srcContext('./Animate/index')}
                  content={requireMarkdown('./component-api/animate.md')}
                />
              </Route>
              {demo.map(d => {
                return (
                  <Route key={d.name} path={`/demos/${d.name}`}>
                    <MarkdownDocs content={requireDemo(d.path)} />
                  </Route>
                )
              })}
            </Switch>
          </AppFrame>
        </Route>
      </Switch>
    </Router>
  )
}

{
  /* <Route title="React Move" path="/" component={AppFrame}>
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
    title="Getting Started"
    path="/getting-started/getting-started"
    content={requireMarkdown('./getting-started/getting-started.md')}
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

    component={ComponentDoc}
    nav
  />
  <Route
    title="Animate"
    path="/component-api/animate"
    code={srcContext('./Animate/index')}
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
</Route> */
}
