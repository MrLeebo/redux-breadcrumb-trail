import React from 'react'
import { breadcrumbify } from 'redux-breadcrumb-trail'
import { connect } from 'react-redux'
import { mapProps } from './Product'

export function ProductBreadcrumb ({product}) {
  if (!product) return <div><i className='fa fa-refresh fa-spin' /></div>
  return <span><i>{product.name}</i> <span className='label label-success'><i className='fa fa-usd' /> {product.price}</span></span>
}

export default connect(mapProps)(breadcrumbify(ProductBreadcrumb))
