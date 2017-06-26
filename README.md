[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3d9ad329052c457491a7ceef50dce81f)](https://www.codacy.com/app/MrLeebo/redux-breadcrumb-trail?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MrLeebo/redux-breadcrumb-trail&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/MrLeebo/redux-breadcrumb-trail.svg?branch=master)](https://travis-ci.org/MrLeebo/redux-breadcrumb-trail) [![dependencies Status](https://david-dm.org/MrLeebo/redux-breadcrumb-trail/status.svg)](https://david-dm.org/MrLeebo/redux-breadcrumb-trail) [![devDependencies Status](https://david-dm.org/MrLeebo/redux-breadcrumb-trail/dev-status.svg)](https://david-dm.org/MrLeebo/redux-breadcrumb-trail?type=dev)

# redux-breadcrumb-trail

> This is a Breadcrumb component for react, redux, and react-router v3 that supports a stack-based trail that follows your actual navigation through the application. Ordinarily breadcrumb components work by tracing your static `<Routes>` layout. If your app contains a lot of side-navigation between un-nested pages, a dynamic stack-based breadcrumb can be useful to you.

[Check out the DEMO!](https://mrleebo.github.io/redux-breadcrumb-trail)

This is how it works:

- Normal site navigation using `<Link>` or `router.push('/about')` appends the new page to the breadcrumb trail
- Visiting a page that is already part of the breadcrumb will "pop back" to that position in the stack
- If you visit the same route but the params are different (e.g. `<Route path="/product/:id" />` for two different IDs) that would be two different pages
- You can reset the breadcrumb for top-level navigation events by replacing `<Link>` with `<NavLink>` from `redux-breadcrumb-trail` or by calling `router.push({ pathname: '/about', state: { breadcrumb: 'reset' } })`

## Install

This package is intended to be installed along with react-router v3, redux, and react-redux. So be sure you have those prerequisites installed as well.

```
npm install --save redux-breadcrumb-trail react-router@3.0.2 redux react-redux
```

## Getting Started

The goal of this package was to be able to be plugged into a pre-existing React application with minimal effort. You should be able to reuse all of your existing components and routes. If you are starting fresh, first set-up a working site with react-router v3 and react-redux, or use the example site in this repo as a guideline.

##### App.jsx

In your main App component or wherever you want the breadcrumb to appear, render `<Breadcrumbs routes={routes} params={params} location={location} />` where routes, params, and location are all the props from `react-router` with the same names.

```js
import React from 'react'
import Breadcrumbs, { NavLink } from 'redux-breadcrumb-trail'

export default function App (props) {
  const {children, routes, params, location} = props

  return (
    <div>
      <ul>
        <li><NavLink to='/products'>Products</NavLink></li>
        <li><NavLink to='/locations'>Locations</NavLink></li>
      </ul>

      <Breadcrumbs
        className='list-inline'
        routes={routes}
        params={params}
        location={location}
      />

      {children}
    </div>
  )
}
```

The `<Breadcrumbs />` component supports the following props:

| prop | type | description |
:---|:---|:---
| itemRenderer | function or react node | The container for each breadcrumb item. Default is `'li'` |
| listRenderer | function or react node | The container for the breadcrumb control. Default is `'ul'` |
| separatorRenderer | function or react node | The element to render in between each breadcrumb item. Default is `() => <li>&gt;</li>` |

Use the Renderer props to define a custom breadcrumb component that fits with your application's style.

##### store.js

Add the reducer to your redux store:

```js
import { createStore, combineReducers } from 'redux'
import { reducer as breadcrumb } from 'redux-breadcrumb-trail'

const rootReducer = combineReducers({ breadcrumb })
export default createStore(rootReducer)
```

##### Routes.js

In your `<Router>`, there are a number of new options for `<Route>` components:

| prop | type | description |
:---|:---|:---
| breadcrumb |any valid React node, [component cache entry](docs/ComponentCache.md), or a function | The label that appears in the breadcrumb component when the route is part of it. All of your routes should contain either "breadcrumb" or "useParentBreadcrumb" |
| breadcrumbKey |string |Routes that share a breadcrumbKey will automatically "pop back" on each other. Defaults to "path" |
| useParentBreadcrumb |bool |This route is kept out of the breadcrumb and its parent is updated instead. Useful for tabbed interfaces or other nested route structures where you don't want the child routes to be part of the breadcrumb |
| ignoreParams |bool |Ignores params when matching the route to previous breadcrumbs. With this prop set to `true`, "//products//:id" would consider "//products//1" and "//products//2" to be a match. Defaults to `false` |

```js
<Router history={history}>
  <Route path='/' component={App}>
    {/* The breadcrumb can be any React node */}
    <IndexRoute component={Home} breadcrumb={<i className='fa fa-home' />} />

    {/* Components can also be used and will receive the route params as props */}
    <Route path='products' component={Products} breadcrumb='Products' />

    {/* Example of a tabbed interface with child routes ignored */}
    <Route path='products/:id' component={Product} breadcrumb={ProductBreadcrumb}>
      <IndexRedirect to='summary' />
      <Route path='summary' component={SummaryTab} useParentBreadcrumb />
      <Route path='detail' component={DetailTab} useParentBreadcrumb />
    </Route>

    <Route path='locations' component={Locations} breadcrumb='Locations' />
    <Route path='locations/:id' component={Location} breadcrumb={LocationBreadcrumb} />
  </Route>
</Router>
```

##### Custom/Dynamic Breadcrumb Components

Static breadcrumb text can only get you so far. Eventually, you are going to want to populate a breadcrumb with dynamic text that you have retrieved from your redux store or from some other module. It would be nice to be able to reuse your redux `connect(mapStateToProps)` code that you already have in place to render your page if the breadcrumb is going to be accessing the same state. However, breadcrumb components are different from page components because they tend to stick around after the page has been unmounted. And sometimes your redux store has state that gets shared by lots of pages in your app. So how can you connect your custom breadcrumb component using the same connector as your page without all that global state getting corrupted as soon as you visit a neighboring page? Just `breadcrumbify` your component after applying the connector.

```js
// LocationBreadcrumb.jsx
import React from 'react'
import { connect } from 'react-redux'
import { breadcrumbify } from 'redux-breadcrumb-trail'

export function LocationBreadcrumb ({location}) {
  if (!location.current) return <div><i className='fa fa-refresh fa-spin' /></div>
  return <i>{location.current.name}</i>
}

export function mapStateToProps(state) {
  return { location: state.location }
}

export default connect(mapStateToProps)(breadcrumbify(LocationBreadcrumb))
```

`breadcrumbify` is a higher-order component that renders like normal while the breadcrumb is active and then "freezes" the props when the breadcrumb becomes inactive. It does so by caching the component's props into the component state.

##### Action Creators

**redux-breadcrumb-trail** exports its action creators, giving you direct access to its redux state. This way you can build your own custom breadcrumb controls on top.

| actionCreator | description |
| push({location, params, routes}) | Pushes a new breadcrumb onto the stack. The props should be the corresponding `react-router` props for the route you want to push. |
| reset({breadcrumbs}) | Reset the breadcrumbs to a defined state. The safest way to use this is probably to copy the existing redux state and mutate it to suit your needs. |

#### Similar Projects

- [react-breadcrumbs](https://github.com/svenanders/react-breadcrumbs)

#### Contributing

After cloning, use `npm install` to install dev dependencies. You can run tests with `npm test` and build with `npm run build`. Launch the example site with `cd example` and `npm start`.

If you would like to contribute, please follow the coding style by installed [standard](https://github.com/feross/standard) `npm i -g standard` and running `standard --fix` before opening your pull request.
