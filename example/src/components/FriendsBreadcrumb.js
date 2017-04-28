import React from 'react'
import { find } from './Friends'

export default function FriendsBreadcrumb({params}) {
  return (
    <span>{find(params.id).name}</span>
  )
}
