[![Build Status](https://travis-ci.org/MrLeebo/redux-breadcrumb-trail.svg?branch=master)](https://travis-ci.org/MrLeebo/redux-breadcrumb-trail) [![dependencies Status](https://david-dm.org/MrLeebo/redux-breadcrumb-trail/status.svg)](https://david-dm.org/MrLeebo/redux-supermodel) [![devDependencies Status](https://david-dm.org/MrLeebo/redux-breadcrumb-trail/dev-status.svg)](https://david-dm.org/MrLeebo/redux-supermodel?type=dev)

# redux-breadcrumb-trail

This is a Breadcrumb component for react, redux, and react-router v3 that supports a stack-based trail that follows your actual navigation through the application. Ordinarily breadcrumb components work by tracing your static `<Routes>` layout.

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

|prop|type|description|
|breadcrumb|any valid React node, or a function|The label that appears in the breadcrumb component when the route is part of it. All of your routes should contain either "breadcrumb" or "useParentBreadcrumb"|
|breadcrumbKey|string|Routes that share a breadcrumbKey will automatically "pop back" on each other. Defaults to "path"|
|userParentBreadcrumb|bool|This route is kept out of the breadcrumb and its parent is updated instead. Useful for tabbed interfaces or other nested route structures where you don't want the child routes to be part of the breadcrumb|

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

#### Similar Projects

- [react-breadcrumbs](https://github.com/svenanders/react-breadcrumbs)

#### Contributing

After cloning, use `npm install` to install dev dependencies. You can run tests with `npm test` and build with `npm run build`. Launch the example site with `cd example` and `npm start`.

If you would like to contribute, please follow the coding style by installed [standard](https://github.com/feross/standard) `npm i -g standard` and running `standard --fix` before opening your pull request.
