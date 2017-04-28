import React from 'react'
import './App.css'
import Breadcrumbs, { NavLink } from '../../../dist'

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
            <a className='btn btn-default' href='https://github.com/MrLeebo/redux-breadcrumb-trail' target='_blank'>
              <i className='fa fa-github' />
            </a>
          </li>
        </ul>
      </div>
      <div className='container'>
        <div>
          <Breadcrumbs
            className='list-inline'
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
