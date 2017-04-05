import React from 'react'
import { Link } from 'react-router'

export default function SummaryTab ({params}) {
  return (
    <div>
      <h4>Summary</h4>
      <Link to={`/products/${params.id}/detail`}>Detail</Link>
      <p>
        When life gives you lemons, make lemonade. If life hasn't given you any lemons, don't worry. We've got you covered, life gave us all the lemons.
      </p>
    </div>
  )
}
