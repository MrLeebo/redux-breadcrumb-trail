import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router'

import App from './App'
import Home from './Home'

import Product from './Product'
import ProductBreadcrumb from './ProductBreadcrumb'
import Products from './Products'
import SummaryTab from './SummaryTab'
import DetailTab from './DetailTab'

import Location from './Location'
import LocationBreadcrumb from './LocationBreadcrumb'
import Locations from './Locations'

import Friends from './Friends'
import FriendsBreadcrumb from './FriendsBreadcrumb'

export default function Routes () {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} breadcrumb={<i className='fa fa-home' />} />

        <Route path='products' component={Products} breadcrumb='Products' />
        <Route path='products/:id' component={Product} breadcrumb={ProductBreadcrumb}>
          <IndexRedirect to='summary' />
          <Route path='summary' component={SummaryTab} useParentBreadcrumb />
          <Route path='detail' component={DetailTab} useParentBreadcrumb />
        </Route>

        <Route path='locations' component={Locations} breadcrumb='Locations' />
        <Route path='locations/:id' component={Location} breadcrumb={LocationBreadcrumb} />

        <Route path='friends/:id' component={Friends} breadcrumb={FriendsBreadcrumb} />
      </Route>
    </Router>
  )
}
