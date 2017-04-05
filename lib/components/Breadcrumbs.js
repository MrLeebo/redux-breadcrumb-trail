import isMatch from 'lodash/isMatch'
import React, { Component, createElement, PropTypes } from 'react'
import { connect } from 'react-redux'

import BreadcrumbItem from './BreadcrumbItem'
import { push } from '../actionCreators'

export class Breadcrumbs extends Component {
  constructor (props) {
    super(props)

    this.state = { previousLocation: null }
    this.refreshBreadcrumb = this.refreshBreadcrumb.bind(this)
    this.renderComponents = this.renderComponents.bind(this)
  }

  componentDidMount () {
    this.refreshBreadcrumb(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.refreshBreadcrumb(nextProps)
  }

  refreshBreadcrumb (props) {
    const { dispatch, routes, params, location } = props

    if (!isMatch(this.state.previousLocation, location)) {
      dispatch(push({ location, params, routes }))
      this.setState({ previousLocation: location })
    }
  }

  renderComponents () {
    const { breadcrumb: { breadcrumbs }, itemRenderer, separatorRenderer, location, routes } = this.props

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
        if (typeof separatorRenderer === 'function') {
          memo.push(createElement(separatorRenderer, { key: i }))
        } else {
          memo.push(separatorRenderer)
        }
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

const renderer = PropTypes.oneOfType([PropTypes.node, PropTypes.func])
Breadcrumbs.propTypes = {
  breadcrumb: PropTypes.shape({
    breadcrumbs: PropTypes.array
  }).isRequired,
  itemRenderer: renderer.isRequired,
  listRenderer: renderer.isRequired,
  separatorRenderer: renderer.isRequired
}

export const separatorRenderer = () => <li>&gt;</li>

Breadcrumbs.defaultProps = {
  itemRenderer: 'li',
  listRenderer: 'ul',
  separatorRenderer
}

export function mapStateToProps ({breadcrumb}) {
  return {breadcrumb}
}

export default connect(mapStateToProps)(Breadcrumbs)
