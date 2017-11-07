import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { fetchProduct, reset } from '../lib/fetchActionCreators'

export class Product extends Component {
  componentDidMount () {
    const { dispatch, params: { id } } = this.props
    fetchProduct(dispatch)({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { dispatch, params: { id } } = nextProps
    if (this.props.params.id !== id) {
      fetchProduct(dispatch)({ id })
    }
  }

  componentWillUnmount () {
    this.props.dispatch(reset())
  }

  render () {
    const {children, product, params} = this.props
    if (!product) return <div>Loading...</div>

    const { name, price, description } = product
    return (
      <div>
        <div className='text-center'>
          <h2>{name} <small>${price}</small></h2>
          <p className='lead'>
            {description}
          </p>
        </div>

        <hr />

        {children}

        <h4>Available at:</h4>
        <ul className='list-inline'>
          <li><Link to='/locations/1'>Kansas City, MO</Link></li>
          <li><Link to='/locations/2'>San Francisco, CA</Link></li>
          <li><Link to='/locations/3'>Austin, TX</Link></li>
        </ul>

        {+params.id !== 4 &&
          <div>
            <h4>You might also like...</h4>
            <Link to='/products/4/summary'>Chocolate Lemonade</Link>
          </div>
        }
      </div>
    )
  }
}

export const mapProps = ({fetch}) => ({ product: fetch.product })
export default connect(mapProps)(Product)
