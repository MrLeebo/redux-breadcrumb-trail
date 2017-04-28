import set from 'lodash/set'
import React from 'react'
import { object, oneOfType, string } from 'prop-types'
import { Link } from 'react-router'

export default function NavLink (props) {
  let { to, ...rest } = props
  if (typeof to === 'string') {
    to = { pathname: to }
  }

  set(to, 'state.breadcrumb', 'reset')
  return <Link to={to} {...rest} />
}

NavLink.propTypes = {
  to: oneOfType([string, object]).isRequired
}
