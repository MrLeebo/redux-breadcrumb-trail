import React from 'react'
import { Link } from 'react-router'

export default function Home (props) {
  return (
    <div>
      <h2>Use the Nav Menu to make a selection</h2>

      <ul>
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/locations'>Locations</Link></li>
        <li><Link to='/friends/0'>Friends</Link></li>
      </ul>
    </div>
  )
}
