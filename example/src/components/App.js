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
