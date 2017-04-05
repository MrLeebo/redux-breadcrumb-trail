import React, { Component, createElement, PropTypes } from 'react'
import { Link } from 'react-router'

export default class BreadcrumbItem extends Component {
  render () {
    let { component } = this.props

    const {
      current,
      itemRenderer,
      location,
      params,
      routes,
      url
    } = this.props

    if (typeof component === 'function') {
      component = createElement(component, { current, location, params, routes, url })
    }

    const children = current ? component : <Link to={url}>{component}</Link>
    return createElement(itemRenderer, { children })
  }
}

BreadcrumbItem.propTypes = {
  itemRenderer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
}
