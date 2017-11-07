import React from 'react'
import { breadcrumbify } from 'redux-breadcrumb-trail'
import { connect } from 'react-redux'
import { mapProps } from './Location'

export function LocationBreadcrumb ({place}) {
  if (!place) return <div><i className='fa fa-refresh fa-spin' /></div>
  return <i>{place.name}</i>
}

export default connect(mapProps)(breadcrumbify(LocationBreadcrumb))
