import React from 'react'
import { Link } from 'react-router'

const PEEPS = [
  { id: 0, name: 'Michelle', friends: [ 1, 2, 3 ] },
  { id: 1, name: 'Sean', friends: [ 0, 3 ] },
  { id: 2, name: 'Kim', friends: [ 0, 1, 3 ], },
  { id: 3, name: 'David', friends: [ 1, 2 ] }
]

export const find = id => PEEPS.find(p => p.id === +id)

export default function Friends({params}) {
  const person = find(params.id)

  return (
    <div>
      <h3>{person.name}'s Friends</h3>
      <ul>
        {person.friends.map(id => (
          <li key={id}>
            <Link to={`/friends/${id}`}>
              {find(id).name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
