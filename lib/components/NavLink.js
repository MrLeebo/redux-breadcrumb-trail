import set from 'lodash/set'
import React, { PropTypes } from 'react'
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
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
}
