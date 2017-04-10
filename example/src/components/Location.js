import React, { Component } from 'react'
import { Link } from 'react-router'

import fetched from './fetched'
import { fetchLocation, reset } from '../lib/fetchActionCreators'

export class Location extends Component {
  componentDidMount () {
    const { dispatch, params: { id } } = this.props
    fetchLocation(dispatch)({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { dispatch, params: { id } } = nextProps
    if (this.props.params.id !== id) {
      fetchLocation(dispatch)({ id })
    }
  }

  componentWillUnmount () {
    this.props.dispatch(reset())
  }

  render () {
    const {fetch, params} = this.props
    if (!fetch.current) return <div>Loading...</div>

    const { name } = fetch.current
    return (
      <div>
        <h2>{name}</h2>

        {+params.id !== 1 &&
          <div>
            <h4>Check out our original location!</h4>
            <Link to='/locations/1'>Kansas City, MO</Link>
          </div>
        }

        <table className='text-left'>
          <thead>
            <tr>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><Link to='/products/1/summary'>Lemonade</Link></td></tr>
            <tr><td><Link to='/products/2/summary'>Raspberry-ade</Link></td></tr>
            <tr><td><Link to='/products/3/summary'>Strawberry Lemonade</Link></td></tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default fetched(Location)
