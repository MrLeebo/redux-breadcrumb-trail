import React, { Component, createElement } from 'react'
import { func, node, oneOfType } from 'prop-types'
import { Link } from 'react-router'

import componentCache from '../componentCache'

export default class BreadcrumbItem extends Component {
  static propTypes = {
    itemRenderer: oneOfType([node, func]).isRequired
  }

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

    if (typeof component === 'object' && component.componentCacheKey) {
      component = componentCache.get(component.componentCacheKey)
    }

    if (typeof component === 'function') {
      component = createElement(component, { current, location, params, routes, url })
    }

    const children = current ? component : <Link to={url}>{component}</Link>
    return createElement(itemRenderer, { children })
  }
}
