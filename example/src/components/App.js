import React from 'react'
import Breadcrumbs, { NavLink } from 'redux-breadcrumb-trail'
import BreadcrumbStateItem from './BreadcrumbStateItem'
import './App.css'

export default function App (props) {
  const {children, routes, params, location} = props

  return (
    <div className='App'>
      <div className='App-header'>
        <ul className='list-inline'>
          <li><NavLink to='/products'>Products</NavLink></li>
          <li><NavLink to='/locations'>Locations</NavLink></li>
          <li><NavLink to='/friends/0'>Friends</NavLink></li>
          <li className='pull-right'>
            <a
              className='btn btn-default'
              href='https://github.com/MrLeebo/redux-breadcrumb-trail'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fa fa-github' />
            </a>
          </li>
          <BreadcrumbStateItem />
        </ul>
      </div>
      <div className='container'>
        <div>
          <Breadcrumbs
            className='list-inline'
            separatorRenderer={<i className='fa fa-caret-right' />}
            routes={routes}
            params={params}
            location={location}
          />
        </div>

        {children}
      </div>
    </div>
  )
}
