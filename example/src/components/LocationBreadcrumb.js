import React from 'react'
import fetched from './fetched'
import breadcrumbify from '../../../dist/breadcrumbify'

export function LocationBreadcrumb ({fetch}) {
  if (!fetch.current) return <div><i className='fa fa-refresh fa-spin' /></div>
  return <i>{fetch.current.name}</i>
}

export default fetched(breadcrumbify(LocationBreadcrumb))
