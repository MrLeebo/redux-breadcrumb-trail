import React, { Component } from 'react'
import { Link } from 'react-router'

import fetched from './fetched'
import { fetchLocations, reset } from '../lib/fetchActionCreators'

export class Locations extends Component {
  componentDidMount () {
    fetchLocations(this.props.dispatch)()
  }

  componentWillUnmount () {
    this.props.dispatch(reset())
  }

  render () {
    const {fetch} = this.props
    if (!fetch.current) {
      return <h2>Loading...</h2>
    }

    return (
      <div>
        <h2>Locations</h2>
        <ul className='list-inline'>
          {fetch.current.map(({id, name}) => <li key={id}><Link to={`/locations/${id}`}>{name}</Link></li>)}
        </ul>
      </div>
    )
  }
}

export default fetched(Locations)
