import React from 'react'
import fetched from './fetched'
import breadcrumbify from '../../../dist/breadcrumbify'

export function ProductBreadcrumb ({fetch}) {
  if (!fetch.current) return <div><i className='fa fa-refresh fa-spin' /></div>
  return <span><i>{fetch.current.name}</i> <span className='label label-success'><i className='fa fa-usd' /> {fetch.current.price}</span></span>
}

export default fetched(breadcrumbify(ProductBreadcrumb))
