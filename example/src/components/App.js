import React from 'react'

import './App.css'
import { save } from '../lib/saveActionCreators'
import store from '../lib/store'
import Breadcrumbs, { NavLink, reset } from '../../../dist'

function handleSave () {
  const { breadcrumb } = store.getState()
  store.dispatch(save(breadcrumb))
}

function handleLoad () {
  const { state } = store.getState()
  store.dispatch(reset(state))
}

function handleReset () {
  store.dispatch(reset())
}

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
          <li className='pull-right'>
            Breadcrumb State:
            <button className='btn-link' onClick={handleSave}>Save</button>
            <button className='btn-link' onClick={handleLoad}>Load</button>
            <button className='btn-link' onClick={handleReset}>Reset</button>
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
