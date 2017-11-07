import isMatch from 'lodash/isMatch'
import React, { Component, createElement, cloneElement } from 'react'
import { array, func, node, oneOfType, shape } from 'prop-types'
import { connect } from 'react-redux'

import BreadcrumbItem from './BreadcrumbItem'
import { push } from '../actionCreators'

const renderer = oneOfType([node, func])

export const separatorRenderer = () => <li>&gt;</li>

export class Breadcrumbs extends Component {
  static propTypes = {
    breadcrumb: shape({
      breadcrumbs: array
    }).isRequired,
    itemRenderer: renderer.isRequired,
    listRenderer: renderer.isRequired,
    separatorRenderer: renderer.isRequired
  }

  static defaultProps = {
    itemRenderer: 'li',
    listRenderer: 'ul',
    separatorRenderer
  }

  state = { previousLocation: null }

  componentDidMount () {
    this.refreshBreadcrumb(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.refreshBreadcrumb(nextProps)
  }

  refreshBreadcrumb = props => {
    const { dispatch, routes, params, location } = props

    if (!isMatch(this.state.previousLocation, location)) {
      dispatch(push({ location, params, routes }))
      this.setState({ previousLocation: location })
    }
  }

  renderSeparator = () => {
    const { separatorRenderer } = this.props
    switch (typeof separatorRenderer) {
      case 'function': return createElement(separatorRenderer)
      case 'string': return createElement('span', null, separatorRenderer)
      default: return separatorRenderer
    }
  }

  renderComponents = () => {
    const { breadcrumb: { breadcrumbs }, itemRenderer, location, routes } = this.props
    const separator = this.renderSeparator()

    return breadcrumbs.reduce((memo, el, i, arr) => {
      const component = (
        <BreadcrumbItem
          key={el.url}
          {...el}
          itemRenderer={itemRenderer}
          location={location}
          routes={routes}
        />
      )

      memo.push(component)
      if (i < arr.length - 1) {
        memo.push(cloneElement(separator, { key: `breadcrumbSeparator${i}` }))
      }

      return memo
    }, [])
  }

  render () {
    const {
      breadcrumb: { breadcrumbs },
      listRenderer,
      /* eslint-disable no-unused-vars */
      dispatch,
      itemRenderer,
      separatorRenderer,
      location,
      params,
      routes,
      /* eslint-enable no-unused-vars */
      ...rest
    } = this.props

    return breadcrumbs.length > 1 && createElement(listRenderer, { ...rest, children: this.renderComponents() })
  }
}

export const mapStateToProps = ({breadcrumb}) => ({breadcrumb})

export default connect(mapStateToProps)(Breadcrumbs)
