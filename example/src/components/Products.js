import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { fetchProducts, reset } from '../lib/fetchActionCreators'

export class Products extends Component {
  componentDidMount () {
    fetchProducts(this.props.dispatch)()
  }

  componentWillUnmount () {
    this.props.dispatch(reset())
  }

  render () {
    const { products } = this.props
    if (!products) {
      return <h2>Loading...</h2>
    }

    return (
      <div>
        <h2>Products</h2>
        <ul className='list-inline'>
          {products.map(({id, name}) => <li key={id}><Link to={`/products/${id}/summary`}>{name}</Link></li>)}
        </ul>
      </div>
    )
  }
}

export default connect(({fetch}) => ({ products: fetch.products }))(Products)
